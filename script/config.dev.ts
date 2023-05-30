import esbuild from "esbuild";
import fs from "fs-extra";
import consola from "consola";
import liveServer from "live-server";

import { OUTPUT_DIR } from "./const";
import config from "./config.base";

async function removeOldDir() {
  await fs.remove(OUTPUT_DIR);
  consola.success("Remove old Direction successfully");
}

async function runEsbuild() {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  consola.success("Esbuild bundle successfully");
}

interface EntryPoint {
  src: string;
  dest: string;
}

async function copyFiles(entryPoints: EntryPoint[]) {
  await fs.ensureDir(OUTPUT_DIR);
  await Promise.all(
    entryPoints.map(async (entryPoint) => {
      await fs.copy(entryPoint.src, `${OUTPUT_DIR}/${entryPoint.dest}`);
    })
  );
  consola.success("Copy files successfully");
}

async function build() {
  consola.start("Let's start, bro...");

  await removeOldDir();
  await runEsbuild();

  await copyFiles([
    { src: "src/manifest.json", dest: "manifest.json" },
    { src: "src/logo.png", dest: "logo.png" },
    { src: "src/popup/index.html", dest: "popup/index.html" },
  ]);

  liveServer.start({
    root: OUTPUT_DIR,
  });

  consola.success("All steps success, nice!");
}

await build().catch((error) => {
  consola.error("Oops! There are some errors\n", error);
});
