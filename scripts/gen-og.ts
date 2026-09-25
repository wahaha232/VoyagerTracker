/**
 * gen-og.ts — renders public/og-image.png (1200×630), the preview image
 * shown when a page is shared on social media or in chat apps.
 *
 * The distances on the card are calculated with the site's own model for
 * the day the script runs, and that date is printed on the card.
 *
 * Usage:  npm run og   (then commit public/og-image.png)
 */

import { writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { AU_KM, estimate } from '../src/lib/ephemeris';

const today = new Date().toISOString().slice(0, 10);
const at = Date.parse(`${today}T00:00:00Z`);
const v1 = estimate('voyager1', at);
const v2 = estimate('voyager2', at);
const au = (km: number) => (km / AU_KM).toFixed(1);
const hrs = (s: number) => (s / 3600).toFixed(1);

// Deterministic star field.
let seed = 42;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const stars = Array.from({ length: 140 }, () => {
  const x = (rand() * 1200).toFixed(1);
  const y = (rand() * 630).toFixed(1);
  const r = (rand() * 1.4 + 0.3).toFixed(2);
  const o = (rand() * 0.6 + 0.2).toFixed(2);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`;
}).join('');

function card(x: number, name: string, color: string, e: typeof v1) {
  return `
  <g transform="translate(${x},330)">
    <rect width="500" height="170" rx="22" fill="#0f172a" fill-opacity="0.85" stroke="${color}" stroke-opacity="0.55" stroke-width="2"/>
    <text x="30" y="48" font-family="Consolas" font-size="24" font-weight="bold" fill="${color}" letter-spacing="3">${name.toUpperCase()}</text>
    <text x="30" y="108" font-family="Arial" font-size="54" font-weight="bold" fill="#ffffff">${au(e.earthKm)} AU</text>
    <text x="30" y="146" font-family="Consolas" font-size="22" fill="#cbd5e1">from Earth · signal ${hrs(e.lightTimeS)} h</text>
  </g>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="0.25" cy="0.2" r="1.1">
      <stop offset="0" stop-color="#0b2540"/>
      <stop offset="0.55" stop-color="#050b1f"/>
      <stop offset="1" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#06b6d4"/>
      <stop offset="1" stop-color="#10b981"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  ${stars}
  <circle cx="1080" cy="120" r="170" fill="none" stroke="#a78bfa" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="10 8"/>
  <circle cx="1080" cy="120" r="16" fill="#fbbf24"/>
  <rect x="70" y="62" width="64" height="64" rx="16" fill="url(#logo)"/>
  <circle cx="96" cy="100" r="14" fill="none" stroke="#020617" stroke-width="4"/>
  <line x1="106" y1="90" x2="120" y2="76" stroke="#020617" stroke-width="4" stroke-linecap="round"/>
  <text x="152" y="110" font-family="Arial" font-size="44" font-weight="bold" fill="#ffffff" letter-spacing="2">Voyager Tracker</text>
  <text x="72" y="210" font-family="Arial" font-size="50" font-weight="bold" fill="#ffffff">Where are Voyager 1 and</text>
  <text x="72" y="272" font-family="Arial" font-size="50" font-weight="bold" fill="#ffffff">Voyager 2 right now?</text>
  ${card(70, 'Voyager 1', '#22d3ee', v1)}
  ${card(630, 'Voyager 2', '#34d399', v2)}
  <text x="72" y="556" font-family="Consolas" font-size="21" fill="#94a3b8">Calculated estimates for ${today} from NASA/JPL Horizons data</text>
  <text x="72" y="588" font-family="Consolas" font-size="21" fill="#94a3b8">Independent educational project · not affiliated with NASA or JPL</text>
</svg>`;

const png = new Resvg(svg, { font: { loadSystemFonts: true, defaultFontFamily: 'Arial' } }).render().asPng();
writeFileSync('public/og-image.png', png);
console.log(`public/og-image.png written (${png.length} bytes) with values for ${today}.`);
