# Content and assets tracker

Every item below is already wired in the project at the path shown. When the client delivers, replace the placeholder, never restructure.

| Item | Status | Integrated at | Notes |
|---|---|---|---|
| Logo | Received | `public/images/logo.png`, `logo-white.png` | Also used as the static placeholder in every empty image slot |
| Official colors and charter | To be sent, must be respected | `tailwind.config.ts` → `colors` | Overrides the provisional palette |
| Presentation texts (home, about) | Client needs help | `content/about.ts` | Raw input needed: history, years of activity, what sets the mill apart |
| Product / flour range list | Not provided | `content/products.ts` | Name, type, use, packaging, photo per range |
| Product photos | Not provided, logo placeholder shown | `public/images/products/` + `image` field in `content/products.ts` | Remove nothing: adding the path swaps the placeholder |
| Extra photos (mill, production, products) | A few provided, more needed | `public/images/gallery/` | Landscape, good light, no heavy compression |
| Testimonials | None yet, client can request some | `content/testimonials.ts` | Empty array hides the band and the page |
| Inspiration site | Not provided, client trusts the choice | — | — |
| Map coordinates | Not provided | `content/site.ts` | Needed for the static map |
| Facebook / Instagram URLs | Not provided | `content/site.ts` | |
| FAQ answers | Generic draft | `content/faq.ts` | Validate with the client |

## Information to request from the client (checklist)

- [ ] Existing logo files (vector if possible) and charter
- [ ] List of flour types with packaging sizes
- [ ] Year founded, capacity, certifications, served regions
- [ ] 10 to 20 good photos
- [ ] GPS coordinates or a map pin
- [ ] Social page links
- [ ] Two or three customer quotes, with permission to publish
