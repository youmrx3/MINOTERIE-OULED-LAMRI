'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDict, isLocale } from '@/i18n/config';
import { Seal } from '@/components/Seal';

export default function NotFound() {
  const seg = (usePathname() || '/fr').split('/')[1] || 'fr';
  const locale = isLocale(seg) ? seg : 'fr';
  const t = getDict(locale);
  return (
    <section className="section">
      <div className="wrap flex flex-col items-center text-center">
        <div className="w-40 opacity-80">
          <Seal id="nf-seal" />
        </div>
        <h1 className="t-h1 mt-10">{t.notFound.title}</h1>
        <p className="t-lead mt-4 max-w-md">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="btn btn-call mt-8">
          {t.notFound.back}
        </Link>
      </div>
    </section>
  );
}
