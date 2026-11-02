/**
 * LightDayCountdown — NASA's "Voyager 1: What Is a Light-Day" milestone,
 * with a live countdown that can be read in 24 time zones.
 *
 * The event is one instant (18 Nov 2026, 05:16:07 EST = 10:16:07 UTC),
 * so the countdown is the same everywhere; the selector only changes the
 * clock reading and the formatted target date.
 */

import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/context';
import { useNow, useOnScreen } from '../hooks/useVoyagerLive';
import { splitDuration } from '../lib/context';
import ClientOnly from './ClientOnly';
import { ExternalLinkIcon } from './icons';

export const NASA_LIGHT_DAY_URL =
  'https://science.nasa.gov/mission/voyager/voyager-1/voyager-1-what-is-a-light-day/';

/** 18 Nov 2026, 05:16:07 a.m. EST (UTC−5) — NASA's published crossing time. */
export const LIGHT_DAY_INSTANT_MS = Date.parse('2026-11-18T10:16:07Z');

type Tri = { en: string; zh: string; es: string };

const pick = (v: Tri, locale: string) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

interface Zone {
  tz: string;
  city: Tri;
}

/**
 * 24 standard zones, one per hour from UTC−11 to UTC+12. Each entry names a
 * representative city; the displayed offset is computed for the target date
 * so daylight-saving changes are handled by the browser.
 */
const ZONES: Zone[] = [
  { tz: 'Pacific/Pago_Pago', city: { en: 'Pago Pago', zh: '帕果帕果', es: 'Pago Pago' } },
  { tz: 'Pacific/Honolulu', city: { en: 'Honolulu', zh: '檀香山', es: 'Honolulu' } },
  { tz: 'America/Anchorage', city: { en: 'Anchorage', zh: '安克拉治', es: 'Anchorage' } },
  { tz: 'America/Los_Angeles', city: { en: 'Los Angeles', zh: '洛杉磯', es: 'Los Ángeles' } },
  { tz: 'America/Denver', city: { en: 'Denver', zh: '丹佛', es: 'Denver' } },
  { tz: 'America/Chicago', city: { en: 'Chicago', zh: '芝加哥', es: 'Chicago' } },
  { tz: 'America/New_York', city: { en: 'New York (NASA time)', zh: '紐約（NASA 時間）', es: 'Nueva York (hora NASA)' } },
  { tz: 'America/Halifax', city: { en: 'Halifax', zh: '哈利法克斯', es: 'Halifax' } },
  { tz: 'America/Sao_Paulo', city: { en: 'São Paulo', zh: '聖保羅', es: 'São Paulo' } },
  { tz: 'America/Noronha', city: { en: 'Fernando de Noronha', zh: '費爾南多迪諾羅尼亞', es: 'Fernando de Noronha' } },
  { tz: 'Atlantic/Azores', city: { en: 'Azores', zh: '亞速爾群島', es: 'Azores' } },
  { tz: 'Europe/London', city: { en: 'London', zh: '倫敦', es: 'Londres' } },
  { tz: 'Europe/Paris', city: { en: 'Paris', zh: '巴黎', es: 'París' } },
  { tz: 'Europe/Athens', city: { en: 'Athens', zh: '雅典', es: 'Atenas' } },
  { tz: 'Europe/Moscow', city: { en: 'Moscow', zh: '莫斯科', es: 'Moscú' } },
  { tz: 'Asia/Dubai', city: { en: 'Dubai', zh: '杜拜', es: 'Dubái' } },
  { tz: 'Asia/Karachi', city: { en: 'Karachi', zh: '喀拉蚩', es: 'Karachi' } },
  { tz: 'Asia/Dhaka', city: { en: 'Dhaka', zh: '達卡', es: 'Daca' } },
  { tz: 'Asia/Bangkok', city: { en: 'Bangkok', zh: '曼谷', es: 'Bangkok' } },
  { tz: 'Asia/Taipei', city: { en: 'Taipei', zh: '台北', es: 'Taipéi' } },
  { tz: 'Asia/Tokyo', city: { en: 'Tokyo', zh: '東京', es: 'Tokio' } },
  { tz: 'Australia/Brisbane', city: { en: 'Brisbane', zh: '布里斯本', es: 'Brisbane' } },
  { tz: 'Pacific/Guadalcanal', city: { en: 'Honiara', zh: '荷尼阿拉', es: 'Honiara' } },
  { tz: 'Asia/Kamchatka', city: { en: 'Kamchatka', zh: '堪察加', es: 'Kamchatka' } },
];

