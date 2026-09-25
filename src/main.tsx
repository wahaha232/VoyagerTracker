/**
 * main — browser entry point for the multi-page Voyager Tracker site.
 *
 * Every built .html page carries a data-page attribute on #root and
 * already contains prerendered HTML (see scripts/prerender.mjs). This
 * module loads only that page's component and hydrates the existing
 * markup (reusing the DOM instead of rebuilding it); live values and the
 * visitor's saved language are applied right after, by effects.
 */

import { StrictMode } from 'react';
import type { ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Layout from './components/Layout';
import { PAGE_LOADERS, isPageKey } from './pages/registry';
// Self-hosted monospace font (Latin only; no third-party font requests).
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import './index.css';

const rootEl = document.getElementById('root') as HTMLElement;
const raw = rootEl.dataset.page;
const page = raw && isPageKey(raw) ? raw : 'home';

/**
 * Runs `fn` after the browser has painted the prerendered HTML at least once.
 * Hidden tabs get no animation frames, so they (and a slow frame) fall back
 * to a timer instead of waiting until the tab is shown.
 */
function afterFirstPaint(fn: () => void) {
  let done = false;
  const run = () => {
    if (!done) {
      done = true;
      fn();
    }
  };
  if (document.hidden) return run();
  requestAnimationFrame(() => setTimeout(run, 0));
  setTimeout(run, 200);
}

// Load the page module first so hydration happens in one pass; start after
// the first paint so the prerendered text appears without waiting for React.
afterFirstPaint(() => PAGE_LOADERS[page]().then(({ default: Page }: { default: ComponentType }) => {
  const app = (
    <StrictMode>
      <Layout current={page}>
        <Page />
      </Layout>
    </StrictMode>
  );
  if (rootEl.hasChildNodes()) {
    hydrateRoot(rootEl, app, {
      // React re-renders any part that differs; keep that out of the console.
      onRecoverableError: (error) => console.debug('[hydration]', error),
    });
  } else {
    // Dev server: the HTML has no prerendered content.
    createRoot(rootEl).render(app);
  }
}));
