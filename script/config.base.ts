import "dotenv/config";
import postcssplugin from "esbuild-style-plugin";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

import type { BuildOptions } from "esbuild";

import { OUTPUT_DIR } from "./const";
import wasmPlugin from "./plugin/wasm-plugin";

export default {
  entryPoints: [
    "src/background/index.ts",
    "src/content/index.ts",
    "src/content/insert-dom.ts",
    "src/popup/index.tsx",
  ],
  bundle: true,
  outdir: OUTPUT_DIR,
  treeShaking: true,
  minify: true,
  define: {
    OPENAI_API_KEY: JSON.stringify(process.env.OPENAI_API_KEY!),
  },
  loader: {
    ".png": "dataurl",
  },
  plugins: [
    wasmPlugin,
    postcssplugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
} satisfies BuildOptions;
