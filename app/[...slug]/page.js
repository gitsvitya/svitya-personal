import { redirect } from "next/navigation";
import { getPreferredLanguage } from "../redirectByLocale";

// Перехватывает неизвестные маршруты и отправляет пользователя в локализованный раздел "about".
export default async function UnknownPage() {
  const language = await getPreferredLanguage();
  redirect(`/${language}/about`);
}
