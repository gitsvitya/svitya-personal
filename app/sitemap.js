import { BASE_URL } from "./site";

export default function sitemap() {
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
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.endsWith("/about") ? 1 : 0.9,
  }));
}
