/**
 * RouteExplorer — each probe's route, leg by leg.
 *
 * Stops and dates are official mission facts; distance and the speed
 * before/after each flyby are read from the bundled JPL Horizons monthly
 * history (about three months either side, so the effect of the gravity
 * assist is visible without the noise of the closest approach itself).
 */

import { useState } from 'react';
import { AU_KM, HISTORY, estimate, historicalSunAu, type CraftId } from '../lib/ephemeris';
import { formatNumber, useNow } from '../hooks/useVoyagerLive';
import { txt, useLang } from './content';
import SourceBadge from './SourceBadge';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });
const DAY = 86_400_000;

interface Stop {
  date: string;
  name: Tri;
  flyby?: boolean;
  why: Tri;
}

const ROUTES: Record<CraftId, Stop[]> = {
  voyager1: [
    { date: '1977-09-05', name: T('Launch from Earth', '從地球發射', 'Lanzamiento desde la Tierra'), why: T('Sent on the faster, shorter path to Jupiter.', '被送上前往木星較快、較短的路徑。', 'Enviada por la ruta más rápida y corta a Júpiter.') },
    { date: '1979-03-05', name: T('Jupiter', '木星', 'Júpiter'), flyby: true, why: T('Jupiter’s gravity bent the path toward Saturn and added a large boost in speed.', '木星的重力把路徑彎向土星，並大幅提升速度。', 'La gravedad de Júpiter curvó la ruta hacia Saturno y le dio un gran impulso.') },
    { date: '1980-11-12', name: T('Saturn and Titan', '土星與泰坦', 'Saturno y Titán'), flyby: true, why: T('The close pass of Titan threw Voyager 1 north out of the planets’ plane — no further planets were reachable.', '近距離飛掠泰坦，把航海家一號甩到行星軌道面北方——之後再也無法抵達其他行星。', 'El paso cercano por Titán lanzó a la Voyager 1 al norte del plano planetario: ningún otro planeta quedó a su alcance.') },
    { date: '2012-08-25', name: T('Heliopause', '日球層頂', 'Heliopausa'), why: T('First human-made object to leave the Sun’s bubble, at about 121.6 AU.', '在約 121.6 AU 處，成為第一個離開太陽泡泡的人造物體。', 'Primer objeto humano en salir de la burbuja solar, a unas 121,6 UA.') },
  ],
  voyager2: [
    { date: '1977-08-20', name: T('Launch from Earth', '從地球發射', 'Lanzamiento desde la Tierra'), why: T('Launched first, on a slower path that kept Uranus and Neptune within reach.', '率先發射，走一條保留前往天王星與海王星可能性的較慢路徑。', 'Despegó primero, por una ruta más lenta que mantenía Urano y Neptuno al alcance.') },
    { date: '1979-07-09', name: T('Jupiter', '木星', 'Júpiter'), flyby: true, why: T('A boost toward Saturn, aimed so that the tour could continue.', '朝土星加速，並經過瞄準，讓旅程得以延續。', 'Un impulso hacia Saturno, apuntado para que la gira pudiera continuar.') },
    { date: '1981-08-25', name: T('Saturn', '土星', 'Saturno'), flyby: true, why: T('Saturn’s pull redirected Voyager 2 toward Uranus.', '土星的引力把航海家二號轉向天王星。', 'La atracción de Saturno redirigió a la Voyager 2 hacia Urano.') },
    { date: '1986-01-24', name: T('Uranus', '天王星', 'Urano'), flyby: true, why: T('The only visit ever made to Uranus; another boost toward Neptune.', '人類唯一一次造訪天王星；並再次加速前往海王星。', 'La única visita hecha a Urano; otro impulso hacia Neptuno.') },
    { date: '1989-08-25', name: T('Neptune and Triton', '海王星與海衛一', 'Neptuno y Tritón'), flyby: true, why: T('Passing over Neptune’s north pole bent the path south and slowed it relative to the Sun.', '飛越海王星北極上空，把路徑甩向南方，並使它相對太陽的速度下降。', 'Pasar sobre el polo norte de Neptuno desvió su ruta al sur y la frenó respecto al Sol.') },
    { date: '2018-11-05', name: T('Heliopause', '日球層頂', 'Heliopausa'), why: T('Crossed at about 119 AU, measured directly by its still-working plasma instrument.', '在約 119 AU 處穿越，並由仍在運作的電漿儀器直接量測到。', 'Cruzó a unas 119 UA, medido directamente por su instrumento de plasma aún activo.') },
  ],
};

