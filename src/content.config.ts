import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Note types follow docs/CONTENT-GUIDE.md ("글 유형").
export const NOTE_TYPES = [
  'Research Note',
  'Paper Review',
  'Technical Deep Dive',
  'Implementation Note',
  'Development Log',
  'Research Journey',
  'Project Case Study',
] as const;

const notes = defineCollection({
  // One folder per note: src/content/notes/<slug>/index.md. The folder name is the URL slug.
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/notes',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(NOTE_TYPES),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    math: z.boolean().default(false),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes };
