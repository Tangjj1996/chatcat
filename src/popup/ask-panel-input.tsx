import { useState } from "react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import clx from "classnames";

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
    setKeywords("");
    const reuslt = await runAsync(keywords);
    setServerData((data) => [...data, reuslt]);
  };

  if (error) {
    throw error;
  }

  return (
    <div className="absolute bottom-20 left-0 flex w-full justify-center">
      <div className="relative">
        <textarea
          placeholder="Send a message"
          value={keywords}
          onChange={(event) => {
            setKeywords(event.target.value);
          }}
          className="h-10 max-h-80 w-80 resize-none rounded-md border border-slate-300 p-2"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              handleSearch();
            }
          }}
        />
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="absolute right-3 top-2 h-5 w-5"
          >
            <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            className={clx(
              "absolute right-3 top-2 h-5 w-5",
              keywords ? ["opacity-100", "hover:cursor-pointer"] : "opacity-20"
            )}
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={handleSearch}
          >
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Input;
