import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { products } from '@/content/products';
import { Reveal } from '@/components/Reveal';
import { CtaBand, PageHead } from '@/components/Blocks';
import { ProductBlock } from '@/components/ProductCard';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return pageMeta(locale, '/produits', getDict(locale).meta.products);
}

export default async function Products({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  return (
    <>
      <PageHead overline={t.products.overline} title={t.products.title} intro={t.products.intro} />
      <section className="section">
        <div className="wrap grid gap-20 md:gap-28">
          {products.map((p, i) => (
            <Reveal key={p.id} id={p.id}>
              <ProductBlock p={p} i={i} locale={locale} t={t} />
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand t={t} />
    </>
  );
}
