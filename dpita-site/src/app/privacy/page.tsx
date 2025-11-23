import Link from 'next/link';

export const metadata = {
  title: 'Privacy Promise',
  description:
    'dpita.com operates with a privacy-first mindset. No accounts, no tracking, and all tools run locally in your browser.',
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-20 text-slate-800 dark:text-slate-100">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Privacy Promise
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Privacy is built in, not bolted on.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-200">
          dpita.com keeps your data on your device. Nothing is sent to our servers, nothing is
          stored, and there is no account to create.
        </p>
      </header>

      <section className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
        <p>
          All of our tools—calculators, converters, timers, and generators—run locally inside your
          browser session. We do not capture inputs, outputs, or usage analytics. Once you close the
          tab, every tool resets automatically.
        </p>
        <p>
          We respect the privacy features of your browser. If you use content blockers or
          high-privacy modes, dpita.com continues to work as expected. We do not load third-party
          fonts, ad scripts, or analytics beacons.
        </p>
        <p>
          Want to inspect things yourself? dpita.com is built with modern web standards. Open your
          developer tools—you will see a lean application with no external calls.
        </p>
      </section>

      <footer className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="text-sky-600 underline hover:text-sky-500 dark:text-sky-300">
          Back to dpita.com
        </Link>
      </footer>
    </main>
  );
}
