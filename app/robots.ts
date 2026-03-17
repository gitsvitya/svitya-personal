import type { MetadataRoute } from "next";
import { BASE_URL } from "./site";

// Возвращает robots-правила и ссылку на sitemap для поисковых систем.
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
