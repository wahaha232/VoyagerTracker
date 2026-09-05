/**
 * Trilingual content primitives (English / 繁體中文 / Español).
 *
 * Each translatable text is a `Bi` object { en, zh, es }; components pick the
 * right string based on the shared locale from useI18n(). When an `es`
 * translation is missing it falls back to English, so content can be added
 * incrementally without breaking the site.
 */

import type { ReactNode } from 'react';
import { useI18n } from '../i18n/context';
import type { Locale } from '../types/voyager';
import type { PageKey } from '../constants/site';
import { ArticleHeader as UiArticleHeader, Section as UiSection } from './ui';

export type Bi = { en: string; zh: string; es?: string };

/** Build a trilingual text (Spanish optional for incremental work). */
export const bi = (en: string, zh: string, es?: string): Bi =>
  es ? { en, zh, es } : { en, zh };

/** Current locale from the shared provider. */
export function useLang(): Locale {
  return useI18n().locale;
}

/** True only when the locale is Traditional Chinese. */
export function useZh(): boolean {
  return useI18n().locale === 'zh-TW';
}

/** True only when the locale is Spanish. */
export function useEs(): boolean {
  return useI18n().locale === 'es';
}

/** Pick the right text for the current locale (Spanish falls back to English). */
export function txt(value: Bi, locale: Locale): string {
  if (locale === 'zh-TW') return value.zh;
  if (locale === 'es') return value.es ?? value.en;
  return value.en;
}

/** Render the correct language of a Bi text. */
export function BiText({ value, className }: { value: Bi; className?: string }) {
  const locale = useLang();
  return <span className={className}>{txt(value, locale)}</span>;
}

export function Paragraph({ value, className }: { value: Bi; className?: string }) {
  const locale = useLang();
  return (
    <p className={className ?? 'max-w-4xl leading-relaxed text-slate-300'}>
      {txt(value, locale)}
    </p>
  );
}

/** Unordered list of trilingual items. */
export function Bullets({ items, className }: { items: Bi[]; className?: string }) {
  const locale = useLang();
  return (
    <ul className={className ?? 'max-w-4xl list-disc space-y-2 pl-5 text-slate-300'}>
      {items.map((item, i) => (
        <li key={`${item.en}-${i}`}>{txt(item, locale)}</li>
      ))}
    </ul>
  );
}

/** Two-column fact/definition grid (term + detail). */
export function FactGrid({ items }: { items: { term: Bi; detail: Bi }[] }) {
  const locale = useLang();
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">
            {txt(item.term, locale)}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
            {txt(item.detail, locale)}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Title + description cards in a responsive grid. */
export function CardGrid({ items }: { items: { title: Bi; text: Bi }[] }) {
  const locale = useLang();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-slate-800 bg-space-900/40 p-5">
          <h3 className="mb-2 font-semibold text-white">{txt(item.title, locale)}</h3>
          <p className="text-sm leading-relaxed text-slate-400">{txt(item.text, locale)}</p>
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
  const locale = useLang();
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
          <p className="mt-0.5 font-semibold text-slate-100">{txt(event.label, locale)}</p>
          <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-300">
            {txt(event.text, locale)}
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
  const locale = useLang();
  return (
    <UiArticleHeader
      current={current}
      parent={parent}
      title={txt(title, locale)}
      intro={intro ? txt(intro, locale) : undefined}
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
  const locale = useLang();
  return (
    <UiSection
      id={id}
      title={txt(title, locale)}
      kicker={kicker ? txt(kicker, locale) : undefined}
      lead={lead ? txt(lead, locale) : undefined}
    >
      {children}
    </UiSection>
  );
}
