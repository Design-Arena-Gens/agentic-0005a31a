'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
const operations: Operation[] = ['add', 'subtract', 'multiply', 'divide'];

export function QuickMath() {
  const { dictionary } = useLanguage();
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [operation, setOperation] = useState<Operation>('add');

  const result = useMemo(() => {
    const a = Number(firstValue);
    const b = Number(secondValue);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return '';
    }
    switch (operation) {
      case 'add':
        return (a + b).toString();
      case 'subtract':
        return (a - b).toString();
      case 'multiply':
        return (a * b).toString();
      case 'divide':
        if (b === 0) {
          return '∞';
        }
        return (a / b).toFixed(4).toString();
      default:
        return '';
    }
  }, [firstValue, secondValue, operation]);

  const status =
    firstValue && secondValue ? dictionary.toolStatus.running : dictionary.toolStatus.ready;

  return (
    <section
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
      aria-labelledby="quick-math-title"
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          {status}
        </p>
        <h3 id="quick-math-title" className="text-xl font-semibold text-slate-900 dark:text-white">
          {dictionary.tools.quickMath.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {dictionary.tools.quickMath.description}
        </p>
      </header>

      <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-describedby="quick-math-result">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.quickMath.inputA}
          <input
            type="number"
            inputMode="decimal"
            value={firstValue}
            onChange={(event) => setFirstValue(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.quickMath.inputB}
          <input
            type="number"
            inputMode="decimal"
            value={secondValue}
            onChange={(event) => setSecondValue(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200 sm:col-span-2">
          {dictionary.tools.quickMath.operationLabel}
          <select
            value={operation}
            onChange={(event) => setOperation(event.target.value as Operation)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          >
            {operations.map((option) => (
              <option key={option} value={option}>
                {dictionary.tools.quickMath.operations[option]}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div
        id="quick-math-result"
        className="rounded-2xl bg-slate-950/5 px-4 py-3 text-sm font-semibold text-slate-800 dark:bg-slate-100/5 dark:text-slate-100"
        role="status"
        aria-live="polite"
      >
        {result
          ? `${dictionary.tools.quickMath.result}: ${result}`
          : dictionary.alerts.noResult}
      </div>
    </section>
  );
}
