/**
 * Art — hand-drawn inline SVG illustrations for the kids page.
 * No external images, no emoji-as-illustration: every scene is real SVG
 * so it stays sharp, themeable and offline-friendly.
 */

import { useId } from 'react';

type Props = { className?: string };
const useUid = () => useId().replace(/:/g, '');

export function Sparkle({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 2.5 14.2 9.8 21.5 12l-7.3 2.2L12 21.5l-2.2-7.3L2.5 12l7.3-2.2Z" fill="currentColor" />
    </svg>
  );
}

export function Star({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckMark({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="m4 12.5 5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CrossMark({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BookIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 4v15" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function PlanetEarth({ className, face = true }: Props & { face?: boolean }) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-ocean`} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="54" fill={`url(#${uid}-ocean)`} stroke="#1e40af" strokeWidth="3" />
      <path d="M34 52c10-15 31-20 46-11-3 11-15 19-29 18-7 0-13-3-17-7Z" fill="#34d399" opacity=".95" />
      <path d="M84 66c11 2 19 13 16 25-9 8-22 11-33 6 1-14 8-25 17-31Z" fill="#4ade80" opacity=".95" />
      <path d="M38 87c8-9 21-10 29-2-3 11-13 20-25 19-5-6-7-12-4-17Z" fill="#22c55e" opacity=".9" />
      <path d="M53 42c15-6 33-1 45 10M82 101c10-5 21-3 29 4" fill="none" stroke="#e0f2fe" strokeWidth="5" strokeLinecap="round" opacity=".75" />
      {face && (
        <>
          <ellipse cx="57" cy="64" rx="5.5" ry="6.5" fill="#fff" />
          <ellipse cx="81" cy="64" rx="5.5" ry="6.5" fill="#fff" />
          <circle cx="58" cy="65" r="2.8" fill="#0f172a" />
          <circle cx="82" cy="65" r="2.8" fill="#0f172a" />
          <circle cx="59.5" cy="63.5" r="1" fill="#fff" />
          <circle cx="83.5" cy="63.5" r="1" fill="#fff" />
          <path d="M58 78q12 9 23 0" fill="none" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="47" cy="76" r="4" fill="#fb7185" opacity=".65" />
          <circle cx="91" cy="76" r="4" fill="#fb7185" opacity=".65" />
        </>
      )}
      <circle cx="114" cy="27" r="8" fill="#fde68a" />
      <circle cx="114" cy="27" r="3" fill="#f59e0b" />
    </svg>
  );
}

export function PlanetJupiter({ className, face = true }: Props & { face?: boolean }) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-jupiter`} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <clipPath id={`${uid}-clip`}>
          <circle cx="70" cy="70" r="54" />
        </clipPath>
      </defs>
      <circle cx="70" cy="70" r="54" fill={`url(#${uid}-jupiter)`} stroke="#b45309" strokeWidth="3" />
      <g clipPath={`url(#${uid}-clip)`} opacity=".75">
        <path d="M14 42h112v12H14zM14 68h112v10H14zM14 92h112v9H14z" fill="#fff7ed" />
        <path d="M14 55h112v8H14zM14 82h112v6H14z" fill="#f59e0b" />
        <ellipse cx="88" cy="88" rx="15" ry="8" fill="#fb7185" />
        <ellipse cx="88" cy="88" rx="8" ry="4" fill="#f43f5e" opacity=".8" />
      </g>
      {face && (
        <>
          <ellipse cx="55" cy="62" rx="5.5" ry="6.5" fill="#fff" />
          <ellipse cx="79" cy="62" rx="5.5" ry="6.5" fill="#fff" />
          <circle cx="56" cy="63" r="2.8" fill="#451a03" />
          <circle cx="80" cy="63" r="2.8" fill="#451a03" />
          <path d="M56 76q12 8 23 0" fill="none" stroke="#451a03" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="45" cy="74" r="4" fill="#fb7185" opacity=".6" />
          <circle cx="89" cy="74" r="4" fill="#fb7185" opacity=".6" />
        </>
      )}
    </svg>
  );
}

export function PlanetSaturn({ className, face = true }: Props & { face?: boolean }) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 180 140" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-saturn`} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="55%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <clipPath id={`${uid}-front`}>
          <rect x="0" y="70" width="180" height="70" />
        </clipPath>
      </defs>
      <ellipse cx="90" cy="70" rx="82" ry="20" transform="rotate(-18 90 70)" fill="none" stroke="#fbbf24" strokeWidth="12" opacity=".85" />
      <ellipse cx="90" cy="70" rx="70" ry="15" transform="rotate(-18 90 70)" fill="none" stroke="#fef3c7" strokeWidth="4" opacity=".65" />
      <circle cx="90" cy="70" r="44" fill={`url(#${uid}-saturn)`} stroke="#b45309" strokeWidth="3" />
      <g clipPath={`url(#${uid}-front)`}>
        <ellipse cx="90" cy="70" rx="82" ry="20" transform="rotate(-18 90 70)" fill="none" stroke="#fbbf24" strokeWidth="12" opacity=".95" />
      </g>
      <path d="M56 58c12-8 32-8 47 0" fill="none" stroke="#fff7ed" strokeWidth="5" strokeLinecap="round" opacity=".6" />
      {face && (
        <>
          <ellipse cx="76" cy="62" rx="5.5" ry="6.5" fill="#fff" />
          <ellipse cx="98" cy="62" rx="5.5" ry="6.5" fill="#fff" />
          <circle cx="77" cy="63" r="2.8" fill="#451a03" />
          <circle cx="99" cy="63" r="2.8" fill="#451a03" />
          <path d="M77 76q10 7 20 0" fill="none" stroke="#451a03" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="66" cy="74" r="3.5" fill="#fb7185" opacity=".6" />
          <circle cx="108" cy="74" r="3.5" fill="#fb7185" opacity=".6" />
        </>
      )}
    </svg>
  );
}

