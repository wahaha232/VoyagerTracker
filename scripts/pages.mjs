/**
 * pages.mjs — single source of truth for every public URL.
 *
 * Used by gen-html.mjs (writes the Vite HTML entry files) and
 * prerender.mjs (injects rendered HTML, JSON-LD and the sitemap).
 * Keep keys in sync with PageKey in src/constants/site.ts.
 */

export const SITE_URL = 'https://wahaha232.github.io/VoyagerTracker/';
export const SITE_NAME = 'Voyager Tracker';

/**
 * schema: the schema.org type that honestly describes the page.
 * changefreq/priority: sitemap hints.
 */
export const PAGES = [
  {
    key: 'home',
    file: 'index.html',
    title: 'Voyager Tracker — Estimated Distance, Speed & Mission Information',
    description:
      'Where are Voyager 1 and Voyager 2 right now? Continuously calculated distance, speed and signal delay, explained in plain language, with mission history, comparisons and calculators.',
    schema: 'WebPage',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    key: 'voyager-1',
    file: 'voyager-1.html',
    name: 'Voyager 1',
    title: 'Voyager 1 — Distance, Speed & Mission Information',
    description:
      'Voyager 1’s estimated distance and speed today, its Jupiter and Saturn encounters, the Pale Blue Dot, its 2012 entry into interstellar space and which instruments still work.',
    schema: 'Article',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    key: 'voyager-2',
    file: 'voyager-2.html',
    name: 'Voyager 2',
    title: 'Voyager 2 — Distance, Speed & Mission Information',
    description:
      'Voyager 2’s estimated distance and speed today, the only visits ever made to Uranus and Neptune, its 2018 heliopause crossing and its current instrument status.',
    schema: 'Article',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    key: 'compare',
    file: 'compare.html',
    name: 'Voyager 1 vs Voyager 2',
    title: 'Voyager 1 vs Voyager 2 — Side-by-Side Comparison',
    description:
      'Compare the twin Voyagers: distance over five decades, speed, routes, planetary encounters and interstellar crossings — and why two identical spacecraft ended up so different.',
    schema: 'Article',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    key: 'mission',
    file: 'mission.html',
    name: 'The Voyager Mission',
    title: 'The Voyager Mission — Origins, Grand Tour & Interstellar Mission',
    description:
      'How the Voyager program began, why a rare planetary alignment mattered, what each spacecraft carried and how a four-year mission became a fifty-year one.',
    schema: 'Article',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    key: 'timeline',
    file: 'timeline.html',
    name: 'Mission Timeline',
    title: 'Voyager Mission Timeline — Voyager 1 & Voyager 2',
    description:
      'An interactive timeline of the Voyager mission from the 1977 launches to today, with the context, significance and source of every event.',
    schema: 'Article',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    key: 'discoveries',
    file: 'discoveries.html',
    name: 'Science',
    title: 'Voyager Scientific Discoveries — Jupiter to Interstellar Space',
    description:
      'What Voyager saw at Jupiter, Saturn, Uranus and Neptune and beyond the heliopause — explained: why each finding mattered and what it changed.',
    schema: 'Article',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    key: 'golden-record',
    file: 'golden-record.html',
    name: 'Golden Record',
    title: 'Voyager Golden Record — History, Contents & Purpose',
    description:
      'What is on the Golden Record carried by both Voyagers, who chose it, how it is meant to be played and why it still matters as a message about ourselves.',
    schema: 'Article',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    key: 'why-voyager-matters',
    file: 'why-voyager-matters.html',
    name: 'Why Voyager Still Matters',
    title: 'Why Voyager Still Matters — Science, Engineering & Legacy',
    description:
      'Nearly fifty years on, why Voyager is still scientifically important: interstellar measurements, long-lived engineering, deep-space communication and the value of long data records.',
    schema: 'Article',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    key: 'tools',
    file: 'tools.html',
    name: 'Tools',
    title: 'Voyager Calculators — Light Time, Distance Converter & Travel Time',
    description:
      'Calculate signal delay to Voyager, convert its distance between km, miles, AU and light-time, see where it was on any date and compare hypothetical travel times.',
    schema: 'WebPage',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    key: 'how-it-works',
    file: 'how-it-works.html',
    name: 'How It Works',
    title: 'How Voyager Tracker Works — Model, Accuracy & Limitations',
    description:
      'The calculation behind every number on this site: JPL Horizons reference data, the propagation model, how it was validated, its accuracy and its limits.',
    schema: 'Article',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    key: 'faq',
    file: 'faq.html',
    name: 'FAQ',
    title: 'Voyager Tracker FAQ — Distance, Mission & Data',
    description:
      'Clear answers about how far the Voyagers are, whether they still work, why the distance from Earth sometimes shrinks and how this site calculates its figures.',
    schema: 'FAQPage',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    key: 'sources',
    file: 'sources.html',
    name: 'Sources',
    title: 'Voyager Tracker — Data Sources & Methodology',
    description:
      'Which NASA and JPL sources support each part of this site — mission dates, encounters, instrument status and the distance model — with direct links.',
    schema: 'WebPage',
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    key: 'about',
    file: 'about.html',
    name: 'About',
    title: 'About Voyager Tracker',
    description:
      'Who runs Voyager Tracker, why it exists, how it works, what data it uses and its limitations. An independent project, not affiliated with NASA or JPL.',
    schema: 'AboutPage',
    changefreq: 'yearly',
    priority: '0.4',
  },
  {
    key: 'updates',
    file: 'updates.html',
    name: 'Updates',
    title: 'Voyager Mission & Site Updates — Voyager Tracker',
    description:
      'A dated log of real Voyager mission events reported by NASA/JPL and of changes and corrections made to this website.',
    schema: 'WebPage',
    changefreq: 'weekly',
    priority: '0.5',
  },
  {
    key: 'contact',
    file: 'contact.html',
    name: 'Contact',
    title: 'Contact Voyager Tracker',
    description: 'Report an error, a broken link, a calculation problem or a copyright concern about Voyager Tracker.',
    schema: 'ContactPage',
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    key: 'privacy',
    file: 'privacy.html',
    name: 'Privacy Policy',
    title: 'Privacy Policy — Voyager Tracker',
    description: 'What Voyager Tracker stores in your browser, which third-party services pages contact, and how advertising would be handled.',
    schema: 'WebPage',
    changefreq: 'yearly',
    priority: '0.2',
  },
  {
    key: 'terms',
    file: 'terms.html',
    name: 'Terms of Use',
    title: 'Terms of Use — Voyager Tracker',
    description: 'The terms for using Voyager Tracker: educational purpose, estimated data, accuracy limits, external links and independence from NASA/JPL.',
    schema: 'WebPage',
    changefreq: 'yearly',
    priority: '0.2',
  },
];

/** The friendly 404 page: rendered with the site layout, never indexed. */
export const NOT_FOUND = {
  key: 'not-found',
  file: '404.html',
  title: 'Page Not Found — Voyager Tracker',
  description: 'The page you were looking for does not exist on Voyager Tracker.',
  noindex: true,
};

export const pageHref =(p) => (p.key === 'home' ? SITE_URL : `${SITE_URL}${p.file}`);
