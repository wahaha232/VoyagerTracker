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
import { EVENTS } from './TimelinePage';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

/** Date the mission facts on this site were last checked against NASA sources. */
const CONTENT_REVIEWED = '2026-09-25';

const SITE_UPDATES: { date: string; title: Tri; detail: Tri }[] = [
  {
    date: '2026-09-25',
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
