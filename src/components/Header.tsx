/**
 * Header — sticky site navigation. The full navigation is available as a
 * slide-down mobile menu; on xl screens it renders as inline links so the
 * informational pages are easy to discover (and crawlable as real URLs).
 */

import { useEffect, useState } from 'react';
import { ALL_PAGES, HEADER_NAV, PAGES, pageUrl, type PageKey } from '../constants/site';
import { CloseIcon, MenuIcon, SatelliteIcon } from './icons';

interface HeaderProps {
  current: PageKey;
}

export default function Header({ current }: HeaderProps) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu if the user resizes to the desktop layout.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-space-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand */}
        <a href={pageUrl('home')} className="flex items-center gap-3" aria-label="Voyager Tracker home">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-space-950 shadow-lg shadow-cyan-500/30">
            <SatelliteIcon className="h-6 w-6" />
            <span className="absolute -inset-1 -z-10 rounded-xl bg-cyan-500/25 blur-md" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="neon-text block text-base font-bold tracking-[0.15em] text-white">
              Voyager Tracker
            </span>
            <span className="hidden font-mono text-[11px] tracking-wider text-cyan-300/70 sm:block">
              Voyager 1 &amp; 2 — Live Data &amp; Mission Information
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {HEADER_NAV.map((key) => (
            <a
              key={key}
              href={pageUrl(key)}
              aria-current={current === key ? 'page' : undefined}
              className={`rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                current === key
                  ? 'bg-cyan-500/10 text-cyan-300'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {PAGES[key].label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-space-900/80 text-cyan-300 transition-colors hover:border-cyan-400/60 hover:text-white xl:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main (mobile)"
          className="border-t border-cyan-500/15 bg-space-950/95 backdrop-blur-md xl:hidden"
        >
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-4 sm:px-6">
            {ALL_PAGES.map((key) => (
              <li key={key}>
                <a
                  href={pageUrl(key)}
                  onClick={() => setOpen(false)}
                  aria-current={current === key ? 'page' : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    current === key
                      ? 'bg-cyan-500/10 text-cyan-300'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {PAGES[key].label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
