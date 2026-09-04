import { describe, expect, it } from "vitest";
import { shouldHandleClientNavigation } from "./navigation";

const PLAIN_LEFT_CLICK = {
  defaultPrevented: false,
  button: 0,
  metaKey: false,
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
};

describe("client navigation click handling", () => {
  it("handles only an unmodified left click", () => {
    expect(shouldHandleClientNavigation(PLAIN_LEFT_CLICK)).toBe(true);
  });

  it.each([
    { defaultPrevented: true },
    { button: 1 },
    { metaKey: true },
    { ctrlKey: true },
    { shiftKey: true },
    { altKey: true },
  ])("preserves native browser behavior for %o", (override) => {
    expect(shouldHandleClientNavigation({ ...PLAIN_LEFT_CLICK, ...override })).toBe(false);
  });
});
