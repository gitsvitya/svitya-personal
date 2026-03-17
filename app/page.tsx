import { redirect } from "next/navigation";
import { getPreferredLanguage } from "./redirectByLocale";

// Редиректит с корня сайта на локализованный раздел "about".
export default async function HomePage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/about`);
}
