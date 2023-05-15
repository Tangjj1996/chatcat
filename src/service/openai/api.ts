import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import type { PostAskData } from "./interface";

export const controller = new AbortController();

export const postAsk = ({
  msg,
  handleLLMNewToken,
  abstraction = "",
  context = "",
  model,
}: PostAskData) => {
  const prompt = PromptTemplate.fromTemplate(
    `${abstraction}${context && `\ncontext: ${context}`}{word}`
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain.call({ word: msg, signal: controller.signal }, [
    { handleLLMNewToken },
  ]);
};
