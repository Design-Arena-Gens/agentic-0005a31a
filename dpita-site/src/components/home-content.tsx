'use client';

import Link from 'next/link';
import { QuickMath } from '@/components/quick-math';
import { UnitConverter } from '@/components/unit-converter';
import { PasswordGenerator } from '@/components/password-generator';
import { FocusTimer } from '@/components/focus-timer';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/components/language-provider';

export function HomeContent() {
  const { dictionary } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.18),_transparent_55%)]"
      />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-16 pt-6 sm:px-8 lg:px-12">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-1/2 focus:z-50 focus:-translate-x-1/2 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
        >
          Skip to content
        </a>
        <header
          className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/10 px-6 py-6 backdrop-blur lg:flex-row lg:items-center lg:justify-between"
          id="top"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white shadow-lg shadow-sky-500/40">
              {dictionary.brand.toUpperCase()[0]}
            </span>
            <div>
              <p className="text-lg font-semibold text-white lg:text-xl">
                {dictionary.brand}.com
              </p>
              <p className="text-sm text-slate-200">{dictionary.tagline}</p>
            </div>
          </div>
          <nav
            aria-label="Primary navigation"
            className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-100 lg:text-base"
          >
            <Link
              href="#overview"
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {dictionary.nav.overview}
            </Link>
            <Link
              href="#daily-tools"
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {dictionary.nav.tools}
            </Link>
            <Link
              href="#privacy"
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {dictionary.nav.privacy}
            </Link>
            <Link
              href="#accessibility"
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {dictionary.nav.accessibility}
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {dictionary.nav.contact}
            </Link>
            <LanguageSwitcher />
          </nav>
        </header>

        <main
          id="main-content"
          className="relative mt-12 flex flex-1 flex-col gap-20 rounded-3xl border border-white/10 bg-white/90 px-6 py-10 shadow-[0_40px_120px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-10 lg:px-16"
        >
          <section
            id="overview"
            className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
          >
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700 shadow-sm shadow-sky-200">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-sky-500" />
                {dictionary.tagline}
              </span>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                {dictionary.hero.title}
              </h1>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
                {dictionary.hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#daily-tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-600/40 transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  {dictionary.hero.primaryCta}
                </a>
                <a
                  href="#privacy"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3 text-base font-semibold text-sky-700 shadow-sm transition hover:border-sky-300 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:border-slate-800 dark:bg-transparent dark:text-slate-100"
                >
                  {dictionary.hero.secondaryCta}
                </a>
              </div>
              <ul className="grid grid-cols-1 gap-4 text-sm font-semibold text-slate-900 sm:grid-cols-3 dark:text-slate-100">
                {[dictionary.hero.stat1, dictionary.hero.stat2, dictionary.hero.stat3].map(
                  (stat) => (
                    <li
                      key={stat}
                      className="rounded-2xl bg-slate-100/70 p-4 shadow-inner dark:bg-slate-900/60"
                    >
                      {stat}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="relative rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-500 p-[1px] shadow-2xl">
              <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-slate-900/95 p-8 text-slate-100">
                <h2 className="text-lg font-semibold text-white">
                  {dictionary.toolsSection.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {dictionary.toolsSection.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {dictionary.highlights.map((highlight) => (
                    <li
                      key={highlight.title}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-emerald-400" />
                      <div>
                        <p className="font-semibold text-white">{highlight.title}</p>
                        <p className="text-slate-200/80">{highlight.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="daily-tools" className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                {dictionary.toolsSection.title}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-200">
                {dictionary.toolsSection.description}
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <QuickMath />
              <UnitConverter />
              <PasswordGenerator />
              <FocusTimer />
            </div>
          </section>

          <section id="privacy" className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                {dictionary.privacy.title}
              </h2>
              <ul className="mt-4 space-y-3 text-base text-slate-700 dark:text-slate-200">
                {dictionary.privacy.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-rose-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/privacy"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 underline decoration-sky-400 decoration-2 underline-offset-4 transition hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
              >
                {dictionary.privacy.cta}
              </Link>
            </div>
          </section>

          <section
            id="accessibility"
            className="grid gap-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-100 md:grid-cols-[1.2fr_1fr]"
          >
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
                {dictionary.accessibility.title}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-200">
                {dictionary.accessibility.description}
              </p>
            </div>
            <ul className="space-y-3 text-base text-slate-700 dark:text-slate-200">
              {dictionary.accessibility.bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-sky-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="contact"
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 p-[1px] shadow-xl dark:border-slate-800"
          >
            <div className="flex flex-col items-start gap-4 rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/95 px-6 py-8 dark:bg-slate-950/95 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {dictionary.brand}.com
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-200">
                  {dictionary.footer.statement}
                </p>
              </div>
              <a
                href="mailto:hello@dpita.com"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                hello@dpita.com
              </a>
            </div>
          </section>
        </main>

        <footer className="mt-10 flex flex-col items-start gap-2 text-sm text-slate-300 sm:flex-row sm:justify-between">
          <p>{dictionary.footer.statement}</p>
          <p>{dictionary.footer.rights}</p>
        </footer>
      </div>
    </div>
  );
}
