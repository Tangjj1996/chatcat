import type { OpenAI } from "langchain/llms/openai";
import type { Prompt } from "../../model/prompt";

export interface PostAskData extends Prompt {
  msg: string;
  handleLLMNewToken: (token: string) => void;
  model: OpenAI;
  abstraction?: string;
  context?: string;
  signal?: AbortSignal;
}
