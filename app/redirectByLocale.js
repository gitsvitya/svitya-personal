import { headers } from "next/headers";
import { resolveLanguageFromHeader } from "./sections";

export async function getPreferredLanguage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  return resolveLanguageFromHeader(acceptLanguage);
}
