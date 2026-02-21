import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

export default async function LegacyActivitiesPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/activities`);
}
