import { cookies } from "next/headers";
import { THEMES, type Theme } from "../src/types/domain";

// Определяет тему на сервере по cookie с fallback на светлую тему.
export async function getServerTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  if (THEMES.includes(theme as Theme)) return theme as Theme;
  return "light";
}
