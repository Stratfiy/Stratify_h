import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  ArrowRight, Check, X, Activity, Eye, Cpu, FileSearch, PhoneCall, ClipboardCheck,
} from "lucide-react";
import WorkflowDashboard from "@/components/WorkflowDashboard";
import CountUp from "@/components/CountUp";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import {
  SERVICES, INDUSTRIES, ENGINE, NDA_BRANDS, TESTIMONIALS, TAGLINES,
} from "@/lib/site-data";

const SERVICE_ICON = {
  "predictive-maintenance": Activity,
  "ai-vision":              Eye,
  "iot-integration":        Cpu,
  "rag-intelligence":       FileSearch,
  "automated-escalation":   PhoneCall,
  "compliance-audit":       ClipboardCheck,
};

// Old way vs the NAutomation Labs operating layer.
const PROBLEM_ROWS = [
  {
    old: "Sensors and SCADA produce data nobody acts on in time",
    new: "Live streams flagged with reasoning the moment they drift",
  },
  {
    old: "Alarm fatigue — 90% of alerts are noise, the real one hides",
    new: "AI classifies and escalates only what matters, in sequence",
  },
  {
    old: "A CMMS the floor barely uses; maintenance runs on paper",
    new: "Flagged reading → explained from your manual → drafted work order",
  },
  {
    old: "Audit prep is a week of panic from registers of varying credibility",
    new: "PM compliance, MTTR, MTBF, emissions — a print command",
  },
];

const RECEIPTS = [
  { value: 50, suffix: "%",  label: "Reduction in unplanned downtime", accent: true },
  { value: 90, suffix: "%+", label: "Defect detection at line speed", accent: false },
  { value: 70, suffix: "%+", label: "Electrical failures with thermal precursors", accent: false },
  { value: 24, suffix: "/7", label: "Monitoring that never sleeps", accent: false, literal: true },
];

