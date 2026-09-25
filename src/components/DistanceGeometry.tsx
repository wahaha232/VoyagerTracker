/**
 * DistanceGeometry — why "distance from Earth" and "distance from the Sun"
 * differ, and why the Earth distance wobbles through the year.
 *
 * A schematic (not to scale) top-down view: a slider moves Earth around
 * its orbit through the current year. For each day the real distances are
 * calculated with the site's model, and a sparkline shows how the
 * Earth-minus-Sun difference swings over the year.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AU_KM, earthHeliocentric, estimateAt, spacecraftState, sunBarycentric, type CraftId } from '../lib/ephemeris';
import { formatNumber } from '../hooks/useVoyagerLive';
import { txt, useLang } from './content';
import SourceBadge from './SourceBadge';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });
const DAY = 86_400_000;
const S = 380; // SVG size
const C = S / 2;
const ORBIT = 70;
const EDGE = 165;

export default function DistanceGeometry() {
  const locale = useLang();
  const [craft, setCraft] = useState<CraftId>('voyager1');
  const [year] = useState(() => new Date().getUTCFullYear());
  const yearStart = Date.UTC(year, 0, 1);
  const daysInYear = (Date.UTC(year + 1, 0, 1) - yearStart) / DAY;
  const [day, setDay] = useState(() => Math.floor((Date.now() - yearStart) / DAY));
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    let last = 0;
    const step = (t: number) => {
      if (t - last > 40) {
        last = t;
        setDay((d) => (d + 1) % Math.floor(daysInYear));
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [playing, daysInYear]);

  // Earth − Sun distance difference for every day of the year (AU).
  const series = useMemo(
    () =>
      Array.from({ length: Math.floor(daysInYear) }, (_, d) => {
        const e = estimateAt(craft, yearStart + d * DAY + DAY / 2);
        return e ? (e.earthKm - e.sunKm) / AU_KM : 0;
      }),
    [craft, yearStart, daysInYear],
  );

  const at = yearStart + day * DAY + DAY / 2;
  const est = estimateAt(craft, at);
  const next = estimateAt(craft, at + DAY);
  // Directions (ecliptic longitude) of Earth and the probe, seen from the Sun.
  const e = earthHeliocentric(at);
  const earthLon = Math.atan2(e[1], e[0]);
  const r = spacecraftState(craft, Math.min(Math.max(at, Date.UTC(2020, 0, 1)), Date.UTC(2040, 0, 1))).r;
  const s = sunBarycentric(at);
  const craftLon = Math.atan2(r[1] - s[1], r[0] - s[0]);
  const xy = (rad: number, lon: number) => [C + rad * Math.cos(lon), C - rad * Math.sin(lon)] as const;
  const [ex, ey] = xy(ORBIT, earthLon);
  const [vx, vy] = xy(EDGE, craftLon);
  const color = craft === 'voyager1' ? '#22d3ee' : '#34d399';

  const diffAu = est ? (est.earthKm - est.sunKm) / AU_KM : 0;
  const closing = est && next ? next.earthKm < est.earthKm : false;
  const minD = Math.min(...series);
  const maxD = Math.max(...series);
  const dateLabel = new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(at);

  // Sparkline geometry.
  const SW = 360;
  const SH = 70;
  const sx = (d: number) => (d / (series.length - 1)) * SW;
  const sy = (v: number) => SH - 6 - ((v - minD) / (maxD - minD || 1)) * (SH - 12);
  const spark = series.map((v, d) => `${d ? 'L' : 'M'}${sx(d).toFixed(1)},${sy(v).toFixed(1)}`).join('');

  return (
    <div className="hud-panel rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <SourceBadge kind="educational" note={txt(T('diagram not to scale', '示意圖，非等比例', 'esquema no a escala'), locale)} />
        <SourceBadge kind="calculated" note={txt(T('distances', '距離數值', 'distancias'), locale)} />
        <div role="group" aria-label={txt(T('Spacecraft', '探測器', 'Nave'), locale)} className="ml-auto flex rounded-lg border border-slate-700 p-0.5">
          {(['voyager1', 'voyager2'] as CraftId[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={craft === c}
              onClick={() => setCraft(c)}
              className={`min-h-[36px] rounded-md px-3 text-xs font-semibold ${craft === c ? 'bg-cyan-500/20 text-cyan-200' : 'text-slate-300 hover:text-white'}`}
            >
              {c === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <svg
          viewBox={`0 0 ${S} ${S}`}
          className="mx-auto w-full max-w-[380px]"
          role="img"
          aria-label={txt(
            T(
              `Schematic: the Sun at the centre, Earth on its orbit on ${dateLabel}, and the direction to ${craft === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}. Not to scale.`,
              `示意圖：太陽位於中心，地球位於 ${dateLabel} 的軌道位置，以及${craft === 'voyager1' ? '航海家一號' : '航海家二號'}的方向。非等比例。`,
              `Esquema: el Sol en el centro, la Tierra en su órbita el ${dateLabel} y la dirección hacia la ${craft === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}. No a escala.`,
            ),
            locale,
          )}
        >
          <circle cx={C} cy={C} r={ORBIT} fill="none" stroke="rgba(56,189,248,0.45)" strokeDasharray="3 4" />
          <line x1={C} y1={C} x2={vx} y2={vy} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="6 5" />
          <line x1={ex} y1={ey} x2={vx} y2={vy} stroke={color} strokeWidth="2" />
          <circle cx={C} cy={C} r="9" fill="#fbbf24" />
          <circle cx={ex} cy={ey} r="6" fill="#38bdf8" />
          <circle cx={vx} cy={vy} r="6" fill={color} />
          <text x={C + 12} y={C - 12} fill="#fde68a" fontSize="12">{txt(T('Sun', '太陽', 'Sol'), locale)}</text>
          <text x={ex + 9} y={ey + 16} fill="#bae6fd" fontSize="12">{txt(T('Earth', '地球', 'Tierra'), locale)}</text>
          <text x={vx + (Math.cos(craftLon) > 0 ? -8 : 8)} y={vy - 12} textAnchor={Math.cos(craftLon) > 0 ? 'end' : 'start'} fill={color} fontSize="12">
            {craft === 'voyager1' ? 'Voyager 1' : 'Voyager 2'} ({txt(T('far off-scale', '遠在圖外', 'muy fuera de escala'), locale)})
          </text>
        </svg>

        <div className="min-w-0">
          <label htmlFor="geo-day" className="block text-sm text-slate-300">
            {txt(T('Move Earth through', '拖動地球走過', 'Mueve la Tierra a lo largo de'), locale)} {year}: <strong className="text-white">{dateLabel}</strong>
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="geo-day"
              type="range"
              min={0}
              max={Math.floor(daysInYear) - 1}
              value={day}
              onChange={(ev) => {
                setPlaying(false);
                setDay(Number(ev.target.value));
              }}
              className="h-11 w-full accent-cyan-400"
            />
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="min-h-[40px] shrink-0 rounded-lg border border-slate-600 px-3 text-xs font-semibold text-slate-200 hover:border-cyan-400"
            >
              {playing ? txt(T('Pause', '暫停', 'Pausa'), locale) : txt(T('Play year', '播放一年', 'Reproducir año'), locale)}
            </button>
          </div>

          {est && (
            <dl className="mt-4 grid grid-cols-1 gap-2 font-mono text-sm sm:grid-cols-3">
              <div className="rounded-lg border border-amber-400/30 bg-space-950/50 p-3">
                <dt className="text-[11px] uppercase tracking-widest text-amber-200">{txt(T('From the Sun', '距太陽', 'Desde el Sol'), locale)}</dt>
                <dd className="text-white">{formatNumber(est.sunKm / AU_KM, locale, 3)} AU</dd>
              </div>
              <div className="rounded-lg border border-cyan-400/30 bg-space-950/50 p-3">
                <dt className="text-[11px] uppercase tracking-widest text-cyan-200">{txt(T('From Earth', '距地球', 'Desde la Tierra'), locale)}</dt>
                <dd className="text-white">{formatNumber(est.earthKm / AU_KM, locale, 3)} AU</dd>
              </div>
              <div className="rounded-lg border border-slate-600 bg-space-950/50 p-3">
                <dt className="text-[11px] uppercase tracking-widest text-slate-300">{txt(T('Difference', '差值', 'Diferencia'), locale)}</dt>
                <dd className="text-white">
                  {diffAu >= 0 ? '+' : '−'}
                  {formatNumber(Math.abs(diffAu), locale, 3)} AU
                </dd>
              </div>
            </dl>
          )}
          <p className="mt-2 text-sm text-slate-300" aria-live="polite">
            {closing
              ? txt(T('On this day Earth is moving toward the probe faster than the probe moves away, so the Earth distance is shrinking.', '這一天地球朝探測器移動的速度，比探測器遠離的速度更快，所以地球距離正在縮小。', 'Este día la Tierra se acerca a la sonda más rápido de lo que la sonda se aleja, así que la distancia a la Tierra disminuye.'), locale)
              : txt(T('On this day the Earth distance is growing: Earth is moving away from the probe’s direction, or not toward it fast enough to offset the probe’s own motion.', '這一天地球距離正在增加：地球正遠離探測器的方向，或朝它移動的速度不足以抵銷探測器本身的運動。', 'Este día la distancia a la Tierra crece: la Tierra se aleja de la dirección de la sonda, o no se acerca lo bastante rápido para compensar el movimiento de la sonda.'), locale)}
          </p>

          <figure className="mt-4">
            <figcaption className="mb-1 text-xs text-slate-400">
              {txt(T(`Earth distance minus Sun distance through ${year} (AU)`, `${year} 年全年「地球距離減太陽距離」（AU）`, `Distancia a la Tierra menos distancia al Sol durante ${year} (UA)`), locale)}
            </figcaption>
            <svg viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full" role="img" aria-label={txt(T(`Ranges from ${minD.toFixed(2)} to ${maxD.toFixed(2)} AU over the year.`, `全年介於 ${minD.toFixed(2)} 至 ${maxD.toFixed(2)} AU 之間。`, `Oscila entre ${minD.toFixed(2)} y ${maxD.toFixed(2)} UA durante el año.`), locale)}>
              <line x1="0" x2={SW} y1={sy(0)} y2={sy(0)} stroke="rgba(148,163,184,0.35)" strokeDasharray="3 3" />
              <path d={spark} fill="none" stroke={color} strokeWidth="2" />
              <circle cx={sx(day)} cy={sy(series[day] ?? 0)} r="4" fill="#fff" />
            </svg>
            <p className="mt-1 font-mono text-[11px] text-slate-400">
              min {minD >= 0 ? '+' : '−'}
              {formatNumber(Math.abs(minD), locale, 2)} AU · max +{formatNumber(maxD, locale, 2)} AU
            </p>
          </figure>
        </div>
      </div>

      <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-slate-300 md:grid-cols-3">
        {[
          T('The Sun distance only grows: the probe moves steadily outward from the Sun.', '太陽距離只會增加：探測器穩定地遠離太陽。', 'La distancia al Sol solo crece: la sonda se aleja del Sol de forma constante.'),
          T('Earth sits about 1 AU from the Sun and circles it once a year, so it is sometimes on the probe’s side of the Sun and sometimes on the far side.', '地球距太陽約 1 AU，每年繞太陽一圈，所以它有時在太陽靠探測器的一側，有時在另一側。', 'La Tierra está a ~1 UA del Sol y lo rodea una vez al año, así que a veces está del lado de la sonda y a veces del lado opuesto.'),
          T('Because each probe is well above or below the planets’ plane, the swing is smaller than a full ±1 AU — about ±0.8 AU.', '由於兩艘探測器都遠在行星軌道面的上方或下方，起伏幅度小於完整的 ±1 AU——約為 ±0.8 AU。', 'Como cada sonda está muy por encima o por debajo del plano planetario, la oscilación es menor que ±1 UA: unas ±0,8 UA.'),
        ].map((b) => (
          <li key={b.en} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
            {txt(b, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}
