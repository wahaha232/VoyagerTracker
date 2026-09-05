/**
 * HowItWorksPage — /how-it-works.html  (EN / 繁中 / Español)
 */

import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, Bullets, Paragraph, useEs, useZh } from '../components/content';

const STEPS: { en: string; zh: string; es: string }[] = [
  {
    en: 'Start from a baseline distance and position from NASA/JPL mission data at a known date.',
    zh: '從 NASA/JPL 任務資料中，取一個已知日期的基準距離與位置。',
    es: 'Partir de una distancia y posición base de los datos de la misión de NASA/JPL en una fecha conocida.',
  },
  {
    en: 'Advance that position using each spacecraft\u2019s known cruising velocity and the elapsed time since the baseline.',
    zh: '以各探測器已知的巡航速度，與自基準日至今經過的時間，向前推進位置。',
    es: 'Proyectar esa posición con la velocidad de crucero conocida y el tiempo transcurrido desde la línea base.',
  },
  {
    en: 'Convert the result into kilometres, astronomical units (AU) and one-way light-travel time.',
    zh: '把結果換算成公里、天文單位（AU）與單程光行時間。',
    es: 'Convertir el resultado a kilómetros, unidades astronómicas (UA) y tiempo de viaje de la luz (ida).',
  },
];

const DIFFERENCES: { en: string; zh: string; es: string }[] = [
  { en: 'Different baseline dates (NASA updates its published values periodically).', zh: '基準日期不同（NASA 會定期更新公布數值）。', es: 'Fechas base distintas (la NASA actualiza sus valores publicados periódicamente).' },
  { en: 'Different definitions: distance from Earth vs. distance from the Sun.', zh: '定義不同：與地球的距離，或是與太陽的距離。', es: 'Definiciones distintas: distancia a la Tierra frente a distancia al Sol.' },
  { en: 'Different velocity assumptions or whether light-travel time is included.', zh: '速度假設不同，或是否計入光行時間。', es: 'Supuestos de velocidad distintos o si se incluye el tiempo de viaje de la luz.' },
  { en: 'Rounding and display conventions.', zh: '四捨五入與顯示慣例不同。', es: 'Convenciones de redondeo y visualización.' },
];

const LABEL_ROWS: { en: string; zh: string; es: string; name: { en: string; zh: string; es: string } }[] = [
  { name: { en: 'Historical', zh: '歷史', es: 'Histórico' }, en: 'Fixed mission facts from NASA records (launch, encounters, etc.).', zh: '來自 NASA 紀錄的固定任務事實（發射、飛掠等）。', es: 'Hechos fijos de la misión según los registros de la NASA (lanzamiento, encuentros, etc.).' },
  { name: { en: 'Estimated / calculated', zh: '估計／計算', es: 'Estimado / calculado' }, en: 'Derived from an official baseline by projecting with the spacecraft\u2019s velocity.', zh: '以官方基準配合探測器速度推估而得。', es: 'Derivado de una línea base oficial proyectada con la velocidad de la nave.' },
  { name: { en: 'Live', zh: '即時', es: 'En vivo' }, en: 'In this interface \u201clive\u201d means \u201crecalculated in your browser right now\u201d — never official real-time telemetry.', zh: '在此介面中，「即時」代表「正在你的瀏覽器內重新計算」——絕不暗示官方即時遙測。', es: 'En esta interfaz, \u201cen vivo\u201d significa \u201crecalculado ahora en tu navegador\u201d — nunca telemetría oficial en tiempo real.' },
];

