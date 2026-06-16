import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { FOUNDERS, FOUNDING_STORY, TAGLINES } from "@/lib/site-data";

export default function About() {
  return (
    <>
      {/* ===================== HERO ===================== */}
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

      {/* ===================== BODY ===================== */}
      <section className="pb-28 md:pb-40" data-testid="about-body">
        <div className="container-x">
          <article className="max-w-[760px] text-[18px] md:text-[19px] leading-[1.75] text-[#1f2937] space-y-7">
            <p>
              NAutomation Labs is <strong>the AI operating layer for industry</strong>. We build the
              intelligence layer that sits on top of the ERP, SCADA, and IoT you already run — and
              turns the data your instruments already produce into decisions, while the window to
              act is still open.
            </p>
            <p>
              Every plant has the instruments: sensors, PLCs, cameras, telematics. What's missing is
              the layer that flags what matters with reasoning, grounds the answer in your own
              manuals, drafts the corrective action, and escalates until someone acts. Most
              companies will buy a stack of disconnected tools and call it transformation. The ones
              that win will <strong>infuse AI into the work itself</strong> — with engineers who
              understand both the model and the machine.
            </p>
            <p>
              We came up shipping production systems at Samsung and Reliance, where "almost working"
              is a failure mode, and deployed GenAI inside a Fortune 500 procurement function — live
              in production, under enterprise IT scrutiny. We bring that same discipline to
              industrial AI: grounded in your data, a human on every consequential action, every
              step on an immutable audit trail.
            </p>
            <p className="text-[#1E9BE0] font-medium">
              If you want AI infused into your operations — talk to us. We'll demo the signature flow
              on your data.
            </p>
          </article>
        </div>
      </section>

      {/* ===================== FOUNDERS ===================== */}
      <section className="py-28 md:py-40 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="about-founders">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">The founders</div>
            <h3 className="text-[26px] md:text-[34px] tracking-[-0.02em] font-medium leading-[1.15] max-w-[680px]">
              {FOUNDING_STORY.headline}
            </h3>
            <p className="mt-5 text-[16px] text-[#4B5563] leading-relaxed max-w-[720px]">
              {FOUNDING_STORY.bio}
            </p>
          </FadeUp>

          <StaggerGroup className="mt-12 grid md:grid-cols-2 gap-5">
            {FOUNDERS.map((f) => (
              <StaggerItem key={f.name}>
                <div className="card-base p-6 md:p-7 h-full flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-grid-dark opacity-50" />
                    <span className="text-white font-mono text-[44px] sm:text-[52px] font-medium tracking-tighter relative">{f.initial}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[20px] font-medium tracking-tight text-[#0A0A0A]">{f.name}</div>
                    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#1E9BE0] mt-1">
                      {f.title}
                    </div>
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
                Talk to the founders <ArrowRight className="w-4 h-4" />
              </Link>
              <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                {FOUNDING_STORY.creds.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] text-[#6B7280]">
                    <span className="agent-dot" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
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