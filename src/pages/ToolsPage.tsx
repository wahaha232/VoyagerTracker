/**
 * ToolsPage — /tools.html  (EN / 繁中 / Español)
 *
 * Four small calculators built on the same model as the tracker:
 * light time, unit conversion, "where was Voyager on a date" (JPL history)
 * and hypothetical travel time. Each one explains what it computes, the
 * formula, a worked example and its limitations.
 */

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import ClientOnly from '../components/ClientOnly';
import { BiArticleHeader, bi, txt, useLang } from '../components/content';
import { AU_KM, C_KM_S, estimate, historicalSunAu } from '../lib/ephemeris';
import {
  LIGHT_YEAR_KM,
  PROXIMA_LY,
  REFERENCE_SPEEDS,
  UNITS,
  convert,
  elapsedYearsDays,
  formatBig,
  splitDuration,
  travelYears,
  type UnitKey,
} from '../lib/context';
import type { Locale } from '../types/voyager';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

const UNIT_LABEL: Record<UnitKey, Tri> = {
  km: T('kilometres (km)', '公里（km）', 'kilómetros (km)'),
  mi: T('miles (mi)', '英里（mi）', 'millas (mi)'),
  au: T('astronomical units (AU)', '天文單位（AU）', 'unidades astronómicas (UA)'),
  lightSecond: T('light-seconds', '光秒', 'segundos-luz'),
  lightMinute: T('light-minutes', '光分', 'minutos-luz'),
  lightHour: T('light-hours', '光時', 'horas-luz'),
  lightDay: T('light-days', '光日', 'días-luz'),
  lightYear: T('light-years', '光年', 'años luz'),
};

const SPEED_LABEL: Record<string, Tri> = {
  walk: T('Walking (5 km/h)', '步行（5 公里/小時）', 'A pie (5 km/h)'),
  car: T('Car on a highway (100 km/h)', '高速公路上的汽車（100 公里/小時）', 'Coche en autopista (100 km/h)'),
  train: T('High-speed train (300 km/h)', '高速鐵路（300 公里/小時）', 'Tren de alta velocidad (300 km/h)'),
  airliner: T('Airliner (900 km/h)', '民航客機（900 公里/小時）', 'Avión comercial (900 km/h)'),
  iss: T('Space station orbital speed (27,600 km/h)', '國際太空站軌道速度（27,600 公里/小時）', 'Velocidad orbital de la estación espacial (27 600 km/h)'),
};

/* ------------------------------------------------------------------ */
/* Shared layout                                                        */
/* ------------------------------------------------------------------ */

