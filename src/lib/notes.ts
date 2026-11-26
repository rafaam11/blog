import { getCollection, type CollectionEntry } from 'astro:content';
import { SERIES } from '../data/series';
import { SITE } from '../site';

export type Note = CollectionEntry<'notes'>;

/** Published notes, newest first. Drafts are visible only in dev. */
export async function getNotes(): Promise<Note[]> {
  const all = await getCollection('notes', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Same rule the previous site used for tag URLs: lower case, non-letters to hyphens, Korean kept. */
export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** YYYY-MM-DD in the site's time zone. */
export function isoDate(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: SITE.timeZone }).format(date);
}

export interface SeriesPart {
  order: number;
  title: string;
  note?: Note;
}

export interface SeriesView {
  name: string;
  intro?: string;
  parts: SeriesPart[];
}

/** Merge published notes with planned titles into one ordered list per series. */
export function buildSeries(notes: Note[]): SeriesView[] {
  const names = new Set<string>(SERIES.map((s) => s.name));
  for (const n of notes) if (n.data.series) names.add(n.data.series);

  return [...names].map((name) => {
    const meta = SERIES.find((s) => s.name === name);
    const published: SeriesPart[] = notes
      .filter((n) => n.data.series === name)
      .map((n) => ({ order: n.data.seriesOrder ?? Number.MAX_SAFE_INTEGER, title: n.data.title, note: n }));
    const taken = new Set(published.map((p) => p.order));
    const planned: SeriesPart[] = (meta?.planned ?? []).filter((p) => !taken.has(p.order));
    const parts = [...published, ...planned].sort((a, b) => a.order - b.order);
    return { name, intro: meta?.intro, parts };
  });
}

/** Where a note sits in its series: "N편 중 M편" and its neighbours. */
export function seriesPosition(note: Note, all: Note[]) {
  if (!note.data.series) return undefined;
  const view = buildSeries(all).find((s) => s.name === note.data.series);
  if (!view) return undefined;
  const index = view.parts.findIndex((p) => p.note?.id === note.id);
  if (index < 0) return undefined;
  return {
    view,
    index,
    total: view.parts.length,
    prev: view.parts[index - 1],
    next: view.parts[index + 1],
  };
}
