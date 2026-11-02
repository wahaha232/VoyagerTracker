/**
 * PhotonBar — a 0–24 hour scale showing how far a radio signal sent from
 * Earth is along its one-way journey to Voyager 1, with approximate
 * historical milestones. It is a visualisation, not a live measurement.
 */

import { useI18n } from '../../i18n/context';
import { T, formatHms, pick } from './shared';

const NODES = [
  {
    year: '1979',
    hours: 40 / 60,
    label: T('Jupiter', '木星', 'Júpiter'),
    time: T('~40 light-min', '約 40 光分', '~40 minutos-luz'),
  },
  {
    year: '1990',
    hours: 5.5,
    label: T('Pale Blue Dot', '蒼藍小點', 'Pálido punto azul'),
    time: T('~5.5 light-hours', '約 5.5 光時', '~5,5 horas-luz'),
  },
  {
    year: '2012',
    hours: 17,
    label: T('Interstellar space', '星際空間', 'Espacio interestelar'),
    time: T('~17 light-hours', '約 17 光時', '~17 horas-luz'),
  },
  {
    year: '2026',
    hours: 24,
    label: T('One light-day', '一光日', 'Un día-luz'),
    time: T('24 light-hours', '24 光時', '24 horas-luz'),
  },
];

export default function PhotonBar({ progress, lightTimeS }: { progress: number; lightTimeS: number }) {
  const { locale } = useI18n();
  const percent = Math.min(100, Math.max(0, progress * 100));

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <p className="font-mono text-2xl font-bold tabular-nums text-yellow-300">{percent.toFixed(2)}%</p>
        <p className="font-mono text-xs text-slate-400">
          {pick(T('one-way light time', '單程光時', 'tiempo de luz de ida'), locale)}: {formatHms(lightTimeS)}
        </p>
      </div>

      <div
        className="relative h-3 rounded-full border border-slate-700/60 bg-slate-800/80"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Number(percent.toFixed(2))}
        aria-label={pick(T('24-hour one-way light time progress', '24 小時單程光行進度', 'Progreso del tiempo de luz de 24 horas'), locale)}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-yellow-400"
          style={{ width: `${percent}%` }}
        />
        <span
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-space-950 bg-yellow-300 shadow-[0_0_16px_rgba(250,204,21,0.8)]"
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        />
        {NODES.map((node) => (
          <span
            key={node.year}
            className="absolute top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-slate-400/70"
            style={{ left: `${(node.hours / 24) * 100}%` }}
            title={`${node.year} · ${pick(node.label, locale)} · ${pick(node.time, locale)}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500">
        <span>0h</span>
        <span>6h</span>
        <span>12h</span>
        <span>18h</span>
        <span>24h</span>
      </div>

      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        {NODES.map((node) => (
          <div key={node.year} className="flex items-baseline gap-3 rounded-lg border border-slate-800 bg-space-900/40 px-3 py-2">
            <dt className="font-mono text-xs font-bold text-yellow-400">{node.year}</dt>
            <dd className="text-sm text-slate-200">
              {pick(node.label, locale)}
              <span className="ml-2 font-mono text-[11px] text-slate-400">{pick(node.time, locale)}</span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        {pick(
          T(
            'Historical distances are approximate. The bar measures light travel time from Earth, not the distance between the planets.',
            '歷史距離為近似值。此長條顯示的是光從地球出發的旅行時間，不是行星之間的距離。',
            'Las distancias históricas son aproximadas. La barra mide el tiempo de viaje de la luz desde la Tierra, no la distancia entre los planetas.',
          ),
          locale,
        )}
      </p>
    </div>
  );
}
