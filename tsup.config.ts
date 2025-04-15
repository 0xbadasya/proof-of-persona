import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/cli/index.ts"],
    outDir: "dist/cli",
    format: ["cjs"],
    splitting: false,
    clean: true,
    dts: false,
    target: "node18"
  });
  