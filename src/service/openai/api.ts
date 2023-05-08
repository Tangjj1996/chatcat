import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({ openAIApiKey: ACCESS_TOKEN, temperature: 0.9 });

export const postAsk = (msg: string) => {
  return model.call(msg);
};
