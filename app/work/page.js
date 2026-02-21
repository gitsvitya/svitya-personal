import App from "../../src/components/App/App";
import { buildPageMetadata } from "../seo";

export const metadata = buildPageMetadata({
  title: "Опыт работы | Виктор Строков",
  description: "Опыт работы Виктора Строкова: роли, компании, задачи и результаты.",
  path: "/work",
});

export default function WorkPage() {
  return <App initialPath="/work" />;
}
