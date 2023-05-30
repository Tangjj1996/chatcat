import { ConversationChain } from "langchain/chains";
import type { Prompt } from "../../model/prompt";

export interface PostAskData extends Prompt {
  msg: string;
  handleLLMNewToken: (token: string) => void;
  chain: ConversationChain;
  signal?: AbortSignal;
}
