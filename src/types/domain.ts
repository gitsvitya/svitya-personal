export const LANGUAGES = ["ru", "en"] as const;
export const DEFAULT_LANGUAGE = "en" as const;
export const SECTIONS = ["about", "work", "projects", "activities"] as const;
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

export type Language = (typeof LANGUAGES)[number];
export type Section = (typeof SECTIONS)[number];
export type SectionPath = (typeof SECTION_PATHS)[number];
export type Theme = (typeof THEMES)[number];
export type CompanyId = (typeof COMPANY_IDS)[number];
export type LocalizedPath = `/${Language}/${Section}`;
