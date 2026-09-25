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
import { AU_KM, C_KM_S, estimate } from '../lib/ephemeris';
import { chipCls, durationText, Field, fmtN, inputCls, parseNonNegative, Result } from '../components/tools/toolUi';
import { CompareDates, DateExplorer } from '../components/tools/DateTools';
import ScaleExplorer from '../components/tools/ScaleExplorer';
import CommDelay from '../components/tools/CommDelay';
import SourceBadge from '../components/SourceBadge';
import {
  LIGHT_YEAR_KM,
  PROXIMA_LY,
  REFERENCE_SPEEDS,
  UNITS,
  convert,
  elapsedYearsDays,
  formatBig,
  travelYears,
  type UnitKey,
} from '../lib/context';

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

/* ------------------------------------------------------------------ */
/* 1. Light-time calculator                                             */
/* ------------------------------------------------------------------ */

function LightTime() {
  const locale = useLang();
  const [value, setValue] = useState('1');
  const [unit, setUnit] = useState<UnitKey>('au');
  const parsed = parseNonNegative(value);
  const valid = parsed !== null;
  const km = valid ? parsed * UNITS[unit] : NaN;
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
      {!valid && value.trim() !== '' && (
        <p className="mt-3 text-sm text-amber-200" role="alert">{txt(T('Enter a distance of zero or more.', '請輸入大於或等於零的距離。', 'Introduce una distancia de cero o más.'), locale)}</p>
      )}
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

/* ------------------------------------------------------------------ */
/* 2. Distance converter                                                */
/* ------------------------------------------------------------------ */

function Converter() {
  const locale = useLang();
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState<UnitKey>('km');
  const initial = useMemo(() => String(Math.round(estimate('voyager1', Date.now()).earthKm)), []);
  const v = (value === '' ? Number(initial) : parseNonNegative(value)) ?? NaN;
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
      <p className="mt-3"><SourceBadge kind="hypothetical" note={txt(T('constant speed, straight line', '固定速度、直線前進', 'velocidad constante, línea recta'), locale)} /></p>
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
          'Numbers like “25 billion kilometres” are hard to picture. These seven tools use the same model as the tracker to turn Voyager’s distance into things you can reason about: signal delay, a message you can send, familiar units, your own dates, a scale ruler and everyday speeds.',
          '「250 億公里」這樣的數字很難想像。這七個工具使用與追蹤器相同的模型，把航海家的距離轉換成您能理解的形式：訊號延遲、一則可以實際送出的訊息、熟悉的單位、您自己的日期、尺度尺規，以及日常生活中的速度。',
          'Cifras como «25 000 millones de km» son difíciles de imaginar. Estas siete herramientas usan el mismo modelo que el rastreador para convertir la distancia de Voyager en algo razonable: retardo de señal, un mensaje que puedes enviar, unidades conocidas, tus propias fechas, una regla de escala y velocidades cotidianas.',
        )}
      />

      <nav aria-label={txt(T('Calculators on this page', '本頁的計算工具', 'Calculadoras de esta página'), locale)} className="mb-10 flex flex-wrap gap-2">
        {[
          ['light-time', T('Light-time calculator', '光行時間計算器', 'Tiempo de luz')],
          ['converter', T('Distance converter', '距離單位換算', 'Conversor de distancia')],
          ['communication', T('Communication delay', '通訊延遲模擬', 'Retardo de comunicación')],
          ['on-this-date', T('Date Explorer', '日期探索器', 'Explorador de fechas')],
          ['compare-dates', T('Compare two dates', '比較兩個日期', 'Comparar dos fechas')],
          ['scale', T('Scale explorer', '尺度探索', 'Explorador de escala')],
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
        id="communication"
        title={T('Communication delay: send a message to Voyager', '通訊延遲：送一則訊息給航海家', 'Retardo de comunicación: envía un mensaje a Voyager')}
        what={T(
          'What would it be like to talk to a spacecraft more than 20 billion km away? Send a message now and watch it travel: it will not arrive for most of a day, and an answer would take just as long to come back. Real-time conversation is impossible.',
          '與 200 多億公里外的太空船通話會是什麼感覺？現在就送出一則訊息，看著它前進：它將近一天後才會抵達，而回覆也要同樣久才能回來。即時對話根本不可能。',
          '¿Cómo sería hablar con una nave a más de 20 000 millones de km? Envía un mensaje ahora y míralo viajar: tardará casi un día en llegar y la respuesta, lo mismo en volver. Una conversación en tiempo real es imposible.',
        )}
        method={T(
          'The one-way delay is the calculated Earth distance at the moment you press the button divided by the speed of light; the earliest reply time adds the same delay again.',
          '單程延遲 = 按下按鈕那一刻計算出的地球距離 ÷ 光速；最早的回覆時間再加上相同的延遲。',
          'El retardo de ida es la distancia calculada a la Tierra en el momento de pulsar, dividida por la velocidad de la luz; la respuesta más temprana suma el mismo retardo otra vez.',
        )}
        example={T(
          'That is why the Voyager team plans commands days in advance and checks the result two days later: every action is a letter, not a phone call.',
          '這就是為什麼航海家團隊要提前數天規劃指令，並在兩天後才確認結果：每一個動作都像寄一封信，而不是打一通電話。',
          'Por eso el equipo Voyager planifica las órdenes con días de antelación y comprueba el resultado dos días después: cada acción es una carta, no una llamada.',
        )}
        limits={T(
          'The reply time is a physical minimum. Real operations also depend on Deep Space Network antenna schedules and on the spacecraft’s own timing, and the Earth distance changes slightly while a signal is travelling.',
          '回覆時間是物理上的最小值。實際運作還取決於深空網路天線的排程與太空船本身的時序，而且訊號傳送期間，地球距離也會略有變化。',
          'El tiempo de respuesta es un mínimo físico. Las operaciones reales dependen además del calendario de antenas de la Red de Espacio Profundo y del propio calendario de la nave, y la distancia a la Tierra cambia un poco mientras viaja la señal.',
        )}
      >
        <CommDelay />
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
        title={T('Voyager Date Explorer', '航海家日期探索器', 'Explorador de fechas Voyager')}
        what={T(
          'Pick any date from August 1977 to 2034 — a birthday, an anniversary, a historic day — and see where both probes were: distance from Earth and from the Sun, signal delay, speed, mission age, and what the mission was doing around then.',
          '選擇 1977 年 8 月到 2034 年之間的任何日期——生日、紀念日或歷史性的一天——看看兩艘探測器當時在哪裡：與地球及太陽的距離、訊號延遲、速度、任務已執行多久，以及那段時間任務在做什麼。',
          'Elige cualquier fecha entre agosto de 1977 y 2034 —un cumpleaños, un aniversario, un día histórico— y mira dónde estaban ambas sondas: distancia a la Tierra y al Sol, retardo de señal, velocidad, edad de la misión y qué hacía la misión por entonces.',
        )}
        method={T(
          'For 2024–2031 the live model is used. For other dates the spacecraft’s position is interpolated between monthly JPL Horizons vectors and Earth is placed with the same orbit formula, so the distance from Earth includes Earth’s position on that day. Events come only from this site’s sourced timeline (within ±4 months).',
          '2024–2031 年使用即時模型。其他日期則在 JPL Horizons 的月度位置向量之間內插探測器位置，並以相同的軌道公式放置地球，因此地球距離包含了地球當天的位置。事件只取自本站有出處的時間軸（前後 4 個月內）。',
          'Para 2024–2031 se usa el modelo en vivo. Para otras fechas la posición de la nave se interpola entre vectores mensuales de JPL Horizons y la Tierra se sitúa con la misma fórmula orbital, así que la distancia a la Tierra incluye su posición ese día. Los eventos salen solo de la cronología con fuentes del sitio (±4 meses).',
        )}
        example={T(
          'On 14 February 1990, when it took the Pale Blue Dot image, Voyager 1 was about 40 AU — some 6 billion km — from the Sun, and its signals took about 5.5 hours to reach Earth.',
          '1990 年 2 月 14 日拍攝「蒼藍小點」時，航海家一號距太陽約 40 AU——約 60 億公里——訊號約需 5.5 小時才能傳回地球。',
          'El 14 de febrero de 1990, al tomar el pálido punto azul, la Voyager 1 estaba a unas 40 UA —unos 6000 millones de km— del Sol, y sus señales tardaban unas 5,5 horas en llegar a la Tierra.',
        )}
        limits={T(
          'Checked against JPL’s own distances every 10 days: after 1990 the difference stays under about 35,000 km, but during the 1977–1989 planetary flybys monthly interpolation can be off by a few million km. Dates after today are JPL predictions.',
          '以 JPL 每 10 天一筆的距離比對：1990 年後誤差都在約 3.5 萬公里以內，但在 1977–1989 年行星飛掠期間，月度內插可能相差數百萬公里。今天之後的日期屬於 JPL 的預測。',
          'Comparado con las distancias de JPL cada 10 días: desde 1990 la diferencia se mantiene por debajo de unos 35 000 km, pero durante los sobrevuelos de 1977–1989 la interpolación mensual puede desviarse unos millones de km. Las fechas posteriores a hoy son predicciones de JPL.',
        )}
      >
        <DateExplorer />
      </Tool>

      <Tool
        id="compare-dates"
        title={T('Compare two dates', '比較兩個日期', 'Comparar dos fechas')}
        what={T(
          'How much did the Voyagers move between two dates — say, between Voyager 1’s interstellar crossing and today? Pick any two dates to see how each distance and the signal delay changed.',
          '兩個日期之間，航海家號移動了多少？例如從航海家一號進入星際空間到今天。選擇任意兩個日期，看看各項距離與訊號延遲如何變化。',
          '¿Cuánto se movieron las Voyager entre dos fechas, por ejemplo entre el cruce interestelar de la Voyager 1 y hoy? Elige dos fechas para ver cómo cambiaron las distancias y el retardo de señal.',
        )}
        method={T(
          'Each date is calculated as in the Date Explorer; the table shows B minus A. The average rate is the change in Sun distance divided by the time between the dates.',
          '每個日期的計算方式與日期探索器相同；表格顯示 B 減去 A 的結果。平均變化率為太陽距離的變化量除以兩日期相隔的時間。',
          'Cada fecha se calcula como en el explorador de fechas; la tabla muestra B menos A. El ritmo medio es el cambio de la distancia al Sol dividido por el tiempo entre fechas.',
        )}
        example={T(
          'From 25 August 2012 to late 2026, Voyager 1’s distance from the Sun grew by roughly 50 AU, an average of about 17 km/s.',
          '從 2012 年 8 月 25 日到 2026 年底，航海家一號與太陽的距離增加了約 50 AU，平均約每秒 17 公里。',
          'Del 25 de agosto de 2012 a finales de 2026, la distancia de la Voyager 1 al Sol creció unas 50 UA, a una media de unos 17 km/s.',
        )}
        limits={T(
          'The difference between two distances is not the length of the path flown. The Earth distance also contains Earth’s yearly swing, so compare Sun distances when you want the probe’s own progress.',
          '兩個距離之差並不等於飛行路徑的長度。地球距離也包含地球一年一度的起伏，若想看探測器本身的前進量，請比較太陽距離。',
          'La diferencia entre dos distancias no es la longitud del camino recorrido. La distancia a la Tierra incluye además la oscilación anual terrestre; compara las distancias al Sol para ver el avance propio de la sonda.',
        )}
      >
        <CompareDates />
      </Tool>

      <Tool
        id="scale"
        title={T('Scale explorer: how far is that?', '尺度探索：那到底有多遠？', 'Explorador de escala: ¿cuánto es eso?')}
        what={T(
          'Put Voyager’s distance on one ruler with things you know — a trip around Earth, the Moon, the Sun, Neptune — and with the light-day and light-year used for the stars.',
          '把航海家的距離放在同一把尺上，與您熟悉的東西並列——繞地球一圈、月球、太陽、海王星——也與描述恆星距離時使用的光日、光年並列。',
          'Coloca la distancia de Voyager en una sola regla junto a cosas conocidas —una vuelta a la Tierra, la Luna, el Sol, Neptuno— y junto al día-luz y el año luz que se usan para las estrellas.',
        )}
        method={T(
          'A logarithmic scale: equal steps mean multiplying by the same factor (here ×1,000 per tick). Voyager values are the current calculated distances from Earth; the others are standard reference values.',
          '對數尺度：每一個等距刻度代表乘上相同倍數（此處每格 ×1,000）。航海家的數值是目前計算出的地球距離；其他則是標準參考值。',
          'Escala logarítmica: pasos iguales significan multiplicar por el mismo factor (aquí ×1000 por marca). Los valores de Voyager son las distancias actuales calculadas desde la Tierra; los demás son valores de referencia estándar.',
        )}
        example={T(
          'Voyager 1 is roughly 67,000 times farther away than the Moon, yet still only about 0.3% of a light-year.',
          '航海家一號的距離約是月球的 67,000 倍，卻仍只有約 0.3% 光年。',
          'La Voyager 1 está unas 67 000 veces más lejos que la Luna y, aun así, solo a un 0,3 % de un año luz.',
        )}
        limits={T(
          'Reference values are rounded averages (the Moon’s distance varies by about 10%, Neptune’s by a few percent). A log scale is ideal for comparison but makes large gaps look small.',
          '參考值為四捨五入的平均值（月球距離約有 10% 的變化，海王星則有幾個百分點）。對數尺度很適合比較，但會讓巨大的差距看起來很小。',
          'Los valores de referencia son medias redondeadas (la distancia a la Luna varía un 10 %, la de Neptuno unos pocos por ciento). La escala logarítmica es ideal para comparar, pero hace que grandes distancias parezcan pequeñas.',
        )}
      >
        <ScaleExplorer />
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
