import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center" data-testid="not-found">
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF]">404</div>
      <h1 className="mt-4 text-[48px] md:text-[72px] tracking-[-0.025em] font-medium">
        Page not found.
      </h1>
      <p className="mt-4 text-[#4B5563] max-w-[480px] mx-auto">
        The page you were looking for doesn't exist — or it's still under construction.
      </p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        Back to home <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
