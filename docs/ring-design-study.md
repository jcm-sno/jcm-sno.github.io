# Ring-inspired ornament study

The visual references are Samantha’s engraved engagement ring and the green acanthus border supplied by the couple. The goal is to compare different uses of the same vocabulary: curling acanthus blades, incised veins, small diamond settings, and milgrain dots.

## Design and critique

Eight compositions were explored outside the guest pages before integration. The first artwork pass was too shaded at small sizes; a second pass removed dense hatching and clarified the green contours. The watermark lacked contrast and the standalone crest felt disconnected from its heading, so both were discarded. A full keyline frame was replaced by a lighter vertical rule.

| Treatment | Placement | Design intent |
| --- | --- | --- |
| Open acanthus corners | Home invitation card | The most formal, decorative option; retain recognizable curling leaf shapes. |
| Horizontal scroll | Archive heading | A small botanical signature below a large serif heading. |
| Single vertical scroll | Across the Distance story | Reserve a separate margin beside the text. |
| Diamond and milgrain rule | Logistics schedule | Translate the ring’s beaded band edge into a thin horizontal divider. |
| Paired vertical scrolls | Registry | An invitation composition with a centered title, text, and button. |
| Vertical diamond rule | RSVP heading | A geometric alternative that leaves the form area clear. |

During actual-page review, the story scroll was shortened so its card did not expand over the surrounding photographs. The corners and paired scrolls use smaller mobile dimensions, and text retains its own clear margins. No ornament has an interactive or semantic role.

## Artwork

The acanthus artwork was created and refined with the built-in image-generation tool, then converted to WebP for the site. Source images are generated originals; the deployed assets are:

- `public/ring-acanthus-corner.webp` — 768 × 768, transparent.
- `public/ring-acanthus-scroll.webp` — 320 × 960, transparent.

The diamond and milgrain rules are native SVG in `app/components/ring-ornament.tsx`. Positioning, scale, and blending are in `app/ring-ornaments.css`. The scroll uses multiply blending to integrate its light interior with the paper color.

### Final corner refinement prompt

Refine this exact acanthus corner engraving for small-scale wedding stationery. Preserve its lower-left L composition, gracefully curled acanthus leaf contours, small diamond, and proportions. CHANGE the rendering to clean monochrome GREEN PEN LINE ART in #4e654c. Remove ALL white or cream leaf fills, gray shaded masses, embossed effects, and dense crosshatching. Make every interior and exterior negative space genuinely transparent. Keep crisp graceful outer contours with two or three flowing inner vein lines per leaf, and only a handful of light engraved hatch accents at curled tips. The leaves must feel like open line drawings, not solid shapes. The green outlines should have enough weight to remain legible at 90–160 px wide on cream paper. All marks are the same dark sage green, absolutely no neon green or yellow fringe, no white pixels, no colored halos. Original antique jewelry engraving detail, not simplified generic foliage. One isolated transparent ornament, comfortably inside the canvas; no border, text, background or shadow.

### Final scroll refinement prompt

Refine this exact tall acanthus scroll for fine wedding stationery. Preserve the graceful elongated S stem, five curling acanthus leaves, tiny diamond and tall proportions. CHANGE the rendering to clear monochrome GREEN PEN LINE ART in #4e654c. Remove every white/cream fill, gray shading, embossed effect, and dense hatching. All spaces inside the leaves and between the leaves must be truly transparent. Keep beautiful curving outer contours with two or three sinuous interior veins per leaf, and sparse incised marks only at spiral tips. Slightly stronger crisp green strokes for legibility when printed at 45 px wide and 200 px tall. Preserve distinctive scalloped acanthus blade shapes and elaborate curling tips. All marks green, absolutely no yellow/neon green halos or white pixels. Hand-engraved jeweler’s ornament, not a generic ivy vine or olive branch. Transparent background, no text, no rectangle, no borders, no shadows. Entire drawing inside canvas.


## Selected refinements — November 6, 2026

Centered the four story titles and repeated the open corner engraving on each story card. Replaced the single Archive scroll with mirrored acanthus vines, a central diamond, and a fine horizontal boundary; repeated a smaller version above Airports and Lodging. Renamed the main schedule title to Schedule and removed its duplicate eyebrow. Unified logistics heading and card typography, hotel rate sizes, and backgrounds within card groups; softened the schedule cards and transportation note to pale sage.
