import type { APIContext } from 'astro';
import { getNotes, isoDate, tagSlug } from '../lib/notes';
import { url } from '../site';

// Pages that should be indexed. Redirect pages and the 404 page are left out on purpose.
export async function GET(context: APIContext) {
  const notes = await getNotes();
  const abs = (path: string) => new URL(url(path), context.site).href;
  const tags = new Set(notes.flatMap((n) => n.data.tags.map(tagSlug)));

  const entries: { loc: string; lastmod?: string }[] = [
    { loc: abs('/') },
    { loc: abs('/notes/') },
    { loc: abs('/series/') },
    { loc: abs('/tags/') },
    { loc: abs('/about/') },
    ...notes.map((n) => ({ loc: abs(`/posts/${n.id}/`), lastmod: isoDate(n.data.date) })),
    ...[...tags].map((t) => ({ loc: abs(`/tags/${t}/`) })),
  ];

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries
      .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    '\n</urlset>\n';

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
