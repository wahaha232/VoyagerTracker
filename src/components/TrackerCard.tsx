/**
 * TrackerCard — one spacecraft's calculated position, with context.
 *
 * Shows the estimated distance from Earth and the Sun (AU / km / miles),
 * one-way and round-trip light time, speed, mission elapsed time, a scale
 * comparison and the instrument status reported by NASA. Every live value
 * is labelled as an estimate.
 */

import { Rocket, Sun, Globe, Timer, Gauge, CalendarDays, Sparkles, Ruler } from 'lucide-react';
import type { ReactNode } from 'react';
import type { LiveTelemetry, Locale, SpacecraftMeta, Translation } from '../types/voyager';
import { INSTRUMENTS, INSTRUMENT_STATUS, INSTRUMENT_STATUS_AS_OF } from '../constants/voyagerData';
import { formatNumber } from '../hooks/useVoyagerLive';
import { KM_PER_MILE, PLANET_AU, elapsedYearsDays, splitDuration } from '../lib/context';
import SourceBadge from './SourceBadge';

interface TrackerCardProps {
  meta: SpacecraftMeta;
  telemetry: LiveTelemetry;
  locale: Locale;
  t: Translation;
}

type Tri = { en: string; zh: string; es: string };
const pick = (v: Tri, locale: Locale) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

const L = {
  roundTrip: { en: 'Round trip (command + reply)', zh: '往返（下指令＋收到回覆）', es: 'Ida y vuelta (orden + respuesta)' },
  kmh: { en: 'km/h', zh: '公里/小時', es: 'km/h' },
  rangeRate: {
    en: 'Earth distance changing by',
    zh: '與地球距離的變化率',
    es: 'La distancia a la Tierra cambia a',
  },
  elapsed: { en: 'Mission elapsed', zh: '任務已執行', es: 'Tiempo de misión' },
  years: { en: 'years', zh: '年', es: 'años' },
  days: { en: 'days', zh: '天', es: 'días' },
  totalDays: { en: 'days in flight', zh: '天飛行日數', es: 'días de vuelo' },
  scale: { en: 'Scale', zh: '尺度比較', es: 'Escala' },
  neptune: {
    en: '× Neptune’s distance from the Sun',
    zh: '倍海王星與太陽的距離',
    es: '× la distancia de Neptuno al Sol',
  },
  earthSun: {
    en: '× the Earth–Sun distance',
    zh: '倍日地距離',
    es: '× la distancia Tierra–Sol',
  },
  instrumentsNote: {
    en: 'Status as reported by NASA',
    zh: '依 NASA 公布的狀態，截至',
    es: 'Estado según NASA, a fecha de',
  },
  on: { en: 'On', zh: '運作中', es: 'Encendido' },
  off: { en: 'Off since', zh: '關閉於', es: 'Apagado desde' },
  estimateNote: {
    en: 'Calculated estimate — not NASA telemetry',
    zh: '計算估計值——非 NASA 遙測',
    es: 'Estimación calculada — no es telemetría de la NASA',
  },
  miles: { en: 'miles', zh: '英里', es: 'millas' },
  basis: { en: 'from JPL Horizons data', zh: '依 JPL Horizons 資料', es: 'con datos de JPL Horizons' },
  calcAt: { en: 'Calculated at', zh: '計算時間', es: 'Calculado a las' },
  arrives: { en: 'A signal sent now arrives on', zh: '此刻送出的訊號抵達時間：', es: 'Una señal enviada ahora llega el' },
};

/** UTC time (and optionally date) for display. */
function utcClock(ms: number, withDate = false): string {
  const iso = new Date(ms).toISOString();
  return withDate ? `${iso.slice(0, 10)} ${iso.slice(11, 16)}` : iso.slice(11, 19);
}

