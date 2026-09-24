/**
 * entry-server — build-time renderer used by scripts/prerender.mjs.
 *
 * Renders each page to static HTML in English (the default locale). Live
 * values are wrapped in <ClientOnly>, so the static HTML contains the full
 * explanatory text but never a frozen, misleading number.
 */

import { renderToString } from 'react-dom/server';
import type { ComponentType } from 'react';
import Layout from './components/Layout';
import type { PageKey } from './constants/site';
import HomePage from './pages/HomePage';
import Voyager1Page from './pages/Voyager1Page';
import Voyager2Page from './pages/Voyager2Page';
import ComparePage from './pages/ComparePage';
import MissionPage from './pages/MissionPage';
import TimelinePage from './pages/TimelinePage';
import DiscoveriesPage from './pages/DiscoveriesPage';
import GoldenRecordPage from './pages/GoldenRecordPage';
import WhyVoyagerMattersPage from './pages/WhyVoyagerMattersPage';
import ToolsPage from './pages/ToolsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FaqPage, { FAQ_ITEMS } from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import SourcesPage from './pages/SourcesPage';
import UpdatesPage from './pages/UpdatesPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const PAGES: Record<PageKey, ComponentType> = {
  home: HomePage,
  'voyager-1': Voyager1Page,
  'voyager-2': Voyager2Page,
  compare: ComparePage,
  mission: MissionPage,
  timeline: TimelinePage,
  discoveries: DiscoveriesPage,
  'golden-record': GoldenRecordPage,
  'why-voyager-matters': WhyVoyagerMattersPage,
  tools: ToolsPage,
  'how-it-works': HowItWorksPage,
  faq: FaqPage,
  about: AboutPage,
  sources: SourcesPage,
  updates: UpdatesPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  contact: ContactPage,
  'not-found': NotFoundPage,
};

export function render(key: PageKey): string {
  const Page = PAGES[key];
  return renderToString(
    <Layout current={key}>
      <Page />
    </Layout>,
  );
}

/** English FAQ text, exactly as displayed, for the FAQPage JSON-LD. */
export function faqForSchema(): { q: string; a: string }[] {
  return FAQ_ITEMS.map((item) => ({ q: item.q.en, a: item.a.en }));
}
