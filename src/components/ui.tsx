/**
 * Small shared UI building blocks used across the informational pages:
 * page headers with breadcrumbs, section wrappers, callouts and the
 * "Related Voyager Information" link panel.
 */

import type { ReactNode } from 'react';
import { LinkArrow } from './icons';
import { PAGES, pageUrl, type PageKey } from '../constants/site';

/** Breadcrumb-style page header with a unique H1 and short intro paragraph. */
export function ArticleHeader({
  current,
  parent,
  title,
  intro,
}: {
  /** Key of the current page (used for the final breadcrumb label). */
  current: PageKey;
  /** Optional parent page shown before the current page. */
  parent?: PageKey;
  title: string;
  intro?: string;
}) {
  const items: { name: string; href?: string }[] = [{ name: 'Home', href: pageUrl('home') }];
  if (parent) {
    items.push({ name: PAGES[parent].label, href: pageUrl(parent) });
  }
  items.push({ name: PAGES[current].label });

  return (
    <header className="animate-fade-in mb-10">
      <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[11px] uppercase tracking-widest text-cyan-400/80">
        {items.map((item, i) => (
          <span key={`${item.name}-${i}`}>
            {i > 0 && <span className="mx-2 text-slate-600">/</span>}
            {item.href ? (
              <a href={item.href} className="transition-colors hover:text-cyan-300">
                {item.name}
              </a>
            ) : (
              <span className="text-slate-300">{item.name}</span>
            )}
          </span>
        ))}
      </nav>
      <h1 className="neon-text max-w-4xl text-3xl font-black leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{intro}</p>
      )}
    </header>
  );
}

/** A titled content section with an H2 heading. */
export function Section({
  title,
  kicker,
  lead,
  id,
  children,
}: {
  title: string;
  kicker?: string;
  lead?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      {kicker && (
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90">
          {kicker}
        </p>
      )}
      <h2 className="mb-4 text-2xl font-bold tracking-wide text-white sm:text-3xl">{title}</h2>
      {lead && <p className="mb-6 max-w-3xl text-slate-300/90">{lead}</p>}
      {children}
    </section>
  );
}

/** A highlighted note box (used for disclaimers and key facts). */
export function Callout({
  title,
  tone = 'cyan',
  children,
}: {
  title?: string;
  tone?: 'cyan' | 'emerald' | 'amber';
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    cyan: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-100',
    emerald: 'border-emerald-500/40 bg-emerald-500/5 text-emerald-100',
    amber: 'border-amber-400/40 bg-amber-400/5 text-amber-100',
  };
  return (
    <div className={`my-6 rounded-xl border p-5 text-sm leading-relaxed ${tones[tone]}`}>
      {title && <p className="mb-1.5 font-semibold text-white">{title}</p>}
      {children}
    </div>
  );
}

/** A row of quick "related page" link cards shown at the bottom of pages. */
export function RelatedLinks({
  title = 'Related Voyager Information',
  items,
}: {
  title?: string;
  items: PageKey[];
}) {
  return (
    <aside className="hud-panel mt-12 rounded-2xl p-6">
      <h2 className="mb-4 text-lg font-bold tracking-wide text-white">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((key) => {
          const page = PAGES[key];
          return (
            <a
              key={key}
              href={pageUrl(key)}
              className="group flex items-start justify-between gap-3 rounded-xl border border-slate-700/50 bg-space-950/50 p-4 transition-all hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(34,211,238,0.12)]"
            >
              <span>
                <span className="block font-semibold text-slate-100 group-hover:text-cyan-300">
                  {page.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                  {page.description}
                </span>
              </span>
              <LinkArrow className="mt-1 h-4 w-4 shrink-0 text-cyan-400 transition-transform group-hover:translate-x-1" />
            </a>
          );
        })}
      </div>
    </aside>
  );
}

/** Two-column text + optional aside layout used by the long-form pages. */
export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 lg:grid-cols-[1fr_340px]">{children}</div>;
}
