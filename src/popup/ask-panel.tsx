import AskInput from "./ask-panel-input";
import AskDisplay from "./ask-panel-display";

const AskPanel = () => {
  return (
    <div className="flex flex-col items-center">
      <span>欢迎提问</span>
      <AskInput />
      <AskDisplay />
    </div>
  );
};

export default AskPanel;
