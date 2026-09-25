/**
 * VoyagerCanvas — top-down map of the ecliptic plane.
 *
 * Positions are real: each probe is drawn at its calculated heliocentric
 * ecliptic longitude (from src/lib/ephemeris.ts) and Earth at its actual
 * point on its orbit today. Distances use a logarithmic radial scale so
 * the inner planets and the probes fit on one screen. The dashed line from
 * the Sun is a simplification of each probe's outbound path.
 *
 * Redraws only when the inputs change or the canvas is resized.
 */

import { useEffect, useRef } from 'react';
import type { LiveTelemetry, Locale, SpacecraftId, Translation } from '../types/voyager';
import { AU_KM, earthHeliocentric, estimate, spacecraftState, sunBarycentric } from '../lib/ephemeris';

interface VoyagerCanvasProps {
  telemetry: Record<SpacecraftId, LiveTelemetry>;
  locale: Locale;
  t: Translation;
}

const MAX_AU = 200;
const HELIOPAUSE_AU = 120;
const RINGS = [1, 5, 10, 30, 50, 100, 200];
const ORBITS: { au: number; name: Record<Locale, string> }[] = [
  { au: 5.2, name: { 'en-US': 'Jupiter', 'zh-TW': '木星', es: 'Júpiter' } },
  { au: 9.58, name: { 'en-US': 'Saturn', 'zh-TW': '土星', es: 'Saturno' } },
  { au: 19.2, name: { 'en-US': 'Uranus', 'zh-TW': '天王星', es: 'Urano' } },
  { au: 30.07, name: { 'en-US': 'Neptune', 'zh-TW': '海王星', es: 'Neptuno' } },
];

const COLORS = {
  grid: 'rgba(148, 163, 184, 0.14)',
  gridLabel: 'rgba(148, 163, 184, 0.75)',
  orbit: 'rgba(251, 191, 36, 0.35)',
  orbitLabel: 'rgba(251, 191, 36, 0.8)',
  earthOrbit: 'rgba(56, 189, 248, 0.45)',
  heliopause: 'rgba(167, 139, 250, 0.7)',
  heliopauseFill: 'rgba(167, 139, 250, 0.06)',
  voyager1: '#22d3ee',
  voyager2: '#34d399',
  sun: '#fbbf24',
  sunGlow: 'rgba(251, 191, 36, 0.35)',
  earth: '#38bdf8',
  text: 'rgba(226, 232, 240, 0.9)',
};

/** Logarithmic AU → pixel radius. */
function auToRadius(au: number, size: number): number {
  const maxRadius = size / 2 - 28;
  return Math.max(2, (Math.log10(au + 1) / Math.log10(MAX_AU + 1)) * maxRadius);
}

/** Heliocentric ecliptic longitude (radians) of a spacecraft right now. */
function longitude(id: SpacecraftId, utcMs: number): number {
  const { r } = spacecraftState(id, utcMs);
  const s = sunBarycentric(utcMs);
  return Math.atan2(r[1] - s[1], r[0] - s[0]);
}

function ring(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, width = 1, dash: number[] = []) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.stroke();
  ctx.setLineDash([]);
}

