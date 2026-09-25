/**
 * Layout — shared page chrome: fixed cinematic overlays (starfield,
 * scanlines, vignette), sticky header, main content slot and footer.
 * Wraps every page in the LocaleProvider so language choice is shared.
 */

import type { ReactNode } from 'react';
import type { PageKey } from '../constants/site';
import { LocaleProvider, useI18n } from '../i18n/context';
import Footer from './Footer';
import Header from './Header';

export default function Layout({
  current,
  children,
}: {
  current: PageKey;
  children: ReactNode;
}) {
  return (
    <LocaleProvider>
      <div className="relative flex min-h-screen flex-col bg-space-950 text-slate-100">
        {/* Sci-fi cinematic overlays */}
        <div className="starfield" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />

        {/* Background glow accents */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-56 left-[10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_65%)]" />
          <div className="absolute -bottom-40 right-[10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_65%)]" />
        </div>

        <SkipLink />

        <Header current={current} />

        <main id="main-content" className="relative z-10 flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </LocaleProvider>
  );
}


/** Keyboard users' first stop: jump past the header to the page content. */
function SkipLink() {
  const { locale } = useI18n();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-space-950"
    >
      {locale === 'zh-TW' ? '跳至主要內容' : locale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
    </a>
  );
}
