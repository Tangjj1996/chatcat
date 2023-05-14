import { OpenAI } from "langchain/llms/openai";

const model = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
  temperature: 0.9,
  streaming: true,
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
