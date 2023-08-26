import { defineConfig } from "vitest/dist/config";

export default defineConfig({
  test: {
    dir: "__tests__",
    globals: true,
    coverage: {
      provider: "istanbul",
    },
  },
});
