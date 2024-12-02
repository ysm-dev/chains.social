import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/main.ts", "src/utils/**", "src/lib/**"],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
