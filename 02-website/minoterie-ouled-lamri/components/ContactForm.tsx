'use client';

import { useActionState, useEffect, useRef } from 'react';
import { submitContact, type ContactState, type Field } from '@/app/actions/contact';
import type { Dict } from '@/i18n/config';
import { Icon } from './Icon';

const initial: ContactState = { ok: null };

export function ContactForm({ t }: { t: Dict }) {
  const f = t.contact.form;
  const [state, action, pending] = useActionState(submitContact, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
    if (state.ok !== null) bannerRef.current?.focus();
  }, [state]);

  const err = (k: Field) => (state.errors?.[k] ? f.errors[state.errors[k]!] : undefined);
  const v = (k: Field) => state.values?.[k] ?? '';
  // Remount inputs after each response so defaultValue reflects returned values
  const key = JSON.stringify(state.values ?? {}) + String(state.ok);

  return (
    <form ref={formRef} action={action} noValidate className="grid gap-5" aria-describedby="form-status">
      <div id="form-status" ref={bannerRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.ok === true && (
          <div className="fade-in flex gap-3 rounded-md bg-success-bg p-4 text-success">
            <Icon name="check" className="mt-0.5 h-6 w-6 flex-none" />
            <div>
              <p className="font-semibold">{f.successTitle}</p>
              <p className="text-[0.95rem]">{f.success}</p>
            </div>
          </div>
        )}
        {state.ok === false && state.formError && (
          <div className="fade-in flex gap-3 rounded-md bg-error-bg p-4 text-error">
            <Icon name="alert" className="mt-0.5 h-6 w-6 flex-none" />
            <div>
              <p className="font-semibold">{f.errorTitle}</p>
              <p className="text-[0.95rem]">{f.errors[state.formError]}</p>
            </div>
          </div>
        )}
      </div>

      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div key={key + 'a'} className="grid gap-5 sm:grid-cols-2">
        <Input name="name" label={f.name} optional={f.optional} placeholder={f.namePh} autoComplete="name" defaultValue={v('name')} error={err('name')} />
        <Input
          name="phone"
          label={f.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          dir="ltr"
          placeholder="0661 37 00 11"
          help={f.phoneHelp}
          defaultValue={v('phone')}
          error={err('phone')}
        />
      </div>
      <div key={key + 'b'} className="grid gap-5 sm:grid-cols-2">
        <Input name="email" label={f.email} optional={f.optional} type="email" inputMode="email" autoComplete="email" dir="ltr" defaultValue={v('email')} error={err('email')} />
        <div>
          <label htmlFor="subject" className="field-label">
            {f.subject}
          </label>
          <select id="subject" name="subject" className="field" defaultValue={v('subject') || f.subjects[0]}>
            {f.subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div key={key + 'c'}>
        <label htmlFor="message" className="field-label">
          {f.message} <span aria-hidden="true" className="text-gold-deep">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="field"
          placeholder={f.messagePh}
          defaultValue={v('message')}
          aria-invalid={err('message') ? true : undefined}
          aria-describedby={err('message') ? 'message-err' : undefined}
        />
        {err('message') && <FieldError id="message-err" text={err('message')!} />}
      </div>

      <button type="submit" className="btn btn-call btn-lg w-full sm:w-auto sm:justify-self-start" disabled={pending} aria-busy={pending}>
        {pending ? f.sending : f.submit}
        {!pending && <Icon name="arrow" />}
      </button>
    </form>
  );
}

function FieldError({ id, text }: { id: string; text: string }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-[0.92rem] text-error">
      <Icon name="alert" className="h-4 w-4 flex-none" />
      {text}
    </p>
  );
}

function Input({
  name,
  label,
  optional,
  help,
  error,
  required,
  ...rest
}: {
  name: Field;
  label: string;
  optional?: string;
  help?: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [error ? `${name}-err` : '', help ? `${name}-help` : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}{' '}
        {required ? (
          <span aria-hidden="true" className="text-gold-deep">*</span>
        ) : (
          optional && <span className="font-normal text-muted">({optional})</span>
        )}
      </label>
      <input id={name} name={name} required={required} className="field" aria-invalid={error ? true : undefined} aria-describedby={describedBy} {...rest} />
      {error ? (
        <FieldError id={`${name}-err`} text={error} />
      ) : (
        help && (
          <p id={`${name}-help`} className="mt-2 text-[0.9rem] text-muted">
            {help}
          </p>
        )
      )}
    </div>
  );
}
