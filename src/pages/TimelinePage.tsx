/**
 * TimelinePage — /timeline.html  (EN / 繁中 / Español)
 *
 * Interactive mission timeline: filter by spacecraft, expand any event to
 * see what happened, the mission context, why it matters and its source.
 * Uses native <details> so every event's text is present in the HTML and
 * works without JavaScript; the filters are a progressive enhancement.
 */

import { useState } from 'react';
import { pageUrl } from '../constants/site';
import { RelatedLinks } from '../components/ui';
import { ExternalLinkIcon } from '../components/icons';
import { BiArticleHeader, bi, txt, useLang } from '../components/content';
import { historicalSunAu } from '../lib/ephemeris';

import { EVENTS, type EventCraft as Craft } from '../data/events';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

const CRAFT_LABEL: Record<Craft, Tri> = {
  voyager1: T('Voyager 1', '航海家一號', 'Voyager 1'),
  voyager2: T('Voyager 2', '航海家二號', 'Voyager 2'),
  both: T('Both spacecraft', '兩艘探測器', 'Ambas naves'),
};
const CRAFT_COLOR: Record<Craft, string> = { voyager1: 'bg-cyan-400', voyager2: 'bg-emerald-400', both: 'bg-violet-400' };

export default function TimelinePage() {
  const locale = useLang();
  const [filter, setFilter] = useState<'all' | 'voyager1' | 'voyager2'>('all');
  const shown = EVENTS.filter((e) => filter === 'all' || e.craft === filter || e.craft === 'both');
  const fmtDate = (d: string) =>
    new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(Date.parse(`${d}T00:00:00Z`));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <BiArticleHeader
        current="timeline"
        title={bi('Voyager mission timeline', '航海家任務時間軸', 'Cronología de la misión Voyager')}
        intro={bi(
          `${EVENTS.length} key moments from 1977 to today. Open any event to see what happened, the context around it, why it matters and where the information comes from. Where helpful, the spacecraft’s distance from the Sun on that date is shown from JPL Horizons data.`,
          `從 1977 年至今的 ${EVENTS.length} 個關鍵時刻。展開任一事件，即可看到發生了什麼、背景脈絡、為何重要以及資料出處；並依 JPL Horizons 資料標示探測器當天與太陽的距離。`,
          `${EVENTS.length} momentos clave desde 1977 hasta hoy. Abre cualquier evento para ver qué pasó, su contexto, por qué importa y de dónde procede la información; cuando procede, se muestra la distancia al Sol ese día según JPL Horizons.`,
        )}
      />

      <div role="group" aria-label={txt(T('Filter by spacecraft', '依探測器篩選', 'Filtrar por nave'), locale)} className="mb-6 flex flex-wrap gap-2">
        {(['all', 'voyager1', 'voyager2'] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`min-h-[40px] rounded-full border px-4 text-sm font-semibold transition-colors ${
              filter === f ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200' : 'border-slate-600 text-slate-300 hover:border-cyan-400/60 hover:text-white'
            }`}
          >
            {f === 'all' ? txt(T('All events', '全部事件', 'Todos'), locale) : txt(CRAFT_LABEL[f], locale)}
          </button>
        ))}
        <span className="self-center text-sm text-slate-400" aria-live="polite">
          {shown.length} / {EVENTS.length}
        </span>
      </div>

      <ol className="relative space-y-3 border-l border-slate-700/70 pl-6">
        {shown.map((e, i) => {
          const craftForDistance = e.craft === 'both' ? 'voyager1' : e.craft;
          const au = e.upcoming ? null : historicalSunAu(craftForDistance, Date.parse(`${e.date}T12:00:00Z`));
          return (
            <li key={`${e.date}-${e.craft}`} className="relative">
              <span className={`absolute -left-[31px] top-5 h-3 w-3 rounded-full ring-4 ring-space-950 ${CRAFT_COLOR[e.craft]}`} aria-hidden="true" />
              <details open={i === 0} className="group rounded-xl border border-slate-800 bg-space-900/40 open:border-cyan-500/40">
                <summary className="cursor-pointer p-4">
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                    <time dateTime={e.date}>{fmtDate(e.date)}</time> · {txt(CRAFT_LABEL[e.craft], locale)}
                  </span>
                  <span className="mt-1 block font-semibold text-slate-100 group-hover:text-cyan-300">{txt(e.title, locale)}</span>
                </summary>
                <dl className="grid gap-3 border-t border-slate-800 p-4 text-sm leading-relaxed sm:grid-cols-[140px_1fr]">
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('What happened', '發生了什麼', 'Qué pasó'), locale)}</dt>
                  <dd className="text-slate-300">{txt(e.what, locale)}</dd>
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Context', '背景脈絡', 'Contexto'), locale)}</dt>
                  <dd className="text-slate-300">{txt(e.context, locale)}</dd>
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Why it matters', '為何重要', 'Por qué importa'), locale)}</dt>
                  <dd className="text-slate-300">{txt(e.why, locale)}</dd>
                  {au !== null && (
                    <>
                      <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Distance from Sun', '與太陽距離', 'Distancia al Sol'), locale)}</dt>
                      <dd className="font-mono text-slate-300">
                        ≈ {new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(au)} AU
                        {e.craft === 'both' ? ` (${txt(CRAFT_LABEL.voyager1, locale)})` : ''} · JPL Horizons
                      </dd>
                    </>
                  )}
                  <dt className="font-mono text-xs uppercase tracking-wider text-cyan-300">{txt(T('Source', '資料來源', 'Fuente'), locale)}</dt>
                  <dd>
                    <a href={e.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
                      {e.source.label} <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  </dd>
                </dl>
              </details>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-50">
        <p className="mb-1 font-semibold text-white">{txt(T('About these dates', '關於這些日期', 'Sobre estas fechas'), locale)}</p>
        <p>
          {txt(
            T(
              'Encounter dates are closest-approach dates in UTC. Interstellar crossings are dates later identified in the data, not the dates they were announced. Descriptions are written by this site from the linked NASA/JPL material. Distances are interpolated from monthly JPL samples and are approximate around flybys.',
              '飛掠日期為最接近日（UTC）。穿越星際空間的日期，是事後從資料中確認的日期，而非宣布日期。說明文字由本站依所附 NASA/JPL 資料撰寫。距離由 JPL 月度資料內插而得，在飛掠前後僅為近似值。',
              'Las fechas de encuentros son las de máximo acercamiento (UTC). Los cruces interestelares son las fechas identificadas después en los datos, no las de su anuncio. Los textos los redacta este sitio a partir del material enlazado de NASA/JPL. Las distancias se interpolan de muestras mensuales de JPL y son aproximadas cerca de los sobrevuelos.',
            ),
            locale,
          )}{' '}
          <a href={pageUrl('compare')} className="text-amber-200 underline underline-offset-2">
            {txt(T('See these events on the distance chart', '在距離圖表上查看這些事件', 'Ver estos eventos en el gráfico'), locale)}
          </a>
          .
        </p>
      </div>

      <RelatedLinks items={['mission', 'compare', 'voyager-1', 'voyager-2', 'discoveries']} />
    </div>
  );
}
