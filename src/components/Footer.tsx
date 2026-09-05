/**
 * Footer — brand summary, navigation groups, the required independence
 * disclaimer, and a note about where data comes from (EN / 繁中).
 */

import { pageLabel, pageUrl, type PageKey } from '../constants/site';
import { useI18n } from '../i18n/context';
import { ExternalLinkIcon, GithubIcon } from './icons';

const GROUP_1: PageKey[] = ['voyager-1', 'voyager-2', 'mission', 'timeline'];
const GROUP_2: PageKey[] = ['discoveries', 'golden-record', 'how-it-works', 'faq'];
const GROUP_3: PageKey[] = ['about', 'sources', 'updates', 'privacy', 'contact'];

export default function Footer() {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';

  const groupTitles: Record<string, string> = zh
    ? { s1: '太空船', s2: '認識任務', s3: '關於本站' }
    : { s1: 'Spacecraft', s2: 'Learn', s3: 'Project' };

  return (
    <footer className="relative z-10 mt-16 border-t border-cyan-500/20 bg-space-950/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand / about */}
          <div>
            <p className="neon-text mb-3 text-lg font-bold tracking-[0.12em] text-white">
              {zh ? '航海家號追蹤器' : 'Voyager Tracker'}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {zh
                ? '一個獨立、教育性質的網站，即時追蹤 NASA 航海家一號與二號探測器，並介紹它們的任務、科學與歷史。'
                : 'An independent, educational website that tracks NASA\u2019s Voyager 1 and Voyager 2 spacecraft and explains their mission, science and history.'}
            </p>
            <a
              href="https://github.com/wahaha232/VoyagerTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-space-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              {zh ? '原始碼與問題回報' : 'Source & issue tracker'}
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <FooterLinkColumn title={groupTitles.s1} keys={GROUP_1} zh={zh} />
          <FooterLinkColumn title={groupTitles.s2} keys={GROUP_2} zh={zh} />
          <FooterLinkColumn title={groupTitles.s3} keys={GROUP_3} zh={zh} />
        </div>

        {/* Independence disclaimer (explicit requirement) */}
        <div className="mt-10 rounded-xl border border-slate-800 bg-space-900/50 p-5">
          <p className="text-xs leading-relaxed text-slate-500">
            {zh ? (
              <>
                「航海家號追蹤器」是一個獨立的教育專案，與 NASA 或 JPL 並無關聯，也未獲得其背書。
                本站顯示的距離與速度是根據已公開的任務與星曆資料計算的估計值，並非 NASA 的即時遙測。
                歷史事實引用自 NASA/JPL 的公開紀錄（詳見
                <a href={pageUrl('sources')} className="text-cyan-400 hover:text-cyan-300">
                  資料來源
                </a>
                頁）。
              </>
            ) : (
              <>
                Voyager Tracker is an independent educational project and is not affiliated with or
                endorsed by NASA or JPL. Distances and speeds shown on this site are calculated
                estimates based on published mission and ephemeris data; they are not live NASA
                telemetry. Historical facts are drawn from NASA/JPL public records (see the{' '}
                <a href={pageUrl('sources')} className="text-cyan-400 hover:text-cyan-300">
                  Sources
                </a>{' '}
                page for details).
              </>
            )}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-800/70 pt-5 font-mono text-[11px] tracking-wider text-slate-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()}{' '}
            {zh ? '航海家號追蹤器 — 為科學教育而建。' : 'Voyager Tracker — made for science education.'}
          </p>
          <p>
            <a href={pageUrl('privacy')} className="transition-colors hover:text-cyan-400">
              {zh ? '隱私政策' : 'Privacy'}
            </a>
            <span className="mx-2">·</span>
            <a href={pageUrl('contact')} className="transition-colors hover:text-cyan-400">
              {zh ? '聯絡我們' : 'Contact'}
            </a>
            <span className="mx-2">·</span>
            <a href={pageUrl('about')} className="transition-colors hover:text-cyan-400">
              {zh ? '關於本站' : 'About'}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, keys, zh }: { title: string; keys: PageKey[]; zh: boolean }) {
  return (
    <div>
      <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/80">
        {title}
      </h2>
      <ul className="space-y-2">
        {keys.map((key) => (
          <li key={key}>
            <a
              href={pageUrl(key)}
              className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
            >
              {pageLabel(key, zh ? 'zh-TW' : 'en-US')}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

