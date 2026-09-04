import { describe, expect, it } from "vitest";
import { parseCssDuration } from "./motion";

describe("CSS transition duration", () => {
  it("converts milliseconds and seconds to milliseconds", () => {
    expect(parseCssDuration("350ms")).toBe(350);
    expect(parseCssDuration("0.5s")).toBe(500);
  });

  it("returns zero for an invalid duration", () => {
    expect(parseCssDuration("")).toBe(0);
    expect(parseCssDuration("fast")).toBe(0);
  });
});
