# Developer hand-off

Everything a developer needs to build the site in Next.js and Tailwind CSS. Tokens map to CSS variables, then to the Tailwind config.

## Breakpoints, columns, container

| Breakpoint | Min width | Columns | Notes |
|---|---|---|---|
| base | 0 | 4 | side padding 20px, 320px minimum |
| sm | 640px | 4 | large phones |
| md | 768px | 8 | side padding 32px, tablet |
| lg | 1024px | 12 | desktop header, navigation visible |
| xl | 1280px | 12 | container max 1200px |

## Component list and variants

| Component | Variants and states |
|---|---|
| Button | primary, secondary, ghost, call, whatsapp; sizes M (48px) and L (56px); default, hover, focus, pressed, disabled, loading |
| Link | text, inline, arrow, phone, e-mail |
| Header | desktop (from 1024px), mobile with drawer; language switcher FR / AR |
| Footer | brown surface; logo, links, address, hours, phone, e-mail, social |
| Section header | overline, title, intro; left or centered |
| Hero | two CTAs; image slot 16:9 desktop, 4:5 mobile |
| Strength item | icon, title, one line |
| Product card, product block | image 4:3, name, range, description, sizes |
| Image placeholder | product 4:3, hero 16:9 and 4:5, gallery 1:1 and 4:3, about 3:2 |
| Gallery tile, lightbox | 1:1, 4:3, wide; hover, focus |
| Testimonial card | quote, name, role |
| FAQ accordion | open, closed |
| Form | text, phone, select, textarea, helper, error, success banner, submit with loading |
| Contact info card, hours table, static map | today row highlighted |
| Social links | Facebook, Instagram |
| Floating WhatsApp | label and icon-only; end corner |
| Badge, chip, alert, toast | neutral, gold, success, warning, error, info |

## Image placeholder specification

Slot ratios: product 4:3, hero 16:9 desktop and 4:5 mobile, gallery 1:1 and 4:3, about 3:2. Surface `surface-alt` (cream), radius `radius-lg`, logo centered at 40% of the slot width, 18% opacity, no animation.

## Tailwind config

```js
// tailwind.config.js (Tailwind v3). Colors read the CSS variables, so the dark theme works with data-theme="dark".
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    container: { center: true, padding: { DEFAULT: '20px', md: '32px' }, screens: { DEFAULT: '1200px' } },
    extend: {
      colors: {
        primary: {
        50: 'var(--primary-50)',
        100: 'var(--primary-100)',
        200: 'var(--primary-200)',
        300: 'var(--primary-300)',
        400: 'var(--primary-400)',
        500: 'var(--primary-500)',
        600: 'var(--primary-600)',
        700: 'var(--primary-700)',
        800: 'var(--primary-800)',
        900: 'var(--primary-900)',
        },
        secondary: {
        50: 'var(--secondary-50)',
        100: 'var(--secondary-100)',
        200: 'var(--secondary-200)',
        300: 'var(--secondary-300)',
        400: 'var(--secondary-400)',
        500: 'var(--secondary-500)',
        600: 'var(--secondary-600)',
        700: 'var(--secondary-700)',
        800: 'var(--secondary-800)',
        900: 'var(--secondary-900)',
        },
        cream: 'var(--cream)', paper: 'var(--paper)', surface: 'var(--surface)', 'surface-alt': 'var(--surface-alt)',
        ink: 'var(--ink)', muted: 'var(--muted)', line: 'var(--line)', 'border-strong': 'var(--border-strong)',
        link: 'var(--link)', 'accent-text': 'var(--accent-text)', 'on-primary': 'var(--on-primary)',
        'call-bg': 'var(--call-bg)', 'on-call': 'var(--on-call)', focus: 'var(--focus)',
        whatsapp: { DEFAULT: 'var(--whatsapp)', hover: 'var(--whatsapp-hover)', pressed: 'var(--whatsapp-pressed)', on: 'var(--on-whatsapp)' },
        success: { DEFAULT: 'var(--success)', bg: 'var(--success-bg)' }, warning: { DEFAULT: 'var(--warning)', bg: 'var(--warning-bg)' },
        error: { DEFAULT: 'var(--error)', bg: 'var(--error-bg)' }, info: { DEFAULT: 'var(--info)', bg: 'var(--info-bg)' },
      },
      fontFamily: { serif: ['var(--font-serif)'], sans: ['var(--font-sans)'], arabic: ['var(--font-arabic)'] },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
        11: 'var(--space-11)',
        12: 'var(--space-12)',
        13: 'var(--space-13)',
        14: 'var(--space-14)',
        15: 'var(--space-15)',
        16: 'var(--space-16)'
      },
      borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', pill: 'var(--radius-pill)' },
      boxShadow: { flat: 'var(--shadow-flat)', raised: 'var(--shadow-raised)' },
      minHeight: { control: '48px', tap: '44px' },
      maxWidth: { container: '1200px' },
    },
  },
  plugins: [],
};
```

