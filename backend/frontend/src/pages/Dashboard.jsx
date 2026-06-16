import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, LogOut } from "lucide-react";
import { FadeUp } from "@/components/Motion";

/**
 * Dashboard — placeholder.
 * The previous build had a packaged agent-team dashboard. Under NAutomation Labs,
 * each engagement ships with its own bespoke client dashboard, so this shared route
 * stands as a "coming soon" entry point for authenticated users.
 */
export default function Dashboard() {
  const { user, signOut } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      <header className="bg-[#0A0A0A] text-white border-b border-white/10">
        <div className="container-x flex items-center justify-between h-[68px]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-[#0A0A0A] font-mono text-[11px] font-medium">NL</span>
              <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#4FB8EE]" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight">NAutomation Labs</span>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/85 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <main className="container-x py-20 md:py-28 max-w-[760px]">
        <FadeUp>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#1E9BE0]">
            Dashboard
          </div>
          <h1 className="mt-4 text-[40px] md:text-[56px] tracking-[-0.025em] leading-[1.05] font-medium">
            Welcome, {user?.email?.split("@")[0] || "operator"}.
          </h1>
          <p className="mt-5 text-[17px] text-[#4B5563] leading-relaxed max-w-[560px]">
            Each NAutomation Labs engagement ships with a bespoke client dashboard tailored to
            that project. If you have an active engagement, your custom dashboard URL was shared
            with you over email.
          </p>
          <div className="mt-10 card-base p-7 md:p-8">
            <div className="eyebrow mb-3">Need help</div>
            <p className="text-[15px] text-[#4B5563] leading-relaxed">
              If you don't see what you expected, reach out and we'll route you to the right place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Contact us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-ghost">
                See our projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </main>
    </div>
  );
}
