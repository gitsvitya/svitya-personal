import { describe, expect, it } from "vitest";
import {
  buildLocalizedDetailPath,
  buildLocalizedPath,
  normalizeSectionPath,
  parseLocalizedPath,
  trimPath,
} from "./routing";

describe("localized routing", () => {
  it("normalizes empty and trailing paths", () => {
    expect(trimPath()).toBe("/");
    expect(trimPath("/ru/work/")).toBe("/ru/work");
    expect(normalizeSectionPath("/unknown")).toBe("/about");
  });

  it("parses localized detail routes", () => {
    expect(parseLocalizedPath("/ru/work/cheminsight")).toEqual({
      hasLocale: true,
      language: "ru",
      sectionPath: "/work",
      detailSlug: "cheminsight",
      isSectionValid: true,
    });
  });

  it("builds section and detail routes with safe fallbacks", () => {
    expect(buildLocalizedPath("ru", "/projects")).toBe("/ru/projects");
    expect(buildLocalizedPath("unknown", "/unknown")).toBe("/en/about");
    expect(buildLocalizedDetailPath("en", "/activities", "strokeoff")).toBe(
      "/en/activities/strokeoff"
    );
  });
});
