La Colombe is the brand of SARL Minoterie Ouled Lamri, a flour mill in Bordj Bou Arréridj, Algeria. The site is a showcase: it presents the mill and its flour ranges, reassures on quality, and pushes the visitor to call or message. No e-commerce. Pages: Home, About, Products, Gallery, Testimonials, FAQ, Contact. Every page exists in French (LTR) and Arabic (RTL). Most visitors are on a phone, in one hand, on an average network.

The logo file was not attached when this system was built. The name is set in plain type (`.lc-logo`) and the palette is the provisional one below. When the logo arrives, drop it into the `.lc-logo` slot and into the image placeholder mark, then re-derive the palette from it (see Palette).

## Content fundamentals

- Tone: sober, reassuring, rooted, professional. Short sentences. Say what the mill does and what the visitor can do next.
- French: address the visitor with "vous". Sentence case in titles ("Des farines régulières, moulues avec exigence"). One calls to action per sentence: "Appeler maintenant", "Écrire sur WhatsApp", "Demander un devis".
- Arabic: written natively, not translated word for word. Titles in plain MSA. Use Western digits (0 to 9), as in Algeria, and isolate phone numbers and e-mail addresses with `.lc-ltr`.
- Never use emoji, exclamation marks or superlatives ("le meilleur"). Claims must be checkable: "Chaque lot est contrôlé avant expédition."
- Every page ends on a way to reach the mill: the CTA band (`.lc-cta`) with Call and WhatsApp.
- All copy, phone numbers, addresses, hours and testimonials in the previews are samples. Replace them with the client's real content before launch.

## Visual foundations

- Palette: wheat gold, earth brown, cream. Primary gold `primary-500` (#C08A2E) is for fills and accents; earth brown `secondary-700` (#4A3B2A) is for the Call button, the footer and brown surfaces; `cream` (#F5EFE6) is for alternate bands and image slots. The provisional palette follows the brief's fallback values.
- Surfaces: page on `paper`, cards on `surface`, alternate bands on `surface-alt`. Brown sections use the dark theme: put `data-theme="dark"` on the section.
- Text: body in `ink`, secondary text in `muted`. Never set gold text on cream or paper. Gold-family text on light grounds is `accent-text`; on brown it is `primary-300`.
- Buttons: Primary is gold with `on-primary` text. Call is brown (`call-bg`). WhatsApp is the only use of `whatsapp` green and carries `on-whatsapp` text, because white fails contrast on that green. Minimum height is `control-height` (48px).
- Type: headings in `serif` (Fraunces), text in `sans` (Source Sans 3), Arabic in `arabic` (Cairo) for headings and text. Set Latin headings with `display`, `h1` to `h4`, text with `body-lg`, `body`, `small`, `caption`, `button`, `overline`. Arabic uses the `ar-` styles, slightly larger with taller line height. Arabic never gets letter spacing or uppercase.
- Spacing: 4px base, `space-1` to `space-16`. Container `container-max` 1200px, side padding `gutter-m` 20px below 768px and `gutter-d` 32px from 768px. Columns: 4, 8, 12.
- Radius: `radius-sm` chips and badges, `radius-md` buttons and inputs, `radius-lg` cards and image slots, `radius-pill` language switcher and floating WhatsApp.
- Elevation: two levels only. Flat card: `border-1` in `line` with `shadow-flat`. Raised card: `shadow-raised`. No gradients, no decorative illustration, no heavy shadows.
- Imagery: real photos do not exist yet. Every image slot is a static placeholder (see Image placeholder). Fixed aspect ratios keep layouts from shifting when photos arrive.
- Motion: one fade-up on section enter (250ms, ease-out, once), button press feedback (120ms), accordion open and close (220ms). No autoplay, loops, parallax or spinners. All of it stops under `prefers-reduced-motion`.
- Focus: 3px solid `focus` ring with 2px offset on every interactive element, 3:1 or better on every surface it lands on.
- Borders: control borders use `border-strong` at `border-2` (3:1 or better); decorative dividers use `line` at `border-1`.

## Iconography

- One custom set of 17 icons plus the helpers the components need (check, alert, info, chevron-down): 24px grid, 1.5px line, round caps and joins, no fill. Icons take their color from the text color (`currentColor`); the exported SVG files in the Icons asset group carry `#4A3B2A` because an `<img>` cannot inherit color.
- Needed icons: phone, WhatsApp, mail, map pin, clock, wheat, quality, truck, factory, calendar, menu, close, chevron, arrow, Facebook, Instagram, language. The WhatsApp, Facebook and Instagram glyphs are simplified line drawings in the set's own style, not the official logos.
- `chevron` and `arrow` are directional: add `lc-i--dir` and they mirror automatically under `dir="rtl"`. Exported `-rtl.svg` files exist for use in an `<img>`.
- No emoji, no icon fonts, no filled icons.
