import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

export default async function LegacyProjectsPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/projects`);
}
