'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

const DEFAULT_LENGTH = 16;

const charset = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>/?',
};

export function PasswordGenerator() {
  const { dictionary } = useLanguage();
  const [length, setLength] = useState<number>(DEFAULT_LENGTH);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let available = '';
    if (includeLowercase) available += charset.lower;
    if (includeUppercase) available += charset.upper;
    if (includeNumbers) available += charset.numbers;
    if (includeSymbols) available += charset.symbols;
    if (!available) {
      return '';
    }
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    const chars = Array.from({ length }, (_, index) => {
      const randomIndex = array[index] % available.length;
      return available[randomIndex];
    });
    return chars.join('');
  }, [includeLowercase, includeUppercase, includeNumbers, includeSymbols, length]);

  useEffect(() => {
    setPassword(generatePassword());
  }, [generatePassword]);

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
      aria-labelledby="secure-password-generator"
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          {dictionary.toolStatus.ready}
        </p>
        <h3
          id="secure-password-generator"
          className="text-xl font-semibold text-slate-900 dark:text-white"
        >
          {dictionary.tools.passwordGenerator.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {dictionary.tools.passwordGenerator.description}
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.passwordGenerator.length}: {length}
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="accent-sky-600"
            aria-valuemin={8}
            aria-valuemax={64}
            aria-valuenow={length}
          />
        </label>

        <fieldset className="grid grid-cols-1 gap-2 text-sm text-slate-700 dark:text-slate-200">
          <legend className="sr-only">{dictionary.tools.passwordGenerator.name}</legend>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(event) => setIncludeLowercase(event.target.checked)}
              className="h-4 w-4 rounded border border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            {dictionary.tools.passwordGenerator.includeLowercase}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(event) => setIncludeUppercase(event.target.checked)}
              className="h-4 w-4 rounded border border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            {dictionary.tools.passwordGenerator.includeUppercase}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(event) => setIncludeNumbers(event.target.checked)}
              className="h-4 w-4 rounded border border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            {dictionary.tools.passwordGenerator.includeNumbers}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(event) => setIncludeSymbols(event.target.checked)}
              className="h-4 w-4 rounded border border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            {dictionary.tools.passwordGenerator.includeSymbols}
          </label>
        </fieldset>
      </div>

      <div className="flex flex-col gap-2">
        <div
          className="w-full break-all rounded-2xl bg-slate-950/5 px-4 py-3 text-base font-semibold text-slate-800 dark:bg-slate-100/5 dark:text-slate-100"
          role="status"
          aria-live="polite"
        >
          {password}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPassword(generatePassword())}
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-600/40 transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            {dictionary.tools.passwordGenerator.generate}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
          >
            {copied ? dictionary.tools.passwordGenerator.copied : dictionary.tools.passwordGenerator.copy}
          </button>
        </div>
      </div>
    </section>
  );
}
