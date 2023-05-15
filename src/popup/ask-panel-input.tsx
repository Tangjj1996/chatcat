import { useState, forwardRef, useEffect } from "react";
import { useRequest } from "ahooks";
import { useAtom } from "jotai";
import clx from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import type { ForwardRefRenderFunction } from "react";
import { postAsk } from "../service/openai/api";
import { clientAtom, serverAtom } from "../model/ask-panel-session";
import { LoadingOutline, AirPlaneOutline } from "../assets/icon";
import { DisplayMethod } from "./interface";

const Input: ForwardRefRenderFunction<
  DisplayMethod,
  Record<string, unknown>
> = (_, displayRef) => {
  const [, setClientData] = useAtom(clientAtom);
  const [serverData, setServerData] = useAtom(serverAtom);
  const [keywords, setKeywords] = useState("");

  const { loading, error, runAsync } = useRequest(postAsk, {
    manual: true,
  });

  const handleSearch = async () => {
    if (!keywords || loading) {
      return;
    }
    setClientData((data) => [
      ...data,
      { type: "human", streaming: false, streamed: false, text: keywords },
    ]);
    setKeywords("");
    await runAsync({
      msg: keywords,
      handleLLMNewToken: (token) => {
        setServerData((data) => {
          // 取第一个toke
          // example data = ['token']
          if (data.length === 0) {
            return [
              { type: "ai", streamed: false, streaming: true, text: token },
            ];
          }
          // 取数组最后一个item与新token拼接
          // example data = ['old', 'token', 'new' + token]
          if (data[data.length - 1].streaming) {
            return [
              ...data.slice(0, -1),
              {
                type: "ai",
                streamed: false,
                streaming: true,
                text: data[data.length - 1].text + token,
              },
            ];
          }
          // 数组长度加1，拼接新的token
          // example data = ['old', 'token', token]
          return [
            ...data,
            { type: "ai", streamed: false, streaming: true, text: token },
          ];
        });
      },
    });
    setServerData((data) => [
      ...data.slice(0, -1),
      {
        type: "ai",
        streamed: true,
        streaming: false,
        text: data[data.length - 1].text,
      },
    ]);
  };

  useEffect(() => {
    (
      displayRef as React.MutableRefObject<DisplayMethod>
    ).current.scrollToBottom?.();
  }, [serverData[serverData.length - 1]?.text]);

  useEffect(() => {
    if (!keywords) {
      (
        displayRef as React.MutableRefObject<DisplayMethod>
      ).current.scrollToBottom?.();
    }
  }, [keywords]);

  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="relative">
        <TextareaAutosize
          maxRows={3}
          placeholder="随便问点什么吧～"
          value={keywords}
          onChange={(event) => {
            setKeywords(event.target.value);
          }}
          className="max-h-24 min-h-[40px] resize-none rounded-md border border-slate-300 py-2 pl-2 pr-8 max-sm:w-[300px] md:w-[600px]"
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

export default forwardRef(Input);
