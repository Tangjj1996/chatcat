import fs from "fs-extra";
import { globby } from "globby";

export async function copyStaticDir() {
  const result = await globby("src/**/*", {
    ignore: ["src/background/**/*", "src/popup/**/*"],
  });
  for (const item of result) {
    await fs.copy(item, item.replace("src", "dist"));
  }
}
