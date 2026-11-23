import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Cormorant_Garamond, Jost, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { dirOf, getDict, isLocale, locales } from '@/i18n/config';
import { navFor } from '@/i18n/nav';
import { site } from '@/content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/Blocks';
import '../globals.css';

// Brand typefaces (charte graphique, page 10)
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' });
const jost = Jost({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-jost', display: 'swap' });
// Arabic: a modern, even-stroked sans that pairs with Jost (replaces Amiri at the client's request)
const arabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600', '700'], variable: '--font-arabic-face', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#F4ECDD',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s · ${t.meta.siteName}` },
    description: t.meta.description,
    icons: { icon: '/images/logo-brown.svg' },
    openGraph: { siteName: t.meta.siteName, locale: locale === 'ar' ? 'ar_DZ' : 'fr_DZ', type: 'website' },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  const nav = navFor(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${site.brand} — ${site.company}`,
    telephone: site.phoneIntl,
    email: site.email,
    url: `${site.url}/${locale}`,
    image: `${site.url}/images/logo-brown.svg`,
    address: { '@type': 'PostalAddress', streetAddress: 'Bir Aissa', addressLocality: 'Ain Tasserra', addressRegion: 'Bordj Bou Arréridj', addressCountry: 'DZ' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'], opens: '08:00', closes: '16:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '08:00', closes: '12:00' },
    ],
  };

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${cormorant.variable} ${jost.variable} ${arabic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Header locale={locale} t={t} nav={nav} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} t={t} nav={nav} />
        <FloatingWhatsApp t={t} />
      </body>
    </html>
  );
}
