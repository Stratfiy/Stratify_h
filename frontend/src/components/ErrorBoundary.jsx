import { Component } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Fire-and-forget — never block the UI on logging.
    try {
      axios.post(`${API}/errors`, {
        message: String(error?.message || error)?.slice(0, 2000),
        stack: String(error?.stack || info?.componentStack || "").slice(0, 8000),
        url: typeof window !== "undefined" ? window.location.href : "",
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }).catch((postErr) => {
        // Surface in dev console; production has the original error visible too.
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console -- dev-only diagnostic, gated above
          console.warn("[ErrorBoundary] failed to report error:", postErr?.message);
        }
      });
    } catch (loggingErr) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console -- dev-only diagnostic, gated above
        console.warn("[ErrorBoundary] logging path threw:", loggingErr?.message);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="max-w-[460px] text-center" data-testid="error-boundary">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF]">
              Something broke
            </div>
            <h1 className="mt-3 text-[36px] tracking-[-0.025em] font-medium leading-[1.1]">
              Something hit a snag.
            </h1>
            <p className="mt-3 text-[15px] text-[#4B5563]">
              We've logged the error. Try refreshing — or email{" "}
              <a className="text-[#0066FF]" href="mailto:office@nautomationlabs.com">office@nautomationlabs.com</a>.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mt-7"
              data-testid="error-reload"
            >
              Reload page →
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
