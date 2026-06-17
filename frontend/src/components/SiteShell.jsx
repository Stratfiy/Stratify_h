import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import FeedbackWidget from "@/components/FeedbackWidget";

export default function SiteShell() {
  const { pathname } = useLocation();

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

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