export default function Home() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-16 md:pt-28 pb-28 md:pb-40 overflow-hidden" data-testid="home-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-60 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-40 w-[600px] h-[600px] rounded-full bg-[#1E9BE0]/[0.06] blur-3xl pointer-events-none" />

        <div className="container-x relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <FadeUp>
                <div className="eyebrow flex items-center gap-2.5">
                  <span className="agent-dot" />
                  AI operations intelligence for industry
                </div>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h1 className="mt-7 text-[42px] sm:text-[60px] lg:text-[80px] leading-[0.98] tracking-[-0.03em] font-medium">
                  The AI operating layer
                  <br />
                  <span className="text-[#1E9BE0]">for your industry.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-8 text-[18px] md:text-[21px] leading-[1.6] text-[#4B5563] max-w-[620px]">
                  Make intelligent decisions using AI on top of the ERP, SCADA, and IoT you already
                  run. We flag the reading, explain it from your own manuals, draft the corrective
                  action, and escalate until someone acts — every step on an immutable audit trail.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn-primary" data-testid="hero-cta-book-call">
                    Book a call <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/industries" className="btn-ghost" data-testid="hero-cta-industries">
                    Explore industries <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-10 flex items-center gap-3 text-[13px] text-[#6B7280]">
                  <span className="agent-dot" />
                  <span className="font-mono tracking-wider uppercase text-[11px]">
                    Fortune 500 GenAI in production · Ex-Samsung · Ex-RIL · NIT
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
      <section className="py-12 border-y border-white/50 glass-band" data-testid="home-logos">
        <div className="container-x">
          <div className="text-center eyebrow mb-6">Built and delivered — in production</div>
          <Marquee speed={28} gradient gradientColor="#FBFBFD" gradientWidth={80}>
            {NDA_BRANDS.concat(NDA_BRANDS).map((b, i) => (
              <span key={`${b}__${i}`} className="nda-pill mx-3">{b}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================== PROBLEM ===================== */}
      <section className="py-32 md:py-44" data-testid="home-problem">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">The status quo is broken</div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] leading-[1.05] tracking-[-0.02em] max-w-[940px]">
              You already have the data. <span className="text-[#9CA3AF]">It just never reaches a decision in time.</span>
            </h2>
            <p className="mt-6 text-[17px] md:text-[18px] text-[#4B5563] max-w-[780px] leading-relaxed">
              Every plant runs instruments — sensors, PLCs, SCADA, cameras. The gap is the
              intelligence layer that turns those streams into pre-emptive action. We don't replace
              your stack; we sit on top of it and make it think.
            </p>
          </FadeUp>

          <div className="mt-16 grid md:grid-cols-2 rounded-2xl overflow-hidden card-base">
            <div className="bg-white/30 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/50">
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
            <div className="bg-white/45 p-6 md:p-8">
              <div className="eyebrow mb-5 text-[#1E9BE0]">The NAutomation Labs way</div>
              <ul className="space-y-4">
                {PROBLEM_ROWS.map((r) => (
                  <li key={r.new} className="flex items-start gap-3 text-[15px] text-[#0A0A0A]">
                    <span className="mt-1.5 inline-flex w-5 h-5 rounded-full bg-[#1E9BE0]/10 items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#1E9BE0]" />
                    </span>
                    <span>{r.new}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CAPABILITIES (services) ===================== */}
      <section id="services" className="py-32 md:py-44 glass-band border-y border-white/50" data-testid="home-services">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">The platform</div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] tracking-[-0.02em] max-w-[840px] leading-[1.05]">
              Six capabilities. <span className="text-[#1E9BE0]">One intelligence layer.</span>
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-[#4B5563] max-w-[700px]">
              From predictive maintenance to AI vision, IoT integration, and audit-ready compliance —
              each grounded in your own documents, with a human approving every consequential action.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICON[s.slug] || Activity;
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    to="/services"
                    className="card-base p-6 group hover:border-[#0A0A0A] transition-colors duration-200 h-full flex flex-col"
                    data-testid={`service-card-${s.slug}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl ink-band text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#1E9BE0] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-5 flex-1">
                      <div className="text-[19px] font-medium tracking-tight text-[#0A0A0A]">{s.name}</div>
                      <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#1E9BE0] mt-1">
                        {s.short}
                      </div>
                      <p className="mt-4 text-[14px] leading-relaxed text-[#4B5563]">{s.desc}</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== HOW WE WORK ===================== */}
      <section className="relative py-32 md:py-44 ink-band text-white overflow-hidden" data-testid="home-process">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#1E9BE0]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#4FB8EE] mb-4">
              How we work
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] tracking-[-0.02em] max-w-[900px] leading-[1.05] font-medium">
              {TAGLINES.problemToMvp}
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-white/70 max-w-[700px]">
              No rip-and-replace, no quarter-long transformation programme. You see the signature
              flow run on realistic plant data fast, pilot one line, then scale across the plant.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Connect your stack",  desc: "We ingest your IoT, SCADA/DCS, telematics, and documents — no rip-and-replace." },
              { n: "02", title: "Demo on your data",   desc: "The signature flow runs on realistic plant data in days, not quarters." },
              { n: "03", title: "Pilot one line",      desc: "Flagged readings, drafted work orders, real escalation — on one area." },
              { n: "04", title: "Scale the plant",     desc: "Roll out across lines and sites with your own dashboards and audit trail." },
            ].map((s, i, arr) => (
              <StaggerItem key={s.n}>
                <div className="relative glass-dark p-6 h-full">
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#4FB8EE]">
                    Step {s.n}
                  </div>
                  <div className="mt-2 text-[22px] font-medium tracking-tight">{s.title}</div>
                  <p className="mt-3 text-[14px] text-white/65 leading-relaxed">{s.desc}</p>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#1E9BE0] rounded-full p-0.5 z-10" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== INDUSTRIES ===================== */}
      <section className="py-32 md:py-44" data-testid="home-industries">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">Industries</div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] tracking-[-0.02em] max-w-[980px] leading-[1.05]">
              {TAGLINES.diving}
            </h2>
            <p className="mt-5 text-[17px] md:text-[18px] text-[#4B5563] max-w-[720px]">
              One engine, eight sectors. The use cases differ; the spine — ingest, flag, ground,
              approve, record — is the same.
            </p>
          </FadeUp>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                className="group card-base p-6 hover:border-[#1E9BE0] transition-colors"
              >
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#1E9BE0]">
                  {ind.name}
                </div>
                <p className="mt-3 text-[14px] text-[#0A0A0A] leading-relaxed">{ind.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[#6B7280] group-hover:text-[#1E9BE0] text-[13px] font-medium transition-colors">
                  View use cases <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ONE ENGINE ===================== */}
      <section className="relative py-32 md:py-44 glass-band border-y border-white/50" data-testid="home-engine">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">One engine beneath every use case</div>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em] max-w-[860px] leading-[1.06]">
              A sensor stream in. A grounded, approved action out.
            </h2>
          </FadeUp>
          <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {ENGINE.map((e) => (
              <StaggerItem key={e.key}>
                <div className="card-base p-6 h-full">
                  <div className="text-[18px] font-medium tracking-tight text-[#0A0A0A]">{e.title}</div>
                  <p className="mt-3 text-[14px] text-[#4B5563] leading-relaxed">{e.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== RECEIPTS ===================== */}
      <section className="py-32 md:py-44" data-testid="home-outcomes">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">The receipts</div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] tracking-[-0.02em] max-w-[760px] leading-[1.05]">
              Industry-documented numbers.
            </h2>
          </FadeUp>

          <StaggerGroup className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {RECEIPTS.map((o) => (
              <StaggerItem key={o.label}>
                <div>
                  <div className={`text-[56px] md:text-[80px] tracking-[-0.04em] font-medium leading-none ${o.accent ? "text-[#1E9BE0]" : "text-[#0A0A0A]"}`}>
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

      {/* ===================== MANIFESTO ===================== */}
      <section className="relative py-36 md:py-52 ink-band text-white overflow-hidden" data-testid="home-manifesto">
        <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full bg-[#1E9BE0]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#4FB8EE] mb-6">
              Manifesto
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[60px] leading-[1.04] tracking-[-0.02em] max-w-[1100px] font-medium">
              {TAGLINES.manifesto} <span className="text-white/55">Engineered into the work — not bolted on top of it.</span>
            </h2>
            <p className="mt-8 text-[17px] md:text-[19px] text-white/75 max-w-[880px] leading-[1.65]">
              The plants that win won't buy a dozen disconnected tools and call it transformation.
              They'll infuse AI into the work itself — with engineers who understand both the model
              and the machine. We came up shipping production systems at Samsung and Reliance, where
              "almost working" is a failure mode, and deployed GenAI inside a Fortune 500 procurement
              function. We run NAutomation Labs the same way: AI grounded in your data, a human on
              every consequential action, every step on the record.
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
      <section className="py-32 md:py-44" data-testid="home-testimonials">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">What clients say</div>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em] max-w-[700px] leading-[1.05]">
              Quotes from real engagements.
            </h2>
          </FadeUp>

          <div className="mt-16 grid md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t) => (
              <FadeUp key={t.name + t.role} className="card-base p-7 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full ink-band text-white flex items-center justify-center font-mono text-[12px] font-medium tracking-tighter">
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
      <section className="pt-8 pb-36 md:pb-52" data-testid="home-final-cta">
        <div className="container-x">
          <div className="card-base p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="eyebrow mb-6">The next move</div>
              <h2 className="text-4xl md:text-5xl lg:text-[60px] tracking-[-0.02em] leading-[1.05] max-w-[920px] mx-auto">
                Stop reading about AI. <span className="text-[#1E9BE0]">Run it on your plant.</span>
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] text-[#4B5563] max-w-[580px] mx-auto">
                A 30-minute call. We'll map the operating layer to your stack and show the signature
                flow on your data.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-primary text-base px-8 py-4" data-testid="final-cta-book">
                  Book a call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/industries" className="btn-ghost text-base px-8 py-4" data-testid="final-cta-industries">
                  Explore industries <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
