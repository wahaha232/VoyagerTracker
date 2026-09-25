/**
 * ComparePage — /compare.html  (EN / 繁中 / Español)
 *
 * Voyager 1 vs Voyager 2: a live side-by-side table (including values
 * only this site derives, such as the distance between the two probes),
 * the JPL history chart, the fixed mission facts, and an explanation of
 * why two identical spacecraft ended up on such different paths.
 */

import { useMemo } from 'react';
import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import ClientOnly from '../components/ClientOnly';
import HistoryChart from '../components/HistoryChart';
import RouteExplorer from '../components/RouteExplorer';
import { BiArticleHeader, BiSection, bi, txt, useLang } from '../components/content';
import { AU_KM, estimate, spacecraftState } from '../lib/ephemeris';
import { elapsedYearsDays } from '../lib/context';
import { INSTRUMENT_STATUS, INSTRUMENT_STATUS_AS_OF } from '../constants/voyagerData';
import { formatNumber, useNow } from '../hooks/useVoyagerLive';
import type { Locale } from '../types/voyager';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

/** Angle between the two probes' directions as seen from the Sun, and their separation. */
function geometry(ms: number) {
  const a = spacecraftState('voyager1', ms).r;
  const b = spacecraftState('voyager2', ms).r;
  const ra = Math.hypot(...a);
  const rb = Math.hypot(...b);
  const cos = (a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (ra * rb);
  return {
    angleDeg: (Math.acos(cos) * 180) / Math.PI,
    separationKm: Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]),
    latDeg: { voyager1: (Math.asin(a[2] / ra) * 180) / Math.PI, voyager2: (Math.asin(b[2] / rb) * 180) / Math.PI },
  };
}

