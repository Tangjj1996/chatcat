import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig, watch } from "rollup";

const isProd = process.env.NODE_ENV === "production";

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
      isProd && terser(),
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
      isProd && terser(),
    ],
  },
]);

watch(config);
