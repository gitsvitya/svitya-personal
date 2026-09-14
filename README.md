# Svitya's Personal Website

A bilingual portfolio built with Next.js App Router, React, TypeScript, and CSS Modules.

## Features

- Localized routes for Russian and English
- Separate detail page for every work, project, and activity
- Document, image, and external-link materials with a shared preview gallery
- Light and dark themes
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
src/utils/                   Shared routing, motion, and consent utilities
public/materials/            Files and full-size images opened from materials
e2e/                         Browser-level Playwright tests
```

`src/content/portfolio/registry.ts` combines the section-specific data files and exposes
selectors used by pages, cards, metadata, and the sitemap. Material types are a discriminated
union, so each type requires only its valid target field:

- `document` requires `fileSrc`
- `image` requires `fullImageSrc`
- `link` requires `url`

`case-studies.ts` structures the existing facts into a challenge, contribution, and outcome
for selected companies. Keep both translations complete and only add verified results.

Navigation starts immediately and keeps the previous page visible while the destination
loads. Content, the active menu item, and the mobile menu update on the same route commit
using the shared 220 ms transition. Language changes also animate header and footer copy.
The system's reduced-motion preference disables these animations.

## Commands

```bash
npm ci                      # install locked dependencies (Node.js 22 or newer)
npx playwright install chromium firefox webkit # install E2E browsers once
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
The CI workflow checks the code, builds production, and runs all three browser projects.
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
