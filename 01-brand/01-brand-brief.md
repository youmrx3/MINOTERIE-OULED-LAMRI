# Brand brief — LA COLOMBE

Client: SARL Minoterie Ouled Lamri · Flour milling · Bordj Bou Arréridj (Ain Tasserra), Algeria
**Status update:** the logo now exists. The work in this section is therefore:

1. `03-design-system-prompt.md`: the design system for the website, built from the logo.
2. `04-brand-guidelines-prompt.md`: the brand guidelines, built from the logo and the design system.

`02-claude-design-prompts.md` (two logo options) is kept as an optional reference, only needed if the client asks for alternatives. Run order: 03, then 04.

---

## 1. Pre-flight check (before presenting anything)

The client questionnaire (19/08/2026) states two things that affect this work:

| Item | Client answer | Consequence |
|---|---|---|
| Logo | "Ready", to be sent | Confirm whether the existing logo is kept, refined or replaced. The two options below are proposals, so present them as an evolution or a replacement depending on the answer. |
| Brand charter (colors, rules) | Exists, must be respected | If the charter is received, replace the provisional palette in both prompts with the official values before generating. |

Until those arrive, the provisional palette from the technical spec is used.

## 2. Brand essentials

| | |
|---|---|
| Brand name | LA COLOMBE (the dove) |
| Legal name | SARL Minoterie Ouled Lamri |
| Sector | Flour milling, agri-food |
| Location | Bir Aissa, Commune Ain Tasserra, Wilaya de Bordj Bou Arréridj |
| Languages | French and Arabic (the logo must hold a Latin and an Arabic lockup) |
| Arabic wordmark | الحمامة (to validate with the client) |
| Audience | Bakers, pastry makers, wholesalers, local businesses and households |
| Tone | Sober, reassuring, trustworthy, rooted in the land |

## 3. Brand territory

- **Dove:** the name itself. Peace, purity, lightness (white flour).
- **Wheat:** the raw material. Harvest, generosity, nourishment.
- **Millstone:** craft and industrial know-how. Strength, consistency.
- **Colors:** warm earth and grain. Gold, brown, off-white.

Avoid: cartoon doves, religious iconography, clip-art wheat, gradients and glossy effects, thin hairlines that disappear on a flour bag, more than three colors.

## 4. Provisional palette

| Role | Hex | Use |
|---|---|---|
| Primary (wheat gold) | `#C08A2E` | Mark, accents, calls to action |
| Secondary (earth brown) | `#4A3B2A` | Wordmark, dark backgrounds |
| Accent (cream) | `#F5EFE6` | Light backgrounds |

These three values are also the Tailwind tokens in `02-website/`.

## 5. The two directions

| | Option A — Dove & Ear | Option B — Millstone Seal |
|---|---|---|
| Idea | A dove in flight whose wing is built from a wheat ear | A circular seal: dove over millstone grooves, ringed by the company name |
| Character | Light, modern, friendly | Solid, traditional, institutional |
| Strength | Clean on a website header and a social avatar | Strong on sacks, stamps and invoices |
| Risk | Dove/wheat merge must stay readable when small | Ring text becomes illegible below a certain size, so a simplified mark is needed for the favicon |

## 6. Technical requirements for every option

- Vector construction, flat colors, no gradient dependence.
- Readable at 32 px (favicon) and at 40 px header height.
- Works in one color (brown on cream, white on brown, black).
- Horizontal and stacked lockups.
- Arabic lockup that mirrors correctly for RTL layouts.
- Exportable as SVG and PNG, with a white version for dark backgrounds (`logo.png` and `logo-white.png` in the website).

## 7. How to judge the options

1. Does the dove read in under a second at 40 px?
2. Does it still work in one color on a printed bag?
3. Does the Arabic version feel designed, not translated?
4. Does it sit naturally next to the warm palette and real photos of the mill?
5. Could a competitor mill share it without confusion? (originality)

## 8. Hand-off

Once one option is chosen, the following go to the website:

```
public/images/logo.png
public/images/logo-white.png
public/favicon.ico  (+ app icon)
```

and the final colors replace the `primary`, `secondary`, `accent` values in `tailwind.config.ts`.
