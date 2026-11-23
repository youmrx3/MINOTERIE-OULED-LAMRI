'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Dict, Locale } from '@/i18n/config';
import { telHref, waHref, site } from '@/content/site';
import { Icon, Star } from './Icon';
import { Logo } from './Logo';

export type { NavItem } from '@/i18n/nav';
import type { NavItem } from '@/i18n/nav';

export function Header({ locale, t, nav }: { locale: Locale; t: Dict; nav: NavItem[] }) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Header gains its rule once the page moves
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Drawer: lock scroll, Escape closes, focus stays inside
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const first = drawerRef.current?.querySelector<HTMLElement>('a,button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const f = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a,button'));
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const rest = pathname.replace(/^\/(fr|ar)(?=\/|$)/, '');
  const isActive = (href: string) => (href === `/${locale}` ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[70] -translate-y-24 rounded-md bg-brown px-4 py-3 text-cream transition-transform focus:translate-y-0"
      >
        {t.nav.skip}
      </a>

      <header
        className={`header-in sticky top-0 z-50 bg-cream transition-shadow duration-300 ${scrolled && !open ? 'shadow-[0_6px_18px_-12px_rgba(58,37,22,0.35)]' : ''}`}
      >
        {/* Thin gold rule under the bar: draws from the centre outward on load */}
        <span aria-hidden="true" className="header-rule pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gold" />
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <Logo href={`/${locale}`} label={t.nav.homeLabel} />

          <nav aria-label="Navigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.slice(1).map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className="group relative inline-flex min-h-tap items-center px-3 text-[0.98rem] font-medium no-underline"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-2 h-[1.5px] origin-left bg-gold rtl:origin-right transition-transform duration-300 ease-out ${
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch locale={locale} rest={rest} label={t.nav.language} />
            <a href={telHref} className="btn btn-call hidden !min-h-0 h-10 gap-2 !rounded-pill !px-4 text-[0.9rem] sm:inline-flex [&_svg]:!h-4 [&_svg]:!w-4">
              <Icon name="phone" />
              <span className="ltr">{site.phoneDisplay}</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill transition-colors hover:bg-gold-tint lg:hidden"
              aria-expanded={open}
              aria-controls="drawer"
              aria-label={open ? t.nav.close : t.nav.menu}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: brown surface, large serif links set one after another */}
      <div
        id="drawer"
        ref={drawerRef}
        data-theme="dark"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto lg:hidden"
      >
        <nav aria-label="Navigation" className="wrap flex min-h-full flex-col overflow-x-hidden pb-8 pt-6">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href} className="drawer-item border-b border-line" style={{ animationDelay: `${60 + i * 45}ms` }}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex min-h-[60px] items-center justify-between gap-4 py-2 leading-tight no-underline aria-[current=page]:text-gold-soft ${locale === 'ar' ? 'text-[1.55rem]' : 'text-[1.9rem]'}`}
                  style={{ fontFamily: locale === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)', fontWeight: 600 }}
                >
                  {item.label}
                  <Icon name="arrow" className="h-5 w-5 opacity-60" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="drawer-item mt-auto flex w-full min-w-0 flex-col gap-3 pt-10" style={{ animationDelay: '380ms' }}>
            <a href={telHref} className="btn btn-call btn-lg w-full">
              <Icon name="phone" />
              {t.cta.call} · <span className="ltr">{site.phoneDisplay}</span>
            </a>
            <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg w-full">
              <Icon name="whatsapp" />
              {t.cta.whatsappLong}
            </a>
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-muted">
              <Star /> {t.home.hero.hoursNote}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

function LangSwitch({ locale, rest, label }: { locale: Locale; rest: string; label: string }) {
  // Visual order FR | AR in both directions (design system RTL rule)
  return (
    <div dir="ltr" role="group" aria-label={label} className="relative flex h-10 items-center rounded-pill border border-border-strong p-[3px]">
      <span
        aria-hidden="true"
        className="absolute bottom-[3px] top-[3px] w-[calc(50%-3px)] rounded-pill bg-brown transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: locale === 'ar' ? 'translateX(100%)' : 'none' }}
      />
      {(['fr', 'ar'] as const).map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === locale ? 'true' : undefined}
          className={`relative z-[1] inline-flex h-full min-w-[38px] items-center justify-center rounded-pill px-2 text-[0.8rem] font-semibold tracking-wide no-underline transition-colors duration-300 ${
            l === locale ? 'text-cream' : 'text-ink'
          }`}
          style={l === 'ar' ? { fontFamily: 'var(--font-arabic)', fontSize: '0.95rem' } : undefined}
        >
          {l === 'fr' ? 'FR' : 'ع'}
        </Link>
      ))}
    </div>
  );
}
