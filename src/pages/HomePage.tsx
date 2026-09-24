/**
 * HomePage — /  (EN / 繁中 / Español)
 *
 * Answers, in order: what is this site, where are the Voyagers now, are
 * the numbers official, what do they mean, and what else can I explore.
 * Long-form material lives on the topic pages linked from here.
 */

import { Suspense, lazy } from 'react';
import { pageUrl, type PageKey } from '../constants/site';
import { LinkArrow } from '../components/icons';
import ClientOnly from '../components/ClientOnly';
import TrackerSection from '../components/TrackerSection';
import { RelatedLinks } from '../components/ui';
import { txt, useLang } from '../components/content';
import { useVoyagerLive, formatNumber } from '../hooks/useVoyagerLive';
import { FAQ_ITEMS } from './FaqPage';
import type { Locale } from '../types/voyager';

const Voyager3D = lazy(() => import('../components/Voyager3D'));

const tr = (locale: Locale, en: string, zh: string, es: string) => txt({ en, zh, es }, locale);

/** Two-line live summary shown in the hero (client-only). */
function HeroNumbers() {
  const locale = useLang();
  const live = useVoyagerLive(250);
  return (
    <dl className="mt-6 grid max-w-xl grid-cols-2 gap-3">
      {(['voyager1', 'voyager2'] as const).map((id) => {
        const v = live[id];
        return (
          <div key={id} className="rounded-xl border border-slate-700/60 bg-space-900/60 p-3">
            <dt className={`font-mono text-xs font-bold uppercase tracking-widest ${id === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300'}`}>
              {id === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
            </dt>
            <dd className="mt-1 font-mono text-lg font-semibold text-white">
              {locale === 'zh-TW'
                ? `${formatNumber(v.earthDistanceKm / 1e8, locale, 2)} 億公里`
                : `${formatNumber(v.earthDistanceKm / 1e9, locale, 3)} ${tr(locale, 'billion km', '', 'mil millones de km')}`}
            </dd>
            <dd className="font-mono text-xs text-slate-300">
              {tr(locale, 'from Earth · signal delay', '距地球 · 訊號延遲', 'de la Tierra · retardo')}{' '}
              {formatNumber(v.lightTimeSeconds / 3600, locale, 2)} {tr(locale, 'h', '小時', 'h')}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

const EXPLORE: { key: PageKey; en: string; zh: string; es: string }[] = [
  {
    key: 'compare',
    en: 'Put the twins side by side: a 50-year distance chart built from JPL data, their different routes, and why identical spacecraft ended up so far apart.',
    zh: '把這對雙胞胎並列比較：以 JPL 資料繪製的 50 年距離圖、兩條不同的路線，以及兩艘相同的太空船為何相距如此遙遠。',
    es: 'Compara a las gemelas: un gráfico de 50 años de distancia con datos de JPL, sus rutas y por qué dos naves idénticas acabaron tan separadas.',
  },
  {
    key: 'tools',
    en: 'Calculate the signal delay for any distance, convert units, look up where each probe was on your birthday, and compare hypothetical travel times.',
    zh: '計算任意距離的訊號延遲、換算單位、查詢您生日那天探測器在哪裡，並比較假設性的旅行時間。',
    es: 'Calcula el retardo de señal, convierte unidades, consulta dónde estaba cada sonda el día que naciste y compara tiempos de viaje hipotéticos.',
  },
  {
    key: 'timeline',
    en: 'Click through the mission year by year. Each event explains what happened, why it mattered and where the information comes from.',
    zh: '逐年點選任務事件。每個事件都說明發生了什麼、為何重要，以及資料出處。',
    es: 'Recorre la misión año a año. Cada evento explica qué pasó, por qué importó y de dónde sale la información.',
  },
  {
    key: 'discoveries',
    en: 'Volcanoes on Io, Saturn’s braided rings, Uranus’s tipped magnetic field, Neptune’s winds — explained for non-specialists.',
    zh: '木衛一的火山、土星交織的環、天王星歪斜的磁場、海王星的狂風——以非專業讀者也能理解的方式說明。',
    es: 'Volcanes en Ío, los anillos de Saturno, el campo magnético inclinado de Urano, los vientos de Neptuno — explicados para todos.',
  },
  {
    key: 'why-voyager-matters',
    en: 'Why a mission launched in 1977 is still producing science nobody else can — and what it teaches about building things that last.',
    zh: '為什麼一項 1977 年發射的任務，至今仍能產出其他任務無法取得的科學資料——以及它對「打造耐久系統」的啟示。',
    es: 'Por qué una misión de 1977 sigue produciendo ciencia que nadie más puede obtener, y qué enseña sobre construir cosas duraderas.',
  },
  {
    key: 'how-it-works',
    en: 'See exactly how the numbers are calculated, how closely they match JPL’s predictions, and where the model stops being reliable.',
    zh: '了解數字究竟如何計算、與 JPL 預測的吻合程度，以及模型在哪些情況下不再可靠。',
    es: 'Mira exactamente cómo se calculan las cifras, cuánto coinciden con las predicciones de JPL y dónde deja de ser fiable el modelo.',
  },
];

export default function HomePage() {
  const locale = useLang();
  const t = (en: string, zh: string, es: string) => tr(locale, en, zh, es);
  const faqPreview = FAQ_ITEMS.slice(0, 4);

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden border-b border-cyan-500/15">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-14">
          <div className="animate-fade-in">
            <p className="mb-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {t('Independent · Educational · Not affiliated with NASA', '獨立 · 教育性質 · 與 NASA 無關', 'Independiente · Educativo · Sin afiliación con la NASA')}
            </p>
            <h1 className="neon-text text-4xl font-black tracking-wide text-white sm:text-5xl">
              {t('Where are Voyager 1 and Voyager 2 right now?', '航海家一號與二號此刻在哪裡？', '¿Dónde están ahora la Voyager 1 y la Voyager 2?')}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200">
              {t(
                'Voyager Tracker continuously calculates how far NASA’s two interstellar probes are from Earth and the Sun — and explains what those numbers mean, how the twins compare, and what they discovered.',
                '「航海家號追蹤器」持續計算 NASA 兩艘星際探測器與地球、太陽的距離——並說明這些數字的意義、兩艘探測器的差異，以及它們的科學發現。',
                'El Rastreador Voyager calcula continuamente a qué distancia están de la Tierra y del Sol las dos sondas interestelares de la NASA, y explica qué significan esas cifras, en qué se diferencian las gemelas y qué descubrieron.',
              )}
            </p>
            <ClientOnly>
              <HeroNumbers />
            </ClientOnly>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
              {t(
                'These are estimates calculated in your browser from NASA/JPL Horizons reference data, not live telemetry from the spacecraft.',
                '以上是依 NASA/JPL Horizons 參考資料、在您的瀏覽器中計算出的估計值，並非來自探測器的即時遙測。',
                'Son estimaciones calculadas en tu navegador a partir de datos de referencia de NASA/JPL Horizons, no telemetría en vivo de las naves.',
              )}{' '}
              <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
                {t('How the numbers are calculated', '數字如何計算', 'Cómo se calculan')}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#live-tracker"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-bold text-space-950 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.02]"
              >
                {t('Open the tracker', '開啟追蹤器', 'Abrir el rastreador')}
                <LinkArrow className="h-4 w-4" />
              </a>
              <a
                href={pageUrl('compare')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-space-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-white"
              >
                {t('Compare Voyager 1 & 2', '比較一號與二號', 'Comparar Voyager 1 y 2')}
              </a>
              <a
                href={pageUrl('tools')}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-space-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-white"
              >
                {t('Try the calculators', '使用計算工具', 'Probar las calculadoras')}
              </a>
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="hud-panel relative h-[300px] w-full overflow-hidden rounded-2xl sm:h-[420px]">
              <ClientOnly>
                <Suspense fallback={null}>
                  <Voyager3D />
                </Suspense>
              </ClientOnly>
              <div className="pointer-events-none absolute bottom-3 left-4 rounded-md border border-cyan-500/20 bg-space-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300/80 backdrop-blur-sm">
                {t('Drag to rotate · simplified 3D Voyager model', '拖曳旋轉 · 簡化的航海家 3D 模型', 'Arrastra para girar · modelo 3D simplificado')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Tracker ===== */}
      <div id="live-tracker" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6">
        <TrackerSection
          ids={['voyager1', 'voyager2']}
          title={t('Voyager 1 & Voyager 2 — calculated position right now', '航海家一號與二號——此刻的計算位置', 'Voyager 1 y 2: posición calculada ahora mismo')}
          intro={t(
            'Distance, signal delay, speed and mission time for both probes, recalculated about ten times a second. Each card also puts the numbers in context and lists which science instruments NASA still operates.',
            '兩艘探測器的距離、訊號延遲、速度與任務時間，每秒重新計算約十次。每張卡片也會把數字放進脈絡中比較，並列出 NASA 仍在運作的科學儀器。',
            'Distancia, retardo de señal, velocidad y tiempo de misión de ambas sondas, recalculados unas diez veces por segundo. Cada tarjeta pone además las cifras en contexto e indica qué instrumentos siguen operando.',
          )}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
        {/* ===== What is Voyager Tracker ===== */}
        <section id="what-is-voyager-tracker" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {t('What is Voyager Tracker?', '什麼是航海家號追蹤器？', '¿Qué es el Rastreador Voyager?')}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3 leading-relaxed text-slate-300">
              <p>
                {t(
                  'Voyager Tracker is an independent educational website about NASA’s Voyager 1 and Voyager 2. Its core is a small calculation engine: it takes the position and velocity that NASA/JPL’s Horizons system publishes for each probe and moves them forward in time, together with Earth’s position on its orbit, to estimate where the Voyagers are at this moment.',
                  '「航海家號追蹤器」是一個關於 NASA 航海家一號與二號的獨立教育網站。它的核心是一個小型計算引擎：取用 NASA/JPL Horizons 系統公布的探測器位置與速度，連同地球在軌道上的位置一起向前推算，估計航海家號此刻的所在位置。',
                  'El Rastreador Voyager es un sitio educativo independiente sobre las Voyager 1 y 2 de la NASA. Su núcleo es un pequeño motor de cálculo: toma la posición y la velocidad que publica el sistema Horizons de NASA/JPL para cada sonda y las proyecta en el tiempo, junto con la posición de la Tierra en su órbita, para estimar dónde están ahora.',
                )}
              </p>
              <p>
                {t(
                  'Around that engine, the site explains the mission in its own words: what each spacecraft did, what scientists learned, why the two probes differ and why the distance from Earth sometimes shrinks. It does not represent NASA or JPL, and it never presents its estimates as official telemetry.',
                  '圍繞這個引擎，本站以自己的文字解說任務：每艘太空船做了什麼、科學家學到了什麼、兩艘探測器為何不同，以及與地球的距離為何有時會縮小。本站不代表 NASA 或 JPL，也從不把估計值當作官方遙測。',
                  'Alrededor de ese motor, el sitio explica la misión con sus propias palabras: qué hizo cada nave, qué aprendieron los científicos, por qué difieren las sondas y por qué a veces se reduce la distancia a la Tierra. No representa a la NASA ni a JPL y nunca presenta sus estimaciones como telemetría oficial.',
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-50">
              <p className="mb-2 font-semibold text-white">
                {t('Official data vs. this site’s estimates', '官方資料與本站估計值的差別', 'Datos oficiales frente a estimaciones')}
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>{t('Mission dates, encounters and instrument status: taken from NASA/JPL publications and cited on each page.', '任務日期、飛掠事件與儀器狀態：取自 NASA/JPL 公開資料，並在各頁註明出處。', 'Fechas, encuentros y estado de instrumentos: tomados de publicaciones de NASA/JPL y citados en cada página.')}</li>
                <li>{t('Current distance, speed and light time: calculated here, labelled “estimate”, validated against JPL predictions.', '目前的距離、速度與光行時間：由本站計算，標示為「估計值」，並已與 JPL 預測比對驗證。', 'Distancia, velocidad y tiempo de luz actuales: calculados aquí, marcados como «estimación» y validados con predicciones de JPL.')}</li>
                <li>{t('Travel-time comparisons in the calculators: hypothetical illustrations only.', '計算工具中的旅行時間比較：僅為假設性示意。', 'Comparaciones de tiempo de viaje en las calculadoras: solo ilustraciones hipotéticas.')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== What you can explore ===== */}
        <section id="explore" className="mb-14 scroll-mt-24">
          <h2 className="mb-2 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {t('What you can explore', '您可以探索的內容', 'Qué puedes explorar')}
          </h2>
          <p className="mb-6 max-w-3xl text-slate-300">
            {t('Beyond the tracker, each section answers a different question.', '除了追蹤器之外，每個單元都回答一個不同的問題。', 'Además del rastreador, cada sección responde a una pregunta distinta.')}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPLORE.map((item) => (
              <a
                key={item.key}
                href={pageUrl(item.key)}
                className="group flex flex-col rounded-2xl border border-slate-700/60 bg-space-900/50 p-5 transition-all hover:border-cyan-400/50"
              >
                <span className="mb-2 flex items-center justify-between font-semibold text-white group-hover:text-cyan-300">
                  {
                    {
                      compare: t('Voyager 1 vs Voyager 2', '一號 vs 二號', 'Voyager 1 vs Voyager 2'),
                      tools: t('Calculators', '計算工具', 'Calculadoras'),
                      timeline: t('Interactive timeline', '互動式時間軸', 'Cronología interactiva'),
                      discoveries: t('What Voyager discovered', '航海家的科學發現', 'Qué descubrió Voyager'),
                      'why-voyager-matters': t('Why Voyager still matters', '航海家為何至今仍重要', 'Por qué Voyager sigue importando'),
                      'how-it-works': t('How the tracker works', '追蹤器如何運作', 'Cómo funciona el rastreador'),
                    }[item.key as string]
                  }
                  <LinkArrow className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm leading-relaxed text-slate-400">{txt(item, locale)}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ===== The two spacecraft in brief ===== */}
        <section id="the-spacecraft" className="mb-14 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {t('Two spacecraft, two different journeys', '兩艘太空船，兩段不同的旅程', 'Dos naves, dos viajes distintos')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#22d3ee40' }}>
              <h3 className="mb-1 text-xl font-bold text-cyan-300">Voyager 1</h3>
              <p className="mb-3 font-mono text-xs text-slate-400">{t('Launched 5 September 1977', '1977 年 9 月 5 日發射', 'Lanzada el 5 de septiembre de 1977')}</p>
              <p className="text-[15px] leading-relaxed text-slate-200">
                {t(
                  'Took the faster route: Jupiter in 1979, Saturn and its moon Titan in 1980. The Titan flyby flung it north out of the planets’ plane, ending its planetary tour but setting it on the quickest path out of the solar system. In 1990 it took the “Pale Blue Dot” image of Earth, and in 2012 it became the first human-made object in interstellar space.',
                  '走較快的路線：1979 年飛掠木星，1980 年飛掠土星與其衛星泰坦。泰坦飛掠把它甩向行星軌道面北方，結束了行星之旅，卻也讓它踏上離開太陽系最快的路徑。1990 年它拍下地球的「蒼藍小點」，2012 年成為第一個進入星際空間的人造物體。',
                  'Tomó la ruta rápida: Júpiter en 1979, Saturno y su luna Titán en 1980. El sobrevuelo de Titán la lanzó al norte del plano de los planetas, terminando su gira planetaria pero poniéndola en el camino más rápido para salir del sistema solar. En 1990 tomó el «pálido punto azul» y en 2012 fue el primer objeto humano en el espacio interestelar.',
                )}
              </p>
              <a href={pageUrl('voyager-1')} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                {t('Voyager 1 in detail', '航海家一號詳細介紹', 'Voyager 1 en detalle')} <LinkArrow className="h-4 w-4" />
              </a>
            </div>
            <div className="hud-panel rounded-2xl p-6" style={{ borderColor: '#34d39940' }}>
              <h3 className="mb-1 text-xl font-bold text-emerald-300">Voyager 2</h3>
              <p className="mb-3 font-mono text-xs text-slate-400">{t('Launched 20 August 1977', '1977 年 8 月 20 日發射', 'Lanzada el 20 de agosto de 1977')}</p>
              <p className="text-[15px] leading-relaxed text-slate-200">
                {t(
                  'Launched first but on a slower path that let it keep going: Jupiter (1979), Saturn (1981), Uranus (1986) and Neptune (1989). It is still the only spacecraft to have visited the two outermost planets. It crossed into interstellar space in 2018, heading south of the planets’ plane.',
                  '雖然先發射，卻走較慢的路線，得以一路前進：木星（1979）、土星（1981）、天王星（1986）與海王星（1989）。它至今仍是唯一造訪過最外側兩顆行星的太空船，並於 2018 年朝行星軌道面南方進入星際空間。',
                  'Despegó primero, pero por una ruta más lenta que le permitió seguir: Júpiter (1979), Saturno (1981), Urano (1986) y Neptuno (1989). Sigue siendo la única nave que ha visitado los dos planetas más lejanos. Entró al espacio interestelar en 2018, hacia el sur del plano de los planetas.',
                )}
              </p>
              <a href={pageUrl('voyager-2')} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                {t('Voyager 2 in detail', '航海家二號詳細介紹', 'Voyager 2 en detalle')} <LinkArrow className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ===== FAQ preview ===== */}
        <section id="faq-preview" className="mb-12 scroll-mt-24">
          <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">
            {t('Common questions', '常見問題', 'Preguntas frecuentes')}
          </h2>
          <div className="space-y-3">
            {faqPreview.map((row) => (
              <details key={row.q.en} className="group rounded-xl border border-slate-800 bg-space-900/40">
                <summary className="cursor-pointer p-4 font-medium text-slate-100 transition-colors hover:text-cyan-300">
                  {txt(row.q, locale)}
                </summary>
                <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-300">{txt(row.a, locale)}</p>
              </details>
            ))}
          </div>
          <p className="mt-4">
            <a href={pageUrl('faq')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {t(`Read all ${FAQ_ITEMS.length} questions`, `閱讀全部 ${FAQ_ITEMS.length} 個問題`, `Leer las ${FAQ_ITEMS.length} preguntas`)} <LinkArrow className="h-4 w-4" />
            </a>
          </p>
        </section>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <RelatedLinks items={['mission', 'timeline', 'golden-record', 'sources', 'about', 'updates']} />
      </div>
    </div>
  );
}
