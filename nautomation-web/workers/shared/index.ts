// Shared helpers for the contact and waitlist Workers.

export const json = (data: unknown, status = 200, extra: HeadersInit = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra } });

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FREE_MAIL = new Set(['gmail.com', 'yahoo.com', 'yahoo.in', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'rediffmail.com', 'protonmail.com', 'proton.me']);
export const isWorkEmail = (e: string) => EMAIL_RE.test(e) && !FREE_MAIL.has(e.split('@')[1]?.toLowerCase());

/** Accept JSON or a classic form POST (progressive enhancement when JS is off). */
export async function readBody(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    const j = (await req.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(j).map(([k, v]) => [k, v == null ? '' : String(v)]));
  }
  const fd = await req.formData();
  return Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)]));
}

export const wantsJson = (req: Request) => (req.headers.get('accept') ?? '').includes('application/json') || (req.headers.get('content-type') ?? '').includes('application/json');

export const clean = (s: string | undefined, max = 500) => (s ?? '').toString().trim().slice(0, max);

export async function verifyTurnstile(secret: string | undefined, token: string | undefined, ip: string | null): Promise<boolean> {
  if (!secret) return true; // Turnstile not configured (local dev)
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const j = (await r.json()) as { success: boolean };
  return !!j.success;
}

/** Sliding-window rate limit on a hashed IP, backed by KV. Returns true when the request is allowed. */
export async function rateLimit(kv: KVNamespace | undefined, ip: string | null, key: string, limit: number, windowSec: number): Promise<boolean> {
  if (!kv || !ip) return true;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  const hash = [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
  const k = `rl:${key}:${hash}`;
  const now = Date.now();
  const hits = ((await kv.get<number[]>(k, 'json')) ?? []).filter((t) => now - t < windowSec * 1000);
  if (hits.length >= limit) return false;
  hits.push(now);
  await kv.put(k, JSON.stringify(hits), { expirationTtl: windowSec });
  return true;
}

export async function sendEmail(env: { RESEND_API_KEY?: string; FROM_EMAIL?: string }, to: string, subject: string, html: string, replyTo?: string) {
  if (!env.RESEND_API_KEY) { console.log('email (dry run):', { to, subject }); return; }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.FROM_EMAIL ?? 'NAutomation Labs <office@nautomationlabs.com>', to, subject, html, reply_to: replyTo }),
  });
  if (!r.ok) console.error('resend failed', r.status, await r.text());
}

/** Zoho CRM lead via a self-client refresh token. Fails soft: a CRM outage never blocks the form. */
export async function zohoLead(env: { ZOHO_CLIENT_ID?: string; ZOHO_CLIENT_SECRET?: string; ZOHO_REFRESH_TOKEN?: string; ZOHO_API_DOMAIN?: string; ZOHO_ACCOUNTS_DOMAIN?: string }, lead: Record<string, unknown>) {
  if (!env.ZOHO_CLIENT_ID || !env.ZOHO_CLIENT_SECRET || !env.ZOHO_REFRESH_TOKEN) { console.log('zoho (dry run):', lead); return; }
  try {
    const accounts = env.ZOHO_ACCOUNTS_DOMAIN ?? 'https://accounts.zoho.in';
    const tok = await fetch(`${accounts}/oauth/v2/token?${new URLSearchParams({ refresh_token: env.ZOHO_REFRESH_TOKEN, client_id: env.ZOHO_CLIENT_ID, client_secret: env.ZOHO_CLIENT_SECRET, grant_type: 'refresh_token' })}`, { method: 'POST' });
    const { access_token } = (await tok.json()) as { access_token: string };
    const api = env.ZOHO_API_DOMAIN ?? 'https://www.zohoapis.in';
    const r = await fetch(`${api}/crm/v6/Leads/upsert`, {
      method: 'POST',
      headers: { authorization: `Zoho-oauthtoken ${access_token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ data: [lead], duplicate_check_fields: ['Email'] }),
    });
    if (!r.ok) console.error('zoho failed', r.status, await r.text());
  } catch (e) { console.error('zoho error', e); }
}

export async function posthog(env: { POSTHOG_KEY?: string; POSTHOG_HOST?: string }, event: string, distinctId: string, properties: Record<string, unknown>) {
  if (!env.POSTHOG_KEY) return;
  try {
    await fetch(`${env.POSTHOG_HOST ?? 'https://us.i.posthog.com'}/capture/`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ api_key: env.POSTHOG_KEY, event, distinct_id: distinctId, properties: { ...properties, $lib: 'worker' } }),
    });
  } catch {}
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
