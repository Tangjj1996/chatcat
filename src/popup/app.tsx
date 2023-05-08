import ErrorBoundary from "../components/error-boundary";
import Hello from "./hello";

const app = () => {
  return (
    <ErrorBoundary fallback={<div>This is an error</div>}>
      <Hello />
    </ErrorBoundary>
  );
};

export default app;
