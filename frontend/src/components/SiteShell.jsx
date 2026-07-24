import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import FeedbackWidget from "@/components/FeedbackWidget";
import useLenis from "@/hooks/useLenis";

export default function SiteShell() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  // Scroll to top on route change (routes through Lenis when it's active so
  // the two don't fight over scroll position).
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, lenisRef]);

  return (
    <div className="min-h-screen bg-transparent text-[#0A0A0A]">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <FeedbackWidget />
    </div>
  );
}
