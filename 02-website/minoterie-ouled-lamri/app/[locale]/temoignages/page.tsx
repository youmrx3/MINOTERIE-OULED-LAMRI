import { notFound } from 'next/navigation';
import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { testimonials } from '@/content/testimonials';
import { Reveal } from '@/components/Reveal';
import { CtaBand, PageHead } from '@/components/Blocks';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return { ...pageMeta(locale, '/temoignages', getDict(locale).meta.testimonials), robots: testimonials.length ? undefined : { index: false } };
}

// Hidden (404) while content/testimonials.ts is empty.
export default async function Testimonials({ params }: Props) {
  const locale = await resolveLocale(params);
  if (!testimonials.length) notFound();
  const t = getDict(locale);
  return (
    <>
      <PageHead overline={t.testimonials.overline} title={t.testimonials.title} intro={t.testimonials.intro} />
      <section className="section">
        <ul className="wrap grid gap-6 md:grid-cols-2">
          {testimonials.map((q, i) => (
            <Reveal as="li" key={i} delay={(i % 2) * 100} className="card p-8">
              <blockquote className="t-h3" style={{ fontStyle: locale === 'fr' ? 'italic' : 'normal', fontWeight: 500 }}>
                « {q.quote[locale]} »
              </blockquote>
              <p className="mt-6 font-medium">{q.name}</p>
              <p className="text-sm text-muted">{q.role[locale]}</p>
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand t={t} />
    </>
  );
}
