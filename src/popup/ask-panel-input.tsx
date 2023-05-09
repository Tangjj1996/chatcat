import { useState } from "react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";

import { postAsk } from "../service/openai/api";
import { clientAtom, serverAtom } from "../model/ask-panel-session";
import Button from "../components/button";

const Input: React.FC = () => {
  const [, setClientData] = useAtom(clientAtom);
  const [, setServerData] = useAtom(serverAtom);
  const [keywords, setKeywords] = useState("");
  const { loading, error, runAsync } = useRequest(postAsk, {
    manual: true,
  });

  const handleSearch = async () => {
    if (!keywords) {
      return;
    }
    setClientData((data) => [...data, keywords]);
    setKeywords("");
    const reuslt = await runAsync(keywords);
    setServerData((data) => [...data, reuslt]);
  };

  if (error) {
    throw error;
  }

  return (
    <div className="mt-2 flex flex-row items-center gap-x-2">
      <textarea
        placeholder="please input your question"
        value={keywords}
        onChange={(event) => {
          setKeywords(event.target.value);
        }}
        className="resize-none rounded-md border border-slate-300 p-2"
      />
      <Button onClick={handleSearch} loading={loading}>
        confirm
      </Button>
    </div>
  );
};

export default Input;
