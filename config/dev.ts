import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import consola from "consola";
import { watch } from "rollup";

import type { InputOptions, OutputOptions } from "rollup";

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
  },
  {
    ...popupInput,
    output: [popupOutput],
  },
]);

function match<T extends string>(
  event: T,
  matchCallback: Partial<{ [Key in T]: () => void }>
): void {
  matchCallback[event]?.();
}

watcher.on("event", (event) => {
  match(event.code, {
    START() {
      consola.start("Start watching...");
    },
    END() {
      consola.log("End!");
    },
    BUNDLE_START() {
      consola.start("Build start...");
    },
    BUNDLE_END() {
      consola.log("Build end!");
    },
    ERROR() {
      consola.error("Ops, There are some error!");
    },
  });
});
