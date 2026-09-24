/**
 * Site-wide page registry used by the header navigation, footer, breadcrumbs
 * and "Related information" panels.
 *
 * All content pages are real .html files (Vite MPA build) so search engines
 * can crawl each URL independently. Page titles/descriptions for <head> live
 * in scripts/pages.mjs; keep the keys in sync.
 */

import type { Locale } from '../types/voyager';

export type PageKey =
  | 'home'
  | 'voyager-1'
  | 'voyager-2'
  | 'compare'
  | 'mission'
  | 'timeline'
  | 'discoveries'
  | 'golden-record'
  | 'why-voyager-matters'
  | 'tools'
  | 'how-it-works'
  | 'faq'
  | 'about'
  | 'sources'
  | 'updates'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'not-found';

type Tri = { en: string; zh: string; es: string };

interface PageInfo {
  /** File name used for the real URL ('' for the home page). */
  href: string;
  label: Tri;
  /** One-line description used in related-link cards. */
  description: Tri;
}

export const PAGES: Record<PageKey, PageInfo> = {
  home: {
    href: '',
    label: { en: 'Home', zh: '首頁', es: 'Inicio' },
    description: {
      en: 'Where both Voyagers are right now, explained — with context and comparisons.',
      zh: '兩艘航海家號此刻的位置與白話解說，附上尺度比較。',
      es: 'Dónde están ahora ambas Voyager, explicado con contexto y comparaciones.',
    },
  },
  'voyager-1': {
    href: 'voyager-1.html',
    label: { en: 'Voyager 1', zh: '航海家一號', es: 'Voyager 1' },
    description: {
      en: 'Jupiter, Saturn, the Pale Blue Dot and the first entry into interstellar space.',
      zh: '木星、土星、蒼藍小點，以及人類首度進入星際空間。',
      es: 'Júpiter, Saturno, el pálido punto azul y la primera entrada al espacio interestelar.',
    },
  },
  'voyager-2': {
    href: 'voyager-2.html',
    label: { en: 'Voyager 2', zh: '航海家二號', es: 'Voyager 2' },
    description: {
      en: 'The only spacecraft to visit Uranus and Neptune, now in interstellar space.',
      zh: '唯一造訪天王星與海王星的太空船，如今身處星際空間。',
      es: 'La única nave que visitó Urano y Neptuno, hoy en el espacio interestelar.',
    },
  },
  compare: {
    href: 'compare.html',
    label: { en: 'Compare', zh: '一號 vs 二號', es: 'Comparar' },
    description: {
      en: 'Side-by-side distance chart, routes and milestones — and why the twins differ.',
      zh: '並列的距離圖表、路線與里程碑——以及這對雙胞胎為何如此不同。',
      es: 'Gráfico de distancia, rutas e hitos lado a lado, y por qué las gemelas difieren.',
    },
  },
  mission: {
    href: 'mission.html',
    label: { en: 'Mission', zh: '任務介紹', es: 'Misión' },
    description: {
      en: 'How the program began, the Grand Tour alignment and the extended mission.',
      zh: '計畫如何開始、大旅行的行星排列，以及延長任務。',
      es: 'Cómo empezó el programa, la alineación del Gran Tour y la misión extendida.',
    },
  },
  timeline: {
    href: 'timeline.html',
    label: { en: 'Timeline', zh: '任務時間軸', es: 'Cronología' },
    description: {
      en: 'Interactive timeline: every key event with its context and source.',
      zh: '互動式時間軸：每個關鍵事件的背景與出處。',
      es: 'Cronología interactiva: cada evento clave con su contexto y su fuente.',
    },
  },
  discoveries: {
    href: 'discoveries.html',
    label: { en: 'Science', zh: '科學發現', es: 'Ciencia' },
    description: {
      en: 'What Voyager saw at four giant planets and beyond — and why it mattered.',
      zh: '航海家在四顆巨行星與更遠處看到了什麼——以及為何重要。',
      es: 'Qué vio Voyager en cuatro planetas gigantes y más allá, y por qué importó.',
    },
  },
  'golden-record': {
    href: 'golden-record.html',
    label: { en: 'Golden Record', zh: '金唱片', es: 'Disco de Oro' },
    description: {
      en: 'What is on the record each Voyager carries, and why it was made.',
      zh: '每艘航海家號攜帶的唱片裡有什麼，以及它為何被製作。',
      es: 'Qué contiene el disco que lleva cada Voyager y por qué se hizo.',
    },
  },
  'why-voyager-matters': {
    href: 'why-voyager-matters.html',
    label: { en: 'Why It Matters', zh: '為何重要', es: 'Por qué importa' },
    description: {
      en: 'Why a 1970s mission is still scientifically important today.',
      zh: '為什麼一項 1970 年代的任務至今仍具科學價值。',
      es: 'Por qué una misión de los años setenta sigue siendo importante hoy.',
    },
  },
  tools: {
    href: 'tools.html',
    label: { en: 'Tools', zh: '計算工具', es: 'Herramientas' },
    description: {
      en: 'Signal delay, unit converter, “where was it on…?” and travel-time calculators.',
      zh: '訊號延遲、單位換算、「某天它在哪」與旅行時間計算器。',
      es: 'Retardo de señal, conversor, “¿dónde estaba el…?” y tiempo de viaje.',
    },
  },
  'how-it-works': {
    href: 'how-it-works.html',
    label: { en: 'How It Works', zh: '運作原理', es: 'Cómo funciona' },
    description: {
      en: 'The calculation model, how it was validated, and its limits.',
      zh: '計算模型、驗證方式，以及它的限制。',
      es: 'El modelo de cálculo, cómo se validó y sus límites.',
    },
  },
  faq: {
    href: 'faq.html',
    label: { en: 'FAQ', zh: '常見問題', es: 'Preguntas' },
    description: {
      en: 'Honest answers about the probes, the numbers and this site.',
      zh: '關於探測器、數字與本站的誠實解答。',
      es: 'Respuestas honestas sobre las sondas, las cifras y este sitio.',
    },
  },
  about: {
    href: 'about.html',
    label: { en: 'About', zh: '關於本站', es: 'Acerca de' },
    description: {
      en: 'Who runs this independent project, why, and what it is not.',
      zh: '誰在經營這個獨立專案、為什麼，以及它不是什麼。',
      es: 'Quién lleva este proyecto independiente, por qué y qué no es.',
    },
  },
  sources: {
    href: 'sources.html',
    label: { en: 'Sources', zh: '資料來源', es: 'Fuentes' },
    description: {
      en: 'Which NASA/JPL reference supports each part of the site.',
      zh: '本站各部分內容分別依據哪些 NASA/JPL 資料。',
      es: 'Qué referencia de NASA/JPL respalda cada parte del sitio.',
    },
  },
  updates: {
    href: 'updates.html',
    label: { en: 'Updates', zh: '更新紀錄', es: 'Novedades' },
    description: {
      en: 'Dated mission events from NASA/JPL and changes to this site.',
      zh: 'NASA/JPL 公布的任務事件，以及本站的修改紀錄。',
      es: 'Eventos de la misión publicados por NASA/JPL y cambios del sitio.',
    },
  },
  privacy: {
    href: 'privacy.html',
    label: { en: 'Privacy', zh: '隱私政策', es: 'Privacidad' },
    description: {
      en: 'What is stored in your browser and which services pages contact.',
      zh: '瀏覽器中儲存了什麼，以及頁面會連線到哪些服務。',
      es: 'Qué se guarda en tu navegador y qué servicios contactan las páginas.',
    },
  },
  terms: {
    href: 'terms.html',
    label: { en: 'Terms', zh: '使用條款', es: 'Términos' },
    description: {
      en: 'Conditions of use, accuracy limits and independence from NASA/JPL.',
      zh: '使用條件、準確度限制，以及與 NASA/JPL 的獨立關係。',
      es: 'Condiciones de uso, límites de precisión e independencia de NASA/JPL.',
    },
  },
  contact: {
    href: 'contact.html',
    label: { en: 'Contact', zh: '聯絡我們', es: 'Contacto' },
    description: {
      en: 'Report an error, broken link or calculation issue.',
      zh: '回報錯誤、失效連結或計算問題。',
      es: 'Informa de un error, un enlace roto o un problema de cálculo.',
    },
  },
  'not-found': {
    href: '404.html',
    label: { en: 'Page not found', zh: '找不到頁面', es: 'Página no encontrada' },
    description: { en: '', zh: '', es: '' },
  },
};

