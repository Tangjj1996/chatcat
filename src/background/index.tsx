import ReactDOM from "react-dom/client";
import App from "./app";

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLDivElement
);

root.render(<App />);