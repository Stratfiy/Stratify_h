// Mobile Lighthouse for Home, Procurement and Security (the launch checklist's three) plus any extra paths passed as args.
import { spawnSync } from 'node:child_process';
import { mkdir, readFile } from 'node:fs/promises';
const base = process.env.BASE_URL ?? 'http://localhost:4321';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/procurement', '/security'];
await mkdir('lighthouse', { recursive: true });
const rows = [];
for (const p of paths) {
  const name = p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-');
  const out = `lighthouse/${name}.json`;
  const r = spawnSync('npx', ['lighthouse', base + p, '--quiet', '--output=json', `--output-path=${out}`, '--only-categories=performance,accessibility,best-practices,seo', '--form-factor=mobile', '--screenEmulation.mobile', '--throttling-method=simulate', '--chrome-flags=--headless=new --no-sandbox'], { stdio: 'inherit', env: { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium' } });
  if (r.status !== 0) { console.error('lighthouse failed for', p); continue; }
  const j = JSON.parse(await readFile(out, 'utf8'));
  const c = j.categories, a = j.audits;
  rows.push({ page: p, perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), lcp: a['largest-contentful-paint'].displayValue, cls: a['cumulative-layout-shift'].displayValue, tbt: a['total-blocking-time'].displayValue });
}
console.table(rows);
