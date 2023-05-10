import AskInput from "./ask-panel-input";
import AskDisplay from "./ask-panel-display";

const AskPanel = () => {
  return (
    <div className="flex h-full flex-col">
      <AskDisplay />
      <AskInput />
    </div>
  );
};

export default AskPanel;
