import App from "../../src/components/App/App";

export const metadata = {
  title: "Опыт работы | Виктор Строков",
  description: "Опыт работы Виктора Строкова: роли, компании, задачи и результаты.",
};

export default function WorkPage() {
  return <App initialPath="/work" />;
}
