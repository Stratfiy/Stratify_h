from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import hashlib
import time
import re
from collections import defaultdict, deque
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Feature flags / kill switches (env-driven, hot-toggleable)
def flag(name: str, default: str = "true") -> bool:
    return os.environ.get(name, default).strip().lower() in ("1", "true", "yes", "on")

app = FastAPI(title="StratifyAI API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------------------------- Helpers ----------------------------
def hash_ip(ip: str) -> str:
    """One-way hash of IP for audit (GDPR-friendly: no raw IP stored)."""
    salt = os.environ.get("IP_HASH_SALT", "stratifyai-default-salt")
    return hashlib.sha256(f"{salt}:{ip}".encode()).hexdigest()[:16]


def redact(value: str) -> str:
    """Light-weight PII redaction for logs (emails / phones / digits)."""
    if not value:
        return value
    value = re.sub(r"[\w\.\-+]+@[\w\.\-]+\.\w+", "[email]", value)
    value = re.sub(r"\+?\d[\d\s\-\(\)]{6,}\d", "[phone]", value)
    return value[:200]


# Per-endpoint sliding-window rate limiters.
# Keyed by (endpoint, ip_hash) so feedback/error spam can't lock out lead submissions.
RATE_BUCKETS: dict[tuple[str, str], deque] = defaultdict(deque)
RATE_LIMIT_PER_HOUR = int(os.environ.get("RATE_LIMIT_PER_HOUR", "10"))
RATE_LIMITS = {
    "leads": RATE_LIMIT_PER_HOUR,
    "feedback": int(os.environ.get("RATE_LIMIT_FEEDBACK_PER_HOUR", "30")),
    "errors": int(os.environ.get("RATE_LIMIT_ERRORS_PER_HOUR", "60")),
}


def rate_limit(scope: str, ip_hash: str) -> bool:
    """Return True if request is within limit for this (scope, ip), else False."""
    now = time.time()
    window_start = now - 3600
    cap = RATE_LIMITS.get(scope, RATE_LIMIT_PER_HOUR)
    bucket = RATE_BUCKETS[(scope, ip_hash)]
    while bucket and bucket[0] < window_start:
        bucket.popleft()
    if len(bucket) >= cap:
        return False
    bucket.append(now)
    return True


def get_client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "0.0.0.0"


# ---------------------------- Models ----------------------------
class LeadCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=120)
    work_email: EmailStr
    company_name: str = Field(..., min_length=1, max_length=160)
    company_website: Optional[str] = Field(default="", max_length=300)
    industry: str = Field(..., max_length=80)
    monthly_revenue: str = Field(..., max_length=80)
    challenge: str = Field(..., min_length=1, max_length=2000)
    referral_source: Optional[str] = Field(default="", max_length=160)

    @field_validator("full_name", "company_name", "challenge")
    @classmethod
    def strip_control(cls, v: str) -> str:
        return re.sub(r"[\x00-\x1f\x7f]", "", v).strip()


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    work_email: EmailStr
    company_name: str
    company_website: Optional[str] = ""
    industry: str
    monthly_revenue: str
    challenge: str
    referral_source: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FeedbackCreate(BaseModel):
    page: str = Field(..., max_length=120)
    rating: str = Field(..., pattern=r"^(up|down)$")
    note: Optional[str] = Field(default="", max_length=600)


class ClientError(BaseModel):
    message: str = Field(..., max_length=2000)
    stack: Optional[str] = Field(default="", max_length=8000)
    url: Optional[str] = Field(default="", max_length=500)
    user_agent: Optional[str] = Field(default="", max_length=500)


# ---------------------------- Routes ----------------------------
@api_router.get("/")
async def root():
    return {"service": "StratifyAI", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "healthy",
        "ts": datetime.now(timezone.utc).isoformat(),
        "lead_form_enabled": flag("LEAD_FORM_ENABLED"),
    }


@api_router.get("/config")
async def public_config():
    """Public runtime config consumed by the frontend."""
    return {
        "lead_form_enabled": flag("LEAD_FORM_ENABLED"),
        "feedback_enabled": flag("FEEDBACK_ENABLED"),
        "maintenance_mode": flag("MAINTENANCE_MODE", "false"),
    }


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate, request: Request):
    if not flag("LEAD_FORM_ENABLED"):
        raise HTTPException(status_code=503, detail="Lead form temporarily disabled. Email hello@stratifyai.com.")

    ip_hash = hash_ip(get_client_ip(request))
    if not rate_limit("leads", ip_hash):
        logger.warning("rate-limit hit endpoint=leads ip_hash=%s", ip_hash)
        raise HTTPException(status_code=429, detail="Too many requests. Try again later.")

    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()

    audit = {
        "id": str(uuid.uuid4()),
        "lead_id": lead.id,
        "ip_hash": ip_hash,
        "user_agent": (request.headers.get("user-agent") or "")[:300],
        "ts": datetime.now(timezone.utc).isoformat(),
        "action": "lead.create",
    }

    try:
        await db.leads.insert_one(doc)
        await db.audit_logs.insert_one(audit)
        logger.info("lead.created id=%s company=%s", lead.id, redact(lead.company_name))
    except Exception as e:
        logger.exception("failed to insert lead")
        raise HTTPException(status_code=500, detail="Could not save lead") from e
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


@api_router.post("/feedback", status_code=201)
async def submit_feedback(payload: FeedbackCreate, request: Request):
    if not flag("FEEDBACK_ENABLED"):
        raise HTTPException(status_code=503, detail="Feedback disabled.")
    ip_hash = hash_ip(get_client_ip(request))
    if not rate_limit("feedback", ip_hash):
        raise HTTPException(status_code=429, detail="Too many requests.")
    doc = {
        "id": str(uuid.uuid4()),
        "page": payload.page,
        "rating": payload.rating,
        "note": payload.note or "",
        "ip_hash": ip_hash,
        "ts": datetime.now(timezone.utc).isoformat(),
    }
    await db.feedback.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api_router.post("/errors", status_code=201)
async def report_error(payload: ClientError, request: Request):
    """Self-hosted client error sink — drop-in until Sentry is wired."""
    ip_hash = hash_ip(get_client_ip(request))
    doc = {
        "id": str(uuid.uuid4()),
        "message": payload.message[:2000],
        "stack": (payload.stack or "")[:8000],
        "url": payload.url or "",
        "user_agent": payload.user_agent or "",
        "ip_hash": ip_hash,
        "ts": datetime.now(timezone.utc).isoformat(),
    }
    try:
        await db.client_errors.insert_one(doc)
        logger.warning("client.error url=%s msg=%s", doc["url"], redact(doc["message"]))
    except Exception:
        logger.exception("failed to log client error")
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
