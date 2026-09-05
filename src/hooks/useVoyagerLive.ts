/**
 * useVoyagerLive — client-side ephemeris interpolation engine.
 *
 * Advances each spacecraft's distance from the Sun and Earth smoothly
 * using baseline constants and stored velocity vectors. Updates are
 * driven by requestAnimationFrame (with a 100ms throttle) so the UI
 * ticks fluidly without hammering any external API.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { LiveTelemetry, SpacecraftId } from '../types/voyager';
import { AU_KM, EPHEMERIS, SPEED_OF_LIGHT_KM_S } from '../constants/voyagerData';

/** Throttle interval in milliseconds between telemetry recomputations. */
const TICK_MS = 100;

/**
 * Compute the interpolated telemetry for a single spacecraft at a given
 * instant (in ms since epoch).
 */
function computeTelemetry(id: SpacecraftId, nowMs: number): LiveTelemetry {
  const base = EPHEMERIS[id];
  // Elapsed seconds since the baseline epoch.
  const elapsedSec = (nowMs - base.baseEpochMs) / 1000;

  // Advance the heliocentric position vector.
  const vx = base.velocity.x * elapsedSec;
  const vy = base.velocity.y * elapsedSec;
  const vz = base.velocity.z * elapsedSec;

  // New distance from the Sun (magnitude of the position vector).
  const sunDistanceKm = Math.sqrt(
    (base.sunDistanceKm + vx) ** 2 + vy ** 2 + vz ** 2,
  );

  // Approximate Earth distance: Earth is ~1 AU from the Sun and the
  // spacecraft is essentially radial, so we model the difference.
  const earthDistanceKm = Math.max(
    sunDistanceKm - AU_KM,
    base.earthDistanceKm + base.velocity.x * elapsedSec * 0.999,
  );

  const sunDistanceAu = sunDistanceKm / AU_KM;
  const earthDistanceAu = earthDistanceKm / AU_KM;
  const lightTimeSeconds = earthDistanceKm / SPEED_OF_LIGHT_KM_S;

  return {
    sunDistanceKm,
    sunDistanceAu,
    earthDistanceKm,
    earthDistanceAu,
    lightTimeSeconds,
    cruiseSpeedKmS: base.cruiseSpeedKmS,
    timestampMs: nowMs,
  };
}

/**
 * Returns live telemetry for all spacecraft, updated on a smooth tick.
 * The returned object is memoized and only changes when the recomputed
 * values actually change, minimizing re-renders.
 */
export function useVoyagerLive(): Record<SpacecraftId, LiveTelemetry> {
  const [now, setNow] = useState<number>(() => Date.now());
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    const tick = (time: number) => {
      if (cancelled) return;

      // Throttle recomputation to TICK_MS for stable, smooth updates.
      if (time - lastTickRef.current >= TICK_MS) {
        lastTickRef.current = time;
        setNow(Date.now());
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Cleanup: cancel the animation frame to prevent memory leaks.
    return () => {
      cancelled = true;
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Memoize the telemetry snapshot so consumers only re-render on change.
  return useMemo(() => {
    const v1 = computeTelemetry('voyager1', now);
    const v2 = computeTelemetry('voyager2', now);
    return { voyager1: v1, voyager2: v2 };
  }, [now]);
}

/** Format a large number with locale-aware thousands separators. */
export function formatNumber(value: number, locale: string, digits = 1): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Format a distance in kilometers with a localized unit suffix. */
export function formatKm(value: number, locale: string, unit: string): string {
  return `${formatNumber(value, locale, 1)} ${unit}`;
}

/** Format a distance in AU with a localized unit suffix. */
export function formatAu(value: number, locale: string, unit: string): string {
  return `${formatNumber(value, locale, 2)} ${unit}`;
}

/** Break a light-time duration (seconds) into hours/minutes/seconds. */
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
