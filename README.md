# NAutomation Labs · Marketing Site

> India's first AI-native engineering labs. AI products and solutions, deployed.

This is the marketing website for **NAutomation Labs** (formerly StratifyAI). It pitches our six services, showcases shipped projects, and captures enquiries.

## Stack

- **Frontend** — React 19 + React Router 7, Vite, Tailwind, Framer Motion, lucide-react, react-fast-marquee, sonner. Fonts: Geist + JetBrains Mono.
- **Backend** — FastAPI + Motor (MongoDB). Endpoints: `POST /api/leads`, `GET /api/leads`, `POST /api/feedback`, `POST /api/errors`, `GET /api/config`, `GET /api/health`.
- **Hosting** — Vercel (frontend) + Render (backend) + MongoDB Atlas.
- **Design tokens** — Light theme. Electric Blue `#0066FF` · Mint `#00D4AA` · Near-black `#0A0A0A`.

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero, services, process, verticals, outcomes, manifesto, testimonials, CTA |
| `/services` | Six services + How we work + training CTA |
| `/projects` | Portfolio grid (10–12 cards) |
| `/projects/:slug` | Per-project detail (overview · spec · use case · numbers) |
| `/about` | About + founder background |
| `/contact` | Lead form (POST `/api/leads`) |
| `/privacy`, `/terms` | Legal |
| `/login`, `/signup`, `/dashboard` | Auth + protected dashboard (kept from previous build) |

## Brand

- Name: **NAutomation Labs**
- Email: `office@nautomationlabs.com`
- Phone: `+91 73386 71878`
- Logo mark: **NL** on near-black tile with mint dot

## Local dev

```bash
# Frontend
cd frontend
yarn install
yarn start         # vite dev server

# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

Frontend reads `VITE_BACKEND_URL` for the API base. Backend reads `MONGO_URL`, `DB_NAME`, `IP_HASH_SALT`, `LEAD_FORM_ENABLED`, `MAINTENANCE_MODE`, `SMTP_*`, `NOTIFY_EMAIL`.

## Production-readiness features (carried over from previous build)

- Kill switch for the lead form (`LEAD_FORM_ENABLED`, `MAINTENANCE_MODE` env vars)
- Per-endpoint sliding-window rate limiting
- PII-safe audit logs (salted SHA-256 IP hash, no raw IPs)
- Self-hosted error sink (`POST /api/errors`)
- React error boundary with automatic reporting
- Cookie consent banner (legacy `stratify_cookie_consent_v1` key auto-migrated to `nautomationlabs_cookie_consent_v1`)
- Scroll restoration on every route change
- Load-test harness in `scripts/load_test.py`
