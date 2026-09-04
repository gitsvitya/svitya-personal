import type { MouseEvent } from "react";

type NavigationMouseEvent = Pick<
  MouseEvent<HTMLAnchorElement>,
  "altKey" | "button" | "ctrlKey" | "defaultPrevented" | "metaKey" | "shiftKey"
>;

export function shouldHandleClientNavigation(event: NavigationMouseEvent): boolean {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}
