/**
 * Ephemeris baseline parameters and bilingual translation dictionaries
 * for the Voyager Tracker application.
 *
 * The baseline values are anchored to a fixed epoch. The client-side
 * interpolation engine (see useVoyagerLive) advances these distances
 * smoothly using the stored velocity vectors — no external API polling
 * is required on every tick.
 */

import type {
  EphemerisBaseline,
  Locale,
  SpacecraftId,
  SpacecraftMeta,
  Translation,
} from '../types/voyager';

/** One astronomical unit in kilometers (IAU 2012 definition). */
export const AU_KM = 149_597_870.7;

/** Speed of light in km/s. */
export const SPEED_OF_LIGHT_KM_S = 299_792.458;

/**
 * Baseline epoch: 2026-08-23T00:00:00Z (UTC).
 * Distances below are approximate real-world values for that epoch.
 */
const BASE_EPOCH_MS = Date.UTC(2026, 7, 23, 0, 0, 0);

/** Ephemeris baseline constants for each spacecraft. */
export const EPHEMERIS: Record<SpacecraftId, EphemerisBaseline> = {
  voyager1: {
    baseEpochMs: BASE_EPOCH_MS,
    // ~165.5 AU from the Sun at baseline epoch.
    sunDistanceKm: 165.5 * AU_KM,
    // ~165.5 AU from Earth (roughly radial outward).
    earthDistanceKm: 165.5 * AU_KM,
    // Heliocentric velocity vector (km/s) — mostly radial outward.
    velocity: { x: 16.9, y: 1.2, z: 0.4 },
    cruiseSpeedKmS: 17.0,
  },
  voyager2: {
    baseEpochMs: BASE_EPOCH_MS,
    // ~138.5 AU from the Sun at baseline epoch.
    sunDistanceKm: 138.5 * AU_KM,
    // ~138.5 AU from Earth.
    earthDistanceKm: 138.5 * AU_KM,
    // Heliocentric velocity vector (km/s).
    velocity: { x: 15.1, y: -1.4, z: 0.6 },
    cruiseSpeedKmS: 15.3,
  },
};

/** Static mission metadata for each spacecraft. */
export const SPACECRAFT_META: Record<SpacecraftId, SpacecraftMeta> = {
  voyager1: {
    id: 'voyager1',
    name: 'Voyager 1',
    launchDate: '1977-09-05',
    interstellarEntryDate: '2012-08-25',
    accent: '#22d3ee', // cyan
    gradient: 'from-cyan-500/20 to-sky-900/40',
    instruments: [
      {
        code: 'MAG',
        name: 'Magnetometer',
        description:
          'Measures the strength and direction of the interplanetary and interstellar magnetic field.',
      },
      {
        code: 'LECP',
        name: 'Low-Energy Charged Particles',
        description:
          'Detects low-energy charged particles and cosmic rays in the heliosphere and interstellar medium.',
      },
      {
        code: 'CRS',
        name: 'Cosmic Ray Subsystem',
        description:
          'Measures the intensity and energy spectrum of cosmic rays and solar energetic particles.',
      },
      {
        code: 'PLS',
        name: 'Plasma Science',
        description:
          'Studies the solar wind plasma and its interaction with the interstellar medium.',
      },
    ],
  },
  voyager2: {
    id: 'voyager2',
    name: 'Voyager 2',
    launchDate: '1977-08-20',
    interstellarEntryDate: '2018-11-05',
    accent: '#34d399', // emerald
    gradient: 'from-emerald-500/20 to-teal-900/40',
    instruments: [
      {
        code: 'MAG',
        name: 'Magnetometer',
        description:
          'Measures the strength and direction of the interplanetary and interstellar magnetic field.',
      },
      {
        code: 'LECP',
        name: 'Low-Energy Charged Particles',
        description:
          'Detects low-energy charged particles and cosmic rays in the heliosphere and interstellar medium.',
      },
      {
        code: 'CRS',
        name: 'Cosmic Ray Subsystem',
        description:
          'Measures the intensity and energy spectrum of cosmic rays and solar energetic particles.',
      },
      {
        code: 'PLS',
        name: 'Plasma Science',
        description:
          'Studies the solar wind plasma and its interaction with the interstellar medium.',
      },
    ],
  },
};

/** Traditional-Chinese names for the science instruments shown on tracker cards. */
export const INSTRUMENT_ZH: Record<string, { name: string; description: string }> = {
  MAG: {
    name: '磁力計',
    description: '量測行星際與星際磁場的強度與方向。',
  },
  LECP: {
    name: '低能量帶電粒子儀',
    description: '偵測日球層與星際介質中的低能量帶電粒子與宇宙射線。',
  },
  CRS: {
    name: '宇宙射線次系統',
    description: '量測宇宙射線與太陽高能粒子的強度與能量分布。',
  },
  PLS: {
    name: '電漿科學儀',
    description: '研究太陽風電漿及其與星際介質的交互作用。',
  },
};