export function PlanetUranus({ className, face = true }: Props & { face?: boolean }) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-uranus`} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#cffafe" />
          <stop offset="55%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
      </defs>
      <ellipse cx="70" cy="70" rx="23" ry="60" transform="rotate(18 70 70)" fill="none" stroke="#a5f3fc" strokeWidth="5" opacity=".5" />
      <circle cx="70" cy="70" r="54" fill={`url(#${uid}-uranus)`} stroke="#0e7490" strokeWidth="3" />
      <path d="M20 58c28-9 72-9 100 0M20 86c28 9 72 9 100 0" fill="none" stroke="#ecfeff" strokeWidth="5" strokeLinecap="round" opacity=".5" />
      {face && (
        <>
          <ellipse cx="56" cy="64" rx="5.5" ry="6.5" fill="#fff" />
          <ellipse cx="80" cy="64" rx="5.5" ry="6.5" fill="#fff" />
          <circle cx="57" cy="65" r="2.8" fill="#083344" />
          <circle cx="81" cy="65" r="2.8" fill="#083344" />
          <path d="M57 78q11 8 22 0" fill="none" stroke="#083344" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="46" cy="76" r="3.5" fill="#fb7185" opacity=".5" />
          <circle cx="90" cy="76" r="3.5" fill="#fb7185" opacity=".5" />
        </>
      )}
    </svg>
  );
}

export function PlanetNeptune({ className, face = true }: Props & { face?: boolean }) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-neptune`} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>
      <circle cx="70" cy="70" r="54" fill={`url(#${uid}-neptune)`} stroke="#1e40af" strokeWidth="3" />
      <ellipse cx="86" cy="84" rx="16" ry="10" fill="#1e3a8a" opacity=".8" />
      <path d="M32 52c18-7 44-8 62-2M42 96c20 6 44 4 60-4" fill="none" stroke="#dbeafe" strokeWidth="4" strokeLinecap="round" opacity=".55" />
      {face && (
        <>
          <ellipse cx="55" cy="62" rx="5.5" ry="6.5" fill="#fff" />
          <ellipse cx="79" cy="62" rx="5.5" ry="6.5" fill="#fff" />
          <circle cx="56" cy="63" r="2.8" fill="#0f172a" />
          <circle cx="80" cy="63" r="2.8" fill="#0f172a" />
          <path d="M56 76q11 8 22 0" fill="none" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="45" cy="74" r="3.5" fill="#fb7185" opacity=".55" />
          <circle cx="89" cy="74" r="3.5" fill="#fb7185" opacity=".55" />
        </>
      )}
    </svg>
  );
}

