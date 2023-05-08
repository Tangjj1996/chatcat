import React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<ErrorBoundaryProps>
> {
  state = { hasError: false, error: undefined };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.fallback}
          {this.state.error}
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