/** English (en-US) translation dictionary. */
const enUS: Translation = {
  locale: 'en-US',
  nativeName: 'English',
  shortLabel: 'EN',
  appTitle: 'Voyager Tracker',
  appSubtitle: 'NASA Interstellar Mission · Real-Time Telemetry',
  nav: {
    overview: 'Overview',
    telemetry: 'Telemetry',
    trajectory: 'Trajectory',
    about: 'About',
  },
  dashboard: {
    title: 'Mission Dashboard',
    subtitle: 'Live interpolated telemetry for the Voyager interstellar probes',
    live: 'LIVE',
    updated: 'Updated',
    compare: 'Comparison View',
    single: 'Single View',
  },
  metrics: {
    distanceFromSun: 'Distance from Sun',
    distanceFromEarth: 'Distance from Earth',
    lightTime: 'One-Way Light Time',
    cruiseSpeed: 'Cruising Speed (rel. Sun)',
    missionStatus: 'Mission Status',
    activeInstruments: 'Active Instruments',
    launchDate: 'Launch Date',
    interstellarEntry: 'Interstellar Entry',
    au: 'AU',
    km: 'km',
    kmPerSec: 'km/s',
    hours: 'hr',
    minutes: 'min',
    seconds: 'sec',
  },
  model: {
    title: 'Voyager Spacecraft — 3D Model',
    subtitle: 'Drag to rotate · scroll to zoom · an interactive representation of the twin probes',
    dragHint: 'Drag to rotate',
  },
  canvas: {
    title: 'Heliocentric Trajectory Map',
    subtitle: '2D orbital view — Sun, planetary flybys, and the heliopause boundary',
    sun: 'Sun',
    earth: 'Earth',
    earthOrbit: 'Earth Orbit',
    heliopause: 'Heliopause (~120 AU)',
    voyager1: 'Voyager 1',
    voyager2: 'Voyager 2',
    jupiterFlyby: 'Jupiter Flyby',
    saturnFlyby: 'Saturn Flyby',
    legend: 'Legend',
    scaleNote: 'Radial scale: 0 → 140 AU (logarithmic)',
  },
  status: {
    interstellar: 'Interstellar Space',
    active: 'Active',
    operational: 'Operational',
  },
  footer: {
    disclaimer:
      'Telemetry is interpolated client-side from baseline ephemeris constants for demonstration purposes and is not official NASA data.',
    dataSource: 'Baseline ephemeris · NASA Voyager mission reference',
  },
  toggle: {
    showBoth: 'Show Both',
    showSingle: 'Show Single',
  },
};

/** Traditional Chinese (zh-TW) translation dictionary. */
const zhTW: Translation = {
  locale: 'zh-TW',
  nativeName: '繁體中文',
  shortLabel: '繁',
  appTitle: '航海家號追蹤器',
  appSubtitle: 'NASA 星際任務 · 即時遙測',
  nav: {
    overview: '總覽',
    telemetry: '遙測',
    trajectory: '軌跡',
    about: '關於',
  },
  dashboard: {
    title: '任務儀表板',
    subtitle: '航海家星際探測器的即時插值遙測資料',
    live: '即時',
    updated: '更新於',
    compare: '比較檢視',
    single: '單一檢視',
  },
  metrics: {
    distanceFromSun: '與太陽的距離',
    distanceFromEarth: '與地球的距離',
    lightTime: '單程光行時間',
    cruiseSpeed: '巡航速度（相對太陽）',
    missionStatus: '任務狀態',
    activeInstruments: '運作中的儀器',
    launchDate: '發射日期',
    interstellarEntry: '進入星際空間',
    au: '天文單位',
    km: '公里',
    kmPerSec: '公里/秒',
    hours: '時',
    minutes: '分',
    seconds: '秒',
  },
  model: {
    title: '航海家太空船 — 3D 模型',
    subtitle: '拖曳旋轉 · 滾輪縮放 · 雙子探測器的互動式呈現',
    dragHint: '拖曳旋轉',
  },
  canvas: {
    title: '日心軌跡圖',
    subtitle: '二維軌道視圖 — 太陽、行星飛掠與日球層頂邊界',
    sun: '太陽',
    earth: '地球',
    earthOrbit: '地球軌道',
    heliopause: '日球層頂（約 120 AU）',
    voyager1: '航海家一號',
    voyager2: '航海家二號',
    jupiterFlyby: '木星飛掠',
    saturnFlyby: '土星飛掠',
    legend: '圖例',
    scaleNote: '徑向比例：0 → 140 AU（對數）',
  },
  status: {
    interstellar: '星際空間',
    active: '運作中',
    operational: '正常運作',
  },
  footer: {
    disclaimer:
      '遙測資料由基準星曆常數於用戶端插值產生，僅供展示用途，並非 NASA 官方資料。',
    dataSource: '基準星曆 · NASA 航海家任務參考資料',
  },
  toggle: {
    showBoth: '顯示兩艘',
    showSingle: '顯示單艘',
  },
};

/** All supported translations keyed by locale. */
export const TRANSLATIONS: Record<Locale, Translation> = {
  'en-US': enUS,
  'zh-TW': zhTW,
};

/** Default locale used on first load. */
export const DEFAULT_LOCALE: Locale = 'en-US';

/** Ordered list of spacecraft ids for iteration. */
export const SPACECRAFT_IDS: SpacecraftId[] = ['voyager1', 'voyager2'];
