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

## Commands

```bash
npm install                 # install dependencies
npx playwright install chromium # install the E2E browser once
npm run dev                 # start the development server
npm run build               # validate content and create a production build
npm run check               # run content, lint, types, tests, and formatting checks
npm run validate:content    # validate localized content and material targets
npm run lint                # run ESLint
npm run typecheck           # run Next.js route generation and TypeScript
npm test                    # run Vitest
npm run test:e2e            # run Playwright browser tests
npm run format              # format source files
```

## Author

Victor Strokov

- [GitHub](https://github.com/gitsvitya)
- [Website](https://svitya.com)
