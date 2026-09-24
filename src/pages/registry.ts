/**
 * registry — lazy loaders for every page component, keyed by PageKey.
 * Each page becomes its own chunk, so light pages never download the
 * tracker or 3D code.
 */

import type { ComponentType } from 'react';
import { PAGES, type PageKey } from '../constants/site';

type Loader = () => Promise<{ default: ComponentType }>;

export const PAGE_LOADERS: Record<PageKey, Loader> = {
  home: () => import('./HomePage'),
  'voyager-1': () => import('./Voyager1Page'),
  'voyager-2': () => import('./Voyager2Page'),
  compare: () => import('./ComparePage'),
  mission: () => import('./MissionPage'),
  timeline: () => import('./TimelinePage'),
  discoveries: () => import('./DiscoveriesPage'),
  'golden-record': () => import('./GoldenRecordPage'),
  'why-voyager-matters': () => import('./WhyVoyagerMattersPage'),
  tools: () => import('./ToolsPage'),
  'how-it-works': () => import('./HowItWorksPage'),
  faq: () => import('./FaqPage'),
  about: () => import('./AboutPage'),
  sources: () => import('./SourcesPage'),
  updates: () => import('./UpdatesPage'),
  privacy: () => import('./PrivacyPage'),
  terms: () => import('./TermsPage'),
  contact: () => import('./ContactPage'),
  'not-found': () => import('./NotFoundPage'),
};

export function isPageKey(value: string): value is PageKey {
  return Object.prototype.hasOwnProperty.call(PAGES, value);
}
