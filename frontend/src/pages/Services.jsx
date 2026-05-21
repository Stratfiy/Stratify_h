import { Link } from "react-router-dom";
import {
  ArrowRight, Bot, Mic, PlugZap, Workflow, Wrench, GraduationCap, Check,
} from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { SERVICES, PROCESS_STEPS, TAGLINES } from "@/lib/site-data";

const SERVICE_ICON = {
  "rag-chatbots":           Bot,
  "voice-agents":           Mic,
  "enterprise-integration": PlugZap,
  "end-to-end-automation":  Workflow,
  "custom-deployment":      Wrench,
  "training-lectures":      GraduationCap,
};

export default function Services() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-20 md:pt-28 pb-16 overflow-hidden" data-testid="services-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#0066FF]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Services</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              AI products and solutions, <span className="text-[#0066FF]">end-to-end.</span>
            </h1>
            <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[680px] leading-relaxed">
              Six services that cover the full stack — from production-grade chatbots to bespoke AI
              products and team training. Pick what you need; we'll quote in days, not weeks.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== SERVICES LIST ===================== */}
      <section className="pb-20 md:pb-28" data-testid="services-grid">
        <div className="container-x">
          <StaggerGroup className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICON[s.slug] || Bot;
              return (
                <StaggerItem key={s.slug}>
                  <div className="card-base p-7 md:p-8 h-full flex flex-col" data-testid={`service-${s.slug}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5.5 h-5.5 text-[#0066FF]" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B7280]">
                          {s.short}
                        </div>
                        <h2 className="mt-1.5 text-[22px] md:text-[24px] font-medium tracking-tight text-[#0A0A0A]">
                          {s.name}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-5 text-[15px] text-[#4B5563] leading-relaxed">{s.desc}</p>

                    <ul className="mt-5 space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[14px] text-[#0A0A0A]">
                          <Check className="w-4 h-4 text-[#00A37D] mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 pt-5 border-t border-[#F3F4F6]">
                      <Link
                        to={`/contact?service=${encodeURIComponent(s.name)}`}
                        className="inline-flex items-center gap-1.5 text-[#0066FF] text-[14px] font-medium hover:gap-2.5 transition-all"
                        data-testid={`service-cta-${s.slug}`}
                      >
                        Know more · talk to us <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== HOW WE WORK (dark band) ===================== */}
      <section className="relative py-24 md:py-32 bg-[#0A0A0A] text-white overflow-hidden" data-testid="services-process">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#00D4AA] mb-4">How we work</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] max-w-[820px] leading-[1.05] font-medium">
              {TAGLINES.problemToMvp}
            </h2>
            <p className="mt-6 text-[17px] text-white/70 max-w-[680px] leading-relaxed">
              A predictable engagement model. You see working software fast, refine it against real
              usage, and get a production-grade deployment plus your own dashboard.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((step, i, arr) => (
              <StaggerItem key={step.n}>
                <div className="relative rounded-2xl border border-white/12 bg-white/[0.03] p-6 h-full">
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00D4AA]">
                    Step {step.n}
                  </div>
                  <div className="mt-2 text-[22px] font-medium tracking-tight">{step.title}</div>
                  <p className="mt-3 text-[14px] text-white/65 leading-relaxed">{step.desc}</p>
                  {i < arr.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A0A0A] bg-[#00D4AA] rounded-full p-0.5 z-10" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== TRAINING CTA ===================== */}
      <section className="py-24 md:py-32" data-testid="services-training-cta">
        <div className="container-x">
          <div className="card-base p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#00D4AA]/15 blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="eyebrow mb-4">Workshops & training</div>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] tracking-[-0.02em] leading-[1.1] max-w-[680px]">
                  Want your team to actually <span className="text-[#0066FF]">use</span> AI?
                </h2>
                <p className="mt-5 text-[16px] text-[#4B5563] leading-relaxed max-w-[600px]">
                  We run executive briefings, engineering workshops, and full-day sessions tailored to
                  your stack. Start with a free intro session for your industry.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  to="/contact?service=AI%20Training%20%26%20Lectures"
                  className="btn-primary"
                  data-testid="training-cta"
                >
                  {TAGLINES.bookFreeSession} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="pb-28" data-testid="services-final-cta">
        <div className="container-x text-center">
          <FadeUp>
            <div className="eyebrow mb-4">Ready?</div>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] tracking-[-0.02em] leading-[1.05] max-w-[760px] mx-auto">
              {TAGLINES.bookCall}
            </h2>
            <div className="mt-9">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Book a call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}