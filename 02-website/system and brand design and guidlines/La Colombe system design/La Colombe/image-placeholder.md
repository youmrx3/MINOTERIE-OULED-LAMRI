# Image placeholder

Real photos do not exist yet. Every image slot shows the same static placeholder so the site looks finished and the photos can replace it later without changing any layout.

## Specification

- Surface: `surface-alt` (accent cream in the light theme), same radius as the real image: `radius-lg`.
- Mark: the logo, centered, 40% of the slot width, 18% opacity, so it reads as a watermark. Until the logo file is attached the mark is the plain-type wordmark "LA COLOMBE" in an inline SVG; replace the SVG with the logo file and keep width and opacity.
- Hairline: 1px inset border in `line`, so the slot reads on any ground.
- No animation of any kind: no shimmer, no pulse, no skeleton, no movement.
- Fixed aspect ratios, set on the slot with `aspect-ratio` so nothing shifts: product 4:3, hero 16:9 on desktop and 4:5 on mobile, gallery 1:1 and 4:3, about 3:2.

## Classes

`.lc-ph` plus one of `.lc-ph--product` (4:3), `.lc-ph--hero` (4:5, switches to 16:9 from 768px), `.lc-ph--hero-d` (16:9), `.lc-ph--hero-m` (4:5), `.lc-ph--sq` (1:1), `.lc-ph--g43` (4:3), `.lc-ph--about` (3:2).

## Swapping in a photo

Put an `<img>` inside the same `.lc-ph` element and remove the mark. The image is `position:absolute; inset:0; width:100%; height:100%; object-fit:cover`, so the slot keeps its ratio and radius. Give the image a real `alt`; keep the placeholder `role="img"` label until then.

## Where not to use it

Not for the logo, icons or avatars. On brown surfaces the slot switches to `secondary-700` with a cream mark through the dark theme.
