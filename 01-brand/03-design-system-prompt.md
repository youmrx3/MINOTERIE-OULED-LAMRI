# Design system prompt — LA COLOMBE website

Run this **before** the brand guidelines prompt (`04-brand-guidelines-prompt.md`). Attach the client's logo file (SVG or PNG) to the Claude Design project first. The prompt treats the logo as the source of truth.

If the client's charter arrives later, run the "Charter alignment" follow-up at the bottom.

---

## Main prompt

```
Create a complete design system for the showcase website of "LA COLOMBE",
the brand of SARL Minoterie Ouled Lamri, a flour mill in Bordj Bou Arréridj,
Algeria. The attached file is the official logo. Treat it as the single source
of truth for the identity: do not redraw, recolor or modify it.

PROJECT CONTEXT
- Showcase website, no e-commerce. Goal: present the mill and its flour
  ranges, reassure on quality, push the visitor to call or message.
- Pages: Home, About, Products, Gallery, Testimonials, FAQ, Contact.
- Two languages: French (LTR) and Arabic (RTL). Every component must have an
  LTR and an RTL version.
- Most visitors are on phones in Algeria, in one hand, on average networks.
- Built with Next.js and Tailwind CSS, so tokens must map to CSS variables and
  a Tailwind config.
- Tone: sober, reassuring, rooted, professional. Warm grain and earth feeling.

1. COLOR
Extract the palette from the logo. If the logo has no usable colors, fall back
to: primary wheat gold #C08A2E, secondary earth brown #4A3B2A, accent cream
#F5EFE6.
- Primary and secondary: full 50 to 900 scales, named by role.
- Neutrals: ink, muted, line, paper, surface.
- Semantic: success, warning, error, info, each with a background tint.
- One utility color for the WhatsApp button only (WhatsApp green).
- Show every text/background pair used in the system with its WCAG contrast
  ratio and a pass/fail mark for AA. Never put gold body text on cream.
- Show light-surface and dark-surface (brown) usage side by side.

2. TYPOGRAPHY
- Latin headings: a serif with character. Latin body: a humanist sans.
- Arabic headings and body: a modern Arabic family with matching weight
  (Cairo, Tajawal or Noto Kufi Arabic). Pair it optically with the Latin one.
- Type scale for mobile and desktop: display, h1 to h4, body large, body,
  small, caption, button, overline. Give size, line height, weight, tracking.
- Arabic gets slightly larger size and taller line height than Latin.
- Show a specimen in French and in Arabic for each style.

3. LAYOUT AND SPACING
- 4 px base spacing scale named space-1 to space-16.
- Container max width 1200, side padding 20 mobile and 32 desktop.
- Breakpoints 640, 768, 1024, 1280. 4 columns mobile, 8 tablet, 12 desktop.
- Radius scale (small, medium, large, pill), border widths, and two elevation
  levels (flat card with border, raised card with soft shadow). Subtle only.

4. ICONOGRAPHY
- A small custom set in one style: 1.5 px line, rounded caps, 24 px grid.
- Icons needed: phone, WhatsApp, mail, map pin, clock, wheat, quality/check,
  truck/delivery, factory/mill, calendar, menu, close, chevron, arrow,
  facebook, instagram, language.
- Directional icons come with a mirrored RTL version.

5. COMPONENTS (each with default, hover, focus, pressed, disabled where it
   applies, in French/LTR and Arabic/RTL)
- Buttons: primary, secondary, ghost, Call (phone), WhatsApp. Sizes M and L.
  Minimum height 48 px.
- Links and inline phone/email links
- Header desktop, header mobile with drawer menu, language switcher (FR | AR)
- Footer (logo, quick links, address, hours, phone, email, social)
- Section header (overline, title, intro)
- Hero with two calls to action
- Strength item (icon, title, one line)
- Product card, product section block (image, name, range, description, sizes)
- Image placeholder (see rule below)
- Gallery tile and lightbox
- Testimonial card
- FAQ accordion
- Form: text input, phone input, textarea, select, helper text, inline error,
  success banner, submit button with loading state
- Contact info card, opening hours table, static map block
- Social links
- Floating WhatsApp button (fixed at the end corner, flips in RTL)
- Badge/chip, alert, toast

6. IMAGE PLACEHOLDER RULE (important)
The real photos do not exist yet. Every image slot must show a static
placeholder built from the logo, so the site looks finished and the real
images can replace them later without changing any layout.
- Surface: accent cream color, same radius as the real image would have.
- The logo centered, about 35 to 45 percent of the slot width, at low opacity
  so it reads as a watermark.
- No animation of any kind: no shimmer, no pulse, no skeleton loading, no
  movement. Completely still.
- Fixed aspect ratios so nothing shifts when a photo is added: product 4:3,
  hero 16:9 desktop and 4:5 mobile, gallery 1:1 and 4:3, about 3:2.
- Show each ratio with the placeholder, plus one example of the slot with a
  real-photo stand-in in a neutral gray to prove the swap is seamless.

7. MOTION
- Only a short fade-up on section enter (200 to 300 ms, ease-out, once),
  button press feedback, accordion open/close.
- No autoplay, no loops, no parallax. Everything respects reduced motion.

8. ACCESSIBILITY
- Visible focus ring in the system, tap targets 44 px minimum, AA contrast,
  readable at 320 px width.

9. PAGE TEMPLATES (compositions built only from the components above)
- Home, Products and Contact, each at 390 px mobile and 1440 px desktop.
- Each in French/LTR and Arabic/RTL.
- Image slots use the placeholder.

10. DELIVERABLES
- A documented design system: foundations, components, patterns, templates.
- A token table: name, value, usage, with a CSS variable name for each.
- A ready-to-copy Tailwind config snippet and a :root CSS variables block.
- A short do and don't section (5 each).

Style of the documentation itself: clean, cream background, brown text, gold
accents. No decorative illustration, no gradients, no emoji.
```

---

## Follow-up prompts

**Charter alignment (when the client sends official colors)**
```
Replace the palette with the official colors: [primary hex], [secondary hex],
[accent hex]. Rebuild the scales, re-run every contrast check, update the
token table, the Tailwind snippet and the CSS variables. Change nothing else.
```

**Arabic review**
```
Review every component in the RTL version. Check alignment, icon mirroring,
number and phone direction, Arabic type size and line height, and the
position of the floating WhatsApp button. List the fixes, then apply them.
```

**Mobile stress test**
```
Show Home, Products and Contact at 320 px and 390 px. Find any overflow,
cramped tap target or hard-to-read text, and fix it in the system.
```

**Hand-off sheet**
```
Create a one-page developer sheet: token names, spacing and radius scales,
type scale, component list with their variants, breakpoints, and the exact
image placeholder specification (ratios, logo size, opacity).
```

---

## Checklist before moving on

- [ ] Logo attached and unchanged in every example
- [ ] Palette matches the logo (or the provisional palette is noted)
- [ ] Every component exists in FR/LTR and AR/RTL
- [ ] Placeholder is static, uses the logo, and has fixed aspect ratios
- [ ] Tailwind snippet and CSS variables exported
