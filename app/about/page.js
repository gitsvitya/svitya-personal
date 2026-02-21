import App from "../../src/components/App/App";

export const metadata = {
  title: "Обо мне | Виктор Строков",
  description: "Профессиональный профиль Виктора Строкова: экспертиза, бэкграунд и ключевые компетенции.",
};

export default function AboutPage() {
  return <App initialPath="/about" />;
}
