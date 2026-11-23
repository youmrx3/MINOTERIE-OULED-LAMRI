'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { GalleryItem } from '@/content/gallery';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

type Labels = { close: string; prev: string; next: string; of: string; placeholder: string };

const span: Record<GalleryItem['ratio'], { cls: string; ratio: string }> = {
  wide: { cls: 'sm:col-span-2', ratio: '16 / 9' },
  sq: { cls: '', ratio: '1 / 1' },
  g43: { cls: '', ratio: '4 / 3' },
};

/**
 * Responsive grid. Tiles with a real photo open a lightbox (keyboard: ← → Esc).
 * Tiles without a photo stay still placeholders.
 */
export function Gallery({ items, locale, labels, limit }: { items: GalleryItem[]; locale: Locale; labels: Labels; limit?: number }) {
  const list = limit ? items.slice(0, limit) : items;
  const photos = list.filter((i) => i.image);
  const [idx, setIdx] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const rtl = locale === 'ar';

  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);
  const close = useCallback(() => {
    setIdx(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (idx === null) return;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
      if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [idx, go, close, rtl]);

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {list.map((it, n) => {
          const s = span[it.ratio];
          const photoIndex = photos.indexOf(it);
          const caption = it.caption[locale];
          return (
            <Reveal as="li" key={it.id} delay={(n % 4) * 70} className={`${s.cls} ${it.ratio === 'wide' ? 'lg:col-span-2' : ''}`}>
              <figure className="group">
                {it.image ? (
                  <button
                    type="button"
                    className="ph relative block w-full overflow-hidden"
                    style={{ aspectRatio: s.ratio }}
                    onClick={(e) => {
                      lastFocus.current = e.currentTarget;
                      setIdx(photoIndex);
                    }}
                    aria-label={caption}
                  >
                    <Image
                      src={it.image}
                      alt={caption}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </button>
                ) : (
                  <div className="ph" style={{ aspectRatio: s.ratio }} role="img" aria-label={`${labels.placeholder} · ${caption}`} />
                )}
                <figcaption className="mt-3 flex items-center gap-2 text-sm text-muted">
                  <span aria-hidden="true" className="h-px w-5 bg-gold" />
                  {caption}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </ul>

      {idx !== null && photos[idx] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[idx].caption[locale]}
          className="fixed inset-0 z-[80] flex flex-col bg-[var(--scrim)] p-4 text-cream backdrop-blur-sm md:p-8"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm" dir="ltr">
              {idx + 1} {labels.of} {photos.length}
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label={labels.close} className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-brown-deep">
              <Icon name="close" />
            </button>
          </div>
          <div className="relative my-4 flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image src={photos[idx].image!} alt={photos[idx].caption[locale]} fill sizes="100vw" className="rounded-lg object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-brown-deep">
              <span className="inline-flex rotate-180">
                <Icon name="arrow" />
              </span>
            </button>
            <p className="text-center">{photos[idx].caption[locale]}</p>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-brown-deep">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
