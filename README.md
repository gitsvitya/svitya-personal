# Svitya's Personal Website

A bilingual portfolio built with Next.js App Router, React, TypeScript, and CSS Modules.

## Features

- Localized routes for Russian and English
- Separate detail page for every work, project, and activity
- Document, image, and external-link materials with a shared preview gallery
- Download sizes and lighter PDFs with separately downloadable originals
- Light and dark themes
- A Settings tab for theme, language, and reopening the cookie notice
- Responsive desktop, tablet, and mobile layouts
- Localized SEO metadata, sitemap, and language redirects

## Project Structure

```text
app/                         App Router pages, layouts, redirects, and SEO
src/components/              Reusable UI and page sections
src/content/portfolio/       Typed work, project, and activity content
src/content/ui-text.ts       Shared localized interface text
src/hooks/                   Reusable client hooks
src/images/portfolio/        Imported logos and material previews
src/types/                   Shared domain and asset declarations
src/utils/                   Shared routing, motion, and cookie notice utilities
public/materials/            Files and full-size images opened from materials
e2e/                         Browser-level Playwright tests
```

`src/content/portfolio/registry.ts` combines the section-specific data files and exposes
selectors used by pages, cards, metadata, and the sitemap. Material types are a discriminated
union. Each material has an `assets.ru` and `assets.en` version with its own `previewSrc`
for gallery cards and `fullImageSrc` for the enlarged modal image. Each type also requires
its valid target field inside both language versions:

- `document` requires `fileSrc`
- `image` requires `fullImageSrc`
- `link` requires `url`

`getLocalizedCompany` selects the images, document and optional source link for the requested
language. Both versions may reference the same assets when there is no translated material.
MappNgo's test screens, homepage and FAQ each use one card with distinct Russian and English
assets and source links where available.

`case-studies.ts` structures the existing facts into a challenge, contribution, and outcome
for selected companies. Keep both translations complete and only add verified results.

Navigation starts immediately and keeps the previous page visible while the destination
loads. Content, the active menu item, and the mobile menu update on the same route commit
using the shared 300 ms transition. Language changes also animate header and footer copy.
The system's reduced-motion preference disables these animations.

Shared colors, typography, controls and interaction rules are documented in
[Style conventions](docs/styles.md).

## Commands

```bash
npm ci                      # install locked dependencies (Node.js 22 or newer)
npx playwright install chromium chrome firefox webkit # install E2E browsers once
npm run dev                 # start the development server
npm run build               # validate content and create a complete standalone build
npm start                   # serve the standalone production build
npm run check               # run content, lint, types, tests, and formatting checks
npm run validate:content    # validate localized content and material targets
npm run update:downloads    # refresh download sizes after replacing files
npm run optimize:pdfs       # rebuild optimized PDFs from preserved originals (optional Python tools)
npm run lint                # run ESLint
npm run typecheck           # run Next.js route generation and TypeScript
npm test                    # run Vitest
npm run test:e2e             # test production on port 3100; run build first
npm run format              # format source files
```

The build copies `public/` and `.next/static/` into `.next/standalone/`. Deploy that directory
as a unit and run `node server.js` inside it, with `PORT` and `HOSTNAME` set for your host.
For publishing to Sprinthost shared hosting, see the Russian
[build and deployment guide](docs/deploy-sprinthost.md).
For a Sprintbox VPS running Ubuntu 24.04, see the separate
[VPS deployment guide](docs/deploy-sprintbox.md).
The CI workflow checks the code, builds production, and tests Chromium, Firefox, and WebKit.
Theme checks also run in Google Chrome, including a pixel comparison in a temporary profile
with visited-link history, since computed styles hide visited-link paint differences.
Responsive checks also save page screenshots in `test-results/`, uploaded by CI as the
`browser-checks` artifact for visual review. These are review images, not pixel-diff assertions.

## Download files

`src/content/downloads.json` records each public file's download name and byte size. An
optimized PDF also has `originalSrc`, pointing to its preserved source under
`public/materials/originals/`, and an `optimization` profile. The main Download and Open in
new window actions use the existing material URL for the lighter copy. A separate Download
original link appears only for files with both versions. The interface formats sizes for
Russian and English; original filenames add ` - Оригинал` before the extension.

The two MappNgo test-screen PDFs use lossless structural compression. The Mad Burglar Cat
catalog additionally compresses large RGB images at JPEG quality 95 without reducing their
pixel dimensions. Text, vector graphics, image color profiles, transparency masks and links
are preserved. Print artwork and already small documents keep their existing files.

The optional PDF maintenance tools require Python 3.9 or newer and the packages in
`scripts/requirements-pdf.txt`. They are only needed when preparing new copies, not for the
website build or deployment. `npm run optimize:pdfs` reads preserved originals, verifies
their recorded checksums, rebuilds the lighter copies, and checks text, page dimensions,
links and rendered pixels on every page at 144 dpi. Lossless copies must render identically;
JPEG copies also require visual review of the resulting pages. The verification report is
saved under the ignored `output/pdf-optimization/` directory.

When deliberately replacing a managed original, update the file at its `originalSrc`, run
`npm run update:downloads`, then `npm run optimize:pdfs`. Review the pages and run the regular
checks and browser download tests before release. The optimizer never replaces an existing
original with a compressed copy. Register any new download in the manifest; content
validation checks the complete public document inventory and its byte sizes.

The two locale trees are statically generated with `dynamicParams: false`. Unknown paths
use Next's `global-not-found` convention so their localized HTML is available without
JavaScript. This requires the `experimental.globalNotFound` option in Next.js 16.3.
Next.js 16.3.2 can log `Internal: NoFallbackError` for unknown generated paths before serving
that fallback; the production tests verify the final 404 status and localized HTML.

## Author

Victor Strokov

- [GitHub](https://github.com/gitsvitya)
- [Website](https://svitya.com)
