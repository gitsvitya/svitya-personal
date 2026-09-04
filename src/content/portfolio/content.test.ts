import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COMPANY_IDS, LANGUAGES } from "../../types/domain";
import { COMPANIES } from "./registry";

const PUBLIC_DIRECTORY = join(process.cwd(), "public");

function resolvePublicAsset(publicPath: string): string {
  expect(publicPath.startsWith("/"), `${publicPath} must be an absolute public path`).toBe(true);

  let currentPath = PUBLIC_DIRECTORY;
  for (const segment of publicPath.split("/").filter(Boolean)) {
    const exactEntry = readdirSync(currentPath).find((entry) => entry === segment);
    expect(exactEntry, `Missing public asset or filename case mismatch: ${publicPath}`).toBe(
      segment
    );
    currentPath = join(currentPath, segment);
  }

  expect(statSync(currentPath).isFile(), `${publicPath} must point to a file`).toBe(true);
  return currentPath;
}

function expectExternalUrl(value: string): void {
  const url = new URL(value);
  expect(["http:", "https:"]).toContain(url.protocol);
}

describe("portfolio content", () => {
  it("contains every declared company exactly once", () => {
    expect(Object.keys(COMPANIES).sort()).toEqual([...COMPANY_IDS].sort());

    const routes = Object.values(COMPANIES).map((company) => `${company.section}/${company.slug}`);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it("has complete localized copy", () => {
    for (const company of Object.values(COMPANIES)) {
      expect(company.id).toBeTruthy();
      expect(company.slug).toMatch(/^[a-z0-9]+$/);
      expect(company.logo).toBeTruthy();

      for (const language of LANGUAGES) {
        const copy = company.translations[language];
        for (const value of Object.values(copy)) {
          expect(value.trim()).not.toBe("");
        }
      }

      if (company.url) {
        expectExternalUrl(company.url);
        expect(company.linkLabel?.trim()).not.toBe("");
      }
    }
  });

  it("validates every material according to its type", () => {
    for (const company of Object.values(COMPANIES)) {
      if (!company.materials) continue;
      if (company.materials.enabled) expect(company.materials.items.length).toBeGreaterThan(0);

      for (const material of company.materials.items) {
        expect(material.previewSrc).toBeTruthy();

        for (const language of LANGUAGES) {
          expect(material.title[language].trim()).not.toBe("");
          expect(material.description[language].trim()).not.toBe("");
        }

        switch (material.type) {
          case "document":
            resolvePublicAsset(material.fileSrc);
            break;
          case "image":
            resolvePublicAsset(material.fullImageSrc);
            break;
          case "link":
            expectExternalUrl(material.url);
            break;
        }
      }
    }
  });
});
