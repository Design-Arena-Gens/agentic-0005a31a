'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Locale } from '@/lib/translations';

type Category = 'length' | 'temperature' | 'weight';

type Unit = {
  value: string;
  labels: Record<Locale, string>;
};

type ConversionCategory = {
  units: Unit[];
  toBase: (value: number, unit: string) => number;
  fromBase: (value: number, unit: string) => number;
};

const categoryLabels: Record<Category, Record<Locale, string>> = {
  length: { en: 'Length', es: 'Longitud', fr: 'Longueur' },
  temperature: { en: 'Temperature', es: 'Temperatura', fr: 'Température' },
  weight: { en: 'Weight', es: 'Peso', fr: 'Poids' },
};

const categories: Record<Category, ConversionCategory> = {
  length: {
    units: [
      { value: 'm', labels: { en: 'Meters', es: 'Metros', fr: 'Mètres' } },
      { value: 'km', labels: { en: 'Kilometers', es: 'Kilómetros', fr: 'Kilomètres' } },
      { value: 'mi', labels: { en: 'Miles', es: 'Millas', fr: 'Miles' } },
      { value: 'ft', labels: { en: 'Feet', es: 'Pies', fr: 'Pieds' } },
      { value: 'cm', labels: { en: 'Centimeters', es: 'Centímetros', fr: 'Centimètres' } },
    ],
    toBase: (value, unit) => {
      switch (unit) {
        case 'km':
          return value * 1000;
        case 'mi':
          return value * 1609.34;
        case 'ft':
          return value * 0.3048;
        case 'cm':
          return value / 100;
        default:
          return value;
      }
    },
    fromBase: (value, unit) => {
      switch (unit) {
        case 'km':
          return value / 1000;
        case 'mi':
          return value / 1609.34;
        case 'ft':
          return value / 0.3048;
        case 'cm':
          return value * 100;
        default:
          return value;
      }
    },
  },
  temperature: {
    units: [
      { value: 'c', labels: { en: 'Celsius', es: 'Celsius', fr: 'Celsius' } },
      { value: 'f', labels: { en: 'Fahrenheit', es: 'Fahrenheit', fr: 'Fahrenheit' } },
      { value: 'k', labels: { en: 'Kelvin', es: 'Kelvin', fr: 'Kelvin' } },
    ],
    toBase: (value, unit) => {
      switch (unit) {
        case 'f':
          return ((value - 32) * 5) / 9;
        case 'k':
          return value - 273.15;
        default:
          return value;
      }
    },
    fromBase: (value, unit) => {
      switch (unit) {
        case 'f':
          return (value * 9) / 5 + 32;
        case 'k':
          return value + 273.15;
        default:
          return value;
      }
    },
  },
  weight: {
    units: [
      { value: 'kg', labels: { en: 'Kilograms', es: 'Kilogramos', fr: 'Kilogrammes' } },
      { value: 'lb', labels: { en: 'Pounds', es: 'Libras', fr: 'Livres' } },
      { value: 'g', labels: { en: 'Grams', es: 'Gramos', fr: 'Grammes' } },
      { value: 'oz', labels: { en: 'Ounces', es: 'Onzas', fr: 'Onces' } },
    ],
    toBase: (value, unit) => {
      switch (unit) {
        case 'lb':
          return value * 0.453592;
        case 'g':
          return value / 1000;
        case 'oz':
          return value * 0.0283495;
        default:
          return value;
      }
    },
    fromBase: (value, unit) => {
      switch (unit) {
        case 'lb':
          return value / 0.453592;
        case 'g':
          return value * 1000;
        case 'oz':
          return value / 0.0283495;
        default:
          return value;
      }
    },
  },
};

export function UnitConverter() {
  const { language, dictionary } = useLanguage();
  const [category, setCategory] = useState<Category>('length');
  const [input, setInput] = useState('1');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('km');

  const currentCategory = categories[category];

  const convertedValue = useMemo(() => {
    const numericValue = Number(input);
    if (Number.isNaN(numericValue)) return '';
    const baseValue = currentCategory.toBase(numericValue, fromUnit);
    const finalValue = currentCategory.fromBase(baseValue, toUnit);
    if (!Number.isFinite(finalValue)) return '';
    return finalValue;
  }, [currentCategory, input, fromUnit, toUnit]);

  const formattedValue =
    convertedValue === ''
      ? ''
      : convertedValue % 1 === 0
        ? convertedValue.toLocaleString(language)
        : convertedValue.toLocaleString(language, { maximumFractionDigits: 4 });

  return (
    <section
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
      aria-labelledby="smart-converter-title"
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {dictionary.toolStatus.ready}
        </p>
        <h3 id="smart-converter-title" className="text-xl font-semibold text-slate-900 dark:text-white">
          {dictionary.tools.unitConverter.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {dictionary.tools.unitConverter.description}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
        <span>{dictionary.tools.unitConverter.category}:</span>
        <div className="flex gap-1">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                const nextCategory = key as Category;
                setCategory(nextCategory);
                const firstUnit = categories[nextCategory].units[0].value;
                const secondUnit = categories[nextCategory].units[1]?.value ?? firstUnit;
                setFromUnit(firstUnit);
                setToUnit(secondUnit === firstUnit ? firstUnit : secondUnit);
              }}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-500/40 ${
                category === key
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/40 dark:bg-sky-500'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {categoryLabels[key as Category][language]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.unitConverter.from}
          <input
            type="number"
            inputMode="decimal"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.unitConverter.unitPlaceholder}
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
            value={fromUnit}
            onChange={(event) => setFromUnit(event.target.value)}
          >
            {currentCategory.units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.labels[language]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.unitConverter.to}
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
            value={toUnit}
            onChange={(event) => setToUnit(event.target.value)}
          >
            {currentCategory.units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.labels[language]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="rounded-2xl bg-slate-950/5 px-4 py-3 text-sm font-semibold text-slate-800 dark:bg-slate-100/5 dark:text-slate-100"
        role="status"
        aria-live="polite"
      >
        {formattedValue
          ? `${formattedValue} ${currentCategory.units.find((unit) => unit.value === toUnit)?.labels[language] ?? ''}`
          : dictionary.alerts.noResult}
      </div>
    </section>
  );
}
