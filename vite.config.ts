import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { computeSiteVersion } from "./siteVersion";

const siteVersion = computeSiteVersion();
process.env.VITE_SITE_VERSION = String(siteVersion);

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
