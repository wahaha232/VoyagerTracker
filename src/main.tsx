/**
 * main — entry point for the multi-page Voyager Tracker site.
 *
 * Every built .html page carries a data-page attribute on #root. This module
 * resolves the page key and lazy-loads only that page's component, so light
 * informational pages never download the 3D/telemetry chunks.
 */

import { StrictMode, Suspense, lazy } from 'react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';
import type { PageKey } from './constants/site';
import './index.css';

const PAGE_KEYS: PageKey[] = [
  'home',
  'voyager-1',
  'voyager-2',
  'mission',
  'timeline',
  'discoveries',
  'golden-record',
  'how-it-works',
  'faq',
  'about',
  'sources',
  'updates',
  'privacy',
  'contact',
];

const LOADERS: Record<PageKey, () => Promise<{ default: ComponentType }>> = {
  home: () => import('./pages/HomePage'),
  'voyager-1': () => import('./pages/Voyager1Page'),
  'voyager-2': () => import('./pages/Voyager2Page'),
  mission: () => import('./pages/MissionPage'),
  timeline: () => import('./pages/TimelinePage'),
  discoveries: () => import('./pages/DiscoveriesPage'),
  'golden-record': () => import('./pages/GoldenRecordPage'),
  'how-it-works': () => import('./pages/HowItWorksPage'),
  faq: () => import('./pages/FaqPage'),
  about: () => import('./pages/AboutPage'),
  sources: () => import('./pages/SourcesPage'),
  updates: () => import('./pages/UpdatesPage'),
  privacy: () => import('./pages/PrivacyPage'),
  contact: () => import('./pages/ContactPage'),
};

const rootEl = document.getElementById('root') as HTMLElement | null;
const rawPage = rootEl?.dataset.page;
const page: PageKey =
  rawPage && (PAGE_KEYS as string[]).includes(rawPage) ? (rawPage as PageKey) : 'home';

const CurrentPage = lazy(LOADERS[page]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout current={page}>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="font-mono text-sm tracking-widest text-cyan-300/70">
              Loading signal…
            </p>
          </div>
        }
      >
        <CurrentPage />
      </Suspense>
    </Layout>
  </StrictMode>,
);

