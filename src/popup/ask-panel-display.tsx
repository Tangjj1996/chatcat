import { useRef, useImperativeHandle, forwardRef } from "react";
import { useAtom } from "jotai";
import type { ForwardRefRenderFunction } from "react";
import { clientAtom, serverAtom } from "../model/ask-panel-session";
import { OpenAiOutline, UserOutline } from "../assets/icon";
import Card from "../components/card";
import { DisplayMethod } from "./interface";

const Display: ForwardRefRenderFunction<
  DisplayMethod,
  Record<string, unknown>
> = (_, ref) => {
  const [clienData] = useAtom(clientAtom);
  const [serverData] = useAtom(serverAtom);
  const displayPanel = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => {
    return {
      scrollToBottom: () => {
        displayPanel.current?.scrollTo(0, displayPanel.current.scrollHeight);
      },
    };
  });

  const sessionPanel = clienData.map((client, index) => {
    if (index <= serverData.length - 1) {
      return (
        <>
          <div className="flex w-max max-w-full flex-col gap-4 self-end">
            <UserOutline className="self-end" />
            <Card rtl>{client.text}</Card>
          </div>
          <div className="flex w-max max-w-full flex-col gap-4">
            <OpenAiOutline />
            <Card>{serverData[index].text}</Card>
          </div>
        </>
      );
    }
    return (
      <div className="flex w-max max-w-full flex-col gap-4 self-end">
        <UserOutline className="self-end" />
        <Card rtl>{client.text}</Card>
      </div>
    );
  });
  if (clienData.length < serverData.length) {
    sessionPanel.push(
      ...serverData.map((server) => (
        <div className="flex w-max max-w-full flex-col gap-4">
          <OpenAiOutline />
          <Card>{server.text}</Card>
        </div>
      ))
    );
  }
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
