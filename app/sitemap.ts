import type { MetadataRoute } from "next";
import { BASE_URL } from "./site";

// Sitemap отдает только конечные локализованные URL, которые должны
// индексироваться поисковиками как канонические страницы сайта.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Маршруты описаны явно, потому что набор разделов небольшой и стабилен,
  // а такой список проще контролировать при изменении SEO-структуры.
  const routes = [
    "/en/about",
    "/en/work",
    "/en/projects",
    "/en/activities",
    "/ru/about",
    "/ru/work",
    "/ru/projects",
    "/ru/activities",
  ] as const;

  // Для всех ссылок используем единый timestamp генерации,
  // чтобы поисковики видели карту как одну актуальную выборку.
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.endsWith("/about") ? 1 : 0.9,
  }));
}
