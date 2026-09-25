/**
 * DateTools — "Voyager Date Explorer" and "Compare two dates".
 *
 * Both use estimateAt(): the validated live model for 2024–2031 and the
 * interpolated JPL monthly history for other dates. Historical events come
 * only from the sourced list in src/data/events.ts; when nothing is
 * listed near a date, the tool says so instead of inventing context.
 */

import { useState } from 'react';
import { AU_KM, estimateAt, historyRange, type CraftId } from '../../lib/ephemeris';
import { elapsedYearsDays } from '../../lib/context';
import { EVENTS, type TimelineEvent } from '../../data/events';
import { txt, useLang } from '../content';
import SourceBadge from '../SourceBadge';
import { chipCls, durationText, Field, fmtN, inputCls, parseDate } from './toolUi';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });
const DAY = 86_400_000;
const LAUNCH: Record<CraftId, number> = { voyager1: Date.parse('1977-09-05T12:00:00Z'), voyager2: Date.parse('1977-08-20T12:00:00Z') };
const NAME: Record<CraftId, string> = { voyager1: 'Voyager 1', voyager2: 'Voyager 2' };
const CRAFTS: CraftId[] = ['voyager1', 'voyager2'];

const eventMs = (e: TimelineEvent) => Date.parse(`${e.date}T12:00:00Z`);

/** The last sourced event on or before a date, and any within ±120 days. */
function eventsAround(ms: number) {
  const past = EVENTS.filter((e) => !e.upcoming && eventMs(e) <= ms);
  const near = EVENTS.filter((e) => Math.abs(eventMs(e) - ms) <= 120 * DAY);
  return { last: past[past.length - 1] ?? null, near };
}

function MethodNote({ method }: { method: 'model' | 'history' }) {
  const locale = useLang();
  return (
    <p className="mt-1 text-[11px] text-slate-400">
      {method === 'model'
        ? txt(T('Live model (validated 2024–2031, ≲40,000 km vs JPL)', '即時模型（2024–2031 已驗證，與 JPL 相差 ≲4 萬公里）', 'Modelo en vivo (validado 2024–2031, ≲40 000 km frente a JPL)'), locale)
        : txt(
            T(
              'JPL monthly history, interpolated (≲35,000 km after 1990; up to a few million km near 1977–1989 flybys)',
              'JPL 月度歷史資料內插（1990 年後 ≲3.5 萬公里；1977–1989 飛掠期間最多數百萬公里）',
              'Historial mensual de JPL interpolado (≲35 000 km desde 1990; hasta unos millones de km cerca de los sobrevuelos de 1977–1989)',
            ),
            locale,
          )}
    </p>
  );
}

/* ------------------------------------------------------------------ */

