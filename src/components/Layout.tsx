/**
 * Layout — shared page chrome: fixed cinematic overlays (starfield,
 * scanlines, vignette), sticky header, main content slot and footer.
 * Wraps every page in the LocaleProvider so language choice is shared.
 */

import type { ReactNode } from 'react';
import type { PageKey } from '../constants/site';
import { LocaleProvider } from '../i18n/context';
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
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-space-950"
        >
          Skip to main content
        </a>

        <Header current={current} />

        <main id="main-content" className="relative z-10 flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </LocaleProvider>
  );
}

