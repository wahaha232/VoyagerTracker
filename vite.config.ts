import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page (MPA) build for GitHub Pages.
// Each .html page is a real, crawlable URL under the repo base path.
const pageInput = {
  main: resolve(__dirname, 'index.html'),
  'voyager-1': resolve(__dirname, 'voyager-1.html'),
  'voyager-2': resolve(__dirname, 'voyager-2.html'),
  mission: resolve(__dirname, 'mission.html'),
  timeline: resolve(__dirname, 'timeline.html'),
  discoveries: resolve(__dirname, 'discoveries.html'),
  'golden-record': resolve(__dirname, 'golden-record.html'),
  'how-it-works': resolve(__dirname, 'how-it-works.html'),
  faq: resolve(__dirname, 'faq.html'),
  about: resolve(__dirname, 'about.html'),
  sources: resolve(__dirname, 'sources.html'),
  updates: resolve(__dirname, 'updates.html'),
  privacy: resolve(__dirname, 'privacy.html'),
  contact: resolve(__dirname, 'contact.html'),
};

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment (repo name).
  base: '/VoyagerTracker/',
  server: {
    port: 5173,
    open: false,
  },
  build: {
    rollupOptions: {
      input: pageInput,
    },
  },
});
