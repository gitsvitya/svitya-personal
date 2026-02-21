import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

export default async function LegacyWorkPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/work`);
}
