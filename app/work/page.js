import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

// Поддерживает legacy-адрес "/work" через редирект на локализованный путь.
export default async function LegacyWorkPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/work`);
}
