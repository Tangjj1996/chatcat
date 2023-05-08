import { Suspense } from "react";
import ErrorBoundary from "../components/error-boundary";
import Hello from "./hello";

const app = () => {
  return (
    <ErrorBoundary fallback={<div>This is an error</div>}>
      <Suspense fallback={<div>loading...</div>}>
        <Hello />
      </Suspense>
    </ErrorBoundary>
  );
};

export default app;
