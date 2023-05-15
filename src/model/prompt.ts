/**
 * prompt
 */
import { atom } from "jotai";

export interface Prompt {
  abstraction?: string;
  context?: string;
}

export const prompt = atom<Prompt>({});
