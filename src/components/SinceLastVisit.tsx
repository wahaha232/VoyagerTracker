/**
 * SinceLastVisit — how far the probes moved since the visitor was last here.
 *
 * Stores a single timestamp in localStorage ("vt-last-visit"); nothing
 * else is saved and nothing leaves the browser. The previous timestamp is
 * kept in sessionStorage so it survives page-to-page navigation within
 * the same visit.
 */

import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import { estimate } from '../lib/ephemeris';
import { formatNumber } from '../hooks/useVoyagerLive';

const LAST_KEY = 'vt-last-visit';
const PREV_KEY = 'vt-prev-visit';

function readPrevious(): number | null {
  try {
    const cached = window.sessionStorage.getItem(PREV_KEY);
    if (cached !== null) return cached === '' ? null : Number(cached);
    const last = window.localStorage.getItem(LAST_KEY);
    const prev = last ? Number(last) : null;
    window.sessionStorage.setItem(PREV_KEY, prev ? String(prev) : '');
    window.localStorage.setItem(LAST_KEY, String(Date.now()));
    return prev && Number.isFinite(prev) ? prev : null;
  } catch {
    return null;
  }
}

function humanSpan(ms: number, locale: string): string {
  const days = ms / 86_400_000;
  const hours = ms / 3_600_000;
  const zh = locale === 'zh-TW';
  const es = locale === 'es';
  if (days >= 2) return `${formatNumber(days, locale, 0)} ${zh ? '天' : es ? 'días' : 'days'}`;
  if (hours >= 1) return `${formatNumber(hours, locale, 1)} ${zh ? '小時' : es ? 'horas' : 'hours'}`;
  return `${formatNumber(ms / 60_000, locale, 0)} ${zh ? '分鐘' : es ? 'minutos' : 'minutes'}`;
}

export default function SinceLastVisit() {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';
  const es = locale === 'es';
  const [prev, setPrev] = useState<number | null | undefined>(undefined);

  useEffect(() => setPrev(readPrevious()), []);

  if (prev === undefined) return null;

  const now = Date.now();
  const title = zh ? '自您上次造訪以來' : es ? 'Desde tu última visita' : 'Since your last visit';

  if (prev === null || now - prev < 60_000) {
    return (
      <aside className="rounded-2xl border border-slate-700/60 bg-space-900/50 p-5" aria-label={title}>
        <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">
          {zh
            ? '這似乎是您第一次造訪（或剛剛才來過）。下次回來時，這裡會顯示兩艘航海家號在您離開期間又飛了多遠。本站只在您的瀏覽器裡記下造訪時間，不會傳送到任何地方。'
            : es
              ? 'Parece tu primera visita (o acabas de estar aquí). La próxima vez verás aquí cuánto avanzaron las Voyager mientras no estabas. Solo guardamos la hora de la visita en tu navegador; no se envía a ningún sitio.'
              : 'This looks like your first visit (or you were here moments ago). Next time, this panel will show how far both Voyagers travelled while you were away. Only the time of your visit is stored, in your own browser — it is never sent anywhere.'}
        </p>
      </aside>
    );
  }

  const rows = (['voyager1', 'voyager2'] as const).map((id) => {
    const a = estimate(id, prev);
    const b = estimate(id, now);
    return { id, sun: b.sunKm - a.sunKm, earth: b.earthKm - a.earthKm };
  });

  return (
    <aside className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-5" aria-label={title}>
      <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
      <p className="mb-3 text-sm text-slate-300">
        {zh
          ? `您上次造訪是在 ${humanSpan(now - prev, locale)}前。在這段時間裡（依本站模型計算）：`
          : es
            ? `Tu última visita fue hace ${humanSpan(now - prev, locale)}. Desde entonces (según el modelo de este sitio):`
            : `You were last here ${humanSpan(now - prev, locale)} ago. Since then (calculated with this site’s model):`}
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {rows.map((r) => (
          <li key={r.id} className="rounded-xl border border-slate-700/50 bg-space-950/50 p-3 font-mono text-sm">
            <p className={r.id === 'voyager1' ? 'text-cyan-300' : 'text-emerald-300'}>
              {r.id === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
            </p>
            <p className="text-slate-200">
              +{formatNumber(r.sun, locale, 0)} km {zh ? '（離太陽更遠）' : es ? '(más lejos del Sol)' : 'farther from the Sun'}
            </p>
            <p className="text-xs text-slate-400">
              {r.earth >= 0 ? '+' : '−'}
              {formatNumber(Math.abs(r.earth), locale, 0)} km {zh ? '與地球的距離變化' : es ? 'cambio en la distancia a la Tierra' : 'change in distance from Earth'}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
