import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import type { PostAskData } from "./interface";

export const postAsk = ({
  msg,
  handleLLMNewToken,
  model,
  abstraction = "",
  context = "",
  signal,
}: PostAskData) => {
  const prompt = PromptTemplate.fromTemplate(
    `${abstraction}${context && `\ncontext: ${context}`}{word}`
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain
    .call({ word: msg, signal }, [{ handleLLMNewToken }])
    .catch(console.error);
};
