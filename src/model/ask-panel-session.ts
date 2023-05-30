/**
 * 对话记录的所有数据
 */
import { atom } from "jotai";

interface BaseModelData {
  type: "human" | "ai" | "system";
  streaming: boolean;
  streamed: boolean;
  text: string;
  sequence: number;
}

export const clientAtom = atom<BaseModelData[]>([]);

export const serverAtom = atom<BaseModelData[]>([]);

export const displayAtom = atom((get) => {
  const client = get(clientAtom);
  const server = get(serverAtom);
  return [...client, ...server].sort((a, b) => a.sequence - b.sequence);
});
