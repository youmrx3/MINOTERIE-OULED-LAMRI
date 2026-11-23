import type { Dict, Locale } from '@/i18n/config';
import type { Product } from '@/content/products';
import { waHref } from '@/content/site';
import { ImageSlot } from './Blocks';
import { Icon } from './Icon';

/** Card used on the home preview. */
export function ProductCard({ p, locale, t }: { p: Product; locale: Locale; t: Dict }) {
  return (
    <article className="card lift group flex h-full flex-col overflow-hidden">
      <div className="p-3 pb-0">
        <ImageSlot image={p.image} alt={p.name[locale]} placeholderLabel={t.placeholder} ratio="4/3" className="on-band" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="eyebrow !tracking-[0.18em]">{p.use[locale]}</p>
        <h3 className="t-h3 mt-3">{p.name[locale]}</h3>
        <p className="mt-3 flex-1 text-muted">{p.description[locale]}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <ul className="flex flex-wrap gap-2" aria-label={t.products.sizes}>
            {p.sizes.map((s) => (
              <li key={s} dir="ltr" className="rounded-sm bg-gold-tint px-2.5 py-1 text-sm font-medium text-brown">
                {s}
              </li>
            ))}
          </ul>
          <a
            href={waHref(t.products.waAsk + p.name[locale])}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow !min-h-[44px] text-[0.95rem]"
          >
            {t.products.ask}
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Full-width block used on the products page, image side alternating. */
export function ProductBlock({ p, i, locale, t }: { p: Product; i: number; locale: Locale; t: Dict }) {
  const flip = i % 2 === 1;
  return (
    <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className={`md:col-span-6 ${flip ? 'md:order-2' : ''}`}>
        <ImageSlot image={p.image} alt={p.name[locale]} placeholderLabel={t.placeholder} ratio="4/3" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <div className={`md:col-span-6 ${flip ? 'md:order-1' : ''}`}>
        <p className="eyebrow">
          <span className="ltr font-serif text-[1.05rem] tracking-normal text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          {p.use[locale]}
        </p>
        <h2 className="t-h2 mt-4">{p.name[locale]}</h2>
        <p className="t-lead mt-5">{p.description[locale]}</p>
        <dl className="mt-8 grid gap-4 border-y border-line py-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">{t.products.use}</dt>
            <dd className="mt-1 font-medium">{p.use[locale]}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">{t.products.sizes}</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <span key={s} dir="ltr" className="rounded-sm bg-gold-tint px-2.5 py-1 text-sm font-medium text-brown">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <a
          href={waHref(t.products.waAsk + p.name[locale])}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline mt-8"
        >
          <Icon name="whatsapp" />
          {t.products.ask}
        </a>
      </div>
    </article>
  );
}
