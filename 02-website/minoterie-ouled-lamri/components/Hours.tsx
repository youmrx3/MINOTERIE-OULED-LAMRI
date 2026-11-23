'use client';

import { useEffect, useState } from 'react';
import type { Dict } from '@/i18n/config';
import { site } from '@/content/site';

/** Algiers wall-clock time, so the status is right wherever the visitor is. */
function algiersNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd);
  const hh = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const mm = parts.find((p) => p.type === 'minute')?.value ?? '00';
  return { day, time: `${hh === '24' ? '00' : hh}:${mm}` };
}

/** Hours table, today's row highlighted, plus an open / closed status. */
export function Hours({ t }: { t: Dict }) {
  const c = t.contact;
  const [now, setNow] = useState<{ day: number; time: string } | null>(null);

  useEffect(() => {
    setNow(algiersNow());
    const id = window.setInterval(() => setNow(algiersNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const today = now ? site.hours[now.day] : null;
  const isOpen = !!(now && today && now.time >= today[0] && now.time < today[1]);

  return (
    <div>
      <p className="flex min-h-[28px] items-center gap-2 text-[0.95rem]" aria-live="polite">
        {now && (
          <>
            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-success' : 'bg-border-strong'}`} aria-hidden="true" />
            <span className="font-medium">{isOpen ? c.openNow : c.closedNow}</span>
            {isOpen && today && (
              <span className="text-muted">
                · {c.closesAt} <span className="ltr">{today[1]}</span>
              </span>
            )}
          </>
        )}
      </p>
      <table className="mt-3 w-full text-[0.98rem]">
        <caption className="sr-only">{c.hours}</caption>
        <tbody>
          {site.weekOrder.map((d) => {
            const h = site.hours[d];
            const isToday = now?.day === d;
            return (
              <tr key={d} className={`border-b border-line last:border-0 ${isToday ? 'bg-gold-tint' : ''}`} aria-current={isToday ? 'date' : undefined}>
                <th scope="row" className="py-2.5 ps-3 text-start font-normal">
                  {c.days[d]}
                  {isToday && <span className="ms-2 rounded-sm bg-brown px-1.5 py-0.5 text-xs font-medium text-cream">{c.today}</span>}
                </th>
                <td className="py-2.5 pe-3 text-end">{h ? <span className="ltr">{`${h[0]} – ${h[1]}`}</span> : <span className="text-muted">{c.closed}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
