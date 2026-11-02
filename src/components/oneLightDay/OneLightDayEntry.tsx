/**
 * OneLightDayEntry — a slim, gold-accented shortcut above the existing
 * countdown. It is additive: the full LightDayCountdown section and the
 * tracker are not modified. Clicking the pill opens a lazily loaded modal.
 */

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/context';
import { useNow } from '../../hooks/useVoyagerLive';
import { estimate } from '../../lib/ephemeris';
import ClientOnly from '../ClientOnly';
import { LinkArrow } from '../icons';
import {
  LIGHT_DAY_KM,
  ONE_LIGHT_DAY_INSTANT_MS,
  T,
  countdownParts,
  formatCountdown,
  formatKm,
  pad2,
  pick,
} from './shared';

const OneLightDayModal = lazy(() => import('./OneLightDayModal'));

function EntryCountdown() {
  const { locale } = useI18n();
  const now = useNow(1000);
  const remaining = (ONE_LIGHT_DAY_INSTANT_MS - now) / 1000;
  const parts = countdownParts(remaining);
  const reached = remaining <= 0;
  const remainingKm = reached ? 0 : Math.max(0, LIGHT_DAY_KM - estimate('voyager1', now).earthKm);

  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="font-mono text-sm font-semibold tabular-nums text-white">
        {reached
          ? pick(T('MILESTONE REACHED', '已抵達里程碑', 'HITO ALCANZADO'), locale)
          : formatCountdown(parts.totalSeconds)}
      </span>
      <span className="font-mono text-[11px] tabular-nums text-yellow-200/80">
        · {formatKm(remainingKm, locale)} km {pick(T('to go', '剩餘', 'restantes'), locale)}
      </span>
    </span>
  );
}

export default function OneLightDayEntry() {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback(() => {
    if (window.location.hash !== '#one-light-day') {
      window.history.pushState(null, '', '#one-light-day');
    }
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (window.location.hash === '#one-light-day') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  // Deep link and browser back/forward support.
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === '#one-light-day');
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        id="one-light-day"
        type="button"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group mb-4 flex w-full flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-space-900/80 to-space-950/80 px-4 py-3 text-left transition-all hover:border-yellow-400/60 hover:shadow-[0_0_28px_rgba(250,204,21,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
        </span>

        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-yellow-400 sm:text-xs">
          {pick(
            T(
              'Voyager 1: One-Light-Day Milestone',
              '航海家一號：一光日里程碑',
              'Voyager 1: hito de un día-luz',
            ),
            locale,
          )}
        </span>

        <ClientOnly
          fallback={
            <span className="font-mono text-sm font-semibold text-slate-300">
              T− --d {pad2(0)}h {pad2(0)}m {pad2(0)}s
            </span>
          }
        >
          <EntryCountdown />
        </ClientOnly>

        <span className="ml-auto inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-yellow-300 transition-colors group-hover:border-yellow-400/60 group-hover:text-yellow-200">
          {pick(T('Explore milestone', '點擊查看專區', 'Explorar el hito'), locale)}
          <LinkArrow className="h-3.5 w-3.5" />
        </span>
      </button>

      {open && (
        <Suspense fallback={null}>
          <OneLightDayModal onClose={closeModal} />
        </Suspense>
      )}
    </>
  );
}