function LiveComparison() {
  const locale = useLang();
  const now = useNow(200);
  const e1 = estimate('voyager1', now);
  const e2 = estimate('voyager2', now);
  const g = useMemo(() => geometry(Math.floor(now / 60_000) * 60_000), [Math.floor(now / 60_000)]);
  const el1 = elapsedYearsDays(Date.parse('1977-09-05T12:00:00Z'), now);
  const el2 = elapsedYearsDays(Date.parse('1977-08-20T12:00:00Z'), now);
  const f = (v: number, d: number) => formatNumber(v, locale, d);
  const hrs = (s: number) => `${f(s / 3600, 2)} ${txt(T('h', '小時', 'h'), locale)}`;

  const rows: { label: Tri; v1: string; v2: string; note?: Tri }[] = [
    { label: T('Distance from Earth', '與地球的距離', 'Distancia a la Tierra'), v1: `${f(e1.earthKm / AU_KM, 3)} AU`, v2: `${f(e2.earthKm / AU_KM, 3)} AU` },
    { label: T('Distance from the Sun', '與太陽的距離', 'Distancia al Sol'), v1: `${f(e1.sunKm / AU_KM, 3)} AU`, v2: `${f(e2.sunKm / AU_KM, 3)} AU` },
    { label: T('Speed relative to the Sun', '相對太陽的速度', 'Velocidad respecto al Sol'), v1: `${f(e1.speedSunKmS, 2)} km/s`, v2: `${f(e2.speedSunKmS, 2)} km/s` },
    { label: T('One-way signal time', '單程訊號時間', 'Tiempo de señal (ida)'), v1: hrs(e1.lightTimeS), v2: hrs(e2.lightTimeS) },
    {
      label: T('Mission elapsed', '任務已執行', 'Tiempo de misión'),
      v1: `${el1.years} ${txt(T('y', '年', 'a'), locale)} ${el1.days} ${txt(T('d', '天', 'd'), locale)}`,
      v2: `${el2.years} ${txt(T('y', '年', 'a'), locale)} ${el2.days} ${txt(T('d', '天', 'd'), locale)}`,
    },
    {
      label: T('Position relative to the planets’ plane', '相對行星軌道面的位置', 'Posición respecto al plano planetario'),
      v1: `${f(g.latDeg.voyager1, 1)}° ${txt(T('(north)', '（北）', '(norte)'), locale)}`,
      v2: `${f(Math.abs(g.latDeg.voyager2), 1)}° ${txt(T('(south)', '（南）', '(sur)'), locale)}`,
    },
    {
      label: T('Science instruments still on', '仍在運作的科學儀器', 'Instrumentos aún encendidos'),
      v1: INSTRUMENT_STATUS.voyager1.filter((s) => s.on).map((s) => s.code).join(', '),
      v2: INSTRUMENT_STATUS.voyager2.filter((s) => s.on).map((s) => s.code).join(', '),
      note: T(`NASA status as of ${INSTRUMENT_STATUS_AS_OF}`, `NASA 公布狀態，截至 ${INSTRUMENT_STATUS_AS_OF}`, `Estado NASA a ${INSTRUMENT_STATUS_AS_OF}`),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">{txt(T('Voyager 1 and Voyager 2 compared, calculated now', '航海家一號與二號此刻的計算比較', 'Voyager 1 y 2 comparadas, calculado ahora'), locale)}</caption>
          <thead>
            <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
              <th scope="col" className="px-4 py-3">{txt(T('Estimate (now)', '估計值（此刻）', 'Estimación (ahora)'), locale)}</th>
              <th scope="col" className="px-4 py-3 text-cyan-300">Voyager 1</th>
              <th scope="col" className="px-4 py-3 text-emerald-300">Voyager 2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {rows.map((r) => (
              <tr key={r.label.en}>
                <th scope="row" className="px-4 py-3 font-sans font-medium text-slate-200">
                  {txt(r.label, locale)}
                  {r.note && <span className="block text-[11px] font-normal text-slate-400">{txt(r.note, locale)}</span>}
                </th>
                <td className="px-4 py-3 text-slate-100">{r.v1}</td>
                <td className="px-4 py-3 text-slate-100">{r.v2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Stat
          locale={locale}
          value={`${f((e1.sunKm - e2.sunKm) / AU_KM, 2)} AU`}
          label={T('How much farther from the Sun Voyager 1 is', '航海家一號比二號離太陽遠多少', 'Cuánto más lejos del Sol está la Voyager 1')}
        />
        <Stat
          locale={locale}
          value={`${f(g.separationKm / AU_KM, 1)} AU`}
          label={T('Distance between the two probes', '兩艘探測器之間的距離', 'Distancia entre las dos sondas')}
        />
        <Stat
          locale={locale}
          value={`${f(g.angleDeg, 1)}°`}
          label={T('Angle between their directions, seen from the Sun', '從太陽看去，兩者方向之間的夾角', 'Ángulo entre sus direcciones, visto desde el Sol')}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        {txt(
          T(
            'Calculated in your browser from JPL Horizons reference data. The separation and angle are this site’s own derived values; they are not published figures.',
            '依 JPL Horizons 參考資料在您的瀏覽器中計算。兩者間距與夾角是本站自行推導的數值，並非官方公布數字。',
            'Calculado en tu navegador con datos de referencia de JPL Horizons. La separación y el ángulo son valores derivados por este sitio, no cifras publicadas.',
          ),
          locale,
        )}
      </p>
    </>
  );
}

function Stat({ value, label, locale }: { value: string; label: Tri; locale: Locale }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-space-900/50 p-4">
      <p className="font-mono text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-300">{txt(label, locale)}</p>
    </div>
  );
}

const FACTS: { label: Tri; v1: Tri; v2: Tri }[] = [
  { label: T('Launch', '發射', 'Lanzamiento'), v1: T('5 Sep 1977 (second)', '1977/9/5（第二艘）', '5 sep 1977 (segunda)'), v2: T('20 Aug 1977 (first)', '1977/8/20（第一艘）', '20 ago 1977 (primera)') },
  { label: T('Planets visited', '造訪的行星', 'Planetas visitados'), v1: T('Jupiter, Saturn', '木星、土星', 'Júpiter, Saturno'), v2: T('Jupiter, Saturn, Uranus, Neptune', '木星、土星、天王星、海王星', 'Júpiter, Saturno, Urano, Neptuno') },
  { label: T('Jupiter closest approach', '木星最接近日', 'Máximo acercamiento a Júpiter'), v1: T('5 Mar 1979', '1979/3/5', '5 mar 1979'), v2: T('9 Jul 1979', '1979/7/9', '9 jul 1979') },
  { label: T('Saturn closest approach', '土星最接近日', 'Máximo acercamiento a Saturno'), v1: T('12 Nov 1980', '1980/11/12', '12 nov 1980'), v2: T('25 Aug 1981', '1981/8/25', '25 ago 1981') },
  { label: T('Uranus / Neptune', '天王星／海王星', 'Urano / Neptuno'), v1: T('—', '—', '—'), v2: T('24 Jan 1986 / 25 Aug 1989', '1986/1/24 ／ 1989/8/25', '24 ene 1986 / 25 ago 1989') },
  { label: T('Crossed the heliopause', '穿越日球層頂', 'Cruce de la heliopausa'), v1: T('25 Aug 2012, ~121.6 AU', '2012/8/25，約 121.6 AU', '25 ago 2012, ~121,6 UA'), v2: T('5 Nov 2018, ~119.0 AU', '2018/11/5，約 119.0 AU', '5 nov 2018, ~119,0 UA') },
  { label: T('Plasma instrument at the heliopause', '穿越時的電漿儀器', 'Instrumento de plasma en la heliopausa'), v1: T('Not working (failed in 1980)', '已失效（1980 年故障）', 'Averiado (desde 1980)'), v2: T('Working — measured the crossing directly', '運作中——直接量測到穿越', 'Funcionando: midió el cruce directamente') },
  { label: T('Best-known image', '最知名的影像', 'Imagen más conocida'), v1: T('Pale Blue Dot (1990)', '蒼藍小點（1990）', 'Pálido punto azul (1990)'), v2: T('Neptune and Triton close-ups (1989)', '海王星與海衛一特寫（1989）', 'Neptuno y Tritón de cerca (1989)') },
];

const WHY: { title: Tri; body: Tri }[] = [
  {
    title: T('Why did Voyager 1 reach interstellar space first?', '為什麼航海家一號先進入星際空間？', '¿Por qué la Voyager 1 llegó antes al espacio interestelar?'),
    body: T(
      'Mostly because it was faster and had a head start: it left the planets behind in 1980, nine years before Voyager 2 finished at Neptune. The heliopause is also not a sphere — Voyager 2 crossed it about 2.6 AU closer to the Sun, in a different direction — so arrival order depends on both speed and the shape of the boundary.',
      '主要是因為它比較快，而且領先起跑：它在 1980 年就離開了行星區域，比航海家二號結束海王星飛掠早了九年。此外，日球層頂並不是正球體——航海家二號在另一個方向、離太陽近約 2.6 AU 處就穿越了——因此抵達順序同時取決於速度與邊界的形狀。',
      'Sobre todo porque era más rápida y salió con ventaja: dejó atrás los planetas en 1980, nueve años antes de que la Voyager 2 terminara en Neptuno. Además, la heliopausa no es una esfera —la Voyager 2 la cruzó unas 2,6 UA más cerca del Sol, en otra dirección—, así que el orden depende de la velocidad y de la forma del límite.',
    ),
  },
  {
    title: T('Why do their signal delays differ?', '為什麼兩者的訊號延遲不同？', '¿Por qué sus retardos de señal son distintos?'),
    body: T(
      'Signal delay is simply distance from Earth divided by the speed of light, so the farther probe has the longer delay — today roughly 24 hours for Voyager 1 and 20 for Voyager 2. Both delays also rise and fall a little over the year as Earth moves around its orbit; the table above shows the current values.',
      '訊號延遲就是「與地球的距離 ÷ 光速」，所以較遠的探測器延遲較長——目前航海家一號約 24 小時，二號約 20 小時。兩者的延遲也會隨地球公轉而在一年中略為增減；目前數值見上表。',
      'El retardo de señal es la distancia a la Tierra dividida por la velocidad de la luz, así que la sonda más lejana tiene más retardo: hoy unas 24 horas la Voyager 1 y 20 la Voyager 2. Ambos suben y bajan un poco durante el año por el movimiento orbital de la Tierra; la tabla de arriba muestra los valores actuales.',
    ),
  },
  {
    title: T('Why did the second launch end up in front?', '為什麼較晚發射的反而跑在前面？', '¿Por qué la segunda en despegar va delante?'),
    body: T(
      'The names describe arrival order, not launch order. Voyager 1 left 16 days after Voyager 2 but on a faster, more direct path to Jupiter. According to the JPL Horizons data used on this site, it was already farther from the Sun than its twin before the end of 1977, and it reached Jupiter four months earlier.',
      '名稱反映的是抵達順序，而非發射順序。航海家一號比二號晚 16 天出發，但走的是更快、更直接前往木星的路線。依本站使用的 JPL Horizons 資料，它在 1977 年底前就已比孿生探測器離太陽更遠，並早四個月抵達木星。',
      'Los nombres indican el orden de llegada, no de lanzamiento. La Voyager 1 salió 16 días después, pero por una ruta más rápida y directa a Júpiter. Según los datos de JPL Horizons usados aquí, antes de terminar 1977 ya estaba más lejos del Sol que su gemela, y llegó a Júpiter cuatro meses antes.',
    ),
  },
  {
    title: T('Why is Voyager 1 faster?', '為什麼航海家一號比較快？', '¿Por qué la Voyager 1 es más rápida?'),
    body: T(
      'Speed came from gravity assists, and each probe got different ones. Switch the chart above to “Speed”: Voyager 1 jumps from roughly 14 to 23 km/s at Jupiter; Voyager 2 from roughly 11 to 19 km/s. Voyager 2 then collected more boosts at Saturn and Uranus, but its Neptune flyby — designed to pass close to the moon Triton — bent its path south and cost it speed, leaving it slower than Voyager 1 today.',
      '速度來自重力助推，而兩艘探測器各自得到的助推不同。把上方圖表切換到「速度」：航海家一號在木星處從約 14 公里/秒躍升到 23 公里/秒；航海家二號則從約 11 升到 19 公里/秒。二號之後又在土星與天王星獲得加速，但為了近距離經過海衛一而設計的海王星飛掠，把它的路徑甩向南方並使它減速，因此如今比一號慢。',
      'La velocidad vino de las asistencias gravitatorias, distintas para cada sonda. Cambia el gráfico a «Velocidad»: la Voyager 1 pasa de unos 14 a 23 km/s en Júpiter; la Voyager 2, de unos 11 a 19 km/s. La Voyager 2 ganó más impulso en Saturno y Urano, pero su sobrevuelo de Neptuno —pensado para pasar cerca de Tritón— la desvió al sur y le restó velocidad, y hoy es más lenta que la Voyager 1.',
    ),
  },
  {
    title: T('Why are they heading in different directions?', '為什麼它們朝不同方向前進？', '¿Por qué van en direcciones distintas?'),
    body: T(
      'Each probe’s last planetary encounter set its final direction. Voyager 1’s close pass of Titan threw it north of the planets’ plane; Voyager 2’s pass over Neptune’s north pole sent it south. The table above shows the result: one is about 35° north of the plane, the other nearly 40° south, and they are now farther from each other than either is from the Sun.',
      '每艘探測器的最後一次行星飛掠，決定了它最終的方向。航海家一號近距離飛掠泰坦，被甩到行星軌道面北方；航海家二號飛越海王星北極上空，則被送往南方。上表顯示了結果：一艘位於軌道面北方約 35°，另一艘位於南方將近 40°，兩者如今彼此相距比各自與太陽的距離還遠。',
      'El último encuentro planetario de cada sonda fijó su dirección final. El paso cercano de la Voyager 1 por Titán la lanzó al norte del plano planetario; el paso de la Voyager 2 sobre el polo norte de Neptuno la envió al sur. La tabla lo muestra: una está unos 35° al norte del plano y la otra casi 40° al sur, y hoy están más lejos entre sí que cada una del Sol.',
    ),
  },
  {
    title: T('Why does it matter that there are two?', '為什麼有兩艘很重要？', '¿Por qué importa que sean dos?'),
    body: T(
      'Two probes crossing the heliopause at different places and times let scientists compare the boundary’s position and behaviour in two directions — and Voyager 2’s working plasma instrument confirmed in 2018 what Voyager 1 could only infer indirectly in 2012. Two spacecraft also gave the mission redundancy: when one had a problem, the other kept producing science.',
      '兩艘探測器在不同地點、不同時間穿越日球層頂，讓科學家能比較這個邊界在兩個方向上的位置與行為——而且航海家二號仍在運作的電漿儀器，在 2018 年直接證實了航海家一號在 2012 年只能間接推斷的現象。兩艘太空船也為任務提供了備援：一艘出問題時，另一艘仍持續產出科學成果。',
      'Dos sondas que cruzan la heliopausa en lugares y momentos distintos permiten comparar la posición y el comportamiento de ese límite en dos direcciones; además, el instrumento de plasma de la Voyager 2 confirmó en 2018 lo que la Voyager 1 solo pudo deducir indirectamente en 2012. Dos naves también dieron redundancia: si una fallaba, la otra seguía produciendo ciencia.',
    ),
  },
];

export default function ComparePage() {
  const locale = useLang();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="compare"
        title={bi('Voyager 1 vs Voyager 2', '航海家一號 vs 航海家二號', 'Voyager 1 frente a Voyager 2')}
        intro={bi(
          'The two Voyagers were built to the same design and launched two weeks apart, yet today they are roughly 200 AU from each other, travelling at different speeds in different directions. This page compares them side by side and explains how that happened.',
          '兩艘航海家號依相同設計打造，發射時間只相隔兩週，如今卻彼此相距約 200 AU，以不同速度朝不同方向前進。本頁並列比較兩者，並說明這是怎麼發生的。',
          'Las dos Voyager se construyeron con el mismo diseño y despegaron con dos semanas de diferencia; hoy están a unas 200 UA una de otra, a velocidades y en direcciones distintas. Esta página las compara y explica cómo ocurrió.',
        )}
      />

      <BiSection id="now" title={bi('Side by side, right now', '此刻的並列比較', 'Lado a lado, ahora mismo')}>
        <ClientOnly
          fallback={
            <p className="min-h-[760px] rounded-xl border border-slate-800 p-5 text-sm text-slate-400 md:min-h-[520px]">
              {txt(T('The live comparison is calculated in your browser (JavaScript required).', '即時比較會在您的瀏覽器中計算（需要 JavaScript）。', 'La comparación se calcula en tu navegador (requiere JavaScript).'), locale)}
            </p>
          }
        >
          <LiveComparison />
        </ClientOnly>
      </BiSection>

      <BiSection
        id="history"
        title={bi('Fifty years of distance and speed', '五十年的距離與速度', 'Cincuenta años de distancia y velocidad')}
        lead={bi(
          'Each line is built from monthly JPL Horizons samples. The steps in the speed view are gravity assists; the dashed part after today is JPL’s predicted trajectory.',
          '每條線都由 JPL Horizons 的月度資料構成。速度圖中的階梯是重力助推；今天之後的虛線是 JPL 預測的軌道。',
          'Cada línea se construye con muestras mensuales de JPL Horizons. Los saltos en la vista de velocidad son asistencias gravitatorias; la parte discontinua tras hoy es la trayectoria prevista por JPL.',
        )}
      >
        <HistoryChart />
      </BiSection>

      <BiSection
        id="routes"
        title={bi('Two routes, stop by stop', '兩條路線，逐站比較', 'Dos rutas, parada a parada')}
        lead={bi(
          'Choose a spacecraft and a stop to see where it was and how the flyby changed its speed. Voyager 1’s route ends at Saturn; Voyager 2 kept going to Uranus and Neptune.',
          '選擇探測器與停靠點，看看它當時在哪裡，以及飛掠如何改變它的速度。航海家一號的行星路線止於土星；航海家二號則繼續前往天王星與海王星。',
          'Elige una nave y una parada para ver dónde estaba y cómo cambió su velocidad el sobrevuelo. La ruta planetaria de la Voyager 1 termina en Saturno; la Voyager 2 siguió hasta Urano y Neptuno.',
        )}
      >
        <ClientOnly fallback={<p className="min-h-[640px] text-sm text-slate-400 md:min-h-[400px]">{txt(T('The route explorer runs in your browser (JavaScript required).', '路線探索器在您的瀏覽器中執行（需要 JavaScript）。', 'El explorador de rutas funciona en tu navegador (requiere JavaScript).'), locale)}</p>}>
          <RouteExplorer />
        </ClientOnly>
      </BiSection>

      <BiSection id="facts" title={bi('Mission facts compared', '任務事實比較', 'Datos de la misión comparados')}>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
                <th scope="col" className="px-4 py-3">{txt(T('Fact', '項目', 'Dato'), locale)}</th>
                <th scope="col" className="px-4 py-3 text-cyan-300">Voyager 1</th>
                <th scope="col" className="px-4 py-3 text-emerald-300">Voyager 2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {FACTS.map((r) => (
                <tr key={r.label.en}>
                  <th scope="row" className="px-4 py-3 font-medium text-slate-200">{txt(r.label, locale)}</th>
                  <td className="px-4 py-3 text-slate-300">{txt(r.v1, locale)}</td>
                  <td className="px-4 py-3 text-slate-300">{txt(r.v2, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {txt(T('Dates from NASA/JPL mission records; see', '日期取自 NASA/JPL 任務紀錄；請見', 'Fechas de los registros de NASA/JPL; ver'), locale)}{' '}
          <a href={pageUrl('sources')} className="text-cyan-300 underline underline-offset-2">{txt(T('Sources', '資料來源', 'Fuentes'), locale)}</a>.
        </p>
      </BiSection>

      <BiSection id="why-different" title={bi('Why are they so different?', '它們為什麼如此不同？', '¿Por qué son tan diferentes?')}>
        <div className="grid gap-5 md:grid-cols-2">
          {WHY.map((w) => (
            <article key={w.title.en} className="rounded-2xl border border-slate-700/60 bg-space-900/40 p-5">
              <h3 className="mb-2 text-lg font-semibold text-white">{txt(w.title, locale)}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{txt(w.body, locale)}</p>
            </article>
          ))}
        </div>
      </BiSection>

      <RelatedLinks items={['voyager-1', 'voyager-2', 'timeline', 'tools', 'how-it-works']} />
    </div>
  );
}
