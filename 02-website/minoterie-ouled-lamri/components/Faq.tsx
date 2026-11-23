'use client';

import { useId, useState } from 'react';
import { Icon } from './Icon';

/** Accessible disclosure list: one button per question, panel height animates. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const bid = `${base}-b${i}`;
        const pid = `${base}-p${i}`;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                id={bid}
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-start"
              >
                <span className="t-h4 transition-colors group-hover:text-gold-deep">{it.q}</span>
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-pill border-[1.5px] border-border-strong transition-colors group-hover:border-brown">
                  <Icon name="plus" className="acc-icon h-5 w-5" />
                </span>
              </button>
            </h3>
            <div id={pid} role="region" aria-labelledby={bid} className="acc-panel" data-open={isOpen}>
              <div>
                <p className="max-w-3xl pb-7 pe-14 text-muted" aria-hidden={!isOpen}>
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
