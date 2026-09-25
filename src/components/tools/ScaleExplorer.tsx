/**
 * ScaleExplorer — place any distance on a single logarithmic ruler that
 * runs from 1 km to 1 light-year, alongside the Moon, the Sun, Neptune and
 * both Voyagers (their current calculated distance from Earth).
 */

import { useState } from 'react';
import { AU_KM, estimate } from '../../lib/ephemeris';
import { C_KM_S, KM_PER_MILE, LIGHT_DAY_KM, LIGHT_YEAR_KM, PLANET_AU } from '../../lib/context';
import { useNow } from '../../hooks/useVoyagerLive';
import { txt, useLang } from '../content';
import SourceBadge from '../SourceBadge';
import { durationText, fmtN } from './toolUi';

type Tri = { en: string; zh: string; es: string };
const T = (en: string, zh: string, es: string): Tri => ({ en, zh, es });

const MIN = 1; // km
const MAX = LIGHT_YEAR_KM;
const pos = (km: number) => (Math.log10(Math.max(km, MIN)) - Math.log10(MIN)) / (Math.log10(MAX) - Math.log10(MIN));

export default function ScaleExplorer() {
  const locale = useLang();
  const now = useNow(1000);
  const v1 = estimate('voyager1', now).earthKm;
  const v2 = estimate('voyager2', now).earthKm;
  const refs: { key: string; km: number; label: Tri; kind: 'fixed' | 'calc' }[] = [
    { key: '1km', km: 1, label: T('1 km', '1 公里', '1 km'), kind: 'fixed' },
    { key: '100km', km: 100, label: T('100 km (edge of space)', '100 公里（太空邊界）', '100 km (límite del espacio)'), kind: 'fixed' },
    { key: 'earth', km: 40_075, label: T('Once around Earth (40,075 km)', '繞地球一圈（40,075 公里）', 'Una vuelta a la Tierra (40 075 km)'), kind: 'fixed' },
    { key: 'moon', km: 384_400, label: T('Moon (average)', '月球（平均）', 'Luna (media)'), kind: 'fixed' },
    { key: 'au', km: AU_KM, label: T('Sun (1 AU)', '太陽（1 AU）', 'Sol (1 UA)'), kind: 'fixed' },
    { key: 'neptune', km: PLANET_AU.neptune * AU_KM, label: T('Neptune’s orbit (~30 AU)', '海王星軌道（約 30 AU）', 'Órbita de Neptuno (~30 UA)'), kind: 'fixed' },
    { key: 'v2', km: v2, label: T('Voyager 2 now', '航海家二號（此刻）', 'Voyager 2 ahora'), kind: 'calc' },
    { key: 'v1', km: v1, label: T('Voyager 1 now', '航海家一號（此刻）', 'Voyager 1 ahora'), kind: 'calc' },
    { key: 'lday', km: LIGHT_DAY_KM, label: T('1 light-day', '1 光日', '1 día-luz'), kind: 'fixed' },
    { key: 'lyear', km: LIGHT_YEAR_KM, label: T('1 light-year', '1 光年', '1 año luz'), kind: 'fixed' },
  ];
  const [sel, setSel] = useState('v1');
  const cur = refs.find((r) => r.key === sel) ?? refs[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={txt(T('Choose a distance', '選擇距離', 'Elige una distancia'), locale)}>
        {refs.map((r) => (
          <button
            key={r.key}
            type="button"
            role="radio"
            aria-checked={sel === r.key}
            onClick={() => setSel(r.key)}
            className={`min-h-[36px] rounded-full border px-3 text-xs font-medium ${sel === r.key ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100' : 'border-slate-600 text-slate-200 hover:border-cyan-400'}`}
          >
            {txt(r.label, locale)}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4" aria-live="polite">
        {[
          { k: T('Kilometres', '公里', 'Kilómetros'), v: `${fmtN(cur.km, locale, 0)} km` },
          { k: T('Miles', '英里', 'Millas'), v: `${fmtN(cur.km / KM_PER_MILE, locale, 0)} mi` },
          { k: T('Astronomical units', '天文單位', 'Unidades astronómicas'), v: `${fmtN(cur.km / AU_KM, locale, cur.km / AU_KM < 0.01 ? 8 : 3)} AU` },
          { k: T('Light travel time', '光行時間', 'Tiempo de la luz'), v: durationText(cur.km / C_KM_S, locale) },
        ].map((c) => (
          <div key={c.k.en} className="rounded-xl border border-slate-700/60 bg-space-900/60 p-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">{txt(c.k, locale)}</p>
            <p className="mt-1 break-words font-mono text-base font-semibold text-white">{c.v}</p>
          </div>
        ))}
      </div>
      <p className="mt-2">
        <SourceBadge kind={cur.kind === 'calc' ? 'calculated' : 'educational'} note={cur.kind === 'calc' ? txt(T('distance from Earth, now', '此刻與地球的距離', 'distancia a la Tierra, ahora'), locale) : txt(T('reference value', '參考值', 'valor de referencia'), locale)} />
      </p>

      <figure className="mt-5">
        <svg viewBox="0 0 720 150" className="h-auto w-full" role="img" aria-label={txt(T('Logarithmic ruler from 1 km to 1 light-year with reference distances marked.', '由 1 公里到 1 光年的對數尺規，並標出參考距離。', 'Regla logarítmica de 1 km a 1 año luz con distancias de referencia.'), locale)}>
          <line x1="20" x2="700" y1="75" y2="75" stroke="rgba(148,163,184,0.5)" strokeWidth="2" />
          {[0, 3, 6, 9, 12].map((p) => {
            const x = 20 + pos(10 ** p) * 680;
            return (
              <g key={p}>
                <line x1={x} x2={x} y1="68" y2="82" stroke="rgba(148,163,184,0.6)" />
                <text x={x} y="100" textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">
                  10{['⁰', '³', '⁶', '⁹', '¹²'][p / 3]} km
                </text>
              </g>
            );
          })}
          {refs.map((r, i) => {
            const x = 20 + pos(r.km) * 680;
            const active = r.key === sel;
            const up = i % 2 === 0;
            const fill = r.key === 'v1' ? '#22d3ee' : r.key === 'v2' ? '#34d399' : active ? '#fff' : '#cbd5e1';
            return (
              <g key={r.key} onClick={() => setSel(r.key)} style={{ cursor: 'pointer' }}>
                <circle cx={x} cy="75" r={active ? 7 : 4.5} fill={fill} stroke={active ? '#22d3ee' : 'none'} strokeWidth="2" />
                {active && (
                  <text x={Math.min(Math.max(x, 60), 660)} y={up ? 50 : 125} textAnchor="middle" fontSize="12" fill="#fff">
                    {txt(r.label, locale)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <figcaption className="text-xs text-slate-400">
          {txt(
            T(
              'Each tick is 1,000 times farther than the one before. On a normal (linear) ruler, everything up to the Voyagers would be squeezed into the first 0.3% of a line one light-year long.',
              '每個刻度都比前一個遠 1,000 倍。若換成一般的（線性）尺規，從起點到航海家號的所有東西，都會被擠進一條一光年長的線最前面不到千分之三的地方。',
              'Cada marca está 1000 veces más lejos que la anterior. En una regla normal (lineal), todo hasta las Voyager quedaría comprimido en menos del 0,3 % inicial de una línea de un año luz.',
            ),
            locale,
          )}
        </figcaption>
      </figure>
    </div>
  );
}
