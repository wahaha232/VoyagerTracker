/**
 * TypeScript interfaces for the Voyager Tracker application.
 * Defines spacecraft metadata, calculated estimates and localized content.
 */

/** Supported application locales. */
export type Locale = 'zh-TW' | 'en-US' | 'es';

/** Spacecraft identifiers. */
export type SpacecraftId = 'voyager1' | 'voyager2';

/** Static mission metadata for a spacecraft. */
export interface SpacecraftMeta {
  id: SpacecraftId;
  /** Display name, e.g. "Voyager 1". */
  name: string;
  /** Launch date as an ISO string. */
  launchDate: string;
  /** Date the craft entered interstellar space (ISO string). */
  interstellarEntryDate: string;
  /** Primary color accent used across the UI. */
  accent: string;
  /** Tailwind gradient classes for the card header. */
  gradient: string;
}

/** Calculated (estimated) state of a spacecraft at a given instant. */
export interface LiveTelemetry {
  /** Distance from the Sun in kilometers. */
  sunDistanceKm: number;
  /** Distance from the Sun in astronomical units. */
  sunDistanceAu: number;
  /** Distance from Earth in kilometers. */
  earthDistanceKm: number;
  /** Distance from Earth in astronomical units. */
  earthDistanceAu: number;
  /** One-way light time in seconds. */
  lightTimeSeconds: number;
  /** Speed relative to the Sun in km/s. */
  cruiseSpeedKmS: number;
  /** Rate of change of the Earth distance in km/s (positive = moving away). */
  rangeRateKmS: number;
  /** Timestamp (ms) at which this telemetry snapshot was computed. */
  timestampMs: number;
}

/** Localized label dictionary for a single locale. */
export interface Translation {
  locale: Locale;
  /** Native name of the language, e.g. "繁體中文". */
  nativeName: string;
  /** Short label shown on the toggle button. */
  shortLabel: string;
  appTitle: string;
  appSubtitle: string;
  nav: {
    overview: string;
    telemetry: string;
    trajectory: string;
    about: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    live: string;
    updated: string;
    compare: string;
    single: string;
  };
  metrics: {
    distanceFromSun: string;
    distanceFromEarth: string;
    lightTime: string;
    cruiseSpeed: string;
    missionStatus: string;
    activeInstruments: string;
    launchDate: string;
    interstellarEntry: string;
    au: string;
    km: string;
    kmPerSec: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  model: {
    title: string;
    subtitle: string;
    dragHint: string;
  };
  canvas: {
    title: string;
    subtitle: string;
    sun: string;
    earth: string;
    earthOrbit: string;
    heliopause: string;
    voyager1: string;
    voyager2: string;
    jupiterFlyby: string;
    saturnFlyby: string;
    legend: string;
    scaleNote: string;
  };
  status: {
    interstellar: string;
    active: string;
    operational: string;
  };
  footer: {
    disclaimer: string;
    dataSource: string;
  };
  toggle: {
    showBoth: string;
    showSingle: string;
  };
}
