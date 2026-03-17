import { cookies } from "next/headers";
import { THEMES, type Theme } from "../src/types/domain";

// На сервере тема читается из cookie, чтобы первая HTML-версия страницы
// сразу пришла с корректной цветовой схемой и без лишнего мерцания.
export async function getServerTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  // Если cookie повреждена или в ней неожиданное значение, приложение
  // безопасно возвращается к светлой теме по умолчанию.
  if (THEMES.includes(theme as Theme)) return theme as Theme;
  return "light";
}
