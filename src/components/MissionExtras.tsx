/**
 * Shared blocks for the spacecraft pages: the NASA-reported instrument
 * status list and the per-page "sources & method" note with the
 * independence disclaimer.
 */

import type { SpacecraftId } from '../types/voyager';
import { INSTRUMENTS, INSTRUMENT_STATUS, INSTRUMENT_STATUS_AS_OF } from '../constants/voyagerData';
import { pageUrl } from '../constants/site';
import { txt, useLang } from './content';
import { ExternalLinkIcon } from './icons';

export function InstrumentStatusList({ id }: { id: SpacecraftId }) {
  const locale = useLang();
  const accent = id === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300';
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {INSTRUMENT_STATUS[id].map((s) => {
          const inst = INSTRUMENTS[s.code];
          return (
            <li key={s.code} className="rounded-xl border border-slate-800 bg-space-900/40 p-4">
              <p className="flex items-center justify-between font-mono text-xs font-bold">
                <span className={s.on ? accent : 'text-slate-400'}>{s.code}</span>
                <span className={s.on ? 'text-emerald-300' : 'text-slate-400'}>
                  {s.on
                    ? txt({ en: 'Operating', zh: '運作中', es: 'En funcionamiento' }, locale)
                    : `${txt({ en: 'Off since', zh: '關閉於', es: 'Apagado desde' }, locale)} ${s.off}`}
                </span>
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-200">{txt(inst.name, locale)}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{txt(inst.description, locale)}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-slate-400">
        {txt(
          {
            en: `Status as reported by NASA up to ${INSTRUMENT_STATUS_AS_OF}. Only the fields-and-particles instruments relevant to the interstellar mission are listed; the cameras and planetary instruments were switched off decades ago.`,
            zh: `依 NASA 截至 ${INSTRUMENT_STATUS_AS_OF} 公布的狀態。此處只列出與星際任務相關的場與粒子儀器；相機與行星觀測儀器早在數十年前就已關閉。`,
            es: `Estado según la NASA hasta el ${INSTRUMENT_STATUS_AS_OF}. Solo se listan los instrumentos de campos y partículas relevantes para la misión interestelar; las cámaras y los instrumentos planetarios se apagaron hace décadas.`,
          },
          locale,
        )}{' '}
        <a
          href="https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2"
        >
          NASA <ExternalLinkIcon className="h-3 w-3" />
        </a>
      </p>
    </div>
  );
}

export function SourcesNote({ links }: { links: { label: string; url: string }[] }) {
  const locale = useLang();
  return (
    <aside className="mt-10 rounded-2xl border border-slate-700/60 bg-space-900/40 p-5 text-sm leading-relaxed text-slate-300">
      <h2 className="mb-2 text-lg font-bold text-white">
        {txt({ en: 'Sources and method for this page', zh: '本頁的資料來源與方法', es: 'Fuentes y método de esta página' }, locale)}
      </h2>
      <p>
        {txt(
          {
            en: 'Mission dates and events are summarised in our own words from the NASA/JPL references below. The distance, speed and light-time figures in the tracker are this site’s calculated estimates from JPL Horizons data — see',
            zh: '任務日期與事件係依下列 NASA/JPL 參考資料，以本站自己的文字整理。追蹤器中的距離、速度與光行時間，是本站以 JPL Horizons 資料計算的估計值——詳見',
            es: 'Las fechas y eventos se resumen con nuestras palabras a partir de las referencias de NASA/JPL de abajo. Las distancias, velocidades y tiempos de luz del rastreador son estimaciones calculadas por este sitio con datos de JPL Horizons; ver',
          },
          locale,
        )}{' '}
        <a href={pageUrl('how-it-works')} className="text-cyan-300 underline underline-offset-2">
          {txt({ en: 'How It Works', zh: '運作原理', es: 'Cómo funciona' }, locale)}
        </a>
        .
      </p>
      <ul className="mt-3 space-y-1">
        {links.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200">
              {l.label} <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-400">
        {txt(
          {
            en: 'Voyager Tracker is an independent, unofficial educational project. It is not affiliated with, endorsed by, or sponsored by NASA or JPL, and its estimates are not official mission telemetry.',
            zh: '「航海家號追蹤器」是獨立、非官方的教育專案，與 NASA 或 JPL 無關，亦未獲其背書或贊助；本站的估計值並非官方任務遙測。',
            es: 'El Rastreador Voyager es un proyecto educativo independiente y no oficial, sin afiliación, respaldo ni patrocinio de la NASA o JPL; sus estimaciones no son telemetría oficial.',
          },
          locale,
        )}
      </p>
    </aside>
  );
}

/** Small page-specific Q&A list (plain details/summary). */
export function PageQA({ items }: { items: { q: { en: string; zh: string; es: string }; a: { en: string; zh: string; es: string } }[] }) {
  const locale = useLang();
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <details key={it.q.en} className="rounded-xl border border-slate-800 bg-space-900/40">
          <summary className="cursor-pointer p-4 font-medium text-slate-100 hover:text-cyan-300">{txt(it.q, locale)}</summary>
          <p className="border-t border-slate-800 px-4 py-3 text-sm leading-relaxed text-slate-300">{txt(it.a, locale)}</p>
        </details>
      ))}
    </div>
  );
}
