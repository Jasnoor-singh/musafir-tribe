import React from "react";

/**
 * Catches rendering errors anywhere below it in the tree and shows a
 * friendly, on-brand fallback instead of a blank white screen — the
 * single most important thing standing between "professional site" and
 * "site that looks broken" once real users start clicking around.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In production this is where you'd forward to an error-tracking
    // service (Sentry, LogRocket, etc.) — logging for now keeps it simple.
    console.error("Unhandled UI error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#FBF7EE]">
          <span className="eyebrow text-[11px] text-[#C2913B] mb-3">Something went wrong</span>
          <h1 className="teko-head text-3xl sm:text-4xl text-[#221A10] mb-4">
            We hit a bump in the road.
          </h1>
          <p className="text-[#221A10]/55 font-light max-w-md mb-8">
            Please refresh the page. If this keeps happening, reach us on
            WhatsApp and we'll sort it out right away.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-9 py-3.5 bg-[#C2913B] text-[#221A10] eyebrow text-xs border border-[#C2913B] hover:bg-[#221A10] hover:text-[#E3B95C] transition-colors duration-300"
          >
            Refresh
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
