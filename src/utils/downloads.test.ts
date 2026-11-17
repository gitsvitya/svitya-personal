import { describe, expect, it } from "vitest";
import { getDownloadFile } from "./downloads";

describe("download files", () => {
  it("fails explicitly for an unregistered download instead of showing a broken link", () => {
    expect(() => getDownloadFile("/materials/missing.pdf")).toThrow("Missing download file");
  });
});
