import path from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import consola from "consola";
import { glob } from "glob";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";

import type { InputOptions, OutputOptions } from "rollup";

import { copy } from "./plugin/copy-plugin";

const backgroundInput: InputOptions = {
  input: "./src/background/index.tsx",
  plugins: [
    nodeResolve(), // find in node_modules
    commonjs(), // convert to esModule
    typescript(),
    terser(),
  ],
};

const backgroundOutput: OutputOptions = {
  dir: "dist/background",
};

const popupInput: InputOptions = {
  input: "./src/popup/index.tsx",
  plugins: [
    nodeResolve(), // find in node_modules
    commonjs(), // convert to esModule
    html(),
    typescript(),
    terser(),
  ],
};

const popupOutput: OutputOptions = {
  dir: "dist/popup",
};

const otherInput: InputOptions = {
  input: glob
    .sync("src/**/*")
    .filter((file) => !/background|popup/.test(file))
    .map((file) => path.relative("src", file)),
  plugins: [copy()],
};

const otherOutput: OutputOptions = {
  dir: "dist",
};

async function run() {
  let buildFailed = false;
  const inputBundle = await Promise.all([
    rollup(backgroundInput),
    rollup(popupInput),
    rollup(otherInput),
  ]).catch((error) => {
    buildFailed = true;
    consola.error(error);
  });
  if (inputBundle) {
    const [backgroundBundle, popupBundle, otherBundle] = inputBundle;
    await Promise.all([
      backgroundBundle.write(backgroundOutput),
      popupBundle.write(popupOutput),
      otherBundle.write(otherOutput),
    ]).catch((error) => {
      buildFailed = true;
      consola.error(error);
    });
    backgroundBundle.close();
    popupBundle.close();
    otherBundle.close();
  }
  process.exitCode = buildFailed ? 1 : 0;
}

await run();
