import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

// Конфигурация Next.js для сборки standalone-артефакта.
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
