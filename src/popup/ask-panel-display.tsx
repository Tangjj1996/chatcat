import React from "react";
import { useAtom } from "jotai";

import { clientAtom, serverAtom } from "../model/ask-panel-session";
import Card from "../components/card";
import { OpenAiOutline, UserOutline } from "../assets/icon";

const Display: React.FC = () => {
  const [clienData] = useAtom(clientAtom);
  const [serverData] = useAtom(serverAtom);

  const sessionPanel = clienData.map((client, index) => {
    if (index <= serverData.length - 1) {
      return (
        <>
          <div className="mx-auto flex flex-col gap-4 max-sm:w-[300px] md:w-[600px]">
            <UserOutline className="self-end" />
            <Card rtl>{client}</Card>
          </div>
          <div className="mx-auto flex flex-col gap-4 max-sm:w-[300px] md:w-[600px]">
            <OpenAiOutline />
            <Card>{serverData[index]}</Card>
          </div>
        </>
      );
    }
    return (
      <div className="mx-auto flex flex-col gap-4 max-sm:w-[300px] md:w-[600px]">
        <UserOutline className="self-end" />
        <Card rtl>{client}</Card>
      </div>
    );
  });
  if (clienData.length < serverData.length) {
    sessionPanel.push(
      ...serverData.map((server) => (
        <div className="mx-auto flex flex-col gap-4 max-sm:w-[300px] md:w-[600px]">
          <OpenAiOutline />
          <Card>{server}</Card>
        </div>
      ))
    );
  }
  return (
    <div className="flex w-full flex-auto flex-col gap-5 overflow-scroll scroll-smooth py-6 hover:scroll-auto">
      {sessionPanel}
    </div>
  );
};

export default Display;
