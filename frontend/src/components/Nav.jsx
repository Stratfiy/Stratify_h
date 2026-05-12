import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { AGENTS } from "@/lib/site-data";

const INDUSTRIES = [
  { name: "E-commerce", to: "/e-commerce", soon: false },
  { name: "Healthcare", to: "/healthcare", soon: false },
  { name: "B2B Services", to: "/contact", soon: true },
  { name: "Finance", to: "/contact", soon: true },
  { name: "Manufacturing", to: "/contact", soon: true },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" data-testid="brand-logo-link">
      <div className="relative w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
        <span className="text-white font-mono text-[12px] font-medium tracking-tighter">SA</span>
        <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
      </div>
      <span className="font-semibold text-[17px] tracking-tight">StratifyAI</span>
    </Link>
  );
}

function DropdownItem({ to, title, desc, soon }) {
  return (
    <Link
      to={to}
      className="group flex items-start justify-between gap-4 rounded-xl px-3 py-3 hover:bg-[#F3F4F6] transition-colors"
      data-testid={`nav-dropdown-item-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-[14px] text-[#0A0A0A]">{title}</span>
          {soon && (
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#6B7280]">
              Soon
            </span>
          )}
        </div>
        {desc && <div className="text-[12.5px] text-[#6B7280] mt-0.5">{desc}</div>}
      </div>
      <ArrowRight className="w-4 h-4 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
    </Link>
  );
}

export default function Nav() {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null); // 'agents' | 'industries' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
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
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpen(null)}>
            {/* Agents dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpen("agents")}
            >
              <button
                className="px-3 py-2 text-[14px] text-[#0A0A0A]/80 hover:text-[#0A0A0A] flex items-center gap-1"
                data-testid="nav-agents-trigger"
              >
                Agents <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
              </button>
              <AnimatePresence>
                {open === "agents" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full pt-3 w-[640px]"
                    data-testid="nav-agents-menu"
                  >
                    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_30px_80px_-20px_rgba(10,10,10,0.18)] p-3 grid grid-cols-2 gap-1">
                      {AGENTS.map((a) => (
                        <DropdownItem
                          key={a.name}
                          to="/about"
                          title={`${a.name} — ${a.role}`}
                          desc={a.desc}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries dropdown */}
            <div className="relative" onMouseEnter={() => setOpen("industries")}>
              <button
                className="px-3 py-2 text-[14px] text-[#0A0A0A]/80 hover:text-[#0A0A0A] flex items-center gap-1"
                data-testid="nav-industries-trigger"
              >
                Industries <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
              </button>
              <AnimatePresence>
                {open === "industries" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-full pt-3 w-[340px]"
                    data-testid="nav-industries-menu"
                  >
                    <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_30px_80px_-20px_rgba(10,10,10,0.18)] p-3">
                      {INDUSTRIES.map((i) => (
                        <DropdownItem key={i.name} to={i.to} title={i.name} soon={i.soon} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/pricing" className={({ isActive }) =>
              `px-3 py-2 text-[14px] ${isActive ? "text-[#0A0A0A]" : "text-[#0A0A0A]/80 hover:text-[#0A0A0A]"}`
            } data-testid="nav-link-pricing">Pricing</NavLink>

            <NavLink to="/about" className={({ isActive }) =>
              `px-3 py-2 text-[14px] ${isActive ? "text-[#0A0A0A]" : "text-[#0A0A0A]/80 hover:text-[#0A0A0A]"}`
            } data-testid="nav-link-about">About</NavLink>

            <NavLink to="/contact" className={({ isActive }) =>
              `px-3 py-2 text-[14px] ${isActive ? "text-[#0A0A0A]" : "text-[#0A0A0A]/80 hover:text-[#0A0A0A]"}`
            } data-testid="nav-link-contact">Contact</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Swap this span for <Link to="/dashboard"> when ready to launch */}
          <span className="relative inline-flex items-center justify-center gap-2 rounded-full bg-[#0066FF] text-white font-medium text-[15px] px-6 py-3 cursor-not-allowed select-none opacity-85">
            Dashboard <ArrowRight className="w-4 h-4" />
            <span className="absolute -top-2 -right-3 bg-[#00D4AA] text-[#04342C] font-mono text-[9px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full">
              Soon
            </span>
          </span>
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
              <Link to="/e-commerce" className="px-2 py-3 text-[15px]">E-commerce</Link>
              <Link to="/healthcare" className="px-2 py-3 text-[15px]">Healthcare</Link>
              <Link to="/pricing" className="px-2 py-3 text-[15px]">Pricing</Link>
              <Link to="/about" className="px-2 py-3 text-[15px]">About</Link>
              <Link to="/contact" className="px-2 py-3 text-[15px]">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
