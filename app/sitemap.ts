import type { MetadataRoute } from "next";
import { BASE_URL } from "./site";

// Генерирует карту сайта для всех локализованных разделов.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.endsWith("/about") ? 1 : 0.9,
  }));
}
