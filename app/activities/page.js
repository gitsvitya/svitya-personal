import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

// Поддерживает legacy-адрес "/activities" через редирект на локализованный путь.
export default async function LegacyActivitiesPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/activities`);
}
