import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/main.ts", "src/utils/**", "src/lib/**"],
    },
    testTimeout: 60 * 1000,
    setupFiles: "dotenv/config",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
