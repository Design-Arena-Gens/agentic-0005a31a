'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, getTranslation } from '@/lib/translations';

type LanguageContextValue = {
  language: Locale;
  setLanguage: (locale: Locale) => void;
  dictionary: ReturnType<typeof getTranslation>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LOCAL_STORAGE_KEY = 'dpita-language';

const resolveLocale = (value?: string | null): Locale => {
  if (!value) return 'en';
  const normalized = value.toLowerCase().slice(0, 2);
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('fr')) return 'fr';
  return 'en';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return resolveLocale(stored);
      }
    } catch {
      // Ignore storage read errors (e.g., private browsing).
    }
    return resolveLocale(window.navigator.language);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, language);
    } catch {
      // Ignore storage write errors silently.
    }
    const html = document.documentElement;
    html.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dictionary: getTranslation(language),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
