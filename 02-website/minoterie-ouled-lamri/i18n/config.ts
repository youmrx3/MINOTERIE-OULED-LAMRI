import fr from '@/messages/fr.json';
import ar from '@/messages/ar.json';

export const locales = ['fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export type Dict = typeof fr;
const dictionaries: Record<Locale, Dict> = { fr, ar };

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}
export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
export function dirOf(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** Localized content field used in content/*.ts */
export type L10n = { fr: string; ar: string };
export const tr = (v: L10n, locale: Locale) => v[locale];
