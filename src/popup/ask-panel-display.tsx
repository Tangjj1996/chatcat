import { useRef, useImperativeHandle, forwardRef } from "react";
import { useAtomValue } from "jotai";
import type { ForwardRefRenderFunction } from "react";
import { displayAtom } from "../model/ask-panel-session";
import { OpenAiOutline, UserOutline } from "../assets/icon";
import Card from "../components/card";
import { DisplayMethod } from "./interface";

const Display: ForwardRefRenderFunction<
  DisplayMethod,
  Record<string, unknown>
> = (_, ref) => {
  const displayData = useAtomValue(displayAtom);
  const displayPanel = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {
      scrollToBottom: () => {
        displayPanel.current?.scrollTo(0, displayPanel.current.scrollHeight);
      },
    };
  });

  const sessionPanel = displayData.map(({ type, text, sequence }) => {
    if (type === "human") {
      return (
        <div
          key={sequence}
          className="flex w-max max-w-full flex-col gap-4 self-end"
        >
          <UserOutline className="self-end" />
          <Card rtl>{text}</Card>
        </div>
      );
    }

    if (type === "ai") {
      return (
        <div key={sequence} className="flex w-max max-w-full flex-col gap-4">
          <OpenAiOutline />
          <Card>{text}</Card>
        </div>
      );
    }

    return <></>;
  });

  return (
    <div
      ref={displayPanel}
      className="flex w-full flex-auto flex-col gap-5 overflow-scroll scroll-smooth hover:scroll-auto max-sm:w-[300px] md:w-[600px]"
    >
      {sessionPanel}
    </div>
  );
};

export default forwardRef(Display);
