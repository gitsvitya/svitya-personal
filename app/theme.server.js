import { cookies } from "next/headers";

const ALLOWED_THEMES = ["light", "dark"];

export async function getServerTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;

  if (ALLOWED_THEMES.includes(theme)) return theme;
  return "light";
}
