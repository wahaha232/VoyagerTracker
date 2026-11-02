/**
 * ShareCard — draws a 1200×630 PNG in the browser with the live countdown,
 * current distance, one-way light time and a UTC timestamp. No external
 * images are used, so the canvas is not tainted and can be downloaded.
 */

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/context';
import { estimate } from '../../lib/ephemeris';
import {
  LIGHT_DAY_KM,
  ONE_LIGHT_DAY_INSTANT_MS,
  T,
  formatCountdown,
  formatHms,
  formatKm,
  formatUtc,
  pick,
} from './shared';

const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: (i * 137.508) % 1200,
  y: (i * 73.13) % 630,
  r: (i % 3) * 0.5 + 0.5,
  alpha: 0.12 + (i % 5) * 0.06,
}));

export default function ShareCard({ now }: { now: number }) {
  const { locale } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    let alive = true;
    const fonts = document.fonts;
    if (!fonts) {
      setFontsReady(true);
      return;
    }
    Promise.all([
      fonts.load('500 22px "JetBrains Mono"'),
      fonts.load('700 58px "JetBrains Mono"'),
      fonts.load('800 58px "JetBrains Mono"'),
    ])
      .then(() => fonts.ready)
      .then(() => {
        if (alive) setFontsReady(true);
      })
      .catch(() => {
        if (alive) setFontsReady(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const telemetry = estimate('voyager1', now);
  const remaining = Math.max(0, (ONE_LIGHT_DAY_INSTANT_MS - now) / 1000);
  const reached = remaining <= 0;
  const countdown = reached
    ? pick(T('REACHED', '已抵達', 'ALCANZADO'), locale)
    : `T−${formatCountdown(remaining)}`;
  const utc = formatUtc(now);
  const currentKm = formatKm(telemetry.earthKm, locale);
  const targetKm = formatKm(LIGHT_DAY_KM, locale);
  const lightTime = formatHms(telemetry.lightTimeS);
  const countdownLabel = pick(T('COUNTDOWN', '倒數', 'CUENTA ATRÁS'), locale);
  const nowLabel = pick(T('VOYAGER 1 NOW', '航海家一號目前', 'VOYAGER 1 AHORA'), locale);
  const lightLabel = pick(T('ONE-WAY LIGHT TIME', '單程光時', 'TIEMPO DE LUZ DE IDA'), locale);
  const targetLabel = pick(T('ONE LIGHT-DAY', '一光日', 'UN DÍA-LUZ'), locale);
  const sourceLabel = pick(T('Source: NASA/JPL · Voyager Tracker', '來源：NASA/JPL · 航海家號追蹤器', 'Fuente: NASA/JPL · Rastreador Voyager'), locale);

  useEffect(() => {
    if (!fontsReady) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, 1200, 630);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, 1200, 630);

    const glow = ctx.createRadialGradient(980, 170, 20, 980, 170, 520);
    glow.addColorStop(0, 'rgba(250, 204, 21, 0.16)');
    glow.addColorStop(0.45, 'rgba(34, 211, 238, 0.06)');
    glow.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1200, 630);

    for (const star of STARS) {
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Golden Record motif.
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(980, 175, 128, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.lineWidth = 1;
    for (const radius of [112, 96, 80, 62, 44]) {
      ctx.beginPath();
      ctx.arc(980, 175, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(250, 204, 21, 0.9)';
    ctx.beginPath();
    ctx.arc(980, 175, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(250, 204, 21, 0.55)';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('NASA/JPL', 980, 345);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#facc15';
    ctx.font = '700 22px "JetBrains Mono", monospace';
    ctx.fillText('VOYAGER 1 · ONE-LIGHT-DAY MILESTONE', 64, 86);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 58px "JetBrains Mono", monospace';
    ctx.fillText(targetLabel, 64, 166);

    ctx.fillStyle = '#facc15';
    ctx.font = '800 54px "JetBrains Mono", monospace';
    ctx.fillText(`${targetKm} km`, 64, 238);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 22px "JetBrains Mono", monospace';
    ctx.fillText(`${nowLabel}: ${currentKm} km`, 64, 296);
    ctx.fillText(`${lightLabel}: ${lightTime}`, 64, 332);

    ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(64, 370);
    ctx.lineTo(820, 370);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(countdownLabel, 64, 414);
    ctx.fillStyle = reached ? '#34d399' : '#ffffff';
    ctx.font = '800 44px "JetBrains Mono", monospace';
    ctx.fillText(countdown, 64, 466);

    ctx.fillStyle = '#64748b';
    ctx.font = '500 18px "JetBrains Mono", monospace';
    ctx.fillText(utc, 64, 522);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 16px "JetBrains Mono", monospace';
    ctx.fillText(sourceLabel, 64, 578);
  }, [
    fontsReady,
    now,
    locale,
    reached,
    countdown,
    currentKm,
    targetKm,
    lightTime,
    utc,
    countdownLabel,
    nowLabel,
    lightLabel,
    targetLabel,
    sourceLabel,
  ]);

  const shareText = [
    'Voyager 1 is approaching one light-day from Earth.',
    `${countdownLabel}: ${countdown}`,
    `${targetLabel}: ${targetKm} km`,
    `${nowLabel}: ${currentKm} km`,
    `${lightLabel}: ${lightTime}`,
    utc,
    sourceLabel,
    `${window.location.href.split('#')[0]}#one-light-day`,
  ].join('\n');

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'voyager-1-one-light-day.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  useEffect(
    () => () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  return (
    <div>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-300">
        {pick(
          T(
            'A 1200×630 PNG in the style of the Golden Record, generated in your browser with the live values. Download it or copy a ready-to-post message.',
            '以金唱片風格在瀏覽器中即時產生的 1200×630 PNG，包含當下數值。可下載圖卡，或複製現成的分享文字。',
            'Un PNG de 1200×630 al estilo del Disco de Oro, generado en tu navegador con los valores en vivo. Descárgalo o copia un mensaje listo para publicar.',
          ),
          locale,
        )}
      </p>

      <canvas
        ref={canvasRef}
        width={1200}
        height={630}
        className="h-auto w-full rounded-xl border border-yellow-500/30 bg-space-950"
        role="img"
        aria-label={pick(
          T(
            'Voyager 1 one-light-day milestone card with the live countdown and distance.',
            '航海家一號一光日里程碑圖卡，包含即時倒數與距離。',
            'Tarjeta del hito de un día-luz de la Voyager 1 con la cuenta atrás y la distancia en vivo.',
          ),
          locale,
        )}
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={download}
          className="inline-flex min-h-[44px] items-center rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-5 font-mono text-sm font-semibold text-yellow-200 transition-colors hover:border-yellow-400/70 hover:text-white"
        >
          {pick(T('Download PNG', '下載 PNG', 'Descargar PNG'), locale)}
        </button>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-[44px] items-center rounded-xl border border-slate-600 bg-space-900/70 px-5 font-mono text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-white"
        >
          {copied
            ? pick(T('Copied', '已複製', 'Copiado'), locale)
            : pick(T('Copy share text', '複製分享文字', 'Copiar texto'), locale)}
        </button>
      </div>
    </div>
  );
}
