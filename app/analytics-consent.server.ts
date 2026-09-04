import { cookies } from "next/headers";
import {
  ANALYTICS_CONSENT_COOKIE_NAME,
  isAnalyticsConsent,
  type AnalyticsConsent,
} from "@/src/utils/analyticsConsent";

export async function getServerAnalyticsConsent(): Promise<AnalyticsConsent> {
  const cookieStore = await cookies();
  const consent = cookieStore.get(ANALYTICS_CONSENT_COOKIE_NAME)?.value;
  return isAnalyticsConsent(consent) ? consent : null;
}
