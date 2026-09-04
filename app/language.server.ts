import { cookies, headers } from "next/headers";
import type { Language } from "../src/types/domain";
import { isSupportedLanguage, resolveLanguageFromHeader } from "./sections";

export async function getServerLanguage(): Promise<Language> {
  const headersList = await headers();
  const routeLanguage = headersList.get("x-route-language");
  if (isSupportedLanguage(routeLanguage)) return routeLanguage;

  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("lang")?.value;
  if (isSupportedLanguage(cookieLanguage)) return cookieLanguage;

  return resolveLanguageFromHeader(headersList.get("accept-language"));
}
