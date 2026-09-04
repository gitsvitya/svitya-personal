import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function LegacyWorkPage() {
  await redirectToPreferredSection("work");
}
