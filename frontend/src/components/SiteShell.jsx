import { Outlet } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SiteShell() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
