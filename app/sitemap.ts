import type { MetadataRoute } from "next";
import { COMPANIES } from "../src/content/companies";
import { LANGUAGES, SECTION_PATHS } from "../src/types/domain";
import { BASE_URL } from "./site";

// Sitemap отдает только конечные локализованные URL, которые должны
// индексироваться поисковиками как канонические страницы сайта.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sectionRoutes = LANGUAGES.flatMap((language) =>
    SECTION_PATHS.map((sectionPath) => `/${language}${sectionPath}`)
  );

  const companyRoutes = LANGUAGES.flatMap((language) =>
    Object.values(COMPANIES).map(
      (company) => `/${language}/${company.section}/${company.slug}`
    )
  );

  const routes = [...sectionRoutes, ...companyRoutes];

  // Для всех ссылок используем единый timestamp генерации,
  // чтобы поисковики видели карту как одну актуальную выборку.
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.endsWith("/about") ? 1 : 0.9,
  }));
}
