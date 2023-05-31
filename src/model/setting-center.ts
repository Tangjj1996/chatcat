/**
 * 设置中心
 */
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { atom } from "jotai";

export const openaiKeyAtom = atom(OPENAI_API_KEY);

export const modelAtom = atom(
  (get) =>
    new OpenAI({
      openAIApiKey: get(openaiKeyAtom),
      temperature: 1,
      streaming: true,
    })
);

export const chainAtom = atom((get) => {
  const memory = new BufferMemory({ inputKey: "input" });
  return new ConversationChain({ llm: get(modelAtom), memory });
});
