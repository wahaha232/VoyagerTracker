/**
 * SourcesPage — /sources.html  (EN / 繁中 / Español)
 */

import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, BiSection, bi, useEs, useZh } from '../components/content';

interface Source {
  name: { en: string; zh: string; es: string };
  provides: { en: string; zh: string; es: string };
  url: string;
}

const SOURCES: Source[] = [
  {
    name: { en: 'NASA Science — Voyager Mission', zh: 'NASA Science — 航海家任務', es: 'NASA Science — Misión Voyager' },
    provides: {
      en: 'Mission overview, spacecraft facts, encounter history and news.',
      zh: '任務總覽、太空船資料、飛掠歷史與新聞。',
      es: 'Resumen de la misión, datos de las naves, historia de encuentros y noticias.',
    },
    url: 'https://science.nasa.gov/mission/voyager/',
  },
  {
    name: { en: 'NASA — Where Are Voyager 1 and Voyager 2 Now?', zh: 'NASA — 航海家一號與二號現在在哪裡？', es: 'NASA — ¿Dónde están ahora Voyager 1 y 2?' },
    provides: {
      en: 'Current official distances from Earth and the Sun for both spacecraft.',
      zh: '兩艘探測器目前與地球、太陽的官方距離。',
      es: 'Distancias oficiales actuales de ambas naves a la Tierra y al Sol.',
    },
    url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/',
  },
  {
    name: { en: 'NASA Science — Voyager 1', zh: 'NASA Science — 航海家一號', es: 'NASA Science — Voyager 1' },
    provides: {
      en: 'Voyager 1 mission profile, instruments and status.',
      zh: '航海家一號的任務檔案、儀器與現況。',
      es: 'Perfil de la misión Voyager 1, instrumentos y estado.',
    },
    url: 'https://science.nasa.gov/mission/voyager/voyager-1/',
  },
  {
    name: { en: 'NASA Science — Voyager 2', zh: 'NASA Science — 航海家二號', es: 'NASA Science — Voyager 2' },
    provides: {
      en: 'Voyager 2 mission profile, instruments and status.',
      zh: '航海家二號的任務檔案、儀器與現況。',
      es: 'Perfil de la misión Voyager 2, instrumentos y estado.',
    },
    url: 'https://science.nasa.gov/mission/voyager/voyager-2/',
  },
  {
    name: { en: 'NASA — Voyager Golden Record', zh: 'NASA — 航海家金唱片', es: 'NASA — El Disco de Oro de Voyager' },
    provides: {
      en: 'History and full contents of the Golden Record.',
      zh: '金唱片的歷史與完整內容。',
      es: 'Historia y contenido completo del Disco de Oro.',
    },
    url: 'https://science.nasa.gov/mission/voyager/golden-record-overview/',
  },
  {
    name: { en: 'JPL — Voyager, The Interstellar Mission', zh: 'JPL — 航海家星際任務', es: 'JPL — Voyager, la misión interestelar' },
    provides: {
      en: 'Official mission news and details of the interstellar mission phase.',
      zh: '官方任務新聞與星際任務階段的細節。',
      es: 'Noticias oficiales de la misión y detalles de la fase interestelar.',
    },
    url: 'https://voyager.jpl.nasa.gov/',
  },
  {
    name: { en: 'NASA Eyes on the Solar System', zh: 'NASA Eyes on the Solar System', es: 'NASA Eyes on the Solar System' },
    provides: {
      en: 'An interactive visualisation of the spacecraft positions (handy for cross-checking).',
      zh: '可互動的太空船位置視覺化工具（便於交叉比對）。',
      es: 'Una visualización interactiva de las posiciones de las naves (útil para contrastar).',
    },
    url: 'https://eyes.nasa.gov/apps/solar-system/#/home',
  },
  {
    name: { en: 'NASA — Voyager Frequently Asked Questions', zh: 'NASA — 航海家常見問題', es: 'NASA — Preguntas frecuentes de Voyager' },
    provides: {
      en: 'Official answers used as a factual cross-check for this site\u2019s FAQ.',
      zh: '官方解答，用於與本站常見問題進行事實交叉比對。',
      es: 'Respuestas oficiales usadas como contraste para las preguntas frecuentes de este sitio.',
    },
    url: 'https://voyager.jpl.nasa.gov/frequently-asked-questions/',
  },
];

