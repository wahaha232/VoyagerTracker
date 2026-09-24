/**
 * context — turns raw distances into human-scale comparisons.
 *
 * Every function here is a plain unit conversion or a clearly
 * hypothetical "what if" calculation; none of them is a mission prediction.
 */

import { AU_KM, C_KM_S, KM_PER_MILE } from './ephemeris';

export { AU_KM, C_KM_S, KM_PER_MILE };

/** Distance light travels in one day (km). */
export const LIGHT_DAY_KM = C_KM_S * 86_400;
/** Distance light travels in one Julian year (km). */
export const LIGHT_YEAR_KM = C_KM_S * 86_400 * 365.25;
/** Distance to Proxima Centauri, the nearest star (light-years, approx.). */
export const PROXIMA_LY = 4.24;

/** Mean orbital distances from the Sun (AU, rounded) used for scale comparisons. */
export const PLANET_AU = {
  earth: 1.0,
  jupiter: 5.2,
  saturn: 9.58,
  uranus: 19.2,
  neptune: 30.07,
} as const;

/** Approximate distance of the heliopause where each Voyager crossed it (AU). */
export const HELIOPAUSE_CROSSING_AU = { voyager1: 121.6, voyager2: 119.0 } as const;

/** Hypothetical reference speeds for the travel-time calculator (km/h). */
export const REFERENCE_SPEEDS = [
  { key: 'walk', kmh: 5 },
  { key: 'car', kmh: 100 },
  { key: 'train', kmh: 300 },
  { key: 'airliner', kmh: 900 },
  { key: 'iss', kmh: 27_600 },
] as const;

export type ReferenceSpeedKey = (typeof REFERENCE_SPEEDS)[number]['key'];

const HOURS_PER_YEAR = 24 * 365.25;

/** Years needed to cover `km` at a constant `kmh` (hypothetical). */
export function travelYears(km: number, kmh: number): number {
  return km / kmh / HOURS_PER_YEAR;
}

/** Split a duration in seconds into days/hours/minutes/seconds. */
export function splitDuration(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  return {
    days: Math.floor(s / 86_400),
    hours: Math.floor((s % 86_400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** Whole years and remaining days between two instants. */
export function elapsedYearsDays(fromMs: number, toMs: number) {
  const from = new Date(fromMs);
  const to = new Date(toMs);
  let years = to.getUTCFullYear() - from.getUTCFullYear();
  const anniversary = (y: number) =>
    Date.UTC(y, from.getUTCMonth(), from.getUTCDate(), from.getUTCHours(), from.getUTCMinutes());
  if (anniversary(from.getUTCFullYear() + years) > toMs) years -= 1;
  const days = Math.floor((toMs - anniversary(from.getUTCFullYear() + years)) / 86_400_000);
  const totalDays = Math.floor((toMs - fromMs) / 86_400_000);
  return { years, days, totalDays };
}

/** Convert a distance between the units offered by the converter. */
export const UNITS = {
  km: 1,
  mi: KM_PER_MILE,
  au: AU_KM,
  lightSecond: C_KM_S,
  lightMinute: C_KM_S * 60,
  lightHour: C_KM_S * 3600,
  lightDay: LIGHT_DAY_KM,
  lightYear: LIGHT_YEAR_KM,
} as const;

export type UnitKey = keyof typeof UNITS;

export function convert(value: number, from: UnitKey, to: UnitKey): number {
  return (value * UNITS[from]) / UNITS[to];
}

/**
 * Format numbers that span many orders of magnitude: compact notation for
 * very large values, three significant digits below 1, plain otherwise.
 */
export function formatBig(value: number, locale: string, digits = 1): string {
  if (!Number.isFinite(value)) return '—';
  if (value !== 0 && Math.abs(value) < 1) {
    return new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 }).format(value);
  }
  if (Math.abs(value) >= 100_000) {
    return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: digits }).format(value);
  }
  return new Intl.NumberFormat(locale, { maximumFractionDigits: value < 10 ? 2 : digits }).format(value);
}
