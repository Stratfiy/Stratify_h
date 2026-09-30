/**
 * Waitlist Worker
 *   POST /api/waitlist            join (JSON or form) → { position, ref_code }
 *   GET  /api/waitlist/country    { country } from the CF-IPCountry header (pre-fills the form)
 *   GET  /api/waitlist/confirm?t= double opt-in; redirects to /waitlist?confirmed=1
 *   GET  /api/waitlist/export.csv protected CSV for Growth (Authorization: Bearer EXPORT_TOKEN)
 * Referral rule: each *confirmed* signup through your link moves you 5 places (position -= 5, floor 1).
 */
import { json, readBody, wantsJson, clean, EMAIL_RE, verifyTurnstile, rateLimit, sendEmail, zohoLead, posthog, escapeHtml } from '../../shared';

export interface Env {
  DB: D1Database;
  RATE_LIMIT?: KVNamespace;
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string; FROM_EMAIL?: string;
  ZOHO_CLIENT_ID?: string; ZOHO_CLIENT_SECRET?: string; ZOHO_REFRESH_TOKEN?: string; ZOHO_API_DOMAIN?: string; ZOHO_ACCOUNTS_DOMAIN?: string;
  POSTHOG_KEY?: string; POSTHOG_HOST?: string;
  EXPORT_TOKEN?: string;
  SITE_URL?: string;
  POSITION_OFFSET?: string; // optional head start for the counter, e.g. "200"
}

