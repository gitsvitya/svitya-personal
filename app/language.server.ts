import { cookies, headers } from "next/headers";
import { resolveLanguage, resolveLanguageFromHeader } from "./sections";
import type { Language } from "../src/types/domain";

// Определяет язык на сервере: сначала cookie, затем Accept-Language.
export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("lang")?.value;
  if (cookieLanguage) return resolveLanguage(cookieLanguage);

  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  return resolveLanguageFromHeader(acceptLanguage);
}
