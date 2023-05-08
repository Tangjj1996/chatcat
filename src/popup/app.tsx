import ErrorBoundary from "../components/error-boundary";
import AskPanel from "./ask-panel";

const app = () => {
  return (
    <ErrorBoundary fallback={<div>This is an error</div>}>
      <AskPanel />
    </ErrorBoundary>
  );
};

export default app;
