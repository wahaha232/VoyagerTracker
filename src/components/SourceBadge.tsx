/**
 * SourceBadge — labels where a value comes from.
 *
 *   official      published by NASA/JPL (dates, events, instrument status)
 *   calculated    produced by this site's model from JPL reference data
 *   hypothetical  a "what if" comparison, not a prediction
 *   educational   an explanatory illustration, not to scale
 *
 * The meaning of each label is documented on the How It Works page.
 */

import { pageUrl } from '../constants/site';
import { txt, useLang } from './content';

export type SourceKind = 'official' | 'calculated' | 'hypothetical' | 'educational';

const LABEL: Record<SourceKind, { en: string; zh: string; es: string }> = {
  official: { en: 'Official source', zh: '官方資料', es: 'Fuente oficial' },
  calculated: { en: 'Calculated', zh: '本站計算', es: 'Calculado' },
  hypothetical: { en: 'Hypothetical', zh: '假設性計算', es: 'Hipotético' },
  educational: { en: 'Educational', zh: '教學示意', es: 'Didáctico' },
};

const STYLE: Record<SourceKind, string> = {
  official: 'border-sky-400/50 text-sky-200',
  calculated: 'border-emerald-400/50 text-emerald-200',
  hypothetical: 'border-amber-400/60 text-amber-200',
  educational: 'border-violet-400/50 text-violet-200',
};

export default function SourceBadge({ kind, note }: { kind: SourceKind; note?: string }) {
  const locale = useLang();
  return (
    <a
      href={`${pageUrl('how-it-works')}#labels`}
      title={note}
      className={`inline-flex max-w-full flex-wrap items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider no-underline hover:bg-white/5 ${STYLE[kind]}`}
    >
      {txt(LABEL[kind], locale)}
      {note && <span className="ml-1 font-normal normal-case tracking-normal opacity-80">· {note}</span>}
    </a>
  );
}
