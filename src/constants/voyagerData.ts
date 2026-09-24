/**
 * Mission metadata, instrument status and trilingual UI dictionaries for
 * the tracker components.
 *
 * Position/velocity figures are NOT stored here any more: they come from
 * the JPL Horizons-based model in src/lib/ephemeris.ts.
 */

import type { Locale, SpacecraftId, SpacecraftMeta, Translation } from '../types/voyager';

export { AU_KM, C_KM_S as SPEED_OF_LIGHT_KM_S } from '../lib/ephemeris';

/** Static mission metadata for each spacecraft. */
export const SPACECRAFT_META: Record<SpacecraftId, SpacecraftMeta> = {
  voyager1: {
    id: 'voyager1',
    name: 'Voyager 1',
    launchDate: '1977-09-05',
    interstellarEntryDate: '2012-08-25',
    accent: '#22d3ee', // cyan
    gradient: 'from-cyan-500/20 to-sky-900/40',
  },
  voyager2: {
    id: 'voyager2',
    name: 'Voyager 2',
    launchDate: '1977-08-20',
    interstellarEntryDate: '2018-11-05',
    accent: '#34d399', // emerald
    gradient: 'from-emerald-500/20 to-teal-900/40',
  },
};

type Tri = { en: string; zh: string; es: string };

/** The five fields-and-particles instruments still relevant to the interstellar mission. */
export const INSTRUMENTS: Record<string, { name: Tri; description: Tri }> = {
  MAG: {
    name: { en: 'Magnetometer', zh: '磁力計', es: 'Magnetómetro' },
    description: {
      en: 'Measures the strength and direction of the magnetic field around the spacecraft.',
      zh: '量測太空船周圍磁場的強度與方向。',
      es: 'Mide la intensidad y dirección del campo magnético alrededor de la nave.',
    },
  },
  PWS: {
    name: { en: 'Plasma Wave Subsystem', zh: '電漿波次系統', es: 'Subsistema de ondas de plasma' },
    description: {
      en: 'Listens for waves in the surrounding plasma; used to estimate the density of interstellar gas.',
      zh: '偵測周圍電漿中的波動，可用來推算星際氣體的密度。',
      es: 'Detecta ondas en el plasma circundante; sirve para estimar la densidad del gas interestelar.',
    },
  },
  CRS: {
    name: { en: 'Cosmic Ray Subsystem', zh: '宇宙射線次系統', es: 'Subsistema de rayos cósmicos' },
    description: {
      en: 'Counts high-energy particles from the galaxy and the Sun.',
      zh: '計數來自銀河與太陽的高能粒子。',
      es: 'Cuenta partículas de alta energía procedentes de la galaxia y del Sol.',
    },
  },
  LECP: {
    name: { en: 'Low-Energy Charged Particles', zh: '低能量帶電粒子儀', es: 'Partículas cargadas de baja energía' },
    description: {
      en: 'Measures lower-energy ions and electrons; mapped pressure fronts beyond the heliopause.',
      zh: '量測較低能量的離子與電子，曾描繪出日球層頂外的壓力鋒面。',
      es: 'Mide iones y electrones de menor energía; cartografió frentes de presión más allá de la heliopausa.',
    },
  },
  PLS: {
    name: { en: 'Plasma Science', zh: '電漿科學儀', es: 'Ciencia del plasma' },
    description: {
      en: 'Measured the speed, density and temperature of plasma directly.',
      zh: '直接量測電漿的速度、密度與溫度。',
      es: 'Medía directamente la velocidad, densidad y temperatura del plasma.',
    },
  },
};

/** Date of the NASA status report the instrument table below reflects. */
export const INSTRUMENT_STATUS_AS_OF = '2026-08-04';

/**
 * Instrument status per spacecraft, from NASA's "Where Are Voyager 1 and
 * Voyager 2 Now?" page and the Voyager mission blog (see sources.html).
 * `off` is the month the instrument was switched off or stopped working.
 */
export const INSTRUMENT_STATUS: Record<SpacecraftId, { code: string; on: boolean; off?: string }[]> = {
  voyager1: [
    { code: 'MAG', on: true },
    { code: 'PWS', on: true },
    { code: 'LECP', on: false, off: '2026-04' },
    { code: 'CRS', on: false, off: '2025-02' },
    { code: 'PLS', on: false, off: '1980' },
  ],
  voyager2: [
    { code: 'MAG', on: true },
    { code: 'PWS', on: true },
    { code: 'CRS', on: true },
    { code: 'LECP', on: false, off: '2025-03' },
    { code: 'PLS', on: false, off: '2024-10' },
  ],
};

