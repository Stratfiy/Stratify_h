import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white" data-testid="site-footer">
      <div className="container-x py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <div>
            <div className="eyebrow text-white/50 mb-4">Site</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/50 mb-4">Verticals</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li><span className="text-white/70">Ecommerce</span></li>
              <li><span className="text-white/70">Clinics</span></li>
              <li><span className="text-white/70">Manufacturing</span></li>
              <li><span className="text-white/70">Supply Chain</span></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/50 mb-4">Company</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-white/50 mb-4">Connect</div>
            <ul className="space-y-2.5 text-[14px] text-white/85">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-white inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white inline-flex items-center gap-2">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span className="text-[#0A0A0A] font-mono text-[11px] font-medium">NL</span>
              <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
            </div>
            <span className="font-semibold text-[15px]">NAutomation Labs</span>
          </div>
          <div className="text-[12.5px] text-white/55 font-mono tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>© 2026 NAutomation Labs</span>
            <span>·</span>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <span>·</span>
            <a href="/terms" className="hover:text-white">Terms</a>
            <span>·</span>
            <span>India's AI-native engineering labs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
