import { cookies, headers } from "next/headers";
import { resolveLanguage, resolveLanguageFromHeader } from "./sections";

export async function getServerLanguage() {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("lang")?.value;
  if (cookieLanguage) return resolveLanguage(cookieLanguage);

  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  return resolveLanguageFromHeader(acceptLanguage);
}
