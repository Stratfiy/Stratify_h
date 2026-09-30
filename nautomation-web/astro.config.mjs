// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nautomationlabs.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/waitlist') && !page.includes('/lab') && !page.includes('/404'),
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  // The Tailwind plugin's Vite types differ from Astro's bundled Vite; the plugin works at runtime.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
  prefetch: false,
});
