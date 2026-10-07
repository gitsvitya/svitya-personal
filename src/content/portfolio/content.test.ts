import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { COMPANY_IDS, LANGUAGES } from "../../types/domain";
import { COMPANIES, getLocalizedCompany } from "./registry";
import { CASE_STUDIES } from "./case-studies";
import downloadNames from "../downloads.json";
import { getDownloadFile, getDownloadFilename } from "../../utils/downloads";

const PUBLIC_DIRECTORY = join(process.cwd(), "public");

function getTrackedFiles(): Set<string> | null {
  try {
    return new Set(
      execFileSync("git", ["ls-files", "-z"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      })
        .split("\0")
        .filter(Boolean)
    );
  } catch {
    return null;
  }
}

const TRACKED_FILES = getTrackedFiles();

function resolvePublicAsset(publicPath: string): string {
  expect(publicPath.startsWith("/"), `${publicPath} must be an absolute public path`).toBe(true);
  if (TRACKED_FILES) {
    expect(
      TRACKED_FILES.has(`public${publicPath}`),
      `${publicPath} must match the exact filename casing stored in Git`
    ).toBe(true);
  }

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
  it("provides complete case studies in both languages for existing companies", () => {
    for (const [id, translations] of Object.entries(CASE_STUDIES)) {
      expect(COMPANY_IDS).toContain(id);
      for (const language of LANGUAGES) {
        const study = translations[language];
        expect(study.challenge.trim()).not.toBe("");
        expect(study.outcome.trim()).not.toBe("");
        expect(study.contribution.length).toBeGreaterThan(0);
        for (const item of study.contribution) expect(item.trim()).not.toBe("");
      }
    }
  });

  it("keeps tracked asset casing identical to the working tree", () => {
    if (!TRACKED_FILES) return;

    for (const trackedPath of TRACKED_FILES) {
      if (!trackedPath.startsWith("public/") && !trackedPath.startsWith("src/images/")) continue;

      let currentPath = process.cwd();
      for (const segment of trackedPath.split("/")) {
        const exactEntry = readdirSync(currentPath).find((entry) => entry === segment);
        expect(exactEntry, `Git casing differs from the working tree: ${trackedPath}`).toBe(
          segment
        );
        currentPath = join(currentPath, segment);
      }
    }
  });

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
        const { resultsList, ...copy } = company.translations[language];
        for (const value of Object.values(copy)) {
          expect(value.trim()).not.toBe("");
        }
        if (resultsList) {
          expect(resultsList.intro.trim()).not.toBe("");
          expect(resultsList.items.length).toBeGreaterThan(0);
          for (const item of resultsList.items) expect(item.trim()).not.toBe("");
        }
      }

      if (company.url) {
        expectExternalUrl(company.url);
        expect(company.linkLabel?.trim()).not.toBe("");
      }
    }
  });

  it("validates every material type in both languages and exact public asset filename casing", () => {
    for (const company of Object.values(COMPANIES)) {
      if (!company.materials) continue;
      if (company.materials.enabled) expect(company.materials.items.length).toBeGreaterThan(0);

      for (const material of company.materials.items) {
        for (const language of LANGUAGES) {
          expect(material.title[language].trim()).not.toBe("");
          expect(material.description[language].trim()).not.toBe("");
          const assets = material.assets[language];
          expect(assets.previewSrc).toBeTruthy();
          expect(assets.fullImageSrc).toBeTruthy();
          // Vite exposes imported images as /src/images URLs instead of StaticImageData.
          if (
            typeof assets.fullImageSrc === "string" &&
            !assets.fullImageSrc.startsWith("/src/images/")
          ) {
            resolvePublicAsset(assets.fullImageSrc);
          }

          switch (material.type) {
            case "document": {
              const document = material.assets[language];
              resolvePublicAsset(document.fileSrc);
              expect(getDownloadFilename(document.fileSrc)).toBeTruthy();
              if (document.url) expectExternalUrl(document.url);
              break;
            }
            case "link":
              expectExternalUrl(material.assets[language].url);
              break;
          }
        }
      }
    }
  });

  it("gives every downloadable file a unique Cyrillic name using the same convention", () => {
    const publicDocuments = readdirSync(PUBLIC_DIRECTORY, { recursive: true, encoding: "utf8" })
      .filter((path) => /\.(pdf|docx)$/.test(path))
      .map((path) => `/${path}`);
    expect(Object.keys(downloadNames).sort()).toEqual(publicDocuments.sort());
    expect(new Set(Object.values(downloadNames).map((file) => file.filename)).size).toBe(
      publicDocuments.length
    );
    for (const [path, { filename, sizeBytes }] of Object.entries(downloadNames)) {
      expect(filename).toMatch(
        /^[А-Яа-яЁё0-9 .-]+ - [А-Яа-яЁё0-9 .-]+ - (Русский|Английский)( - Оригинал)?\.(pdf|docx)$/
      );
      expect(filename.split(".").at(-1)).toBe(path.split(".").at(-1));
      expect(Buffer.byteLength(filename, "utf8")).toBeLessThanOrEqual(255);
      expect(sizeBytes).toBeGreaterThan(0);
      expect(sizeBytes, `${path} must have an up-to-date download size`).toBe(
        statSync(join(PUBLIC_DIRECTORY, path)).size
      );
    }
  });

  it("keeps smaller download copies paired with byte-for-byte preserved originals", () => {
    const optimizedFiles = Object.keys(downloadNames).filter(
      (path) => getDownloadFile(path).originalSrc
    );
    expect(optimizedFiles.length).toBeGreaterThan(0);
    for (const path of optimizedFiles) {
      const file = getDownloadFile(path);
      const originalPath = file.originalSrc!;
      const original = getDownloadFile(originalPath);
      expect(originalPath).toBe(`/materials/originals${path.slice("/materials".length)}`);
      expect(original.originalSrc).toBeUndefined();
      expect(file.sizeBytes).toBeLessThan(original.sizeBytes);
      expect(original.filename).toBe(file.filename.replace(/\.pdf$/, " - Оригинал.pdf"));
      expect(
        createHash("sha256")
          .update(readFileSync(resolvePublicAsset(originalPath)))
          .digest("hex")
      ).toBe(original.sha256);
    }
  });

  it("keeps Mad Burglar Cat and MappNgo materials available without external site links", () => {
    for (const id of ["MBC", "MNG"] as const) {
      for (const language of LANGUAGES) {
        const company = getLocalizedCompany(id, language);
        expect(company.url).toBeUndefined();
        expect(company.linkLabel).toBeUndefined();
        for (const material of company.materials!.items) {
          expect(material.type).toBe("document");
          if (material.type === "document") expect(material.url).toBeUndefined();
        }
      }
    }
  });

  it("selects the matching language for the four consolidated MappNgo materials", () => {
    const russian = getLocalizedCompany("MNG", "ru").materials!.items;
    const english = getLocalizedCompany("MNG", "en").materials!.items;
    const expected = [
      ["final-test-screens.pdf", "final-test-screens-en.pdf", undefined, undefined],
      ["souvenir-sticker.pdf", "souvenir-sticker.pdf", undefined, undefined],
      ["homepage-ru.pdf", "homepage-en.pdf", undefined, undefined],
      ["faq-ru.pdf", "faq-en.pdf", undefined, undefined],
    ] as const;
    expect(russian).toHaveLength(4);
    expect(english).toHaveLength(4);

    for (const [index, [ruFile, enFile, ruUrl, enUrl]] of expected.entries()) {
      const ru = russian[index]!;
      const en = english[index]!;
      if (ru.type !== "document" || en.type !== "document") {
        throw new Error("MappNgo materials must remain downloadable documents");
      }
      expect(ru.fileSrc).toBe(`/materials/projects/mappngo/${ruFile}`);
      expect(en.fileSrc).toBe(`/materials/projects/mappngo/${enFile}`);
      expect(ru.url).toBe(ruUrl);
      expect(en.url).toBe(enUrl);
      if (index !== 1) {
        expect(ru.previewSrc).not.toEqual(en.previewSrc);
        expect(ru.fullImageSrc).not.toEqual(en.fullImageSrc);
      }
    }
    expect(russian.map((material) => material.title)).toEqual([
      "Тестовые экраны",
      "Шаблон наклеек",
      "Архивная главная страница",
      "Архивные вопросы и ответы",
    ]);
    expect(english.map((material) => material.title)).toEqual([
      "Test screens",
      "Sticker template",
      "Archived website homepage",
      "Archived questions and answers",
    ]);
  });
});
