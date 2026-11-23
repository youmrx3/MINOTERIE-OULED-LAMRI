import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { faq } from '@/content/faq';
import { site, telHref, waHref } from '@/content/site';
import { Reveal } from '@/components/Reveal';
import { PageHead } from '@/components/Blocks';
import { Faq } from '@/components/Faq';
import { Icon } from '@/components/Icon';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return pageMeta(locale, '/faq', getDict(locale).meta.faq);
}

export default async function FaqPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const items = faq.map((f) => ({ q: f.q[locale], a: f.a[locale] }));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHead overline={t.faq.overline} title={t.faq.title} intro={t.faq.intro} />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <Faq items={items} />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <aside data-theme="dark" className="rounded-lg p-6 md:p-8">
              <h2 className="t-h3 text-cream">{t.faq.more}</h2>
              <p className="mt-3 text-muted">{t.ctaBand.text}</p>
              <div className="mt-6 grid gap-3">
                <a href={telHref} className="btn btn-call">
                  <Icon name="phone" />
                  <span className="ltr">{site.phoneDisplay}</span>
                </a>
                <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <Icon name="whatsapp" />
                  {t.cta.whatsappLong}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
