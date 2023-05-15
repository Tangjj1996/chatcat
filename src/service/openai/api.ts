import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import type { PostAskData } from "./interface";

const model = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
  temperature: 1,
  streaming: true,
});

export const controller = new AbortController();

export const postAsk = ({
  msg,
  handleLLMNewToken,
  abstraction = "",
  context = "",
}: PostAskData) => {
  const prompt = PromptTemplate.fromTemplate(
    `${abstraction}${context && `\ncontext: ${context}`}{word}`
  );
  const chain = new LLMChain({ llm: model, prompt });

  return chain.call({ word: msg, signal: controller.signal }, [
    { handleLLMNewToken },
  ]);
};
