/**
 * OneLightDayModal — the deep-dive panel opened by the slim entry pill.
 * It is mounted only on demand (React.lazy) and is additive: the existing
 * LightDayCountdown, tracker and page layout are not modified.
 */

import { useEffect, useMemo, useRef } from 'react';
import { useI18n } from '../../i18n/context';
import { useNow } from '../../hooks/useVoyagerLive';
import { estimate, whenDistanceReaches } from '../../lib/ephemeris';
import { CloseIcon, ExternalLinkIcon } from '../icons';
import PhotonBar from './PhotonBar';
import PingVoyager from './PingVoyager';
import ShareCard from './ShareCard';
import {
  AU_KM,
  LIGHT_DAY_KM,
  NASA_LIGHT_DAY_URL,
  ONE_LIGHT_DAY_INSTANT_MS,
  T,
  formatCountdown,
  formatHms,
  formatKm,
  pick,
} from './shared';

export default function OneLightDayModal({ onClose }: { onClose: () => void }) {
  const { locale } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const now = useNow(1000);

  const telemetry = estimate('voyager1', now);
  const remaining = Math.max(0, (ONE_LIGHT_DAY_INSTANT_MS - now) / 1000);
  const reached = remaining <= 0;
  const remainingKm = reached ? 0 : Math.max(0, LIGHT_DAY_KM - telemetry.earthKm);
  const progress = Math.min(1, Math.max(0, telemetry.lightTimeS / 86400));
  const targetDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: 'long',
        timeStyle: 'medium',
        timeZone: 'UTC',
      }).format(ONE_LIGHT_DAY_INSTANT_MS),
    [locale],
  );
  const sunCrossing = useMemo(
    () => whenDistanceReaches('voyager1', 'sunKm', LIGHT_DAY_KM, Date.now()),
    [],
  );
  const modelEarthCrossing = useMemo(
    () => whenDistanceReaches('voyager1', 'earthKm', LIGHT_DAY_KM, Date.now()),
    [],
  );
  const formatUtcDate = (ms: number | null) =>
    ms === null
      ? pick(T('not available', '無法計算', 'no disponible'), locale)
      : new Intl.DateTimeFormat(locale, {
          dateStyle: 'long',
          timeStyle: 'medium',
          timeZone: 'UTC',
        }).format(ms);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-space-950/85 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="one-light-day-modal-title"
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-2xl border border-yellow-500/30 bg-space-950 shadow-[0_0_70px_rgba(250,204,21,0.08)] sm:rounded-2xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-yellow-500/20 bg-space-950/95 p-4 backdrop-blur sm:p-6">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-400 sm:text-[11px]">
              NASA/JPL · Voyager 1 · One light-day
            </p>
            <h2 id="one-light-day-modal-title" className="mt-1 text-xl font-black tracking-wide text-white sm:text-2xl">
              {pick(
                T(
                  'Voyager 1: One-Light-Day Milestone',
                  '航海家一號：一光日里程碑',
                  'Voyager 1: hito de un día-luz',
                ),
                locale,
              )}
            </h2>
            <p className="mt-1 font-mono text-[11px] text-slate-400">
              {pick(T('Target', '目標時刻', 'Objetivo'), locale)}: {targetDate}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={pick(T('Close', '關閉', 'Cerrar'), locale)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-yellow-500/30 bg-space-900/80 text-yellow-200 transition-colors hover:border-yellow-400/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-6 p-4 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-yellow-300">
                {pick(T('Countdown', '倒數', 'Cuenta atrás'), locale)}
              </p>
              <p className="mt-1 font-mono text-xl font-bold tabular-nums text-white">
                {reached
                  ? pick(T('Milestone reached', '已抵達里程碑', 'Hito alcanzado'), locale)
                  : formatCountdown(remaining)}
              </p>
              <p className="mt-1 font-mono text-[11px] tabular-nums text-yellow-200/80">
                {formatKm(remainingKm, locale)} km {pick(T('to go', '剩餘', 'restantes'), locale)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-space-900/60 p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {pick(T('Distance from Earth now', '目前距地球', 'Distancia a la Tierra ahora'), locale)}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-100">
                {formatKm(telemetry.earthKm, locale)} km
              </p>
              <p className="mt-1 font-mono text-[11px] text-slate-400">
                {(telemetry.earthKm / AU_KM).toFixed(2)} AU
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-space-900/60 p-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {pick(T('One-way light time now', '目前單程光時', 'Tiempo de luz de ida ahora'), locale)}
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-slate-100">{formatHms(telemetry.lightTimeS)}</p>
              <p className="mt-1 font-mono text-[11px] text-slate-400">
                {pick(T('not official telemetry', '非官方遙測', 'no es telemetría oficial'), locale)}
              </p>
            </div>
          </div>

          <section className="rounded-2xl border border-slate-800 bg-space-900/30 p-4 sm:p-5">
            <h3 className="text-lg font-bold text-white">
              {pick(T('What is a light-day?', '什麼是一光日？', '¿Qué es un día-luz?'), locale)}
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-300">
              <p>
                {pick(
                  T(
                    'A light-day is the distance light travels in 24 hours. At 299,792.458 km per second, that is 25,902,068,371.2 km — about 173 astronomical units (AU), or 173 times the average Earth–Sun distance.',
                    '一光日是光在 24 小時內走的距離。以每秒 299,792.458 公里計算，約為 25,902,068,371.2 公里——也就是約 173 個天文單位（AU），或地球到太陽平均距離的 173 倍。',
                    'Un día-luz es la distancia que recorre la luz en 24 horas. A 299 792,458 km por segundo son 25 902 068 371,2 km: unas 173 unidades astronómicas (UA), o 173 veces la distancia media Tierra–Sol.',
                  ),
                  locale,
                )}
              </p>
              <p>
                {pick(
                  T(
                    'NASA’s published figure is 25,902,068,356 km. The 15 km difference comes from rounding the speed of light; compared with the total distance, it is far smaller than the width of a human hair.',
                    'NASA 公布的數值是 25,902,068,356 公里。15 公里的差異來自光速取值的四捨五入；相對於總距離，它比一根頭髮的寬度還小得多。',
                    'La cifra publicada por la NASA es 25 902 068 356 km. La diferencia de 15 km proviene de redondear la velocidad de la luz; comparada con la distancia total, es muchísimo menor que el grosor de un cabello.',
                  ),
                  locale,
                )}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/5 p-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                    {pick(T('Earth distance (geocentric)', '對地距離（地心）', 'Distancia a la Tierra (geocéntrica)'), locale)}
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {pick(
                      T(
                        'Measured as a straight line from Earth. It wobbles by up to about ±1 AU during the year because Earth orbits the Sun.',
                        '從地球量起的直線距離。因為地球繞太陽公轉，這個數值在一年中最多會有約 ±1 AU 的起伏。',
                        'Medida en línea recta desde la Tierra. Oscila hasta ±1 UA a lo largo del año porque la Tierra orbita el Sol.',
                      ),
                      locale,
                    )}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-cyan-200">
                    {pick(T('NASA:', 'NASA：', 'NASA:'), locale)} 18 Nov 2026 · 10:16:07 UTC
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate-400">
                    {pick(T('Site model:', '本站模型：', 'Modelo del sitio:'), locale)} {formatUtcDate(modelEarthCrossing)}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    {pick(T('Sun distance (heliocentric)', '對日距離（日心）', 'Distancia al Sol (heliocéntrica)'), locale)}
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    {pick(
                      T(
                        'Measured from the Sun. It grows steadily, so its one-light-day date comes later than the Earth-distance date.',
                        '從太陽量起。這個距離穩定增加，因此達到一光日的日期會比對地距離晚。',
                        'Medida desde el Sol. Crece de forma constante, así que su fecha de un día-luz llega después que la de la distancia a la Tierra.',
                      ),
                      locale,
                    )}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-emerald-200">
                    {pick(T('Site model:', '本站模型：', 'Modelo del sitio:'), locale)} {formatUtcDate(sunCrossing)}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate-400">
                    {pick(T('Approximate; not a NASA-published date.', '為估算值，並非 NASA 公布日期。', 'Aproximada; no es una fecha publicada por la NASA.'), locale)}
                  </p>
                </div>
              </div>

              <p>
                {pick(
                  T(
                    'The dates differ because Earth moves around the Sun, not because Voyager 1 changes speed. When the spacecraft crosses the mark, nothing changes aboard: the milestone is about distance and the 24-hour one-way signal delay.',
                    '日期不同是因為地球繞太陽移動，不是航海家一號改變了速度。探測器通過這個里程碑時，船上不會有任何變化：這個里程碑談的是距離與 24 小時的單程訊號延遲。',
                    'Las fechas difieren porque la Tierra se mueve alrededor del Sol, no porque la Voyager 1 cambie de velocidad. Cuando la nave cruza la marca no cambia nada a bordo: el hito trata de la distancia y del retardo de señal de 24 horas.',
                  ),
                  locale,
                )}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-space-900/30 p-4 sm:p-5">
            <h3 className="text-lg font-bold text-white">
              {pick(T('The 24-hour photon bar', '24 小時光速進度條', 'La barra del fotón de 24 horas'), locale)}
            </h3>
            <p className="mb-4 mt-1 text-sm leading-relaxed text-slate-400">
              {pick(
                T(
                  'A signal sent from Earth right now is already most of the way through its 24-hour journey.',
                  '現在從地球發出的訊號，已經走完 24 小時旅程的大部分。',
                  'Una señal enviada ahora desde la Tierra ya ha recorrido la mayor parte de su viaje de 24 horas.',
                ),
                locale,
              )}
            </p>
            <PhotonBar progress={progress} lightTimeS={telemetry.lightTimeS} />
          </section>

          <section className="rounded-2xl border border-slate-800 bg-space-900/30 p-4 sm:p-5">
            <h3 className="text-lg font-bold text-white">
              {pick(T('Ping Voyager 1', '向航海家一號發射訊號', 'Enviar un ping a la Voyager 1'), locale)}
            </h3>
            <div className="mt-1">
              <PingVoyager now={now} />
            </div>
          </section>

          <section className="rounded-2xl border border-yellow-500/25 bg-yellow-500/5 p-4 sm:p-5">
            <h3 className="text-lg font-bold text-white">
              {pick(T('Milestone share card', '里程碑紀念圖卡', 'Tarjeta del hito'), locale)}
            </h3>
            <div className="mt-3">
              <ShareCard now={now} />
            </div>
          </section>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-slate-400">
            <span>
              {pick(
                T(
                  'Science and dates: NASA/JPL and this site’s JPL Horizons model. Distances and light times are estimates, not official telemetry.',
                  '科學內容與日期：NASA/JPL 與本站的 JPL Horizons 模型。距離與光行時間為估計值，並非官方遙測。',
                  'Ciencia y fechas: NASA/JPL y el modelo JPL Horizons de este sitio. Las distancias y tiempos de luz son estimaciones, no telemetría oficial.',
                ),
                locale,
              )}
            </span>
            <a
              href={NASA_LIGHT_DAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-yellow-300 underline underline-offset-2 hover:text-yellow-200"
            >
              NASA/JPL <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
