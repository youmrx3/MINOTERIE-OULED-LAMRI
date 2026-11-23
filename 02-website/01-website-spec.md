# Website specification — LA COLOMBE

Showcase website (no e-commerce) for SARL Minoterie Ouled Lamri, flour mill in Bordj Bou Arréridj.
Source: client questionnaire of 19/08/2026 and `cahier-des-charges-minoterie-ouled-lamri.md` (kept at the root of the folder).

---

## 1. Goal

Present the company and its flour ranges, reassure on quality, and push visitors to **call or write directly**. Preferred client contact channel: **phone**.

## 2. Company data (configuration values)

| Field | Value |
|---|---|
| Company | SARL MINOTERIE OULED LAMRI |
| Brand | LA COLOMBE |
| Sector | Flour milling |
| Phone / WhatsApp | 0661370011 → `tel:+213661370011`, `https://wa.me/213661370011` |
| Email | contact.minoterie@ouled-lamri.com |
| Address | Bir Aissa, Commune Ain Tasserra, Wilaya de Bordj Bou Arréridj |
| Opening hours | Sat–Wed 8:00–16:00, Thu 8:00–12:00, Fri closed |
| Site languages | French, Arabic (RTL) |
| Social | Facebook, Instagram (URLs to collect) |

Keep these in a single config file (`content/site.ts`) so header, footer, contact page and structured data read the same source.

## 3. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router), TypeScript |
| Styling | Tailwind CSS |
| i18n | next-intl, FR + AR, automatic RTL |
| Images | next/image |
| Contact form | Server Action or API route + email (Resend or Nodemailer) |
| Hosting | Vercel (suggested) |

## 4. Pages

| Route | Content |
|---|---|
| `/` | Hero (logo, slogan, hook), company strengths, products preview, gallery preview, testimonials band (hidden while empty), quick contact (phone + WhatsApp) |
| `/a-propos` | Company story, milling know-how, values, location |
| `/produits` | One page, one card section per flour range. Range list pending from the client. Images optional: the logo is shown as a static placeholder until a photo path is set |
| `/galerie` | Photos of the mill, production and products |
| `/temoignages` | Client reviews. Page exists but is hidden from menu and routing output while no review exists |
| `/faq` | Generic questions (delivery, quantities, served areas), to validate with the client |
| `/contact` | Form (name, phone, email, subject, message), address, hours, WhatsApp button, location, social links |

All routes are prefixed by the locale: `/fr/...` and `/ar/...`.

## 5. Features

- [x] Contact form (name, phone, email, subject, message)
- [x] Floating WhatsApp button on every page
- [x] Photo gallery
- [x] Location: address plus static map from coordinates (no Google Business listing exists)
- [x] Social links: Facebook, Instagram
- [x] Bilingual FR / AR with language switcher and `dir="rtl"` on Arabic pages

## 6. Internationalisation

```
messages/
├─ fr.json
└─ ar.json
```

- Language switcher in the header, same page preserved on switch.
- `lang` and `dir` set on `<html>` from the locale.
- Every string, including form labels and validation errors, exists in both files.
- Content files carry localized fields (`{ fr, ar }`).

## 7. Back-end scope

The site has one dynamic feature: the contact form.

| Item | Detail |
|---|---|
| Entry point | Server Action `submitContact(formData)` (or `POST /api/contact`) |
| Validation | Server side, same rules as client side. Phone and message required (proposed) |
| Anti-spam | Honeypot field plus basic rate limit per IP (proposed) |
| Delivery | Email to the company inbox via Resend or Nodemailer |
| Response | `{ ok: true }` or `{ ok: false, errors: { field: messageKey } }` so the UI can show localized errors |
| Config | Environment variables, no secret in the repository |
| SEO routes | `sitemap.xml`, `robots.txt`, localized metadata |

Proposed environment variables:

```
RESEND_API_KEY=            # or SMTP_* when using Nodemailer
CONTACT_TO_EMAIL=contact.minoterie@ouled-lamri.com
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

## 8. Folder structure

```
minoterie-ouled-lamri/
├─ app/
│  └─ [locale]/
│     ├─ layout.tsx
│     ├─ page.tsx
│     ├─ a-propos/page.tsx
│     ├─ produits/page.tsx
│     ├─ galerie/page.tsx
│     ├─ temoignages/page.tsx
│     ├─ faq/page.tsx
│     └─ contact/page.tsx
├─ components/
│  ├─ layout/    (Header, Footer, WhatsAppButton)
│  └─ sections/  (Hero, About, ProductsGrid, Gallery, Testimonials,
│                 FAQAccordion, ContactForm, MapLocation, SocialLinks)
├─ content/
│  ├─ site.ts          # company data, links, hours
│  ├─ about.ts
│  ├─ products.ts
│  ├─ testimonials.ts  # empty array hides section + page
│  └─ faq.ts
├─ public/images/
│  ├─ logo.png, logo-white.png   # also the image placeholder
│  ├─ products/
│  ├─ hero/
│  └─ gallery/
├─ messages/ (fr.json, ar.json)
├─ tailwind.config.ts
└─ next.config.js
```

## 9. SEO and performance

- Title and description in FR and AR, targeting "minoterie Bordj Bou Arréridj".
- `sitemap.xml`, `robots.txt`, alternate language links.
- Images compressed and served through `next/image`.
- Mobile-first: most visitors in Algeria are on phones.
- Targets: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms on a mid-range phone.

## 10. Open points

1. Existing logo and charter: kept, refined or replaced (see `01-brand`).
2. Product list not provided.
3. Map coordinates not provided.
4. Default locale when no preference is detected (proposed: French).
5. Sender domain for outgoing email.
6. Facebook and Instagram URLs.
