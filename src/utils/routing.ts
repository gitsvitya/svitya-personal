import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  SECTION_PATHS,
  type Language,
  type LocalizedPath,
  type SectionPath,
} from "../types/domain";

type ParsedLocalizedPath = {
  hasLocale: boolean;
  language: Language | null;
  sectionPath: string;
  isSectionValid: boolean;
};

export function trimPath(path?: string | null): string {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function isSupportedLanguage(value?: string | null): value is Language {
  return value !== null && value !== undefined && LANGUAGES.includes(value as Language);
}

export function isAllowedSectionPath(path?: string | null): path is SectionPath {
  return path !== null && path !== undefined && SECTION_PATHS.includes(path as SectionPath);
}

export function normalizeSectionPath(path?: string | null): SectionPath {
  const trimmed = trimPath(path);
  if (isAllowedSectionPath(trimmed)) return trimmed;
  return "/about";
}

export function parseLocalizedPath(path?: string | null): ParsedLocalizedPath {
  const trimmed = trimPath(path);
  const chunks = trimmed.split("/").filter(Boolean);
  const [firstChunk, secondChunk] = chunks;

  if (firstChunk && isSupportedLanguage(firstChunk)) {
    const sectionPath = secondChunk ? `/${secondChunk}` : "/about";
    return {
      hasLocale: true,
      language: firstChunk,
      sectionPath,
      isSectionValid: isAllowedSectionPath(sectionPath),
    };
  }

  return {
    hasLocale: false,
    language: null,
    sectionPath: trimmed,
    isSectionValid: isAllowedSectionPath(trimmed),
  };
}

export function buildLocalizedPath(
  language?: string | null,
  sectionPath?: string | null
): LocalizedPath {
  const normalizedLanguage = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;
  const normalizedSectionPath = normalizeSectionPath(sectionPath);
  return `/${normalizedLanguage}${normalizedSectionPath}` as LocalizedPath;
}

export function getLegacyHashPath(): SectionPath | null {
  if (typeof window === "undefined") return null;
  const { hash } = window.location;
  if (!hash || !hash.startsWith("#/")) return null;
  const candidate = trimPath(hash.slice(1));
  return isAllowedSectionPath(candidate) ? candidate : null;
}
