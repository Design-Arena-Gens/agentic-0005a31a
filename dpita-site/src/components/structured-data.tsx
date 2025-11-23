import { translations } from '@/lib/translations';

const siteUrl = 'https://dpita.com';

export function StructuredData() {
  const dictionary = translations.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'dpita.com',
    url: siteUrl,
    headline: dictionary.structuredData.headline,
    description: dictionary.structuredData.description,
    inLanguage: ['en', 'es', 'fr'],
    publisher: {
      '@type': 'Organization',
      name: 'dpita.com',
      url: siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
