/**
 * Site-wide page registry used by the header navigation, footer, breadcrumbs
 * and "Related information" panels.
 *
 * All content pages are real .html files (Vite MPA build) so search engines
 * can crawl each URL independently.
 */

export type PageKey =
  | 'home'
  | 'voyager-1'
  | 'voyager-2'
  | 'mission'
  | 'timeline'
  | 'discoveries'
  | 'golden-record'
  | 'how-it-works'
  | 'faq'
  | 'about'
  | 'sources'
  | 'updates'
  | 'privacy'
  | 'contact';

export type PageGroup = 'live' | 'learn' | 'support';

export interface PageInfo {
  key: PageKey;
  /** File name used for the real URL ('' for the home page). */
  href: string;
  /** Short label shown in menus. */
  label: string;
  /** Longer label used in content links. */
  title: string;
  group: PageGroup;
  /** One-line description used in related-link cards. */
  description: string;
}

export const PAGES: Record<PageKey, PageInfo> = {
  home: {
    key: 'home',
    href: '',
    label: 'Home',
    title: 'Voyager Tracker — Home',
    group: 'live',
    description: 'Live distance, speed and status of Voyager 1 and Voyager 2 with mission overview.',
  },
  'voyager-1': {
    key: 'voyager-1',
    href: 'voyager-1.html',
    label: 'Voyager 1',
    title: 'Voyager 1',
    group: 'live',
    description: 'Voyager 1 mission history, distance from Earth and current interstellar status.',
  },
  'voyager-2': {
    key: 'voyager-2',
    href: 'voyager-2.html',
    label: 'Voyager 2',
    title: 'Voyager 2',
    group: 'live',
    description: 'Voyager 2 — the only spacecraft to visit Uranus and Neptune — with live tracker data.',
  },
  mission: {
    key: 'mission',
    href: 'mission.html',
    label: 'Mission',
    title: 'The Voyager Mission',
    group: 'learn',
    description: 'How the Voyager program began, the Grand Tour and the mission that keeps going.',
  },
  timeline: {
    key: 'timeline',
    href: 'timeline.html',
    label: 'Timeline',
    title: 'Voyager Mission Timeline',
    group: 'learn',
    description: 'A fact-based timeline from the 1977 launches to today\u2019s interstellar operations.',
  },
  discoveries: {
    key: 'discoveries',
    href: 'discoveries.html',
    label: 'Discoveries',
    title: 'Scientific Discoveries',
    group: 'learn',
    description: 'Io\u2019s volcanoes, Neptune\u2019s winds, interstellar plasma — Voyager\u2019s key science results.',
  },
  'golden-record': {
    key: 'golden-record',
    href: 'golden-record.html',
    label: 'Golden Record',
    title: 'The Golden Record',
    group: 'learn',
    description: 'The phonograph record carried by Voyager as a message to any civilization that finds it.',
  },
  'how-it-works': {
    key: 'how-it-works',
    href: 'how-it-works.html',
    label: 'How It Works',
    title: 'How Voyager Tracker Works',
    group: 'learn',
    description: 'Where the data comes from, how distances are estimated and what \u201clive\u201d really means here.',
  },
  faq: {
    key: 'faq',
    href: 'faq.html',
    label: 'FAQ',
    title: 'Frequently Asked Questions',
    group: 'learn',
    description: 'Honest answers to common questions about the Voyager spacecraft and this website.',
  },
  about: {
    key: 'about',
    href: 'about.html',
    label: 'About',
    title: 'About Voyager Tracker',
    group: 'support',
    description: 'What this independent, educational website is — and what it is not.',
  },
  sources: {
    key: 'sources',
    href: 'sources.html',
    label: 'Sources',
    title: 'Sources & References',
    group: 'support',
    description: 'Official NASA / JPL references and the methodology used for every figure on this site.',
  },
  updates: {
    key: 'updates',
    href: 'updates.html',
    label: 'Updates',
    title: 'Mission & Site Updates',
    group: 'support',
    description: 'A log of real mission and website changes — never generated for SEO alone.',
  },
  privacy: {
    key: 'privacy',
    href: 'privacy.html',
    label: 'Privacy',
    title: 'Privacy Policy',
    group: 'support',
    description: 'How this site handles cookies, local storage and third-party services.',
  },
  contact: {
    key: 'contact',
    href: 'contact.html',
    label: 'Contact',
    title: 'Contact & Feedback',
    group: 'support',
    description: 'Report a data problem or technical issue through the project\u2019s GitHub repository.',
  },
};

/** Pages shown in the compact desktop navigation bar. */
export const HEADER_NAV: PageKey[] = [
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
];

/** Full ordered list shown in the mobile menu and footer. */
export const ALL_PAGES: PageKey[] = [
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

/** Build a real page URL under the deployment base path. */
export function pageUrl(key: PageKey): string {
  const info = PAGES[key];
  return key === 'home'
    ? `${import.meta.env.BASE_URL}`
    : `${import.meta.env.BASE_URL}${info.href}`;
}

/** Traditional-Chinese labels for every page (content chrome stays bilingual). */
export const PAGES_ZH: Record<PageKey, { label: string; title: string; description: string }> = {
  home: { label: '首頁', title: '航海家號追蹤器', description: '航海家一號與二號的即時距離、速度與任務現況，以及完整任務介紹。' },
  'voyager-1': { label: '航海家一號', title: '航海家一號', description: '航海家一號的任務歷史、與地球的距離及星際空間現況。' },
  'voyager-2': { label: '航海家二號', title: '航海家二號', description: '唯一拜訪過天王星與海王星的探測器，含即時追蹤資料。' },
  mission: { label: '任務介紹', title: '航海家任務', description: '航海家計畫如何開始、大旅行任務與持續至今的星際任務。' },
  timeline: { label: '任務時間軸', title: '航海家任務時間軸', description: '從 1977 年發射到今日星際任務的真實時間軸。' },
  discoveries: { label: '科學發現', title: '科學發現', description: '木衛一火山、海王星狂風與星際電漿——航海家的重要發現。' },
  'golden-record': { label: '金唱片', title: '航海家金唱片', description: '搭載於航海家號上、代表地球聲音、音樂與影像的金質唱片。' },
  'how-it-works': { label: '資料與方法', title: '資料與計算方法', description: '資料從哪裡來、距離如何估算，以及「即時」的真正意義。' },
  faq: { label: '常見問題', title: '常見問題', description: '關於航海家號與本站的常見問題與誠實解答。' },
  about: { label: '關於本站', title: '關於航海家號追蹤器', description: '這個獨立教育網站是什麼——以及它不是什麼。' },
  sources: { label: '資料來源', title: '資料來源與參考', description: '本站每個數字背後的 NASA / JPL 官方來源。' },
  updates: { label: '更新紀錄', title: '任務與網站更新', description: '真實的任務與網站更新紀錄，絕不為了 SEO 硬湊內容。' },
  privacy: { label: '隱私政策', title: '隱私政策', description: '本站如何處理 Cookie、瀏覽器儲存與第三方服務。' },
  contact: { label: '聯絡我們', title: '聯絡與意見回饋', description: '透過 GitHub 回報資料錯誤或技術問題。' },
};

/** Language-aware navigation label. */
export function pageLabel(key: PageKey, locale: 'zh-TW' | 'en-US'): string {
  return locale === 'zh-TW' ? PAGES_ZH[key].label : PAGES[key].label;
}

