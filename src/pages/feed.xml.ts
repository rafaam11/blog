import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes } from '../lib/notes';
import { SITE, url } from '../site';

export async function GET(context: APIContext) {
  const notes = await getNotes();
  const abs = (path: string) => new URL(url(path), context.site).href;
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: abs('/'),
    customData: '<language>ko-KR</language>',
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.date,
      link: abs(`/posts/${note.id}/`),
      categories: note.data.tags,
    })),
  });
}
