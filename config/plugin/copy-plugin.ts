import type { Plugin } from "rollup";

interface CopyOption {}

export function copy(option?: CopyOption): Plugin;
export function copy() {
  return { name: "copy" };
}

export default copy;
