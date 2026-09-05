/**
 * Minimal i18n infrastructure for the Voyager Tracker site.
 *
 * The chosen locale is persisted in localStorage so the whole site stays in
 * the same language while browsing between pages. Page components read the
 * locale through useI18n() and render their content in that language.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { Locale } from '../types/voyager';

const STORAGE_KEY = 'vt-locale';

export type { Locale };

function readInitialLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'zh-TW' || saved === 'en-US' || saved === 'es' ? saved : 'en-US';
  } catch {
    return 'en-US';
  }
}

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nValue>({
  locale: 'en-US',
  setLocale: () => undefined,
  toggleLocale: () => undefined,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => readInitialLocale());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Ignore storage failures (private mode etc.).
    }
    document.documentElement.lang = locale === 'zh-TW' ? 'zh-TW' : locale === 'es' ? 'es' : 'en';
  }, [locale]);

  const set = useCallback((next: Locale) => setLocale(next), []);
  const toggle = useCallback(
    () =>
      setLocale((prev) =>
        prev === 'en-US' ? 'zh-TW' : prev === 'zh-TW' ? 'es' : 'en-US',
      ),
    [],
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale: set, toggleLocale: toggle }),
    [locale, set, toggle],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Read the current locale and switcher actions from anywhere in the tree. */
export function useI18n(): I18nValue {
  return useContext(I18nContext);
}
