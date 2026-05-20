import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" data-testid="brand-logo-link">
      <div className="relative w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
        <span className="text-white font-mono text-[11px] font-medium tracking-tighter">NL</span>
        <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
      </div>
      <span className="font-semibold text-[17px] tracking-tight">NAutomation Labs</span>
    </Link>
  );
}

const NAV_LINKS = [
  { to: "/",          label: "Home",     end: true  },
  { to: "/services",  label: "Services"            },
  { to: "/projects",  label: "Projects"            },
  { to: "/about",     label: "About Us"            },
  { to: "/contact",   label: "Contact"             },
];

export default function Nav() {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [loc.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]"
          : "bg-white/0 border-b border-transparent"
      }`}
      data-testid="site-nav"
    >
      <div className="container-x flex items-center justify-between h-[68px]">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-2 text-[14px] ${
                    isActive
                      ? "text-[#0A0A0A] font-medium"
                      : "text-[#0A0A0A]/80 hover:text-[#0A0A0A]"
                  }`
                }
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[#0066FF] text-white font-medium text-[15px] px-6 py-3 cursor-not-allowed select-none opacity-85">
                Dashboard <ArrowRight className="w-4 h-4" />
                <span className="absolute -top-2 -right-3 bg-[#00D4AA] text-[#04342C] font-mono text-[9px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full">
                  Soon
                </span>
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-[13px] font-medium text-[#6B7280] hover:text-[#0A0A0A] hover:border-[#D1D5DB] transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </>
          ) : (
            <Link to="/contact" className="btn-primary hidden md:inline-flex" data-testid="nav-cta">
              Book a call <ArrowRight className="w-4 h-4" />
            </Link>
          )}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileOpen((s) => !s)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-[#E5E7EB] bg-white"
            data-testid="nav-mobile-menu"
          >
            <div className="container-x py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="px-2 py-3 text-[15px]">
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-primary mt-2 justify-center">
                Book a call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
