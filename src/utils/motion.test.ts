import { afterEach, describe, expect, it, vi } from "vitest";
import { getTransitionDuration, parseCssDuration } from "./motion";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CSS transition duration", () => {
  it("converts milliseconds and seconds to milliseconds", () => {
    expect(parseCssDuration("350ms")).toBe(350);
    expect(parseCssDuration("0.5s")).toBe(500);
  });

  it("returns zero for an invalid duration", () => {
    expect(parseCssDuration("")).toBe(0);
    expect(parseCssDuration("fast")).toBe(0);
  });

  it("reads the shared duration from CSS", () => {
    const getPropertyValue = vi.fn(() => "350ms");
    vi.stubGlobal("document", { documentElement: {} });
    vi.stubGlobal("window", {
      matchMedia: () => ({ matches: false }),
      getComputedStyle: () => ({ getPropertyValue }),
    });

    expect(getTransitionDuration("fast")).toBe(350);
    expect(getPropertyValue).toHaveBeenCalledWith("--transition-fast-duration");
  });

  it("removes JavaScript delays when reduced motion is requested", () => {
    const getComputedStyle = vi.fn();
    vi.stubGlobal("window", {
      matchMedia: () => ({ matches: true }),
      getComputedStyle,
    });

    expect(getTransitionDuration("slow")).toBe(0);
    expect(getComputedStyle).not.toHaveBeenCalled();
  });
});
