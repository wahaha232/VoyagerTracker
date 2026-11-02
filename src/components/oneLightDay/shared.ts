/**
 * Shared values and formatting helpers for the non-intrusive one-light-day
 * entry and its modal. The existing LightDayCountdown component is left
 * untouched; this module uses the same published instant so the two never
 * disagree about the moment being counted down to.
 */

import { C_KM_S, LIGHT_DAY_KM } from '../../lib/context';

export { C_KM_S, LIGHT_DAY_KM };

/** NASA's published crossing: 18 Nov 2026, 05:16:07 EST = 10:16:07 UTC. */
export const ONE_LIGHT_DAY_INSTANT_MS = Date.parse('2026-11-18T10:16:07Z');

/** NASA/JPL's "Voyager 1: What Is a Light-Day" feature. */
export const NASA_LIGHT_DAY_URL =
  'https://science.nasa.gov/mission/voyager/voyager-1/voyager-1-what-is-a-light-day/';

/** Number of kilometres in one astronomical unit (matches the site model). */
export const AU_KM = 149_597_870.7;

export type Tri = { en: string; zh: string; es: string };

export const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

export const pick = (value: Tri, locale: string) =>
  locale === 'zh-TW' ? value.zh : locale === 'es' ? value.es : value.en;

export const pad2 = (value: number) => String(value).padStart(2, '0');

/** Split a positive/negative duration into whole units (clamped at zero). */
export function countdownParts(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor((seconds % 86_400) / 3_600),
    minutes: Math.floor((seconds % 3_600) / 60),
    seconds: seconds % 60,
    totalSeconds: seconds,
  };
}

/** Compact "DDd HHh MMm SSs" used by the banner and the share card. */
export function formatCountdown(totalSeconds: number): string {
  const parts = countdownParts(totalSeconds);
  return `${parts.days}d ${pad2(parts.hours)}h ${pad2(parts.minutes)}m ${pad2(parts.seconds)}s`;
}

/** "23h 59m 51s" for the photon bar and the ping simulation. */
export function formatHms(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(seconds / 3_600)}h ${pad2(Math.floor((seconds % 3_600) / 60))}m ${pad2(seconds % 60)}s`;
}

export function formatKm(value: number, locale: string, digits = 0): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(Math.max(0, value));
}

export function formatUtc(ms: number): string {
  return `${new Date(ms).toISOString().replace('T', ' ').slice(0, 19)} UTC`;
}

export function formatLocal(ms: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(ms);
}
