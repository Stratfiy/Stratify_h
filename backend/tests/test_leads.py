"""Backend API tests for NAutomation Labs marketing site."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://app-works-here.preview.emergentagent.com").rstrip("/")
# Fallback to frontend .env
if not BASE_URL or "REACT_APP_BACKEND_URL" not in os.environ:
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health & Root ----------
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        d = r.json()
        assert d.get("service") == "NAutomation Labs"
        assert d.get("status") == "ok"

    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "healthy"
        assert "ts" in d


# ---------- Leads CRUD ----------
class TestLeads:
    valid_payload = {
        "full_name": "TEST_Jane Founder",
        "work_email": "TEST_jane@example.com",
        "company_name": "TEST_Acme Co.",
        "company_website": "acme.com",
        "industry": "E-commerce",
        "monthly_revenue": "$1M – $10M",
        "challenge": "TEST_We are spending too much on tools.",
        "referral_source": "LinkedIn",
    }

    def test_create_lead_success(self, api):
        r = api.post(f"{BASE_URL}/api/leads", json=self.valid_payload)
        assert r.status_code == 201, r.text
        d = r.json()
        assert "id" in d and isinstance(d["id"], str) and len(d["id"]) > 0
        assert d["full_name"] == self.valid_payload["full_name"]
        assert d["work_email"] == self.valid_payload["work_email"]
        assert d["company_name"] == self.valid_payload["company_name"]
        assert d["industry"] == self.valid_payload["industry"]
        assert d["monthly_revenue"] == self.valid_payload["monthly_revenue"]
        assert d["challenge"] == self.valid_payload["challenge"]
        assert "created_at" in d
        assert "_id" not in d
        # Save id for verify-persistence
        TestLeads.created_id = d["id"]

    def test_lead_persisted_in_list(self, api):
        r = api.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        # No mongo _id leakage
        for row in rows:
            assert "_id" not in row
        # The just-created TEST_ lead should be present
        ids = [row.get("id") for row in rows]
        assert getattr(TestLeads, "created_id", None) in ids, "Created lead not found in GET list"

    def test_create_lead_invalid_email(self, api):
        bad = dict(self.valid_payload)
        bad["work_email"] = "not-an-email"
        r = api.post(f"{BASE_URL}/api/leads", json=bad)
        assert r.status_code == 422

    def test_create_lead_missing_required(self, api):
        # missing challenge, full_name
        bad = {
            "work_email": "x@y.com",
            "company_name": "X",
            "industry": "E-commerce",
            "monthly_revenue": "$1M – $10M",
        }
        r = api.post(f"{BASE_URL}/api/leads", json=bad)
        assert r.status_code == 422

    def test_create_lead_empty_strings(self, api):
        bad = dict(self.valid_payload)
        bad["full_name"] = ""
        bad["challenge"] = ""
        r = api.post(f"{BASE_URL}/api/leads", json=bad)
        assert r.status_code == 422


# ---------- CORS ----------
class TestCORS:
    def test_cors_preflight(self, api):
        origin = "https://app-works-here.preview.emergentagent.com"
        r = api.options(
            f"{BASE_URL}/api/leads",
            headers={
                "Origin": origin,
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "content-type",
            },
        )
        # Either 200 or 204
        assert r.status_code in (200, 204), r.text
        acao = r.headers.get("access-control-allow-origin", "")
        assert acao in ("*", origin)
