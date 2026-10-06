import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import downloadNames from "./src/content/downloads.json" with { type: "json" };

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  agentRules: false,
  output: "standalone",
  outputFileTracingRoot: projectRoot,
  experimental: { globalNotFound: true },
  async headers() {
    return Object.entries(downloadNames).map(([source, filename]) => ({
      source: encodeURI(source),
      headers: [
        {
          key: "Content-Disposition",
          value: `inline; filename*=UTF-8''${encodeURIComponent(filename)}`,
        },
      ],
    }));
  },
};

export default nextConfig;
