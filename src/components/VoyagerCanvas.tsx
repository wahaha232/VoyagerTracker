/**
 * VoyagerCanvas — interactive 2D heliocentric trajectory visualizer.
 *
 * Renders the Sun, Earth orbit, Jupiter/Saturn flyby trajectories, the
 * heliopause boundary (~120 AU), and the current relative positions of
 * Voyager 1 & 2. Handles Retina/High-DPI scaling via devicePixelRatio
 * and cancels animation frames on unmount.
 */

import { useEffect, useRef } from 'react';
import type { LiveTelemetry, Locale, SpacecraftId, Translation } from '../types/voyager';

interface VoyagerCanvasProps {
  telemetry: Record<SpacecraftId, LiveTelemetry>;
  locale: Locale;
  t: Translation;
}

/** Maximum radial distance (AU) shown on the map. */
const MAX_AU = 140;

/** Heliopause boundary radius in AU. */
const HELIOPAUSE_AU = 120;

/** Earth orbit radius in AU. */
const EARTH_ORBIT_AU = 1;

/** Jupiter flyby distance in AU (approx). */
const JUPITER_AU = 5.2;

/** Saturn flyby distance in AU (approx). */
const SATURN_AU = 9.6;

/** Colors used across the visualization. */
const COLORS = {
  grid: 'rgba(148, 163, 184, 0.12)',
  gridLabel: 'rgba(148, 163, 184, 0.55)',
  earthOrbit: 'rgba(56, 189, 248, 0.35)',
  heliopause: 'rgba(167, 139, 250, 0.55)',
  heliopauseFill: 'rgba(167, 139, 250, 0.06)',
  jupiter: 'rgba(251, 191, 36, 0.7)',
  saturn: 'rgba(251, 191, 36, 0.7)',
  voyager1: '#22d3ee',
  voyager2: '#34d399',
  sun: '#fbbf24',
  sunGlow: 'rgba(251, 191, 36, 0.35)',
  earth: '#38bdf8',
  text: 'rgba(226, 232, 240, 0.9)',
};

/**
 * Map a radial distance in AU to a pixel radius using a logarithmic
 * scale so both the inner solar system and the distant probes are visible.
 */
function auToRadius(au: number, size: number): number {
  const maxRadius = size / 2 - 24;
  // Log scale: 0.1 AU → small, 140 AU → maxRadius.
  const t = Math.log10(au + 1) / Math.log10(MAX_AU + 1);
  return Math.max(2, t * maxRadius);
}

/** Draw a dashed circle centered on the Sun. */
function drawCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string,
  lineWidth = 1,
  dash: number[] = [],
) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(dash);
  ctx.stroke();
  ctx.setLineDash([]);
}

/** Draw a labeled point (planet or spacecraft). */
function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  label: string,
  labelColor: string,
  glow = false,
) {
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
  }
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.font = '11px "JetBrains Mono", ui-monospace, monospace';
  ctx.fillStyle = labelColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + radius + 6, y);
}

export default function VoyagerCanvas({ telemetry, locale, t }: VoyagerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Scale the backing store for Retina/High-DPI displays.
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // --- Background grid rings (log scale) ---
      const rings = [1, 5, 10, 20, 40, 80, 120, 140];
      for (const au of rings) {
        const r = auToRadius(au, Math.min(width, height));
        drawCircle(ctx, cx, cy, r, COLORS.grid, 1, [4, 4]);
        // Label the ring.
        ctx.font = '9px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillStyle = COLORS.gridLabel;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`${au} AU`, cx + r + 4, cy - 2);
      }

      // --- Heliopause boundary (~120 AU) ---
      const hpR = auToRadius(HELIOPAUSE_AU, Math.min(width, height));
      ctx.beginPath();
      ctx.arc(cx, cy, hpR, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.heliopauseFill;
      ctx.fill();
      drawCircle(ctx, cx, cy, hpR, COLORS.heliopause, 1.5, [8, 6]);
      ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = COLORS.heliopause;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(t.canvas.heliopause, cx + hpR - 8, cy - hpR + 14);

      // --- Earth orbit ---
      const earthR = auToRadius(EARTH_ORBIT_AU, Math.min(width, height));
      drawCircle(ctx, cx, cy, earthR, COLORS.earthOrbit, 1, [2, 3]);

      // --- Jupiter & Saturn flyby trajectories (arcs) ---
      const jupR = auToRadius(JUPITER_AU, Math.min(width, height));
      const satR = auToRadius(SATURN_AU, Math.min(width, height));
      ctx.strokeStyle = COLORS.jupiter;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, jupR, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, satR, Math.PI * 0.2, Math.PI * 0.9);
      ctx.stroke();
      ctx.setLineDash([]);

      // --- Sun ---
      const sunR = Math.max(4, auToRadius(0.05, Math.min(width, height)));
      ctx.beginPath();
      ctx.arc(cx, cy, sunR * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.sunGlow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.sun;
      ctx.fill();
      ctx.font = '11px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = COLORS.text;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(t.canvas.sun, cx + sunR + 6, cy - sunR);

      // --- Earth (at ~1 AU, placed on the orbit) ---
      const earthX = cx + earthR * Math.cos(-0.6);
      const earthY = cy + earthR * Math.sin(-0.6);
      drawPoint(ctx, earthX, earthY, 3, COLORS.earth, t.canvas.earth, COLORS.earth);

      // --- Voyager 1 & 2 positions ---
      const v1 = telemetry.voyager1;
      const v2 = telemetry.voyager2;
      const v1Au = v1.sunDistanceAu;
      const v2Au = v2.sunDistanceAu;

      // Place probes along their approximate outward trajectories.
      const v1R = auToRadius(v1Au, Math.min(width, height));
      const v2R = auToRadius(v2Au, Math.min(width, height));
      const v1Angle = -0.35;
      const v2Angle = -0.85;

      const v1x = cx + v1R * Math.cos(v1Angle);
      const v1y = cy + v1R * Math.sin(v1Angle);
      const v2x = cx + v2R * Math.cos(v2Angle);
      const v2y = cy + v2R * Math.sin(v2Angle);

      drawPoint(ctx, v1x, v1y, 4, COLORS.voyager1, t.canvas.voyager1, COLORS.voyager1, true);
      drawPoint(ctx, v2x, v2y, 4, COLORS.voyager2, t.canvas.voyager2, COLORS.voyager2, true);

      // --- Scale note ---
      ctx.font = '9px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = COLORS.gridLabel;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(t.canvas.scaleNote, 10, height - 8);

      rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);

    // Re-render on resize (debounced via rAF loop).
    window.addEventListener('resize', resize);

    // Cleanup: cancel animation frames and remove listeners.
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [telemetry, t, locale]);

  return (
    <div className="hud-panel relative w-full overflow-hidden rounded-2xl">
      <canvas
        ref={canvasRef}
        className="block h-[420px] w-full sm:h-[480px]"
        aria-label={t.canvas.title}
      />
    </div>
  );
}
