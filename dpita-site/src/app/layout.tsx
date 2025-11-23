import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/language-provider';
import { translations } from '@/lib/translations';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dpita.com'),
  title: {
    default: 'dpita.com — Effortless Daily Productivity Tools',
    template: '%s • dpita.com',
  },
  description:
    'dpita.com is the sleek, multilingual productivity hub delivering secure, privacy-first daily tools with a lightning-fast, inclusive experience.',
  keywords: translations.en.seo.keywords.split(',').map((keyword) => keyword.trim()),
  authors: [{ name: 'dpita.com' }],
  creator: 'dpita.com',
  publisher: 'dpita.com',
  openGraph: {
    title: 'dpita.com — Effortless Daily Productivity Tools',
    description:
      'Access free, privacy-first daily tools with multilingual support, inclusive accessibility, and instant performance.',
    url: 'https://dpita.com',
    siteName: 'dpita.com',
    images: [
      {
        url: 'https://dpita.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'dpita.com — Daily Productivity Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dpita.com — Effortless Daily Productivity Tools',
    description:
      'Your go-to daily toolkit with secure, inclusive, multilingual tools that load in under two seconds.',
    creator: '@dpita',
    images: ['https://dpita.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://dpita.com',
    languages: {
      en: 'https://dpita.com',
      es: 'https://dpita.com/es',
      fr: 'https://dpita.com/fr',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
  category: 'productivity',
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-900 antialiased dark:bg-slate-950`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
