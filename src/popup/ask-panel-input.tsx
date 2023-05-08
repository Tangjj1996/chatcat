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
    const reuslt = await runAsync(keywords);
    setServerData((data) => [...data, reuslt]);
    setKeywords("");
  };

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-row">
      <textarea
        placeholder="please input your question"
        value={keywords}
        onChange={(event) => {
          setKeywords(event.target.value);
        }}
      />
      <Button onClick={handleSearch}>confirm</Button>
      {loading && <span>loading...</span>}
    </div>
  );
};

export default Input;
