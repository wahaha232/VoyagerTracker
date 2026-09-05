/**
 * TypeScript interfaces for the Voyager Tracker application.
 * Defines spacecraft telemetry, ephemeris baselines, and localized content.
 */

/** Supported application locales. */
export type Locale = 'zh-TW' | 'en-US' | 'es';

/** Spacecraft identifiers. */
export type SpacecraftId = 'voyager1' | 'voyager2';

/** A 3D velocity vector in km/s (heliocentric ecliptic frame). */
export interface VelocityVector {
  x: number;
  y: number;
  z: number;
}

/** Baseline ephemeris constants used for client-side interpolation. */
export interface EphemerisBaseline {
  /** Unix epoch timestamp (ms) at which the baseline distances are exact. */
  baseEpochMs: number;
  /** Distance from the Sun at base epoch, in kilometers. */
  sunDistanceKm: number;
  /** Distance from Earth at base epoch, in kilometers. */
  earthDistanceKm: number;
  /** Heliocentric velocity vector in km/s. */
  velocity: VelocityVector;
  /** Nominal cruising speed relative to the Sun in km/s. */
  cruiseSpeedKmS: number;
}

/** A single active scientific instrument aboard a spacecraft. */
export interface Instrument {
  /** Instrument acronym, e.g. "MAG". */
  code: string;
  /** Full instrument name (localized). */
  name: string;
  /** Short description of what the instrument measures (localized). */
  description: string;
}

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
  /** List of currently active scientific instruments. */
  instruments: Instrument[];
}

/** Live, interpolated telemetry for a spacecraft at a given instant. */
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
  /** Current cruising speed relative to the Sun in km/s. */
  cruiseSpeedKmS: number;
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
