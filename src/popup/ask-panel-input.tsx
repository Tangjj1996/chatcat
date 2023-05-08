import { useState } from "react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";

import { postAsk } from "../service/openai/api";
import { clientAtom, serverAtom } from "../model/ask-panel-session";

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
  };

  if (error) {
    throw error;
  }

  return (
    <div>
      <input
        placeholder="please input your question"
        value={keywords}
        onChange={(event) => {
          setKeywords(event.target.value);
        }}
      />
      <button onClick={handleSearch}>confirm</button>
      {loading && <span>loading...</span>}
    </div>
  );
};

export default Input;
