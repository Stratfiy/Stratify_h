import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  ArrowRight, Check, X, Sparkles, Megaphone, Inbox, ShoppingCart,
  MessageSquare, LineChart, Star, Headphones, Zap,
} from "lucide-react";
import KaiDashboard from "@/components/KaiDashboard";
import CountUp from "@/components/CountUp";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { AGENTS, NDA_BRANDS, HERO_STATS } from "@/lib/site-data";

const AGENT_ICON = {
  Kai: Sparkles,
  Atlas: Megaphone,
  Nova: MessageSquare,
  Remy: ShoppingCart,
  Echo: Star,
  Sage: Headphones,
  Pulse: LineChart,
};

const PROBLEM_ROWS = [
  {
    old: "47 SaaS tools, $12K/month in subscriptions",
    new: "One AI team, one invoice, one outcome owner",
  },
  {
    old: "Hire a creative agency for $8K/month, wait 2 weeks for ads",
    new: "Kai ships ad creative in hours, with human approval",
  },
  {
    old: "Hire an SDR for $5K/month, hope they hit quota",
    new: "Atlas runs outbound 24/7, books meetings on autopilot",
  },
  {
    old: "Cart recovery emails sent late, by hand, generic",
    new: "Remy recovers 22% of abandoned carts within 30 minutes",
  },
];

const STAGES = [
  { name: "Create",  agents: ["Kai", "Echo"],          desc: "Kai produces creative. Echo feeds fresh UGC." },
  { name: "Acquire", agents: ["Kai", "Atlas", "Nova"], desc: "Kai runs ads. Atlas runs outbound. Nova handles inbound." },
  { name: "Convert", agents: ["Nova", "Remy"],         desc: "Nova qualifies leads. Remy recovers carts." },
  { name: "Retain",  agents: ["Sage", "Echo", "Pulse"],desc: "Sage supports. Echo collects reviews. Pulse measures it all." },
];

const TESTIMONIALS = [
  {
    quote:
      "We cancelled six SaaS subscriptions in our first month with StratifyAI. Kai alone replaced our $8K/mo creative agency — and the ads ship the same day.",
    name: "Founder",
    role: "Quiet Protector · Italy",
    initial: "QP",
  },
  {
    quote:
      "Remy is recovering carts I never thought were recoverable. The first week alone paid for the entire engagement.",
    name: "Head of Growth",
    role: "DTC Skincare · Mexico",
    initial: "DS",
  },
];