/** Speed (km/s) from the monthly JPL history nearest to a date. */
function speedNear(id: CraftId, ms: number): number {
  const rows = HISTORY[id];
  let best = rows[0];
  for (const r of rows) if (Math.abs(Date.parse(`${r[0]}T00:00:00Z`) - ms) < Math.abs(Date.parse(`${best[0]}T00:00:00Z`) - ms)) best = r;
  return best[2];
}

export default function RouteExplorer() {
  const locale = useLang();
  const [craft, setCraft] = useState<CraftId>('voyager1');
  const [sel, setSel] = useState(1);
  const now = useNow(60_000);
  const route = ROUTES[craft];
  const stop = route[Math.min(sel, route.length - 1)];
  const ms = Date.parse(`${stop.date}T12:00:00Z`);
  const au = historicalSunAu(craft, ms);
  const before = speedNear(craft, ms - 100 * DAY);
  const after = speedNear(craft, ms + 100 * DAY);
  const color = craft === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300';
  const today = estimate(craft, now);

  return (
    <div className="hud-panel rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div role="group" aria-label={txt(T('Spacecraft', '探測器', 'Nave'), locale)} className="flex rounded-lg border border-slate-700 p-0.5">
          {(['voyager1', 'voyager2'] as CraftId[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={craft === c}
              onClick={() => {
                setCraft(c);
                setSel(1);
              }}
              className={`min-h-[36px] rounded-md px-3 text-xs font-semibold ${craft === c ? 'bg-cyan-500/20 text-cyan-200' : 'text-slate-300 hover:text-white'}`}
            >
              {c === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
            </button>
          ))}
        </div>
        <SourceBadge kind="official" note={txt(T('stops and dates', '停靠點與日期', 'paradas y fechas'), locale)} />
        <SourceBadge kind="calculated" note={txt(T('distance and speed from JPL history', '依 JPL 歷史資料的距離與速度', 'distancia y velocidad del historial JPL'), locale)} />
      </div>

      <ol className="flex flex-wrap items-center gap-y-3" aria-label={txt(T('Route stops', '路線停靠點', 'Paradas de la ruta'), locale)}>
        {route.map((s, i) => (
          <li key={s.date} className="flex items-center">
            <button
              type="button"
              aria-current={i === sel ? 'step' : undefined}
              onClick={() => setSel(i)}
              className={`min-h-[40px] rounded-full border px-3 text-xs font-semibold ${i === sel ? 'border-cyan-400 bg-cyan-500/15 text-white' : 'border-slate-600 text-slate-300 hover:border-cyan-400'}`}
            >
              {txt(s.name, locale)} <span className="font-mono font-normal text-slate-400">{s.date.slice(0, 4)}</span>
            </button>
            {i < route.length - 1 && <span className="mx-1 text-slate-500" aria-hidden="true">→</span>}
          </li>
        ))}
        <li className="flex items-center">
          <span className="mx-1 text-slate-500" aria-hidden="true">→</span>
          <span className="rounded-full border border-dashed border-slate-600 px-3 py-2 text-xs text-slate-300">
            {txt(T('Today', '今天', 'Hoy'), locale)}: {formatNumber(today.sunKm / AU_KM, locale, 1)} AU
          </span>
        </li>
      </ol>

      <div className="mt-5 rounded-xl border border-slate-700/60 bg-space-950/50 p-4" aria-live="polite">
        <p className={`font-mono text-xs uppercase tracking-widest ${color}`}>
          {stop.date} · {craft === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-white">{txt(stop.name, locale)}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{txt(stop.why, locale)}</p>
        <dl className="mt-3 grid gap-2 font-mono text-sm sm:grid-cols-3">
          <div>
            <dt className="text-[11px] uppercase tracking-widest text-slate-400">{txt(T('Distance from the Sun', '與太陽距離', 'Distancia al Sol'), locale)}</dt>
            <dd className="text-white">{au !== null ? `${formatNumber(au, locale, au < 10 ? 2 : 1)} AU` : `≈ 1 AU (${txt(T('at Earth', '位於地球', 'en la Tierra'), locale)})`}</dd>
          </div>
          {stop.flyby && (
            <>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">{txt(T('Speed ~3 months before', '約 3 個月前的速度', 'Velocidad ~3 meses antes'), locale)}</dt>
                <dd className="text-white">{formatNumber(before, locale, 1)} km/s</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">{txt(T('Speed ~3 months after', '約 3 個月後的速度', 'Velocidad ~3 meses después'), locale)}</dt>
                <dd className={after >= before ? 'text-emerald-300' : 'text-amber-300'}>
                  {formatNumber(after, locale, 1)} km/s ({after >= before ? '+' : '−'}
                  {formatNumber(Math.abs(after - before), locale, 1)})
                </dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}
