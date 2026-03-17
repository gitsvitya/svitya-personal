import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

// Поддерживает legacy-адрес "/about" через редирект на локализованный путь.
export default async function LegacyAboutPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/about`);
}
