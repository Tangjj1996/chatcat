import ReactDOM from "react-dom/client";

import App from "./app";
import "../main.css";
import "../base.css";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(<App />);
