import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import consola from "consola";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { watch } from "rollup";
import { globbySync } from "globby";

import type { InputOptions, OutputOptions } from "rollup";

import { copyStaticDir } from "./util";

const backgroundInput: InputOptions = {
  input: "./src/background/index.tsx",
  plugins: [
    nodeResolve(), // find in node_modules
    commonjs(), // convert to esModule
    typescript(),
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
  ],
};

const popupOutput: OutputOptions = {
  dir: "dist/popup",
};

const watcher = watch([
  {
    ...backgroundInput,
    output: [backgroundOutput],
    watch: {
      include: globbySync("src/**/*", {
        ignore: ["src/background/**/*", "src/popup/**/*"],
      }),
    },
  },
  {
    ...popupInput,
    output: [popupOutput],
  },
]);

watcher.on("event", (event) => {
  switch (event.code) {
    case "START":
      consola.start("Start watching...");
      break;
    case "END":
      consola.log("End!");
      break;
    case "BUNDLE_START":
      consola.start("Build start...");
      break;
    case "BUNDLE_END":
      consola.log(`Build end! duraciton: ${event.duration}`);
      copyStaticDir()
        .then(() => {
          consola.log("Static copied!");
        })
        .catch(() => {});
      break;
    case "ERROR":
      consola.error(`Ops, There are some error!\n${event.error}`);
      break;
    default:
      break;
  }
});
