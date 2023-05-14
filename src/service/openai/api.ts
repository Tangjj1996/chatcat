import { OpenAI } from "langchain/llms/openai";

interface PostAskData {
  msg: string;
  handleLLMNewToken: (token: string) => void;
}

export const postAsk = ({ msg, handleLLMNewToken }: PostAskData) => {
  const model = new OpenAI({
    openAIApiKey: OPENAI_API_KEY,
    temperature: 1,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken,
      },
    ],
  });
  return model.call(msg);
};
