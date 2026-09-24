/**
 * ephemeris — the calculation model behind every tracker figure.
 *
 * 1. Spacecraft: the barycentric state vector published by NASA/JPL
 *    Horizons for EPOCH_ISO is propagated with a third-order Taylor
 *    series under solar-system gravity:
 *      r(t) = r0 + v0·dt + ½·a0·dt² + ⅙·j0·dt³
 *    At 140–175 AU gravity is tiny, so this tracks JPL's own prediction
 *    to within tens of thousands of km for years (see
 *    scripts/validate-model.ts and the How It Works page).
 * 2. Sun: its offset from the barycentre comes from a monthly JPL table.
 * 3. Earth: a low-precision analytic solar-position formula (Astronomical
 *    Almanac), rotated to the J2000 ecliptic. Accurate to ~0.01°.
 * 4. Distance from Earth = |r_spacecraft − r_Earth|, so the yearly
 *    ±1 AU swing caused by Earth's orbit is modelled, not ignored.
 *
 * Pure functions only — no React, no DOM — so the same code runs in the
 * browser, in the build-time prerender and in the validation script.
 */

import { EPOCH_ISO, EPOCH_STATE, HISTORY, SUN_BARY, SUN_TABLE_START } from '../data/horizons.generated';

export type CraftId = 'voyager1' | 'voyager2';

/** One astronomical unit in km (IAU 2012). */
export const AU_KM = 149_597_870.7;
/** Speed of light in km/s. */
export const C_KM_S = 299_792.458;
/**
 * GM of the Sun plus planets (km³/s²). Seen from 140+ AU the whole solar
 * system pulls like a single mass at the barycentre (planets add ~0.134 %).
 */
const GM_SUN_SYSTEM = 1.327_124_400_18e11 * 1.001_34;
/** Kilometres per statute mile. */
export const KM_PER_MILE = 1.609_344;
/** TDB − UTC in seconds (32.184 s + 37 leap seconds). */
const TDB_MINUS_UTC_S = 69.184;
/** Julian day of the Unix epoch. */
const JD_UNIX = 2_440_587.5;

/** Unix time (ms, UTC) that corresponds to the Horizons epoch in TDB. */
export const EPOCH_MS = Date.parse(EPOCH_ISO) - TDB_MINUS_UTC_S * 1000;

type Vec = [number, number, number];

const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const norm = (a: Vec) => Math.hypot(a[0], a[1], a[2]);
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Precomputed Taylor coefficients (acceleration and jerk) at the epoch. */
const TAYLOR = Object.fromEntries(
  (Object.keys(EPOCH_STATE) as CraftId[]).map((id) => {
    const r0 = [...EPOCH_STATE[id].r] as Vec;
    const v0 = [...EPOCH_STATE[id].v] as Vec;
    const r = norm(r0);
    const rv = dot(r0, v0);
    const k = -GM_SUN_SYSTEM / r ** 3;
    const a: Vec = [k * r0[0], k * r0[1], k * r0[2]];
    // j = da/dt = −μ [ v/r³ − 3 r (r·v)/r⁵ ]
    const j: Vec = [0, 1, 2].map((i) => k * (v0[i] - (3 * r0[i] * rv) / (r * r))) as Vec;
    return [id, { r0, v0, a, j }];
  }),
) as Record<CraftId, { r0: Vec; v0: Vec; a: Vec; j: Vec }>;

/** Spacecraft barycentric position (km) and velocity (km/s) at a UTC instant. */
export function spacecraftState(id: CraftId, utcMs: number): { r: Vec; v: Vec } {
  const { r0, v0, a, j } = TAYLOR[id];
  const dt = (utcMs - EPOCH_MS) / 1000;
  const dt2 = dt * dt;
  const dt3 = dt2 * dt;
  const r = [0, 1, 2].map((i) => r0[i] + v0[i] * dt + (a[i] * dt2) / 2 + (j[i] * dt3) / 6) as Vec;
  const v = [0, 1, 2].map((i) => v0[i] + a[i] * dt + (j[i] * dt2) / 2) as Vec;
  return { r, v };
}

const SUN_START_MS = Date.parse(`${SUN_TABLE_START}T00:00:00Z`);

/**
 * The Sun's position relative to the barycentre (km), interpolated from
 * the monthly JPL table. Outside 2020–2040 the nearest row is used.
 */
export function sunBarycentric(utcMs: number): Vec {
  const d = new Date(utcMs);
  const months = (d.getUTCFullYear() - 2020) * 12 + d.getUTCMonth() + (d.getUTCDate() - 1) / 30.44;
  const start = new Date(SUN_START_MS);
  const idx = months - ((start.getUTCFullYear() - 2020) * 12 + start.getUTCMonth());
  const last = SUN_BARY.length - 1;
  if (idx <= 0) return [...SUN_BARY[0]] as Vec;
  if (idx >= last) return [...SUN_BARY[last]] as Vec;
  const i = Math.floor(idx);
  const f = idx - i;
  return [0, 1, 2].map((k) => SUN_BARY[i][k] + (SUN_BARY[i + 1][k] - SUN_BARY[i][k]) * f) as Vec;
}

