import { useEffect, useSyncExternalStore } from "react";
import {
  initializeCookieNotice,
  isCookieNoticeClosed,
  subscribeToCookieNotice,
} from "../utils/cookieNotice";

export function useCookieNotice(): boolean {
  const isClosed = useSyncExternalStore(subscribeToCookieNotice, isCookieNoticeClosed, () => false);
  useEffect(initializeCookieNotice, []);
  return isClosed;
}
