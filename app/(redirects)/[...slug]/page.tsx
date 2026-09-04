import { redirectToPreferredSection } from "@/app/route-helpers";

export default async function UnknownPage() {
  await redirectToPreferredSection("about");
}
