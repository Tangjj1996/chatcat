import React from "react";
import { useAtom } from "jotai";

import { clientAtom, serverAtom } from "../model/ask-panel-session";

const Display: React.FC = () => {
  const [clienData] = useAtom(clientAtom);
  const [serverData] = useAtom(serverAtom);

  const sessionPanel = clienData.map((client, index) => {
    if (index <= serverData.length - 1) {
      return (
        <div className="session">
          <div className="client">
            client: {index}.{client}
          </div>
          <div className="server">
            server: {index}.{serverData[index]}
          </div>
        </div>
      );
    }
    return (
      <div className="client">
        client: {index}.{client}
      </div>
    );
  });
  if (clienData.length < serverData.length) {
    sessionPanel.push(
      ...serverData.map((server) => (
        <div className="server">server: {server}</div>
      ))
    );
  }
  return <>{sessionPanel}</>;
};

export default Display;
