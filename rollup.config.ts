import path from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";

import type { RollupOptions } from "rollup";

const isProd = process.env.NODE_ENV === "production";

const background: RollupOptions[] = [
  {
    input: ["./src/background/main.ts"],
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
];

const popup: RollupOptions[] = [
  {
    input: ["./src/popup/main.ts"],
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
];

const other: RollupOptions[] = [
  {
    input: glob.sync("src/**/*.js").map((file) => path.relative("src", file)),
    output: {
      dir: "dist",
    },
    plugins: [],
  },
];

export default defineConfig([...background, ...popup, ...other]);
