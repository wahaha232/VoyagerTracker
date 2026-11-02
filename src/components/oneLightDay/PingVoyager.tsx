/**
 * PingVoyager — a small, clearly labelled simulation. It stores the launch
 * time in localStorage and shows how far a virtual radio signal would have
 * travelled, plus the approximate time left to reach the spacecraft.
 */

import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/context';
import { estimate } from '../../lib/ephemeris';
import {
  C_KM_S,
  T,
  formatHms,
  formatKm,
  formatUtc,
  pick,
} from './shared';

const PING_KEY = 'vt-one-light-day-ping-v1';

interface PingState {
  sentAt: number;
  targetKm: number;
}

function readPing(): PingState | null {
  try {
    const raw = window.localStorage.getItem(PING_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as PingState;
    if (
      typeof value.sentAt !== 'number' ||
      typeof value.targetKm !== 'number' ||
      !Number.isFinite(value.sentAt) ||
      !Number.isFinite(value.targetKm) ||
      value.targetKm <= 0
    ) {
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

function writePing(value: PingState | null) {
  try {
    if (value) window.localStorage.setItem(PING_KEY, JSON.stringify(value));
    else window.localStorage.removeItem(PING_KEY);
  } catch {
    // Ignore storage failures (private mode etc.).
  }
}

export default function PingVoyager({ now }: { now: number }) {
  const { locale } = useI18n();
  const [ping, setPing] = useState<PingState | null>(null);

  useEffect(() => {
    setPing(readPing());
    const onStorage = (event: StorageEvent) => {
      if (event.key === PING_KEY) setPing(readPing());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const launch = () => {
    const sentAt = Date.now();
    const next = { sentAt, targetKm: estimate('voyager1', sentAt).earthKm };
    writePing(next);
    setPing(next);
  };

  const reset = () => {
    writePing(null);
    setPing(null);
  };

  const elapsed = ping ? Math.max(0, (now - ping.sentAt) / 1_000) : 0;
  const travelled = ping ? elapsed * C_KM_S : 0;
  const remaining = ping ? Math.max(0, ping.targetKm - travelled) : 0;
  const remainingSeconds = remaining / C_KM_S;
  const arrived = ping !== null && remaining <= 0;
  const progress = ping ? Math.min(1, travelled / ping.targetKm) : 0;

  return (
    <div>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-300">
        {pick(
          T(
            'Send a virtual radio signal. Your browser stores the launch time and shows how far it would have travelled. This is a simplified illustration, not a real transmission.',
            '發射一道虛擬無線電訊號。瀏覽器會記下發射時間，並顯示訊號已經走了多遠。這是簡化的示意，不是真的傳送訊號。',
            'Envía una señal de radio imaginaria. El navegador guarda la hora de lanzamiento y muestra cuánto habría viajado. Es una ilustración simplificada, no una transmisión real.',
          ),
          locale,
        )}
      </p>

      {!ping && (
        <button
          type="button"
          onClick={launch}
          className="inline-flex min-h-[44px] items-center rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-5 font-mono text-sm font-semibold text-yellow-200 transition-colors hover:border-yellow-400/70 hover:text-white"
        >
          {pick(T('Ping Voyager 1', '向航海家一號發射訊號', 'Enviar un ping a la Voyager 1'), locale)}
        </button>
      )}

      {ping && (
        <div className="rounded-xl border border-slate-700/60 bg-space-900/50 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
              {pick(T('Signal launched', '訊號發射時間', 'Señal lanzada'), locale)}: {formatUtc(ping.sentAt)}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={launch}
                className="min-h-[36px] rounded-lg border border-slate-600 px-3 text-xs font-semibold text-slate-200 transition-colors hover:border-yellow-400/60 hover:text-yellow-200"
              >
                {pick(T('Launch again', '重新發射', 'Lanzar otra vez'), locale)}
              </button>
              <button
                type="button"
                onClick={reset}
                className="min-h-[36px] rounded-lg border border-slate-600 px-3 text-xs font-semibold text-slate-200 transition-colors hover:border-rose-400/60 hover:text-rose-200"
              >
                {pick(T('Reset', '重設', 'Reiniciar'), locale)}
              </button>
            </div>
          </div>

          <div className="relative mb-3 h-2 rounded-full bg-slate-800" aria-hidden="true">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-yellow-400"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                {pick(T('Signal travelled', '訊號已行進', 'Señal recorrida'), locale)}
              </dt>
              <dd className="mt-0.5 font-mono text-sm text-slate-100">{formatKm(travelled, locale)} km</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                {pick(T('Remaining to Voyager 1', '距航海家一號還剩', 'Distancia restante'), locale)}
              </dt>
              <dd className="mt-0.5 font-mono text-sm text-slate-100">{formatKm(remaining, locale)} km</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                {pick(T('Estimated arrival', '估計抵達', 'Llegada estimada'), locale)}
              </dt>
              <dd className={`mt-0.5 font-mono text-sm ${arrived ? 'text-emerald-300' : 'text-yellow-200'}`}>
                {arrived
                  ? pick(T('Signal arrived', '訊號已抵達', 'Señal recibida'), locale)
                  : formatHms(remainingSeconds)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                {pick(T('Elapsed', '已經過', 'Transcurrido'), locale)}
              </dt>
              <dd className="mt-0.5 font-mono text-sm text-slate-100">{formatHms(elapsed)}</dd>
            </div>
          </dl>

          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            {pick(
              T(
                'The simulation compares the signal’s straight-line travel with Voyager 1’s Earth distance at launch; the spacecraft’s own motion during the trip is ignored.',
                '此模擬以直線傳播距離，對比發射當下航海家一號與地球的距離；訊號旅行期間探測器本身的移動忽略不計。',
                'La simulación compara el recorrido recto de la señal con la distancia a la Tierra en el momento del lanzamiento; se ignora el movimiento de la nave durante el trayecto.',
              ),
              locale,
            )}
          </p>
        </div>
      )}
    </div>
  );
}
