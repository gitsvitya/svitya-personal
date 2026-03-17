import { cookies, headers } from "next/headers";
import { resolveLanguage, resolveLanguageFromHeader } from "./sections";
import type { Language } from "../src/types/domain";

// Сервер выбирает язык в том же порядке, что и пользователь ожидает:
// сначала явный сохраненный выбор, затем предпочтения браузера.
export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("lang")?.value;

  // Явный выбор пользователя имеет приоритет над браузерными настройками.
  if (cookieLanguage) return resolveLanguage(cookieLanguage);

  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  // Если cookie еще нет, используем заголовок браузера как стартовую подсказку.
  return resolveLanguageFromHeader(acceptLanguage);
}
