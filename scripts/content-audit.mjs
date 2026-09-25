/**
 * content-audit.mjs — measure the prerendered English text of every page.
 *
 * Reports words per page (main content only, header/footer excluded),
 * sentences that appear on more than one page, and placeholder markers.
 * Used for the thin/duplicate-content sections of the AdSense audits.
 *
 * Usage:  node scripts/content-audit.mjs   (after `npm run build`)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const pages = {};
for (const file of readdirSync(DIST).filter((f) => f.endsWith('.html') && f !== '404.html')) {
  const html = readFileSync(resolve(DIST, file), 'utf8');
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  const text = decode(main.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  pages[file] = text;
}

const sentenceOwners = new Map();
for (const [file, text] of Object.entries(pages)) {
  for (const s of text.split(/(?<=[.!?])\s+/)) {
    const key = s.trim();
    if (key.split(' ').length < 8) continue; // ignore short labels
    if (!sentenceOwners.has(key)) sentenceOwners.set(key, new Set());
    sentenceOwners.get(key).add(file);
  }
}

console.log('Words in <main> per page:');
for (const [file, text] of Object.entries(pages).sort((a, b) => a[1].split(' ').length - b[1].split(' ').length)) {
  console.log(`  ${String(text.split(' ').length).padStart(5)}  ${file}`);
}

const dups = [...sentenceOwners].filter(([, owners]) => owners.size > 1);
console.log(`\nSentences (8+ words) repeated on more than one page: ${dups.length}`);
for (const [s, owners] of dups) console.log(`  [${[...owners].join(', ')}] ${s.slice(0, 110)}${s.length > 110 ? '…' : ''}`);

const markers = /lorem ipsum|coming soon|under construction|\bTODO\b|placeholder/i;
const flagged = Object.entries(pages).filter(([, t]) => markers.test(t)).map(([f]) => f);
console.log(`\nPlaceholder markers: ${flagged.length ? flagged.join(', ') : 'none'}`);
