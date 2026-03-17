# Svitya's Personal Website

This project serves as an interactive resume, showcasing my professional experience, personal projects, and areas of expertise. The website is designed to be clean, responsive, and informative, providing visitors with a clear overview of my career path and ongoing work.

## Project Overview

A personal portfolio website built with **Next.js** and **React**. It includes interactive cards, modal windows with details, language/theme switching, and a responsive layout for desktop and mobile.

## Key Functionalities

- Interactive experience cards with modal details
- Multi-section navigation with localized routes (`/ru/about`, `/ru/work`, `/en/about`, etc.)
- Responsive layout for desktop and mobile
- Cookie consent banner
- Dark/light theme mode
- RU/EN content switch
- TypeScript-based architecture with typed routing, shared UI translations, and centralized company content data

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- CSS Modules
- LocalStorage

## Content Structure

- `src/content/companies.ts` stores structured company/project/activity content and localized card/modal data
- `src/content/ui-text.ts` stores shared UI translations for navigation, about section, footer, cookie banner, and controls
- `src/hooks/*` contains extracted client logic for theme, modal state, and localized navigation

## Available Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm run start
```

## Author

Victor Strokov

## Links

- [My GitHub](https://github.com/gitsvitya)
- [Live Website](https://svitya.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
