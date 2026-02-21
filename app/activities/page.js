import App from "../../src/components/App/App";
import { buildPageMetadata } from "../seo";

export const metadata = buildPageMetadata({
  title: "Активности | Виктор Строков",
  description: "Дополнительные активности, инициативы и профессиональные интересы Виктора Строкова.",
  path: "/activities",
});

export default function ActivitiesPage() {
  return <App initialPath="/activities" />;
}
