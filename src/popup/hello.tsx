import useSwr from "swr";
import { OpenAI } from "langchain/llms/openai";

const Hello = () => {
  console.log(ACCESS_TOKEN, "+++ ");
  return <div>This is Hello world!</div>;
};

export default Hello;
