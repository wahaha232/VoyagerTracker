/**
 * Shared form and result styling for the calculators on tools.html.
 */

import type { ReactNode } from 'react';
import type { Locale } from '../../types/voyager';
import { splitDuration } from '../../lib/context';

export const inputCls =
  'min-h-[44px] w-full rounded-lg border border-slate-600 bg-space-900 px-3 font-mono text-sm text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40';
export const chipCls =
  'min-h-[36px] rounded-full border border-slate-600 px-3 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-white';

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Result({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-space-900/60 p-4">
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-1 break-words font-mono text-lg font-semibold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

export const fmtN = (v: number, locale: Locale, d = 2) =>
  Number.isFinite(v) ? new Intl.NumberFormat(locale, { maximumFractionDigits: d }).format(v) : '—';

/** "1 d 23 h 42 min 5 s" style duration. */
export function durationText(seconds: number, locale: Locale) {
  const d = splitDuration(seconds);
  const u = locale === 'zh-TW' ? ['天', '小時', '分', '秒'] : ['d', 'h', 'min', 's'];
  if (seconds < 60) return `${fmtN(seconds, locale, seconds < 1 ? 3 : 2)} ${u[3]}`;
  const parts = [d.days && `${d.days} ${u[0]}`, (d.days || d.hours) && `${d.hours} ${u[1]}`, `${d.minutes} ${u[2]}`, `${d.seconds} ${u[3]}`];
  return parts.filter(Boolean).join(' ');
}

/** Parse a user-entered number; returns null for empty, non-numeric or negative input. */
export function parseNonNegative(raw: string): number | null {
  if (raw.trim() === '') return null;
  const v = Number(raw.replace(/,/g, ''));
  return Number.isFinite(v) && v >= 0 ? v : null;
}

/** Parse "YYYY-MM-DD" as noon UTC, or null. */
export function parseDate(raw: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const ms = Date.parse(`${raw}T12:00:00Z`);
  return Number.isFinite(ms) ? ms : null;
}

/** Format a UTC instant as date + time in UTC and in the visitor's local zone. */
export function bothClocks(ms: number, locale: Locale) {
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return {
    utc: new Intl.DateTimeFormat(locale, { ...opts, timeZone: 'UTC' }).format(ms),
    local: new Intl.DateTimeFormat(locale, opts).format(ms),
  };
}
