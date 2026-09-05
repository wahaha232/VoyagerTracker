/**
 * Footer — brand summary, navigation groups, the required independence
 * disclaimer, and a note about where data comes from.
 */

import { PAGES, pageUrl, type PageKey } from '../constants/site';
import { ExternalLinkIcon, GithubIcon } from './icons';

const GROUP_1: PageKey[] = ['voyager-1', 'voyager-2', 'mission', 'timeline'];
const GROUP_2: PageKey[] = ['discoveries', 'golden-record', 'how-it-works', 'faq'];
const GROUP_3: PageKey[] = ['about', 'sources', 'updates', 'privacy', 'contact'];

function FooterLinkColumn({ title, keys }: { title: string; keys: PageKey[] }) {
  return (
    <div>
      <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/80">
        {title}
      </h2>
      <ul className="space-y-2">
        {keys.map((key) => (
          <li key={key}>
            <a href={pageUrl(key)} className="text-sm text-slate-400 transition-colors hover:text-cyan-300">
              {PAGES[key].label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-cyan-500/20 bg-space-950/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand / about */}
          <div>
            <p className="neon-text mb-3 text-lg font-bold tracking-[0.12em] text-white">Voyager Tracker</p>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              An independent, educational website that tracks NASA&rsquo;s Voyager 1 and
              Voyager 2 spacecraft and explains their mission, science and history.
            </p>
            <a
              href="https://github.com/wahaha232/VoyagerTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-space-900/70 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/60 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              Source &amp; issue tracker
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <FooterLinkColumn title="Spacecraft" keys={GROUP_1} />
          <FooterLinkColumn title="Learn" keys={GROUP_2} />
          <FooterLinkColumn title="Project" keys={GROUP_3} />
        </div>

        {/* Independence disclaimer (explicit requirement) */}
        <div className="mt-10 rounded-xl border border-slate-800 bg-space-900/50 p-5">
          <p className="text-xs leading-relaxed text-slate-500">
            Voyager Tracker is an independent educational project and is not affiliated with or
            endorsed by NASA or JPL. Distances and speeds shown on this site are calculated
            estimates based on published mission and ephemeris data; they are not live NASA
            telemetry. Historical facts are drawn from NASA/JPL public records (see the{' '}
            <a href={pageUrl('sources')} className="text-cyan-400 hover:text-cyan-300">
              Sources
            </a>{' '}
            page for details).
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-800/70 pt-5 font-mono text-[11px] tracking-wider text-slate-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Voyager Tracker — made for science education.</p>
          <p>
            <a href={pageUrl('privacy')} className="transition-colors hover:text-cyan-400">
              Privacy
            </a>
            <span className="mx-2">·</span>
            <a href={pageUrl('contact')} className="transition-colors hover:text-cyan-400">
              Contact
            </a>
            <span className="mx-2">·</span>
            <a href={pageUrl('about')} className="transition-colors hover:text-cyan-400">
              About
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
