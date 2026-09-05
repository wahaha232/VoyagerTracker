/**
 * TrackerSection — reusable live-telemetry block.
 *
 * Keeps the original Tracker functionality intact (per-spacecraft telemetry
 * cards, interactive 3D model, 2D heliocentric trajectory map) and adds the
 * "What you're seeing" explainer that the content plan requires, so readers
 * understand what each number means.
 *
 * Locale (EN / 繁中) only affects the telemetry UI labels.
 */

import { useMemo, useState } from 'react';
import type { Locale, SpacecraftId } from '../types/voyager';
import { SPACECRAFT_META, TRANSLATIONS } from '../constants/voyagerData';
import { useVoyagerLive } from '../hooks/useVoyagerLive';
import TrackerCard from './TrackerCard';
import Voyager3D from './Voyager3D';
import VoyagerCanvas from './VoyagerCanvas';

interface TrackerSectionProps {
  /** Which spacecraft to show: both (home) or a single probe (voyager pages). */
  ids: SpacecraftId[];
  /** Large heading shown above the tracker. */
  title: string;
  /** Short paragraph under the heading. */
  intro: string;
  /** Show the 2D trajectory map. */
  showMap?: boolean;
  /** Show the interactive 3D model beside the map. */
  showModel?: boolean;
}

const EXPLAINER: { term: string; detail: string }[] = [
  {
    term: 'Distance from Earth',
    detail:
      'How far the spacecraft is from our planet right now, shown in AU and kilometres. Because the probes are moving away from us, this number grows every day.',
  },
  {
    term: 'Distance from Sun',
    detail:
      'The same measurement taken from the Sun instead of from Earth. Earth orbits about 1 AU from the Sun, so the two distances are usually close to each other.',
  },
  {
    term: 'Current velocity',
    detail:
      'The cruising speed of the probe relative to the Sun in km/s. The spacecraft coast on momentum from their 1977 launches and planetary flybys — no engines are firing.',
  },
  {
    term: 'Mission elapsed time',
    detail:
      'How long each spacecraft has been operating since launch. Both Voyagers are in their fifth decade of service and still return data.',
  },
  {
    term: 'Direction / trajectory',
    detail:
      'Where each probe is heading. Voyager 1 left the planets’ orbital plane toward the north; Voyager 2 travels below it toward the south, so the two spacecraft are exploring different regions of interstellar space.',
  },
  {
    term: 'Data update frequency',
    detail:
      'Distance values are interpolated in your browser about ten times per second from a fixed baseline, so the odometers tick smoothly without polling an API.',
  },
  {
    term: 'Data source',
    detail:
      'Baseline distances and speeds are anchored to NASA/JPL Voyager mission references. Every value on this page is a calculated estimate, not live NASA telemetry.',
  },
];

/** Approximate elapsed time since an ISO launch date, in years. */
function elapsedYearsLabel(launchDate: string): string {
  const ms = Date.now() - Date.parse(launchDate);
  const years = ms / (365.2425 * 24 * 3600 * 1000);
  if (years < 2) return `${Math.max(1, Math.floor(years * 12))} months`;
  return `${Math.floor(years)} years`;
}

export default function TrackerSection({
  ids,
  title,
  intro,
  showMap = true,
  showModel = false,
}: TrackerSectionProps) {
  const [locale, setLocale] = useState<Locale>('en-US');
  const telemetry = useVoyagerLive();
  const t = useMemo(() => TRANSLATIONS[locale], [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en-US' ? 'zh-TW' : 'en-US'));
  };

  return (
    <section aria-label={title} className="mb-14">
      {/* Heading */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-1 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live data · calculated estimates
          </p>
          <h2 className="neon-text text-2xl font-bold tracking-wide text-white sm:text-3xl">{title}</h2>
        </div>
        <button
          type="button"
          onClick={toggleLocale}
          className="rounded-lg border border-cyan-500/30 bg-space-900/80 px-3 py-2 font-mono text-xs font-medium text-slate-300 transition-all hover:border-cyan-400/60 hover:text-white"
        >
          {locale === 'en-US' ? '繁中' : 'EN'}
        </button>
      </div>
      <p className="mb-6 max-w-4xl leading-relaxed text-slate-300">{intro}</p>

      {/* Mission elapsed strip */}
      <div className="mb-6 flex flex-wrap gap-2">
        {ids.map((id) => {
          const meta = SPACECRAFT_META[id];
          return (
            <span
              key={id}
              className="rounded-full border px-3 py-1.5 font-mono text-xs"
              style={{ color: meta.accent, borderColor: `${meta.accent}55`, backgroundColor: `${meta.accent}12` }}
            >
              {meta.name} — mission elapsed ≈ {elapsedYearsLabel(meta.launchDate)}
            </span>
          );
        })}
      </div>

      {/* What you're seeing */}
      <div className="hud-panel mb-8 rounded-2xl p-5 sm:p-6">
        <h3 className="mb-1 text-lg font-bold tracking-wide text-white">What you&rsquo;re seeing</h3>
        <p className="mb-4 text-sm text-slate-400">
          A short guide to every number on this page — what it measures and how to read it.
        </p>
        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {EXPLAINER.map((item) => (
            <div key={item.term} className="border-l-2 border-cyan-500/40 pl-3">
              <dt className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">
                {item.term}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-300">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Telemetry cards */}
      <div className={`grid gap-6 ${ids.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {ids.map((id) => (
          <TrackerCard
            key={id}
            meta={SPACECRAFT_META[id]}
            telemetry={telemetry[id]}
            locale={locale}
            t={t}
          />
        ))}
      </div>

      {/* 2D trajectory map (+ optional 3D model) */}
      {showMap && (
        <div className={`mt-8 ${showModel ? 'grid gap-6 lg:grid-cols-[1fr_1fr]' : ''}`}>
          <div className="min-w-0">
            <VoyagerCanvas telemetry={telemetry} locale={locale} t={t} />
          </div>
          {showModel && (
            <div>
              <h3 className="mb-3 text-lg font-semibold tracking-wide text-white">
                {t.model.title}
              </h3>
              <p className="mb-3 font-mono text-xs text-slate-400">{t.model.subtitle}</p>
              <div className="hud-panel relative h-[320px] w-full overflow-hidden rounded-2xl lg:h-[420px]">
                <Voyager3D />
                <div className="pointer-events-none absolute bottom-3 left-4 rounded-md border border-cyan-500/20 bg-space-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300/70">
                  {t.model.dragHint}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Data transparency note */}
      <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-wide text-slate-500">
        Estimates anchored to a fixed ephemeris baseline from NASA/JPL mission references and
        advanced by the probes&rsquo; velocities — see the{' '}
        <a href="how-it-works.html" className="text-cyan-400 hover:text-cyan-300">
          data &amp; methodology page
        </a>{' '}
        for details. Not official NASA data.
      </p>
    </section>
  );
}

