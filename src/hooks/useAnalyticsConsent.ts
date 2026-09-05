import { useSyncExternalStore } from "react";
import {
  getBrowserAnalyticsConsent,
  subscribeToAnalyticsConsent,
  type AnalyticsConsent,
} from "../utils/analyticsConsent";

export function useAnalyticsConsent(): AnalyticsConsent {
  return useSyncExternalStore(subscribeToAnalyticsConsent, getBrowserAnalyticsConsent, () => null);
}
