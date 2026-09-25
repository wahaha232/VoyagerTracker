/**
 * CommDelay — "Send a message to Voyager": starts a light-speed signal at
 * the current moment and shows, live, where it is, when it reaches the
 * spacecraft and when the earliest possible reply could arrive back.
 * Times are shown in UTC and in the visitor's local time zone.
 */

import { useState } from 'react';
import { estimate, type CraftId } from '../../lib/ephemeris';
import { useNow } from '../../hooks/useVoyagerLive';
import { txt, useLang } from '../content';
import SourceBadge from '../SourceBadge';
import { bothClocks, durationText, fmtN } from './toolUi';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

export default function CommDelay() {
  const locale = useLang();
  const now = useNow(500);
  const [craft, setCraft] = useState<CraftId>('voyager1');
  const [sent, setSent] = useState<{ at: number; craft: CraftId; oneWayS: number } | null>(null);

  const live = estimate(craft, now);
  const oneWay = sent?.oneWayS ?? live.lightTimeS;
  const start = sent?.at ?? now;
  const arrive = start + oneWay * 1000;
  const reply = start + 2 * oneWay * 1000;
  const elapsed = sent ? (now - sent.at) / 1000 : 0;
  const outFrac = sent ? Math.min(1, elapsed / oneWay) : 0;
  const backFrac = sent ? Math.min(1, Math.max(0, (elapsed - oneWay) / oneWay)) : 0;
  const name = (sent?.craft ?? craft) === 'voyager1' ? 'Voyager 1' : 'Voyager 2';
  const stage = !sent ? 'idle' : outFrac < 1 ? 'out' : backFrac < 1 ? 'back' : 'done';

  const rows: { label: Tri; ms: number }[] = [
    { label: T('Message sent from Earth', '從地球送出訊息', 'Mensaje enviado desde la Tierra'), ms: start },
    { label: T(`Arrives at ${name}`, `抵達${name === 'Voyager 1' ? '航海家一號' : '航海家二號'}`, `Llega a la ${name}`), ms: arrive },
    { label: T('Earliest reply reaches Earth', '最早的回覆抵達地球', 'La respuesta más temprana llega a la Tierra'), ms: reply },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label={txt(T('Spacecraft', '探測器', 'Nave'), locale)} className="flex rounded-lg border border-slate-700 p-0.5">
          {(['voyager1', 'voyager2'] as CraftId[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={craft === c}
              onClick={() => {
                setCraft(c);
                setSent(null);
              }}
              className={`min-h-[36px] rounded-md px-3 text-xs font-semibold ${craft === c ? 'bg-cyan-500/20 text-cyan-200' : 'text-slate-300 hover:text-white'}`}
            >
              {c === 'voyager1' ? 'Voyager 1' : 'Voyager 2'}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSent({ at: Date.now(), craft, oneWayS: estimate(craft, Date.now()).lightTimeS })}
          className="min-h-[40px] rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 text-sm font-bold text-space-950"
        >
          {sent ? txt(T('Send again', '重新送出', 'Enviar de nuevo'), locale) : txt(T('Send “Hello, Voyager” now', '現在送出「你好，航海家」', 'Enviar «Hola, Voyager» ahora'), locale)}
        </button>
        <SourceBadge kind="calculated" note={txt(T('light time from the model', '依模型計算的光行時間', 'tiempo de luz del modelo'), locale)} />
      </div>

      <div className="mt-5" aria-live="polite">
        <div className="relative h-10 rounded-full border border-slate-700 bg-space-950/70">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-sky-200">{txt(T('Earth', '地球', 'Tierra'), locale)}</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-200">{name}</span>
          {stage !== 'idle' && (
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_12px_#fcd34d]"
              style={{ left: `${8 + (stage === 'out' ? outFrac : 1 - backFrac) * 84}%` }}
              aria-hidden="true"
            />
          )}
        </div>
        <p className="mt-2 text-sm text-slate-300">
          {stage === 'idle' &&
            txt(T(`Right now a signal needs ${durationText(live.lightTimeS, locale)} to reach ${name}. Press the button to start one.`, `此刻訊號需要 ${durationText(live.lightTimeS, locale)} 才能抵達${name === 'Voyager 1' ? '航海家一號' : '航海家二號'}。按下按鈕即可送出一道訊號。`, `Ahora mismo una señal necesita ${durationText(live.lightTimeS, locale)} para llegar a la ${name}. Pulsa el botón para enviar una.`), locale)}
          {stage === 'out' &&
            txt(T(`On its way: ${fmtN(outFrac * 100, locale, 4)}% of the distance covered after ${durationText(elapsed, locale)}.`, `傳送中：經過 ${durationText(elapsed, locale)}，已走完 ${fmtN(outFrac * 100, locale, 4)}% 的距離。`, `En camino: ${fmtN(outFrac * 100, locale, 4)} % del trayecto tras ${durationText(elapsed, locale)}.`), locale)}
          {stage === 'back' && txt(T('The message has arrived; a reply would now be on its way back.', '訊息已抵達；回覆此刻正在返回途中。', 'El mensaje ha llegado; una respuesta estaría ahora de vuelta.'), locale)}
          {stage === 'done' && txt(T('A reply would have reached Earth.', '回覆應已抵達地球。', 'Una respuesta ya habría llegado a la Tierra.'), locale)}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <caption className="sr-only">{txt(T('Signal timeline', '訊號時間表', 'Cronología de la señal'), locale)}</caption>
          <thead>
            <tr className="font-mono text-xs uppercase tracking-wider text-slate-400">
              <th scope="col" className="py-2 pr-3">{txt(T('Step', '步驟', 'Paso'), locale)}</th>
              <th scope="col" className="py-2 pr-3">UTC</th>
              <th scope="col" className="py-2">{txt(T('Your local time', '您的當地時間', 'Tu hora local'), locale)}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((r) => {
              const c = bothClocks(r.ms, locale);
              return (
                <tr key={r.label.en}>
                  <th scope="row" className="py-2 pr-3 font-normal text-slate-300">{txt(r.label, locale)}</th>
                  <td className="py-2 pr-3 font-mono text-slate-100">{c.utc}</td>
                  <td className="py-2 font-mono text-slate-100">{c.local}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-400">
          {txt(
            T(
              `Round trip: ${durationText(2 * oneWay, locale)}. The reply time is the physical minimum; in practice the spacecraft stores data and the Deep Space Network must be pointing at it, so real responses take longer.`,
              `往返時間：${durationText(2 * oneWay, locale)}。回覆時間是物理上的最短值；實際上太空船會先儲存資料，而且深空網路的天線必須正對著它，因此真正的回應需要更久。`,
              `Ida y vuelta: ${durationText(2 * oneWay, locale)}. El tiempo de respuesta es el mínimo físico; en la práctica la nave almacena datos y la Red de Espacio Profundo debe estar apuntándola, así que las respuestas reales tardan más.`,
            ),
            locale,
          )}
        </p>
      </div>
    </div>
  );
}