/** Earth's heliocentric position (km), J2000 ecliptic, at a UTC instant. */
export function earthHeliocentric(utcMs: number): Vec {
  const n = utcMs / 86_400_000 + JD_UNIX - 2_451_545.0;
  const rad = Math.PI / 180;
  const g = (357.528 + 0.985_600_3 * n) * rad;
  const L = 280.46 + 0.985_647_4 * n;
  // Geocentric solar longitude of date, minus general precession → J2000.
  const lambdaSun = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g) - 3.824_6e-5 * n;
  const R = (1.000_14 - 0.016_71 * Math.cos(g) - 0.000_14 * Math.cos(2 * g)) * AU_KM;
  const lambdaEarth = (lambdaSun + 180) * rad;
  return [R * Math.cos(lambdaEarth), R * Math.sin(lambdaEarth), 0];
}

/** Earth's barycentric position (km). */
export function earthPosition(utcMs: number): Vec {
  const e = earthHeliocentric(utcMs);
  const s = sunBarycentric(utcMs);
  return [e[0] + s[0], e[1] + s[1], e[2] + s[2]];
}

export interface Estimate {
  /** Distance from the Sun (km). */
  sunKm: number;
  /** Distance from Earth (km). */
  earthKm: number;
  /** Speed relative to the Sun (km/s). */
  speedSunKmS: number;
  /** Rate at which the Earth distance is changing (km/s, + = receding). */
  rangeRateKmS: number;
  /** One-way light time from Earth (s). */
  lightTimeS: number;
  /** UTC instant of the estimate (ms). */
  utcMs: number;
}

/** Full estimate for one spacecraft at a UTC instant. */
export function estimate(id: CraftId, utcMs: number): Estimate {
  const { r, v } = spacecraftState(id, utcMs);
  const e = earthPosition(utcMs);
  const rel = sub(r, e);
  const earthKm = norm(rel);
  // Earth's velocity by central difference (±60 s) — simple and exact enough.
  const ePlus = earthPosition(utcMs + 60_000);
  const eMinus = earthPosition(utcMs - 60_000);
  const vEarth: Vec = [
    (ePlus[0] - eMinus[0]) / 120,
    (ePlus[1] - eMinus[1]) / 120,
    (ePlus[2] - eMinus[2]) / 120,
  ];
  return {
    sunKm: norm(sub(r, sunBarycentric(utcMs))),
    earthKm,
    speedSunKmS: norm(v),
    rangeRateKmS: dot(rel, sub(v, vEarth)) / earthKm,
    lightTimeS: earthKm / C_KM_S,
    utcMs,
  };
}

/**
 * Heliocentric distance (AU) on any date using the JPL monthly history,
 * linearly interpolated. Returns null outside the covered range.
 */
export function historicalSunAu(id: CraftId, utcMs: number): number | null {
  const rows = HISTORY[id];
  const t = (row: [string, number, number]) => Date.parse(`${row[0]}T00:00:00Z`);
  if (utcMs < t(rows[0]) || utcMs > t(rows[rows.length - 1])) return null;
  let lo = 0;
  let hi = rows.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (t(rows[mid]) <= utcMs) lo = mid;
    else hi = mid;
  }
  const t0 = t(rows[lo]);
  const t1 = t(rows[hi]);
  const f = t1 === t0 ? 0 : (utcMs - t0) / (t1 - t0);
  return rows[lo][1] + (rows[hi][1] - rows[lo][1]) * f;
}

/**
 * Find when a distance first reaches `targetKm` after `fromMs` (weekly
 * scan, then bisection on the model). Used for milestone countdowns.
 * Returns null if already reached or not reached within ~30 years.
 */
export function whenDistanceReaches(
  id: CraftId,
  metric: 'earthKm' | 'sunKm',
  targetKm: number,
  fromMs: number,
): number | null {
  const at = (t: number) => estimate(id, t)[metric];
  if (at(fromMs) >= targetKm) return null;
  const WEEK = 7 * 86_400_000;
  let lo = fromMs;
  let hi = fromMs;
  for (let i = 0; i < 1600; i++) {
    hi = lo + WEEK;
    if (at(hi) >= targetKm) break;
    lo = hi;
  }
  if (at(hi) < targetKm) return null;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (at(mid) >= targetKm) hi = mid;
    else lo = mid;
  }
  return hi;
}

/** Back-compat helper for the Earth-distance milestone. */
export const whenEarthDistanceReaches = (id: CraftId, targetKm: number, fromMs: number) =>
  whenDistanceReaches(id, 'earthKm', targetKm, fromMs);

export { HISTORY };