export default function VoyagerCanvas({ telemetry, locale, t }: VoyagerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nowMs = telemetry.voyager1.timestampMs;
  // Positions change imperceptibly per second; redraw once a minute is plenty.
  const minute = Math.floor(nowMs / 60_000);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const at = minute * 60_000;

    const draw = (width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      if (width === 0 || height === 0) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const size = Math.min(width, height);
      const cx = width / 2;
      const cy = height / 2;
      // Screen y grows downward, ecliptic y grows "up": flip the sign.
      const toXY = (au: number, lon: number) => {
        const r = auToRadius(au, size);
        return [cx + r * Math.cos(lon), cy - r * Math.sin(lon)] as const;
      };
      const mono = (px: number) => `${px}px "JetBrains Mono", ui-monospace, monospace`;

      // Distance rings.
      ctx.font = mono(9);
      ctx.fillStyle = COLORS.gridLabel;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      for (const au of RINGS) {
        const r = auToRadius(au, size);
        ring(ctx, cx, cy, r, COLORS.grid, 1, [3, 5]);
        ctx.fillText(`${au} AU`, cx + 3, cy + r + 2);
      }

      // Heliopause.
      const hp = auToRadius(HELIOPAUSE_AU, size);
      ctx.beginPath();
      ctx.arc(cx, cy, hp, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.heliopauseFill;
      ctx.fill();
      ring(ctx, cx, cy, hp, COLORS.heliopause, 1.5, [8, 6]);
      ctx.font = mono(10);
      ctx.fillStyle = COLORS.heliopause;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(t.canvas.heliopause, cx, cy - hp - 4);

      // Planet orbits.
      ctx.font = mono(9);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      // The outer orbits are only a few pixels apart on the log scale, so each
      // label sits at a different angle on the left of its ring instead of in
      // one row.
      ORBITS.forEach((o, i) => {
        const r = auToRadius(o.au, size);
        ring(ctx, cx, cy, r, COLORS.orbit, 1);
        const a = ((i - (ORBITS.length - 1) / 2) * 20 * Math.PI) / 180;
        ctx.fillStyle = COLORS.orbitLabel;
        ctx.fillText(o.name[locale], cx - r * Math.cos(a) - 3, cy + r * Math.sin(a));
      });

      // Earth orbit and Earth's actual position today.
      const earthR = auToRadius(1, size);
      ring(ctx, cx, cy, earthR, COLORS.earthOrbit, 1, [2, 3]);
      const e = earthHeliocentric(at);
      const [ex, ey] = toXY(Math.hypot(e[0], e[1]) / AU_KM, Math.atan2(e[1], e[0]));
      ctx.beginPath();
      ctx.arc(ex, ey, 3, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.earth;
      ctx.fill();

      // Sun.
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.sunGlow;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.sun;
      ctx.fill();

      // Spacecraft: dashed outbound ray plus a glowing dot at today's position.
      for (const id of ['voyager1', 'voyager2'] as SpacecraftId[]) {
        const color = id === 'voyager1' ? COLORS.voyager1 : COLORS.voyager2;
        const lon = longitude(id, at);
        const [x, y] = toXY(estimate(id, at).sunKm / AU_KM, lon);
        const [x0, y0] = toXY(30, lon);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `${color}88`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        const label = id === 'voyager1' ? t.canvas.voyager1 : t.canvas.voyager2;
        const onRight = Math.cos(lon) >= 0;
        ctx.font = mono(11);
        ctx.fillStyle = color;
        ctx.textAlign = onRight ? 'right' : 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x + (onRight ? -9 : 9), y + (Math.sin(lon) > 0 ? 12 : -12));
      }

      // Legend (bottom-left) and scale note.
      ctx.font = mono(10);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = COLORS.sun;
      ctx.fillText(`● ${t.canvas.sun}`, 10, height - 34);
      ctx.fillStyle = COLORS.earth;
      ctx.fillText(`● ${t.canvas.earth}`, 10, height - 20);
      ctx.font = mono(9);
      ctx.fillStyle = COLORS.gridLabel;
      ctx.fillText(t.canvas.scaleNote, 10, height - 6);
    };

    // The observer reports the size after layout (no forced reflow) and fires
    // once on observe, then whenever the canvas itself is resized.
    const ro = new ResizeObserver(([entry]) => draw(entry.contentRect.width, entry.contentRect.height));
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [minute, t, locale]);

  const describe =
    locale === 'zh-TW'
      ? `俯視行星軌道面的示意圖：太陽在中心，航海家一號距太陽約 ${telemetry.voyager1.sunDistanceAu.toFixed(1)} AU，航海家二號約 ${telemetry.voyager2.sunDistanceAu.toFixed(1)} AU，兩者都在約 120 AU 的日球層頂之外。`
      : locale === 'es'
        ? `Vista cenital del plano de los planetas: el Sol en el centro, la Voyager 1 a unas ${telemetry.voyager1.sunDistanceAu.toFixed(1)} UA y la Voyager 2 a unas ${telemetry.voyager2.sunDistanceAu.toFixed(1)} UA, ambas más allá de la heliopausa (~120 UA).`
        : `Top-down map of the planets’ plane: the Sun at the centre, Voyager 1 about ${telemetry.voyager1.sunDistanceAu.toFixed(1)} AU and Voyager 2 about ${telemetry.voyager2.sunDistanceAu.toFixed(1)} AU from the Sun, both beyond the heliopause at roughly 120 AU.`;

  return (
    <figure className="hud-panel relative w-full overflow-hidden rounded-2xl">
      <canvas ref={canvasRef} className="block h-[380px] w-full sm:h-[480px]" role="img" aria-label={describe} />
    </figure>
  );
}
