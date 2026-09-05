/**
 * UpdatesPage — /updates.html  (EN / 繁中 / Español)
 */

import { RelatedLinks } from '../components/ui';
import { BiArticleHeader, BiSection, bi, useEs, useZh } from '../components/content';

interface UpdateEntry {
  date: string;
  title: { en: string; zh: string; es: string };
  detail: { en: string; zh: string; es: string };
  kind: 'Mission' | 'Website';
}

const KIND_ZH: Record<string, string> = { Mission: '任務', Website: '網站' };
const KIND_ES: Record<string, string> = { Mission: 'Misión', Website: 'Sitio web' };

const UPDATES: UpdateEntry[] = [
  {
    date: '2024 · Jun',
    title: {
      en: 'Voyager 1 returns to normal science operations',
      zh: '航海家一號恢復正常科學運作',
      es: 'Voyager 1 vuelve a las operaciones científicas normales',
    },
    detail: {
      en: 'After a flight-data-system problem first reported in November 2023, NASA confirmed Voyager 1 had resumed returning science data from its operating instruments. Source: NASA/JPL public statements.',
      zh: '繼 2023 年 11 月首次通報的飛行資料系統問題後，NASA 確認航海家一號已恢復回傳仍在運作儀器的科學資料。來源：NASA/JPL 公開聲明。',
      es: 'Tras un problema en el sistema de datos de vuelo reportado por primera vez en noviembre de 2023, la NASA confirmó que Voyager 1 había reanudado el envío de datos científicos. Fuente: declaraciones públicas de NASA/JPL.',
    },
    kind: 'Mission',
  },
  {
    date: '2026 · Aug',
    title: {
      en: 'Tracker baseline verified against NASA values',
      zh: '追蹤器基準值已與 NASA 數值核對',
      es: 'Línea base del rastreador verificada con valores de la NASA',
    },
    detail: {
      en: 'The ephemeris baseline used by the live trackers was checked against NASA\u2019s published distances and the spacecraft\u2019s published cruise speeds.',
      zh: '「即時追蹤器」使用的星曆基準，已與 NASA 公布之距離及探測器巡航速度進行核對。',
      es: 'La línea base de efemérides del rastreador en vivo se verificó con las distancias publicadas por la NASA y las velocidades de crucero publicadas de las sondas.',
    },
    kind: 'Website',
  },
  {
    date: 'Ongoing',
    title: {
      en: 'Power management continues on both spacecraft',
      zh: '兩艘探測器的電力管理持續進行中',
      es: 'Continúa la gestión de energía de ambas naves',
    },
    detail: {
      en: 'NASA continues its programme of switching off heaters and non-essential instruments to extend the Voyagers\u2019 operating life.',
      zh: 'NASA 持續關閉加熱器與非必要儀器，以延長航海家號的運作壽命。',
      es: 'La NASA continúa apagando calentadores e instrumentos no esenciales para alargar la vida útil de las Voyager.',
    },
    kind: 'Mission',
  },
];

export default function UpdatesPage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="updates"
        title={bi('Mission & Website Updates', '任務與網站更新紀錄', 'Actualizaciones de la misión y del sitio')}
        intro={bi(
          'A record of genuine Voyager mission developments and real changes to this website. Entries are added only when there is actual content to report.',
          '這裡記錄真實的航海家任務發展與本站實際的更動。只有在有實際內容時才會新增條目。',
          'Un registro de novedades reales de la misión Voyager y de cambios reales de este sitio. Solo se añaden entradas cuando hay contenido real que informar.',
        )}
      />

      <div className="my-6 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '關於本頁' : es ? 'Acerca de esta página' : 'About this page'}
        </p>
        <p>
          {zh
            ? '「任務」類條目是 NASA/JPL 公布內容的摘要，可於資料來源頁點擊原始連結閱讀。'
            : es
              ? 'Los elementos de \u201cMisión\u201d son resúmenes de anuncios de NASA/JPL; sigue los enlaces de la página de Fuentes para leer los originales.'
              : 'Mission items here are summaries of announcements published by NASA/JPL; follow the links on the Sources page to read the originals.'}
        </p>
      </div>

      <BiSection
        id="mission-updates"
        kicker={bi('Mission', '任務', 'Misión')}
        title={bi('Mission updates', '任務更新', 'Actualizaciones de la misión')}
      >
        <div className="space-y-4">
          {UPDATES.filter((u) => u.kind === 'Mission').map((item) => (
            <UpdateCard key={item.title.en} item={item} zh={zh} es={es} />
          ))}
        </div>
      </BiSection>

      <BiSection
        id="website-updates"
        kicker={bi('Website', '網站', 'Sitio web')}
        title={bi('Website updates', '網站更新', 'Actualizaciones del sitio')}
      >
        <div className="space-y-4">
          {UPDATES.filter((u) => u.kind === 'Website').map((item) => (
            <UpdateCard key={item.title.en} item={item} zh={zh} es={es} />
          ))}
        </div>
        <p className="mt-4 max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>想提出修改建議嗎？請到 GitHub 儲存庫開啟 Issue。</>
          ) : es ? (
            <>
              ¿Quieres proponer un cambio? Abre una incidencia en el{' '}
              <a
                href="https://github.com/wahaha232/VoyagerTracker/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200"
              >
                repositorio de GitHub
              </a>
              .
            </>
          ) : (
            <>
              Want to propose a change? Please open an issue in the{' '}
              <a
                href="https://github.com/wahaha232/VoyagerTracker/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200"
              >
                GitHub repository
              </a>
              .
            </>
          )}
        </p>
      </BiSection>

      <RelatedLinks items={['timeline', 'how-it-works', 'sources', 'about', 'contact']} />
    </div>
  );
}

function UpdateCard({
  item,
  zh,
  es,
}: {
  item: UpdateEntry;
  zh: boolean;
  es: boolean;
}) {
  const kind = zh ? KIND_ZH[item.kind] : es ? KIND_ES[item.kind] : item.kind;
  return (
    <article className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
        {item.date} · {kind}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-white">
        {zh ? item.title.zh : es ? item.title.es : item.title.en}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
        {zh ? item.detail.zh : es ? item.detail.es : item.detail.en}
      </p>
    </article>
  );
}

