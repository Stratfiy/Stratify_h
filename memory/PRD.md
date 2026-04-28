# StratifyAI — Product Requirements Doc

## Original Problem Statement
Build the **StratifyAI** marketing website end-to-end, based on the user-uploaded PRD ("AI-Powered E-Commerce Automation Suite") and the StratifyAI Website Build Plan. The site sells a team of named AI agents — Kai, Atlas, Nova, Remy, Echo, Sage, Pulse — that runs marketing, sales, support and analytics for DTC e-commerce ($1M–$10M) and healthcare practices. Reference benchmark: tinyfish.ai. Tagline: **"Hire an AI team. Not another tool."**

## User Personas
| Audience | Need | Action |
|---|---|---|
| DTC e-commerce founders ($1M–$10M) | Solve Meta ads, creative, retention chaos | Book a demo |
| Healthcare practice owners | Recover no-shows, stop revenue leak | Book a demo |
| Investors / partners | See infrastructure ambition, not agency | Read manifesto |
| Future enterprise clients | Trust real outcomes & operators | Contact sales |

## Tech Stack
- **Frontend**: React 19 + React Router 7, Tailwind, Framer Motion, react-fast-marquee, lucide-react, sonner. Fonts: **Geist** (display/body) + **JetBrains Mono** (technical labels) — *no Inter*.
- **Backend**: FastAPI + Motor (MongoDB). Endpoints: `POST /api/leads`, `GET /api/leads`, `POST /api/feedback`, `POST /api/errors`, `GET /api/config`, `GET /api/health`.
- **Design**: Light theme. Electric Blue `#0066FF` primary · Mint `#00D4AA` accent · Near-black `#0A0A0A` ink. Soft dotted-grid backgrounds, glass nav, dark manifesto band.

## Core Requirements (Phase 1 + Pre-Launch Hardening — shipped)
- [x] 8 routes: `/`, `/e-commerce`, `/healthcare`, `/pricing`, `/about`, `/contact`, `/privacy`, `/terms` + 404
- [x] Sticky glass nav · 7-agent dropdown · Industries dropdown with "Soon" pills · mobile menu
- [x] Homepage 11 sections incl. live `KaiDashboard` 9s loop animation, NDA logo marquee, problem split, 7+1 agent grid, 4-stage CREATE→ACQUIRE→CONVERT→RETAIN flow, dark "Coming next" industry card, animated outcomes counters, dark manifesto band, testimonials, final CTA
- [x] /e-commerce vertical with skincare hero + interactive ROI calculator (3 sliders, real-time savings) + 3-tier pricing + FAQ
- [x] /healthcare vertical with HIPAA badge + 6 healthcare agents (Iris/Ambra/Vera/Cora/Sage/Pulse) + compliance grid + pricing
- [x] /pricing tabbed (E-com ⇄ Healthcare) + 6-question FAQ
- [x] /about long-form manifesto + initials founder avatar
- [x] /contact 8-field form → POST `/api/leads` → green success state, with 429 / 503 graceful handling
- [x] /privacy + /terms full pages (GDPR-friendly + AI-clauses + ToS limitation of liability)

## Production-Readiness Layer (Apr 2026 sprint — shipped)
- [x] **Kill switch** (`LEAD_FORM_ENABLED`, `MAINTENANCE_MODE` env vars) — flip in seconds, frontend reads `/api/config` and shows a "form paused" state
- [x] **PII safety** — control-char stripping, `redact()` for log lines, salted SHA-256 IP hash (no raw IPs stored), Pydantic `EmailStr` validation
- [x] **Per-endpoint rate limiting** — sliding-window in-memory limiter keyed by `(scope, ip_hash)`. Defaults: 10/hr leads, 30/hr feedback, 60/hr errors
- [x] **Audit logs** — every lead create writes to `db.audit_logs` with `ip_hash`, `user_agent`, `action`, `ts`
- [x] **Self-hosted error sink** — `POST /api/errors` writes to `db.client_errors` (drop-in until Sentry is wired)
- [x] **Error boundary** — wraps the entire router; logs to `/api/errors` and shows a recoverable fallback
- [x] **Cookie banner** — accept / reject persisted to `localStorage` `stratify_cookie_consent_v1`
- [x] **Feedback widget** — bottom-left toggle, thumbs up/down + free-text note, posts to `/api/feedback`
- [x] **Scroll restoration** on every route change
- [x] **Load test harness** (`/app/scripts/load_test.py`) — verified 397 req/s, 0 failures, p95 204ms, rate-limit kicks in correctly

## Test Coverage
- **Backend pytest** — 19/19 passing (iteration_2): config flags, health flag, leads CRUD, feedback up/down + 422s, error sink, control-char stripping, audit log persistence, kill switch
- **Frontend Playwright** — all critical flows: homepage animations, dropdowns, ROI sliders, pricing tabs, contact form (incl. 429/503 paths), cookie banner accept+reject persistence, feedback widget end-to-end, /privacy + /terms render, scroll-to-top, mobile viewport, **zero console errors**
- **Code review pass (Apr 2026)** — applied: shared `PricingCard` (deduped 3×), `StepIcon` extract for KaiDashboard nested-ternary, `FormPanel`/`PausedCard`/`SuccessCard`/`DemoForm`/`Select` extracts for Contact, module-scope `MOTION` variants in `Motion.jsx`, stable log entry IDs in `KaiDashboard`, composite keys for duplicated NDA marquee, expanded comments on intentional empty catches in `CookieBanner` + `ErrorBoundary`, dev-mode console.warn on logging path failures. Skipped (false-positive linter complaints): wrong useEffect deps for module constants/setState setters/local effect variables, "localStorage is sensitive" warning for cookie consent (it isn't), arbitrary 50-line component-splitting for marketing pages.

## What's Missing for Public Launch
| Item | Owner |
|---|---|
| `og:image` 1200×630 hero render | designer / Figma |
| `sitemap.xml` + `robots.txt` + schema.org markup | next sprint |
| Real client logos (Quiet Protector, DTC Skincare) | Nithish |
| Real client testimonial quotes (signed permission) | Nithish |
| Founder photo for /about | Nithish |
| Slack / Resend / SendGrid integration on `POST /api/leads` for instant notification | next sprint (call `integration_playbook_expert_v2`) |
| Custom domain `stratifyai.com` + Emergent Deploy ($20/mo) | Nithish |

## Backlog
- **P1**: Customers / case studies page, Blog (3 cornerstone MDX posts), Agent directory pages (`/agents/kai`, …)
- **P2**: Gated GET `/api/leads` (admin token), Slack/email pipeline, OG image renderer
- **P3**: B2B services / Finance / Manufacturing verticals, Careers page
- **Phase 2 product** (separate engagement): Auth, dashboard, agent runtime (Kai first), Stripe billing, LLMOps stack (semantic caching, model routing, fallback, token budgets, hallucination tracking)

## Next Tasks
1. Deploy to `stratifyai.com` via Emergent (one-click, ~$20/mo)
2. Wire Slack + Resend on lead submit → sub-4-minute reply guarantee
3. Build the **Kai agent runtime** (the actual product) — week 2
