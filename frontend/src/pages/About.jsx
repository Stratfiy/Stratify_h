import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { FOUNDERS, TAGLINES } from "@/lib/site-data";

const ACTIVE_FOUNDERS = FOUNDERS
  .filter((f) => f.name !== "Harsha")
  .map((f) => ({
    ...f,
    title: "Founder",
    background: ["Fortune 500 operations experience", "NIT graduate"],
    bio: "Hands-on experience across procurement, maintenance, supply chain and operational workflows inside a Fortune 500 environment. NAutomation Labs brings that operational discipline into custom AI software built around measurable business outcomes.",
  }));

export default function About() {
  return (
    <>
      <section className="relative pt-28 md:pt-40 pb-16 overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">About us</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[72px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              {TAGLINES.manifesto} <span className="text-[#9CA3AF]">Engineered into the work — not bolted on top of it.</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="pb-28 md:pb-40" data-testid="about-body">
        <div className="container-x">
          <article className="max-w-[760px] text-[18px] md:text-[19px] leading-[1.75] text-[#1f2937] space-y-7">
            <p>
              NAutomation Labs builds custom AI software around expensive operational workflows — across manufacturing, procurement, logistics, maintenance, warehouses and other complex business operations.
            </p>
            <p>
              The starting point is not a model or automation tool. It is the operating problem: where skilled people lose time, where decisions wait for information, where working capital gets trapped, and where ERP, WMS, MES, CRM, documents and email fail to behave like one system.
            </p>
            <p>
              The company is founded by Nithish, with hands-on Fortune 500 experience across procurement, maintenance, supply chain and cross-functional operations. That experience shapes the way NAutomation Labs builds: around measurable operating outcomes, human decision boundaries and production reliability.
            </p>
            <p className="text-[#1E9BE0] font-medium">
              Bring us the workflow that is costing your operation time, capacity or working capital. We'll map the system around it.
            </p>
          </article>
        </div>
      </section>

      <section className="py-28 md:py-40 glass-band border-y border-white/50" data-testid="about-founders">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">Founder</div>
            <h3 className="text-[26px] md:text-[34px] tracking-[-0.02em] font-medium leading-[1.15] max-w-[680px]">
              Operations experience first. AI engineering around the workflow second.
            </h3>
            <p className="mt-5 text-[16px] text-[#4B5563] leading-relaxed max-w-[720px]">
              NAutomation Labs was started to build software around the way operational teams actually work — connecting documents, systems, decisions and exceptions into one production-grade operating layer.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-12 grid md:grid-cols-2 gap-5">
            {ACTIVE_FOUNDERS.map((f) => (
              <StaggerItem key={f.name}>
                <div className="card-base p-6 md:p-7 h-full flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-grid-dark opacity-50" />
                    <span className="text-white font-mono text-[44px] sm:text-[52px] font-medium tracking-tighter relative">{f.initial}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[20px] font-medium tracking-tight text-[#0A0A0A]">{f.name}</div>
                    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#1E9BE0] mt-1">{f.title}</div>
                    <p className="mt-3 text-[14.5px] text-[#4B5563] leading-relaxed">{f.bio}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                      {f.background.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[13px] text-[#0A0A0A]">
                          <Check className="w-3.5 h-3.5 text-[#00A37D] flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <FadeUp delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/contact" className="btn-primary" data-testid="about-cta">
                Talk to the founder <ArrowRight className="w-4 h-4" />
              </Link>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                {["Fortune 500 operations experience", "NIT graduate", "Procurement + supply chain", "Production AI systems"].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] text-[#6B7280]">
                    <span className="agent-dot" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 md:py-28" data-testid="about-final-cta">
        <div className="container-x text-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] tracking-[-0.02em] leading-[1.05] max-w-[800px] mx-auto">
              {TAGLINES.bookCall}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Book a call <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-ghost text-base px-8 py-4">
                See our projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}