export function DateExplorer() {
  const locale = useLang();
  const [date, setDate] = useState('2000-01-01');
  const ms = parseDate(date);
  const range = historyRange('voyager1');
  const fmtDay = (m: number) => new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(m);
  const presets: { d: string; l: Tri }[] = [
    { d: '1987-09-05', l: T('Launch + 10 years', '發射後 10 年', 'Lanzamiento + 10 años') },
    { d: '1997-09-05', l: T('+ 20 years', '+ 20 年', '+ 20 años') },
    { d: '2007-09-05', l: T('+ 30 years', '+ 30 年', '+ 30 años') },
    { d: '2017-09-05', l: T('+ 40 years', '+ 40 年', '+ 40 años') },
    { d: '2027-09-05', l: T('+ 50 years (predicted)', '+ 50 年（預測）', '+ 50 años (previsto)') },
    { d: '1990-02-14', l: T('Pale Blue Dot', '蒼藍小點', 'Pálido punto azul') },
  ];
  const ctx = ms !== null ? eventsAround(ms) : null;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr] sm:items-end">
        <Field label={txt(T('Date (UTC), e.g. your birthday', '日期（UTC），例如您的生日', 'Fecha (UTC), p. ej. tu cumpleaños'), locale)} htmlFor="od-date">
          <input id="od-date" type="date" min="1977-08-20" max="2034-12-01" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p.d} type="button" className={chipCls} onClick={() => setDate(p.d)}>
              {txt(p.l, locale)}
            </button>
          ))}
        </div>
      </div>

      {ms === null ? (
        <p className="mt-4 text-sm text-amber-200" role="alert">
          {txt(T('Please enter a valid date.', '請輸入有效的日期。', 'Introduce una fecha válida.'), locale)}
        </p>
      ) : (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2" aria-live="polite">
            {CRAFTS.map((id) => {
              const e = estimateAt(id, ms);
              const before = ms < LAUNCH[id];
              const age = before ? null : elapsedYearsDays(LAUNCH[id], ms);
              return (
                <div key={id} className="rounded-xl border border-slate-700/60 bg-space-900/60 p-4">
                  <p className={`font-mono text-xs font-bold uppercase tracking-widest ${id === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300'}`}>{NAME[id]}</p>
                  {before ? (
                    <p className="mt-1 text-sm text-slate-300">{txt(T('Not launched yet on this date.', '這一天尚未發射。', 'Aún no se había lanzado en esa fecha.'), locale)}</p>
                  ) : !e ? (
                    <p className="mt-1 text-sm text-slate-300">
                      {txt(T('Outside the data range', '超出資料範圍', 'Fuera del rango de datos'), locale)} ({fmtDay(range.startMs)} – {fmtDay(range.endMs)}).
                    </p>
                  ) : (
                    <>
                      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-sm">
                        <dt className="text-slate-400">{txt(T('From Earth', '距地球', 'Desde la Tierra'), locale)}</dt>
                        <dd className="text-white">{fmtN(e.earthKm / AU_KM, locale, 2)} AU</dd>
                        <dt className="text-slate-400">{txt(T('From the Sun', '距太陽', 'Desde el Sol'), locale)}</dt>
                        <dd className="text-white">{fmtN(e.sunKm / AU_KM, locale, 2)} AU</dd>
                        <dt className="text-slate-400">{txt(T('Signal delay', '訊號延遲', 'Retardo de señal'), locale)}</dt>
                        <dd className="text-white">{durationText(e.lightTimeS, locale)}</dd>
                        <dt className="text-slate-400">{txt(T('Speed (Sun)', '速度（相對太陽）', 'Velocidad (Sol)'), locale)}</dt>
                        <dd className="text-white">{fmtN(e.speedSunKmS, locale, 1)} km/s</dd>
                        <dt className="text-slate-400">{txt(T('Mission age', '任務已執行', 'Edad de la misión'), locale)}</dt>
                        <dd className="text-white">
                          {age!.years} {txt(T('y', '年', 'a'), locale)} {age!.days} {txt(T('d', '天', 'd'), locale)}
                        </dd>
                      </dl>
                      <div className="mt-2">
                        <SourceBadge kind="calculated" />
                      </div>
                      <MethodNote method={e.method} />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-slate-700/60 bg-space-900/40 p-4 text-sm">
            <p className="mb-2 flex flex-wrap items-center gap-2 font-semibold text-white">
              {txt(T('What was Voyager doing around then?', '那段時間航海家在做什麼？', '¿Qué hacía Voyager por entonces?'), locale)}
              <SourceBadge kind="official" note="NASA/JPL" />
            </p>
            {ctx && ctx.near.length > 0 ? (
              <ul className="space-y-2">
                {ctx.near.map((ev) => (
                  <li key={ev.date + ev.craft}>
                    <span className="font-mono text-xs text-cyan-300">{ev.date}</span> — <strong className="text-slate-100">{txt(ev.title, locale)}.</strong>{' '}
                    <span className="text-slate-300">{txt(ev.what, locale)}</span>{' '}
                    <a href={ev.source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 underline underline-offset-2">
                      {txt(T('source', '出處', 'fuente'), locale)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-300">
                {txt(T('No event in this site’s sourced timeline falls within four months of this date.', '本站有出處的時間軸中，這個日期前後四個月內沒有記錄的事件。', 'Ningún evento de la cronología con fuentes de este sitio cae a menos de cuatro meses de esta fecha.'), locale)}{' '}
                {ctx?.last && (
                  <>
                    {txt(T('The most recent listed event before it:', '在此之前最近的一個事件：', 'El evento anterior más reciente:'), locale)}{' '}
                    <span className="font-mono text-xs text-cyan-300">{ctx.last.date}</span> — {txt(ctx.last.title, locale)}.
                  </>
                )}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function CompareDates() {
  const locale = useLang();
  const [a, setA] = useState('2012-08-25');
  const [b, setB] = useState(() => new Date().toISOString().slice(0, 10));
  const aMs = parseDate(a);
  const bMs = parseDate(b);
  const valid = aMs !== null && bMs !== null;
  const sign = (v: number) => (v >= 0 ? '+' : '−');

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={txt(T('Date A (UTC)', '日期 A（UTC）', 'Fecha A (UTC)'), locale)} htmlFor="cd-a">
          <input id="cd-a" type="date" min="1977-08-20" max="2034-12-01" className={inputCls} value={a} onChange={(e) => setA(e.target.value)} />
        </Field>
        <Field label={txt(T('Date B (UTC)', '日期 B（UTC）', 'Fecha B (UTC)'), locale)} htmlFor="cd-b">
          <input id="cd-b" type="date" min="1977-08-20" max="2034-12-01" className={inputCls} value={b} onChange={(e) => setB(e.target.value)} />
        </Field>
      </div>
      {!valid ? (
        <p className="mt-4 text-sm text-amber-200" role="alert">
          {txt(T('Please enter two valid dates.', '請輸入兩個有效的日期。', 'Introduce dos fechas válidas.'), locale)}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto" aria-live="polite">
          <p className="mb-2 text-sm text-slate-300">
            {txt(T('Time between the dates', '兩日期相隔', 'Tiempo entre las fechas'), locale)}: <strong className="font-mono text-white">{fmtN(Math.abs(bMs - aMs) / DAY, locale, 0)} {txt(T('days', '天', 'días'), locale)}</strong>
          </p>
          <table className="w-full min-w-[520px] text-left text-sm">
            <caption className="sr-only">{txt(T('Change between date A and date B', '日期 A 到日期 B 的變化', 'Cambio entre la fecha A y la B'), locale)}</caption>
            <thead>
              <tr className="font-mono text-xs uppercase tracking-wider text-slate-400">
                <th scope="col" className="py-2 pr-3">{txt(T('Change from A to B', 'A 到 B 的變化', 'Cambio de A a B'), locale)}</th>
                <th scope="col" className="py-2 pr-3 text-cyan-300">Voyager 1</th>
                <th scope="col" className="py-2 text-emerald-300">Voyager 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {(['sun', 'earth', 'light', 'rate'] as const).map((row) => (
                <tr key={row}>
                  <th scope="row" className="py-2 pr-3 font-sans font-normal text-slate-300">
                    {
                      {
                        sun: txt(T('Distance from the Sun', '與太陽的距離', 'Distancia al Sol'), locale),
                        earth: txt(T('Distance from Earth', '與地球的距離', 'Distancia a la Tierra'), locale),
                        light: txt(T('One-way signal delay', '單程訊號延遲', 'Retardo de señal (ida)'), locale),
                        rate: txt(T('Average rate of change of Sun distance', '太陽距離的平均變化率', 'Ritmo medio de cambio de la distancia al Sol'), locale),
                      }[row]
                    }
                  </th>
                  {CRAFTS.map((id) => {
                    const ea = estimateAt(id, aMs);
                    const eb = estimateAt(id, bMs);
                    if (aMs < LAUNCH[id] || bMs < LAUNCH[id] || !ea || !eb) return <td key={id} className="py-2 pr-3 text-slate-400">—</td>;
                    const dSun = eb.sunKm - ea.sunKm;
                    const cell =
                      row === 'sun'
                        ? `${sign(dSun)}${fmtN(Math.abs(dSun) / AU_KM, locale, 2)} AU`
                        : row === 'earth'
                          ? `${sign(eb.earthKm - ea.earthKm)}${fmtN(Math.abs(eb.earthKm - ea.earthKm) / AU_KM, locale, 2)} AU`
                          : row === 'light'
                            ? `${sign(eb.lightTimeS - ea.lightTimeS)}${durationText(Math.abs(eb.lightTimeS - ea.lightTimeS), locale)}`
                            : bMs === aMs
                              ? '—'
                              : `${fmtN(dSun / ((bMs - aMs) / 1000), locale, 2)} km/s`;
                    return (
                      <td key={id} className="py-2 pr-3 text-slate-100">
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-slate-400">
            {txt(
              T(
                'These are differences in the selected distance measurement, not the length of the path the spacecraft actually flew (which curved around planets). A dash means a spacecraft had not launched yet or the date is outside the data.',
                '這些是所選距離量測值的差異，並非探測器實際飛行路徑的長度（實際路徑曾繞行行星而彎曲）。破折號表示當時探測器尚未發射，或日期超出資料範圍。',
                'Son diferencias en la distancia seleccionada, no la longitud del camino que realmente recorrió la nave (que se curvó al pasar por los planetas). Un guion indica que la nave aún no había despegado o que la fecha está fuera de los datos.',
              ),
              locale,
            )}
          </p>
        </div>
      )}
    </div>
  );
}
