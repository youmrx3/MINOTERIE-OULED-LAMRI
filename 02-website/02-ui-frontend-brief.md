# UI and front-end brief — LA COLOMBE

Design direction, tokens, components and page layouts. Provisional until the logo and charter are validated.

---

## 1. Direction

Sober and reassuring. Warm grain and earth tones on an off-white base. Real photos of the mill and products first (logo placeholders until they arrive), simple line icons for the strengths. Generous white space, large type, big tap targets. Designed for a phone in one hand.

## 2. Design tokens

```ts
// tailwind.config.ts
colors: {
  primary:   '#C08A2E', // wheat gold  – replace with official color
  secondary: '#4A3B2A', // earth brown – replace with official color
  accent:    '#F5EFE6', // cream       – confirm with charter
}
```

Suggested extensions (derive from the three above once final):

| Token | Use |
|---|---|
| `ink` `#2B2218` | Body text |
| `muted` `#7A6A55` | Secondary text |
| `line` `#DCCFBA` | Borders, dividers |
| `paper` `#FBF8F2` | Page background |

Contrast: gold on cream fails for body text. Gold is for large type, icons and buttons with brown text. Check every pair against WCAG AA.

## 3. Typography

| | Latin | Arabic |
|---|---|---|
| Headings | Serif with character (e.g. Fraunces, Playfair) | Cairo or Noto Kufi Arabic, bold |
| Body | Humanist sans (e.g. Inter, Source Sans) | Cairo or Tajawal |

Load through `next/font`, subset per locale, `display: swap`. Arabic body needs roughly +1 px size and +0.1 line-height versus Latin.

## 4. Layout system

- Mobile first. Breakpoints: 640 / 768 / 1024 / 1280.
- Container max 1200, side padding 20 on mobile, 32 above.
- 4 / 8 spacing scale, vertical section rhythm 64 (mobile) / 96 (desktop).
- Cards: 12 px radius, 1 px `line` border, no heavy shadow.

## 5. RTL rules

- Use logical utilities only: `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `start-*`, `end-*`. No `ml-*`, `left-*`.
- Floating WhatsApp button sits at `end-4 bottom-4`, so it flips with the language.
- Mirror directional icons (arrows, chevrons). Do not mirror logos, phone numbers or the map.
- Phone numbers and email stay LTR inside Arabic text (`dir="ltr"` on those spans).
- Test every page in AR before it counts as done.

## 6. Components

| Component | Notes |
|---|---|
| Header | Logo, nav (6 links, testimonials only if content exists), language switcher, call button. Collapses to a drawer below 768 |
| Footer | Logo, quick links, address, hours, phone, email, social links |
| WhatsAppButton | Fixed, 56 px circle, visible on every page, opens `wa.me` link |
| Hero | Logo/slogan, one-line hook, two buttons: Call, WhatsApp |
| StrengthsRow | 3–4 icon + short text items |
| ProductsGrid | Card per range: image, name, short description |
| ImagePlaceholder | Static logo watermark on a cream surface, used by every image slot until real photos exist (see section 9) |
| Gallery | Responsive grid, lightbox on tap |
| Testimonials | Cards, rendered only when the content array is not empty |
| FAQAccordion | Accessible disclosure pattern |
| ContactForm | Five fields, inline localized errors, success and error states |
| MapLocation | Static map from coordinates, plus address and "open in maps" link |
| SocialLinks | Facebook, Instagram icons |

## 7. Page wireframes

**Home**
```
[Header: logo · nav · FR|AR · Call]
[Hero: hook + Call + WhatsApp + photo]
[Strengths: 3–4 icons]
[Products preview: 3 cards → /produits]
[Gallery preview: 4–6 photos → /galerie]
[Testimonials band]  (hidden while empty)
[Quick contact: phone · WhatsApp · hours]
[Footer]
```

**Products**
```
[Page title + intro]
[Range 1: image | name | description]
[Range 2 ...]
[CTA: ask for a quote → contact]
```

**Contact**
```
[Title]
[Left: form]   [Right: address · hours · phone · WhatsApp · map · social]
```

On mobile, the contact details come first (phone preferred), the form second.

## 8. Interaction and motion

- Fade-up on section enter, 200–300 ms, once. Respect `prefers-reduced-motion`.
- Buttons: clear focus ring, pressed state.
- No carousels that autoplay. No parallax.

## 9. Content placeholders

The site is built complete, with no empty or broken area, even though most real content is not available yet.

### Image placeholder rule

Every image slot (hero, product cards, gallery, about) renders an `ImagePlaceholder` while no photo is set.

| Property | Value |
|---|---|
| Surface | `accent` cream, same radius as the real image |
| Content | The logo centered, 35–45 % of the slot width, opacity about 0.15–0.25 |
| Implementation | CSS background on the slot: `background: var(--accent) url('/images/logo.png') center / 40% no-repeat` (or an inline `<Image>` inside the container) |
| Motion | None. No shimmer, no pulse, no skeleton, no fade, no transition. Fully still |
| Aspect ratios | Product 4:3 · Hero 16:9 desktop, 4:5 mobile · Gallery 1:1 and 4:3 · About 3:2 |
| Accessibility | `role="img"` with an `aria-label` such as "Image coming soon" (FR / AR) |

Swap mechanism: the `image` field in `content/*.ts` is optional.

```ts
// content/products.ts
{ id: 'farine-t55', name: {...}, description: {...} }                  // placeholder shown
{ id: 'farine-t55', name: {...}, description: {...},
  image: '/images/products/farine-t55.jpg' }                           // real photo shown
```

Component logic: `image` present → `next/image` with the same container and ratio. `image` missing → `ImagePlaceholder`. Nothing else changes when the photos arrive: drop the files in `public/images/`, add the path.

Gallery: render 6 placeholder tiles until `public/images/gallery/` has files.

### Other placeholders

| Missing | Temporary |
|---|---|
| Logo | Use the supplied logo from day one (`logo.png`, `logo-white.png`) |
| Product photos | `ImagePlaceholder` |
| Products | 3 sample ranges with draft text, flagged in `products.ts` with a `// SAMPLE` comment |
| About text | Short draft in both languages |
| Testimonials | Nothing rendered (hidden) |
| Map | Static block with the address until coordinates arrive |

Each placeholder sits in the exact file listed in `03-content-tracker.md`, so replacing it never touches the structure.

## 10. Definition of done (front-end)

- [ ] All 7 routes render in FR and AR
- [ ] No horizontal scroll from 320 px up
- [ ] RTL checked on every page
- [ ] Tap targets ≥ 44 px
- [ ] Lighthouse mobile: performance ≥ 90, accessibility ≥ 95
- [ ] Contact form wired to the back-end contract (see spec section 7)
- [ ] Testimonials hidden cleanly when empty
- [ ] Every image slot shows the static logo placeholder, with no animation and no layout shift when a real image is added
