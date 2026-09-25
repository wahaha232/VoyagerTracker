/**
 * useVoyagerLive — ticks the tracker estimates in the browser.
 *
 * All physics lives in src/lib/ephemeris.ts (JPL Horizons state vectors
 * propagated forward). This hook only re-evaluates that model about ten
 * times per second on a timer, so the numbers move smoothly without
 * polling any external API.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
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

/**
 * Current time, re-read every `intervalMs`. Uses a plain interval (not a
 * per-frame loop) and stops while the tab is hidden or `active` is false,
 * so off-screen or background counters cost nothing.
 */
export function useNow(intervalMs = TICK_MS, active = true): number {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (!active) return;
    let id: number | null = null;
    const start = () => {
      if (id === null && !document.hidden) {
        setNow(Date.now());
        id = window.setInterval(() => setNow(Date.now()), intervalMs);
      }
    };
    const stop = () => {
      if (id !== null) window.clearInterval(id);
      id = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [intervalMs, active]);

  return now;
}

/**
 * Tracks whether an element is on screen, so live counters only tick while
 * someone can see them.
 */
export function useOnScreen<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/** Returns the current estimates for both spacecraft, updated on a smooth tick. */
export function useVoyagerLive(intervalMs = TICK_MS, active = true): Record<SpacecraftId, LiveTelemetry> {
  const now = useNow(intervalMs, active);
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
