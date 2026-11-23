Primary, secondary, ghost, Call and WhatsApp buttons in sizes M and L.

**Consumer provides:** Provide a label (and an icon for Call and WhatsApp) and an `href` (`tel:` for Call, `https://wa.me/` for WhatsApp). Markup: `<a class="lc-btn lc-btn--primary">`; add `lc-btn--l` for size L (56px).

**Use:** One primary button per view, usually the Call or hero action. Call (`lc-btn--call`, brown) for `tel:` links, WhatsApp (`lc-btn--whatsapp`) only for opening WhatsApp. Secondary for quotes and secondary actions, ghost for tertiary actions. Minimum height 48px, 44px tap target everywhere.

**Don't:** Don't put gold text on cream, don't use white text on the WhatsApp green (use `on-whatsapp`), don't show a spinner while loading: swap the label for text and set `aria-busy`. States: default, hover, focus-visible (3px ring), pressed (1px down, 98%), disabled.
