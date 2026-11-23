import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { site } from '@/content/site';
import { testimonials } from '@/content/testimonials';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/a-propos', '/produits', '/galerie', '/faq', '/contact', ...(testimonials.length ? ['/temoignages'] : [])];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${site.url}/${l}${p}`,
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${site.url}/${x}${p}`])) },
    })),
  );
}
