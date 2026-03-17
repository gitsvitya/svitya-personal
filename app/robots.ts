import type { MetadataRoute } from "next";
import { BASE_URL } from "./site";

// Robots-файл здесь служит единой точкой настройки индексации
// и публикации sitemap для поисковых роботов.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
