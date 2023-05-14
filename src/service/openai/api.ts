import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({
  openAIApiKey: ACCESS_TOKEN,
  temperature: 0.9,
  stream: true,
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        console.log(token);
      },
    },
  ],
});

export const postAsk = (msg: string) => {
  return model.call(msg);
};
