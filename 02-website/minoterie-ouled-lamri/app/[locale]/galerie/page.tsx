import { getDict } from '@/i18n/config';
import { pageMeta, resolveLocale } from '@/i18n/meta';
import { gallery } from '@/content/gallery';
import { CtaBand, PageHead } from '@/components/Blocks';
import { Gallery } from '@/components/Gallery';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return pageMeta(locale, '/galerie', getDict(locale).meta.gallery);
}

export default async function GalleryPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDict(locale);
  return (
    <>
      <PageHead overline={t.gallery.overline} title={t.gallery.title} intro={t.gallery.intro} />
      <section className="section">
        <div className="wrap">
          <Gallery
            items={gallery}
            locale={locale}
            labels={{ close: t.gallery.close, prev: t.gallery.prev, next: t.gallery.next, of: t.gallery.of, placeholder: t.placeholder }}
          />
        </div>
      </section>
      <CtaBand t={t} />
    </>
  );
}
