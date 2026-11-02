/**
 * NasaEyesEmbed — NASA/JPL's "Eyes on the Solar System" interactive,
 * centred on Voyager 1. The app is several megabytes and runs its own
 * analytics, so the iframe is only created after the visitor asks for it.
 *
 * `variant="compact"` fits the homepage hero panel; `full` is the
 * standalone section used on the Voyager 1 page.
 */

import { useState } from 'react';
import { useI18n } from '../i18n/context';
import { ExternalLinkIcon, SatelliteIcon } from './icons';

export const NASA_EYES_URL =
  'https://eyes.nasa.gov/apps/solar-system/?tracking=false#/sc_voyager_1';

type Tri = { en: string; zh: string; es: string };
const pick = (v: Tri, locale: string) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

export default function NasaEyesEmbed({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const { locale } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const compact = variant === 'compact';

  return (
    <div className={compact ? 'h-full w-full' : undefined}>
      <div
        className={
          compact
            ? 'h-full w-full overflow-hidden rounded-xl border border-cyan-500/20 bg-space-950/70'
            : 'overflow-hidden rounded-2xl border border-cyan-500/30 bg-space-950/70'
        }
      >
        {loaded ? (
          <iframe
            src={NASA_EYES_URL}
            title={pick(
              {
                en: 'NASA/JPL Eyes on the Solar System — Voyager 1 in 3D',
                zh: 'NASA/JPL Eyes on the Solar System——航海家一號 3D 視圖',
                es: 'NASA/JPL Eyes on the Solar System: la Voyager 1 en 3D',
              },
              locale,
            )}
            className={compact ? 'h-full w-full border-0' : 'aspect-video w-full border-0'}
            allow="fullscreen"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className={`group relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500/10 via-space-900 to-emerald-500/5 text-center transition-colors hover:from-cyan-500/15 hover:via-space-900 ${
              compact ? 'h-full gap-3 p-4' : 'aspect-video gap-4 p-6'
            }`}
          >
            <span
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.45) 1px, transparent 1px)',
                backgroundSize: '140px 140px',
              }}
            />
            <span
              className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-space-950 shadow-lg shadow-cyan-500/30 ${
                compact ? 'h-12 w-12' : 'h-16 w-16'
              }`}
            >
              <SatelliteIcon className={compact ? 'h-7 w-7' : 'h-9 w-9'} />
            </span>
            <span className="relative font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300 sm:text-[11px]">
              {pick(
                { en: 'NASA/JPL · Eyes on the Solar System', zh: 'NASA/JPL · Eyes on the Solar System', es: 'NASA/JPL · Eyes on the Solar System' },
                locale,
              )}
            </span>
            <span className={`relative font-bold text-white ${compact ? 'text-lg' : 'text-xl'}`}>
              {pick(
                {
                  en: 'Voyager 1 in 3D',
                  zh: '航海家一號 3D 視圖',
                  es: 'La Voyager 1 en 3D',
                },
                locale,
              )}
            </span>
            {!compact && (
              <span className="relative max-w-md text-sm leading-relaxed text-slate-300">
                {pick(
                  {
                    en: 'Hosted by NASA/JPL. The interactive loads only when you press this button.',
                    zh: '由 NASA/JPL 提供。按下這個按鈕後才會載入互動內容。',
                    es: 'Alojado por NASA/JPL. La aplicación solo se carga al pulsar este botón.',
                  },
                  locale,
                )}
              </span>
            )}
            <span
              className={`relative inline-flex min-h-[40px] items-center rounded-xl border border-cyan-400/60 bg-space-900/80 font-semibold text-cyan-200 transition-colors group-hover:border-cyan-300 group-hover:text-white ${
                compact ? 'px-4 text-xs' : 'mt-1 px-5 text-sm'
              }`}
            >
              {pick(
                {
                  en: compact ? 'Load NASA’s 3D model' : 'Load the 3D model',
                  zh: compact ? '載入 NASA 官方 3D 模型' : '載入 3D 模型',
                  es: compact ? 'Cargar el modelo 3D de la NASA' : 'Cargar el modelo 3D',
                },
                locale,
              )}
            </span>
            <span className="relative font-mono text-[10px] uppercase tracking-widest text-slate-400">
              {pick({ en: 'Source: NASA/JPL', zh: '來源：NASA/JPL', es: 'Fuente: NASA/JPL' }, locale)}
            </span>
          </button>
        )}
      </div>

      {!compact && (
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-slate-400">
          <span>
            {pick(
              {
                en: 'The 3D scene, mission data and controls come from NASA/JPL and follow NASA’s privacy policy.',
                zh: '3D 場景、任務資料與控制項均由 NASA/JPL 提供，並適用 NASA 的隱私政策。',
                es: 'La escena 3D, los datos de la misión y los controles provienen de NASA/JPL y siguen la política de privacidad de la NASA.',
              },
              locale,
            )}
          </span>
          <a
            href={NASA_EYES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
          >
            {pick(
              { en: 'Open on eyes.nasa.gov', zh: '在 eyes.nasa.gov 開啟', es: 'Abrir en eyes.nasa.gov' },
              locale,
            )}{' '}
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
        </p>
      )}
    </div>
  );
}
