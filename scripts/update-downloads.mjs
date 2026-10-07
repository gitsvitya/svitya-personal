import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifestPath = resolve(root, "src/content/downloads.json");
const files = JSON.parse(await readFile(manifestPath, "utf8"));

for (const [publicPath, file] of Object.entries(files)) {
  const path = resolve(root, `public${publicPath}`);
  file.sizeBytes = (await stat(path)).size;
  if (file.sha256) {
    file.sha256 = createHash("sha256")
      .update(await readFile(path))
      .digest("hex");
  }
}

await writeFile(manifestPath, `${JSON.stringify(files, null, 2)}\n`);
console.log(`Updated sizes for ${Object.keys(files).length} downloadable files.`);
