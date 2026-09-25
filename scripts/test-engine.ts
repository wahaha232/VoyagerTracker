/**
 * test-engine.ts — unit and sanity tests for the calculation engine and
 * the calculators' input handling.
 *
 * Usage:  npm test
 */

import {
  AU_KM,
  C_KM_S,
  MODEL_VALID,
  estimate,
  estimateAt,
  historicalEstimate,
  historyRange,
  whenEarthDistanceReaches,
} from '../src/lib/ephemeris';
import { LIGHT_DAY_KM, LIGHT_YEAR_KM, UNITS, convert, elapsedYearsDays, formatBig, travelYears } from '../src/lib/context';
import { parseDate, parseNonNegative } from '../src/components/tools/toolUi';

let passed = 0;
const failures: string[] = [];
function check(name: string, ok: boolean, detail = '') {
  if (ok) passed++;
  else failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
}
const near = (a: number, b: number, tol: number) => Math.abs(a - b) <= tol;
const D = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

// --- Constants and conversions ---------------------------------------------
check('1 AU is 149,597,870.7 km', AU_KM === 149_597_870.7);
check('speed of light is 299,792.458 km/s', C_KM_S === 299_792.458);
check('1 AU light time ≈ 499.0 s', near(AU_KM / C_KM_S, 499.005, 0.01), String(AU_KM / C_KM_S));
check('light-day = c × 86,400 s', LIGHT_DAY_KM === C_KM_S * 86_400);
check('light-year ≈ 9.4607e12 km', near(LIGHT_YEAR_KM, 9.4607e12, 1e8));
check('km → AU → km round trip', near(convert(convert(12_345_678, 'km', 'au'), 'au', 'km'), 12_345_678, 1e-6));
check('1 mile = 1.609344 km', UNITS.mi === 1.609_344);
check('light-hour unit', near(convert(1, 'lightHour', 'km'), C_KM_S * 3600, 1e-6));
check('travelYears: 900 km/h for 1 year', near(travelYears(900 * 24 * 365.25, 900), 1, 1e-12));
check('formatBig keeps small values', formatBig(0.00272, 'en-US') === '0.00272', formatBig(0.00272, 'en-US'));
check('formatBig compacts huge values', /[KMB]/.test(formatBig(5_000_000, 'en-US')), formatBig(5_000_000, 'en-US'));

// --- Dates -------------------------------------------------------------------
const e1 = elapsedYearsDays(Date.parse('1977-09-05T12:00:00Z'), Date.parse('1978-09-05T12:00:00Z'));
check('elapsed: exactly one year', e1.years === 1 && e1.days === 0, JSON.stringify(e1));
const e2 = elapsedYearsDays(Date.parse('1977-09-05T12:00:00Z'), Date.parse('1977-09-15T12:00:00Z'));
check('elapsed: ten days', e2.years === 0 && e2.days === 10, JSON.stringify(e2));

// --- Input parsing -------------------------------------------------------------
check('parse: empty → null', parseNonNegative('') === null);
check('parse: negative → null', parseNonNegative('-1') === null);
check('parse: text → null', parseNonNegative('abc') === null);
check('parse: decimal', parseNonNegative('1.5') === 1.5);
check('parse: zero allowed', parseNonNegative('0') === 0);
check('parse: thousands separator', parseNonNegative('1,000') === 1000);
check('parse: huge value', parseNonNegative('1e30') === 1e30);
check('date: valid', parseDate('2000-01-01') === Date.parse('2000-01-01T12:00:00Z'));
check('date: invalid format', parseDate('01/01/2000') === null);
check('date: impossible date', parseDate('2000-13-40') === null);

// --- Model -------------------------------------------------------------------
const lightDay = whenEarthDistanceReaches('voyager1', LIGHT_DAY_KM, D('2026-01-01'));
check('V1 one light-day on 2026-11-18 (NASA date)', lightDay !== null && new Date(lightDay).toISOString().startsWith('2026-11-18'), lightDay ? new Date(lightDay).toISOString() : 'null');
const now = D('2026-09-25');
const v1 = estimate('voyager1', now);
const v2 = estimate('voyager2', now);
check('V1 farther from the Sun than V2', v1.sunKm > v2.sunKm);
check('V1 speed ≈ 16.9 km/s', near(v1.speedSunKmS, 16.9, 0.1), String(v1.speedSunKmS));
check('V2 speed ≈ 15.3 km/s', near(v2.speedSunKmS, 15.3, 0.1), String(v2.speedSunKmS));
check('light time = Earth distance / c', near(v1.lightTimeS, v1.earthKm / C_KM_S, 1e-6));
for (let m = 0; m < 12; m++) {
  const t = Date.UTC(2026, m, 15);
  const e = estimate('voyager1', t);
  check(`Earth − Sun distance within ±1 AU (month ${m + 1})`, Math.abs(e.earthKm - e.sunKm) < 1.02 * AU_KM);
}

// --- Historical reconstruction and method selection --------------------------
check('estimateAt: 2026 uses the model', estimateAt('voyager1', now)?.method === 'model');
check('estimateAt: 2000 uses the history', estimateAt('voyager1', D('2000-01-01'))?.method === 'history');
check('estimateAt: before launch → null', estimateAt('voyager1', D('1970-01-01')) === null);
check('estimateAt: after 2034 → null', estimateAt('voyager1', D('2040-01-01')) === null);
const edge = MODEL_VALID.startMs + 86_400_000;
const hm = historicalEstimate('voyager1', edge)!;
const mm = estimate('voyager1', edge);
check('model and history agree at the 2024 boundary (<100,000 km)', Math.abs(hm.earthKm - mm.earthKm) < 100_000, String(Math.abs(hm.earthKm - mm.earthKm)));
const pbd = estimateAt('voyager1', Date.parse('1990-02-14T12:00:00Z'))!;
check('Pale Blue Dot: V1 ≈ 40.3 AU from the Sun', near(pbd.sunKm / AU_KM, 40.3, 0.2), String(pbd.sunKm / AU_KM));
const hp = estimateAt('voyager1', Date.parse('2012-08-25T12:00:00Z'))!;
check('Heliopause 2012: V1 ≈ 121.6 AU', near(hp.sunKm / AU_KM, 121.6, 0.2), String(hp.sunKm / AU_KM));
const hp2 = estimateAt('voyager2', Date.parse('2018-11-05T12:00:00Z'))!;
check('Heliopause 2018: V2 ≈ 119.0 AU', near(hp2.sunKm / AU_KM, 119.0, 0.2), String(hp2.sunKm / AU_KM));
const r = historyRange('voyager2');
check('history range starts in Aug 1977', new Date(r.startMs).toISOString().startsWith('1977-08'));
let monotonic = true;
for (let y = 1990; y < 2034; y++) {
  const a = estimateAt('voyager1', Date.UTC(y, 0, 1))!;
  const b = estimateAt('voyager1', Date.UTC(y + 1, 0, 1))!;
  if (b.sunKm <= a.sunKm) monotonic = false;
}
check('V1 Sun distance grows every year since 1990', monotonic);

console.log(`${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(failures.map((f) => `  FAIL ${f}`).join('\n'));
  process.exit(1);
}
