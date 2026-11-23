import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Dict, Locale } from '@/i18n/config';
import { site, telHref, waHref } from '@/content/site';
import { Icon, Star } from './Icon';
import { Reveal } from './Reveal';
import { Seal } from './Seal';

/* ---------------------------------------------------------------- Overline */
export function Overline({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <Star />
      {children}
    </p>
  );
}

/* ---------------------------------------------------------- Section header */
export function SectionHeader({
  overline,
  title,
  intro,
  align = 'start',
  action,
  as: H = 'h2',
}: {
  overline: string;
  title: string;
  intro?: string;
  align?: 'start' | 'center';
  action?: ReactNode;
  as?: 'h1' | 'h2';
}) {
  const center = align === 'center';
  return (
    <Reveal className={`mb-10 flex flex-col gap-6 md:mb-14 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        <Overline>{overline}</Overline>
        <H className={`${H === 'h1' ? 't-h1' : 't-h2'} mt-4`}>{title}</H>
        {intro && <p className="t-lead mt-5">{intro}</p>}
      </div>
      {action && <div className="flex-none">{action}</div>}
    </Reveal>
  );
}

/* -------------------------------------------------------------- Page head */
export function PageHead({ overline, title, intro }: { overline: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="wrap relative grid gap-8 pb-14 pt-12 md:pb-20 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow fade-in" style={{ ['--d' as string]: '0ms' }}>
            <Star />
            {overline}
          </p>
          <h1 className="t-h1 mt-5 fade-in" style={{ ['--d' as string]: '80ms' }}>
            {title}
          </h1>
          {intro && (
            <p className="t-lead mt-6 max-w-2xl fade-in" style={{ ['--d' as string]: '160ms' }}>
              {intro}
            </p>
          )}
        </div>
      </div>
      {/* The seal as a large still watermark, cropped at the end edge */}
      <div aria-hidden="true" className="pointer-events-none absolute -end-24 top-1/2 hidden w-[420px] -translate-y-1/2 opacity-[0.09] md:block lg:-end-10">
        <Seal id="ph-seal" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Image slot / placeholder */
export function ImageSlot({
  image,
  alt,
  placeholderLabel,
  ratio,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  className = '',
}: {
  image?: string;
  alt: string;
  placeholderLabel: string;
  ratio: '4/3' | '3/2' | '1/1' | '16/9' | '4/5' | '21/9';
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`ph ${className}`}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
      role={image ? undefined : 'img'}
      aria-label={image ? undefined : `${placeholderLabel} · ${alt}`}
    >
      {image && <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />}
    </div>
  );
}

/* --------------------------------------------------------------- CTA band */
export function CtaBand({ t }: { locale?: Locale; t: Dict }) {
  return (
    <section data-theme="dark" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -end-40 w-[560px] opacity-[0.12] md:-end-24">
        <Seal id="cta-seal" tone="dark" />
      </div>
      <div className="wrap relative section grid items-end gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Overline>{t.ctaBand.overline}</Overline>
          <h2 className="t-h2 mt-4 text-cream">{t.ctaBand.title}</h2>
          <p className="t-lead mt-5 max-w-xl">{t.ctaBand.text}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <a href={telHref} className="btn btn-call btn-lg">
            <Icon name="phone" />
            <span className="ltr">{site.phoneDisplay}</span>
          </a>
          <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
            <Icon name="whatsapp" />
            {t.cta.whatsappLong}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Floating WhatsApp */
export function FloatingWhatsApp({ t }: { t: Dict }) {
  return (
    <a
      href={waHref(t.cta.waText)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.cta.whatsappLong}
      className="wa-float fixed bottom-4 end-4 z-30 inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-pill bg-whatsapp px-4 text-whatsapp-on shadow-raised transition-[background-color,transform] duration-200 hover:bg-whatsapp-hover active:scale-95 md:bottom-6 md:end-6"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
      <span className="hidden font-medium md:inline">{t.cta.whatsapp}</span>
    </a>
  );
}

/* -------------------------------------------------------------- Arrow link */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link-arrow">
      {children}
      <Icon name="arrow" />
    </Link>
  );
}
