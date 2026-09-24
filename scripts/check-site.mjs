/**
 * check-site.mjs — static checks on the built site in dist/.
 *
 *   node scripts/check-site.mjs            internal checks only
 *   node scripts/check-site.mjs --external also request every external link
 *
 * Checks: title/description/canonical per page, unique titles, one <h1>,
 * valid JSON-LD, FAQ JSON-LD text present in the visible HTML, every
 * internal link and asset resolves to a file, and sitemap URLs exist.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const BASE = '/VoyagerTracker/';
const SITE = 'https://wahaha232.github.io/VoyagerTracker/';
const checkExternal = process.argv.includes('--external');

const problems = [];
const external = new Set();
const titles = new Map();

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

for (const file of readdirSync(DIST).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(resolve(DIST, file), 'utf8');
  const is404 = file === '404.html';
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;

  if (!title) problems.push(`${file}: missing <title>`);
  else if (titles.has(title)) problems.push(`${file}: duplicate title with ${titles.get(title)}`);
  else titles.set(title, file);
  if (!desc || desc.length < 50) problems.push(`${file}: missing/short description`);
  if (!is404) {
    const expected = file === 'index.html' ? SITE : `${SITE}${file}`;
    if (canonical !== expected) problems.push(`${file}: canonical ${canonical} ≠ ${expected}`);
  }
  if (h1s !== 1) problems.push(`${file}: ${h1s} <h1> elements`);

  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      const faq = data['@graph']?.find((n) => n['@type'] === 'FAQPage');
      if (faq) {
        const visible = decode(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ''));
        for (const q of faq.mainEntity) {
          if (!visible.includes(q.name)) problems.push(`${file}: FAQ question not visible: ${q.name}`);
          if (!visible.includes(q.acceptedAnswer.text)) problems.push(`${file}: FAQ answer not visible for: ${q.name}`);
        }
      }
    } catch (e) {
      problems.push(`${file}: invalid JSON-LD (${e.message})`);
    }
  }

  // Links and assets
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = decode(m[1]);
    if (/^https?:\/\//.test(url)) {
      if (!url.startsWith(SITE) && !url.includes('fonts.g')) external.add(url.split('#')[0]);
      continue;
    }
    if (url.startsWith('#') || url.startsWith('mailto:')) continue;
    if (!url.startsWith(BASE)) {
      problems.push(`${file}: non-base-path link ${url}`);
      continue;
    }
    const path = url.slice(BASE.length).split('#')[0].split('?')[0] || 'index.html';
    if (!existsSync(resolve(DIST, path))) problems.push(`${file}: broken internal link ${url}`);
  }
}

// Sitemap
const sitemap = readFileSync(resolve(DIST, 'sitemap.xml'), 'utf8');
for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = m[1].slice(SITE.length) || 'index.html';
  if (!existsSync(resolve(DIST, path))) problems.push(`sitemap: ${m[1]} has no file`);
}
const robots = readFileSync(resolve(DIST, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE}sitemap.xml`)) problems.push('robots.txt: sitemap line missing');

if (checkExternal) {
  const results = await Promise.all(
    [...external].map(async (url) => {
      try {
        const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (link check)' }, signal: AbortSignal.timeout(20000) });
        return [url, res.status];
      } catch (e) {
        return [url, `error ${e.cause?.code ?? e.message}`];
      }
    }),
  );
  for (const [url, status] of results) {
    console.log(`${status}  ${url}`);
    if (status !== 200) problems.push(`external ${status}: ${url}`);
  }
}

console.log(`\nChecked ${titles.size} pages, ${external.size} external URLs${checkExternal ? '' : ' (not requested)'}.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('No problems found.');
}
