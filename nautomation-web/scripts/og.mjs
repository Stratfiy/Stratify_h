// Generates one 1200×630 OG image per page at build time (satori + resvg). Output: public/og/<slug>.png
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const pages = {
  home: ['The work, done.', 'AI agents that get your business’s work done. Approvals. A record of every action.'],
  'what-we-do': ['What we do', 'Follow-ups · Vendor coordination · Front desk · Back office'],
  procurement: ['AI agents for procurement & logistics teams', 'RFQs, quotes, PO follow-ups, invoice matching. Every call and email logged.'],
  decibyl: ['Decibyl', 'The AI assistant every person in a business uses. Start free.'],
  'how-it-works': ['How it works', 'Proof of value → 90-day pilot → run → expand'],
  about: ['About NAutomation Labs', 'An AI-native studio. Registered in Hosur, remote across India.'],
  careers: ['Careers', 'The application is the work sample.'],
  security: ['Security', 'Every action logged. Approvals before consequences. Data stays yours.'],
  waitlist: ['Join the waitlist', 'We invite people in order.'],
  contact: ['Book a proof of value', 'Free, two to three weeks, on your data.'],
  blog: ['Blog', 'Plain words about agents, approvals and records.'],
  'legal-privacy': ['Privacy notice', 'nautomationlabs.com'],
  'legal-terms': ['Terms of use', 'nautomationlabs.com'],
  '404': ['Not found', 'nautomationlabs.com'],
};
// Blog posts from frontmatter
for (const f of await readdir('content/blog')) {
  if (!f.endsWith('.mdx')) continue;
  const src = await readFile(`content/blog/${f}`, 'utf8');
  const title = /^title:\s*"(.+)"/m.exec(src)?.[1] ?? f;
  const desc = /^description:\s*"(.+)"/m.exec(src)?.[1] ?? '';
  pages[`blog-${f.replace(/\.mdx$/, '')}`] = [title.replace(/\\'/g, "'"), desc.slice(0, 120)];
}

const serif = await readFile(require.resolve('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff'));
// Body copy also uses the serif here: satori needs static-weight TTF/WOFF and Inter ships as a variable woff2.
const fonts = [{ name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' }];

await mkdir('public/og', { recursive: true });
for (const [slug, [title, sub]] of Object.entries(pages)) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: { width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#F7F6F2', color: '#141413', fontFamily: 'Instrument Serif' },
        children: [
          { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: 16, fontSize: 30 }, children: [
            { type: 'div', props: { style: { width: 44, height: 44, borderRadius: 10, background: '#26215C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }, children: 'NL' } },
            { type: 'div', props: { children: 'NAutomation Labs' } },
          ] } },
          { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', gap: 20 }, children: [
            { type: 'div', props: { style: { fontSize: title.length > 40 ? 64 : 88, lineHeight: 1.05, letterSpacing: -1 }, children: title } },
            { type: 'div', props: { style: { fontSize: 32, color: '#5A5955', lineHeight: 1.3 }, children: sub } },
          ] } },
          { type: 'div', props: { style: { display: 'flex', gap: 28, fontSize: 22, color: '#5A5955' }, children: ['Every action logged', 'Approvals before consequences', 'Data stays yours'].map((t) => ({ type: 'div', props: { children: '● ' + t } })) } },
        ],
      },
    },
    { width: 1200, height: 630, fonts },
  );
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(`public/og/${slug}.png`, png);
}
console.log(`og: ${Object.keys(pages).length} images written to public/og/`);
