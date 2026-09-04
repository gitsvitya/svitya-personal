import type { MetadataRoute } from "next";
import { COMPANIES } from "../src/content/portfolio";
import { LANGUAGES, SECTION_PATHS } from "../src/types/domain";
import { BASE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sectionRoutes = LANGUAGES.flatMap((language) =>
    SECTION_PATHS.map((sectionPath) => `/${language}${sectionPath}`)
  );

  const companyRoutes = LANGUAGES.flatMap((language) =>
    Object.values(COMPANIES).map((company) => `/${language}/${company.section}/${company.slug}`)
  );

  const routes = [...sectionRoutes, ...companyRoutes];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.endsWith("/about") ? 1 : 0.9,
  }));
}
