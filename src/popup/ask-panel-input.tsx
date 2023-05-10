import { useState } from "react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import clx from "classnames";

import { postAsk } from "../service/openai/api";
import { clientAtom, serverAtom } from "../model/ask-panel-session";
import { LoadingOutline, AirPlaneOutline } from "../assets/icon";

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
    <div className="flex w-full flex-none justify-center pb-10">
      <div className="relative">
        <textarea
          placeholder="Send a message"
          value={keywords}
          onChange={(event) => {
            setKeywords(event.target.value);
          }}
          className="h-10 max-h-80 resize-none rounded-md border border-slate-300 p-2 md:w-[600px]"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
              handleSearch();
            }
          }}
        />
        {loading ? (
          <LoadingOutline className="absolute right-3 top-2" />
        ) : (
          <AirPlaneOutline
            onClick={handleSearch}
            className={clx(
              "absolute right-3 top-2 transition-opacity",
              keywords ? "opacity-100 hover:cursor-pointer" : "opacity-20"
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