/** "GMT-05:00" → "UTC−05:00" for the target instant in a zone. */
function offsetLabel(tz: string, at: number): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(at);
    const name = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
    return name.replace('GMT', 'UTC').replace('-', '−');
  } catch {
    return 'UTC';
  }
}

/** Offset of a zone at the target instant, in minutes east of UTC. */
function offsetMinutes(tz: string, at: number): number {
  const match = /UTC([+−])(\d{2})(?::(\d{2}))?/.exec(offsetLabel(tz, at));
  if (!match) return 0;
  const sign = match[1] === '−' ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] ?? 0));
}

/** The zone from the 24 closest to the visitor's clock, else NASA's. */
function initialZone(): string {
  try {
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (ZONES.some((z) => z.tz === local)) return local;
    const localOffset = offsetMinutes(local || 'UTC', LIGHT_DAY_INSTANT_MS);
    const nearest = ZONES.map((z) => ({
      tz: z.tz,
      distance: Math.abs(offsetMinutes(z.tz, LIGHT_DAY_INSTANT_MS) - localOffset),
    })).sort((a, b) => a.distance - b.distance)[0];
    if (nearest) return nearest.tz;
  } catch {
    // Fall through to NASA's time zone.
  }
  return 'America/New_York';
}

const LABELS: Record<'days' | 'hours' | 'minutes' | 'seconds', Tri> = {
  days: { en: 'Days', zh: '天', es: 'Días' },
  hours: { en: 'Hours', zh: '小時', es: 'Horas' },
  minutes: { en: 'Minutes', zh: '分鐘', es: 'Minutos' },
  seconds: { en: 'Seconds', zh: '秒', es: 'Segundos' },
};

function CountdownWidget() {
  const { locale } = useI18n();
  const [zoneId, setZoneId] = useState<string>(initialZone);
  const [ref, onScreen] = useOnScreen<HTMLDivElement>();
  const now = useNow(1000, onScreen);
  const zone = ZONES.find((z) => z.tz === zoneId) ?? ZONES[6];
  const parts = splitDuration((LIGHT_DAY_INSTANT_MS - now) / 1000);
  const reached = now >= LIGHT_DAY_INSTANT_MS;

  const target = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: zoneId,
      }).format(LIGHT_DAY_INSTANT_MS),
    [locale, zoneId],
  );
  const localNow = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: zoneId,
  }).format(now);
  const zoneOptions = useMemo(
    () =>
      ZONES.map((z) => ({
        tz: z.tz,
        label: `${offsetLabel(z.tz, LIGHT_DAY_INSTANT_MS)} · ${pick(z.city, locale)}`,
      })),
    [locale],
  );

  return (
    <div ref={ref} className="rounded-2xl border border-cyan-500/30 bg-space-950/60 p-4 sm:p-5">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
          <div key={unit} className="rounded-xl border border-slate-700/60 bg-space-900/70 px-1 py-3 text-center">
            <p className="font-mono text-2xl font-bold tabular-nums text-white sm:text-3xl" aria-live="off">
              {unit === 'days' ? parts.days : String(parts[unit]).padStart(2, '0')}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
              {pick(LABELS[unit], locale)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center font-mono text-xs text-cyan-200" aria-live="off">
        {pick(
          reached
            ? {
                en: 'Voyager 1 has reached one light-day.',
                zh: '航海家一號已抵達一光日。',
                es: 'La Voyager 1 ha alcanzado un día-luz.',
              }
            : { en: 'remaining', zh: '剩餘', es: 'restantes' },
          locale,
        )}
      </p>

      <label htmlFor="light-day-zone" className="mt-4 block font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        {pick(
          {
            en: 'Earth’s 24 time zones',
            zh: '地球的 24 個時區',
            es: 'Las 24 zonas horarias de la Tierra',
          },
          locale,
        )}
      </label>
      <select
        id="light-day-zone"
        value={zoneId}
        onChange={(e) => setZoneId(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-cyan-500/30 bg-space-900/90 px-3 font-mono text-xs text-slate-100 outline-none transition-colors hover:border-cyan-400/60 focus:border-cyan-400"
      >
        {zoneOptions.map((opt) => (
          <option key={opt.tz} value={opt.tz}>
            {opt.label}
          </option>
        ))}
      </select>

      <dl className="mt-3 space-y-1.5 text-xs leading-relaxed">
        <div>
          <dt className="font-mono uppercase tracking-widest text-slate-400">
            {pick({ en: 'Target', zh: '目標時刻', es: 'Objetivo' }, locale)}
          </dt>
          <dd className="text-slate-200">{target}</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-widest text-slate-400">
            {pick({ en: 'Now in', zh: '目前時間', es: 'Ahora en' }, locale)} {pick(zone.city, locale)}
          </dt>
          <dd className="font-mono text-slate-300">
            {localNow} <span className="text-cyan-300">{offsetLabel(zoneId, LIGHT_DAY_INSTANT_MS)}</span>
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        {pick(
          {
            en: 'The moment is the same everywhere; only the clock reading changes with the time zone.',
            zh: '這個瞬間在全球都相同，只有時鐘讀數會隨時區改變。',
            es: 'El instante es el mismo en todo el mundo; solo cambia la lectura del reloj según la zona.',
          },
          locale,
        )}
      </p>
    </div>
  );
}

