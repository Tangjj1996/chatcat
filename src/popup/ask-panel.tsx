import { useRef } from "react";
import AskInput from "./ask-panel-input";
import AskDisplay from "./ask-panel-display";
import { DisplayMethod } from "./interface";

const AskPanel = () => {
  const displayRef = useRef<DisplayMethod>(null);

  return (
    <div className="flex h-full flex-col items-center gap-5 py-6">
      <AskDisplay ref={displayRef} />
      <AskInput ref={displayRef} />
    </div>
  );
};

export default AskPanel;
