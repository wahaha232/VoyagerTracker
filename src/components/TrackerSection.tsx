/**
 * TrackerSection — reusable live-telemetry block.
 *
 * Keeps the original Tracker functionality intact (per-spacecraft telemetry
 * cards, interactive 3D model, 2D heliocentric trajectory map) and adds the
 * "What you're seeing" explainer that the content plan requires, so readers
 * understand what each number means.
 *
 * Locale (EN / 繁中) only affects the telemetry UI labels.
 */

import { useMemo } from 'react';
import type { SpacecraftId } from '../types/voyager';
import { SPACECRAFT_META, TRANSLATIONS } from '../constants/voyagerData';
import { useVoyagerLive } from '../hooks/useVoyagerLive';
import { useI18n } from '../i18n/context';
import TrackerCard from './TrackerCard';
import Voyager3D from './Voyager3D';
import VoyagerCanvas from './VoyagerCanvas';

interface TrackerSectionProps {
  /** Which spacecraft to show: both (home) or a single probe (voyager pages). */
  ids: SpacecraftId[];
  /** Large heading shown above the tracker. */
  title: string;
  /** Short paragraph under the heading. */
  intro: string;
  /** Show the 2D trajectory map. */
  showMap?: boolean;
  /** Show the interactive 3D model beside the map. */
  showModel?: boolean;
}

const EXPLAINER_EN: { term: string; detail: string }[] = [
  {
    term: 'Distance from Earth',
    detail:
      'How far the spacecraft is from our planet right now, shown in AU and kilometres. Because the probes are moving away from us, this number grows every day.',
  },
  {
    term: 'Distance from Sun',
    detail:
      'The same measurement taken from the Sun instead of from Earth. Earth orbits about 1 AU from the Sun, so the two distances are usually close to each other.',
  },
  {
    term: 'Current velocity',
    detail:
      'The cruising speed of the probe relative to the Sun in km/s. The spacecraft coast on momentum from their 1977 launches and planetary flybys — no engines are firing.',
  },
  {
    term: 'Mission elapsed time',
    detail:
      'How long each spacecraft has been operating since launch. Both Voyagers are in their fifth decade of service and still return data.',
  },
  {
    term: 'Direction / trajectory',
    detail:
      'Where each probe is heading. Voyager 1 left the planets’ orbital plane toward the north; Voyager 2 travels below it toward the south, so the two spacecraft are exploring different regions of interstellar space.',
  },
  {
    term: 'Data update frequency',
    detail:
      'Distance values are interpolated in your browser about ten times per second from a fixed baseline, so the odometers tick smoothly without polling an API.',
  },
  {
    term: 'Data source',
    detail:
      'Baseline distances and speeds are anchored to NASA/JPL Voyager mission references. Every value on this page is a calculated estimate, not live NASA telemetry.',
  },
];

const EXPLAINER_ZH: { term: string; detail: string }[] = [
  {
    term: '與地球的距離',
    detail:
      '探測器目前與地球之間的距離（以 AU 與公里表示）。由於探測器正逐漸遠離地球，這個數字每天都在增加。',
  },
  {
    term: '與太陽的距離',
    detail:
      '改以太陽為基準的同一種測量。地球距太陽約 1 AU，因此這兩個距離通常相差不遠。',
  },
  {
    term: '目前速度',
    detail:
      '探測器相對太陽的巡航速度（公里/秒）。探測器靠著 1977 年發射與行星重力助推所獲得的動能滑行——引擎並未點火。',
  },
  {
    term: '任務已執行時間',
    detail:
      '從發射至今探測器已運作多久。兩艘航海家號都已進入服役的第五個十年，並持續回傳資料。',
  },
  {
    term: '方向／軌跡',
    detail:
      '兩艘探測器各自的前進方向。航海家一號朝行星軌道面的北方離開太陽系；航海家二號則朝南方，因此兩者正在探索不同的星際空間區域。',
  },
  {
    term: '資料更新頻率',
    detail:
      '距離數值會在您的瀏覽器內以固定基準插值，大約每秒更新十次，讓數字流暢跳動，無需不斷向外部伺服器查詢。',
  },
  {
    term: '資料來源',
    detail:
      '基準距離與速度錨定於 NASA/JPL 航海家任務參考資料。本站顯示的每一個數值都是「計算估計值」，並非 NASA 即時遙測。',
  },
];

/** Approximate elapsed time since an ISO launch date, in years. */
function elapsedYearsLabel(launchDate: string, zh: boolean): string {
  const ms = Date.now() - Date.parse(launchDate);
  const years = ms / (365.2425 * 24 * 3600 * 1000);
  if (zh) {
    if (years < 2) return `${Math.max(1, Math.floor(years * 12))} 個月`;
    return `${Math.floor(years)} 年`;
  }
  if (years < 2) return `${Math.max(1, Math.floor(years * 12))} months`;
  return `${Math.floor(years)} years`;
}

