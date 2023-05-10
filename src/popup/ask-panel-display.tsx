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
          <div className="m-auto mt-5 flex flex-col md:w-[600px]">
            <UserOutline />
            <Card rtl>{client}</Card>
          </div>
          <div className="m-auto mt-5 flex flex-col md:w-[600px]">
            <OpenAiOutline />
            <Card>{serverData[index]}</Card>
          </div>
        </>
      );
    }
    return (
      <div className="m-auto mt-5 flex flex-col md:w-[600px]">
        <UserOutline />
        <Card rtl>{client}</Card>
      </div>
    );
  });
  if (clienData.length < serverData.length) {
    sessionPanel.push(
      ...serverData.map((server) => (
        <div className="m-auto mt-5 flex flex-col md:w-[600px]">
          <OpenAiOutline />
          <Card>{server}</Card>
        </div>
      ))
    );
  }
  return <div className="w-full flex-auto">{sessionPanel}</div>;
};

export default Display;
