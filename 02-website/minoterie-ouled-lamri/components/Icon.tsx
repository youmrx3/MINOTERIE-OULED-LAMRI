// La Colombe icon set (design system): 24px grid, 1.5px line, round caps, currentColor.
import type { SVGProps } from 'react';

const paths = {
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6L6 18" />,
  facebook: <path d="M14 21v-8h2.6l.5-3H14V8.3c0-.9.4-1.8 1.8-1.8H17V3.8A18 18 0 0 0 14.8 3.7C12.4 3.7 11 5.1 11 7.6V10H8.5v3H11v8z" />,
  factory: (
    <>
      <path d="M3 20V11l6 3.5V11l6 3.5V4h4v16z" />
      <path d="M7 17h2M12 17h2" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.2h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  phone: <path d="M6.5 4h3l1.5 4.2-2.2 1.4a11 11 0 0 0 5.1 5.1l1.4-2.2 4.2 1.5v3A1.8 1.8 0 0 1 17.7 19C10.7 19 5 13.3 5 6.3A1.8 1.8 0 0 1 6.5 4z" />,
  quality: (
    <>
      <path d="M12 3l7 3v5.2c0 4.4-3 7.8-7 9.8-4-2-7-5.4-7-9.8V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3.5v2.5h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.2-3.8A8 8 0 1 1 8 18.8z" />
      <path d="M9.4 8.8c-.2 1.9 1.8 4.4 4.4 5.1l1.2-1.2-1.7-1-.8.7c-.8-.3-1.6-1.1-2-1.9l.7-.8-1-1.7z" />
    </>
  ),
  wheat: (
    <>
      <path d="M12 21V8" />
      <path d="M12 8c-2 0-3-1.6-3-3.5 2 0 3 1.5 3 3.5zM12 8c2 0 3-1.6 3-3.5-2 0-3 1.5-3 3.5z" />
      <path d="M12 13c-2.6 0-4-1.8-4-4 2.6 0 4 1.8 4 4zM12 13c2.6 0 4-1.8 4-4-2.6 0-4 1.8-4 4z" />
      <path d="M12 18c-2.6 0-4-1.8-4-4 2.6 0 4 1.8 4 4zM12 18c2.6 0 4-1.8 4-4-2.6 0-4 1.8-4 4z" />
      <path d="M12 8V3" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2h.01" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

export type IconName = keyof typeof paths;
const directional: IconName[] = ['arrow', 'chevron'];

export function Icon({ name, className, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={[directional.includes(name) ? 'i-dir' : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

/** The four-point star from the logo: the site's only ornament. */
export function Star({ className = 'star' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <path d="M10 0l2.3 7.7L20 10l-7.7 2.3L10 20l-2.3-7.7L0 10l7.7-2.3z" fill="currentColor" />
    </svg>
  );
}
