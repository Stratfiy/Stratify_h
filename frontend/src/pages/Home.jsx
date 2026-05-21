import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  ArrowRight, Check, X, Bot, Mic, PlugZap, Workflow, Wrench, GraduationCap, Inbox,
} from "lucide-react";
import WorkflowDashboard from "@/components/WorkflowDashboard";
import CountUp from "@/components/CountUp";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import {
  SERVICES, VERTICALS, NDA_BRANDS, TESTIMONIALS, TAGLINES,
} from "@/lib/site-data";

const SERVICE_ICON = {
  "rag-chatbots":           Bot,
  "voice-agents":           Mic,
  "enterprise-integration": PlugZap,
  "end-to-end-automation":  Workflow,
  "custom-deployment":      Wrench,
  "training-lectures":      GraduationCap,
};

// The villain: the old way vs the NAutomation Labs way.
const PROBLEM_ROWS = [
  {
    old: "Buy 12 disconnected SaaS tools, integrate none of them",
    new: "One AI system, wired into the stack you already run",
  },
  {
    old: "Wait 3 months and a six-figure budget for 'AI transformation'",
    new: "A working MVP in 5–7 days. Production in 14–21.",
  },
  {
    old: "Hire a consultancy that ships slides, not software",
    new: "Engineers who ship code — and a product you actually own",
  },
  {
    old: "Generic chatbot that hallucinates and frustrates customers",
    new: "RAG grounded in your docs, with a citation on every answer",
  },
];