export default function HowItWorksPage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="how-it-works"
        title={bi('How Voyager Tracker Works', '資料與計算方法', 'Cómo funciona el Rastreador Voyager')}
        intro={bi(
          'This page explains where our figures come from, how they are calculated, and why the numbers may differ slightly from other trackers.',
          '本頁說明：本站的數字從哪裡來、如何計算，以及為什麼可能與其他追蹤網站略有不同。',
          'Esta página explica de dónde salen nuestras cifras, cómo se calculan y por qué pueden diferir ligeramente de otros rastreadores.',
        )}
      />

      <div className="my-6 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '一句話總結' : es ? 'En resumen' : 'The short version'}
        </p>
        <p>
          {zh
            ? '本站顯示的太空船追蹤資料，是以可取得的任務與星曆資料為基礎，可能包含計算或估計值；這些數字不會被當成 NASA 即時遙測。'
            : es
              ? 'Los datos de seguimiento de este sitio se basan en datos disponibles de la misión y la efeméride, y pueden incluir valores calculados o estimados; nunca los presentamos como telemetría en vivo de la NASA.'
              : 'Spacecraft tracking data shown on this site is based on available mission and ephemeris data and may include calculated or estimated values. We never present these figures as live NASA telemetry.'}
        </p>
      </div>

      <BiSection
        id="sources"
        kicker={bi('1 · Sources', '1 · 資料來源', '1 · Fuentes')}
        title={bi('Where the data comes from', '資料從哪裡來', 'De dónde provienen los datos')}
      >
        <Paragraph
          value={bi(
            'Historical mission facts (launch dates, encounter dates, interstellar crossings) come from NASA/JPL public records. The baseline distances and cruising speeds are anchored to published NASA Voyager data.',
            '歷史任務事實（發射日、飛掠日、進入星際空間日）來自 NASA/JPL 公開紀錄。基準距離與巡航速度，以 NASA 公布的航海家資料為錨點。',
            'Los hechos históricos (fechas de lanzamiento, encuentros y cruces interestelares) provienen de los registros públicos de NASA/JPL. Las distancias y velocidades base se anclan a los datos publicados de la NASA.',
          )}
        />
      </BiSection>

      <BiSection
        id="distance"
        kicker={bi('2 · Calculation', '2 · 計算方式', '2 · Cálculo')}
        title={bi('How distances are estimated', '距離如何估算', 'Cómo se estiman las distancias')}
      >
        <Paragraph
          value={bi(
            'The Voyagers are so far away that no website receives a continuous, second-by-second \u201cGPS\u201d feed from them. Instead we use a simple physical model:',
            '航海家號距離遙遠，沒有任何網站能收到每秒更新的「GPS」訊號。本站採用簡單的物理模型：',
            'Las Voyager están tan lejos que ningún sitio recibe un \u201cGPS\u201d continuo de ellas. En su lugar usamos un modelo físico sencillo:',
          )}
        />
        <ol className="mt-3 max-w-4xl list-decimal space-y-2 pl-5 text-slate-300">
          {STEPS.map((step, i) => (
            <li key={i}>{zh ? step.zh : es ? step.es : step.en}</li>
          ))}
        </ol>
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Voyager 1 recedes from the Sun at about 17 km/s (≈3.6 AU per year) and Voyager 2 at about 15 km/s (≈3.2 AU per year), so this simple projection stays accurate for long periods.',
            '航海家一號以約 17 公里/秒（≈每年 3.6 AU）遠離太陽，二號約 15 公里/秒（≈每年 3.2 AU），因此這個簡單推估能長期保持準確。',
            'La Voyager 1 se aleja del Sol a unos 17 km/s (≈3.6 UA/año) y la Voyager 2 a unos 15 km/s (≈3.2 UA/año), así que esta proyección se mantiene precisa durante largos periodos.',
          )}
        />
      </BiSection>

      <BiSection
        id="updates"
        kicker={bi('3 · Frequency', '3 · 更新頻率', '3 · Frecuencia')}
        title={bi('How often the numbers update', '數字多久更新一次', 'Con qué frecuencia se actualizan los números')}
      >
        <Paragraph
          value={bi(
            'Within a page, the distance counters are recomputed in your browser about ten times per second so the odometer ticks smoothly. That is an interpolation tick, not a new download from NASA. The baseline is updated only when genuinely new official data exists.',
            '在頁面內，距離計數器約每秒在你的瀏覽器內重新計算十次，讓里程數字流暢跳動。那是「插值」更新，並非向 NASA 下載新資料。底層基準只會在出現真正的新官方資料時更新。',
            'En la página, los contadores se recalculan unas diez veces por segundo en tu navegador para que el odómetro se mueva con fluidez. Es una interpolación, no una descarga de la NASA. La línea base solo se actualiza con datos oficiales realmente nuevos.',
          )}
        />
      </BiSection>

      <BiSection
        id="differences"
        kicker={bi('4 · Differences', '4 · 數字差異', '4 · Diferencias')}
        title={bi('Why our numbers may differ from other sites', '為什麼本站數字可能與其他網站不同', 'Por qué nuestras cifras pueden diferir de otros sitios')}
      >
        <Paragraph
          value={bi('You may see slightly different distances elsewhere. Possible reasons:', '您在其他地方可能看到略微不同的距離。可能原因如下：', 'Puede que veas distancias ligeramente distintas en otros sitios. Posibles razones:')}
        />
        <Bullets
          items={DIFFERENCES.map((d) => bi(d.en, d.zh, d.es))}
        />
        <Paragraph
          className="mt-3 max-w-4xl leading-relaxed text-slate-300"
          value={bi(
            'Differences of a few tenths of an AU are normal and are not an error on any particular site.',
            '相差零點幾個 AU 是正常現象，並不代表哪個網站出錯。',
            'Diferencias de unas décimas de UA son normales y no suponen un error de ningún sitio.',
          )}
        />
      </BiSection>

      <BiSection
        id="labels"
        kicker={bi('5 · Labels', '5 · 標示', '5 · Etiquetas')}
        title={bi('Official vs. estimated vs. historical', '官方、估計與歷史', 'Oficial, estimado e histórico')}
      >
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">{zh ? '標示' : es ? 'Etiqueta' : 'Label'}</th>
                <th className="px-4 py-3">{zh ? '意義' : es ? 'Significado' : 'Meaning'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {LABEL_ROWS.map((row) => (
                <tr key={row.name.en}>
                  <td className="px-4 py-3 font-mono text-cyan-300">
                    {zh ? row.name.zh : es ? row.name.es : row.name.en}
                  </td>
                  <td className="px-4 py-3">{zh ? row.zh : es ? row.es : row.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BiSection>

      <BiSection
        id="latency"
        kicker={bi('6 · Reality check', '6 · 實際情況', '6 · Realidad')}
        title={bi('Latency and data availability', '延遲與資料可得性', 'Latencia y disponibilidad de datos')}
      >
        <Paragraph
          value={bi(
            'Real communication with the Voyagers has a built-in delay: a signal takes roughly a day to travel one-way from Voyager 1 to Earth. If specific data is unavailable or cannot be verified, we mark it as \u201cData unavailable\u201d rather than guessing.',
            '與航海家號的真實通訊存在固有延遲：訊號從航海家一號單程傳回地球約需一天。若特定資料無法取得或無法驗證，本站會標示「資料不可得」，而不是胡亂猜測。',
            'La comunicación real con las Voyager tiene un retraso intrínseco: la señal tarda casi un día en viajar desde la Voyager 1 hasta la Tierra. Si un dato no está disponible o no puede verificarse, lo marcamos como \u201cdato no disponible\u201d en lugar de adivinar.',
          )}
        />
      </BiSection>

      <RelatedLinks items={['faq', 'sources', 'about', 'updates', 'voyager-1']} />
    </div>
  );
}