/** A single metric tile with an icon, label, value and optional detail lines. */
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
  sub?: string[];
  accent: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-700/50 bg-space-950/50 p-3">
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ color: accent, backgroundColor: `${accent}1a` }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-slate-400">{label}</p>
        <p className="break-words font-mono text-base font-semibold text-slate-100 sm:text-lg">{value}</p>
        {sub?.map((line) => (
          <p key={line} className="break-words font-mono text-xs text-slate-400">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function TrackerCard({ meta, telemetry, locale, t }: TrackerCardProps) {
  const accent = meta.accent;
  const one = splitDuration(telemetry.lightTimeSeconds);
  const round = splitDuration(telemetry.lightTimeSeconds * 2);
  const hms = (d: { days: number; hours: number; minutes: number; seconds: number }) =>
    `${d.days * 24 + d.hours}${t.metrics.hours} ${d.minutes}${t.metrics.minutes} ${d.seconds}${t.metrics.seconds}`;
  const elapsed = elapsedYearsDays(Date.parse(`${meta.launchDate}T12:00:00Z`), telemetry.timestampMs);
  const rr = telemetry.rangeRateKmS;
  const status = INSTRUMENT_STATUS[meta.id];

  return (
    <article className="hud-panel flex flex-col overflow-hidden rounded-2xl" style={{ borderColor: `${accent}40` }}>
      <header className={`bg-gradient-to-r ${meta.gradient} border-b border-slate-700/50 px-5 py-4`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ color: accent, backgroundColor: `${accent}22` }}
              aria-hidden="true"
            >
              <Rocket size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide text-white">{meta.name}</h3>
              <p className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                <span
                  className="inline-block h-2 w-2 animate-pulse-glow rounded-full"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                {t.status.interstellar}
              </p>
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
            style={{ color: accent, backgroundColor: `${accent}1a` }}
            title={pick(L.estimateNote, locale)}
          >
            {t.dashboard.live}
          </span>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2 px-5 pt-4 text-[11px] text-slate-400">
        <SourceBadge kind="calculated" note={pick(L.basis, locale)} />
        <span>
          {pick(L.calcAt, locale)} <time dateTime={new Date(telemetry.timestampMs).toISOString()}>{utcClock(telemetry.timestampMs)}</time> UTC
        </span>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-3 p-5 sm:grid-cols-2">
        <MetricRow
          icon={<Globe size={18} />}
          label={t.metrics.distanceFromEarth}
          value={`${formatNumber(telemetry.earthDistanceAu, locale, 3)} ${t.metrics.au}`}
          sub={[
            `${formatNumber(telemetry.earthDistanceKm, locale, 0)} ${t.metrics.km}`,
            `${formatNumber(telemetry.earthDistanceKm / KM_PER_MILE, locale, 0)} ${pick(L.miles, locale)}`,
          ]}
          accent={accent}
        />
        <MetricRow
          icon={<Sun size={18} />}
          label={t.metrics.distanceFromSun}
          value={`${formatNumber(telemetry.sunDistanceAu, locale, 3)} ${t.metrics.au}`}
          sub={[`${formatNumber(telemetry.sunDistanceKm, locale, 0)} ${t.metrics.km}`]}
          accent={accent}
        />
        <MetricRow
          icon={<Timer size={18} />}
          label={t.metrics.lightTime}
          value={hms(one)}
          sub={[`${pick(L.roundTrip, locale)}: ${hms(round)}`, `${pick(L.arrives, locale)} ${utcClock(telemetry.timestampMs + telemetry.lightTimeSeconds * 1000, true)} UTC`]}
          accent={accent}
        />
        <MetricRow
          icon={<Gauge size={18} />}
          label={t.metrics.cruiseSpeed}
          value={`${formatNumber(telemetry.cruiseSpeedKmS, locale, 2)} ${t.metrics.kmPerSec}`}
          sub={[
            `≈ ${formatNumber(telemetry.cruiseSpeedKmS * 3600, locale, 0)} ${pick(L.kmh, locale)}`,
            `${pick(L.rangeRate, locale)} ${rr >= 0 ? '+' : '−'}${formatNumber(Math.abs(rr), locale, 2)} ${t.metrics.kmPerSec}`,
          ]}
          accent={accent}
        />
        <MetricRow
          icon={<CalendarDays size={18} />}
          label={pick(L.elapsed, locale)}
          value={`${elapsed.years} ${pick(L.years, locale)} ${elapsed.days} ${pick(L.days, locale)}`}
          sub={[`${formatNumber(elapsed.totalDays, locale, 0)} ${pick(L.totalDays, locale)}`]}
          accent={accent}
        />
        <MetricRow
          icon={<Ruler size={18} />}
          label={pick(L.scale, locale)}
          value={`${formatNumber(telemetry.sunDistanceAu / PLANET_AU.neptune, locale, 1)} ${pick(L.neptune, locale)}`}
          sub={[`${formatNumber(telemetry.sunDistanceAu, locale, 0)} ${pick(L.earthSun, locale)}`]}
          accent={accent}
        />
      </div>

      <div className="border-t border-slate-700/50 px-5 py-4">
        <p className="mb-2"><SourceBadge kind="official" note="NASA/JPL" /></p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-space-950/40 px-3 py-2">
            <CalendarDays size={14} className="text-slate-400" aria-hidden="true" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{t.metrics.launchDate}</p>
              <p className="font-mono text-sm text-slate-200">{meta.launchDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-700/40 bg-space-950/40 px-3 py-2">
            <Sparkles size={14} className="text-slate-400" aria-hidden="true" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{t.metrics.interstellarEntry}</p>
              <p className="font-mono text-sm text-slate-200">{meta.interstellarEntryDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/50 px-5 py-4">
        <p className="flex flex-wrap items-center gap-2 font-mono text-sm font-semibold text-slate-200">{t.metrics.activeInstruments} <SourceBadge kind="official" note="NASA" /></p>
        <p className="mb-3 font-mono text-[11px] text-slate-400">
          {pick(L.instrumentsNote, locale)} {INSTRUMENT_STATUS_AS_OF}
        </p>
        <ul className="space-y-2">
          {status.map((s) => {
            const inst = INSTRUMENTS[s.code];
            return (
              <li key={s.code} className="flex items-start gap-3 rounded-lg border border-slate-700/40 bg-space-950/30 p-2.5">
                <span
                  className="mt-0.5 w-12 shrink-0 rounded-md px-1.5 py-0.5 text-center font-mono text-[11px] font-bold"
                  style={s.on ? { color: accent, backgroundColor: `${accent}1a` } : { color: '#94a3b8', backgroundColor: '#1e293b' }}
                >
                  {s.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200">
                    {pick(inst.name, locale)}{' '}
                    <span className={`font-mono text-[11px] ${s.on ? 'text-emerald-300' : 'text-slate-400'}`}>
                      · {s.on ? pick(L.on, locale) : `${pick(L.off, locale)} ${s.off}`}
                    </span>
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">{pick(inst.description, locale)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