export default function Home() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-28 overflow-hidden" data-testid="home-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-[#0066FF]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-40 -left-32 w-[420px] h-[420px] rounded-full bg-[#00D4AA]/10 blur-3xl pointer-events-none" />

        <div className="container-x relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <FadeUp>
                <div className="eyebrow flex items-center gap-2.5">
                  <span className="agent-dot" />
                  The AI Operations Layer for Modern Business
                </div>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h1 className="mt-6 text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.98] tracking-[-0.025em] font-medium">
                  Hire an AI team.
                  <br />
                  <span className="text-[#0066FF]">Not another tool.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-7 text-[17px] md:text-[19px] leading-[1.55] text-[#4B5563] max-w-[560px]">
                  StratifyAI deploys named AI agents — Kai, Atlas, Nova and more — that run your
                  marketing, sales, support, and analytics 24/7. One coordinated team. One monthly
                  fee. Zero new tools to learn.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn-primary" data-testid="hero-cta-book-demo">
                    Book a demo <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#agents" className="btn-ghost" data-testid="hero-cta-see-agents">
                    See the agents <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-8 flex items-center gap-3 text-[13px] text-[#6B7280]">
                  <span className="agent-dot" />
                  <span className="font-mono tracking-wider uppercase text-[11px]">
                    Trusted by DTC and healthcare brands across 3 continents
                  </span>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-5">
              <FadeUp delay={0.2}>
                <KaiDashboard />
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LOGO BAR ===================== */}
      <section className="py-12 border-y border-[#F3F4F6] bg-[#FBFBFD]" data-testid="home-logos">
        <div className="container-x">
          <div className="text-center eyebrow mb-6">Trusted by operators who ship fast</div>
          <Marquee speed={28} gradient gradientColor="#FBFBFD" gradientWidth={80}>
            {NDA_BRANDS.concat(NDA_BRANDS).map((b, i) => (
              // brands are intentionally duplicated for the seamless loop, so a
              // composite key (brand + position) is required for uniqueness.
              <span key={`${b}__${i}`} className="nda-pill mx-3">{b}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================== PROBLEM ===================== */}
      <section className="py-24 md:py-32" data-testid="home-problem">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The status quo is broken</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.02em] max-w-[900px]">
              You don't need another tool. <span className="text-[#9CA3AF]">You need an operator.</span>
            </h2>
            <p className="mt-6 text-[17px] md:text-[18px] text-[#4B5563] max-w-[760px] leading-relaxed">
              The average DTC brand uses 47 SaaS tools. Each one creates a dashboard. None of them
              does the work. Your team drowns in subscriptions, switches tabs all day, and still
              ships ads late.
            </p>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#E5E7EB]">
            <div className="bg-[#FBFBFD] p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#E5E7EB]">
              <div className="eyebrow mb-5 text-[#9CA3AF]">The old way</div>
              <ul className="space-y-4">
                {PROBLEM_ROWS.map((r) => (
                  <li key={r.old} className="flex items-start gap-3 text-[15px] text-[#4B5563]">
                    <span className="mt-1.5 inline-flex w-5 h-5 rounded-full bg-white border border-[#E5E7EB] items-center justify-center">
                      <X className="w-3 h-3 text-[#9CA3AF]" />
                    </span>
                    <span>{r.old}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 md:p-8">
              <div className="eyebrow mb-5 text-[#0066FF]">The StratifyAI way</div>
              <ul className="space-y-4">
                {PROBLEM_ROWS.map((r) => (
                  <li key={r.new} className="flex items-start gap-3 text-[15px] text-[#0A0A0A]">
                    <span className="mt-1.5 inline-flex w-5 h-5 rounded-full bg-[#0066FF]/10 items-center justify-center">
                      <Check className="w-3 h-3 text-[#0066FF]" />
                    </span>
                    <span>{r.new}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== AGENTS ===================== */}
      <section id="agents" className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="home-agents">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The team</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[800px] leading-[1.05]">
              Meet your AI team.
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-[#4B5563] max-w-[680px]">
              Seven specialized agents. One coordinated workflow. They talk to each other.
              They don't sleep. They don't quit.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {AGENTS.map((a) => {
              const Icon = AGENT_ICON[a.name] || Zap;
              return (
                <StaggerItem key={a.name}>
                  <div
                    className="card-base p-6 group hover:border-[#0A0A0A] transition-colors duration-200 h-full flex flex-col"
                    data-testid={`agent-card-${a.name.toLowerCase()}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-[15px] font-medium">
                        {a.initial}
                      </div>
                      <Icon className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#0066FF] transition-colors" />
                    </div>
                    <div className="mt-5">
                      <div className="text-[20px] font-medium tracking-tight text-[#0A0A0A]">{a.name}</div>
                      <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#0066FF] mt-1">
                        {a.role}
                      </div>
                      <p className="mt-4 text-[14px] leading-relaxed text-[#4B5563]">
                        {a.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}

            {/* 8th tile = your team line */}
            <StaggerItem>
              <Link to="/contact" className="card-base p-6 h-full flex flex-col justify-between group hover:border-[#0066FF] transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div className="mt-5">
                    <div className="text-[18px] font-medium tracking-tight">Custom agent</div>
                    <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9CA3AF] mt-1">
                      Built for your workflow
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-[#4B5563]">
                      Need something specific? We build custom workflows in 7-14 days.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-[#0066FF] text-[13px] font-medium">
                  Talk to us <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== HOW IT WORKS / 4-STAGE LOOP ===================== */}
      <section className="py-24 md:py-32" data-testid="home-flow">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The loop</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[860px] leading-[1.05]">
              Built for the loop that actually drives growth.
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-[#4B5563] max-w-[680px]">
              Every agent slots into one of four stages. The team works as a continuous flywheel.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map((s, i) => (
              <StaggerItem key={s.name}>
                <div className="relative card-base p-6 h-full">
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9CA3AF]">
                    Stage 0{i + 1}
                  </div>
                  <div className="mt-2 text-[26px] font-medium tracking-tight text-[#0A0A0A] uppercase">
                    {s.name}
                  </div>
                  <p className="mt-3 text-[14px] text-[#4B5563] leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.agents.map((a) => (
                      <span key={a} className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full bg-[#FBFBFD] border border-[#E5E7EB] text-[#0A0A0A]">
                        {a}
                      </span>
                    ))}
                  </div>
                  {i < STAGES.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0066FF] bg-white rounded-full p-0.5 border border-[#E5E7EB]" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== INDUSTRIES ===================== */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="home-industries">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">Verticals</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[940px] leading-[1.05]">
              Built for the verticals where AI agents change the math.
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-3 gap-5">
            <Link to="/e-commerce" className="group card-base p-7 hover:border-[#0066FF] transition-colors" data-testid="industry-card-ecommerce">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">E-commerce</div>
              <h3 className="mt-3 text-[26px] md:text-[28px] tracking-tight font-medium leading-[1.15] text-[#0A0A0A]">
                AI ops for DTC brands doing $1M–$10M
              </h3>
              <p className="mt-4 text-[14.5px] text-[#4B5563] leading-relaxed">
                Cut creative cost 60%. Recover 22% of carts. Run outbound 24/7.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[#0066FF] text-[13.5px] font-medium">
                Explore the e-commerce stack <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link to="/healthcare" className="group card-base p-7 hover:border-[#0066FF] transition-colors" data-testid="industry-card-healthcare">
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">Healthcare</div>
              <h3 className="mt-3 text-[26px] md:text-[28px] tracking-tight font-medium leading-[1.15] text-[#0A0A0A]">
                AI ops for clinics, dental chains, and med spas
              </h3>
              <p className="mt-4 text-[14.5px] text-[#4B5563] leading-relaxed">
                Recover no-shows. Verify insurance. Triage intake. Free your front desk.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[#0066FF] text-[13.5px] font-medium">
                Explore the healthcare stack <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Link to="/contact" className="group p-7 rounded-2xl bg-[#0A0A0A] text-white hover:bg-[#16161a] transition-colors relative overflow-hidden" data-testid="industry-card-coming">
              <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
              <div className="relative">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00D4AA]">Coming next</div>
                <h3 className="mt-3 text-[26px] md:text-[28px] tracking-tight font-medium leading-[1.15]">
                  B2B services. Finance. Manufacturing.
                </h3>
                <p className="mt-4 text-[14.5px] text-white/70 leading-relaxed">
                  We're building the agent infrastructure for every operations-heavy industry on earth.
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[#00D4AA] text-[13.5px] font-medium">
                  Get on the waitlist <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== OUTCOMES / RECEIPTS ===================== */}
      <section className="py-24 md:py-32" data-testid="home-outcomes">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The receipts</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[700px] leading-[1.05]">
              Real outcomes. Real brands.
            </h2>
          </FadeUp>

          <StaggerGroup className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            <StaggerItem>
              <div>
                <div className="text-[64px] md:text-[88px] tracking-[-0.04em] font-medium leading-none text-[#0A0A0A]">
                  <CountUp end={60} suffix="%" />
                </div>
                <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                  Lower creative production cost
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div>
                <div className="text-[64px] md:text-[88px] tracking-[-0.04em] font-medium leading-none text-[#0066FF]">
                  <CountUp end={22} suffix="%" />
                </div>
                <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                  Cart recovery rate · Remy
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div>
                <div className="text-[64px] md:text-[88px] tracking-[-0.04em] font-medium leading-none text-[#0A0A0A]">
                  <CountUp end={80} suffix="%" />
                </div>
                <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                  Tickets resolved without human · Sage
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div>
                <div className="text-[64px] md:text-[88px] tracking-[-0.04em] font-medium leading-none text-[#0A0A0A]">
                  24<span className="text-[#9CA3AF]">/</span>7
                </div>
                <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                  Outbound running, never sleeps
                </div>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== MANIFESTO (DARK BAND) ===================== */}
      <section className="relative py-28 md:py-36 bg-[#0A0A0A] text-white overflow-hidden" data-testid="home-manifesto">
        <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#00D4AA] mb-6">
              Manifesto
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] leading-[1.04] tracking-[-0.02em] max-w-[1100px] font-medium">
              We're not building software. <span className="text-white/55">We're building the operating layer for AI labor.</span>
            </h2>
            <p className="mt-8 text-[17px] md:text-[19px] text-white/75 max-w-[860px] leading-[1.65]">
              Every business is about to hire AI agents the way they once hired employees. Some
              will buy 47 disconnected tools and call it transformation. Some will hire StratifyAI.
              We deploy agent teams today for e-commerce and healthcare. Tomorrow it's finance,
              manufacturing, logistics, and government. Hire the team. Or build the future on it.
              Either way — we're hiring.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-primary" data-testid="manifesto-cta-book">
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-outline-dark" data-testid="manifesto-cta-read">
                Read the full manifesto <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-24 md:py-32" data-testid="home-testimonials">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">What operators say</div>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em] max-w-[700px] leading-[1.05]">
              Quotes from real engagements.
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t) => (
              <FadeUp key={t.name + t.role} className="card-base p-7 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-[12px] font-medium tracking-tighter">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#0A0A0A]">{t.name}</div>
                    <div className="font-mono text-[11px] tracking-wider uppercase text-[#6B7280]">{t.role}</div>
                  </div>
                </div>
                <p className="text-[18px] md:text-[19px] leading-[1.55] text-[#0A0A0A]">
                  "{t.quote}"
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="pt-8 pb-28 md:pb-36" data-testid="home-final-cta">
        <div className="container-x">
          <div className="card-base p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[#0066FF]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="eyebrow mb-4">The next move</div>
              <h2 className="text-4xl md:text-5xl lg:text-[60px] tracking-[-0.02em] leading-[1.05] max-w-[900px] mx-auto">
                Stop hiring tools. <span className="text-[#0066FF]">Hire your AI team.</span>
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] text-[#4B5563] max-w-[560px] mx-auto">
                30-minute demo. Live walkthrough of the agents working. No slides.
              </p>
              <div className="mt-10">
                <Link to="/contact" className="btn-primary text-base px-8 py-4" data-testid="final-cta-book-demo">
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
