# StratifyAI — Product Requirements Doc

## Original Problem Statement
Build the **StratifyAI** marketing website end-to-end, based on the user-uploaded PRD ("AI-Powered E-Commerce Automation Suite") and the StratifyAI Website Build Plan. The site sells a team of named AI agents — Kai, Atlas, Nova, Remy, Echo, Sage, Pulse — that runs marketing, sales, support and analytics for DTC e-commerce ($1M–$10M) and healthcare practices. Reference benchmark: tinyfish.ai.

Tagline: **"Hire an AI team. Not another tool."**

## User Personas
| Audience | Need | Action |
|---|---|---|
| DTC e-commerce founders ($1M–$10M) | Solve Meta ads, creative, retention chaos | Book a demo |
| Healthcare practice owners | Recover no-shows, stop revenue leak | Book a demo |
| Investors / partners | See infrastructure ambition, not agency | Read manifesto |
| Future enterprise clients | Trust real outcomes & operators | Contact sales |

## Tech Stack
- **Frontend**: React 19 + React Router 7, Tailwind, Framer Motion, react-fast-marquee, lucide-react, sonner toasts. Fonts: **Geist** (display/body) + **JetBrains Mono** (technical labels) — *no Inter*.
- **Backend**: FastAPI + Motor (MongoDB) — `POST /api/leads`, `GET /api/leads`, `GET /api/health`.
- **Design**: Light theme. Electric Blue `#0066FF` primary · Mint `#00D4AA` accent · Near-black `#0A0A0A` ink. Soft dotted-grid backgrounds, glass nav, dark manifesto band.

## Core Requirements (Phase 1 shipped)
- [x] Sticky glass nav with Agents (7) & Industries (with "Soon" pills) hover dropdowns + mobile menu
- [x] Homepage with 11 sections (hero w/ animated KaiDashboard, NDA logo marquee, problem split, 7+1 agent grid, 4-stage CREATE→ACQUIRE→CONVERT→RETAIN flow, industries cards inc. dark "Coming next", animated outcomes counters, dark manifesto band, testimonials, final CTA)
- [x] Live `KaiDashboard` React component — 4-step loop (~9s) showing pull UGC → generate variants → upload to Meta → ROAS notification with terminal logs and floating success card
- [x] /e-commerce vertical page with hero, problem, 7 DTC-tuned agent cards, interactive ROI calculator, 3-tier pricing, FAQ
- [x] /healthcare vertical page with HIPAA badge, 6 healthcare agents (Iris/Ambra/Vera/Cora/Sage/Pulse), compliance grid, 3-tier pricing, FAQ
- [x] /pricing tabbed page (E-commerce ⇄ Healthcare) with 6-question FAQ
- [x] /about long-form manifesto + founder section with initials avatar
- [x] /contact form (8 fields incl. industry/revenue dropdowns) → POST /api/leads → green success state
- [x] 4-column dark footer + 404 page

## What's Implemented (Apr 2026)
- Full Phase 1 frontend (6 routes) and backend (`/api/leads` CRUD + health) tested end-to-end
- 100% backend pytest (8/8): root, health, leads create+persist+list, invalid email 422, missing fields 422, empty 422, CORS
- 100% frontend Playwright critical flows: animations, dropdowns, ROI sliders, pricing tabs, form submit, mobile viewport, zero console errors

## Backlog / Phase 2+
- **P1**: Customers / case studies page, Blog (3 cornerstone MDX posts), individual Agent directory pages (`/agents/kai`, …)
- **P2**: B2B services vertical, Finance/Manufacturing verticals, Careers page, Login / client dashboard
- **P2**: Lead admin dashboard (gated GET `/api/leads`) and email/Slack notification on form submit (n8n webhook from PRD)
- **P3**: Replace stub testimonials/logos with real client assets as engagements close

## Next Tasks
1. Capture 2 real client quotes from Quiet Protector + DTC Skincare client → swap into testimonials block
2. Wire `POST /api/leads` to a Slack/email notifier so Nithish gets pinged in real time
3. Add `og:image`, sitemap.xml, schema.org Organization markup before public launch
