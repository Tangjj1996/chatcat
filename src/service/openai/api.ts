import type { PostAskData } from "./interface";

export const postAsk = async ({
  msg,
  handleLLMNewToken,
  chain,
  signal,
}: PostAskData) => {
  return await chain
    .call({ input: msg, signal }, [{ handleLLMNewToken }])
    .catch(console.error);
};
