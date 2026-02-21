import App from "../../src/components/App/App";

export const metadata = {
  title: "Проекты | Виктор Строков",
  description: "Личные и профессиональные проекты Виктора Строкова.",
};

export default function ProjectsPage() {
  return <App initialPath="/projects" />;
}