const KEY_FACTS: { label: Tri; value: Tri; note: Tri }[] = [
  {
    label: { en: 'One light-day', zh: '一光日', es: 'Un día-luz' },
    value: {
      en: '25,902,068,356 km',
      zh: '25,902,068,356 公里',
      es: '25 902 068 356 km',
    },
    note: {
      en: '16,094,799,096 miles — the distance light covers in 24 hours.',
      zh: '16,094,799,096 英里——光在 24 小時內走過的距離。',
      es: '16 094 799 096 millas: lo que recorre la luz en 24 horas.',
    },
  },
  {
    label: { en: 'Time in flight', zh: '飛行時間', es: 'Tiempo en vuelo' },
    value: { en: '49 years, 2 months, 11 days', zh: '49 年 2 個月 11 天', es: '49 años, 2 meses y 11 días' },
    note: {
      en: 'Since launch on 5 September 1977 — for the first light-day.',
      zh: '自 1977 年 9 月 5 日發射起算，才走完第一個一光日。',
      es: 'Desde el lanzamiento, el 5 de septiembre de 1977, para el primer día-luz.',
    },
  },
  {
    label: { en: 'Voyager 2', zh: '航海家二號', es: 'Voyager 2' },
    value: { en: 'November 2035', zh: '2035 年 11 月', es: 'Noviembre de 2035' },
    note: {
      en: 'Slower and on a different path, so its one-light-day mark comes nine years later.',
      zh: '速度較慢、路線不同，因此晚九年才到達一光日。',
      es: 'Más lenta y en otra ruta, alcanzará su día-luz nueve años después.',
    },
  },
];

const LIGHT_FACTS: Tri[] = [
  {
    en: 'Light crosses the 384,400 km to the Moon in 1.3 seconds.',
    zh: '光穿越 384,400 公里到月球只需 1.3 秒。',
    es: 'La luz cubre los 384 400 km hasta la Luna en 1,3 segundos.',
  },
  {
    en: 'Sunlight takes about 8 minutes 20 seconds to reach Earth.',
    zh: '陽光約需 8 分 20 秒抵達地球。',
    es: 'La luz del Sol tarda unos 8 minutos y 20 segundos en llegar a la Tierra.',
  },
  {
    en: 'Radio signals take 3–22 minutes between Earth and Mars, depending on their orbits.',
    zh: '地球與火星之間的無線電訊號需 3 到 22 分鐘，取決於兩者的軌道位置。',
    es: 'Las señales de radio tardan de 3 a 22 minutos entre la Tierra y Marte, según sus órbitas.',
  },
  {
    en: 'Neptune is about 4 light-hours and 10 light-minutes from Earth on average.',
    zh: '海王星平均距地球約 4 光時 10 光分。',
    es: 'Neptuno está de media a unas 4 horas-luz y 10 minutos-luz de la Tierra.',
  },
];

