import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  agentRules: false,
  output: "standalone",
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