## Font loading (Next.js)

```tsx
// app/layout.tsx: load the three families with next/font and expose them as the variables the tokens read.
import { Fraunces, Source_Sans_3, Cairo } from 'next/font/google';
const serif = Fraunces({ subsets: ['latin'], variable: '--font-serif-face', display: 'swap' });
const sans = Source_Sans_3({ subsets: ['latin'], variable: '--font-sans-face', display: 'swap' });
const arabic = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-arabic-face', display: 'swap' });
// then in globals.css: --font-serif: var(--font-serif-face), Georgia, serif; (same for sans and arabic)
// <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
```

## CSS variables

```css
:root, [data-theme="light"] {
  --primary-50: #faf6ee;
  --primary-100: #f4ebdb;
  --primary-200: #ebdabc;
  --primary-300: #dec292;
  --primary-400: #cfa660;
  --primary-500: #c08a2e;
  --primary-600: #a67729;
  --primary-700: #886222;
  --primary-800: #6b4d1c;
  --primary-900: #4d3716;
  --secondary-50: #f4f3f2;
  --secondary-100: #e6e4e1;
  --secondary-200: #ccc8c3;
  --secondary-300: #afa9a1;
  --secondary-400: #92897f;
  --secondary-500: #756a5d;
  --secondary-600: #5c4f3f;
  --secondary-700: #4a3b2a;
  --secondary-800: #3a2d20;
  --secondary-900: #2d2317;
  --cream: #f5efe6;
  --paper: #fbf8f3;
  --surface: #ffffff;
  --surface-alt: var(--cream);
  --ink: var(--secondary-900);
  --muted: #6b5a45;
  --line: #e2d8c6;
  --border-strong: #8a7860;
  --link: var(--secondary-700);
  --link-hover: var(--secondary-900);
  --accent-text: var(--primary-700);
  --on-primary: #2d2317;
  --call-bg: var(--secondary-700);
  --on-call: var(--cream);
  --focus: var(--secondary-700);
  --scrim: rgba(45,35,23,0.78);
  --whatsapp: #25d366;
  --whatsapp-hover: #3fdc7c;
  --whatsapp-pressed: #6ee79a;
  --on-whatsapp: #0e2e1a;
  --success: #25643a;
  --success-bg: #e6f2e9;
  --warning: #7a4f00;
  --warning-bg: #fbefd4;
  --error: #a32a1c;
  --error-bg: #fbe7e3;
  --info: #1f5578;
  --info-bg: #e3eef6;
  --shadow-flat: none;
  --shadow-raised: 0 4px 16px rgba(45,35,23,0.12);
}

[data-theme="dark"] {
  --paper: var(--secondary-900);
  --surface: var(--secondary-800);
  --surface-alt: var(--secondary-700);
  --ink: var(--cream);
  --muted: #cdbfa8;
  --line: var(--secondary-600);
  --border-strong: #a8967c;
  --link: var(--primary-300);
  --link-hover: var(--primary-200);
  --accent-text: var(--primary-300);
  --call-bg: var(--cream);
  --on-call: var(--secondary-900);
  --focus: var(--primary-300);
  --success: #9ad7ab;
  --success-bg: #1f3d2a;
  --warning: #f0c46b;
  --warning-bg: #473312;
  --error: #f4a99d;
  --error-bg: #4a2420;
  --info: #9cc8e6;
  --info-bg: #1f3a4d;
  --shadow-raised: 0 4px 16px rgba(0,0,0,0.40);
}

:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-9: 36px;
  --space-10: 40px;
  --space-11: 44px;
  --space-12: 48px;
  --space-13: 52px;
  --space-14: 56px;
  --space-15: 60px;
  --space-16: 64px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-pill: 999px;
  --border-1: 1px;
  --border-2: 1.5px;
  --border-focus: 3px;
  --container-max: 1200px;
  --gutter-m: 20px;
  --gutter-d: 32px;
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --control-height: 48px;
  --tap-min: 44px;
  --font-serif: Fraunces, 'Source Serif 4', Georgia, serif;
  --font-sans: 'Source Sans 3', 'Segoe UI', system-ui, sans-serif;
  --font-arabic: Cairo, Tajawal, 'Noto Sans Arabic', system-ui, sans-serif;
}
```

