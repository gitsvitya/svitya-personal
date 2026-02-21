import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

export default async function LegacyAboutPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/about`);
}
