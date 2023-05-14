import { atom } from "jotai";

interface BaseModelData {
  type: "human" | "ai" | "system";
  streaming: boolean;
  streamed: boolean;
  text: string;
}

export const clientAtom = atom<BaseModelData[]>([]);

export const serverAtom = atom<BaseModelData[]>([]);
