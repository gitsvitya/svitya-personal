import { headers } from "next/headers";
import { resolveLanguageFromHeader } from "./sections";
import type { Language } from "../src/types/domain";

// Определяет предпочтительный язык по заголовку браузера.
export async function getPreferredLanguage(): Promise<Language> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  return resolveLanguageFromHeader(acceptLanguage);
}