export default function SourcesPage() {
  const zh = useZh();
  const es = useEs();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="sources"
        title={bi('Sources & References', '資料來源與參考', 'Fuentes y referencias')}
        intro={bi(
          'Every figure on this website can be traced to a public reference. Historical facts and mission status come from NASA and JPL; distance and speed figures are derived from their published baselines and labelled as estimates.',
          '本站的每個數字都能追溯到公開的參考資料。歷史事實與任務現況來自 NASA／JPL；距離與速度則根據其公布的基準推導，並標示為估計值。',
          'Cada cifra de este sitio puede rastrearse hasta una referencia pública. Los hechos históricos y el estado de la misión provienen de NASA y JPL; las distancias y velocidades se derivan de sus líneas base publicadas y se etiquetan como estimaciones.',
        )}
      />

      <BiSection
        id="official"
        kicker={bi('Primary references', '主要參考資料', 'Referencias principales')}
        title={bi('NASA / JPL sources', 'NASA / JPL 來源', 'Fuentes de NASA / JPL')}
      >
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-space-900/70 font-mono text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">{zh ? '來源' : es ? 'Fuente' : 'Source'}</th>
                <th className="px-4 py-3">{zh ? '提供的資訊' : es ? 'Qué proporciona' : 'What it provides'}</th>
                <th className="px-4 py-3">{zh ? '連結' : es ? 'Enlace' : 'Link'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {SOURCES.map((s) => (
                <tr key={s.url} className="align-top">
                  <td className="px-4 py-3 font-medium text-slate-100">
                    {zh ? s.name.zh : es ? s.name.es : s.name.en}
                  </td>
                  <td className="px-4 py-3 leading-relaxed text-slate-400">
                    {zh ? s.provides.zh : es ? s.provides.es : s.provides.en}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-cyan-300 hover:text-cyan-200"
                    >
                      {zh ? '前往' : es ? 'Visitar' : 'Visit'} <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BiSection>

      <BiSection
        id="methodology"
        kicker={bi('Methodology', '方法', 'Metodología')}
        title={bi('How we use these sources', '我們如何使用這些來源', 'Cómo usamos estas fuentes')}
      >
        <p className="max-w-4xl leading-relaxed text-slate-300">
          {zh ? (
            <>
              我們不會複製 NASA 的頁面。歷史事件皆以本站自己的文字重新撰寫，並與上述參考資料交叉比對。
              「即時追蹤器」上的距離，則以 NASA/JPL 基準值與探測器公布速度向前推估——完整公式請見
              <a href={pageUrl('how-it-works')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                資料與計算方法
              </a>
              頁。
            </>
          ) : es ? (
            <>
              No copiamos páginas de la NASA. Los hechos históricos se redactan con nuestras
              propias palabras y se contrastan con las referencias anteriores. Las distancias del
              rastreador en vivo se proyectan con las líneas base de NASA/JPL — la fórmula completa
              está en la página de{' '}
              <a href={pageUrl('how-it-works')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                datos y metodología
              </a>
              .
            </>
          ) : (
            <>
              We do not copy NASA pages. Historical events are re-written in our own words and
              cross-checked against the references above. Distances on the live trackers use the
              NASA/JPL baseline values projected forward — the exact formula is documented on the{' '}
              <a href={pageUrl('how-it-works')} className="text-cyan-300 underline decoration-cyan-500/40 underline-offset-2 hover:text-cyan-200">
                How It Works
              </a>{' '}
              page.
            </>
          )}
        </p>
      </BiSection>

      <div className="my-6 rounded-xl border border-cyan-500/40 bg-cyan-500/5 p-5 text-sm leading-relaxed text-cyan-100">
        <p className="mb-1.5 font-semibold text-white">
          {zh ? '圖片版權' : es ? 'Crédito de imágenes' : 'Image credit'}
        </p>
        <p>
          {zh
            ? '本站使用的 NASA/JPL-Caltech 圖片，會在使用的當下標示出處，且僅從 NASA 官方圖庫連結。'
            : es
              ? 'Las imágenes de NASA/JPL-Caltech usadas en este sitio se acreditan en el punto de uso y se enlazan solo desde las bibliotecas oficiales de la NASA.'
              : 'NASA/JPL-Caltech imagery used on this site is credited at the point of use and hotlinked only from official NASA image sources.'}
        </p>
      </div>

      <RelatedLinks items={['about', 'how-it-works', 'faq', 'updates', 'contact']} />
    </div>
  );
}

