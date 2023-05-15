/**
 * 设置中心
 */
import { OpenAI } from "langchain/llms/openai";
import { atom } from "jotai";

export const openaiKeyAtom = atom(OPENAI_API_KEY);

export const modelAtom = atom(
  new OpenAI({
    openAIApiKey: OPENAI_API_KEY,
    temperature: 1,
    streaming: true,
  })
);
