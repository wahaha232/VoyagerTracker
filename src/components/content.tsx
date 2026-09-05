/**
 * Small bilingual content primitives used by every page.
 *
 * Each translatable text is a `Bi` object { en, zh }; components pick the
 * right string based on the shared locale from useI18n().
 */

import type { ReactNode } from 'react';
import { useI18n } from '../i18n/context';
import type { PageKey } from '../constants/site';
import { ArticleHeader as UiArticleHeader, Section as UiSection } from './ui';

export type Bi = { en: string; zh: string };

/** Build a bilingual text quickly. */
export const bi = (en: string, zh: string): Bi => ({ en, zh });

export function useZh(): boolean {
  return useI18n().locale === 'zh-TW';
}

/** Render the correct language of a Bi text. */
export function BiText({ value, className }: { value: Bi; className?: string }) {
  const zh = useZh();
  return <span className={className}>{zh ? value.zh : value.en}</span>;
}

export function Paragraph({ value, className }: { value: Bi; className?: string }) {
  const zh = useZh();
  return (
    <p className={className ?? 'max-w-4xl leading-relaxed text-slate-300'}>
      {zh ? value.zh : value.en}
    </p>
  );
}

/** Unordered list of bilingual items. */
export function Bullets({
  items,
  className,
}: {
  items: Bi[];
  className?: string;
}) {
  const zh = useZh();
  return (
    <ul className={className ?? 'max-w-4xl list-disc space-y-2 pl-5 text-slate-300'}>
      {items.map((item, i) => (
        <li key={`${zh ? item.zh : item.en}-${i}`}>{zh ? item.zh : item.en}</li>
      ))}
    </ul>
  );
}

/** Two-column fact/definition grid (term + detail). */
export function FactGrid({ items }: { items: { term: Bi; detail: Bi }[] }) {
  const zh = useZh();
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
            {zh ? item.term.zh : item.term.en}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            {zh ? item.detail.zh : item.detail.en}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Title + description cards in a responsive grid. */
export function CardGrid({ items }: { items: { title: Bi; text: Bi }[] }) {
  const zh = useZh();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
          <h3 className="mb-2 font-semibold text-white">{zh ? item.title.zh : item.title.en}</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            {zh ? item.text.zh : item.text.en}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Timeline-style events. */
export function EventList({
  events,
}: {
  events: { date: string; label: Bi; text: Bi }[];
}) {
  const zh = useZh();
  return (
    <ol className="relative space-y-5 border-l border-slate-700/70 pl-6">
      {events.map((event, i) => (
        <li key={i} className="relative">
          <span
            className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-space-950"
            aria-hidden="true"
          />
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
            {event.date}
          </p>
          <p className="mt-0.5 font-semibold text-slate-100">
            {zh ? event.label.zh : event.label.en}
          </p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-300">
            {zh ? event.text.zh : event.text.en}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Generic children wrapper to attach bilingual text around links. */
export function Bilingual({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const isZh = useZh();
  return <>{isZh ? zh : en}</>;
}

/**
 * Bilingual versions of the shared page chrome (page header + content
 * section) so individual pages only describe their content as Bi texts.
 */

export function BiArticleHeader({
  current,
  parent,
  title,
  intro,
}: {
  current: PageKey;
  parent?: PageKey;
  title: Bi;
  intro?: Bi;
}) {
  const zh = useZh();
  return (
    <UiArticleHeader
      current={current}
      parent={parent}
      title={zh ? title.zh : title.en}
      intro={intro ? (zh ? intro.zh : intro.en) : undefined}
    />
  );
}

export function BiSection({
  id,
  title,
  kicker,
  lead,
  children,
}: {
  id?: string;
  title: Bi;
  kicker?: Bi;
  lead?: Bi;
  children: ReactNode;
}) {
  const zh = useZh();
  return (
    <UiSection
      id={id}
      title={zh ? title.zh : title.en}
      kicker={kicker ? (zh ? kicker.zh : kicker.en) : undefined}
      lead={lead ? (zh ? lead.zh : lead.en) : undefined}
    >
      {children}
    </UiSection>
  );
}

