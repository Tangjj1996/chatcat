import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import type { Prompt } from "../../model/prompt";

interface PostAskData extends Prompt {
  msg: string;
  handleLLMNewToken: (token: string) => void;
}

const model = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
  temperature: 1,
  streaming: true,
});

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

  return chain.call({ word: msg }, [{ handleLLMNewToken }]);
};
