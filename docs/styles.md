# Style conventions

The implementation follows the [approved svitya.com Figma design](https://www.figma.com/design/Xr6HM7fEmdumbRfVlaFVld/?node-id=5-2), including the layout and interaction refinements agreed through 17 November 2026. This document describes the current components and shared rules.

## Typography and layout

Onest is hosted locally with its OFL license in `src/fonts/OFL.txt`. `Onest.woff2` provides the variable web font; `Onest-Regular.ttf` is used to render Open Graph images. Body text uses weight 400, controls 500, and headings 600.

The maximum content width is 1220 px inside a 1280 px container with 30 px side padding. Side padding becomes 24 px at 1024 px and 16 px at 640 px. Prose is limited to 780 px. Desktop section headings use 48/56 px, mobile 32/40 px. Case-study body copy is 20/32 px on desktop and 18/28 px on mobile. Layouts grow with their content.

Above 1024 px, catalog rows and case-study sections use columns in a 1:2 ratio, with a shared gap of 32–80 px. Case titles and section headings sit on the left; summaries, descriptions, and body text sit on the right. Below that breakpoint, case content becomes one column and is centered within its maximum width. Catalog entries become bordered cards. The homepage uses the same desktop columns for the portrait and introduction, followed by a full-width contact invitation. On smaller screens the portrait, introduction, and contact block stack vertically.

Catalog identity, logo, and description blocks share a vertical center on desktop. On smaller screens, the identity and logo stay centered within the card header. Logos fit inside an 84 × 48 px frame with their original proportions and transparent backgrounds preserved. At 360 px and below, the frame becomes 70 × 40 px to leave more room for company names.

## Colors and interaction

Global semantic colors are declared in `src/index.css`, with light and dark themes and a system preference. Components use these tokens for text, surfaces, borders, and controls. Hover color transitions use 180 ms ease-out; pressed states use 120 ms. Focus uses an immediate 2 px accent outline with a 3 px offset. Links are never underlined; cards and images stay in place during interaction. Forward arrows move 4 px right and back arrows 4 px left over 300 ms with `cubic-bezier(0.22, 1, 0.36, 1)` on mouse hover and keyboard focus. Reduced motion and disabled controls suppress arrow movement. Catalog outcomes remain muted, while the action changes to the accent color. Primary contact actions use a filled accent background.

Navigation and language changes use the shared 300 ms transition. The destination content, current navigation item, and mobile menu state update together when the route is ready. The mobile menu is used below 769 px; Escape closes it. All animation respects the system's reduced-motion preference.

## Materials and viewer

Material previews share a 300 px frame height on desktop and tablet. Mobile visual previews use a 358:279 aspect ratio; compact work materials use 96 × 124 px. Photos fill their frames, while document artwork remains fully visible. Stroke Off's photo uses a 50% 70% crop position.

Galleries use three columns above 1024 px, two columns through 641 px, and one column at 640 px and below. Galleries containing two materials are centered and keep the regular card width on desktop. Work materials become compact rows on mobile; project and interest materials keep broad previews. Each preview links to its underlying material and opens the viewer for an ordinary click.

The viewer keeps its title and close control above a scrollable body. Its maximum width is 900 px, with 24 px padding; mobile uses 16 px padding and an 8 px outer margin. The body contains a large preview, navigation arrows and counter, a description, and the relevant document/source/download actions. Focus remains inside the viewer, focused actions stay visible, and closing the viewer restores focus to the originating preview. Left/Right switches materials and Escape closes the viewer. The original download is offered separately when a lighter PDF is available; file sizes are not displayed.

## Content and navigation

The homepage groups work/project links separately from the contact invitation. It has no CV download action. Catalog cards have no status badges; status belongs in the detailed project or interest page. Case pages lead with a summary, keep verified metrics distinct from prose, and finish with section and next-story links.

Portfolio presentation copy is bilingual in `src/content/portfolio/presentation.ts`; company descriptions and material records live in the section-specific files, and structured narratives live in `case-studies.ts`. Preserve both languages, document targets, and download originals when editing the presentation. Existing public CV and material URLs remain available even when a page no longer links to them.