export function Sun({ className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <g stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" opacity=".85">
        <path d="M60 8v14M60 98v14M8 60h14M98 60h14M23 23l10 10M87 87l10 10M97 23 87 33M33 87 23 97" />
      </g>
      <circle cx="60" cy="60" r="30" fill="#fde047" stroke="#d97706" strokeWidth="3" />
      <circle cx="60" cy="60" r="22" fill="none" stroke="#fef3c7" strokeWidth="2" opacity=".7" />
      <ellipse cx="50" cy="55" rx="4" ry="5" fill="#fff" />
      <ellipse cx="70" cy="55" rx="4" ry="5" fill="#fff" />
      <circle cx="51" cy="56" r="2" fill="#78350f" />
      <circle cx="71" cy="56" r="2" fill="#78350f" />
      <path d="M51 67q9 7 18 0" fill="none" stroke="#78350f" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function RecordIcon({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="26" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
      {[21, 17, 13, 9].map((r) => (
        <circle key={r} cx="32" cy="32" r={r} fill="none" stroke="#92400e" strokeWidth="1" opacity=".55" />
      ))}
      <circle cx="32" cy="32" r="7" fill="#fb7185" stroke="#9f1239" strokeWidth="2" />
      <circle cx="32" cy="32" r="2.5" fill="#fde68a" />
    </svg>
  );
}

export function PlanetMoon({ className }: Props) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${uid}-moon`} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="65%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="46" fill={`url(#${uid}-moon)`} stroke="#64748b" strokeWidth="3" />
      <circle cx="44" cy="48" r="9" fill="#94a3b8" opacity=".6" />
      <circle cx="74" cy="40" r="5" fill="#94a3b8" opacity=".55" />
      <circle cx="72" cy="76" r="12" fill="#94a3b8" opacity=".45" />
      <circle cx="42" cy="78" r="5" fill="#94a3b8" opacity=".5" />
    </svg>
  );
}

export function Rocket({ className }: Props) {
  const uid = useUid();
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <path d="M60 8c18 18 28 40 28 66v38H32V74c0-26 10-48 28-66Z" fill={`url(#${uid}-body)`} stroke="#b45309" strokeWidth="3" />
      <path d="M60 8c8 8 14 18 19 30H41c5-12 11-22 19-30Z" fill="#fb7185" stroke="#be123c" strokeWidth="3" />
      <circle cx="60" cy="66" r="14" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
      <circle cx="55" cy="61" r="4" fill="#e0f2fe" opacity=".9" />
      <path d="M32 92 14 122l24-8M88 92l18 30-24-8" fill="#34d399" stroke="#047857" strokeWidth="3" strokeLinejoin="round" />
      <path d="M46 118h28l-6 24-8-10-8 10Z" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
      <circle cx="60" cy="66" r="3" fill="#0f172a" />
    </svg>
  );
}