export default function LightDayCountdown({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const { locale } = useI18n();
  const compact = variant === 'compact';

  return (
    <section
      aria-labelledby="light-day-heading"
      className={`relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-space-900/70 to-emerald-500/5 p-5 sm:p-6 ${
        compact ? 'mb-10' : 'mb-12'
      }`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
            {pick(
              {
                en: 'NASA feature · 15 October 2026 · One light-day',
                zh: 'NASA 專題 · 2026 年 10 月 15 日 · 一光日',
                es: 'Reportaje NASA · 15 de octubre de 2026 · Un día-luz',
              },
              locale,
            )}
          </p>
          <h2 id="light-day-heading" className="neon-text text-2xl font-black tracking-wide text-white sm:text-3xl">
            {pick(
              {
                en: 'Voyager 1 to Reach One Light-Day',
                zh: '航海家一號即將抵達一光日',
                es: 'La Voyager 1 alcanzará un día-luz',
              },
              locale,
            )}
          </h2>
          <p className="mt-3 leading-relaxed text-slate-200">
            {pick(
              {
                en: 'On Wednesday, Nov. 18, 2026, at 5:16:07 a.m. EST, Voyager 1 becomes the first human-made object to be one light-day from Earth — about 25.9 billion km (16.1 billion miles), the distance light travels in 24 hours.',
                zh: '2026 年 11 月 18 日（星期三）美東時間上午 5:16:07，航海家一號將成為第一個距地球一光日的人造物體——約 259 億公里（161 億英里），也就是光在 24 小時內走過的距離。',
                es: 'El miércoles 18 de noviembre de 2026, a las 5:16:07 a. m. EST, la Voyager 1 será el primer objeto humano a un día-luz de la Tierra: unos 25 900 millones de km (16 100 millones de millas), lo que recorre la luz en 24 horas.',
              },
              locale,
            )}
          </p>

          {!compact && (
            <>
              <p className="mt-3 leading-relaxed text-slate-300">
                {pick(
                  {
                    en: 'The milestone is about distance, not time. It took the spacecraft 49 years, two months and 11 days of flight to get there. Its twin, Voyager 2, is on pace to reach the same mark in November 2035. Voyager 1 is heading toward the star Gliese 445 (AC +79 3888), about 17 light-years away, and will pass within about 1.7 light-years of it in roughly 40,000 years.',
                    zh: '這個里程碑談的是距離，不是時間。太空船飛行了 49 年 2 個月 11 天抵達此處。孿生的航海家二號預計在 2035 年 11 月達到同樣的距離。航海家一號正朝約 17 光年外的恆星格利澤 445（AC +79 3888）前進，約 4 萬年後會從它約 1.7 光年內掠過。',
                    es: 'El hito es de distancia, no de tiempo. A la nave le ha llevado 49 años, dos meses y 11 días de vuelo llegar hasta ahí. Su gemela, la Voyager 2, va camino de alcanzar la misma marca en noviembre de 2035. La Voyager 1 se dirige a la estrella Gliese 445 (AC +79 3888), a unos 17 años luz, y pasará a unos 1,7 años luz de ella dentro de unos 40 000 años.',
                  },
                  locale,
                )}
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
                {LIGHT_FACTS.map((fact) => (
                  <li key={fact.en} className="border-l-2 border-cyan-500/40 pl-3">
                    {pick(fact, locale)}
                  </li>
                ))}
              </ul>
            </>
          )}

          <a
            href={NASA_LIGHT_DAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
          >
            {pick(
              { en: 'Read NASA’s light-day feature', zh: '閱讀 NASA 的一光日專題', es: 'Leer el reportaje de la NASA' },
              locale,
            )}{' '}
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        </div>

        <ClientOnly
          fallback={
            <div className="rounded-2xl border border-cyan-500/30 bg-space-950/60 p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-slate-400">
                {pick({ en: 'Target', zh: '目標時刻', es: 'Objetivo' }, locale)}
              </p>
              <p className="mt-1 text-slate-200">18 Nov 2026 · 05:16:07 EST (UTC−5)</p>
              <p className="mt-3 text-sm text-slate-400">
                {pick(
                  {
                    en: 'The live countdown and the 24-time-zone selector run in your browser.',
                    zh: '即時倒數與 24 時區切換會在您的瀏覽器中執行。',
                    es: 'La cuenta atrás y el selector de 24 zonas se ejecutan en tu navegador.',
                  },
                  locale,
                )}
              </p>
            </div>
          }
        >
          <CountdownWidget />
        </ClientOnly>
      </div>

      {!compact && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {KEY_FACTS.map((fact) => (
            <div key={fact.label.en} className="rounded-xl border border-slate-700/60 bg-space-950/50 p-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-300">{pick(fact.label, locale)}</p>
              <p className="mt-1 font-mono text-sm font-semibold text-white">{pick(fact.value, locale)}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{pick(fact.note, locale)}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
