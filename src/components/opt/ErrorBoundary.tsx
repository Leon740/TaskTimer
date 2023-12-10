/* eslint-disable react/destructuring-assignment */
import React from 'react';

interface ErrorBoundaryPropsI {
  children: React.JSX.Element;
}

interface ErrorBoundaryStateI {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryPropsI, ErrorBoundaryStateI> {
  constructor(props: ErrorBoundaryPropsI) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // logErrorToMyServices(error, info);
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="w-full min-h-full flex flex-col items-center justify-center">
          <h1 className="text-lg">An error occurred.</h1>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm py-xxs px-xs bg-white text-black mt-lg"
          >
            Reload
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
