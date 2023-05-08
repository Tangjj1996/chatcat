import { useState } from "react";
import { useRequest } from "ahooks";
import { postAsk } from "../service/openai/api";

const Hello = () => {
  const [keywords, setKeywords] = useState("");
  const { data, loading, error, runAsync } = useRequest(postAsk, {
    manual: true,
  });

  const handleSearch = async () => {
    if (!keywords) {
      return;
    }
    await runAsync(keywords);
    console.log(data);
  };

  return (
    <div>
      This is Hello world!
      <span>
        <input
          placeholder="please input your question"
          value={keywords}
          onChange={(event) => {
            setKeywords(event.target.value);
          }}
        />
        <button onClick={handleSearch}>confirm</button>
      </span>
      {loading && <span>loading...</span>}
      {data}
    </div>
  );
};

export default Hello;
