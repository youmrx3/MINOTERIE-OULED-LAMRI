# Layout, spacing and elevation

Use these rules to lay out every page; values live in `tokens.json`.

## Grid and breakpoints

- Breakpoints: `bp-sm` 640, `bp-md` 768, `bp-lg` 1024, `bp-xl` 1280. Columns: 4 below 768, 8 from 768, 12 from 1024.
- Container: `container-max` 1200px, centered, side padding `gutter-m` (20) below 768 and `gutter-d` (32) from 768. In components, use `.lc-wrap`.
- Components answer to the width of their page frame (`.lc-page`, a CSS container), not the window, so the same markup renders correctly in a 390px frame inside a 1440px preview.
- Test at 320px: no horizontal scroll, no tap target under 44px, no text under 14px except `caption`.

## Spacing

- `space-n` equals n times 4px. Use `space-4` (16) inside small blocks, `space-6` (24) as card padding, `space-12` (48) as mobile section padding, `space-16` (64) as desktop section padding.
- Stack sections with alternating `paper` and `surface-alt` bands. Do not put a cream image slot on a cream band: put the slot on `paper` or `surface`.

## Radius and borders

- `radius-sm` 4, `radius-md` 8, `radius-lg` 16, `radius-pill` 999.
- `border-1` for dividers and cards, `border-2` (1.5px) for controls, `border-focus` (3px) for the focus ring.

## Elevation

- Level 0, flat card: `surface` background, `border-1` in `line`, `shadow-flat`.
- Level 1, raised card: `shadow-raised`, no border. Use for the drawer, toast, map card and floating WhatsApp. Subtle only.

## Motion

- Section enter: fade-up of 12px, 250ms, `cubic-bezier(.2,.7,.2,1)`, once. Class `.lc-enter`.
- Button press: 120ms, `translateY(1px) scale(.98)`.
- Accordion: 220ms height and chevron rotation.
- Nothing loops. A loading button shows text ("Envoi en cours…") and `aria-busy`, never a spinner.
