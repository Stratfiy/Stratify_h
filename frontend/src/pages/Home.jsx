import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  ArrowRight, Bot, Mic, PlugZap, Workflow, Wrench, GraduationCap,
} from "lucide-react";
import WorkflowDashboard from "@/components/WorkflowDashboard";
import CountUp from "@/components/CountUp";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import {
  SERVICES, VERTICALS, NDA_BRANDS, OUTCOMES, TESTIMONIALS, TAGLINES,
} from "@/lib/site-data";

const SERVICE_ICON = {
  "rag-chatbots":           Bot,
  "voice-agents":           Mic,
  "enterprise-integration": PlugZap,
  "end-to-end-automation":  Workflow,
  "custom-deployment":      Wrench,
  "training-lectures":      GraduationCap,
};

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
                  AI products &amp; solutions.
                  <br />
                  <span className="text-[#0066FF]">Deployed.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-7 text-[17px] md:text-[19px] leading-[1.55] text-[#4B5563] max-w-[560px]">
                  We design, build, and ship AI products for ecommerce, clinics, manufacturing, and
                  supply chain. Problem to working MVP in 5–7 days. Production deployment in 14–21.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn-primary" data-testid="hero-cta-book-call">
                    Book a call <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/services" className="btn-ghost" data-testid="hero-cta-services">
                    See services <ArrowRight className="w-4 h-4" />
                  </Link>
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
          <div className="text-center eyebrow mb-6">Trusted by operators across India and beyond</div>
          <Marquee speed={28} gradient gradientColor="#FBFBFD" gradientWidth={80}>
            {NDA_BRANDS.concat(NDA_BRANDS).map((b, i) => (
              <span key={`${b}__${i}`} className="nda-pill mx-3">{b}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================== THE BIG QUESTION ===================== */}
      <section className="py-24 md:py-32" data-testid="home-question">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The shift</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-[-0.02em] max-w-[960px]">
              {TAGLINES.diving.split(". ")[0]}.{" "}
              <span className="text-[#9CA3AF]">{TAGLINES.diving.split(". ")[1]}</span>
            </h2>
            <p className="mt-6 text-[17px] md:text-[18px] text-[#4B5563] max-w-[760px] leading-relaxed">
              Most companies will buy a stack of disconnected SaaS tools and call it transformation.
              The ones that win will infuse AI into the work itself — quietly, deeply, with engineers
              who understand both the AI and the business. That's what we do.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="btn-primary" data-testid="question-cta">
                {TAGLINES.bookCall} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="home-services">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">What we build</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[760px] leading-[1.05]">
              Six services. One outcome — <span className="text-[#0066FF]">AI that ships.</span>
            </h2>
          </FadeUp>

          <StaggerGroup className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICON[s.slug] || Bot;
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    to={`/contact?service=${encodeURIComponent(s.name)}`}
                    className="group card-base p-6 h-full flex flex-col transition-all hover:border-[#0066FF]/40 hover:shadow-[0_20px_60px_-20px_rgba(0,102,255,0.18)]"
                    data-testid={`service-card-${s.slug}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0066FF]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#0066FF]" />
                    </div>
                    <div className="mt-5 text-[18px] font-medium text-[#0A0A0A] tracking-tight">{s.name}</div>
                    <p className="mt-2 text-[14px] text-[#4B5563] leading-relaxed flex-1">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[#0066FF] text-[13px] font-medium">
                      Know more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== HOW WE WORK ===================== */}
      <section className="py-24 md:py-32" data-testid="home-process">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">How we work</div>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em] max-w-[760px] leading-[1.05]">
              {TAGLINES.problemToMvp}
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "01", title: "Schedule a call",       desc: "30 minutes. We listen. No slides." },
              { n: "02", title: "MVP in 5–7 days",       desc: "Working software, not a deck. Your data, your stack." },
              { n: "03", title: "Review & iterate",      desc: "We refine against real usage before scaling." },
              { n: "04", title: "Deploy in 14–21 days",  desc: "Production rollout + your own dashboard." },
            ].map((step) => (
              <FadeUp key={step.n} className="card-base p-6">
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#0066FF]">
                  Step {step.n}
                </div>
                <div className="mt-3 text-[19px] font-medium text-[#0A0A0A] tracking-tight">{step.title}</div>
                <p className="mt-2 text-[14px] text-[#4B5563] leading-relaxed">{step.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VERTICALS ===================== */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="home-verticals">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">Verticals</div>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em] max-w-[760px] leading-[1.05]">
              Built for operations-heavy industries.
            </h2>
          </FadeUp>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VERTICALS.map((v) => (
              <FadeUp key={v.name} className="card-base p-6">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">
                  {v.name}
                </div>
                <p className="mt-4 text-[15px] text-[#0A0A0A] leading-relaxed">{v.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OUTCOMES ===================== */}
      <section className="py-24 md:py-32" data-testid="home-outcomes">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The receipts</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[700px] leading-[1.05]">
              Speed. Outcomes. Engineering.
            </h2>
          </FadeUp>

          <StaggerGroup className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {OUTCOMES.map((o, i) => (
              <StaggerItem key={o.label}>
                <div>
                  <div className={`text-[64px] md:text-[88px] tracking-[-0.04em] font-medium leading-none ${o.accent ? "text-[#0066FF]" : "text-[#0A0A0A]"}`}>
                    {o.isLiteral
                      ? <>{o.value}<span className="text-[#9CA3AF]">{o.suffix.charAt(0)}</span>{o.suffix.slice(1)}</>
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

      {/* ===================== MANIFESTO ===================== */}
      <section className="relative py-28 md:py-36 bg-[#0A0A0A] text-white overflow-hidden" data-testid="home-manifesto">
        <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#00D4AA] mb-6">
              Why us
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[60px] leading-[1.04] tracking-[-0.02em] max-w-[1100px] font-medium">
              {TAGLINES.manifesto} <span className="text-white/55">Engineered into the work — not bolted on top of it.</span>
            </h2>
            <p className="mt-8 text-[17px] md:text-[19px] text-white/75 max-w-[860px] leading-[1.65]">
              We're engineers first. We came up shipping production systems at Samsung and Reliance,
              and we run NAutomation Labs the same way — with the rigor of real software and the
              speed of a lab. Every engagement gets a working MVP in a week and a deployed product
              in three. No retainers without proof. No theatre.
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
                30-minute call. We'll map AI to your stack and quote a 5-day MVP.
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
