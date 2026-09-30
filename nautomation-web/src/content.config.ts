import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('NAutomation Labs'),
    tags: z.array(z.string()).default([]),
    diagram: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