export default function TrackerSection({
  ids,
  title,
  intro,
  showMap = true,
  showModel = false,
}: TrackerSectionProps) {
  const { locale } = useI18n();
  const zh = locale === 'zh-TW';
  const telemetry = useVoyagerLive();
  const t = useMemo(() => TRANSLATIONS[locale], [locale]);
  const explainer = zh ? EXPLAINER_ZH : EXPLAINER_EN;

  return (
    <section aria-label={title} className="mb-14">
      {/* Heading */}
      <div className="mb-5">
        <p className="mb-1 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {zh ? '即時資料 · 計算估計值' : 'Live data · calculated estimates'}
        </p>
        <h2 className="neon-text text-2xl font-bold tracking-wide text-white sm:text-3xl">{title}</h2>
      </div>
      <p className="mb-6 max-w-4xl leading-relaxed text-slate-300">{intro}</p>

      {/* Mission elapsed strip */}
      <div className="mb-6 flex flex-wrap gap-2">
        {ids.map((id) => {
          const meta = SPACECRAFT_META[id];
          return (
            <span
              key={id}
              className="rounded-full border px-3 py-1.5 font-mono text-xs"
              style={{ color: meta.accent, borderColor: `${meta.accent}55`, backgroundColor: `${meta.accent}12` }}
            >
              {zh ? `${meta.name} — 任務已執行約 ${elapsedYearsLabel(meta.launchDate, true)}` : `${meta.name} — mission elapsed ≈ ${elapsedYearsLabel(meta.launchDate, false)}`}
            </span>
          );
        })}
      </div>

      {/* What you're seeing */}
      <div className="hud-panel mb-8 rounded-2xl p-5 sm:p-6">
        <h3 className="mb-1 text-lg font-bold tracking-wide text-white">
          {zh ? '您看到的數字代表什麼' : 'What you\u2019re seeing'}
        </h3>
        <p className="mb-4 text-sm text-slate-400">
          {zh
            ? '這份小指南說明本頁每個數字所測量的內容，以及該如何解讀。'
            : 'A short guide to every number on this page — what it measures and how to read it.'}
        </p>
        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {explainer.map((item) => (
            <div key={item.term} className="border-l-2 border-cyan-500/40 pl-3">
              <dt className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300">
                {item.term}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-slate-300">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Telemetry cards */}
      <div className={`grid gap-6 ${ids.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {ids.map((id) => (
          <TrackerCard
            key={id}
            meta={SPACECRAFT_META[id]}
            telemetry={telemetry[id]}
            locale={locale}
            t={t}
          />
        ))}
      </div>

      {/* 2D trajectory map (+ optional 3D model) */}
      {showMap && (
        <div className={`mt-8 ${showModel ? 'grid gap-6 lg:grid-cols-[1fr_1fr]' : ''}`}>
          <div className="min-w-0">
            <VoyagerCanvas telemetry={telemetry} locale={locale} t={t} />
          </div>
          {showModel && (
            <div>
              <h3 className="mb-3 text-lg font-semibold tracking-wide text-white">
                {t.model.title}
              </h3>
              <p className="mb-3 font-mono text-xs text-slate-400">{t.model.subtitle}</p>
              <div className="hud-panel relative h-[320px] w-full overflow-hidden rounded-2xl lg:h-[420px]">
                <Voyager3D />
                <div className="pointer-events-none absolute bottom-3 left-4 rounded-md border border-cyan-500/20 bg-space-950/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cyan-300/70">
                  {t.model.dragHint}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Data transparency note */}
      <p className="mt-5 font-mono text-[11px] leading-relaxed tracking-wide text-slate-500">
        {zh ? (
          <>
            估計值以 NASA/JPL 任務參考資料的固定星曆基準為錨點，再依探測器速度推進計算——詳見{' '}
            <a href="how-it-works.html" className="text-cyan-400 hover:text-cyan-300">
              資料與計算方法
            </a>{' '}
            頁。並非 NASA 官方資料。
          </>
        ) : (
          <>
            Estimates anchored to a fixed ephemeris baseline from NASA/JPL mission references and
            advanced by the probes&rsquo; velocities — see the{' '}
            <a href="how-it-works.html" className="text-cyan-400 hover:text-cyan-300">
              data &amp; methodology page
            </a>{' '}
            for details. Not official NASA data.
          </>
        )}
      </p>
    </section>
  );
}

