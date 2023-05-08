import esbuild from "esbuild";
import fs from "fs-extra";
import consola from "consola";
import postcssplugin from "esbuild-style-plugin";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import * as dotenv from "dotenv";

import { OUTPUT_DIR } from "./const";

dotenv.config();

async function removeOldDir() {
  await fs.remove(OUTPUT_DIR);
  consola.success("Remove old Direction successfully");
}

async function runEsbuild() {
  await esbuild.build({
    entryPoints: ["src/background/index.tsx", "src/popup/index.tsx"],
    bundle: true,
    outdir: OUTPUT_DIR,
    treeShaking: true,
    minify: true,
    define: {
      ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN!),
    },
    loader: {
      ".png": "dataurl",
    },
    plugins: [
      postcssplugin({
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      }),
    ],
  });
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

  consola.success("All steps success, nice!");
}

await build().catch((error) => {
  consola.error("Oops, there are some errors: ", error);
});
