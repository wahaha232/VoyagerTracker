/**
 * prerender.mjs — static HTML for every page (runs after `vite build`).
 *
 * 1. Renders each page with the SSR bundle (dist-ssr/entry-server.js) and
 *    injects the HTML into #root, so crawlers and no-JS visitors get the
 *    full text, headings and links. The browser then re-renders with the
 *    visitor's language and live values.
 * 2. Adds JSON-LD that only describes what the page really contains; the
 *    FAQPage entries are generated from the same data the FAQ renders.
 * 3. Writes sitemap.xml from pages.mjs, so it can never list a missing URL.
 */

import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PAGES, NOT_FOUND, SITE_URL, SITE_NAME, pageHref } from './pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const SSR = resolve(ROOT, 'dist-ssr/entry-server.js');
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const { render, faqForSchema } = await import(pathToFileURL(SSR).href);

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description:
    'Independent educational website about NASA’s Voyager 1 and Voyager 2: calculated distance estimates, comparisons, calculators, mission history and science explanations.',
  inLanguage: ['en', 'zh-TW', 'es'],
};

function jsonLd(p) {
  const url = pageHref(p);
  const graph = [website];
  const node = {
    '@type': p.schema,
    '@id': `${url}#page`,
    url,
    name: p.title,
    description: p.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}#website` },
    dateModified: BUILD_DATE,
  };
  if (p.schema === 'Article') {
    Object.assign(node, {
      headline: p.title,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    });
  }
  if (p.schema === 'FAQPage') {
    node.mainEntity = faqForSchema().map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }));
  }
  graph.push(node);
  if (p.key !== 'home') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: p.name, item: url },
      ],
    });
  }
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">\n${json}\n    </script>`;
}

function inject(p, withJsonLd) {
  const file = resolve(DIST, p.file);
  let html = readFileSync(file, 'utf8');
  const marker = `<div id="root" data-page="${p.key}"></div>`;
  if (!html.includes(marker)) throw new Error(`${p.file}: #root marker not found`);
  html = html.replace(marker, `<div id="root" data-page="${p.key}">${render(p.key)}</div>`);
  html = html.replace('<!--jsonld-->', withJsonLd ? jsonLd(p) : '');
  writeFileSync(file, html);
}

for (const p of PAGES) inject(p, true);
inject(NOT_FOUND, false);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (p) => `  <url>
    <loc>${pageHref(p)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`;
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap);

if (existsSync(resolve(ROOT, 'dist-ssr'))) rmSync(resolve(ROOT, 'dist-ssr'), { recursive: true, force: true });
console.log(`prerender: ${PAGES.length + 1} pages rendered, sitemap with ${PAGES.length} URLs (${BUILD_DATE}).`);
