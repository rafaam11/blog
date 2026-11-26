// Checks that every internal link in the built site points at a file that exists.
// Usage: node scripts/check-links.mjs [distDir] [basePath]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const base = (process.argv[3] ?? '/blog').replace(/\/$/, '');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function exists(urlPath) {
  const target = join(dist, decodeURIComponent(urlPath));
  if (!existsSync(target)) return false;
  return statSync(target).isDirectory() ? existsSync(join(target, 'index.html')) : true;
}

const pages = walk(dist).filter((f) => f.endsWith('.html'));
const broken = [];
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  for (const [, raw] of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    const link = raw.replaceAll('&amp;', '&');
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(link)) continue; // external, mailto:, data:
    checked += 1;

    const [pathPart, hash] = link.split('#');
    if (pathPart === '') {
      if (hash && !ids.has(decodeURIComponent(hash))) broken.push([page, link, 'no such id on the page']);
      continue;
    }
    if (!pathPart.startsWith('/')) {
      broken.push([page, link, 'relative link: use a path that starts with the base']);
      continue;
    }
    const path = pathPart.split('?')[0];
    if (path !== base && !path.startsWith(`${base}/`)) {
      broken.push([page, link, `outside the base path ${base}`]);
      continue;
    }
    if (!exists(path.slice(base.length) || '/')) broken.push([page, link, 'target not found']);
  }
}

for (const [page, link, why] of broken) console.error(`${relative(dist, page)}: ${link} (${why})`);
console.log(`${pages.length} pages, ${checked} internal links, ${broken.length} broken`);
process.exit(broken.length > 0 ? 1 : 0);
