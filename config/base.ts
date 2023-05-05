import path from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import { copy } from "./plugin/copy-plugin";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig([
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
  {
    input: glob
      .sync("src/**/*")
      .filter((file) => !/background|popup/.test(file))
      .map((file) => path.relative("src", file)),
    output: {
      dir: "dist",
    },
    plugins: [copy()],
  },
]);
