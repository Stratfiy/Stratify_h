# NAutomation Labs — Product Requirements Doc

## Original Problem
NAutomation Labs is the rebrand of the **StratifyAI** marketing site. The previous version sold a packaged "team of named AI agents" (Kai/Atlas/Nova/Remy/Echo/Sage/Pulse + healthcare agents Iris/Ambra/Vera/Cora) at $1,497–$6,447/mo. The rebrand repositions the business as **India's first AI-native engineering labs** — a custom-deployment shop selling six services and a portfolio of shipped projects, with no published price tiers.

## Positioning
**India's first AI-native engineering labs. AI products and solutions, deployed.**

- Problem to MVP in 5–7 days
- Full production deployment in 14–21 days
- Each engagement ends with a working product + client dashboard
- Verticals: Ecommerce · Clinics · Manufacturing · Supply Chain
- Founder: Nithish — Ex-Samsung, Ex-Reliance Industries, NIT graduate, 15+ client engagements

## Information Architecture
| Route | Page |
|---|---|
| `/` | Home — hero, verticals strip, services, process, outcomes, manifesto, testimonials, CTA |
| `/services` | Six services + How we work + workshops/training CTA |
| `/projects` | Portfolio (10–12 cards, mix of real + placeholders) |
| `/projects/:slug` | Per-project: overview · tech spec · use case · numbers |
| `/about` | About + founder card |
| `/contact` | Lead form with service-of-interest prefill via `?service=…` |
| `/privacy`, `/terms` | Legal (rewritten for NAutomation Labs) |

## Services (six)
1. RAG Chatbots
2. Voice Agents
3. Enterprise Software Integration
4. End-to-End Automation
5. Custom Product & Service Deployment
6. AI Training & Lectures

Each service tile links to `/contact?service=…` which pre-selects the service in the contact form.

## Projects (initial)
Two real, ten placeholders:
1. AI Video Generation & Ad Posting (Ecommerce) — n8n + Lambda + FFmpeg + Meta Marketing API
2. Sukhya · Healthcare Automation (Clinics) — voice intake + no-show recovery
3–12. Coming soon placeholders across the four verticals

## Tech Stack
- **Frontend**: React 19 + React Router 7, Vite, Tailwind, Framer Motion, lucide-react, react-fast-marquee, sonner. Fonts: Geist + JetBrains Mono.
- **Backend**: FastAPI + Motor (MongoDB). Endpoints unchanged from previous build.
- **Design**: Light theme. `#0066FF` Electric Blue · `#00D4AA` Mint · `#0A0A0A` near-black.
- **Hosting**: Vercel (frontend) + Render (backend) + MongoDB Atlas. Domain TBD (likely nautomationlabs.com).

## Brand
- Email: `office@nautomationlabs.com`
- Phone: `+91 73386 71878`
- Logo mark: **NL** on near-black tile, mint dot accent (replaces the old SA mark)

## Catchy taglines used across the site
- Hero: "AI products & solutions. Deployed."
- Eyebrow: "India's first AI-native engineering labs"
- Question: "The world is diving into AI. Is your industry ready?"
- Process: "Problem to MVP in 5 days. Not slides."
- Manifesto: "AI infused. Not bolted on."
- CTA: "Book a call to see how AI fits into your organisation."
- Training: "Book a free session on AI in your industry."

## What was removed from the previous build
- All named-agent references (Kai/Atlas/Nova/Remy/Echo/Sage/Pulse + Iris/Ambra/Vera/Cora)
- `/e-commerce`, `/healthcare`, `/pricing` pages (deleted)
- `KaiDashboard` component → replaced with `WorkflowDashboard` (same animation, neutral language)
- `RoiCalculator` component (was tied to the ecommerce vertical page)
- Old packaged pricing tiers ($1,497 / $2,487 / $6,447)
- Old contact email `hello@stratifyai.com` and the `stratify_cookie_consent_v1` localStorage key (auto-migrated on first visit)

## Production-readiness features (carried over)
- Kill switch (`LEAD_FORM_ENABLED`, `MAINTENANCE_MODE`)
- Per-endpoint sliding-window rate limits
- PII-safe audit logs (salted SHA-256 IP hash)
- Self-hosted error sink (`POST /api/errors`)
- React error boundary
- Cookie consent banner (with legacy key auto-migration)
- Scroll restoration
- Load-test harness

## Backlog
- **P0**: Fill in 8–10 remaining project case studies with real content
- **P0**: New `og:image` 1200×630 with NAutomation Labs branding
- **P0**: New favicon/`apple-touch-icon` with the NL mark
- **P1**: New Google Analytics property (current code still ships GA `G-QYT4JJBLDQ` from the previous brand)
- **P1**: `sitemap.xml`, `robots.txt`, schema.org Organization markup
- **P1**: Slack/Resend notification on lead submit
- **P2**: Blog (3 cornerstone MDX posts) — case studies + AI-adoption guides
- **P2**: Repo rename from `Stratify_h` to `nautomation-labs`
