/**
 * TrackerCard — individual spacecraft telemetry card.
 *
 * Displays distance from Sun/Earth (AU + km), one-way light time,
 * cruising speed, mission status, and active instruments for a single
 * Voyager spacecraft. Styled as a sci-fi HUD telemetry panel.
 */

import { Rocket, Sun, Globe, Timer, Gauge, Activity, CalendarDays, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import type { LiveTelemetry, Locale, SpacecraftMeta, Translation } from '../types/voyager';
import {
  decomposeLightTime,
  formatAu,
  formatKm,
  formatNumber,
} from '../hooks/useVoyagerLive';

interface TrackerCardProps {
  meta: SpacecraftMeta;
  telemetry: LiveTelemetry;
  locale: Locale;
  t: Translation;
}

/** A single metric row with an icon, label, and value. */
function MetricRow({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-xl border border-slate-700/50 bg-space-950/50 p-3 transition-all hover:border-slate-500/60 hover:shadow-[0_0_12px_rgba(34,211,238,0.1)]">
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ color: accent, backgroundColor: `${accent}1a`, boxShadow: `0 0 10px ${accent}22` }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="font-mono text-base font-semibold text-slate-100 sm:text-lg">{value}</p>
        {sub && <p className="font-mono text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

export default function TrackerCard({ meta, telemetry, locale, t }: TrackerCardProps) {
  const { hours, minutes, seconds } = decomposeLightTime(telemetry.lightTimeSeconds);
  const accent = meta.accent;

  return (
    <article
      className="hud-panel flex flex-col overflow-hidden rounded-2xl"
      style={{ borderColor: `${accent}40` }}
    >
      {/* Header */}
      <header
        className={`bg-gradient-to-r ${meta.gradient} border-b border-slate-700/50 px-5 py-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ color: accent, backgroundColor: `${accent}22`, boxShadow: `0 0 14px ${accent}33` }}
            >
              <Rocket size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide text-white">{meta.name}</h3>
              <p className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                <span
                  className="inline-block h-2 w-2 animate-pulse-glow rounded-full"
                  style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
                />
                {t.status.interstellar}
              </p>
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accent, backgroundColor: `${accent}1a`, boxShadow: `0 0 10px ${accent}22` }}
          >
            {t.dashboard.live}
          </span>
        </div>
      </header>

      {/* Metrics */}
      <div className="grid flex-1 grid-cols-1 gap-3 p-5 sm:grid-cols-2">
        <MetricRow
          icon={<Sun size={18} />}
          label={t.metrics.distanceFromSun}
          value={formatAu(telemetry.sunDistanceAu, locale, t.metrics.au)}
          sub={formatKm(telemetry.sunDistanceKm, locale, t.metrics.km)}
          accent={accent}
        />
        <MetricRow
          icon={<Globe size={18} />}
          label={t.metrics.distanceFromEarth}
          value={formatAu(telemetry.earthDistanceAu, locale, t.metrics.au)}
          sub={formatKm(telemetry.earthDistanceKm, locale, t.metrics.km)}
          accent={accent}
        />
        <MetricRow
          icon={<Timer size={18} />}
          label={t.metrics.lightTime}
          value={`${formatNumber(hours, locale, 0)}${t.metrics.hours} ${formatNumber(
            minutes,
            locale,
            0,
          )}${t.metrics.minutes} ${formatNumber(seconds, locale, 0)}${t.metrics.seconds}`}
          sub={`${formatNumber(telemetry.lightTimeSeconds, locale, 0)} s`}
          accent={accent}
        />
        <MetricRow
          icon={<Gauge size={18} />}
          label={t.metrics.cruiseSpeed}
          value={`${formatNumber(telemetry.cruiseSpeedKmS, locale, 1)} ${t.metrics.kmPerSec}`}
          sub={t.metrics.distanceFromSun}
          accent={accent}
        />
      </div>

      {/* Mission status */}
      <div className="border-t border-slate-700/50 px-5 py-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-sm font-semibold text-slate-200">
          <Activity size={16} style={{ color: accent }} />
          {t.metrics.missionStatus}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-space-950/40 px-3 py-2">
            <CalendarDays size={14} className="text-slate-400" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {t.metrics.launchDate}
              </p>
              <p className="font-mono text-sm text-slate-200">{meta.launchDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-space-950/40 px-3 py-2">
            <Sparkles size={14} className="text-slate-400" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {t.metrics.interstellarEntry}
              </p>
              <p className="font-mono text-sm text-slate-200">{meta.interstellarEntryDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active instruments */}
      <div className="border-t border-slate-700/50 px-5 py-4">
        <p className="mb-3 font-mono text-sm font-semibold text-slate-200">
          {t.metrics.activeInstruments}
        </p>
        <ul className="space-y-2">
          {meta.instruments.map((inst) => (
            <li
              key={inst.code}
              className="group flex items-start gap-3 rounded-lg border border-slate-700/40 bg-space-950/30 p-2.5 transition-colors hover:border-slate-500/60"
            >
              <span
                className="mt-0.5 rounded-md px-2 py-0.5 font-mono text-[11px] font-bold"
                style={{ color: accent, backgroundColor: `${accent}1a`, boxShadow: `0 0 8px ${accent}22` }}
              >
                {inst.code}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-200">{inst.name}</p>
                <p className="text-xs leading-relaxed text-slate-400">{inst.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