## Token table

| Token | Value | Usage | CSS variable |
|---|---|---|---|
| `primary-50` | #faf6ee | Faintest wheat tint: selected rows, subtle highlights. | `--primary-50` |
| `primary-100` | #f4ebdb | Light wheat tint: chip and badge backgrounds. | `--primary-100` |
| `primary-200` | #ebdabc | Soft wheat tint: dividers on cream, decorative bands. | `--primary-200` |
| `primary-300` | #dec292 | Gold text and focus ring on dark (brown) surfaces; pressed fill of the primary button. | `--primary-300` |
| `primary-400` | #cfa660 | Hover fill of the primary button; gold text on dark surfaces. | `--primary-400` |
| `primary-500` | #c08a2e | Brand wheat gold #C08A2E. Primary button fill, accents, icons on brown. Never body text on light surfaces. | `--primary-500` |
| `primary-600` | #a67729 | Decorative strokes and large icons on light surfaces (3:1 on paper). | `--primary-600` |
| `primary-700` | #886222 | Gold text on paper, cream and surface (overline, small labels): 4.8:1 or better. Use through accent-text. | `--primary-700` |
| `primary-800` | #6b4d1c | Deep gold for large display accents on light surfaces. | `--primary-800` |
| `primary-900` | #4d3716 | Darkest gold: rare, borders on gold tints. | `--primary-900` |
| `secondary-50` | #f4f3f2 | Faintest earth tint. | `--secondary-50` |
| `secondary-100` | #e6e4e1 | Light earth tint: hover on ghost buttons. | `--secondary-100` |
| `secondary-200` | #ccc8c3 | Soft earth tint: disabled borders. | `--secondary-200` |
| `secondary-300` | #afa9a1 | Mid-light earth: decorative. | `--secondary-300` |
| `secondary-400` | #92897f | Mid earth: large decorative marks, 3:1 on paper. | `--secondary-400` |
| `secondary-500` | #756a5d | Muted earth: icons and secondary strokes, 5:1 on paper. | `--secondary-500` |
| `secondary-600` | #5c4f3f | Dark earth: dark-theme dividers, hover of the call button. | `--secondary-600` |
| `secondary-700` | #4a3b2a | Brand earth brown #4A3B2A. Call button fill, brown surfaces, footer, secondary text on cream. | `--secondary-700` |
| `secondary-800` | #3a2d20 | Raised surface on brown (cards in the dark theme). | `--secondary-800` |
| `secondary-900` | #2d2317 | Deepest brown: ink on light surfaces, page background of the dark theme. | `--secondary-900` |
| `cream` | #f5efe6 | Accent cream #F5EFE6. Alternate section bands, image placeholder surface, text on brown surfaces. | `--cream` |
| `paper` | #fbf8f3 · dark secondary-900 | Page background. Dark theme: the brown page background. | `--paper` |
| `surface` | #ffffff · dark secondary-800 | Cards, inputs, drawers sitting on paper. | `--surface` |
| `surface-alt` | cream · dark secondary-700 | Alternate bands, image placeholder surface, table stripes. | `--surface-alt` |
| `ink` | secondary-900 · dark cream | Body and heading text on paper, surface and surface-alt. | `--ink` |
| `muted` | #6b5a45 · dark #cdbfa8 | Secondary text, helper text, captions on paper, surface and surface-alt. | `--muted` |
| `line` | #e2d8c6 · dark secondary-600 | Decorative hairlines and card borders (not a control boundary). | `--line` |
| `border-strong` | #8a7860 · dark #a8967c | Control borders (inputs, secondary button, chips): 3:1 or better on paper, surface and cream. | `--border-strong` |
| `link` | secondary-700 · dark primary-300 | Link text on paper and surface, always underlined. Dark: gold on brown. | `--link` |
| `link-hover` | secondary-900 · dark primary-200 | Link hover; thicker underline as well. | `--link-hover` |
| `accent-text` | primary-700 · dark primary-300 | Gold-family text (overline, labels) on paper, surface, surface-alt. 4.8:1+ on light; 8:1+ on brown. | `--accent-text` |
| `on-primary` | #2d2317 | Text and icons on primary-500 / 400 / 300 fills. Same in both themes. | `--on-primary` |
| `call-bg` | secondary-700 · dark cream | Fill of the Call (phone) button. | `--call-bg` |
| `on-call` | cream · dark secondary-900 | Text and icon on the Call button. | `--on-call` |
| `focus` | secondary-700 · dark primary-300 | Focus ring, 3px solid with 2px offset. 3:1 or better on every surface it lands on. | `--focus` |
| `scrim` | rgba(45,35,23,0.78) | Lightbox overlay behind the photo. | `--scrim` |
| `whatsapp` | #25d366 | WhatsApp utility green: the WhatsApp button and floating button fill only. Nowhere else. | `--whatsapp` |
| `whatsapp-hover` | #3fdc7c | Hover fill of the WhatsApp button. | `--whatsapp-hover` |
| `whatsapp-pressed` | #6ee79a | Pressed fill of the WhatsApp button. | `--whatsapp-pressed` |
| `on-whatsapp` | #0e2e1a | Text and icon on WhatsApp green. White on this green fails AA, so use this dark green. | `--on-whatsapp` |
| `success` | #25643a · dark #9ad7ab | Success text and icon on success-bg. Always paired with an icon and a word. | `--success` |
| `success-bg` | #e6f2e9 · dark #1f3d2a | Background tint for success alerts and badges. | `--success-bg` |
| `warning` | #7a4f00 · dark #f0c46b | Warning text and icon on warning-bg. Always paired with an icon and a word. | `--warning` |
| `warning-bg` | #fbefd4 · dark #473312 | Background tint for warning alerts and badges. | `--warning-bg` |
| `error` | #a32a1c · dark #f4a99d | Error text and icon on error-bg. Always paired with an icon and a word. | `--error` |
| `error-bg` | #fbe7e3 · dark #4a2420 | Background tint for error alerts and badges. | `--error-bg` |
| `info` | #1f5578 · dark #9cc8e6 | Info text and icon on info-bg. Always paired with an icon and a word. | `--info` |
| `info-bg` | #e3eef6 · dark #1f3a4d | Background tint for info alerts and badges. | `--info-bg` |
| `space-1` | 4px | Icon-to-label gap, hairline offsets. | `--space-1` |
| `space-2` | 8px | Tight gaps inside chips. | `--space-2` |
| `space-3` | 12px | Gap between icon and text in buttons. | `--space-3` |
| `space-4` | 16px | Default inner gap, input padding block. | `--space-4` |
| `space-5` | 20px | Card padding on mobile, gap between form fields. | `--space-5` |
| `space-6` | 24px | Button inline padding, small section gap. | `--space-6` |
| `space-7` | 28px | Card padding on desktop. | `--space-7` |
| `space-8` | 32px | Gap between cards on mobile. | `--space-8` |
| `space-9` | 36px | Gap between cards on desktop, heading to intro. | `--space-9` |
| `space-10` | 40px | Section inner gap on mobile. | `--space-10` |
| `space-11` | 44px | Block gap between stacked groups. | `--space-11` |
| `space-12` | 48px | Section padding on mobile. | `--space-12` |
| `space-13` | 52px | Gap between major blocks. | `--space-13` |
| `space-14` | 56px | Section padding on tablet. | `--space-14` |
| `space-15` | 60px | Large block spacing on desktop. | `--space-15` |
| `space-16` | 64px | Section padding on desktop (64px). | `--space-16` |
| `radius-sm` | 4px | Chips, badges, table cells, small marks. | `--radius-sm` |
| `radius-md` | 8px | Buttons, inputs, alerts, toasts. | `--radius-md` |
| `radius-lg` | 16px | Cards, image slots, lightbox photo, map block. | `--radius-lg` |
| `radius-pill` | 999px | Language switcher, floating WhatsApp button, filter chips. | `--radius-pill` |
| `shadow-flat` | none | Elevation 0: card with a 1px line border, no shadow. | `--shadow-flat` |
| `shadow-raised` | 0 4px 16px rgba(45,35,23,0.12) · dark 0 4px 16px rgba(0,0,0,0.40) | Elevation 1: raised card, toast, drawer, floating WhatsApp. Soft and subtle only. | `--shadow-raised` |
| `border-1` | 1px | Card and divider borders. | `--border-1` |
| `border-2` | 1.5px | Control borders (inputs, secondary button, chips). | `--border-2` |
| `border-focus` | 3px | Focus ring thickness. | `--border-focus` |
| `container-max` | 1200px | Container max width. | `--container-max` |
| `gutter-m` | 20px | Container side padding below 768px. | `--gutter-m` |
| `gutter-d` | 32px | Container side padding from 768px. | `--gutter-d` |
| `bp-sm` | 640px | Breakpoint: large phone. 4 columns below 768. | `--bp-sm` |
| `bp-md` | 768px | Breakpoint: tablet, 8 columns. | `--bp-md` |
| `bp-lg` | 1024px | Breakpoint: small desktop, 12 columns. | `--bp-lg` |
| `bp-xl` | 1280px | Breakpoint: desktop. | `--bp-xl` |
| `control-height` | 48px | Minimum height of buttons and form controls. | `--control-height` |
| `tap-min` | 44px | Minimum tap target for icon buttons and links. | `--tap-min` |
| `display` (type) | 56px/60px · 600 · -0.02em | Hero title only. Mobile 40/44. | class `.display` |
| `h1` (type) | 44px/50px · 600 · -0.015em | Page title. Mobile 32/38. | class `.h1` |
| `h2` (type) | 34px/40px · 600 · -0.01em | Section title. Mobile 26/32. | class `.h2` |
| `h3` (type) | 26px/32px · 600 · -0.005em | Card and product title. Mobile 22/28. | class `.h3` |
| `h4` (type) | 20px/28px · 600 · 0 | Strength item and footer headings. Mobile 18/26. | class `.h4` |
| `body-lg` (type) | 19px/30px · 400 · 0 | Section intro, hero intro. Mobile 18/28. | class `.body-lg` |
| `body` (type) | 16px/26px · 400 · 0 | Default text. | class `.body` |
| `small` (type) | 14px/22px · 400 · 0 | Helper text, table cells, footer. | class `.small` |
| `caption` (type) | 12px/18px · 600 · 0.02em | Chips, image captions. Never the only carrier of a fact. | class `.caption` |
| `button` (type) | 16px/20px · 600 · 0.01em | Button labels, 18px on size L. | class `.button` |
| `overline` (type) | 13px/16px · 700 · 0.12em | Uppercase label above a title. Set uppercase in CSS. | class `.overline` |
| `ar-display` (type) | 60px/78px · 700 · 0 | Hero title in Arabic. Mobile 42/58. | class `.ar-display` |
| `ar-h1` (type) | 48px/66px · 700 · 0 | Page title in Arabic. Mobile 34/48. | class `.ar-h1` |
| `ar-h2` (type) | 37px/54px · 700 · 0 | Section title in Arabic. Mobile 28/42. | class `.ar-h2` |
| `ar-h3` (type) | 29px/44px · 700 · 0 | Card title in Arabic. Mobile 24/36. | class `.ar-h3` |
| `ar-h4` (type) | 22px/34px · 700 · 0 | Strength and footer headings in Arabic. Mobile 20/30. | class `.ar-h4` |
| `ar-body-lg` (type) | 21px/36px · 400 · 0 | Intro text in Arabic. Mobile 19/32. | class `.ar-body-lg` |
| `ar-body` (type) | 17px/30px · 400 · 0 | Default text in Arabic. | class `.ar-body` |
| `ar-small` (type) | 15px/26px · 400 · 0 | Helper text and table cells in Arabic. | class `.ar-small` |
| `ar-caption` (type) | 13px/22px · 600 · 0 | Chips and captions in Arabic. | class `.ar-caption` |
| `ar-button` (type) | 17px/24px · 700 · 0 | Button labels in Arabic, 19px on size L. | class `.ar-button` |
| `ar-overline` (type) | 14px/20px · 700 · 0 | Label above a title in Arabic. No uppercase, no letter spacing. | class `.ar-overline` |
