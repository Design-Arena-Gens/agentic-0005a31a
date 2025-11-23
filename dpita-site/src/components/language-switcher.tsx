'use client';

import { ChangeEvent } from 'react';
import { Locale, translations } from '@/lib/translations';
import { useLanguage } from '@/components/language-provider';

const localeOrder: Locale[] = ['en', 'es', 'fr'];

export function LanguageSwitcher() {
  const { language, setLanguage, dictionary } = useLanguage();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Locale);
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-100 md:text-slate-900 dark:md:text-slate-100">
      <span className="sr-only md:not-sr-only">{dictionary.languageSelector}</span>
      <span className="md:hidden" aria-hidden="true">
        🌐
      </span>
      <select
        className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
        value={language}
        onChange={handleChange}
        aria-label={dictionary.languageSelector}
      >
        {localeOrder.map((locale) => (
          <option key={locale} value={locale}>
            {translations[locale].languageName}
          </option>
        ))}
      </select>
    </label>
  );
}
