import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, Lock } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { HEALTHCARE_AGENTS, HC_PRICING } from "@/lib/site-data";

const FAQS = [
  { q: "Are you HIPAA compliant?", a: "Yes. End-to-end encryption, signed BAA, and a dedicated HIPAA-trained engineer per account." },
  { q: "Do you replace my front desk?", a: "We free your front desk. Iris handles intake, Ambra recovers no-shows — your team focuses on patients in the chair." },
  { q: "How fast is deployment?", a: "Practices are typically live within 7-10 days, including BAA execution and EHR integration." },
];

export default function Healthcare() {
  return (
    <>
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-24" data-testid="hc-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="container-x relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="eyebrow flex items-center gap-2.5">
                <span className="agent-dot" />
                Healthcare · Clinics · Dental · Med Spa
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="mt-6 text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.02] tracking-[-0.025em] font-medium">
                Stop losing $200 every time a patient no-shows.
                <br />
                <span className="text-[#0066FF]">Deploy your AI front desk.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[620px] leading-[1.55]">
                StratifyAI deploys HIPAA-compliant AI agents — Iris, Ambra, Vera, Cora, Sage, Pulse — that
                handle patient intake, recover no-shows, verify insurance, and triage clinical questions
                for clinics, dental chains, and med spas.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-primary" data-testid="hc-cta-book">
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/pricing" className="btn-ghost" data-testid="hc-cta-pricing">
                  See pricing <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="mt-7 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#0066FF]/8 border border-[#0066FF]/20">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#0066FF]">
                  HIPAA-compliant deployment · Signed BAA · End-to-end encryption
                </span>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-5">
            <FadeUp delay={0.15}>
              <div className="card-base overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/10521230/pexels-photo-10521230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Modern healthcare clinic interior"
                  className="w-full h-[420px] object-cover"
                />
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#9CA3AF]">No-show recovery</div>
                    <div className="text-[24px] font-medium tracking-[-0.02em]">30%+</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#9CA3AF]">Average response</div>
                    <div className="text-[24px] font-medium tracking-[-0.02em]">&lt; 10 min</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="hc-agents">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The team for healthcare</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] max-w-[820px]">
              Six agents trained for the clinic.
            </h2>
          </FadeUp>
          <StaggerGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HEALTHCARE_AGENTS.map((a) => (
              <StaggerItem key={a.name}>
                <div className="card-base p-6 h-full" data-testid={`hc-agent-${a.name.toLowerCase()}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-[14px] font-medium">
                      {a.initial}
                    </div>
                    <div>
                      <div className="text-[17px] font-medium tracking-tight">{a.name}</div>
                      <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#0066FF]">{a.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] text-[#4B5563] leading-relaxed">{a.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* HIPAA band */}
      <section className="py-20 md:py-28" data-testid="hc-hipaa">
        <div className="container-x">
          <div className="card-base p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="eyebrow mb-3">Compliance</div>
              <h2 className="text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1]">
                Built for HIPAA from day one.
              </h2>
              <p className="mt-4 text-[16px] text-[#4B5563] leading-relaxed max-w-[480px]">
                Every workflow is reviewed by a compliance engineer. PHI is encrypted at rest and in transit.
                You get a signed BAA, audit logs, and access controls — never an afterthought.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono text-[12px]">
              {[
                { i: ShieldCheck, t: "Signed BAA" },
                { i: Lock, t: "End-to-end encryption" },
                { i: Check, t: "SOC 2 in progress" },
                { i: Check, t: "Dedicated HIPAA engineer" },
                { i: Check, t: "Audit logs + RBAC" },
                { i: Check, t: "PHI never used to train" },
              ].map((c) => (
                <div key={c.t} className="rounded-xl bg-[#FBFBFD] border border-[#E5E7EB] p-4 flex items-center gap-2.5">
                  <c.i className="w-4 h-4 text-[#0066FF]" />
                  <span className="text-[#0A0A0A] tracking-wider uppercase text-[10.5px]">{c.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="hc-pricing">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">Pricing for healthcare</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] max-w-[640px]">
              Pick a tier. Deploy in 7 days.
            </h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {HC_PRICING.map((p) => (
              <PricingCard key={p.name} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28" data-testid="hc-faq">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">FAQ</div>
            <h2 className="text-3xl md:text-4xl tracking-[-0.02em]">Common questions.</h2>
          </FadeUp>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {FAQS.map((f) => (
              <FadeUp key={f.q} className="card-base p-6">
                <div className="font-medium text-[15.5px]">{f.q}</div>
                <p className="mt-2 text-[14px] text-[#4B5563] leading-relaxed">{f.a}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PricingCard({ plan }) {
  const isHi = plan.highlight;
  return (
    <div
      className={`relative rounded-2xl p-7 border transition-shadow ${
        isHi
          ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
          : "bg-white border-[#E5E7EB] hover:shadow-md"
      }`}
      data-testid={`hc-pricing-card-${plan.name.toLowerCase()}`}
    >
      {plan.tag && (
        <div className="absolute -top-3 left-7 px-2.5 py-1 rounded-full bg-[#0066FF] text-white text-[11px] font-mono tracking-wider uppercase">
          {plan.tag}
        </div>
      )}
      <div className={`font-mono text-[11px] tracking-[0.18em] uppercase ${isHi ? "text-[#00D4AA]" : "text-[#0066FF]"}`}>
        {plan.name}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-[44px] font-medium tracking-[-0.025em]">{plan.price}</span>
        <span className={`text-[14px] ${isHi ? "text-white/60" : "text-[#9CA3AF]"}`}>{plan.cadence}</span>
      </div>
      <ul className="mt-6 space-y-2.5">
        {plan.bullets.map((b) => (
          <li key={b} className={`flex items-start gap-2.5 text-[14px] ${isHi ? "text-white/85" : "text-[#0A0A0A]"}`}>
            <Check className={`w-4 h-4 mt-0.5 ${isHi ? "text-[#00D4AA]" : "text-[#0066FF]"}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-colors ${
          isHi
            ? "bg-white text-[#0A0A0A] hover:bg-white/90"
            : "bg-[#0066FF] text-white hover:bg-[#0052CC]"
        }`}
      >
        Book a demo <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
