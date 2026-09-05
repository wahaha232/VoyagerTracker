/**
 * HomePage — /  (EN / 繁中 / Español)
 */

import { SPACECRAFT_META } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import { LinkArrow } from '../components/icons';
import TrackerSection from '../components/TrackerSection';
import Voyager3D from '../components/Voyager3D';
import { RelatedLinks } from '../components/ui';
import { useEs, useZh, bi } from '../components/content';

const V1 = SPACECRAFT_META['voyager1'];
const V2 = SPACECRAFT_META['voyager2'];

export default function HomePage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-cyan-500/15">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div className="animate-fade-in">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {zh ? '獨立 · 教育性質 · 與 NASA 無關' : es ? 'Independiente · Educativo · Sin afiliación con la NASA' : 'Independent · Educational · Not affiliated with NASA'}
            </p>
            <h1 className="neon-text text-4xl font-black tracking-wide text-white sm:text-5xl lg:text-6xl">
              {zh ? '航海家號追蹤器' : es ? 'Rastreador Voyager' : 'Voyager Tracker'}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              {zh ? (
                <>追蹤 NASA 的航海家一號與二號太空船，看它們繼續穿越星際空間的歷史性旅程。</>
              ) : es ? (
                <>Sigue a las sondas Voyager 1 y 2 de la NASA en su histórico viaje a través del espacio interestelar.</>
              ) : (
                <>Track NASA&rsquo;s Voyager 1 and Voyager 2 spacecraft as they continue their historic journeys through interstellar space.</>
              )}
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-400">
              {zh ? (
                <>
                  1977 年由 NASA 發射的航海家一號與二號，是史上執行最久的深空任務。本站追蹤它們與地球、
                  太陽的距離、速度與星際現況，並說明它們在做什麼、去過哪裡、為何重要。所有數字皆以 NASA/JPL
                  資料計算並標示為估計值。
                </>
              ) : es ? (
                <>
                  Lanzadas por la NASA en 1977, las Voyager 1 y 2 son las misiones de espacio profundo
                  más longevas de la historia. Este sitio sigue su distancia a la Tierra y al Sol, su
                  velocidad y su estado interestelar, y explica qué hacen, dónde han estado y por qué
                  importan. Todas las cifras están etiquetadas como estimaciones basadas en datos de NASA/JPL.
                </>
              ) : (
                <>
                  Launched by NASA in 1977, Voyager 1 and Voyager 2 are the longest-running deep-space
                  missions in history. This site follows their distance from Earth and the Sun, their
                  speed and interstellar status — and explains what the probes are doing, where they
                  have been and why their mission matters. All figures are clearly labelled estimates
                  built from published NASA/JPL data.
                </>
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#live-tracker"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-bold text-space-950 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.02]"
              >
                {zh ? '開啟即時追蹤器' : es ? 'Abrir el rastreador' : 'Open live tracker'}
                <LinkArrow className="h-4 w-4" />
              </a>
              <a
                href={pageUrl('mission')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-space-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-white"
              >
                {zh ? '了解航海家任務' : es ? 'Conocer la misión' : 'Learn about the mission'}
              </a>
            </div>
          </div>

          {/* 3D spacecraft */}
          <div className="animate-fade-in">
            <div className="hud-panel relative h-[340px] w-full overflow-hidden rounded-2xl sm:h-[430px]">
              <Voyager3D />
              <div className="pointer-events-none absolute bottom-3 left-4 rounded-md border border-cyan-500/20 bg-space-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300/70 backdrop-blur-sm">
                {zh ? '拖曳旋轉 · 互動航海家模型' : es ? 'Arrastra para girar · modelo 3D interactivo' : 'Drag to rotate · interactive Voyager model'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Live tracker (both probes) ===== */}
      <div id="live-tracker" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6">
        <TrackerSection
          ids={['voyager1', 'voyager2']}
          title={zh ? '航海家一號與二號即時追蹤器' : es ? 'Rastreador en vivo: Voyager 1 y 2' : 'Voyager 1 & Voyager 2 Live Tracker'}
          intro={
            zh
              ? '兩艘星際探測器的距離、速度與任務現況。數字會隨著太空船以每秒數十公里的速度向外飛行而不斷增加。'
              : es
                ? 'Distancia, velocidad y estado de la misión de ambas sondas interestelares. Los números crecen mientras las naves viajan hacia afuera a decenas de kilómetros por segundo.'
                : 'Distances, speeds and mission status for both interstellar probes. The numbers tick upward as the spacecraft continue outward at tens of kilometres per second.'
          }
        />
      </div>

      {/* ===== What are the Voyagers? ===== */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <section id="what-are-the-voyagers" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '引言' : es ? 'Introducción' : 'Introduction'}
          </p>
          <h2 className="mb-2 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '什麼是航海家一號與二號？' : es ? '¿Qué son las Voyager 1 y 2?' : 'What are Voyager 1 and Voyager 2?'}
          </h2>
          <p className="mb-6 max-w-3xl text-slate-300/90">
            {zh
              ? '兩艘近乎相同的機器人太空船，原本只為期四年，如今卻已進入第五個十年的任務。'
              : es
                ? 'Dos sondas robóticas casi idénticas, construidas para una misión de cuatro años que ya supera las cinco décadas.'
                : 'Two nearly identical robotic spacecraft built for a four-year mission that is now in its fifth decade.'}
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#22d3ee40' }}>
              <p className="mb-2 text-xl font-bold" style={{ color: '#22d3ee' }}>{V1.name}</p>
              <p className="mb-3 text-sm leading-relaxed text-slate-400">
                {zh ? '1977 年 9 月 5 日發射 · 美國佛羅里達州卡納維爾角' : es ? 'Lanzada el 5 de septiembre de 1977 · Cabo Cañaveral, Florida' : 'Launched 5 September 1977 · Cape Canaveral, Florida'}
              </p>
              <p className="text-[15px] leading-relaxed text-slate-200">
                {zh
                  ? '航海家一號先探索木星與土星，再借助土星重力甩向北方。它於 1979 年飛掠木星、1980 年土星、1990 年拍下「蒼藍小點」，並於 2012 年成為第一個進入星際空間的人造物體。'
                  : es
                    ? 'La Voyager 1 exploró Júpiter y Saturno y usó la gravedad de Saturno para ir hacia el norte. Sobrevoló Júpiter en 1979, Saturno en 1980, tomó el \u201cpálido punto azul\u201d en 1990 y en 2012 fue el primer objeto humano en el espacio interestelar.'
                    : 'Voyager 1 explored Jupiter and Saturn, then used Saturn\u2019s gravity to swing north. It flew past Jupiter in 1979, Saturn in 1980, photographed the Pale Blue Dot in 1990, and in 2012 became the first human-made object in interstellar space.'}
              </p>
              <p className="mt-4">
                <a href={pageUrl('voyager-1')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                  {zh ? '航海家一號任務頁' : es ? 'Página de Voyager 1' : 'Voyager 1 mission page'} <LinkArrow className="h-4 w-4" />
                </a>
              </p>
            </div>
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#34d39940' }}>
              <p className="mb-2 text-xl font-bold" style={{ color: '#34d399' }}>{V2.name}</p>
              <p className="mb-3 text-sm leading-relaxed text-slate-400">
                {zh ? '1977 年 8 月 20 日發射 · 美國佛羅里達州卡納維爾角' : es ? 'Lanzada el 20 de agosto de 1977 · Cabo Cañaveral, Florida' : 'Launched 20 August 1977 · Cape Canaveral, Florida'}
              </p>
              <p className="text-[15px] leading-relaxed text-slate-200">
                {zh
                  ? '航海家二號是唯一造訪天王星與海王星的太空船，完成了外行星的「大旅行」，並於 2018 年進入星際空間。'
                  : es
                    ? 'La Voyager 2 es la única nave que ha visitado Urano y Neptuno, completando el \u201cGran Tour\u201d, y entró al espacio interestelar en 2018.'
                    : 'Voyager 2 is the only spacecraft ever to visit Uranus and Neptune, completing the \u201cGrand Tour\u201d, and it entered interstellar space in 2018.'}
              </p>
              <p className="mt-4">
                <a href={pageUrl('voyager-2')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                  {zh ? '航海家二號任務頁' : es ? 'Página de Voyager 2' : 'Voyager 2 mission page'} <LinkArrow className="h-4 w-4" />
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ===== Why it matters ===== */}
        <section id="why-it-matters" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '重要性' : es ? 'Importancia' : 'Significance'}
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '為什麼航海家任務如此重要？' : es ? '¿Por qué importan las misiones Voyager?' : 'Why Are the Voyager Missions Important?'}
          </h2>
          <p className="max-w-4xl leading-relaxed text-slate-300">
            {zh
              ? '航海家計畫首次近距離觀察四顆巨行星，徹底改寫了行星科學。木衛一的火山、海王星的超音速風、土星環的精細結構，都由這兩艘探測器揭開或徹底改觀。'
              : es
                ? 'El programa Voyager dio las primeras vistas cercanas de cuatro gigantes gaseosos y reescribió la ciencia planetaria. Los volcanes de Ío, los vientos supersónicos de Neptuno o los anillos de Saturno fueron revelados o transformados por estas dos naves.'
                : 'The Voyager program delivered the first close-up views of four giant planets — reshaping planetary science. Io\u2019s volcanoes, Neptune\u2019s supersonic winds and Saturn\u2019s intricate rings were revealed or transformed by these two spacecraft.'}
          </p>
          <p className="mt-3 max-w-4xl leading-relaxed text-slate-300">
            {zh
              ? '如今任務進入第二章：兩艘航海家號是唯一正在取樣太陽影響力與銀河之間空間的探測器。工程師正逐一關閉儀器以節省電力，預估至少一艘探測器可持續回傳資料到 2030 年代。'
              : es
                ? 'Hoy la misión tiene una segunda vida: las Voyager son las únicas sondas que muestrean el espacio entre la influencia del Sol y la galaxia. Los instrumentos se apagan uno a uno y se espera que al menos una nave siga enviando datos hasta los años 30.'
                : 'Today the mission has a second life: the Voyagers are the only probes sampling the space between the Sun\u2019s influence and the rest of the galaxy. Instruments are being powered down one by one, and engineers expect at least one spacecraft to keep returning data well into the 2030s.'}
          </p>
          <div className="my-6 rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-sm leading-relaxed text-cyan-100">
            <p className="mb-1.5 font-semibold text-white">
              {zh ? '船上還載著…' : es ? 'También a bordo…' : 'Also aboard'}
            </p>
            <p>
              {zh ? (
                <>每艘航海家號都攜帶一張金唱片，收錄地球的聲音、音樂、問候與影像。{' '}
                  <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">深入了解金唱片 →</a>
                </>
              ) : es ? (
                <>Cada Voyager lleva un Disco de Oro con sonidos, música, saludos e imágenes de la Tierra.{' '}
                  <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">Conoce el Disco de Oro →</a>
                </>
              ) : (
                <>Each Voyager carries a Golden Record — sounds, music, greetings and images of Earth.{' '}
                  <a href={pageUrl('golden-record')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">Learn more about the Golden Record →</a>
                </>
              )}
            </p>
          </div>
        </section>

        {/* ===== Current mission status ===== */}
        <section id="current-status" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '現在進行式' : es ? 'Ahora mismo' : 'Right now'}
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '目前的任務狀態' : es ? 'Estado actual de la misión' : 'Current Mission Status'}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#22d3ee40' }}>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Voyager 1</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                {[
                  zh ? `· 自 ${V1.interstellarEntryDate} 起位於星際空間` : es ? `· En el espacio interestelar desde ${V1.interstellarEntryDate}` : `· In interstellar space since ${V1.interstellarEntryDate}`,
                  zh ? '· 以約 17 公里/秒遠離太陽' : es ? '· Se aleja del Sol a ~17 km/s' : '· Moving away from the Sun at about 17 km/s',
                  zh ? '· 仍透過 NASA 深空網路回傳資料' : es ? '· Sigue enviando datos por la Red de Espacio Profundo' : '· Still returning data through NASA\u2019s Deep Space Network',
                  zh ? '· 訊號單程傳回地球約需一天' : es ? '· La señal tarda casi un día en llegar' : '· Signal travel time to Earth: roughly a day',
                ].map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={pageUrl('voyager-1')} className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                {zh ? '航海家一號詳情 →' : es ? 'Detalles de Voyager 1 →' : 'Voyager 1 details →'}
              </a>
            </div>
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#34d39940' }}>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">Voyager 2</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                {[
                  zh ? `· 自 ${V2.interstellarEntryDate} 起位於星際空間` : es ? `· En el espacio interestelar desde ${V2.interstellarEntryDate}` : `· In interstellar space since ${V2.interstellarEntryDate}`,
                  zh ? '· 以約 15 公里/秒遠離太陽' : es ? '· Se aleja del Sol a ~15 km/s' : '· Moving away from the Sun at about 15 km/s',
                  zh ? '· 仍透過 NASA 深空網路回傳資料' : es ? '· Sigue enviando datos por la Red de Espacio Profundo' : '· Still returning data through NASA\u2019s Deep Space Network',
                  zh ? '· 唯一造訪過天王星與海王星的探測器' : es ? '· La única nave que visitó Urano y Neptuno' : '· The only spacecraft to have visited Uranus and Neptune',
                ].map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href={pageUrl('voyager-2')} className="mt-4 inline-block text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                {zh ? '航海家二號詳情 →' : es ? 'Detalles de Voyager 2 →' : 'Voyager 2 details →'}
              </a>
            </div>
          </div>
          <p className="mt-4 font-mono text-[11px] text-slate-500">
            {zh
              ? '狀態摘要自 NASA/JPL 任務紀錄。確切即時距離請見上方追蹤器。'
              : es
                ? 'Estado resumido de los registros de NASA/JPL. Distancias exactas en el rastreador de arriba.'
                : 'Status summarized from NASA/JPL mission records. Exact live distances are shown in the tracker above.'}
          </p>
        </section>

        {/* ===== Timeline preview ===== */}
        <section id="timeline-preview" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '歷史' : es ? 'Historia' : 'History'}
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '航海家任務時間軸' : es ? 'Cronología de la misión' : 'Voyager Mission Timeline'}
          </h2>
          <ol className="space-y-3">
            {(
              [
                { y: bi('1977', '1977', '1977'), t: bi('Voyager 2 and Voyager 1 launch.', '航海家二號與一號發射。', 'Se lanzan la Voyager 2 y la Voyager 1.') },
                { y: bi('1979', '1979', '1979'), t: bi('Both fly past Jupiter; Voyager 1 discovers volcanoes on Io.', '兩艘探測器飛掠木星；航海家一號發現木衛一上的活火山。', 'Ambas sobrevuelan Júpiter; la Voyager 1 descubre volcanes en Ío.') },
                { y: bi('1980–81', '1980–81', '1980–81'), t: bi('Saturn encounters by Voyager 1, then Voyager 2.', '航海家一號、接著二號飛掠土星。', 'Encuentros con Saturno de la Voyager 1 y luego la 2.') },
                { y: bi('1986 · 89', '1986 · 89', '1986 · 89'), t: bi('Voyager 2 becomes the only spacecraft to visit Uranus and Neptune.', '航海家二號成為唯一造訪天王星與海王星的太空船。', 'La Voyager 2 se vuelve la única nave en visitar Urano y Neptuno.') },
                { y: bi('2012 · 18', '2012 · 18', '2012 · 18'), t: bi('Voyager 1, then Voyager 2, enter interstellar space.', '航海家一號、接著二號進入星際空間。', 'La Voyager 1 y luego la 2 entran al espacio interestelar.') },
                { y: bi('Today', '今日', 'Hoy'), t: bi('Both probes continue to return data from beyond the heliosphere.', '兩艘探測器持續從日球層外回傳資料。', 'Ambas siguen enviando datos desde más allá de la heliosfera.') },
              ]
            ).map((row) => (
              <li key={row.y.en} className="flex gap-4 rounded-xl border border-slate-800 bg-space-900/40 p-4">
                <span className="shrink-0 font-mono text-sm font-bold text-cyan-300">
                  {zh ? row.y.zh : es ? row.y.es : row.y.en}
                </span>
                <span className="text-sm leading-relaxed text-slate-300">
                  {zh ? row.t.zh : es ? row.t.es : row.t.en}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4">
            <a href={pageUrl('timeline')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {zh ? '查看完整時間軸' : es ? 'Ver la cronología completa' : 'View the full mission timeline'} <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </section>

        {/* ===== Discoveries preview ===== */}
        <section id="discoveries-preview" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '科學' : es ? 'Ciencia' : 'Science'}
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '科學發現' : es ? 'Descubrimientos' : 'Scientific Discoveries'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                { title: bi('Io\u2019s volcanoes', '木衛一的火山', 'Volcanes en Ío'), text: bi('Voyager 1 photographed erupting volcanoes on Io in 1979.', '1979 年航海家一號拍到木衛一上噴發的火山。', 'La Voyager 1 fotografió volcanes en erupción en Ío en 1979.') },
                { title: bi('Neptune\u2019s winds', '海王星的風', 'Los vientos de Neptuno'), text: bi('Voyager 2 measured supersonic winds on Neptune.', '航海家二號測得海王星上的超音速風。', 'La Voyager 2 midió vientos supersónicos en Neptuno.') },
                { title: bi('Interstellar plasma', '星際電漿', 'Plasma interestelar'), text: bi('The Voyagers measured the plasma density between the stars.', '航海家號量測了星際空間的電漿密度。', 'Las Voyager midieron la densidad del plasma entre las estrellas.') },
              ]
            ).map((card) => (
              <div key={card.title.en} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
                <h3 className="mb-2 font-semibold text-white">{zh ? card.title.zh : es ? card.title.es : card.title.en}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{zh ? card.text.zh : es ? card.text.es : card.text.en}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('discoveries')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {zh ? '探索所有發現' : es ? 'Ver todos los descubrimientos' : 'Explore all discoveries'} <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </section>

        {/* ===== How it works preview ===== */}
        <section id="how-it-works-preview" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '方法' : es ? 'Método' : 'Method'}
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '航海家號追蹤器如何運作' : es ? 'Cómo funciona el Rastreador' : 'How Voyager Tracker Works'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                { t: bi('1 · Data source', '1 · 資料來源', '1 · Fuente de datos'), x: bi('Official NASA/JPL references provide baseline distances and cruise speeds.', 'NASA/JPL 官方參考提供基準距離與巡航速度。', 'Las referencias de NASA/JPL aportan distancias base y velocidades de crucero.') },
                { t: bi('2 · Calculation', '2 · 計算方式', '2 · Cálculo'), x: bi('The baseline is advanced by each probe\u2019s velocity over elapsed time.', '以各探測器速度隨經過時間推進基準值。', 'La línea base se proyecta con la velocidad de cada sonda a lo largo del tiempo.') },
                { t: bi('3 · Update cycle', '3 · 更新週期', '3 · Ciclo de actualización'), x: bi('Values recalculate in your browser; baselines refresh with new official data.', '數值在你的瀏覽器內重新計算；新官方資料出現時更新基準。', 'Los valores se recalculan en tu navegador; la línea base se actualiza con datos oficiales nuevos.') },
              ]
            ).map((card) => (
              <div key={card.t.en} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
                <h3 className="mb-2 font-mono text-sm font-bold text-cyan-300">{zh ? card.t.zh : es ? card.t.es : card.t.en}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{zh ? card.x.zh : es ? card.x.es : card.x.en}</p>
              </div>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('how-it-works')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {zh ? '閱讀完整方法說明' : es ? 'Leer la metodología completa' : 'Read the full methodology'} <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </section>

        {/* ===== FAQ preview ===== */}
        <section id="faq-preview" className="mb-12 scroll-mt-24">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
            {zh ? '問題' : es ? 'Preguntas' : 'Questions'}
          </p>
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {zh ? '常見問題' : es ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-3">
            {(
              [
                { q: bi('Where are Voyager 1 and Voyager 2 now?', '航海家一號與二號現在在哪裡？', '¿Dónde están ahora la Voyager 1 y la 2?'), a: bi('Both are in interstellar space — Voyager 1 since 2012 and Voyager 2 since 2018.', '兩者都在星際空間中——一號自 2012 年、二號自 2018 年起。', 'Ambas están en el espacio interestelar — la 1 desde 2012 y la 2 desde 2018.') },
                { q: bi('How fast are the Voyagers traveling?', '航海家號飛得有多快？', '¿A qué velocidad viajan las Voyager?'), a: bi('Voyager 1 recedes at ~17 km/s and Voyager 2 at about 15 km/s.', '航海家一號以約 17 公里/秒、二號以約 15 公里/秒遠離太陽。', 'La Voyager 1 se aleja a ~17 km/s y la Voyager 2 a unos 15 km/s.') },
                { q: bi('Are the Voyagers still communicating with Earth?', '航海家號還在與地球通訊嗎？', '¿Las Voyager siguen comunicándose con la Tierra?'), a: bi('Yes — NASA\u2019s Deep Space Network still receives data from both spacecraft.', '是的——NASA 深空網路仍持續接收兩艘探測器的資料。', 'Sí — la Red de Espacio Profundo de la NASA sigue recibiendo datos de ambas.') },
                { q: bi('Is Voyager Tracker an official NASA website?', '航海家號追蹤器是 NASA 官方網站嗎？', '¿Es este un sitio oficial de la NASA?'), a: bi('No. It is an independent educational project, not affiliated with NASA or JPL.', '不是。它是獨立教育專案，與 NASA 或 JPL 無關。', 'No. Es un proyecto educativo independiente, sin afiliación con NASA o JPL.') },
              ]
            ).map((row) => (
              <details key={row.q.en} className="group rounded-xl border border-slate-800 bg-space-900/40">
                <summary className="cursor-pointer list-none p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300 marker:hidden">
                  <span className="mr-2 text-cyan-400">{zh ? '問' : es ? 'P.' : 'Q.'}</span>
                  {zh ? row.q.zh : es ? row.q.es : row.q.en}
                </summary>
                <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-400">
                  <span className="mr-2 text-emerald-400">{zh ? '答' : es ? 'R.' : 'A.'}</span>
                  {zh ? row.a.zh : es ? row.a.es : row.a.en}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('faq')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {zh ? '瀏覽全部十七個問題' : es ? 'Ver las 17 preguntas' : 'Browse all 17 questions'} <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </section>
      </div>

      {/* ===== Related information ===== */}
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <RelatedLinks
          items={['voyager-1', 'voyager-2', 'mission', 'timeline', 'discoveries', 'golden-record']}
        />
      </div>
    </div>
  );
}