/** Pages shown in the desktop navigation bar (Home is the logo). */
export const HEADER_NAV: PageKey[] = [
  'voyager-1',
  'voyager-2',
  'compare',
  'mission',
  'timeline',
  'discoveries',
  'golden-record',
  'tools',
  'faq',
  'sources',
  'about',
];

/** Full ordered list shown in the mobile menu. */
export const ALL_PAGES: PageKey[] = [
  'home',
  'voyager-1',
  'voyager-2',
  'compare',
  'mission',
  'timeline',
  'discoveries',
  'golden-record',
  'why-voyager-matters',
  'tools',
  'how-it-works',
  'faq',
  'sources',
  'about',
  'updates',
  'contact',
  'privacy',
  'terms',
];

/** Build a real page URL under the deployment base path. */
export function pageUrl(key: PageKey): string {
  return `${import.meta.env.BASE_URL}${PAGES[key].href}`;
}

const pickTri = (v: Tri, locale: Locale) => (locale === 'zh-TW' ? v.zh : locale === 'es' ? v.es : v.en);

/** Language-aware navigation label. */
export function pageLabel(key: PageKey, locale: Locale): string {
  return pickTri(PAGES[key].label, locale);
}

/** Language-aware one-line description. */
export function pageDescription(key: PageKey, locale: Locale): string {
  return pickTri(PAGES[key].description, locale);
}
