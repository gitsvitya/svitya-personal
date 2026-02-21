import App from "../../src/components/App/App";

export const metadata = {
  title: "Активности | Виктор Строков",
  description: "Дополнительные активности, инициативы и профессиональные интересы Виктора Строкова.",
};

export default function ActivitiesPage() {
  return <App initialPath="/activities" />;
}
