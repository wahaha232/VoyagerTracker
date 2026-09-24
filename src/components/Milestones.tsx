/**
 * Milestones — upcoming distance milestones with live countdowns.
 *
 * Dates are solved from this site's model (src/lib/ephemeris.ts). Where
 * NASA has published its own date for the same milestone, both are shown
 * so readers can see how closely the estimate agrees.
 */

import { useMemo } from 'react';
import { useI18n } from '../i18n/context';
import { AU_KM, whenDistanceReaches, type CraftId } from '../lib/ephemeris';
import { LIGHT_DAY_KM, splitDuration } from '../lib/context';
import { useNow } from '../hooks/useVoyagerLive';

type Tri = { en: string; zh: string; es: string };

interface Milestone {
  id: CraftId;
  metric: 'earthKm' | 'sunKm';
  targetKm: number;
  label: Tri;
  why: Tri;
  /** Date published by NASA for the same event, if any. */
  nasaDate?: string;
  nasaUrl?: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'voyager1',
    metric: 'earthKm',
    targetKm: LIGHT_DAY_KM,
    label: { en: 'Voyager 1 is one light-day from Earth', zh: '航海家一號距地球一光日', es: 'La Voyager 1 a un día-luz de la Tierra' },
    why: {
      en: 'A radio command will take a full 24 hours to arrive — the first time any spacecraft has been this far away.',
      zh: '無線電指令需要整整 24 小時才能抵達——這是人造探測器首次到達這麼遠的地方。',
      es: 'Una orden por radio tardará 24 horas completas en llegar: ninguna nave ha estado nunca tan lejos.',
    },
    nasaDate: '2026-11-18',
    nasaUrl: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/',
  },
  {
    id: 'voyager2',
    metric: 'sunKm',
    targetKm: 150 * AU_KM,
    label: { en: 'Voyager 2 reaches 150 AU from the Sun', zh: '航海家二號抵達距太陽 150 AU', es: 'La Voyager 2 alcanza 150 UA del Sol' },
    why: {
      en: 'Five times Neptune’s distance, travelling south of the planets’ plane.',
      zh: '相當於海王星距離的五倍，位於行星軌道面南方。',
      es: 'Cinco veces la distancia de Neptuno, al sur del plano de los planetas.',
    },
  },
  {
    id: 'voyager1',
    metric: 'sunKm',
    targetKm: 175 * AU_KM,
    label: { en: 'Voyager 1 reaches 175 AU from the Sun', zh: '航海家一號抵達距太陽 175 AU', es: 'La Voyager 1 alcanza 175 UA del Sol' },
    why: {
      en: 'Roughly 26 billion km — about 53 AU beyond where it crossed the heliopause in 2012.',
      zh: '約 262 億公里——比它 2012 年穿越日球層頂的位置再往外約 53 AU。',
      es: 'Unos 26 000 millones de km: unas 53 UA más allá de donde cruzó la heliopausa en 2012.',
    },
  },
  {
    id: 'voyager1',
    metric: 'sunKm',
    targetKm: 200 * AU_KM,
    label: { en: 'Voyager 1 reaches 200 AU from the Sun', zh: '航海家一號抵達距太陽 200 AU', es: 'La Voyager 1 alcanza 200 UA del Sol' },
    why: {
      en: 'A symbolic mark the probe will pass coasting whether or not its radio is still on by then.',
      zh: '無論屆時無線電是否仍在運作，探測器都會靠慣性滑行越過這個象徵性的里程碑。',
      es: 'Una marca simbólica que la sonda cruzará por inercia, siga o no encendida su radio.',
    },
  },
  {
    id: 'voyager2',
    metric: 'earthKm',
    targetKm: LIGHT_DAY_KM,
    label: { en: 'Voyager 2 is one light-day from Earth', zh: '航海家二號距地球一光日', es: 'La Voyager 2 a un día-luz de la Tierra' },
    why: {
      en: 'Voyager 2 is slower, so it reaches the same signal-delay milestone years after its twin.',
      zh: '航海家二號飛得較慢，因此會比孿生探測器晚好幾年才到達同樣的訊號延遲里程碑。',
      es: 'La Voyager 2 es más lenta, así que alcanza el mismo hito años después que su gemela.',
    },
  },
];

const pick = (v: Tri, locale: string) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

export default function Milestones({ only }: { only?: CraftId }) {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';
  const es = locale === 'es';
  const now = useNow(1000);
  // Solve dates once per mount; they do not change within a visit.
  const solved = useMemo(() => {
    const start = Date.now();
    return MILESTONES.filter((m) => !only || m.id === only)
      .map((m) => ({ ...m, at: whenDistanceReaches(m.id, m.metric, m.targetKm, start) }))
      .filter((m): m is Milestone & { at: number } => m.at !== null)
      .sort((a, b) => a.at - b.at)
      .slice(0, 3);
  }, [only]);

  if (solved.length === 0) return null;
  const fmtDate = (ms: number) =>
    new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(ms);

  return (
    <section aria-labelledby="milestones-heading" className="rounded-2xl border border-slate-700/60 bg-space-900/50 p-5">
      <h3 id="milestones-heading" className="mb-1 text-base font-bold text-white">
        {zh ? '即將到來的里程碑' : es ? 'Próximos hitos' : 'Upcoming milestones'}
      </h3>
      <p className="mb-4 text-xs leading-relaxed text-slate-400">
        {zh
          ? '日期由本站模型推算（UTC）；若 NASA 已公布同一事件的日期，會並列顯示以供比對。'
          : es
            ? 'Fechas resueltas con el modelo de este sitio (UTC); si la NASA publicó la fecha del mismo evento, se muestra al lado para comparar.'
            : 'Dates are solved from this site’s model (UTC). Where NASA has published a date for the same event, it is shown alongside for comparison.'}
      </p>
      <ol className="space-y-3">
        {solved.map((m) => {
          const left = splitDuration((m.at - now) / 1000);
          return (
            <li key={m.label.en} className="rounded-xl border border-slate-700/50 bg-space-950/50 p-4">
              <p className={`font-semibold ${m.id === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300'}`}>{pick(m.label, locale)}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{pick(m.why, locale)}</p>
              <p className="mt-2 font-mono text-xs text-slate-300">
                {zh ? '模型推算' : es ? 'Modelo' : 'Model'}: {fmtDate(m.at)}
                {m.nasaDate && (
                  <>
                    {' · '}
                    <a href={m.nasaUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
                      NASA
                    </a>
                    : {fmtDate(Date.parse(`${m.nasaDate}T00:00:00Z`))}
                  </>
                )}
              </p>
              <p className="mt-1 font-mono text-sm text-white" aria-live="off">
                {left.days} {zh ? '天' : es ? 'd' : 'd'} {String(left.hours).padStart(2, '0')}:{String(left.minutes).padStart(2, '0')}:
                {String(left.seconds).padStart(2, '0')} {zh ? '後' : es ? 'restantes' : 'to go'}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
