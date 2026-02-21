import { redirect } from "next/navigation";
import { getPreferredLanguage } from "./redirectByLocale";

export default async function HomePage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/about`);
}
