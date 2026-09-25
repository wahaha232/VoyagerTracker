/**
 * HistoryChart — distance or speed of both Voyagers, 1977–2035.
 *
 * Plots the monthly JPL Horizons samples bundled in
 * src/data/horizons.generated.ts. Values after "today" are JPL's predicted
 * trajectory and are drawn dashed. Planetary encounters are marked.
 * Pointer/keyboard exploration shows the exact sample under the cursor,
 * and a data table (every 5 years) is provided for screen readers.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { HISTORY } from '../lib/ephemeris';
import { useI18n } from '../i18n/context';

type Mode = 'distance' | 'speed';
type Craft = 'voyager1' | 'voyager2';
type Tri = { en: string; zh: string; es: string };

const COLORS: Record<Craft, string> = { voyager1: '#22d3ee', voyager2: '#34d399' };
const NAMES: Record<Craft, string> = { voyager1: 'Voyager 1', voyager2: 'Voyager 2' };

/** Encounter / milestone markers (dates from NASA/JPL mission records). */
const EVENTS: { craft: Craft; date: string; label: Tri }[] = [
  { craft: 'voyager1', date: '1979-03-05', label: { en: 'Jupiter', zh: '木星', es: 'Júpiter' } },
  { craft: 'voyager2', date: '1979-07-09', label: { en: 'Jupiter', zh: '木星', es: 'Júpiter' } },
  { craft: 'voyager1', date: '1980-11-12', label: { en: 'Saturn', zh: '土星', es: 'Saturno' } },
  { craft: 'voyager2', date: '1981-08-25', label: { en: 'Saturn', zh: '土星', es: 'Saturno' } },
  { craft: 'voyager2', date: '1986-01-24', label: { en: 'Uranus', zh: '天王星', es: 'Urano' } },
  { craft: 'voyager2', date: '1989-08-25', label: { en: 'Neptune', zh: '海王星', es: 'Neptuno' } },
  { craft: 'voyager1', date: '2012-08-25', label: { en: 'Heliopause', zh: '日球層頂', es: 'Heliopausa' } },
  { craft: 'voyager2', date: '2018-11-05', label: { en: 'Heliopause', zh: '日球層頂', es: 'Heliopausa' } },
];

const W = 760;
const H = 360;
const PAD = { l: 52, r: 16, t: 16, b: 34 };
const X0 = Date.UTC(1977, 0, 1);
const X1 = Date.UTC(2035, 0, 1);

const toMs = (d: string) => Date.parse(`${d}T00:00:00Z`);

/** Timestamp of every sample, parsed once (the rows are in date order). */
const ROW_MS: Record<Craft, number[]> = {
  voyager1: HISTORY.voyager1.map((r) => toMs(r[0])),
  voyager2: HISTORY.voyager2.map((r) => toMs(r[0])),
};

/** Nearest sample for a timestamp (binary search; ties go to the earlier one). */
function sampleAt(craft: Craft, ms: number) {
  const t = ROW_MS[craft];
  let lo = 0;
  let hi = t.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (t[mid] < ms) lo = mid + 1;
    else hi = mid;
  }
  const best = lo > 0 && ms - t[lo - 1] <= t[lo] - ms ? lo - 1 : lo;
  return HISTORY[craft][best];
}

const pick = (v: Tri, locale: string) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