export function GoldenRecordArt({ className, spinning = false }: Props & { spinning?: boolean }) {
  const uid = useUid();
  return (
    <svg
      viewBox="0 0 280 220"
      className={`${className ?? ''} ${spinning ? 'is-spinning' : ''}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-gold`} cx="32%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="45%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id={`${uid}-label`} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
      </defs>
      <rect x="128" y="30" width="124" height="150" rx="16" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="4" transform="rotate(8 190 105)" />
      <g transform="rotate(8 190 105)">
        <path d="M150 60h80M150 74h80M150 88h56" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" opacity=".55" />
        <circle cx="188" cy="132" r="24" fill="#38bdf8" stroke="#fde68a" strokeWidth="3" />
        <path d="M172 128c8-9 22-10 30-2-3 8-12 13-20 11-5-1-8-4-10-9Z" fill="#34d399" />
        <path d="M188 108v48M164 132h48" stroke="#fde68a" strokeWidth="2" opacity=".6" />
      </g>
      <g className="kids-record-disc">
        <circle cx="92" cy="112" r="82" fill={`url(#${uid}-gold)`} stroke="#92400e" strokeWidth="4" />
        {[70, 62, 54, 46, 38].map((r) => (
          <circle key={r} cx="92" cy="112" r={r} fill="none" stroke="#92400e" strokeWidth="1.2" opacity=".45" />
        ))}
        <circle cx="92" cy="112" r="26" fill={`url(#${uid}-label)`} stroke="#7f1d1d" strokeWidth="3" />
        <circle cx="92" cy="112" r="9" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
        <circle cx="92" cy="112" r="3" fill="#78350f" />
        <path d="M92 96c10 6 17 14 18 24" fill="none" stroke="#fde68a" strokeWidth="2" opacity=".7" />
        <circle cx="74" cy="94" r="3" fill="#fde68a" opacity=".75" />
        <circle cx="112" cy="126" r="2.5" fill="#fde68a" opacity=".7" />
      </g>
      <path d="M184 28c9-9 22-9 31 0" fill="none" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity=".55" />
      <path d="m238 30 3.5 10 10 3.5-10 3.5-3.5 10-3.5-10-10-3.5 10-3.5Z" fill="#fde68a" />
      <circle cx="254" cy="112" r="4" fill="#fde68a" opacity=".75" />
    </svg>
  );
}

