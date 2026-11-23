import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  // Arabic first only when the browser prefers it over French
  const accept = (req.headers.get('accept-language') || '').toLowerCase();
  const arIdx = accept.search(/(^|,)\s*ar/);
  const frIdx = accept.search(/(^|,)\s*fr/);
  const locale = arIdx !== -1 && (frIdx === -1 || arIdx < frIdx) ? 'ar' : defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)'],
};
