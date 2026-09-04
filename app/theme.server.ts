import { cookies } from "next/headers";
import { THEMES, type Theme } from "../src/types/domain";

export async function getServerTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  return THEMES.includes(theme as Theme) ? (theme as Theme) : "light";
}
