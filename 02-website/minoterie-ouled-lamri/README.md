# La Colombe: website

Showcase site for SARL Minoterie Ouled Lamri. Next.js 15 (App Router) + TypeScript + Tailwind CSS 3. It is in French and Arabic (RTL), and it is built mobile-first.

## Run

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /fr (or /ar if the browser prefers Arabic)
npm run build && npm start
```

Copy `.env.example` to `.env.local`. Without `RESEND_API_KEY` the contact form only logs messages in development. In production it shows "delivery failed, please call us" and does not pretend the message was sent.

## Where things live

| What | File |
|---|---|
| Phone, e-mail, address, hours, social links, GPS | `content/site.ts` |
| Flour ranges (SAMPLE until the client sends the list) | `content/products.ts`. Add `image: '/images/products/x.jpg'` to replace a placeholder |
| Gallery | `content/gallery.ts` + `public/images/gallery/` |
| Testimonials | `content/testimonials.ts`. While it is empty, the home band, the menu link and `/temoignages` stay hidden |
| FAQ (draft, to validate) | `content/faq.ts` |
| All interface text | `messages/fr.json`, `messages/ar.json` (same keys) |
| Colors, type, motion | `app/globals.css` (tokens at the top) + `tailwind.config.ts` |

## Design decisions

- **The brand guidelines win over the design system's provisional values.** The design system was built before the logo existed and used placeholder values (#C08A2E / #4A3B2A, Fraunces / Source Sans / Cairo). The site uses the official charter instead: Crème `#F4ECDD`, Brun meunier `#3A2516`, Or blé `#B5893E`, Or profond `#8A6524`, with Cormorant Garamond and Jost, in 60/30/10 proportions. For Arabic, the site uses IBM Plex Sans Arabic instead of the charter's Amiri. The team asked for a more modern, simpler Arabic face after review. It keeps the design system's structure: token roles, spacing, radius, 48px controls, logical RTL properties, and the static logo placeholder.
- **Signature element:** the brand seal from charter page 04. It draws itself once on load: the rings trace, the pearls and letters appear, then the dove settles. The logo itself is never rotated, recolored or distorted.
- **Motion:** words rise in the hero, sections fade up once on scroll, cards lift on hover, the FAQ panels animate their height, and the drawer links come in one after another. Nothing loops, and everything turns off under `prefers-reduced-motion`.
- **i18n:** this project uses a small built-in dictionary (`i18n/`) instead of next-intl. It has the same `messages/*.json` layout and `/fr` and `/ar` routes, with one less dependency.

## Still waiting on the client

Real product list, photos, GPS coordinates, Facebook and Instagram URLs, testimonials, validated FAQ answers, and the Resend sender domain.
