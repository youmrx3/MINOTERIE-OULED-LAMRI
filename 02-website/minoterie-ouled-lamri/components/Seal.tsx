/**
 * The signature seal from the brand guidelines (anatomy page 04):
 * double gold outer rule, 180-pearl crown, name and company in Cormorant
 * along the ring, inner double rule, the official symbol unchanged.
 *
 * `animate` draws it once on load: rules trace themselves, pearls appear,
 * letters set one by one along the ring, then the dove settles. The seal is
 * never rotated, recolored or distorted (charter page 08).
 */
const NAME = 'LA COLOMBE';
const COMPANY = 'MINOTERIE OULED LAMRI';

export function Seal({
  id,
  tone = 'light',
  animate = false,
  className,
  title,
}: {
  id: string;
  tone?: 'light' | 'dark';
  animate?: boolean;
  className?: string;
  title?: string;
}) {
  const ink = tone === 'dark' ? '#F4ECDD' : '#3A2516';
  const accent = '#B5893E';
  const logo = tone === 'dark' ? '/images/logo-cream.svg' : '/images/logo-brown.svg';
  const draw = (d: number) => (animate ? { className: 'seal-draw', style: { ['--d' as string]: `${d}ms` } } : {});
  const pop = (d: number) => (animate ? { className: 'seal-pop', style: { ['--d' as string]: `${d}ms` } } : {});
  const letter = (i: number, base: number, step: number) =>
    animate ? { className: 'fade-in', style: { ['--d' as string]: `${base + i * step}ms` } } : {};

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <path id={`${id}-top`} d="M 70.5 300 A 229.5 229.5 0 0 1 529.5 300" />
        <path id={`${id}-bot`} d="M 44.7 300 A 255.3 255.3 0 0 0 555.3 300" />
      </defs>

      <g transform="rotate(-90 300 300)" fill="none" stroke={accent}>
        <circle cx="300" cy="300" r="296" strokeWidth="3" pathLength={1} {...draw(100)} />
        <circle cx="300" cy="300" r="287" strokeWidth="1" pathLength={1} {...draw(250)} />
        <circle cx="300" cy="300" r="214" strokeWidth="1.5" pathLength={1} {...draw(400)} />
        <circle cx="300" cy="300" r="206" strokeWidth="0.75" pathLength={1} {...draw(520)} />
      </g>
      <g {...pop(700)}>
        <circle cx="300" cy="300" r="279" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="0 9.73" />
      </g>

      <text fill={ink} style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 54, letterSpacing: 16 }}>
        <textPath href={`#${id}-top`} startOffset="51.11%" textAnchor="middle">
          {NAME.split('').map((c, i) => (
            <tspan key={i} {...letter(i, 800, 55)}>
              {c}
            </tspan>
          ))}
        </textPath>
      </text>
      <text fill={ink} style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 28, letterSpacing: 9 }}>
        <textPath href={`#${id}-bot`} startOffset="50.56%" textAnchor="middle">
          {COMPANY.split('').map((c, i) => (
            <tspan key={i} {...letter(i, 1150, 22)}>
              {c}
            </tspan>
          ))}
        </textPath>
      </text>

      <g fill={accent} {...pop(1300)}>
        <polygon points="52,287 55.5,296.5 65,300 55.5,303.5 52,313 48.5,303.5 39,300 48.5,296.5" />
        <polygon points="548,287 551.5,296.5 561,300 551.5,303.5 548,313 544.5,303.5 535,300 544.5,296.5" />
      </g>

      <g {...pop(450)}>
        <image href={logo} x="182" y="185" width="236" height="230" />
      </g>
    </svg>
  );
}
