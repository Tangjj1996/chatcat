import { defineConfig } from "rollup";

export default defineConfig([
  {
    input: ["./src/background/main.ts"],
    output: {
      dir: "dist",
    },
  },
]);
