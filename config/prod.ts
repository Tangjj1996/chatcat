import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import consola from "consola";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";

import type { InputOptions, OutputOptions } from "rollup";

import { copyStaticDir } from "./util";

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

async function run() {
  let buildFailed = false;
  consola.start("Start bundle input...");
  const inputBundle = await Promise.all([
    rollup(backgroundInput),
    rollup(popupInput),
  ]).catch((error) => {
    buildFailed = true;
    consola.error(error);
  });
  if (inputBundle) {
    const [backgroundBundle, popupBundle] = inputBundle;
    await Promise.all([
      backgroundBundle.write(backgroundOutput),
      popupBundle.write(popupOutput),
    ]).catch((error) => {
      buildFailed = true;
      consola.error(error);
    });
    await Promise.all([backgroundBundle.close(), popupBundle.close()]).catch(
      (error) => {
        buildFailed = true;
        consola.error(error);
      }
    );
  }
  await copyStaticDir().catch((error) => {
    buildFailed = true;
    consola.error(error);
  });
  if (!buildFailed) {
    consola.success("Project built!");
  } else {
    consola.error("Project Failed😓");
  }
  process.exitCode = buildFailed ? 1 : 0;
}

await run();