export function VoyagerCharacter({
  variant,
  className,
  x,
  y,
  width,
  height,
}: {
  variant: 'v1' | 'v2';
  className?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}) {
  const uid = useUid();
  const accent = variant === 'v1' ? '#fbbf24' : '#34d399';
  const accentDark = variant === 'v1' ? '#b45309' : '#047857';
  const bodyTop = variant === 'v1' ? '#fffbeb' : '#ecfdf5';
  const bodyBottom = variant === 'v1' ? '#fde68a' : '#a7f3d0';
  return (
    <svg
      viewBox="0 0 240 220"
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-dish`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bodyTop} />
          <stop offset="100%" stopColor={bodyBottom} />
        </linearGradient>
        <clipPath id={`${uid}-dishclip`}>
          <circle cx="82" cy="80" r="56" />
        </clipPath>
      </defs>
      <circle cx="120" cy="116" r="104" fill={accent} opacity=".08" />
      <circle cx="82" cy="80" r="56" fill={`url(#${uid}-dish)`} stroke={accent} strokeWidth="5" />
      <g stroke={accentDark} strokeWidth="1.2" opacity=".35" clipPath={`url(#${uid}-dishclip)`}>
        <line x1="82" y1="24" x2="82" y2="136" />
        <line x1="26" y1="80" x2="138" y2="80" />
        <line x1="42" y1="40" x2="122" y2="120" />
        <line x1="122" y1="40" x2="42" y2="120" />
        <ellipse cx="82" cy="80" rx="40" ry="56" fill="none" />
        <ellipse cx="82" cy="80" rx="20" ry="56" fill="none" />
        <ellipse cx="82" cy="80" rx="56" ry="20" fill="none" />
      </g>
      <circle cx="82" cy="80" r="7" fill={accent} stroke={accentDark} strokeWidth="2" />
      <line x1="82" y1="80" x2="118" y2="100" stroke={accentDark} strokeWidth="4" strokeLinecap="round" />
      <rect x="116" y="96" width="74" height="72" rx="18" fill={`url(#${uid}-body)`} stroke={accentDark} strokeWidth="3" />
      <rect x="124" y="104" width="58" height="20" rx="10" fill={accent} opacity=".24" />
      <circle cx="166" cy="150" r="13" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <circle cx="166" cy="150" r="7" fill="#92400e" opacity=".28" />
      <circle cx="166" cy="150" r="2" fill="#78350f" />
      <ellipse cx="140" cy="124" rx="7" ry="8" fill="#fff" />
      <ellipse cx="158" cy="124" rx="7" ry="8" fill="#fff" />
      <circle cx="141" cy="125" r="3.5" fill="#1e293b" />
      <circle cx="159" cy="125" r="3.5" fill="#1e293b" />
      <circle cx="142.5" cy="123.5" r="1.2" fill="#fff" />
      <circle cx="160.5" cy="123.5" r="1.2" fill="#fff" />
      <path d="M142 136q8 8 16 0" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="130" cy="134" r="4" fill="#fb7185" opacity=".5" />
      <circle cx="168" cy="134" r="4" fill="#fb7185" opacity=".5" />
      <line x1="116" y1="150" x2="80" y2="168" stroke={accentDark} strokeWidth="4" strokeLinecap="round" />
      <rect x="54" y="158" width="28" height="18" rx="5" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      <circle cx="62" cy="167" r="4" fill="#38bdf8" />
      <line x1="80" y1="168" x2="80" y2="154" stroke="#64748b" strokeWidth="2" />
      <circle cx="80" cy="151" r="4" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
      <rect x="124" y="172" width="46" height="16" rx="6" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
      <line x1="132" y1="172" x2="132" y2="188" stroke="#475569" strokeWidth="1.2" />
      <line x1="142" y1="172" x2="142" y2="188" stroke="#475569" strokeWidth="1.2" />
      <line x1="152" y1="172" x2="152" y2="188" stroke="#475569" strokeWidth="1.2" />
      <path d="M130 188l-4 12 10-4ZM158 188l4 12-10-4Z" fill="#64748b" />
      <circle cx="206" cy="74" r="17" fill={accent} stroke={accentDark} strokeWidth="3" />
      <text x="206" y="81" textAnchor="middle" fontSize="18" fontWeight="800" fill="#1e1b4b" fontFamily="Nunito, sans-serif">
        {variant === 'v1' ? '1' : '2'}
      </text>
      <path d="m38 40 4.5 10 10 1.5-7.5 7 2 10-9-5-9 5 2-10-7.5-7 10-1.5Z" fill={accent} opacity=".8" />
      <circle cx="214" cy="170" r="3" fill={accent} opacity=".8" />
      <circle cx="30" cy="150" r="2.5" fill={accent} opacity=".6" />
    </svg>
  );
}

export function HeroScene({ className, label }: Props & { label: string }) {
  const uid = useUid();
  const stars = [
    [36, 54, 2], [110, 26, 1.5], [178, 70, 2.2], [235, 22, 1.4], [312, 52, 2],
    [410, 30, 1.6], [470, 88, 2.2], [552, 36, 1.5], [620, 22, 2], [704, 62, 1.7],
    [758, 120, 2.4], [86, 210, 1.4], [190, 180, 1.8], [286, 260, 1.3], [392, 150, 2],
    [474, 200, 1.4], [580, 170, 1.8], [680, 230, 1.5], [742, 300, 2], [46, 330, 1.7],
    [120, 470, 1.4], [260, 420, 1.8], [360, 360, 1.3], [430, 480, 1.6], [540, 420, 1.8],
    [640, 480, 1.4], [720, 420, 1.8], [770, 500, 1.4], [210, 500, 1.2], [330, 300, 1.2],
  ];
  return (
    <svg viewBox="0 0 800 540" className={className} role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${uid}-earth`} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id={`${uid}-jupiter`} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id={`${uid}-saturn`} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="60%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity=".28" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-earthclip`}><circle cx="150" cy="408" r="92" /></clipPath>
        <clipPath id={`${uid}-jupiterclip`}><circle cx="82" cy="96" r="38" /></clipPath>
        <clipPath id={`${uid}-saturnfront`}><rect x="560" y="96" width="210" height="100" /></clipPath>
      </defs>

      <circle cx="430" cy="250" r="240" fill={`url(#${uid}-glow)`} />
      {stars.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#fef3c7" className="kids-twinkle" style={{ animationDelay: `${(i % 7) * 0.45}s` }} />
      ))}

      {/* Jupiter, top left */}
      <g className="kids-float-slow">
        <circle cx="82" cy="96" r="38" fill={`url(#${uid}-jupiter)`} stroke="#b45309" strokeWidth="3" />
        <g clipPath={`url(#${uid}-jupiterclip)`} opacity=".7">
          <path d="M42 80h80v9H42zM42 100h80v7H42zM42 114h80v7H42z" fill="#fff7ed" />
          <ellipse cx="96" cy="108" rx="10" ry="6" fill="#fb7185" />
        </g>
        <ellipse cx="70" cy="90" rx="4" ry="5" fill="#fff" />
        <ellipse cx="88" cy="90" rx="4" ry="5" fill="#fff" />
        <circle cx="71" cy="91" r="2" fill="#451a03" />
        <circle cx="89" cy="91" r="2" fill="#451a03" />
        <path d="M72 102q7 5 14 0" fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Saturn, top right */}
      <g className="kids-float-slower">
        <ellipse cx="665" cy="92" rx="92" ry="22" transform="rotate(-18 665 92)" fill="none" stroke="#fbbf24" strokeWidth="11" opacity=".8" />
        <circle cx="665" cy="92" r="48" fill={`url(#${uid}-saturn)`} stroke="#b45309" strokeWidth="3" />
        <g clipPath={`url(#${uid}-saturnfront)`}>
          <ellipse cx="665" cy="92" rx="92" ry="22" transform="rotate(-18 665 92)" fill="none" stroke="#fbbf24" strokeWidth="11" opacity=".95" />
        </g>
        <ellipse cx="650" cy="84" rx="5" ry="6" fill="#fff" />
        <ellipse cx="676" cy="84" rx="5" ry="6" fill="#fff" />
        <circle cx="651" cy="85" r="2.4" fill="#451a03" />
        <circle cx="677" cy="85" r="2.4" fill="#451a03" />
        <path d="M652 98q11 7 22 0" fill="none" stroke="#451a03" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* Earth, bottom left */}
      <g className="kids-float-slow">
        <circle cx="150" cy="408" r="92" fill={`url(#${uid}-earth)`} stroke="#1e40af" strokeWidth="4" />
        <g clipPath={`url(#${uid}-earthclip)`}>
          <path d="M86 382c18-23 52-30 76-16-5 18-25 31-48 29-12 0-21-5-28-13Z" fill="#34d399" opacity=".95" />
          <path d="M166 400c19 4 32 23 27 43-16 13-38 18-56 10 2-23 13-42 29-53Z" fill="#4ade80" opacity=".95" />
          <path d="M92 432c14-14 35-15 48-2-5 18-22 32-42 30-8-9-10-20-6-28Z" fill="#22c55e" opacity=".9" />
          <path d="M112 360c26-10 57-2 77 17M170 462c16-8 34-5 47 5" fill="none" stroke="#e0f2fe" strokeWidth="6" strokeLinecap="round" opacity=".7" />
        </g>
        <ellipse cx="128" cy="398" rx="7" ry="8" fill="#fff" />
        <ellipse cx="158" cy="398" rx="7" ry="8" fill="#fff" />
        <circle cx="129" cy="399" r="3.5" fill="#0f172a" />
        <circle cx="159" cy="399" r="3.5" fill="#0f172a" />
        <path d="M129 416q14 11 28 0" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="114" cy="413" r="5" fill="#fb7185" opacity=".55" />
        <circle cx="172" cy="413" r="5" fill="#fb7185" opacity=".55" />
      </g>
      <circle cx="250" cy="330" r="18" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
      <circle cx="244" cy="326" r="4" fill="#94a3b8" opacity=".6" />
      <circle cx="256" cy="336" r="5" fill="#94a3b8" opacity=".5" />

      {/* Rocket, bottom right */}
      <g className="kids-float-slower">
        <path d="M710 452c8 12 12 24 12 38 0 17-6 30-12 40-6-10-12-23-12-40 0-14 4-26 12-38Z" fill="#fffbeb" stroke="#b45309" strokeWidth="3" />
        <path d="M710 452c4 6 7 12 9 19h-18c2-7 5-13 9-19Z" fill="#fb7185" stroke="#be123c" strokeWidth="2" />
        <circle cx="710" cy="492" r="7" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
        <path d="m698 504-10 20 14-5M722 504l10 20-14-5" fill="#34d399" stroke="#047857" strokeWidth="2" />
        <path d="M704 528h12l-3 13-3-5-3 5Z" fill="#fb923c" />
      </g>

      {/* Astronaut, top centre */}
      <g transform="translate(390 48) rotate(-6)" className="kids-float-fast">
        <circle cx="0" cy="0" r="19" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
        <ellipse cx="0" cy="1" rx="12" ry="10" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
        <path d="M-7-1q7-7 14 0" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
        <rect x="-12" y="18" width="24" height="24" rx="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
        <rect x="-18" y="22" width="8" height="16" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <path d="M-12 24-28 12M12 24l18-6" stroke="#f8fafc" strokeWidth="7" strokeLinecap="round" />
        <path d="M-8 42-12 58M8 42l4 16" stroke="#f8fafc" strokeWidth="8" strokeLinecap="round" />
        <path d="M-12 58h-8M12 58h8" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        <path d="M28 18c24 20 44 42 62 64" fill="none" stroke="#fde68a" strokeWidth="2" strokeDasharray="4 6" opacity=".7" />
      </g>

      {/* The two explorers */}
      <VoyagerCharacter variant="v1" x={248} y={142} width={236} height={216} className="kids-float-a" />
      <VoyagerCharacter variant="v2" x={514} y={248} width={208} height={191} className="kids-float-b" />
      <text x="366" y="372" textAnchor="middle" fill="#fde68a" fontSize="18" fontWeight="800" fontFamily="Nunito, sans-serif">Voyager 1</text>
      <text x="618" y="452" textAnchor="middle" fill="#a7f3d0" fontSize="18" fontWeight="800" fontFamily="Nunito, sans-serif">Voyager 2</text>
    </svg>
  );
}

