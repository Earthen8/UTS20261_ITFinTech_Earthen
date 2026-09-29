import type { NextConfig } from "next";

import path from "path";
import fs from "fs";

// Fallback: If .env.local exists in parent directory, auto-load it
const parentEnv = path.resolve(process.cwd(), "../.env.local");
if (fs.existsSync(parentEnv)) {
  const content = fs.readFileSync(parentEnv, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...val] = trimmed.split("=");
      const k = key.trim();
      if (!process.env[k]) {
        process.env[k] = val.join("=").trim();
      }
    }
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
