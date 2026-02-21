import App from "../../src/components/App/App";
import { resolveLanguage } from "../sections";
import { getServerTheme } from "../theme.server";

export default async function LanguageLayout({ params }) {
  const initialLanguage = resolveLanguage(params?.lang);
  const initialTheme = await getServerTheme();

  return <App initialLanguage={initialLanguage} initialTheme={initialTheme} />;
}
