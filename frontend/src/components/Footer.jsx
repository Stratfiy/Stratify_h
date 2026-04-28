import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white" data-testid="site-footer">
      <div className="container-x py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <div>
            <div className="eyebrow text-white/50 mb-4">Product</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li><Link to="/about" className="hover:text-white">Agents</Link></li>
              <li><Link to="/e-commerce" className="hover:text-white">Industries</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-white">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/50 mb-4">Industries</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li><Link to="/e-commerce" className="hover:text-white">E-commerce</Link></li>
              <li><Link to="/healthcare" className="hover:text-white">Healthcare</Link></li>
              <li><span className="text-white/50">B2B Services <span className="font-mono text-[10px] ml-1">SOON</span></span></li>
              <li><span className="text-white/50">Finance <span className="font-mono text-[10px] ml-1">SOON</span></span></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/50 mb-4">Company</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li><Link to="/about" className="hover:text-white">About / Manifesto</Link></li>
              <li><Link to="/contact" className="hover:text-white">Customers</Link></li>
              <li><Link to="/contact" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/50 mb-4">Connect</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li className="flex items-center gap-3">
                <a href="#" className="hover:text-white inline-flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a>
              </li>
              <li className="flex items-center gap-3">
                <a href="#" className="hover:text-white inline-flex items-center gap-2"><Twitter className="w-4 h-4" /> X / Twitter</a>
              </li>
              <li><a href="mailto:hello@stratifyai.com" className="hover:text-white">hello@stratifyai.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-[#0A0A0A] font-mono text-[12px] font-medium">SA</span>
              <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
            </div>
            <span className="font-semibold text-[15px]">StratifyAI</span>
          </div>
          <div className="text-[12.5px] text-white/55 font-mono tracking-wide">
            © 2026 StratifyAI · Privacy · Terms · Built with AI agents
          </div>
        </div>
      </div>
    </footer>
  );
}
