import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  SECTION_PATHS,
  type Language,
  type LocalizedPath,
  type SectionPath,
} from "../types/domain";

// После разбора pathname удобно хранить отдельно факт наличия локали,
// распознанный язык и валидность секции для дальнейших редиректов.
type ParsedLocalizedPath = {
  hasLocale: boolean;
  language: Language | null;
  sectionPath: string;
  isSectionValid: boolean;
};

// Нормализуем слеши на входе, чтобы остальная логика маршрутизации
// работала с единым форматом путей без хвостового "/".
export function trimPath(path?: string | null): string {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// Type guard для языковых сегментов используется на клиенте при разборе pathname.
export function isSupportedLanguage(value?: string | null): value is Language {
  return value !== null && value !== undefined && LANGUAGES.includes(value as Language);
}

// Допустимыми считаются только разделы, которые реально умеет показать приложение.
export function isAllowedSectionPath(path?: string | null): path is SectionPath {
  return path !== null && path !== undefined && SECTION_PATHS.includes(path as SectionPath);
}

// Любой нераспознанный путь сводим к "/about", чтобы все fallback-переходы
// приводили к предсказуемой стартовой секции сайта.
export function normalizeSectionPath(path?: string | null): SectionPath {
  const trimmed = trimPath(path);
  if (isAllowedSectionPath(trimmed)) return trimmed;
  return "/about";
}

// Разбор локализованного pathname нужен для клиентской навигации:
// из URL извлекаются локаль, текущий раздел и признак валидности секции.
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

// Сборщик локализованного пути гарантирует корректный URL даже тогда,
// когда в него случайно попадают сырые или непроверенные значения.
export function buildLocalizedPath(
  language?: string | null,
  sectionPath?: string | null
): LocalizedPath {
  const normalizedLanguage = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;
  const normalizedSectionPath = normalizeSectionPath(sectionPath);
  return `/${normalizedLanguage}${normalizedSectionPath}` as LocalizedPath;
}

// Поддержка legacy hash-навигации нужна для старых внешних ссылок
// вида "#/about", которые могли сохраниться у пользователей.
export function getLegacyHashPath(): SectionPath | null {
  if (typeof window === "undefined") return null;
  const { hash } = window.location;
  if (!hash || !hash.startsWith("#/")) return null;
  const candidate = trimPath(hash.slice(1));
  return isAllowedSectionPath(candidate) ? candidate : null;
}
