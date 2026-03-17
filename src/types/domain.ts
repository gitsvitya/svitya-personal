// Доменные константы служат единым источником truth для маршрутов,
// локалей, тем и идентификаторов контента во всем приложении.
export const LANGUAGES = ["ru", "en"] as const;
export const DEFAULT_LANGUAGE = "en" as const;
export const SECTIONS = ["about", "work", "projects", "activities"] as const;
export const COMPANY_SECTIONS = ["work", "projects", "activities"] as const;
export const SECTION_PATHS = ["/about", "/work", "/projects", "/activities"] as const;
export const THEMES = ["light", "dark"] as const;
export const COMPANY_IDS = [
  "CI",
  "NTB",
  "LRNPT",
  "KG",
  "TR",
  "MBC",
  "MNG",
  "VNV",
  "SKO",
  "SDC",
] as const;

// Union-типы выводятся напрямую из константных массивов, чтобы runtime-
// и compile-time наборы значений никогда не расходились между собой.
export type Language = (typeof LANGUAGES)[number];
export type Section = (typeof SECTIONS)[number];
export type CompanySection = (typeof COMPANY_SECTIONS)[number];
export type SectionPath = (typeof SECTION_PATHS)[number];
export type Theme = (typeof THEMES)[number];
export type CompanyId = (typeof COMPANY_IDS)[number];
export type LocalizedPath = `/${Language}/${Section}`;