// The receipts — concrete numbers, no vague 'outcomes'.
const RECEIPTS = [
  { value: 5,  suffix: " days", label: "Problem → working MVP", accent: false },
  { value: 60, suffix: "%",     label: "Lower creative production cost", accent: true },
  { value: 30, suffix: "%+",    label: "Clinic no-shows recovered", accent: false },
  { value: 24, suffix: "/7",    label: "Automations running, never sleep", accent: false, literal: true },
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
                  India's first AI-native engineering labs
                </div>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h1 className="mt-6 text-[44px] sm:text-[60px] lg:text-[80px] leading-[0.98] tracking-[-0.025em] font-medium">
                  Stop buying AI tools.
                  <br />
                  <span className="text-[#0066FF]">Ship AI products.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-7 text-[17px] md:text-[19px] leading-[1.55] text-[#4B5563] max-w-[560px]">
                  We design, build, and deploy AI products for ecommerce, clinics, manufacturing,
                  and supply chain. Engineered into your operations — not bolted on. Working MVP in
                  5–7 days. Production in 14–21.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn-primary" data-testid="hero-cta-book-call">
                    Book a call <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#services" className="btn-ghost" data-testid="hero-cta-services">
                    See what we build <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-8 flex items-center gap-3 text-[13px] text-[#6B7280]">
                  <span className="agent-dot" />
                  <span className="font-mono tracking-wider uppercase text-[11px]">
                    15+ engagements · Ex-Samsung · Ex-RIL · NIT
                  </span>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-5">
              <FadeUp delay={0.2}>
                <WorkflowDashboard />
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LOGO BAR ===================== */}
      <section className="py-12 border-y border-[#F3F4F6] bg-[#FBFBFD]" data-testid="home-logos">
        <div className="container-x">
          <div className="text-center eyebrow mb-6">Trusted by operators who'd rather ship than slideshow</div>
          <Marquee speed={28} gradient gradientColor="#FBFBFD" gradientWidth={80}>
            {NDA_BRANDS.concat(NDA_BRANDS).map((b, i) => (
              <span key={`${b}__${i}`} className="nda-pill mx-3">{b}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================== PROBLEM (villain table) ===================== */}
      <section className="py-24 md:py-32" data-testid="home-problem">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The status quo is broken</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.02em] max-w-[900px]">
              You don't need another AI tool. <span className="text-[#9CA3AF]">You need it shipped into your business.</span>
            </h2>
            <p className="mt-6 text-[17px] md:text-[18px] text-[#4B5563] max-w-[760px] leading-relaxed">
              The world is diving into AI. Most companies will stitch together a dozen tools, burn a
              quarter, and end up with dashboards nobody opens. We do the opposite — we build the
              thing, wire it into your stack, and hand you a product that runs.
            </p>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#E5E7EB]">
            <div className="bg-[#FBFBFD] p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#E5E7EB]">
              <div className="eyebrow mb-5 text-[#9CA3AF]">The old way</div>
              <ul className="space-y-4">
                {PROBLEM_ROWS.map((r) => (
                  <li key={r.old} className="flex items-start gap-3 text-[15px] text-[#4B5563]">
                    <span className="mt-1.5 inline-flex w-5 h-5 rounded-full bg-white border border-[#E5E7EB] items-center justify-center flex-shrink-0">
                      <X className="w-3 h-3 text-[#9CA3AF]" />
                    </span>
                    <span>{r.old}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 md:p-8">
              <div className="eyebrow mb-5 text-[#0066FF]">The NAutomation Labs way</div>
              <ul className="space-y-4">
                {PROBLEM_ROWS.map((r) => (
                  <li key={r.new} className="flex items-start gap-3 text-[15px] text-[#0A0A0A]">
                    <span className="mt-1.5 inline-flex w-5 h-5 rounded-full bg-[#0066FF]/10 items-center justify-center flex-shrink-0">
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

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="home-services">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">What we build</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[800px] leading-[1.05]">
              Six services. <span className="text-[#0066FF]">One outcome — AI that ships.</span>
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-[#4B5563] max-w-[680px]">
              From production-grade chatbots to bespoke AI products and team training. Each one
              deployed into your real workflow, not a sandbox.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICON[s.slug] || Bot;
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    to={`/contact?service=${encodeURIComponent(s.name)}`}
                    className="card-base p-6 group hover:border-[#0A0A0A] transition-colors duration-200 h-full flex flex-col"
                    data-testid={`service-card-${s.slug}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#0066FF] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-5 flex-1">
                      <div className="text-[19px] font-medium tracking-tight text-[#0A0A0A]">{s.name}</div>
                      <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#0066FF] mt-1">
                        {s.short}
                      </div>
                      <p className="mt-4 text-[14px] leading-relaxed text-[#4B5563]">{s.desc}</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}

            {/* Closing tile — custom build */}
            <StaggerItem>
              <Link to="/contact" className="card-base p-6 h-full flex flex-col justify-between group hover:border-[#0066FF] transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div className="mt-5">
                    <div className="text-[18px] font-medium tracking-tight">Something else?</div>
                    <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9CA3AF] mt-1">
                      Built for your workflow
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-[#4B5563]">
                      Tell us the problem. If it's automatable, we'll scope an MVP in days.
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

      {/* ===================== HOW WE WORK — dark flywheel ===================== */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0A] text-white overflow-hidden" data-testid="home-process">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#00D4AA] mb-4">
              How we work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[860px] leading-[1.05] font-medium">
              {TAGLINES.problemToMvp}
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-white/70 max-w-[680px]">
              A predictable engagement. You see working software fast, refine against real usage,
              and get a production deployment plus your own dashboard.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Schedule a call",      desc: "30 minutes. We listen. No slides, no fluff." },
              { n: "02", title: "MVP in 5–7 days",      desc: "Working software, not a deck. Your data, your stack." },
              { n: "03", title: "Review & iterate",     desc: "We refine against real usage before scaling." },
              { n: "04", title: "Deploy in 14–21 days", desc: "Production rollout + your own dashboard." },
            ].map((s, i, arr) => (
              <StaggerItem key={s.n}>
                <div className="relative rounded-2xl border border-white/12 bg-white/[0.03] p-6 h-full">
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00D4AA]">
                    Step {s.n}
                  </div>
                  <div className="mt-2 text-[22px] font-medium tracking-tight">{s.title}</div>
                  <p className="mt-3 text-[14px] text-white/65 leading-relaxed">{s.desc}</p>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A0A0A] bg-[#00D4AA] rounded-full p-0.5 z-10" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== VERTICALS ===================== */}
      <section className="py-24 md:py-32" data-testid="home-verticals">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">Verticals</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[940px] leading-[1.05]">
              Built for the operations-heavy industries where AI changes the math.
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VERTICALS.map((v) => (
              <FadeUp key={v.name} className="group card-base p-7 hover:border-[#0066FF] transition-colors">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">
                  {v.name}
                </div>
                <p className="mt-4 text-[15px] text-[#0A0A0A] leading-relaxed">{v.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== RECEIPTS ===================== */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="home-outcomes">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The receipts</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[700px] leading-[1.05]">
              Real numbers. Real deployments.
            </h2>
          </FadeUp>

          <StaggerGroup className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {RECEIPTS.map((o) => (
              <StaggerItem key={o.label}>
                <div>
                  <div className={`text-[64px] md:text-[88px] tracking-[-0.04em] font-medium leading-none ${o.accent ? "text-[#0066FF]" : "text-[#0A0A0A]"}`}>
                    {o.literal
                      ? <>24<span className="text-[#9CA3AF]">/</span>7</>
                      : <CountUp end={o.value} suffix={o.suffix} />}
                  </div>
                  <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                    {o.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== MANIFESTO (dark band) ===================== */}
      <section className="relative py-28 md:py-36 bg-[#0A0A0A] text-white overflow-hidden" data-testid="home-manifesto">
        <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#00D4AA] mb-6">
              Manifesto
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[60px] leading-[1.04] tracking-[-0.02em] max-w-[1100px] font-medium">
              {TAGLINES.manifesto} <span className="text-white/55">Engineered into the work — not bolted on top of it.</span>
            </h2>
            <p className="mt-8 text-[17px] md:text-[19px] text-white/75 max-w-[860px] leading-[1.65]">
              Every business is about to run on AI. Some will buy a dozen disconnected tools and
              call it transformation. The ones that win will infuse AI into the work itself — with
              engineers who understand both the model and the business. We came up shipping
              production systems at Samsung and Reliance, where "almost working" is a failure mode,
              and we run NAutomation Labs the same way. Working MVP in a week. Deployed product in
              three. No retainers without proof. No theatre.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="btn-primary" data-testid="manifesto-cta-book">
                Book a call <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-outline-dark" data-testid="manifesto-cta-about">
                About the team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="py-24 md:py-32" data-testid="home-testimonials">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">What clients say</div>
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
                Stop reading about AI. <span className="text-[#0066FF]">Start shipping it.</span>
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] text-[#4B5563] max-w-[560px] mx-auto">
                30-minute call. We'll map AI to your stack and quote a 5-day MVP. No slides.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-primary text-base px-8 py-4" data-testid="final-cta-book">
                  Book a call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact?service=AI%20Training%20%26%20Lectures" className="btn-ghost text-base px-8 py-4" data-testid="final-cta-training">
                  {TAGLINES.bookFreeSession} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}