import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig, watch } from "rollup";

const config = defineConfig([
  {
    input: ["./src/background/index.tsx"],
    output: {
      dir: "dist/background",
    },
    plugins: [
      nodeResolve(), // find in node_modules
      commonjs(), // convert to esModule
      typescript(),
    ],
  },
  {
    input: ["./src/popup/index.tsx"],
    output: {
      dir: "dist/popup",
    },
    plugins: [
      nodeResolve(), // find in node_modules
      commonjs(), // convert to esModule
      html(),
      typescript(),
    ],
  },
]);

watch(config);
