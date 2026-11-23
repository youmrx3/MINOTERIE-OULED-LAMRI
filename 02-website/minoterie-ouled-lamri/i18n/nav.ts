import { getDict, type Locale } from './config';
import { testimonials } from '@/content/testimonials';

export type NavItem = { href: string; label: string };

/** Testimonials appear in the menu only when at least one review exists. */
export function navFor(locale: Locale): NavItem[] {
  const t = getDict(locale);
  const base = `/${locale}`;
  return [
    { href: base, label: t.nav.home },
    { href: `${base}/a-propos`, label: t.nav.about },
    { href: `${base}/produits`, label: t.nav.products },
    { href: `${base}/galerie`, label: t.nav.gallery },
    ...(testimonials.length ? [{ href: `${base}/temoignages`, label: t.nav.testimonials }] : []),
    { href: `${base}/faq`, label: t.nav.faq },
    { href: `${base}/contact`, label: t.nav.contact },
  ];
}
