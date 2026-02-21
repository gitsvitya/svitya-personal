import App from "../../src/components/App/App";
import { buildPageMetadata } from "../seo";

export const metadata = buildPageMetadata({
  title: "Обо мне | Виктор Строков",
  description: "Профессиональный профиль Виктора Строкова: экспертиза, бэкграунд и ключевые компетенции.",
  path: "/about",
});

export default function AboutPage() {
  return <App initialPath="/about" />;
}
