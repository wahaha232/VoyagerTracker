/**
 * Header — sticky site navigation with a language switcher
 * (English / 繁體中文 / Español). Navigation labels follow the locale.
 */

import { useEffect, useState } from 'react';
import { ALL_PAGES, HEADER_NAV, pageLabel, pageUrl, type PageKey } from '../constants/site';
import { useI18n } from '../i18n/context';
import type { Locale } from '../types/voyager';
import { CloseIcon, MenuIcon, SatelliteIcon } from './icons';

interface HeaderProps {
  current: PageKey;
}

const LANG_OPTIONS: { value: Locale; label: string }[] = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'es', label: 'Español' },
];

export default function Header({ current }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useI18n();
  const es = locale === 'es';
  const zh = locale === 'zh-TW';

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const subtitle = es
    ? 'Voyager 1 y 2 — datos en vivo e información de la misión'
    : zh
      ? '航海家一號與二號 · 即時資料與任務資訊'
      : 'Voyager 1 & 2 — Live Data & Mission Information';

  const select = (
    <label className="sr-only" htmlFor="lang-select">
      {es ? 'Idioma' : zh ? '語言' : 'Language'}
    </label>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-space-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        {/* Brand */}
        <a
          href={pageUrl('home')}
          className="flex items-center gap-3"
          aria-label={es ? 'Inicio del Rastreador Voyager' : zh ? '航海家號追蹤器首頁' : 'Voyager Tracker home'}
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-space-950 shadow-lg shadow-cyan-500/30">
            <SatelliteIcon className="h-6 w-6" />
            <span className="absolute -inset-1 -z-10 rounded-xl bg-cyan-500/25 blur-md" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="neon-text block text-base font-bold tracking-[0.15em] text-white">
              {es ? 'Rastreador Voyager' : zh ? '航海家號追蹤器' : 'Voyager Tracker'}
            </span>
            <span className="hidden font-mono text-[11px] tracking-wider text-cyan-300/70 sm:block">
              {subtitle}
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
              className={`rounded-lg px-2 py-2 text-[12px] font-medium transition-colors ${
                current === key
                  ? 'bg-cyan-500/10 text-cyan-300'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {pageLabel(key, locale)}
            </a>
          ))}
        </nav>

        {/* Language + mobile menu controls */}
        <div className="flex items-center gap-2">
          {select}
          <select
            id="lang-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="h-9 rounded-lg border border-cyan-500/30 bg-space-900/80 px-2 font-mono text-xs font-semibold text-slate-200 outline-none transition-colors hover:border-cyan-400/60 focus:border-cyan-400"
            aria-label={es ? 'Idioma' : zh ? '選擇語言' : 'Choose language'}
          >
            {LANG_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
                  {pageLabel(key, locale)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}