/** English (en-US) translation dictionary. */
const enUS: Translation = {
  locale: 'en-US',
  nativeName: 'English',
  shortLabel: 'EN',
  appTitle: 'Voyager Tracker',
  appSubtitle: 'Voyager Interstellar Mission · Real-Time Estimates',
  nav: {
    overview: 'Overview',
    telemetry: 'Telemetry',
    trajectory: 'Trajectory',
    about: 'About',
  },
  dashboard: {
    title: 'Mission Dashboard',
    subtitle: 'Continuously calculated estimates for the Voyager interstellar probes',
    live: 'ESTIMATE',
    updated: 'Updated',
    compare: 'Comparison View',
    single: 'Single View',
  },
  metrics: {
    distanceFromSun: 'Distance from Sun',
    distanceFromEarth: 'Distance from Earth',
    lightTime: 'One-Way Light Time',
    cruiseSpeed: 'Speed relative to the Sun',
    missionStatus: 'Mission Status',
    activeInstruments: 'Science instruments',
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
    scaleNote: 'Top-down view of the planets’ plane · distance scale 0 → 200 AU (logarithmic)',
  },
  status: {
    interstellar: 'Interstellar Space',
    active: 'Active',
    operational: 'Operational',
  },
  footer: {
    disclaimer:
      'Figures are calculated in your browser from JPL Horizons reference data. They are estimates, not official NASA telemetry.',
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
  appSubtitle: '航海家星際任務 · 即時估算',
  nav: {
    overview: '總覽',
    telemetry: '遙測',
    trajectory: '軌跡',
    about: '關於',
  },
  dashboard: {
    title: '任務儀表板',
    subtitle: '航海家星際探測器的持續計算估計值',
    live: '估計值',
    updated: '更新於',
    compare: '比較檢視',
    single: '單一檢視',
  },
  metrics: {
    distanceFromSun: '與太陽的距離',
    distanceFromEarth: '與地球的距離',
    lightTime: '單程光行時間',
    cruiseSpeed: '相對太陽的速度',
    missionStatus: '任務狀態',
    activeInstruments: '科學儀器',
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
    scaleNote: '由上往下俯視行星軌道面 · 距離比例 0 → 200 AU（對數）',
  },
  status: {
    interstellar: '星際空間',
    active: '運作中',
    operational: '正常運作',
  },
  footer: {
    disclaimer:
      '數值以 JPL Horizons 參考資料在您的瀏覽器內計算，屬估計值，並非 NASA 官方遙測。',
    dataSource: '基準星曆 · NASA 航海家任務參考資料',
  },
  toggle: {
    showBoth: '顯示兩艘',
    showSingle: '顯示單艘',
  },
};

/** Spanish (Español) translation dictionary. */
const esES: Translation = {
  locale: 'es',
  nativeName: 'Español',
  shortLabel: 'ES',
  appTitle: 'Rastreador Voyager',
  appSubtitle: 'Misión interestelar Voyager · Estimaciones en tiempo real',
  nav: {
    overview: 'Resumen',
    telemetry: 'Telemetría',
    trajectory: 'Trayectoria',
    about: 'Acerca de',
  },
  dashboard: {
    title: 'Panel de la misión',
    subtitle: 'Estimaciones calculadas continuamente para las sondas interestelares Voyager',
    live: 'ESTIMADO',
    updated: 'Actualizado',
    compare: 'Vista comparativa',
    single: 'Vista individual',
  },
  metrics: {
    distanceFromSun: 'Distancia al Sol',
    distanceFromEarth: 'Distancia a la Tierra',
    lightTime: 'Tiempo de luz (ida)',
    cruiseSpeed: 'Velocidad respecto al Sol',
    missionStatus: 'Estado de la misión',
    activeInstruments: 'Instrumentos científicos',
    launchDate: 'Fecha de lanzamiento',
    interstellarEntry: 'Entrada interestelar',
    au: 'UA',
    km: 'km',
    kmPerSec: 'km/s',
    hours: 'h',
    minutes: 'min',
    seconds: 's',
  },
  model: {
    title: 'Nave Voyager — Modelo 3D',
    subtitle: 'Arrastra para girar · desplázate para acercar · una representación interactiva de las sondas',
    dragHint: 'Arrastra para girar',
  },
  canvas: {
    title: 'Mapa de trayectoria heliocéntrica',
    subtitle: 'Vista orbital 2D — el Sol, los sobrevuelos planetarios y la heliopausa',
    sun: 'Sol',
    earth: 'Tierra',
    earthOrbit: 'Órbita de la Tierra',
    heliopause: 'Heliopausa (~120 UA)',
    voyager1: 'Voyager 1',
    voyager2: 'Voyager 2',
    jupiterFlyby: 'Sobrevuelo de Júpiter',
    saturnFlyby: 'Sobrevuelo de Saturno',
    legend: 'Leyenda',
    scaleNote: 'Vista cenital del plano de los planetas · escala 0 → 200 UA (logarítmica)',
  },
  status: {
    interstellar: 'Espacio interestelar',
    active: 'Activo',
    operational: 'Operativo',
  },
  footer: {
    disclaimer:
      'Las cifras se calculan en tu navegador a partir de datos de referencia de JPL Horizons. Son estimaciones, no telemetría oficial de la NASA.',
    dataSource: 'Efeméride de referencia · Referencia de la misión Voyager de la NASA',
  },
  toggle: {
    showBoth: 'Mostrar ambas',
    showSingle: 'Mostrar una',
  },
};

/** All supported translations keyed by locale. */
export const TRANSLATIONS: Record<Locale, Translation> = {
  'en-US': enUS,
  'zh-TW': zhTW,
  es: esES,
};

/** Default locale used on first load. */
export const DEFAULT_LOCALE: Locale = 'en-US';

/** Ordered list of spacecraft ids for iteration. */
export const SPACECRAFT_IDS: SpacecraftId[] = ['voyager1', 'voyager2'];
