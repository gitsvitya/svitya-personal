import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

// Поддерживает legacy-адрес "/projects" через редирект на локализованный путь.
export default async function LegacyProjectsPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/projects`);
}
