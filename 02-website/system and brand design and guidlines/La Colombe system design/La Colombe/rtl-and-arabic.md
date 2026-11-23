# Arabic and RTL

Every component has an LTR (French) and an RTL (Arabic) version from the same markup.

- Set `lang="ar" dir="rtl"` on the page frame. Use CSS logical properties only (`margin-inline`, `padding-inline`, `inset-inline-end`, `text-align:start`); never `left` or `right` in component CSS.
- Type: Arabic uses Cairo through `--font-arabic` and the `ar-` styles (larger size, taller line height). No uppercase, no letter spacing.
- Digits are Western (0 to 9). Phone numbers, e-mail addresses and time ranges are isolated with `.lc-ltr` or `<bdi dir="ltr">` so they never reverse.
- Directional icons (`chevron`, `arrow`) mirror through `lc-i--dir`. Non-directional icons (phone, clock, map pin, check) never mirror.
- Floating WhatsApp sits at the end corner (`inset-inline-end`): right in LTR, left in RTL.
- The language switcher keeps the visual order FR | AR in both directions (`dir="ltr"` on the switcher).
- The phone field keeps the `+213` prefix on the left and the number left-to-right in both directions; its label and helper text follow the page direction.
- Select arrows move to the left in RTL.
- The accordion chevron rotates and does not mirror. Lightbox previous and next arrows swap sides.
