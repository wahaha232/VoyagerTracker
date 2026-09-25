/**
 * UpdatesPage — /updates.html  (EN / 繁中 / Español)
 *
 * A dated log. Mission entries are the recent, sourced events from the
 * timeline (single source of truth); website entries record real changes
 * to this site, including corrections.
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, BiSection, bi, txt, useLang } from '../components/content';
import { INSTRUMENT_STATUS_AS_OF } from '../constants/voyagerData';
import { EVENTS } from '../data/events';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

/** Date the mission facts on this site were last checked against NASA sources. */
const CONTENT_REVIEWED = '2026-09-25';

const SITE_UPDATES: { date: string; title: Tri; detail: Tri; reason?: Tri; affected?: Tri }[] = [
  {
    date: '2026-09-25',
    title: T('Historical data, new explorers and data labels', '歷史資料、新探索工具與資料標籤', 'Datos históricos, nuevos exploradores y etiquetas de datos'),
    detail: T(
      'Monthly JPL position vectors were added so the distance from Earth and the signal delay can be shown for any date from 1977 to 2034. New: Date Explorer with sourced events, Compare two dates, Scale explorer, Communication delay simulator, the interactive Earth-orbit diagram on the home page, a route explorer on the Compare page, a Golden Record category explorer, and Official / Calculated / Hypothetical / Educational labels on the data.',
      '加入 JPL 月度位置向量，讓 1977 至 2034 年任何日期的地球距離與訊號延遲都能顯示。新增：附出處事件的日期探索器、兩日期比較、尺度探索、通訊延遲模擬、首頁的互動式地球軌道圖、比較頁的路線探索器、金唱片分類探索，以及資料上的「官方／本站計算／假設性／教學示意」標籤。',
      'Se añadieron vectores de posición mensuales de JPL para mostrar la distancia a la Tierra y el retardo de señal de cualquier fecha entre 1977 y 2034. Novedades: explorador de fechas con eventos con fuentes, comparación de dos fechas, explorador de escala, simulador de retardo de comunicación, el diagrama interactivo de la órbita terrestre en la portada, un explorador de rutas en Comparar, un explorador del Disco de Oro y etiquetas Oficial / Calculado / Hipotético / Didáctico.',
    ),
    reason: T('Earlier tools could only show distance from the Sun for past dates, and it was not always clear which values were official and which were calculated.', '先前的工具只能顯示過去日期與太陽的距離，而且哪些數值是官方、哪些是計算，並不總是清楚。', 'Las herramientas anteriores solo mostraban la distancia al Sol en fechas pasadas y no siempre quedaba claro qué valores eran oficiales y cuáles calculados.'),
    affected: T('Tools, Compare, Home, Science, Golden Record, How It Works, FAQ, Sources', '計算工具、比較、首頁、科學發現、金唱片、運作原理、常見問題、資料來源', 'Herramientas, Comparar, Portada, Ciencia, Disco de Oro, Cómo funciona, Preguntas, Fuentes'),
  },
  {
    date: '2026-09-25',
    reason: T('The previous figures were several AU wrong and one claim on this page was untrue.', '先前的數字偏差數個 AU，且本頁有一則說法不實。', 'Las cifras anteriores estaban varias UA equivocadas y una afirmación de esta página era falsa.'),
    affected: T('All trackers, Voyager 1 and 2 pages, FAQ, Updates', '所有追蹤器、航海家一號與二號頁、常見問題、更新紀錄', 'Todos los rastreadores, páginas de Voyager 1 y 2, Preguntas, Novedades'),
    title: T('Correction: new calculation model and corrected figures', '更正：新的計算模型與修正後的數字', 'Corrección: nuevo modelo de cálculo y cifras corregidas'),
    detail: T(
      'The trackers previously started from a fixed 2026 estimate of 165.5 AU (Voyager 1) and 138.5 AU (Voyager 2) and treated the distance from Earth as equal to the distance from the Sun. Checked against JPL Horizons, those starting values were about 6 AU and 5 AU too low. An earlier entry on this page said the baseline had been verified against NASA values; that statement was wrong and has been withdrawn. The trackers now propagate JPL Horizons state vectors and model Earth’s orbit, and the result has been validated against JPL (see How It Works). The instrument lists were also corrected to match NASA’s current status.',
      '追蹤器先前以固定的 2026 年估計值為起點——航海家一號 165.5 AU、二號 138.5 AU——並把與地球的距離視同與太陽的距離。與 JPL Horizons 比對後發現，這些起始值分別偏低約 6 AU 與 5 AU。本頁先前一則條目聲稱基準值已與 NASA 數值核對，該說法有誤，現已撤回。追蹤器現在改為推算 JPL Horizons 的狀態向量並納入地球公轉，結果已與 JPL 比對驗證（見「運作原理」）。儀器清單也已依 NASA 目前公布的狀態更正。',
      'Los rastreadores partían antes de una estimación fija para 2026 de 165,5 UA (Voyager 1) y 138,5 UA (Voyager 2) y trataban la distancia a la Tierra como igual a la distancia al Sol. Comparados con JPL Horizons, esos valores eran unas 6 y 5 UA demasiado bajos. Una entrada anterior de esta página afirmaba que la línea base se había verificado con valores de la NASA; era incorrecto y se ha retirado. Ahora los rastreadores propagan vectores de estado de JPL Horizons y modelan la órbita terrestre, con validación frente a JPL (ver Cómo funciona). También se corrigieron las listas de instrumentos según el estado actual de la NASA.',
    ),
  },
  {
    date: '2026-09-25',
    title: T('New: comparison, calculators, interactive timeline and more', '新增：比較頁、計算工具、互動式時間軸等', 'Novedad: comparación, calculadoras, cronología interactiva y más'),
    detail: T(
      'Added the Voyager 1 vs Voyager 2 comparison with a 1977–2035 distance and speed chart, four calculators, an interactive timeline with sources for every event, a science page organised by what Voyager saw and why it matters, an essay on why Voyager still matters, upcoming-milestone countdowns, a “since your last visit” panel and Terms of Use. Pages are now delivered as fully rendered HTML.',
      '新增「航海家一號 vs 二號」比較頁（含 1977–2035 年距離與速度圖）、四個計算工具、每個事件都附出處的互動式時間軸、依「航海家看到什麼、為何重要」編排的科學頁面、一篇「航海家為何至今仍重要」專文、里程碑倒數、「自上次造訪以來」面板與使用條款。所有頁面現在都以完整渲染的 HTML 提供。',
      'Se añadieron la comparación Voyager 1 frente a Voyager 2 con un gráfico de distancia y velocidad 1977–2035, cuatro calculadoras, una cronología interactiva con fuentes para cada evento, una página de ciencia organizada por qué vio Voyager y por qué importa, un ensayo sobre por qué Voyager sigue importando, cuentas atrás de hitos, un panel «desde tu última visita» y los Términos de uso. Las páginas se entregan ahora como HTML completo.',
    ),
  },
  {
    date: '2026-09-06',
    title: T('Spanish translation added', '新增西班牙文版本', 'Se añade la traducción al español'),
    detail: T('All pages became available in Spanish, alongside English and Traditional Chinese.', '所有頁面除英文與繁體中文外，也提供西班牙文版本。', 'Todas las páginas pasaron a estar disponibles en español, además de inglés y chino tradicional.'),
  },
  {
    date: '2026-09-05',
    title: T('Site rebuilt as a multi-page reference', '網站改版為多頁式參考網站', 'El sitio se rehace como referencia de varias páginas'),
    detail: T('The single-page tracker became a multi-page site with mission, timeline, Golden Record, FAQ and sources pages.', '原本的單頁追蹤器改版為多頁網站，加入任務、時間軸、金唱片、常見問題與資料來源等頁面。', 'El rastreador de una sola página se convirtió en un sitio con páginas de misión, cronología, Disco de Oro, preguntas frecuentes y fuentes.'),
  },
];

