import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDict, isLocale, type Locale } from './config';

/** Localized metadata with canonical + hreflang alternates for one route. */
export function pageMeta(locale: Locale, path: string, title?: string): Metadata {
  const t = getDict(locale);
  return {
    title: title ?? { absolute: t.meta.title },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { fr: `/fr${path}`, ar: `/ar${path}`, 'x-default': `/fr${path}` },
    },
  };
}

/** Resolve the [locale] param or 404. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
