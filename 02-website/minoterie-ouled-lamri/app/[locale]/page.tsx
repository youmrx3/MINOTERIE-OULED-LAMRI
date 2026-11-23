import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { products } from '@/content/products';
import { gallery } from '@/content/gallery';
import { testimonials } from '@/content/testimonials';
import { site, telHref, waHref } from '@/content/site';
import { Seal } from '@/components/Seal';
import { Icon, Star, type IconName } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { ArrowLink, CtaBand, ImageSlot, Overline, SectionHeader } from '@/components/Blocks';
import { ProductCard } from '@/components/ProductCard';
import { Gallery } from '@/components/Gallery';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return pageMeta(await resolveLocale(params), '');
}

const valueIcons: IconName[] = ['quality', 'map-pin', 'wheat'];

export default async function Home({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const h = t.home;
  const lines = h.hero.lines;

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      {/* Desktop: fills the screen under the header, wider than the page container */}
      <section className="relative flex flex-col overflow-hidden lg:min-h-[calc(100svh-72px)]">
        <div className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-12 px-5 pb-12 pt-8 md:px-8 md:pt-14 lg:grid-cols-12 lg:gap-10 lg:py-10 xl:px-14">
          <div className="lg:col-span-7">
            <p className="eyebrow fade-in" style={{ ['--d' as string]: '100ms' }}>
              <Star />
              {h.hero.overline}
            </p>
            <h1 className="t-display mt-6">
              {lines.map((line, i) => {
                const last = i === lines.length - 1;
                return (
                  <span key={i} className="rise block" style={{ ['--d' as string]: `${200 + i * 110}ms` }}>
                    <span
                      className={last ? 'text-gold-deep' : undefined}
                      style={last && locale === 'fr' ? { fontStyle: 'italic', fontWeight: 500 } : undefined}
                    >
                      {line}
                    </span>
                  </span>
                );
              })}
            </h1>
            <p className="t-lead mt-7 max-w-xl fade-in" style={{ ['--d' as string]: '700ms' }}>
              {h.hero.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row fade-in" style={{ ['--d' as string]: '820ms' }}>
              <a href={telHref} className="btn btn-call btn-lg">
                <Icon name="phone" />
                {t.cta.call} · <span className="ltr">{site.phoneDisplay}</span>
              </a>
              <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <Icon name="whatsapp" />
                {t.cta.whatsappLong}
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[0.95rem] text-muted fade-in" style={{ ['--d' as string]: '940ms' }}>
              <Icon name="clock" className="h-5 w-5 text-gold-deep" />
              <span>{h.hero.hoursNote}</span>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:col-span-5 lg:max-w-[min(580px,64svh)]">
            <Seal id="hero-seal" animate className="h-auto w-full" title={`${site.brand} — ${site.company}`} />
          </div>
        </div>

        {/* Separator: the logo's star with two gold rules growing away from it */}
        <div aria-hidden="true" className="mx-auto flex w-full max-w-[1440px] items-center gap-5 px-5 pb-8 md:px-8 lg:pb-10 xl:px-14">
          <span className="sep-line sep-line--start" />
          <Star className="sep-star h-3.5 w-3.5 flex-none text-gold" />
          <span className="sep-line sep-line--end" />
        </div>
      </section>

      {/* ------------------------------------------------------- Values (brown) */}
      <section data-theme="dark" className="section">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <Overline>{h.values.overline}</Overline>
            <h2 className="t-h2 mt-4">{h.values.title}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-0">
            {h.values.items.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i * 110}
                className="border-t border-line pt-8 md:border-t-0 md:border-s md:px-8 md:pt-0 md:first:border-s-0 md:first:ps-0"
              >
                <Icon name={valueIcons[i]} className="h-9 w-9 text-gold" />
                <h3 className="t-h3 mt-6 text-gold-soft">{v.title}</h3>
                <p className="mt-3 text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ Products */}
      <section className="section">
        <div className="wrap">
          <SectionHeader
            overline={h.products.overline}
            title={h.products.title}
            intro={h.products.intro}
            action={<ArrowLink href={`/${locale}/produits`}>{h.products.all}</ArrowLink>}
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 100}>
                <ProductCard p={p} locale={locale} t={t} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- About teaser */}
      <section className="band section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <ImageSlot alt={h.about.title} placeholderLabel={t.placeholder} ratio="3/2" sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6">
            <Overline>{h.about.overline}</Overline>
            <h2 className="t-h2 mt-4">{h.about.title}</h2>
            <p className="t-lead mt-5">{h.about.text}</p>
            <div className="mt-6">
              <ArrowLink href={`/${locale}/a-propos`}>{h.about.more}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Gallery preview */}
      <section className="section">
        <div className="wrap">
          <SectionHeader
            overline={h.gallery.overline}
            title={h.gallery.title}
            action={<ArrowLink href={`/${locale}/galerie`}>{h.gallery.all}</ArrowLink>}
          />
          <Gallery
            items={gallery}
            limit={3}
            locale={locale}
            labels={{ close: t.gallery.close, prev: t.gallery.prev, next: t.gallery.next, of: t.gallery.of, placeholder: t.placeholder }}
          />
        </div>
      </section>

      {/* ------------------------------------------- Testimonials (hidden while empty) */}
      {testimonials.length > 0 && (
        <section className="band section">
          <div className="wrap">
            <SectionHeader overline={h.testimonials.overline} title={h.testimonials.title} />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((q, i) => (
                <Reveal as="li" key={i} delay={i * 100} className="card p-7">
                  <blockquote className="t-h4" style={{ fontStyle: locale === 'fr' ? 'italic' : 'normal' }}>
                    « {q.quote[locale]} »
                  </blockquote>
                  <p className="mt-5 font-medium">{q.name}</p>
                  <p className="text-sm text-muted">{q.role[locale]}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand t={t} />
    </>
  );
}
