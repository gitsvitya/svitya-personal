import { headers } from "next/headers";
import { resolveLanguageFromHeader } from "./sections";
import type { Language } from "../src/types/domain";

// Этот helper нужен для legacy-маршрутов без явного префикса языка,
// чтобы редиректить пользователя в наиболее подходящую локаль.
export async function getPreferredLanguage(): Promise<Language> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  return resolveLanguageFromHeader(acceptLanguage);
}
