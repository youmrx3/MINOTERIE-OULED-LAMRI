import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { site, mapsHref } from '@/content/site';
import { Reveal } from '@/components/Reveal';
import { CtaBand, ImageSlot, Overline, PageHead } from '@/components/Blocks';
import { Icon, type IconName } from '@/components/Icon';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return pageMeta(locale, '/a-propos', getDict(locale).meta.about);
}

const valueIcons: IconName[] = ['quality', 'map-pin', 'wheat'];

export default async function About({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  const a = t.about;

  return (
    <>
      <PageHead overline={a.overline} title={a.title} intro={a.intro} />

      {/* Story */}
      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ImageSlot alt={a.storyTitle} placeholderLabel={t.placeholder} ratio="4/5" sizes="(min-width: 1024px) 40vw, 100vw" className="max-lg:aspect-[3/2]" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:pt-8">
            <Overline>{a.overline}</Overline>
            <h2 className="t-h2 mt-4">{a.storyTitle}</h2>
            <div className="mt-6 grid gap-5">
              {a.story.map((p, i) => (
                <p key={i} className={i === 0 ? 't-lead !text-ink' : 'text-muted'}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process: a real sequence, so it is numbered */}
      <section className="band section">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <Overline>{a.processOverline}</Overline>
            <h2 className="t-h2 mt-4">{a.processTitle}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
            {a.process.map((s, i) => {
              // The connector runs from each number toward the next step; hidden at the end of a row.
              const lineVis = i === 3 ? 'md:hidden' : i === 1 ? 'md:hidden lg:block' : '';
              return (
                <Reveal as="li" key={s.title} delay={i * 160} className="step">
                  <div className="flex items-center gap-4">
                    <span className="step-num inline-flex h-14 w-14 flex-none items-center justify-center rounded-pill border border-gold text-[1.6rem] font-semibold leading-none text-gold-deep" dir="ltr" style={{ fontFamily: 'var(--font-serif)' }}>
                      {i + 1}
                    </span>
                    <span aria-hidden="true" className={`step-line h-px flex-1 bg-gold ${lineVis}`} />
                  </div>
                  <h3 className="t-h3 mt-6">{s.title}</h3>
                  <p className="mt-3 text-muted">{s.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <Overline>{a.valuesOverline}</Overline>
          </Reveal>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {t.home.values.items.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 100} className="card p-7">
                <Icon name={valueIcons[i]} className="h-8 w-8 text-gold-deep" />
                <h3 className="t-h3 mt-5">{v.title}</h3>
                <p className="mt-3 text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Location */}
      <section className="band section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Overline>{a.locationOverline}</Overline>
            <h2 className="t-h2 mt-4">{a.locationTitle}</h2>
            <p className="t-lead mt-5">{a.locationText}</p>
            <p className="mt-6 flex gap-3">
              <Icon name="map-pin" className="mt-1 h-5 w-5 flex-none text-gold-deep" />
              {site.address[locale]}
            </p>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-8">
              <Icon name="map-pin" />
              {t.contact.openMaps}
            </a>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6">
            <ImageSlot alt={a.locationTitle} placeholderLabel={t.placeholder} ratio="3/2" sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <CtaBand t={t} />
    </>
  );
}
