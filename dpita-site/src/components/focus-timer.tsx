'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export function FocusTimer() {
  const { dictionary } = useLanguage();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = useMemo(() => minutes * 60 + seconds, [minutes, seconds]);

  useEffect(() => {
    if (status !== 'running') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          intervalRef.current = null;
          setStatus('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status]);

  const handleStart = useCallback(() => {
    if (totalSeconds === 0) return;
    setStatus('running');
    setRemainingSeconds((prev) => (prev === 0 ? totalSeconds : prev));
  }, [totalSeconds]);

  const handlePause = useCallback(() => {
    setStatus('paused');
  }, []);

  const handleReset = useCallback(() => {
    setStatus('idle');
    setRemainingSeconds(totalSeconds);
  }, [totalSeconds]);

  const remainingMinutes = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSecs = (remainingSeconds % 60).toString().padStart(2, '0');

  const statusLabel = {
    idle: dictionary.tools.focusTimer.statusIdle,
    running: dictionary.tools.focusTimer.statusRunning,
    paused: dictionary.tools.focusTimer.statusPaused,
    finished: dictionary.tools.focusTimer.statusFinished,
  }[status];

  return (
    <section
      className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-900/5 transition hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
      aria-labelledby="focus-timer-title"
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          {statusLabel}
        </p>
        <h3 id="focus-timer-title" className="text-xl font-semibold text-slate-900 dark:text-white">
          {dictionary.tools.focusTimer.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {dictionary.tools.focusTimer.description}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.focusTimer.minutes}
          <input
            type="number"
            min={0}
            max={180}
            value={minutes}
            onChange={(event) => {
              const nextValue = Math.min(180, Math.max(0, Number(event.target.value)));
              setMinutes(nextValue);
              if (status === 'idle' || status === 'finished') {
                setRemainingSeconds(nextValue * 60 + seconds);
              }
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          {dictionary.tools.focusTimer.seconds}
          <input
            type="number"
            min={0}
            max={59}
            value={seconds}
            onChange={(event) => {
              const nextValue = Math.min(59, Math.max(0, Number(event.target.value)));
              setSeconds(nextValue);
              if (status === 'idle' || status === 'finished') {
                setRemainingSeconds(minutes * 60 + nextValue);
              }
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base font-semibold text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
          />
        </label>
      </div>

      <div
        className="flex items-center justify-center rounded-2xl bg-slate-950/5 px-6 py-8 text-4xl font-bold tracking-widest text-slate-900 dark:bg-slate-100/5 dark:text-white"
        role="timer"
        aria-live="polite"
      >
        {remainingMinutes}:{remainingSecs}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleStart}
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/40 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 disabled:cursor-not-allowed disabled:bg-emerald-900/50"
          disabled={status === 'running' || totalSeconds === 0}
        >
          {dictionary.tools.focusTimer.start}
        </button>
        <button
          type="button"
          onClick={handlePause}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status !== 'running'}
        >
          {dictionary.tools.focusTimer.pause}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/40 dark:text-slate-200 dark:hover:text-white"
        >
          {dictionary.tools.focusTimer.reset}
        </button>
      </div>
    </section>
  );
}