export function AchievementBadge({
  kind,
  className,
}: {
  kind: 'rookie' | 'planet' | 'star' | 'cosmic';
  className?: string;
}) {
  const uid = useUid();
  const palette = {
    rookie: ['#38bdf8', '#0369a1'],
    planet: ['#34d399', '#047857'],
    star: ['#fbbf24', '#b45309'],
    cosmic: ['#f472b6', '#9d174d'],
  }[kind];
  return (
    <svg viewBox="0 0 140 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-medal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette[0]} />
          <stop offset="100%" stopColor={palette[1]} />
        </linearGradient>
      </defs>
      <path d="M46 8 70 54 50 62 30 18Z" fill="#fb7185" />
      <path d="M94 8 70 54 90 62 110 18Z" fill="#fbbf24" />
      <circle cx="70" cy="92" r="48" fill={`url(#${uid}-medal)`} stroke="#fffbeb" strokeWidth="5" />
      <circle cx="70" cy="92" r="38" fill="none" stroke="#fffbeb" strokeWidth="2" opacity=".5" />
      {kind === 'rookie' && (
        <g transform="translate(70 96)">
          <path d="M0-26c9 10 14 22 14 36H-14c0-14 5-26 14-36Z" fill="#fffbeb" />
          <path d="M-14 10-24 24l12-3M14 10l10 14-12-3" fill="#fde68a" />
          <circle cx="0" cy="-2" r="6" fill="#38bdf8" />
        </g>
      )}
      {kind === 'planet' && (
        <g transform="translate(70 94)">
          <ellipse cx="0" cy="0" rx="34" ry="9" fill="none" stroke="#fffbeb" strokeWidth="4" opacity=".8" />
          <circle cx="0" cy="0" r="18" fill="#fffbeb" />
          <ellipse cx="0" cy="0" rx="34" ry="9" fill="none" stroke="#fffbeb" strokeWidth="4" />
        </g>
      )}
      {kind === 'star' && (
        <path d="m70 62 8 17 19 2-14 13 4 19-17-9-17 9 4-19-14-13 19-2Z" fill="#fffbeb" />
      )}
      {kind === 'cosmic' && (
        <g transform="translate(70 94)">
          <path d="m0-26 7 16 17 2-13 11 4 17-15-8-15 8 4-17-13-11 17-2Z" fill="#fffbeb" />
          <circle cx="-26" cy="-18" r="4" fill="#fde68a" />
          <circle cx="27" cy="-12" r="3" fill="#fde68a" />
          <circle cx="22" cy="24" r="2.5" fill="#fde68a" />
        </g>
      )}
    </svg>
  );
}
