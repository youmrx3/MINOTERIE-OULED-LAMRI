import Image from 'next/image';
import Link from 'next/link';

/**
 * Horizontal lockup from the brand guidelines: official symbol (unchanged)
 * + "LA COLOMBE" in spaced Cormorant capitals + company name as an echo.
 * The logotype stays Latin on Arabic pages, as in the charter.
 */
export function Logo({
  href,
  label,
  tone = 'brown',
  size = 'md',
}: {
  href: string;
  label: string;
  tone?: 'brown' | 'cream';
  size?: 'md' | 'lg';
}) {
  const symbol = size === 'lg' ? 56 : 44;
  return (
    <Link href={href} aria-label={label} className="group inline-flex min-h-tap items-center gap-2 no-underline sm:gap-3" dir="ltr">
      <Image
        src={tone === 'cream' ? '/images/logo-cream.svg' : '/images/logo-brown.svg'}
        alt=""
        width={symbol}
        height={Math.round(symbol * 0.977)}
        priority
        className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
      />
      <span className={`wordmark flex flex-col whitespace-nowrap leading-none ${size === "md" ? "max-[359px]:hidden" : ""}`}>
        <span className={`${size === 'lg' ? 'text-[1.45rem] tracking-[0.2em]' : 'text-[0.95rem] tracking-[0.12em] sm:text-[1.18rem] sm:tracking-[0.2em]'} font-bold`}>LA COLOMBE</span>
        <span className={`mt-1.5 ${size === 'lg' ? 'text-[0.7rem] tracking-[0.26em]' : 'text-[0.5rem] tracking-[0.12em] sm:text-[0.6rem] sm:tracking-[0.26em]'} font-semibold opacity-75`}>
          MINOTERIE OULED LAMRI
        </span>
      </span>
    </Link>
  );
}