export default function UpdatesPage() {
  const locale = useLang();
  const mission = EVENTS.filter((e) => e.date >= '2024-01-01').slice().reverse();
  const fmtDate = (d: string) =>
    new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(Date.parse(`${d}T00:00:00Z`));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="updates"
        title={bi('Mission & site updates', '任務與網站更新紀錄', 'Novedades de la misión y del sitio')}
        intro={bi(
          'A dated record of recent Voyager events reported by NASA/JPL and of real changes to this website, including corrections. Nothing is added unless there is something genuine to report.',
          '這裡以日期記錄 NASA/JPL 公布的近期航海家事件，以及本站的實際修改（包括更正）。沒有真正值得報告的內容時，不會新增任何條目。',
          'Un registro fechado de los eventos recientes de Voyager publicados por NASA/JPL y de los cambios reales de este sitio, incluidas las correcciones. No se añade nada si no hay algo real que contar.',
        )}
      />

      <dl className="mb-10 grid gap-3 sm:grid-cols-3">
        {[
          { k: T('Site last built', '網站最後建置', 'Última compilación'), v: __BUILD_DATE__ },
          { k: T('Mission facts last reviewed', '任務事實最後核對', 'Última revisión de datos'), v: CONTENT_REVIEWED },
          { k: T('NASA instrument status as of', 'NASA 儀器狀態截至', 'Estado de instrumentos NASA a'), v: INSTRUMENT_STATUS_AS_OF },
        ].map((row) => (
          <div key={row.k.en} className="rounded-xl border border-slate-700/60 bg-space-900/50 p-4">
            <dt className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{txt(row.k, locale)}</dt>
            <dd className="mt-1 font-mono text-lg text-white">
              <time dateTime={row.v}>{row.v}</time>
            </dd>
          </div>
        ))}
      </dl>

      <BiSection id="mission-updates" title={bi('Mission updates', '任務動態', 'Novedades de la misión')}>
        <div className="space-y-4">
          {mission.map((e) => (
            <article key={`${e.date}-${e.craft}`} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
                <time dateTime={e.date}>{fmtDate(e.date)}</time>
                {e.upcoming ? ` · ${txt(T('upcoming', '即將到來', 'próximo'), locale)}` : ''}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">{txt(e.title, locale)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {txt(e.what, locale)} {txt(e.context, locale)}
              </p>
              <a href={e.source.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-300 underline underline-offset-2">
                {e.source.label} <ExternalLinkIcon className="h-3 w-3" />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          {txt(T('Older events are on the', '更早的事件請見', 'Los eventos anteriores están en la'), locale)}{' '}
          <a href={pageUrl('timeline')} className="text-cyan-300 underline underline-offset-2">
            {txt(T('mission timeline', '任務時間軸', 'cronología'), locale)}
          </a>
          .
        </p>
      </BiSection>

      <BiSection id="website-updates" title={bi('Website changes and corrections', '網站修改與更正', 'Cambios y correcciones del sitio')}>
        <div className="space-y-4">
          {SITE_UPDATES.map((u) => (
            <article key={u.title.en} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-300">
                <time dateTime={u.date}>{fmtDate(u.date)}</time>
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">{txt(u.title, locale)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{txt(u.detail, locale)}</p>
              {(u.reason || u.affected) && (
                <dl className="mt-3 grid gap-x-4 gap-y-1 text-xs sm:grid-cols-[130px_1fr]">
                  {u.reason && (
                    <>
                      <dt className="font-mono uppercase tracking-wider text-slate-400">{txt(T('Reason', '原因', 'Motivo'), locale)}</dt>
                      <dd className="text-slate-300">{txt(u.reason, locale)}</dd>
                    </>
                  )}
                  {u.affected && (
                    <>
                      <dt className="font-mono uppercase tracking-wider text-slate-400">{txt(T('Affected', '影響範圍', 'Afecta a'), locale)}</dt>
                      <dd className="text-slate-300">{txt(u.affected, locale)}</dd>
                    </>
                  )}
                </dl>
              )}
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          {txt(T('The complete change history is public in the', '完整的修改歷史公開於', 'El historial completo de cambios es público en el'), locale)}{' '}
          <a href="https://github.com/wahaha232/VoyagerTracker/commits/main" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2">
            {txt(T('GitHub repository', 'GitHub 儲存庫', 'repositorio de GitHub'), locale)} <ExternalLinkIcon className="h-3 w-3" />
          </a>
          .
        </p>
      </BiSection>

      <RelatedLinks items={['timeline', 'how-it-works', 'sources', 'about', 'contact']} />
    </div>
  );
}
