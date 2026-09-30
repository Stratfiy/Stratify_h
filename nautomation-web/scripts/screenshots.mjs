// Full-page screenshots of every page at 390 px and 1440 px, light and dark. Needs `astro preview` (or any server) on PORT.
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
const base = process.env.BASE_URL ?? 'http://localhost:4321';
const exe = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium';
const pages = ['/', '/what-we-do', '/procurement', '/decibyl', '/how-it-works', '/about', '/careers', '/security', '/waitlist', '/contact', '/blog', '/blog/approvals-not-autonomy', '/legal/privacy', '/404'];
await mkdir('screenshots', { recursive: true });
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
for (const scheme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1, colorScheme: scheme });
    const page = await ctx.newPage();
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'declined'); } catch {} document.querySelector('[aria-label="Cookie notice"]')?.remove(); });
      const name = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-')) + `-${width}-${scheme}.png`;
      await page.screenshot({ path: `screenshots/${name}`, fullPage: true });
      console.log('shot', name);
    }
    await ctx.close();
  }
}
await browser.close();
