// Generates one 1200×630 OG image per page at build time (satori + resvg). Output: public/og/<slug>.png
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const pages = {
  home: ['Robots that machine shops can teach themselves.', 'nA labs, the robotics arm of NAutomation Labs.'],
  robots: ['Four bodies. One brain.', 'A trolley arm first, then three more.'],
  software: ['One brain for every robot.', 'Teach a job by showing it. Run it on any robot.'],
  jobs: ['The jobs we are building them for.', 'Machine tending, pick and place, inspection and more.'],
  roadmap: ['From the shop floor to beyond Earth.', 'Build for space before we build in space.'],
  about: ['Make India build faster.', 'nA labs, OrderShed and Decibyl are NAutomation Labs.'],
  contact: ['Talk to us', 'Parts made, or a job automated.'],
  privacy: ['Privacy notice', 'nautomationlabs.com'],
  '404': ['Not found', 'nautomationlabs.com'],
};

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
