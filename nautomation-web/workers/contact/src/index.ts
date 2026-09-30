/**
 * Contact Worker — POST /api/contact
 * Emails office@ and creates a Zoho CRM lead (source=website). Turnstile + KV rate limit.
 */
import { json, readBody, wantsJson, clean, EMAIL_RE, verifyTurnstile, rateLimit, sendEmail, zohoLead, posthog, escapeHtml } from '../../shared';

export interface Env {
  RATE_LIMIT?: KVNamespace;
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  FROM_EMAIL?: string;
  OFFICE_EMAIL?: string;
  ZOHO_CLIENT_ID?: string; ZOHO_CLIENT_SECRET?: string; ZOHO_REFRESH_TOKEN?: string; ZOHO_API_DOMAIN?: string; ZOHO_ACCOUNTS_DOMAIN?: string;
  POSTHOG_KEY?: string; POSTHOG_HOST?: string;
  SITE_URL?: string;
}

const PROCUREMENT = new Set(['rfqs-quotes', 'po-followups-deliveries', 'invoice-matching', 'supplier-onboarding-documents', 'procurement-logistics']);

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    if (req.method !== 'POST' || url.pathname !== '/api/contact') return json({ error: 'not found' }, 404);
    const ip = req.headers.get('cf-connecting-ip');
    if (!(await rateLimit(env.RATE_LIMIT, ip, 'contact', 5, 3600))) return json({ error: 'rate_limited' }, 429);

    const b = await readBody(req);
    const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase(), company = clean(b.company, 160), task = clean(b.task, 60);
    const channel = clean(b.channel, 20) || 'email', message = clean(b.message, 4000), page = clean(b.page, 200);
    if (!name || !company || !task || !EMAIL_RE.test(email)) return json({ error: 'invalid' }, 400);
    if (!(await verifyTurnstile(env.TURNSTILE_SECRET, b['cf-turnstile-response'], ip))) return json({ error: 'bot_check_failed' }, 403);

    const segment = PROCUREMENT.has(task) ? 'procurement' : 'general';
    const site = env.SITE_URL ?? 'https://nautomationlabs.com';
    const office = env.OFFICE_EMAIL ?? 'office@nautomationlabs.com';

    const work = [
      sendEmail(env, office, `[Website] ${segment === 'procurement' ? 'Procurement' : 'PoV'} enquiry: ${company} — ${task}`,
        `<h2>New enquiry from ${escapeHtml(site)}${escapeHtml(page)}</h2>
         <table>
         <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
         <tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
         <tr><td><b>Company</b></td><td>${escapeHtml(company)}</td></tr>
         <tr><td><b>Work</b></td><td>${escapeHtml(task)}</td></tr>
         <tr><td><b>Channel</b></td><td>${escapeHtml(channel)}</td></tr>
         <tr><td><b>Segment</b></td><td>${segment}</td></tr>
         </table><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`, email),
      sendEmail(env, email, 'We got your message — NAutomation Labs',
        `<p>Hi ${escapeHtml(name.split(' ')[0])},</p><p>Thanks for writing. We reply within one business day with two or three times for a first call.</p><p>Meanwhile, here is what a proof of value involves: <a href="${site}/how-it-works">${site}/how-it-works</a>.</p><p>— NAutomation Labs</p>`),
      zohoLead(env, { Last_Name: name, Email: email, Company: company, Lead_Source: 'website', Description: `Task: ${task}\nChannel: ${channel}\nPage: ${page}\n\n${message}`, Lead_Status: 'Not Contacted' }),
      posthog(env, 'contact_submit', email, { segment, task, channel, page }),
    ];
    ctx.waitUntil(Promise.allSettled(work));

    if (!wantsJson(req)) return Response.redirect(`${site}/contact?sent=1`, 303);
    return json({ ok: true });
  },
};
