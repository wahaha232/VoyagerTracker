/**
 * Footer — brand summary, navigation groups, legal links, the
 * independence disclaimer and the (build-generated) last-updated date.
 */

import { pageLabel, pageUrl, type PageKey } from '../constants/site';
import { useI18n } from '../i18n/context';
import type { Locale } from '../types/voyager';
import { ExternalLinkIcon, GithubIcon } from './icons';

const GROUPS: { title: Record<Locale, string>; keys: PageKey[] }[] = [
  {
    title: { 'en-US': 'Spacecraft', 'zh-TW': '太空船', es: 'Naves' },
    keys: ['voyager-1', 'voyager-2', 'compare', 'timeline'],
  },
  {
    title: { 'en-US': 'Learn', 'zh-TW': '認識任務', es: 'Aprende' },
    keys: ['mission', 'discoveries', 'golden-record', 'why-voyager-matters', 'tools'],
  },
  {
    title: { 'en-US': 'Project', 'zh-TW': '關於本站', es: 'Proyecto' },
    keys: ['how-it-works', 'sources', 'faq', 'updates', 'about'],
  },
  {
    title: { 'en-US': 'Legal', 'zh-TW': '法律資訊', es: 'Legal' },
    keys: ['privacy', 'terms', 'contact'],
  },
];

export default function Footer() {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';
  const es = locale === 'es';

  const brand = zh ? '航海家號追蹤器' : es ? 'Rastreador Voyager' : 'Voyager Tracker';
  const about = zh
    ? '一個獨立的教育專案：持續計算 NASA 航海家一號與二號的估計位置，並以比較、計算工具與白話解說介紹它們的任務與科學。'
    : es
      ? 'Un proyecto educativo independiente: calcula continuamente la posición estimada de las Voyager 1 y 2 de la NASA y explica su misión y su ciencia con comparaciones, calculadoras y textos claros.'
      : 'An independent educational project that continuously calculates the estimated positions of NASA’s Voyager 1 and Voyager 2 and explains their mission and science through comparisons, calculators and plain-language guides.';

  return (
    <footer className="relative z-10 mt-16 border-t border-cyan-500/20 bg-space-950/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="neon-text mb-3 text-lg font-bold tracking-[0.12em] text-white">{brand}</p>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">{about}</p>
            <a
              href="https://github.com/wahaha232/VoyagerTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-space-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              {zh ? '原始碼與問題回報' : es ? 'Código y reporte de incidencias' : 'Source code & issue tracker'}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          {GROUPS.map((g) => (
            <nav key={g.title['en-US']} aria-label={g.title[locale]}>
              <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{g.title[locale]}</h2>
              <ul className="space-y-2">
                {g.keys.map((key) => (
                  <li key={key}>
                    <a href={pageUrl(key)} className="text-sm text-slate-300 transition-colors hover:text-cyan-300">
                      {pageLabel(key, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-space-900/50 p-5">
          <p className="text-xs leading-relaxed text-slate-400">
            {zh ? (
              <>
                「航海家號追蹤器」是獨立、非官方的教育專案，與美國國家航空暨太空總署（NASA）或噴射推進實驗室（JPL）沒有任何關聯，也未獲其背書或贊助。
                本站顯示的距離、速度與其他太空船數值為計算或估計值，不應被視為 NASA 官方任務遙測。資料依據請見
                <a href={pageUrl('sources')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">資料來源</a>
                與
                <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">運作原理</a>。
              </>
            ) : es ? (
              <>
                El Rastreador Voyager es un proyecto educativo independiente y no oficial. No está afiliado, respaldado
                ni patrocinado por la NASA ni por el Jet Propulsion Laboratory (JPL). Las distancias, velocidades y demás
                datos de las naves son calculados o estimados y no deben interpretarse como telemetría oficial de la NASA.
                Consulta{' '}
                <a href={pageUrl('sources')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">Fuentes</a> y{' '}
                <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">Cómo funciona</a>.
              </>
            ) : (
              <>
                Voyager Tracker is an independent, unofficial educational project. It is not affiliated with, endorsed
                by, or sponsored by NASA or the Jet Propulsion Laboratory (JPL). Displayed distance, velocity, and other
                spacecraft information is calculated or estimated and should not be interpreted as official NASA mission
                telemetry. See{' '}
                <a href={pageUrl('sources')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">Sources</a> and{' '}
                <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">How It Works</a>.
              </>
            )}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-800/70 pt-5 font-mono text-[11px] tracking-wider text-slate-400 sm:flex-row">
          <p>
            © {__BUILD_DATE__.slice(0, 4)} {brand} — {zh ? '獨立教育專案' : es ? 'proyecto educativo independiente' : 'independent educational project'}
          </p>
          <p>
            {zh ? '網站最後更新' : es ? 'Última actualización del sitio' : 'Site last updated'}:{' '}
            <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
