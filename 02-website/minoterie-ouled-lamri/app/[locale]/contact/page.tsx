import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { site, telHref, waHref, mapsHref } from '@/content/site';
import { Reveal } from '@/components/Reveal';
import { PageHead } from '@/components/Blocks';
import { ContactForm } from '@/components/ContactForm';
import { Hours } from '@/components/Hours';
import { Icon, Star } from '@/components/Icon';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return pageMeta(locale, '/contact', getDict(locale).meta.contact);
}

/**
 * Two rows on one 12-column grid (7 | 5), so every column edge lines up:
 *   row 1 → form            | phone + hours (stretches to the form's height)
 *   row 2 → map             | e-mail, address, social (same height as the map)
 * On phones the contact details come first: the phone is the preferred channel.
 */
export default async function Contact({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const c = t.contact;
  const pad = 'p-6 md:p-8';

  return (
    <>
      <PageHead overline={c.overline} title={c.title} intro={c.intro} />
      <section className="section !pt-10 md:!pt-16">
        <div className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Row 1, end column: phone + hours */}
          <Reveal className="flex flex-col gap-6 lg:order-2 lg:col-span-5 lg:gap-8">
            <div data-theme="dark" className={`rounded-lg ${pad}`}>
              <p className="eyebrow">
                <Star />
                {c.phone}
              </p>
              <a
                href={telHref}
                className="lnum mt-4 flex min-h-tap w-fit items-center text-[2.4rem] font-semibold leading-none text-cream no-underline hover:text-gold-soft"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <span className="ltr">{site.phoneDisplay}</span>
              </a>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href={telHref} className="btn btn-call !px-4">
                  <Icon name="phone" />
                  {t.cta.call}
                </a>
                <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp !px-4">
                  <Icon name="whatsapp" />
                  {t.cta.whatsapp}
                </a>
              </div>
            </div>

            <div className={`card flex-1 ${pad}`}>
              <h2 className="eyebrow">
                <Star />
                {c.hours}
              </h2>
              <div className="mt-4">
                <Hours t={t} />
              </div>
            </div>
          </Reveal>

          {/* Row 1, start column: form (same height as the column beside it) */}
          <Reveal delay={100} className="lg:order-1 lg:col-span-7">
            <div className={`card h-full ${pad}`}>
              <h2 className="eyebrow">
                <Star />
                {c.formTitle}
              </h2>
              <div className="mt-6">
                <ContactForm t={t} />
              </div>
            </div>
          </Reveal>

          {/* Row 2, end column: e-mail, address, social */}
          <Reveal className="lg:order-4 lg:col-span-5">
            <div className={`card flex h-full flex-col gap-6 ${pad}`}>
              <a href={`mailto:${site.email}`} className="flex items-start gap-4 no-underline hover:text-gold-deep">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-pill bg-gold-tint text-brown">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="block text-sm text-muted">{c.email}</span>
                  <span className="ltr break-all">{site.email}</span>
                </span>
              </a>
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-pill bg-gold-tint text-brown">
                  <Icon name="map-pin" className="h-5 w-5" />
                </span>
                <span className="pt-0.5">
                  <span className="block text-sm text-muted">{c.address}</span>
                  {site.address[locale]}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-sm text-muted">{c.social}</p>
                <div className="flex gap-2">
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-pill border-[1.5px] border-border-strong transition-colors hover:border-brown">
                    <Icon name="facebook" className="h-5 w-5" />
                  </a>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-pill border-[1.5px] border-border-strong transition-colors hover:border-brown">
                    <Icon name="instagram" className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Row 2, start column: static map block until coordinates arrive */}
          <Reveal delay={100} className="lg:order-3 lg:col-span-7">
            <div className="ph on-band flex h-full min-h-[240px] items-center justify-center !bg-none p-6 text-center" role="group" aria-label={c.map}>
              <div className="relative z-[1] flex flex-col items-center gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-pill bg-brown text-cream">
                  <Icon name="map-pin" className="h-6 w-6" />
                </span>
                <p className="max-w-sm font-medium">{site.address[locale]}</p>
                {!site.coordinates && <p className="text-sm text-muted">{c.mapNote}</p>}
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="link-arrow">
                  {c.openMaps}
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
