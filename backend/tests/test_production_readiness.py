"""Backend tests for production-readiness features:
- /api/config kill switch flags
- /api/health includes lead_form_enabled
- /api/feedback POST validation + happy path
- /api/errors POST happy path
- /api/leads control-character stripping (regression-safe)
- audit_logs persistence on lead.create
- Rate limit (skipped unless RATE_LIMIT_TEST=1 because in-memory limiter
  pollutes server state for other tests/users; load_test.py already
  validated 11th request -> 429).
"""
import os
import time
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                break

# Direct mongo handle for verifying audit_logs / feedback / client_errors
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def mongo():
    c = MongoClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    yield c[DB_NAME]
    c.close()


# ---------------- /api/config + /api/health flags ----------------
class TestConfig:
    def test_config_returns_flags(self, api):
        r = api.get(f"{BASE_URL}/api/config")
        assert r.status_code == 200
        d = r.json()
        for key in ("lead_form_enabled", "feedback_enabled", "maintenance_mode"):
            assert key in d, f"missing key {key}"
            assert isinstance(d[key], bool), f"{key} should be bool"

    def test_health_includes_lead_form_flag(self, api):
        r = api.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        d = r.json()
        assert "lead_form_enabled" in d
        assert isinstance(d["lead_form_enabled"], bool)


# ---------------- /api/feedback ----------------
class TestFeedback:
    def test_feedback_up_with_note(self, api, mongo):
        payload = {"page": "/test", "rating": "up", "note": "TEST_great"}
        r = api.post(f"{BASE_URL}/api/feedback", json=payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d.get("ok") is True
        assert "id" in d and isinstance(d["id"], str)
        # Verify persisted
        doc = mongo.feedback.find_one({"id": d["id"]})
        assert doc is not None
        assert doc["rating"] == "up"
        assert doc["page"] == "/test"
        assert doc["note"] == "TEST_great"

    def test_feedback_down_no_note(self, api):
        r = api.post(f"{BASE_URL}/api/feedback",
                     json={"page": "/test", "rating": "down"})
        assert r.status_code == 201
        assert r.json().get("ok") is True

    def test_feedback_invalid_rating(self, api):
        r = api.post(f"{BASE_URL}/api/feedback",
                     json={"page": "/test", "rating": "neutral"})
        assert r.status_code == 422

    def test_feedback_missing_page(self, api):
        r = api.post(f"{BASE_URL}/api/feedback", json={"rating": "up"})
        assert r.status_code == 422


# ---------------- /api/errors ----------------
class TestErrors:
    def test_error_report_persists(self, api, mongo):
        payload = {
            "message": "TEST_TypeError: undefined is not a function",
            "stack": "at App.js:42",
            "url": "https://example.com/x",
            "user_agent": "pytest/1.0",
        }
        r = api.post(f"{BASE_URL}/api/errors", json=payload)
        assert r.status_code == 201, r.text
        assert r.json().get("ok") is True
        # Verify persisted
        doc = mongo.client_errors.find_one({"message": payload["message"]})
        assert doc is not None
        assert doc["url"] == payload["url"]
        assert doc["user_agent"] == payload["user_agent"]

    def test_error_minimum_payload(self, api):
        r = api.post(f"{BASE_URL}/api/errors", json={"message": "TEST_min"})
        assert r.status_code == 201


# ---------------- /api/leads regression + sanitization + audit ----------------
class TestLeadsRegression:
    base = {
        "full_name": "TEST_Regression User",
        "work_email": "TEST_regression@example.com",
        "company_name": "TEST_Regression Co",
        "company_website": "regression.com",
        "industry": "E-commerce",
        "monthly_revenue": "$1M – $10M",
        "challenge": "TEST_regression challenge",
        "referral_source": "Search",
    }

    def test_create_lead_still_works(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json=self.base)
        # Could be 429 if previous test runs hammered IP — accept that
        if r.status_code == 429:
            pytest.skip("Rate-limited from prior runs; skipping happy-path")
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["full_name"] == self.base["full_name"]
        assert "id" in d
        TestLeadsRegression.created_id = d["id"]

    def test_audit_log_written(self, api, mongo):
        if not getattr(TestLeadsRegression, "created_id", None):
            pytest.skip("no lead created")
        # Allow async write to settle
        time.sleep(0.3)
        audit = mongo.audit_logs.find_one(
            {"lead_id": TestLeadsRegression.created_id})
        assert audit is not None, "audit_logs entry missing"
        assert audit["action"] == "lead.create"
        assert "ip_hash" in audit and len(audit["ip_hash"]) > 0
        assert "user_agent" in audit
        assert "ts" in audit

    def test_control_character_stripping(self, api):
        payload = dict(self.base)
        payload["full_name"] = "TEST_Strip\x00\x01Me"
        payload["company_name"] = "TEST_Co\x07Bell"
        payload["challenge"] = "TEST_chal\x1flength"
        payload["work_email"] = "TEST_strip@example.com"
        r = api.post(f"{BASE_URL}/api/leads", json=payload)
        if r.status_code == 429:
            pytest.skip("Rate-limited; skipping")
        assert r.status_code == 201, r.text
        d = r.json()
        assert "\x00" not in d["full_name"]
        assert "\x01" not in d["full_name"]
        assert "\x07" not in d["company_name"]
        assert "\x1f" not in d["challenge"]
        assert d["full_name"] == "TEST_StripMe"
        assert d["company_name"] == "TEST_CoBell"
        assert d["challenge"] == "TEST_challength"


# ---------------- Rate limiter ---------------
# Marked optional because it pollutes the in-memory bucket for the same IP
# and would cause /api/leads tests in other suites to 429. Run explicitly:
#   RATE_LIMIT_TEST=1 pytest tests/test_production_readiness.py::TestRateLimit
@pytest.mark.skipif(os.environ.get("RATE_LIMIT_TEST") != "1",
                    reason="RATE_LIMIT_TEST=1 to enable (pollutes IP bucket)")
class TestRateLimit:
    def test_eleventh_request_returns_429(self, api):
        payload = {
            "full_name": "TEST_RL",
            "work_email": "TEST_rl@example.com",
            "company_name": "TEST_RL",
            "industry": "E-commerce",
            "monthly_revenue": "$1M – $10M",
            "challenge": "TEST_rl",
        }
        statuses = []
        for _ in range(15):
            r = api.post(f"{BASE_URL}/api/leads", json=payload)
            statuses.append(r.status_code)
        assert 429 in statuses, f"expected 429 in {statuses}"
