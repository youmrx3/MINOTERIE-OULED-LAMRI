import Link from 'next/link';
import type { Dict, Locale } from '@/i18n/config';
import { site, telHref, waHref } from '@/content/site';
import { Icon, Star } from './Icon';
import { Logo } from './Logo';
import type { NavItem } from './Header';

export function Footer({ locale, t, nav }: { locale: Locale; t: Dict; nav: NavItem[] }) {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="dark" className="!bg-brown-deep">
      <div className="wrap grid gap-12 pb-14 pt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-20">
        <div className="lg:col-span-4">
          <Logo href={`/${locale}`} label={t.nav.homeLabel} tone="cream" size="lg" />
          <p className="mt-6 max-w-sm text-[1.35rem] leading-snug text-cream" style={{ fontFamily: locale === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)', fontStyle: locale === 'ar' ? 'normal' : 'italic' }}>
            {t.footer.tagline}
          </p>
          <div className="mt-6 flex gap-2">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line transition-colors hover:border-gold-soft hover:text-gold-soft">
              <Icon name="facebook" className="h-5 w-5" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line transition-colors hover:border-gold-soft hover:text-gold-soft">
              <Icon name="instagram" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.pages} className="lg:col-span-2">
          <h2 className="eyebrow mb-4">{t.footer.pages}</h2>
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-tap items-center text-muted no-underline transition-colors hover:text-cream">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-4">{t.footer.contact}</h2>
          <ul className="grid gap-3 text-muted">
            <li>
              <a href={telHref} className="inline-flex min-h-tap items-center gap-3 text-cream no-underline hover:text-gold-soft">
                <Icon name="phone" className="h-5 w-5 text-gold" />
                <span className="ltr text-lg">{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-tap items-center gap-3 no-underline hover:text-cream">
                <Icon name="whatsapp" className="h-5 w-5 text-gold" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-tap items-center gap-3 break-all no-underline hover:text-cream">
                <Icon name="mail" className="h-5 w-5 flex-none text-gold" />
                <span className="ltr text-[0.95rem]">{site.email}</span>
              </a>
            </li>
            <li className="flex gap-3 pt-1">
              <Icon name="map-pin" className="mt-1 h-5 w-5 flex-none text-gold" />
              <span>{site.address[locale]}</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-4">{t.footer.hours}</h2>
          <ul className="grid gap-2 text-muted">
            {t.footer.hoursLines.map((l) => (
              <li key={l} className="flex items-center gap-3">
                <Star className="h-2 w-2 flex-none text-gold" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 pb-28 text-sm text-muted sm:flex-row sm:justify-between lg:pb-6">
          <p>
            © {year} {site.company} · {t.footer.rights}
          </p>
          <p dir="ltr" className="font-semibold tracking-[0.2em]" style={{ fontFamily: 'var(--font-serif)' }}>LA COLOMBE</p>
        </div>
      </div>
    </footer>
  );
}
