# Accessibility

- Contrast: all text pairs reach 4.5:1 (3:1 for large text, control borders and focus rings) in both themes. See Contrast checks.
- Focus: visible 3px ring on every interactive element (`focus`), 2px offset. Never remove it.
- Tap targets: 44px minimum (`tap-min`); buttons and form controls 48px (`control-height`).
- Readable at 320px: single column, no horizontal scroll.
- Never rely on color alone: every alert pairs an icon with a word; links are underlined.
- Motion respects `prefers-reduced-motion`; nothing autoplays or loops.
- Forms: each control has a visible `<label>`; errors use `aria-invalid` and `aria-describedby` and appear as icon plus text.
- Images: real photos get meaningful `alt`; placeholders carry the label of the photo they stand for.
- Language: set `lang` and `dir` on the page and on any block that switches language.
