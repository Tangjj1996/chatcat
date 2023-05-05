import consola from "consola";
import type { Plugin } from "rollup";

interface CopyOption {}

export function copy(options?: CopyOption): Plugin {
  return {
    name: "copy",
    buildEnd() {
      for (const iter of this.getModuleIds()) {
        consola.log(this.getModuleInfo(iter)?.code);
      }
    },
  };
}

export default copy;
