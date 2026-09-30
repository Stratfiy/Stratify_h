# nautomation-web

The marketing site for **nautomationlabs.com**. Static HTML (Astro 5 + Tailwind 4 + MDX), hosted on Cloudflare Pages, with two Cloudflare Workers for the contact form and the waitlist.

Built from the website brief dated 30 September 2026 (v1.0). Positioning: *The work, done.*

## Layout

```
astro.config.mjs          site URL, sitemap, MDX, Tailwind
tokens.json               design tokens — source of truth; decibyl-web copies this file
content/roles.json        open roles → /careers (JobPosting schema)
content/blog/*.mdx        blog posts (one inline SVG diagram each)
src/layouts/Base.astro    <head>, SEO, JSON-LD, nav, footer, waitlist band, PostHog, cookie notice
src/layouts/Legal.astro   privacy / terms wrapper
src/components/           Nav, Footer, TrustStrip, PageHero, StepRow, JobCard, WhyNowBand, TwoWays,
                          ProofStrip, FAQ, CTABand, RoleList, ContactForm, WaitlistForm (7 states),
                          WaitlistBand, BlogCard, Breadcrumbs, Logo
src/illustrations/        ApprovalCard (4 states), ActionLedger (5 rows), CompletedTask,
                          ProcurementRing, SixAreas, PilotTimeline — SVG on CSS tokens (light + dark)
src/pages/                one file per route (see sitemap below)
src/lib/site.ts           names, emails, URLs, nav, job families
src/lib/schema.ts         Organization, BreadcrumbList, FAQPage, JobPosting builders
public/_redirects         301s from every old React route
public/_headers           CSP (self + PostHog + Turnstile), HSTS, cache rules
public/og/                OG images, generated at build by scripts/og.mjs (git-ignored)
scripts/og.mjs            1200×630 OG image per page (satori + resvg)
scripts/screenshots.mjs   every page at 390 px and 1440 px, light and dark
scripts/lighthouse.mjs    mobile Lighthouse for Home, Procurement, Security
workers/contact           POST /api/contact → email office@ + Zoho CRM lead (source=website)
workers/waitlist          POST /api/waitlist (+ /country, /confirm, /export.csv) → D1, Resend, Zoho, PostHog
workers/shared            Turnstile, KV rate limit, Resend, Zoho, PostHog helpers
```

## Sitemap

`/` · `/what-we-do` · `/procurement` · `/decibyl` (canonical → decibyl.ai) · `/how-it-works` · `/about` · `/careers` · `/security` · `/waitlist` (no nav, noindex) · `/blog`, `/blog/[slug]` · `/contact` · `/legal/privacy` · `/legal/terms` · `404`

## Develop

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # generates OG images, then builds to dist/
npm run check        # astro check (types)
npm run preview      # serve dist/ on :4321
npm run screenshots  # needs preview running; writes screenshots/
npm run lighthouse   # needs preview running; writes lighthouse/*.json and prints a table
```

The forms post to same-origin `/api/contact` and `/api/waitlist`, which Cloudflare routes to the Workers. Without the Workers deployed they show the error state. Copy `.env.example` to `.env` to enable Turnstile and PostHog in the build.

## Deploy

**Pages.** Root directory `nautomation-web`, build command `npm run build`, output `dist`. Preview deploy per PR; production on merge to `main`. Set `PUBLIC_TURNSTILE_SITE_KEY` and `PUBLIC_POSTHOG_KEY` in the Pages environment.

**Workers.**
```bash
cd workers/waitlist
wrangler d1 create nautomation-waitlist          # put the id in wrangler.toml
wrangler d1 execute nautomation-waitlist --file=schema.sql
wrangler kv namespace create RATE_LIMIT          # put the id in both wrangler.toml files
wrangler secret put TURNSTILE_SECRET             # then RESEND_API_KEY, ZOHO_*, POSTHOG_KEY, EXPORT_TOKEN
wrangler deploy
cd ../contact && wrangler deploy
```
Secrets live in Cloudflare, never in the repo. Export the waitlist for Growth with `curl -H "Authorization: Bearer $EXPORT_TOKEN" https://nautomationlabs.com/api/waitlist/export.csv`.

## Budgets (from the brief) and where we are

| Budget | Result (mobile, simulated 4G, local preview) |
|---|---|
| Lighthouse ≥ 95 ×4 on Home, Procurement, Security | 99 / 100 / 100 / 100 · 99 / 100 / 100 / 100 · 100 / 100 / 100 / 100 |
| LCP < 1.8 s | Home 1.8 s · Procurement 2.0 s · Security 1.5 s |
| CLS < 0.05 | 0 on all three |
| ≤ 90 KB JS on Home | ~4 KB (inline scripts only; PostHog loads async when a key is set) |
| Static HTML, readable without JS | yes; forms also work as plain POSTs |

## Founder must supply (TODO(founder) in code)

- Final logo and favicon (`src/components/Logo.astro`, `public/favicon.svg`, `public/logo.svg`).
- Operating architecture SVG → `public/illustrations/operating-architecture.svg` (placeholder on `/about`).
- `content/roles.json`: LinkedIn post URLs per role, real dates.
- `security@` and `office@` mailboxes; Zoho CRM self-client credentials; Resend domain.
- DPA template and privacy notice PDFs → `public/downloads/`.
- Decision on `/lab` (currently 302 → `/`).
- CA review of `/legal/privacy` and `/legal/terms` (both carry a "Draft pending CA review" tag).
