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


## Invitation and corner refinements

Replaced the name panel's corners with a small horizontal vine above the date and names, adding breathing room below the photograph on stacked layouts. Story cards now have four mirrored corner engravings, with left-aligned headings on phones and centered headings on larger screens. Navigation uses a diamond-and-line selection marker. Removed the decorative tape from logistics schedule cards.

Date tiles use muted peach-orange to echo the RSVP button. Each logistics title has a vertical milgrain line with a diamond setting.


## Floral-only invitation and quieter story cards

The date now has a paired acanthus flourish without rules or diamonds. Story titles use one-line sizing across desktop and phone widths, with smaller, equal corner ornaments and wider text insets. The schedule retains only its vertical heading ornament. The active navigation marker combines a fitted solid rule, beaded rule, and nested diamonds.


## Connected mobile flourish and open Archive divider

Kept the story corner sizes and moved each engraving six pixels farther from its card edges. The name flourish appears only on phones, where its two mirrored halves join at the center. Archive vines end level with the central diamond, separated by open space rather than horizontal rules. All logistics headings now retain only the vertical diamond rule, with its dotted side facing the text; the main navigation marker follows the same orientation. Schedule cards use a slightly deeper, low-saturation sage.


## Equal story insets and hotel signatures

Story cards use equal top and side padding: 48px on desktop/tablet and 36px on phones. Removed the separate desktop paragraph width cap so the body copy follows the same inset. Corner sizes and edge offsets stay consistent; the smallest-phone title scale preserves single-line headings within the slightly wider inset. Both hotel rate blocks now carry a small lower-right acanthus corner beside the booking link, with reserved horizontal clearance and no pointer interaction.


## Desktop Archive alignment

At desktop widths (1024px and above), story body paragraphs are justified, with each final line left-aligned. Story titles keep their centered alignment, and phone/tablet body copy remains left-aligned.