function Tool({
  id,
  title,
  what,
  children,
  method,
  example,
  limits,
}: {
  id: string;
  title: Tri;
  what: Tri;
  children: ReactNode;
  method: Tri;
  example: Tri;
  limits: Tri;
}) {
  const locale = useLang();
  return (
    <section id={id} className="mb-12 scroll-mt-24 rounded-2xl border border-slate-700/60 bg-space-900/40 p-5 sm:p-6">
      <h2 className="mb-2 text-2xl font-bold tracking-wide text-white">{txt(title, locale)}</h2>
      <p className="mb-5 max-w-3xl leading-relaxed text-slate-300">{txt(what, locale)}</p>
      <div className="mb-5 rounded-xl border border-cyan-500/30 bg-space-950/60 p-4 sm:p-5">
        <ClientOnly
          fallback={
            <p className="text-sm text-slate-400">
              {txt(T('This calculator runs in your browser (JavaScript required).', '此計算器在您的瀏覽器中執行（需要 JavaScript）。', 'Esta calculadora funciona en tu navegador (requiere JavaScript).'), locale)}
            </p>
          }
        >
          {children}
        </ClientOnly>
      </div>
      <dl className="grid gap-4 md:grid-cols-3">
        {[
          { k: T('How it is calculated', '計算方式', 'Cómo se calcula'), v: method },
          { k: T('Example', '範例', 'Ejemplo'), v: example },
          { k: T('Limitations', '限制', 'Limitaciones'), v: limits },
        ].map((row) => (
          <div key={row.k.en} className="border-l-2 border-cyan-500/40 pl-3">
            <dt className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">{txt(row.k, locale)}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-300">{txt(row.v, locale)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const inputCls =
  'min-h-[44px] w-full rounded-lg border border-slate-600 bg-space-900 px-3 font-mono text-sm text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40';
const chipCls =
  'min-h-[36px] rounded-full border border-slate-600 px-3 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white';

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const fmtN = (v: number, locale: Locale, d = 2) =>
  Number.isFinite(v) ? new Intl.NumberFormat(locale, { maximumFractionDigits: d }).format(v) : '—';

function durationText(seconds: number, locale: Locale) {
  const d = splitDuration(seconds);
  const u = locale === 'zh-TW' ? ['天', '小時', '分', '秒'] : locale === 'es' ? ['d', 'h', 'min', 's'] : ['d', 'h', 'min', 's'];
  if (seconds < 1) return `${fmtN(seconds, locale, 3)} ${u[3]}`;
  const parts = [d.days && `${d.days} ${u[0]}`, (d.days || d.hours) && `${d.hours} ${u[1]}`, `${d.minutes} ${u[2]}`, `${d.seconds} ${u[3]}`];
  return parts.filter(Boolean).join(' ');
}

/* ------------------------------------------------------------------ */
/* 1. Light-time calculator                                             */
/* ------------------------------------------------------------------ */

function LightTime() {
  const locale = useLang();
  const [value, setValue] = useState('1');
  const [unit, setUnit] = useState<UnitKey>('au');
  const km = Number(value) * UNITS[unit];
  const valid = Number.isFinite(km) && km >= 0;
  const now = Date.now();
  const presets: { label: Tri; km: number }[] = [
    { label: T('Moon (average)', '月球（平均）', 'Luna (media)'), km: 384_400 },
    { label: T('Sun (1 AU)', '太陽（1 AU）', 'Sol (1 UA)'), km: AU_KM },
    { label: T('Mars at its closest (~54.6 million km)', '火星最近時（約 5,460 萬公里）', 'Marte en su punto más cercano (~54,6 millones de km)'), km: 54.6e6 },
    { label: T('Neptune (~30 AU)', '海王星（約 30 AU）', 'Neptuno (~30 UA)'), km: 30.07 * AU_KM },
    { label: T('Voyager 2 now', '航海家二號（此刻）', 'Voyager 2 ahora'), km: estimate('voyager2', now).earthKm },
    { label: T('Voyager 1 now', '航海家一號（此刻）', 'Voyager 1 ahora'), km: estimate('voyager1', now).earthKm },
  ];
  const setKm = (k: number) => {
    setUnit('km');
    setValue(String(Math.round(k)));
  };
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
        <Field label={txt(T('Distance', '距離', 'Distancia'), locale)} htmlFor="lt-value">
          <input id="lt-value" className={inputCls} inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label={txt(T('Unit', '單位', 'Unidad'), locale)} htmlFor="lt-unit">
          <select id="lt-unit" className={inputCls} value={unit} onChange={(e) => setUnit(e.target.value as UnitKey)}>
            {(['km', 'mi', 'au'] as UnitKey[]).map((u) => (
              <option key={u} value={u}>
                {txt(UNIT_LABEL[u], locale)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" aria-label={txt(T('Presets', '預設值', 'Valores predefinidos'), locale)}>
        {presets.map((p) => (
          <button key={p.label.en} type="button" className={chipCls} onClick={() => setKm(p.km)}>
            {txt(p.label, locale)}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2" aria-live="polite">
        <Result
          label={txt(T('One-way light time', '單程光行時間', 'Tiempo de luz (ida)'), locale)}
          value={valid ? durationText(km / C_KM_S, locale) : '—'}
        />
        <Result
          label={txt(T('Round trip (send + reply)', '往返（發送＋回覆）', 'Ida y vuelta (envío + respuesta)'), locale)}
          value={valid ? durationText((2 * km) / C_KM_S, locale) : '—'}
        />
      </div>
    </div>
  );
}

function Result({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-space-900/60 p-4">
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 break-words font-mono text-lg font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Distance converter                                                */
/* ------------------------------------------------------------------ */

function Converter() {
  const locale = useLang();
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<UnitKey>('km');
  const initial = useMemo(() => String(Math.round(estimate('voyager1', Date.now()).earthKm)), []);
  const v = Number(value === '' ? initial : value);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
        <Field label={txt(T('Value (defaults to Voyager 1 now)', '數值（預設為航海家一號此刻距離）', 'Valor (por defecto, Voyager 1 ahora)'), locale)} htmlFor="cv-value">
          <input id="cv-value" className={inputCls} inputMode="decimal" placeholder={initial} value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label={txt(T('From unit', '原始單位', 'Unidad de origen'), locale)} htmlFor="cv-unit">
          <select id="cv-unit" className={inputCls} value={unit} onChange={(e) => setUnit(e.target.value as UnitKey)}>
            {(Object.keys(UNITS) as UnitKey[]).map((u) => (
              <option key={u} value={u}>
                {txt(UNIT_LABEL[u], locale)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <table className="mt-4 w-full text-left text-sm" aria-live="polite">
        <caption className="sr-only">{txt(T('Converted values', '換算結果', 'Valores convertidos'), locale)}</caption>
        <tbody className="divide-y divide-slate-800 font-mono">
          {(Object.keys(UNITS) as UnitKey[]).map((u) => (
            <tr key={u}>
              <th scope="row" className="py-2 pr-4 font-sans font-normal text-slate-400">
                {txt(UNIT_LABEL[u], locale)}
              </th>
              <td className="py-2 text-right text-slate-100">{Number.isFinite(v) ? formatBig(convert(v, unit, u), locale, 3) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Where was Voyager on a date?                                      */
/* ------------------------------------------------------------------ */

function OnThisDate() {
  const locale = useLang();
  const [date, setDate] = useState('2000-01-01');
  const ms = Date.parse(`${date}T12:00:00Z`);
  const now = Date.now();
  const launches = { voyager1: Date.parse('1977-09-05T12:00:00Z'), voyager2: Date.parse('1977-08-20T12:00:00Z') };
  const rows = (['voyager1', 'voyager2'] as const).map((id) => {
    const au = Number.isFinite(ms) ? historicalSunAu(id, ms) : null;
    const today = estimate(id, now).sunKm / AU_KM;
    return { id, au, today, before: ms < launches[id], age: ms >= launches[id] ? elapsedYearsDays(launches[id], ms) : null };
  });
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr] sm:items-end">
        <Field label={txt(T('Date (e.g. your birthday)', '日期（例如您的生日）', 'Fecha (p. ej., tu cumpleaños)'), locale)} htmlFor="od-date">
          <input id="od-date" type="date" min="1977-08-20" max="2034-12-01" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <div className="flex flex-wrap gap-2">
          {[
            { d: '1990-02-14', l: T('Pale Blue Dot', '蒼藍小點', 'Pálido punto azul') },
            { d: '2012-08-25', l: T('V1 enters interstellar space', '一號進入星際空間', 'V1 entra al espacio interestelar') },
            { d: '2030-01-01', l: T('1 Jan 2030 (predicted)', '2030 年 1 月 1 日（預測）', '1 ene 2030 (previsto)') },
          ].map((p) => (
            <button key={p.d} type="button" className={chipCls} onClick={() => setDate(p.d)}>
              {txt(p.l, locale)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2" aria-live="polite">
        {rows.map((r) => (
          <div key={r.id} className="rounded-xl border border-slate-700/60 bg-space-900/60 p-4">
            <p className={`font-mono text-xs font-bold uppercase tracking-widest ${r.id === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300'}`}>
              {r.id === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
            </p>
            {r.before ? (
              <p className="mt-1 text-sm text-slate-300">{txt(T('Not launched yet on this date.', '這一天尚未發射。', 'Aún no se había lanzado en esa fecha.'), locale)}</p>
            ) : r.au === null ? (
              <p className="mt-1 text-sm text-slate-300">{txt(T('Outside the data range (Aug 1977 – Dec 2034).', '超出資料範圍（1977 年 8 月至 2034 年 12 月）。', 'Fuera del rango de datos (ago 1977 – dic 2034).'), locale)}</p>
            ) : (
              <>
                <p className="mt-1 font-mono text-lg font-semibold text-white">
                  {fmtN(r.au, locale, 2)} AU · {fmtN((r.au * AU_KM) / 1e9, locale, 2)} {txt(T('billion km', '十億公里', 'mil millones de km'), locale)}
                </p>
                <p className="text-xs text-slate-300">
                  {txt(T('from the Sun', '距太陽', 'del Sol'), locale)} · {fmtN((r.au / r.today) * 100, locale, 1)}%{' '}
                  {txt(T('of today’s distance', '相當於今天距離的比例', 'de la distancia actual'), locale)}
                </p>
                {r.age && (
                  <p className="text-xs text-slate-400">
                    {txt(T('Mission age that day', '當天任務已執行', 'Edad de la misión ese día'), locale)}: {r.age.years}{' '}
                    {txt(T('years', '年', 'años'), locale)} {r.age.days} {txt(T('days', '天', 'días'), locale)}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Hypothetical travel time                                          */
/* ------------------------------------------------------------------ */

function TravelTime() {
  const locale = useLang();
  const [target, setTarget] = useState<'voyager1' | 'voyager2'>('voyager1');
  const [custom, setCustom] = useState('');
  const e = estimate(target, Date.now());
  const customKmh = Number(custom);
  const speeds = [
    ...REFERENCE_SPEEDS.map((s) => ({ key: s.key as string, kmh: s.kmh, label: txt(SPEED_LABEL[s.key], locale) })),
    ...(custom && Number.isFinite(customKmh) && customKmh > 0
      ? [{ key: 'custom', kmh: customKmh, label: txt(T('Your speed', '您輸入的速度', 'Tu velocidad'), locale) + ` (${fmtN(customKmh, locale, 0)} km/h)` }]
      : []),
  ];
  const voyagerAge = elapsedYearsDays(Date.parse(target === 'voyager1' ? '1977-09-05T12:00:00Z' : '1977-08-20T12:00:00Z'), Date.now()).years;
  const proximaYears = (PROXIMA_LY * LIGHT_YEAR_KM) / e.speedSunKmS / (86_400 * 365.25);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={txt(T('Destination', '目的地', 'Destino'), locale)} htmlFor="tt-target">
          <select id="tt-target" className={inputCls} value={target} onChange={(ev) => setTarget(ev.target.value as 'voyager1' | 'voyager2')}>
            <option value="voyager1">{txt(T('Voyager 1’s current position', '航海家一號目前位置', 'Posición actual de la Voyager 1'), locale)}</option>
            <option value="voyager2">{txt(T('Voyager 2’s current position', '航海家二號目前位置', 'Posición actual de la Voyager 2'), locale)}</option>
          </select>
        </Field>
        <Field label={txt(T('Add your own speed (km/h)', '加入自訂速度（公里/小時）', 'Añade tu velocidad (km/h)'), locale)} htmlFor="tt-custom">
          <input id="tt-custom" className={inputCls} inputMode="decimal" placeholder="e.g. 1500" value={custom} onChange={(ev) => setCustom(ev.target.value)} />
        </Field>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        {txt(T('Distance used', '使用的距離', 'Distancia usada'), locale)}: {fmtN(e.earthKm / 1e9, locale, 2)}{' '}
        {txt(T('billion km (from Earth, today’s estimate)', '十億公里（距地球，今日估計值）', 'mil millones de km (desde la Tierra, estimación de hoy)'), locale)}
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm" aria-live="polite">
          <caption className="sr-only">{txt(T('Hypothetical travel times', '假設性旅行時間', 'Tiempos de viaje hipotéticos'), locale)}</caption>
          <thead>
            <tr className="font-mono text-xs uppercase tracking-wider text-slate-400">
              <th scope="col" className="py-2 pr-4">{txt(T('Constant speed', '固定速度', 'Velocidad constante'), locale)}</th>
              <th scope="col" className="py-2 text-right">{txt(T('Years needed (hypothetical)', '所需年數（假設）', 'Años necesarios (hipotético)'), locale)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {speeds.map((s) => (
              <tr key={s.key}>
                <th scope="row" className="py-2 pr-4 font-normal text-slate-300">{s.label}</th>
                <td className="py-2 text-right font-mono text-slate-100">{formatBig(travelYears(e.earthKm, s.kmh), locale, 1)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="py-2 pr-4 font-normal text-slate-300">
                {txt(T('The probe itself (actual, with gravity assists)', '探測器本身（實際，含重力助推）', 'La propia sonda (real, con asistencias)'), locale)}
              </th>
              <td className="py-2 text-right font-mono text-emerald-300">{voyagerAge}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 rounded-lg border border-slate-700/60 bg-space-900/60 p-3 text-sm text-slate-300">
        {txt(
          T(
            `At its current speed, it would take ${target === 'voyager1' ? 'Voyager 1' : 'Voyager 2'} about ${formatBig(proximaYears, 'en-US', 0)} years to cover the ${PROXIMA_LY} light-years to Proxima Centauri, the nearest star — though it is not heading that way.`,
            `以目前速度，${target === 'voyager1' ? '航海家一號' : '航海家二號'}需要約 ${formatBig(proximaYears, 'zh-TW', 0)} 年，才能跨越到最近恆星比鄰星的 ${PROXIMA_LY} 光年——不過它並非朝那個方向前進。`,
            `A su velocidad actual, la ${target === 'voyager1' ? 'Voyager 1' : 'Voyager 2'} tardaría unos ${formatBig(proximaYears, 'es', 0)} años en recorrer los ${PROXIMA_LY} años luz hasta Próxima Centauri, la estrella más cercana, aunque no se dirige hacia allí.`,
          ),
          locale,
        )}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function ToolsPage() {
  const locale = useLang();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="tools"
        title={bi('Voyager calculators', '航海家計算工具', 'Calculadoras Voyager')}
        intro={bi(
          'Numbers like “25 billion kilometres” are hard to picture. These four calculators use the same model as the tracker to turn Voyager’s distance into things you can reason about: signal delay, familiar units, your own dates and everyday speeds.',
          '「250 億公里」這樣的數字很難想像。這四個計算工具使用與追蹤器相同的模型，把航海家的距離轉換成您能理解的形式：訊號延遲、熟悉的單位、您自己的日期，以及日常生活中的速度。',
          'Cifras como «25 000 millones de km» son difíciles de imaginar. Estas cuatro calculadoras usan el mismo modelo que el rastreador para convertir la distancia de Voyager en algo razonable: retardo de señal, unidades conocidas, tus propias fechas y velocidades cotidianas.',
        )}
      />

      <nav aria-label={txt(T('Calculators on this page', '本頁的計算工具', 'Calculadoras de esta página'), locale)} className="mb-10 flex flex-wrap gap-2">
        {[
          ['light-time', T('Light-time calculator', '光行時間計算器', 'Tiempo de luz')],
          ['converter', T('Distance converter', '距離單位換算', 'Conversor de distancia')],
          ['on-this-date', T('Where was Voyager on…?', '某一天航海家在哪裡？', '¿Dónde estaba Voyager el…?')],
          ['travel-time', T('Hypothetical travel time', '假設性旅行時間', 'Tiempo de viaje hipotético')],
        ].map(([id, label]) => (
          <a key={id as string} href={`#${id}`} className={chipCls + ' inline-flex items-center'}>
            {txt(label as Tri, locale)}
          </a>
        ))}
      </nav>

      <Tool
        id="light-time"
        title={T('Light-time calculator', '光行時間計算器', 'Calculadora de tiempo de luz')}
        what={T(
          'How long does a radio signal take to cover a given distance? Light-time is the approximate time electromagnetic signals, travelling at the speed of light, need to cross that distance. It is why the Voyager team cannot “steer” the probes in real time.',
          '無線電訊號跨越某段距離需要多久？光行時間是以光速前進的電磁訊號跨越該距離所需的近似時間。這正是航海家團隊無法即時「操控」探測器的原因。',
          '¿Cuánto tarda una señal de radio en cubrir cierta distancia? El tiempo de luz es el tiempo aproximado que necesitan las señales electromagnéticas, a la velocidad de la luz, para recorrerla. Por eso el equipo Voyager no puede «pilotar» las sondas en tiempo real.',
        )}
        method={T(
          'time = distance ÷ 299,792.458 km/s (the speed of light in a vacuum). Round trip = 2 × that.',
          '時間 = 距離 ÷ 299,792.458 公里/秒（真空中的光速）。往返時間 = 2 × 上述時間。',
          'tiempo = distancia ÷ 299 792,458 km/s (velocidad de la luz en el vacío). Ida y vuelta = 2 × eso.',
        )}
        example={T(
          '1 AU (Earth–Sun) ÷ c ≈ 499 s ≈ 8 min 19 s. At about 173 AU, Voyager 1’s signal takes roughly a full day.',
          '1 AU（日地距離）÷ 光速 ≈ 499 秒 ≈ 8 分 19 秒。在約 173 AU 處，航海家一號的訊號約需整整一天。',
          '1 UA (Tierra–Sol) ÷ c ≈ 499 s ≈ 8 min 19 s. A unas 173 UA, la señal de la Voyager 1 tarda casi un día entero.',
        )}
        limits={T(
          'Ignores the small extra delay from Earth’s atmosphere and the interplanetary plasma, and the fact that Earth moves while a signal is in flight. Mission planners use precise ephemerides for that.',
          '忽略地球大氣與行星際電漿造成的微小額外延遲，也忽略訊號傳遞期間地球本身的移動。任務規劃人員會使用精密星曆處理這些因素。',
          'Ignora el pequeño retardo adicional de la atmósfera y del plasma interplanetario, y que la Tierra se mueve mientras viaja la señal. Los planificadores usan efemérides precisas para ello.',
        )}
      >
        <LightTime />
      </Tool>

      <Tool
        id="converter"
        title={T('Distance converter', '距離單位換算', 'Conversor de distancia')}
        what={T(
          'Convert any distance between kilometres, miles, astronomical units and light-travel units. It starts with Voyager 1’s current distance from Earth so you can see the same number expressed eight ways.',
          '在公里、英里、天文單位與光行單位之間換算任意距離。預設值是航海家一號目前與地球的距離，讓您看到同一個數字的八種表示方式。',
          'Convierte cualquier distancia entre kilómetros, millas, unidades astronómicas y unidades de luz. Empieza con la distancia actual de la Voyager 1 a la Tierra, para ver la misma cifra de ocho maneras.',
        )}
        method={T(
          'Everything is converted through kilometres: 1 AU = 149,597,870.7 km (IAU 2012), 1 mile = 1.609344 km, 1 light-second = 299,792.458 km, 1 light-year = 9.4607 × 10¹² km (Julian year).',
          '所有換算都先轉成公里：1 AU = 149,597,870.7 公里（IAU 2012），1 英里 = 1.609344 公里，1 光秒 = 299,792.458 公里，1 光年 = 9.4607 × 10¹² 公里（儒略年）。',
          'Todo se convierte pasando por kilómetros: 1 UA = 149 597 870,7 km (UAI 2012), 1 milla = 1,609344 km, 1 segundo-luz = 299 792,458 km, 1 año luz = 9,4607 × 10¹² km (año juliano).',
        )}
        example={T(
          'About 25.9 billion km ≈ 173 AU ≈ 24 light-hours ≈ 0.0027 light-years — Voyager 1 has covered less than a tenth of a percent of the way to the nearest star.',
          '約 259 億公里 ≈ 173 AU ≈ 24 光時 ≈ 0.0027 光年——航海家一號走過的距離，還不到前往最近恆星路程的千分之一。',
          'Unos 25 900 millones de km ≈ 173 UA ≈ 24 horas-luz ≈ 0,0027 años luz: la Voyager 1 ha recorrido menos de una milésima del camino a la estrella más cercana.',
        )}
        limits={T(
          'Pure unit conversion: the result is only as accurate as the number you enter. Very large values are shown in compact notation.',
          '純粹的單位換算：結果的準確度取決於您輸入的數字。非常大的數值會以簡寫格式顯示。',
          'Solo convierte unidades: el resultado es tan preciso como el valor introducido. Los valores muy grandes se muestran en notación compacta.',
        )}
      >
        <Converter />
      </Tool>

      <Tool
        id="on-this-date"
        title={T('Where was Voyager on…?', '某一天，航海家在哪裡？', '¿Dónde estaba Voyager el…?')}
        what={T(
          'Pick any date from August 1977 to 2034 — a birthday, an anniversary, a historic day — and see how far each probe was from the Sun and how old the mission was.',
          '選擇 1977 年 8 月到 2034 年之間的任何日期——生日、紀念日或歷史性的一天——看看當天兩艘探測器離太陽多遠，以及任務已進行多久。',
          'Elige cualquier fecha entre agosto de 1977 y 2034 —un cumpleaños, un aniversario, un día histórico— y mira a qué distancia del Sol estaba cada sonda y cuánto llevaba la misión.',
        )}
        method={T(
          'Interpolates between monthly heliocentric distances from JPL Horizons bundled with this site. Dates after today use JPL’s predicted trajectory.',
          '在本站內建的 JPL Horizons 月度日心距離資料之間進行內插。今天之後的日期使用 JPL 預測的軌道。',
          'Interpola entre las distancias heliocéntricas mensuales de JPL Horizons incluidas en el sitio. Las fechas posteriores a hoy usan la trayectoria prevista por JPL.',
        )}
        example={T(
          'On 14 February 1990, when it took the Pale Blue Dot image, Voyager 1 was about 40 AU — some 6 billion km — from the Sun.',
          '1990 年 2 月 14 日拍攝「蒼藍小點」時，航海家一號距太陽約 40 AU——約 60 億公里。',
          'El 14 de febrero de 1990, al tomar el pálido punto azul, la Voyager 1 estaba a unas 40 UA —unos 6000 millones de km— del Sol.',
        )}
        limits={T(
          'Monthly sampling smooths out the fastest changes during planetary flybys, where distance can differ from the interpolated value by a small fraction of an AU. Shows distance from the Sun, not from Earth.',
          '月度取樣會抹平行星飛掠期間最快速的變化，那時實際距離可能與內插值相差零點幾個 AU。本工具顯示的是與太陽的距離，而非與地球的距離。',
          'El muestreo mensual suaviza los cambios más rápidos durante los sobrevuelos, donde la distancia puede diferir del valor interpolado en una pequeña fracción de UA. Muestra la distancia al Sol, no a la Tierra.',
        )}
      >
        <OnThisDate />
      </Tool>

      <Tool
        id="travel-time"
        title={T('Hypothetical travel time', '假設性旅行時間', 'Tiempo de viaje hipotético')}
        what={T(
          'How long would it take to reach where Voyager is today at everyday speeds? This is a hypothetical calculation for scale — not a prediction of any real journey.',
          '若以日常生活中的速度前往航海家今天所在的位置，需要多久？這是用來感受尺度的假設性計算——並非任何真實旅程的預測。',
          '¿Cuánto se tardaría en llegar a donde está hoy Voyager a velocidades cotidianas? Es un cálculo hipotético para dar escala, no la predicción de ningún viaje real.',
        )}
        method={T(
          'years = distance ÷ speed ÷ 8,766 hours per year, at a constant speed in a straight line, using today’s estimated distance from Earth.',
          '年數 = 距離 ÷ 速度 ÷ 每年 8,766 小時；假設以固定速度直線前進，距離採用今日與地球的估計距離。',
          'años = distancia ÷ velocidad ÷ 8766 horas por año, a velocidad constante y en línea recta, con la distancia estimada de hoy desde la Tierra.',
        )}
        example={T(
          'At airliner speed (900 km/h), crossing 25 billion km would take over 3,000 years; Voyager 1 did it in under 50 thanks to its launch and gravity assists.',
          '以客機速度（900 公里/小時）跨越 250 億公里需要超過 3,000 年；航海家一號靠著發射與重力助推，不到 50 年就做到了。',
          'A velocidad de avión (900 km/h), recorrer 25 000 millones de km llevaría más de 3000 años; la Voyager 1 lo hizo en menos de 50 gracias al lanzamiento y las asistencias gravitatorias.',
        )}
        limits={T(
          'Real spacecraft do not travel in straight lines at constant speed; they follow curved orbits and use gravity. The target also keeps moving away. Use these numbers only to compare scales.',
          '真實的太空船不會以固定速度直線飛行，而是沿彎曲軌道前進並利用重力。目標本身也持續遠離。這些數字僅適合用來比較尺度。',
          'Las naves reales no viajan en línea recta ni a velocidad constante: siguen órbitas curvas y usan la gravedad. Además, el destino sigue alejándose. Usa estas cifras solo para comparar escalas.',
        )}
      >
        <TravelTime />
      </Tool>

      <p className="text-sm text-slate-400">
        {txt(T('All live distances on this page come from the same model as the tracker; see', '本頁所有即時距離都來自與追蹤器相同的模型；請見', 'Todas las distancias de esta página salen del mismo modelo que el rastreador; ver'), locale)}{' '}
        <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2">
          {txt(T('How It Works', '運作原理', 'Cómo funciona'), locale)}
        </a>
        .
      </p>

      <RelatedLinks items={['compare', 'how-it-works', 'voyager-1', 'faq']} />
    </div>
  );
}
