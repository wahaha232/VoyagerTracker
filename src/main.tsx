/**
 * main — browser entry point for the multi-page Voyager Tracker site.
 *
 * Every built .html page carries a data-page attribute on #root and
 * already contains prerendered HTML (see scripts/prerender.mjs). This
 * module loads only that page's component, then renders it — replacing
 * the static markup with the interactive version in the visitor's
 * language, with live values.
 */

import { StrictMode } from 'react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';
import { PAGE_LOADERS, isPageKey } from './pages/registry';
import './index.css';

const rootEl = document.getElementById('root') as HTMLElement;
const raw = rootEl.dataset.page;
const page = raw && isPageKey(raw) ? raw : 'home';

// Load the page module before the first render so the prerendered HTML is
// swapped directly for the interactive page (no "loading" flash).
PAGE_LOADERS[page]().then(({ default: Page }: { default: ComponentType }) => {
  createRoot(rootEl).render(
    <StrictMode>
      <Layout current={page}>
        <Page />
      </Layout>
    </StrictMode>,
  );
});
