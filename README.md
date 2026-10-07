# Svitya's Personal Website

A bilingual portfolio built with Next.js App Router, React, TypeScript, and CSS Modules.

## Features

- Localized routes for Russian and English
- Separate detail page for every work, project, and activity
- Document, image, and external-link materials with a shared preview gallery
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

The two locale trees are statically generated with `dynamicParams: false`. Unknown paths
use Next's `global-not-found` convention so their localized HTML is available without
JavaScript. This requires the `experimental.globalNotFound` option in Next.js 16.3.
Next.js 16.3.2 can log `Internal: NoFallbackError` for unknown generated paths before serving
that fallback; the production tests verify the final 404 status and localized HTML.

## Author

Victor Strokov

- [GitHub](https://github.com/gitsvitya)
- [Website](https://svitya.com)
