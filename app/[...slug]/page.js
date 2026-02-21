import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

export default async function UnknownPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/about`);
}