const JOB_FAMILIES = new Set(['follow-ups', 'vendor-coordination', 'front-desk', 'back-office', 'procurement-logistics', 'something-else']);
const code = (n: number) => { const a = 'abcdefghjkmnpqrstuvwxyz23456789'; const b = crypto.getRandomValues(new Uint8Array(n)); return [...b].map((x) => a[x % a.length]).join(''); };

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const site = env.SITE_URL ?? 'https://nautomationlabs.com';
    const ip = req.headers.get('cf-connecting-ip');

    if (req.method === 'GET' && url.pathname === '/api/waitlist/country') {
      const cc = req.headers.get('cf-ipcountry');
      let country = '';
      try { country = cc && cc !== 'XX' && cc !== 'T1' ? new Intl.DisplayNames(['en'], { type: 'region' }).of(cc) ?? '' : ''; } catch {}
      return json({ country }, 200, { 'cache-control': 'private, max-age=3600' });
    }

    if (req.method === 'GET' && url.pathname === '/api/waitlist/confirm') {
      const t = url.searchParams.get('t') ?? '';
      if (!t) return Response.redirect(`${site}/waitlist?confirmed=0`, 303);
      const row = await env.DB.prepare('SELECT id, email, referred_by, confirmed_at FROM waitlist WHERE confirm_token = ?').bind(t).first<{ id: string; email: string; referred_by: string | null; confirmed_at: string | null }>();
      if (!row) return Response.redirect(`${site}/waitlist?confirmed=0`, 303);
      if (!row.confirmed_at) {
        const stmts = [env.DB.prepare("UPDATE waitlist SET confirmed_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?").bind(row.id)];
        if (row.referred_by) stmts.push(env.DB.prepare('UPDATE waitlist SET position = MAX(1, position - 5) WHERE ref_code = ?').bind(row.referred_by));
        await env.DB.batch(stmts);
        ctx.waitUntil(Promise.allSettled([
          posthog(env, 'waitlist_confirm', row.email, { referred: !!row.referred_by }),
          sendEmail(env, row.email, 'You’re confirmed — NAutomation Labs waitlist', `<p>Your place on the waitlist is final. Share your link to move up: <a href="${site}/waitlist">${site}/waitlist</a>.</p><p>We invite people in order and will write when it’s your turn.</p><p>— NAutomation Labs</p>`),
        ]));
      }
      return Response.redirect(`${site}/waitlist?confirmed=1`, 303);
    }

    if (req.method === 'GET' && url.pathname === '/api/waitlist/export.csv') {
      if (!env.EXPORT_TOKEN || req.headers.get('authorization') !== `Bearer ${env.EXPORT_TOKEN}`) return json({ error: 'unauthorized' }, 401);
      const { results } = await env.DB.prepare('SELECT position, email, name, company, job_family, country, source, utm_source, utm_medium, utm_campaign, ref_code, referred_by, confirmed_at, created_at FROM waitlist ORDER BY position').all();
      const cols = Object.keys(results[0] ?? { position: 0 });
      const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
      const csv = [cols.join(','), ...results.map((r) => cols.map((c) => esc((r as Record<string, unknown>)[c])).join(','))].join('\n');
      return new Response(csv, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="waitlist.csv"', 'cache-control': 'no-store' } });
    }

    if (req.method === 'POST' && url.pathname === '/api/waitlist') {
      if (!(await rateLimit(env.RATE_LIMIT, ip, 'waitlist', 5, 3600))) return json({ error: 'rate_limited' }, 429);
      const b = await readBody(req);
      const email = clean(b.email, 200).toLowerCase();
      if (!EMAIL_RE.test(email) || !b.consent) return json({ error: 'invalid' }, 400);
      if (!(await verifyTurnstile(env.TURNSTILE_SECRET, b['cf-turnstile-response'], ip))) return json({ error: 'bot_check_failed' }, 403);

      const existing = await env.DB.prepare('SELECT position, ref_code, confirm_token, confirmed_at FROM waitlist WHERE email = ?').bind(email).first<{ position: number; ref_code: string; confirm_token: string; confirmed_at: string | null }>();
      if (existing) {
        if (!existing.confirmed_at) ctx.waitUntil(sendConfirm(env, site, email, existing.confirm_token));
        return json({ error: 'exists', position: existing.position, ref_code: existing.ref_code }, 409);
      }

      const name = clean(b.name, 120), company = clean(b.company, 160), country = clean(b.country, 80);
      const job = JOB_FAMILIES.has(b.job_family) ? b.job_family : null;
      let referred_by: string | null = clean(b.referred_by, 32) || null;
      if (referred_by) { const ok = await env.DB.prepare('SELECT 1 FROM waitlist WHERE ref_code = ?').bind(referred_by).first(); if (!ok) referred_by = null; }
      const offset = Number(env.POSITION_OFFSET ?? 0) || 0;
      const max = await env.DB.prepare('SELECT COALESCE(MAX(position), 0) AS m FROM waitlist').first<{ m: number }>();
      const position = Math.max(max?.m ?? 0, offset) + 1;
      const id = crypto.randomUUID(), ref_code = code(8), confirm_token = code(32);
      await env.DB.prepare(`INSERT INTO waitlist (id, email, name, company, job_family, country, source, utm_source, utm_medium, utm_campaign, ref_code, referred_by, position, confirm_token)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(id, email, name || null, company || null, job, country || null, clean(b.source, 40) || 'website', clean(b.utm_source, 80) || null, clean(b.utm_medium, 80) || null, clean(b.utm_campaign, 80) || null, ref_code, referred_by, position, confirm_token).run();

      ctx.waitUntil(Promise.allSettled([
        sendConfirm(env, site, email, confirm_token),
        zohoLead(env, { Last_Name: name || email.split('@')[0], Email: email, Company: company || '—', Lead_Source: 'website', Description: `Waitlist #${position}\nWork: ${job ?? ''}\nCountry: ${country}`, Tag: [{ name: 'waitlist' }] }),
        posthog(env, 'waitlist_join', email, { job_family: job, country, referred: !!referred_by, utm_source: b.utm_source || null }),
      ]));

      if (!wantsJson(req)) return Response.redirect(`${site}/waitlist?joined=${position}&ref=${ref_code}`, 303);
      return json({ ok: true, position, ref_code });
    }

    return json({ error: 'not found' }, 404);
  },
};

async function sendConfirm(env: Env, site: string, email: string, token: string) {
  const link = `${site}/api/waitlist/confirm?t=${token}`;
  await sendEmail(env, email, 'Confirm your place — NAutomation Labs waitlist',
    `<p>One click to make your place on the waitlist final:</p><p><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p><p>If you didn’t sign up, ignore this email and nothing happens.</p><p>— NAutomation Labs</p>`);
}
