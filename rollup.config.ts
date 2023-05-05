import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig([
  {
    input: ["./src/background/main.ts"],
    output: {
      dir: "dist/background",
    },
    plugins: [
      nodeResolve(), // find in node_modules
      commonjs(), // convert to esModule
      html(),
      typescript(),
      isProd && terser(),
    ],
  },
  {
    input: ["./src/popup/main.ts"],
    output: {
      dir: "dist/popup",
    },
  },
  {
    input: ["./src/manifest.json"],
    output: {
      dir: "dist",
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
