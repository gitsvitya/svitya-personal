import App from "../../src/components/App/App";
import { buildPageMetadata } from "../seo";

export const metadata = buildPageMetadata({
  title: "Проекты | Виктор Строков",
  description: "Личные и профессиональные проекты Виктора Строкова.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <App initialPath="/projects" />;
}
