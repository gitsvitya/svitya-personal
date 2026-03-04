import { cookies } from "next/headers";

// Разрешенные значения темы, которые можно принять из cookie.
const ALLOWED_THEMES = ["light", "dark"];

// Определяет тему на сервере по cookie с fallback на светлую тему.
export async function getServerTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  if (ALLOWED_THEMES.includes(theme)) return theme;
  return "light";
}
