# Contrast checks

Every text and background pair the system uses, with its WCAG 2 contrast ratio. AA needs 4.5:1 for text and 3:1 for large text, control borders and focus rings. Ratios are computed from the token values in both themes.

| Pair | Text / mark | Background | Theme | Ratio | Needs | AA |
|---|---|---|---|---|---|---|
| Body text | `ink` | `paper` | light | 14.53:1 | 4.5 | Pass |
| Body text | `ink` | `paper` | dark | 13.47:1 | 4.5 | Pass |
| Body text on card | `ink` | `surface` | light | 15.39:1 | 4.5 | Pass |
| Body text on card | `ink` | `surface` | dark | 11.66:1 | 4.5 | Pass |
| Body text on band | `ink` | `surface-alt` | light | 13.47:1 | 4.5 | Pass |
| Body text on band | `ink` | `surface-alt` | dark | 9.42:1 | 4.5 | Pass |
| Secondary text | `muted` | `paper` | light | 6.25:1 | 4.5 | Pass |
| Secondary text | `muted` | `paper` | dark | 8.51:1 | 4.5 | Pass |
| Secondary text on card | `muted` | `surface` | light | 6.62:1 | 4.5 | Pass |
| Secondary text on card | `muted` | `surface` | dark | 7.37:1 | 4.5 | Pass |
| Secondary text on band | `muted` | `surface-alt` | light | 5.79:1 | 4.5 | Pass |
| Secondary text on band | `muted` | `surface-alt` | dark | 5.96:1 | 4.5 | Pass |
| Link | `link` | `paper` | light | 10.16:1 | 4.5 | Pass |
| Link | `link` | `paper` | dark | 8.97:1 | 4.5 | Pass |
| Link on card | `link` | `surface` | light | 10.77:1 | 4.5 | Pass |
| Link on card | `link` | `surface` | dark | 7.76:1 | 4.5 | Pass |
| Gold label (overline) | `accent-text` | `paper` | light | 5.19:1 | 4.5 | Pass |
| Gold label (overline) | `accent-text` | `paper` | dark | 8.97:1 | 4.5 | Pass |
| Gold label on band | `accent-text` | `surface-alt` | light | 4.81:1 | 4.5 | Pass |
| Gold label on band | `accent-text` | `surface-alt` | dark | 6.28:1 | 4.5 | Pass |
| Gold label on card | `accent-text` | `surface` | light | 5.50:1 | 4.5 | Pass |
| Gold label on card | `accent-text` | `surface` | dark | 7.76:1 | 4.5 | Pass |
| Primary button label | `on-primary` | `primary-500` | light | 5.07:1 | 4.5 | Pass |
| Primary button label | `on-primary` | `primary-500` | dark | 5.07:1 | 4.5 | Pass |
| Primary button hover | `on-primary` | `primary-400` | light | 6.80:1 | 4.5 | Pass |
| Primary button hover | `on-primary` | `primary-400` | dark | 6.80:1 | 4.5 | Pass |
| Primary button pressed | `on-primary` | `primary-300` | light | 8.97:1 | 4.5 | Pass |
| Primary button pressed | `on-primary` | `primary-300` | dark | 8.97:1 | 4.5 | Pass |
| Call button label | `on-call` | `call-bg` | light | 9.42:1 | 4.5 | Pass |
| Call button label | `on-call` | `call-bg` | dark | 13.47:1 | 4.5 | Pass |
| WhatsApp button label | `on-whatsapp` | `whatsapp` | light | 7.43:1 | 4.5 | Pass |
| WhatsApp button label | `on-whatsapp` | `whatsapp` | dark | 7.43:1 | 4.5 | Pass |
| WhatsApp hover | `on-whatsapp` | `whatsapp-hover` | light | 8.24:1 | 4.5 | Pass |
| WhatsApp hover | `on-whatsapp` | `whatsapp-hover` | dark | 8.24:1 | 4.5 | Pass |
| WhatsApp pressed | `on-whatsapp` | `whatsapp-pressed` | light | 9.52:1 | 4.5 | Pass |
| WhatsApp pressed | `on-whatsapp` | `whatsapp-pressed` | dark | 9.52:1 | 4.5 | Pass |
| Success text | `success` | `success-bg` | light | 6.16:1 | 4.5 | Pass |
| Success text | `success` | `success-bg` | dark | 7.21:1 | 4.5 | Pass |
| Warning text | `warning` | `warning-bg` | light | 6.25:1 | 4.5 | Pass |
| Warning text | `warning` | `warning-bg` | dark | 7.32:1 | 4.5 | Pass |
| Error text | `error` | `error-bg` | light | 6.07:1 | 4.5 | Pass |
| Error text | `error` | `error-bg` | dark | 7.04:1 | 4.5 | Pass |
| Info text | `info` | `info-bg` | light | 6.78:1 | 4.5 | Pass |
| Info text | `info` | `info-bg` | dark | 6.67:1 | 4.5 | Pass |
| Error text on paper | `error` | `paper` | light | 6.82:1 | 4.5 | Pass |
| Error text on paper | `error` | `paper` | dark | 8.07:1 | 4.5 | Pass |
| Control border | `border-strong` | `paper` | light | 4.02:1 | 3 | Pass |
| Control border | `border-strong` | `paper` | dark | 5.36:1 | 3 | Pass |
| Control border on card | `border-strong` | `surface` | light | 4.25:1 | 3 | Pass |
| Control border on card | `border-strong` | `surface` | dark | 4.64:1 | 3 | Pass |
| Focus ring | `focus` | `paper` | light | 10.16:1 | 3 | Pass |
| Focus ring | `focus` | `paper` | dark | 8.97:1 | 3 | Pass |
| Focus ring on card | `focus` | `surface` | light | 10.77:1 | 3 | Pass |
| Focus ring on card | `focus` | `surface` | dark | 7.76:1 | 3 | Pass |
| Focus ring on band | `focus` | `surface-alt` | light | 9.42:1 | 3 | Pass |
| Focus ring on band | `focus` | `surface-alt` | dark | 6.28:1 | 3 | Pass |
| Placeholder mark vs slot (decorative) | `primary-700` | `surface-alt` | light | 4.81:1 | - | n/a (decorative) |
| Placeholder mark vs slot (decorative) | `primary-700` | `surface-alt` | dark | 1.96:1 | - | n/a (decorative) |
| Gold on cream (NOT allowed as body text) | `primary-500` | `cream` | light | 2.66:1 | 4.5 | Fail: forbidden |

Gold text on cream: `primary-500` on `cream` reaches 2.66:1, so gold is never used for body text on light surfaces. Gold text on light grounds goes through `accent-text` (`primary-700`). On brown surfaces gold text (`primary-300`, `primary-400`) passes.

Disabled controls are exempt from contrast requirements by WCAG 2.
