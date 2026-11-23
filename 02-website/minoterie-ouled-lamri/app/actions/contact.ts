'use server';

import { headers } from 'next/headers';

export type ErrorKey = 'required' | 'phone' | 'email' | 'short' | 'rate' | 'delivery' | 'form';
export type Field = 'name' | 'phone' | 'email' | 'subject' | 'message';
export type ContactState = {
  ok: boolean | null;
  errors?: Partial<Record<Field, ErrorKey>>;
  formError?: ErrorKey;
  values?: Partial<Record<Field, string>>;
};

// Basic in-memory rate limit: 5 messages per 10 minutes per IP (per server instance).
const WINDOW = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

const PHONE = /^(?:\+213|00213|0)(?:[5-7]\d{8}|[2-4]\d{7})$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? '').trim().slice(0, 4000);
  const values = {
    name: get('name').slice(0, 120),
    phone: get('phone').slice(0, 40),
    email: get('email').slice(0, 160),
    subject: get('subject').slice(0, 80),
    message: get('message'),
  };

  // Honeypot: bots fill every field. Pretend success, send nothing.
  if (get('website')) return { ok: true };

  const errors: ContactState['errors'] = {};
  const phone = values.phone.replace(/[\s.\-()]/g, '');
  if (!phone) errors.phone = 'required';
  else if (!PHONE.test(phone)) errors.phone = 'phone';
  if (values.email && !EMAIL.test(values.email)) errors.email = 'email';
  if (!values.message) errors.message = 'required';
  else if (values.message.length < 10) errors.message = 'short';
  if (Object.keys(errors).length) return { ok: false, errors, formError: 'form', values };

  const h = await headers();
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || 'local').split(',')[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX) return { ok: false, formError: 'rate', values };
  hits.set(ip, [...recent, now]);

  const text = [
    `Nom : ${values.name || '—'}`,
    `Téléphone : ${phone}`,
    `E-mail : ${values.email || '—'}`,
    `Sujet : ${values.subject || '—'}`,
    '',
    values.message,
  ].join('\n');

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact] RESEND_API_KEY missing — message logged only:\n' + text);
      return { ok: true };
    }
    console.error('[contact] RESEND_API_KEY missing in production');
    return { ok: false, formError: 'delivery', values };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `La Colombe — site <${process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: [process.env.CONTACT_TO_EMAIL || 'contact.minoterie@ouled-lamri.com'],
        reply_to: values.email || undefined,
        subject: `Site web · ${values.subject || 'Message'} · ${values.name || phone}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { ok: true };
  } catch (e) {
    console.error('[contact] delivery failed', e);
    return { ok: false, formError: 'delivery', values };
  }
}
