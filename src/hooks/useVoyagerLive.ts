/**
 * useVoyagerLive — ticks the tracker estimates in the browser.
 *
 * All physics lives in src/lib/ephemeris.ts (JPL Horizons state vectors
 * propagated forward). This hook only re-evaluates that model about ten
 * times per second via requestAnimationFrame, so the numbers move smoothly
 * without polling any external API.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { LiveTelemetry, SpacecraftId } from '../types/voyager';
import { AU_KM, estimate } from '../lib/ephemeris';

/** Throttle interval in milliseconds between recomputations. */
const TICK_MS = 100;

/** Calculated state for a single spacecraft at a given instant (ms since epoch). */
export function computeTelemetry(id: SpacecraftId, nowMs: number): LiveTelemetry {
  const e = estimate(id, nowMs);
  return {
    sunDistanceKm: e.sunKm,
    sunDistanceAu: e.sunKm / AU_KM,
    earthDistanceKm: e.earthKm,
    earthDistanceAu: e.earthKm / AU_KM,
    lightTimeSeconds: e.lightTimeS,
    cruiseSpeedKmS: e.speedSunKmS,
    rangeRateKmS: e.rangeRateKmS,
    timestampMs: nowMs,
  };
}

/** Current time, re-read every `intervalMs` (rAF-driven, paused in background tabs). */
export function useNow(intervalMs = TICK_MS): number {
  const [now, setNow] = useState<number>(() => Date.now());
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;
    const tick = (time: number) => {
      if (cancelled) return;
      if (time - lastTickRef.current >= intervalMs) {
        lastTickRef.current = time;
        setNow(Date.now());
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [intervalMs]);

  return now;
}

/** Returns the current estimates for both spacecraft, updated on a smooth tick. */
export function useVoyagerLive(intervalMs = TICK_MS): Record<SpacecraftId, LiveTelemetry> {
  const now = useNow(intervalMs);
  return useMemo(
    () => ({ voyager1: computeTelemetry('voyager1', now), voyager2: computeTelemetry('voyager2', now) }),
    [now],
  );
}

/** Format a number with locale-aware thousands separators. */
export function formatNumber(value: number, locale: string, digits = 1): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Format a distance in kilometers with a localized unit suffix. */
export function formatKm(value: number, locale: string, unit: string): string {
  return `${formatNumber(value, locale, 0)} ${unit}`;
}

/** Format a distance in AU with a localized unit suffix. */
export function formatAu(value: number, locale: string, unit: string): string {
  return `${formatNumber(value, locale, 3)} ${unit}`;
}

/** Break a duration (seconds) into hours/minutes/seconds. */
export function decomposeLightTime(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return { hours, minutes, seconds };
}
