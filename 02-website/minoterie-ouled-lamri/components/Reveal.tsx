'use client';

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';

/** Fade-up once when the element enters the viewport. Respects reduced motion (CSS). */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}