export default function HistoryChart() {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';
  const es = locale === 'es';
  const [mode, setMode] = useState<Mode>('distance');
  const [hover, setHover] = useState<number | null>(null);
  // "Today" marker: build date in static HTML, the visitor's clock after mount.
  const [today, setToday] = useState(() => toMs(__BUILD_DATE__));
  useEffect(() => setToday(Date.now()), []);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const col = mode === 'distance' ? 1 : 2;
  const yMax = mode === 'distance' ? 210 : 45;
  const yTicks = mode === 'distance' ? [0, 50, 100, 150, 200] : [0, 10, 20, 30, 40];
  const unit = mode === 'distance' ? 'AU' : 'km/s';

  const sx = (ms: number) => PAD.l + ((ms - X0) / (X1 - X0)) * (W - PAD.l - PAD.r);
  const sy = (v: number) => H - PAD.b - (v / yMax) * (H - PAD.t - PAD.b);

  const paths = useMemo(() => {
    const out: Record<Craft, { past: string; future: string }> = { voyager1: { past: '', future: '' }, voyager2: { past: '', future: '' } };
    for (const craft of ['voyager1', 'voyager2'] as Craft[]) {
      const rows = HISTORY[craft];
      const t = ROW_MS[craft];
      // Past: samples up to today; future: from the last past sample onwards.
      const split = t.filter((ms) => ms <= today).length;
      const line = (from: number, to: number) =>
        rows
          .slice(from, to)
          .map((r, i) => `${i ? 'L' : 'M'}${sx(t[from + i]).toFixed(1)},${sy(r[col]).toFixed(1)}`)
          .join('');
      out[craft] = { past: line(0, split), future: line(Math.max(0, split - 1), rows.length) };
    }
    return out;
    // sx/sy depend only on mode-derived constants.
  }, [mode, today]);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const ms = X0 + ((x - PAD.l) / (W - PAD.l - PAD.r)) * (X1 - X0);
    setHover(Math.min(X1, Math.max(toMs(HISTORY.voyager2[0][0]), ms)));
  };

  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const step = (e.shiftKey ? 5 : 1) * 365.25 * 86_400_000;
    setHover((h) => Math.min(X1, Math.max(toMs(HISTORY.voyager2[0][0]), (h ?? today) + (e.key === 'ArrowRight' ? step : -step))));
  };

  const formats = useMemo(
    () => [1, 2].map((d) => new Intl.NumberFormat(locale, { maximumFractionDigits: d, minimumFractionDigits: d })),
    [locale],
  );
  const fmt = (v: number, d: 1 | 2 = 1) => formats[d - 1].format(v);
  const hoverRows = hover !== null ? (['voyager1', 'voyager2'] as Craft[]).map((c) => ({ c, row: sampleAt(c, hover) })) : [];
  const years = [1977, 1985, 1995, 2005, 2015, 2025, 2035];

  const label =
    mode === 'distance'
      ? zh
        ? '航海家一號與二號距太陽的距離（AU），1977–2035 年'
        : es
          ? 'Distancia al Sol de las Voyager 1 y 2 (UA), 1977–2035'
          : 'Distance of Voyager 1 and Voyager 2 from the Sun (AU), 1977–2035'
      : zh
        ? '航海家一號與二號相對太陽的速度（公里/秒），1977–2035 年'
        : es
          ? 'Velocidad respecto al Sol de las Voyager 1 y 2 (km/s), 1977–2035'
          : 'Speed of Voyager 1 and Voyager 2 relative to the Sun (km/s), 1977–2035';

  return (
    <figure className="hud-panel rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <figcaption className="text-base font-semibold text-white">{label}</figcaption>
        <div role="group" aria-label={zh ? '圖表模式' : es ? 'Modo del gráfico' : 'Chart mode'} className="flex rounded-lg border border-slate-700 p-0.5">
          {(['distance', 'speed'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`min-h-[36px] rounded-md px-3 text-xs font-semibold ${mode === m ? 'bg-cyan-500/20 text-cyan-200' : 'text-slate-300 hover:text-white'}`}
            >
              {m === 'distance' ? (zh ? '距離' : es ? 'Distancia' : 'Distance') : zh ? '速度' : es ? 'Velocidad' : 'Speed'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          role="img"
          aria-label={`${label}. ${zh ? '可用左右方向鍵逐年檢視數值。' : es ? 'Usa las flechas izquierda/derecha para recorrer los años.' : 'Use the left and right arrow keys to step through the years.'}`}
          tabIndex={0}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
          onKeyDown={onKey}
          onBlur={() => setHover(null)}
        >
          {/* Grid */}
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={sy(v)} y2={sy(v)} stroke="rgba(148,163,184,0.15)" />
              <text x={PAD.l - 8} y={sy(v)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">
                {v}
              </text>
            </g>
          ))}
          <text x={12} y={PAD.t + 4} fontSize="11" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">
            {unit}
          </text>
          {years.map((y) => (
            <text key={y} x={sx(Date.UTC(y, 0, 1))} y={H - 12} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">
              {y}
            </text>
          ))}

          {/* Heliopause band (distance mode) */}
          {mode === 'distance' && (
            <g>
              <line x1={PAD.l} x2={W - PAD.r} y1={sy(120)} y2={sy(120)} stroke="rgba(167,139,250,0.6)" strokeDasharray="6 5" />
              <text x={PAD.l + 6} y={sy(120) - 6} fontSize="11" fill="#c4b5fd">
                {zh ? '日球層頂 ≈120 AU' : es ? 'Heliopausa ≈120 UA' : 'Heliopause ≈120 AU'}
              </text>
            </g>
          )}

          {/* Today */}
          <line x1={sx(today)} x2={sx(today)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(251,191,36,0.6)" strokeDasharray="3 4" />
          <text x={sx(today) - 4} y={PAD.t + 10} textAnchor="end" fontSize="11" fill="#fbbf24">
            {zh ? '今天' : es ? 'Hoy' : 'Today'}
          </text>
          <text x={sx(today) + 4} y={PAD.t + 10} fontSize="11" fill="#94a3b8">
            {zh ? 'JPL 預測 →' : es ? 'Predicción JPL →' : 'JPL prediction →'}
          </text>

          {/* Lines */}
          {(['voyager1', 'voyager2'] as Craft[]).map((c) => (
            <g key={c}>
              <path d={paths[c].past} fill="none" stroke={COLORS[c]} strokeWidth="2.2" />
              <path d={paths[c].future} fill="none" stroke={COLORS[c]} strokeWidth="2" strokeDasharray="5 4" opacity="0.8" />
            </g>
          ))}

          {/* Encounter markers */}
          {EVENTS.map((ev) => {
            const row = sampleAt(ev.craft, toMs(ev.date));
            const x = sx(toMs(ev.date));
            const y = sy(row[col]);
            return (
              <g key={`${ev.craft}-${ev.date}`}>
                <circle cx={x} cy={y} r="4" fill="#020617" stroke={COLORS[ev.craft]} strokeWidth="2" />
                <title>{`${NAMES[ev.craft]} — ${pick(ev.label, locale)} (${ev.date})`}</title>
              </g>
            );
          })}

          {/* Hover cursor */}
          {hover !== null && (
            <g>
              <line x1={sx(hover)} x2={sx(hover)} y1={PAD.t} y2={H - PAD.b} stroke="rgba(226,232,240,0.5)" />
              {hoverRows.map(({ c, row }) => (
                <circle key={c} cx={sx(toMs(row[0]))} cy={sy(row[col])} r="4.5" fill={COLORS[c]} />
              ))}
            </g>
          )}
        </svg>

        {hover !== null && (
          <div className="pointer-events-none absolute left-14 top-2 rounded-lg border border-slate-600 bg-space-950/95 px-3 py-2 font-mono text-xs text-slate-200 shadow-lg" aria-live="polite">
            <p className="mb-1 text-slate-400">{hoverRows[0].row[0].slice(0, 7)}</p>
            {hoverRows.map(({ c, row }) => (
              <p key={c} style={{ color: COLORS[c] }}>
                {NAMES[c]}: {mode === 'distance' ? `${fmt(row[1])} AU` : `${fmt(row[2], 2)} km/s`}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-slate-300">
        <span><span className="mr-1 inline-block h-0.5 w-5 align-middle" style={{ background: COLORS.voyager1 }} />Voyager 1</span>
        <span><span className="mr-1 inline-block h-0.5 w-5 align-middle" style={{ background: COLORS.voyager2 }} />Voyager 2</span>
        <span>○ {zh ? '行星飛掠／穿越日球層頂' : es ? 'sobrevuelo / heliopausa' : 'planetary flyby / heliopause crossing'}</span>
        <span>- - {zh ? 'JPL 預測軌道' : es ? 'trayectoria prevista por JPL' : 'JPL predicted trajectory'}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        {zh
          ? '資料：NASA/JPL Horizons 月度樣本（以太陽為中心）。在圖上移動游標，或聚焦圖表後按左右方向鍵，可查看每個月的數值。'
          : es
            ? 'Datos: muestras mensuales de NASA/JPL Horizons (centradas en el Sol). Mueve el cursor sobre el gráfico, o enfócalo y usa las flechas, para ver cada mes.'
            : 'Data: monthly NASA/JPL Horizons samples (Sun-centred). Move the pointer over the chart, or focus it and use the arrow keys, to read any month.'}
      </p>

      <details className="mt-3 rounded-lg border border-slate-800 bg-space-950/40">
        <summary className="cursor-pointer px-3 py-2 text-sm text-slate-300 hover:text-white">
          {zh ? '以表格檢視（每五年）' : es ? 'Ver como tabla (cada 5 años)' : 'View as a table (every 5 years)'}
        </summary>
        <div className="overflow-x-auto px-3 pb-3">
          <table className="w-full min-w-[420px] text-left font-mono text-xs text-slate-300">
            <thead>
              <tr className="text-slate-400">
                <th className="py-1 pr-3">{zh ? '年份' : es ? 'Año' : 'Year'}</th>
                <th className="py-1 pr-3">V1 AU</th>
                <th className="py-1 pr-3">V1 km/s</th>
                <th className="py-1 pr-3">V2 AU</th>
                <th className="py-1">V2 km/s</th>
              </tr>
            </thead>
            <tbody>
              {[1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2034].map((y) => {
                const a = sampleAt('voyager1', Date.UTC(y, 0, 1));
                const b = sampleAt('voyager2', Date.UTC(y, 0, 1));
                return (
                  <tr key={y} className="border-t border-slate-800">
                    <td className="py-1 pr-3">{y}</td>
                    <td className="py-1 pr-3">{fmt(a[1])}</td>
                    <td className="py-1 pr-3">{fmt(a[2], 2)}</td>
                    <td className="py-1 pr-3">{fmt(b[1])}</td>
                    <td className="py-1">{fmt(b[2], 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
