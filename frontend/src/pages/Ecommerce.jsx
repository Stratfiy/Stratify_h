import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { ECOM_PRICING } from "@/lib/site-data";
import RoiCalculator from "@/components/RoiCalculator";

const ECOM_AGENTS = [
  { name: "Kai", role: "Creative & Ad Production", desc: "Ships scroll-stopping ad creative with your approval. Hooks, body, leads — all rendered." },
  { name: "Atlas", role: "Outbound & Lead Gen", desc: "Finds and emails B2B retail buyers and wholesale partners on autopilot." },
  { name: "Nova", role: "Conversational AI", desc: "Handles inbound DMs across IG and TikTok. Qualifies. Books." },
  { name: "Remy", role: "Cart Recovery", desc: "Catches abandoned checkouts in 30 minutes via SMS + email." },
  { name: "Echo", role: "Reviews & UGC", desc: "Pulls fresh customer content. Feeds Kai for next week's ads." },
  { name: "Sage", role: "Customer Support", desc: "Resolves 80% of tickets across email, chat, and Gorgias." },
  { name: "Pulse", role: "Analytics", desc: "Monday morning ROAS, CAC, LTV report — and what to fix." },
];

const FAQS = [
  { q: "How fast can I get started?", a: "Most clients are live within 7 days. Onboarding call, agent customization, deployment, training." },
  { q: "Do you replace my existing tools?", a: "Often yes — most brands cancel 5–10 SaaS subscriptions after we deploy. We integrate with what you keep (Shopify, Klaviyo, Meta, etc.)." },
  { q: "Can I cancel anytime?", a: "Yes. Month-to-month billing. No annual lock-in unless you want a discount." },
];

export default function Ecommerce() {
  return (
    <>
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-24" data-testid="ecom-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="container-x relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeUp>
              <div className="eyebrow flex items-center gap-2.5">
                <span className="agent-dot" />
                E-commerce · DTC · $1M–$10M
              </div>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="mt-6 text-[40px] sm:text-[60px] lg:text-[80px] leading-[1.0] tracking-[-0.025em] font-medium">
                Run your DTC brand like the top 1%.
                <br />
                <span className="text-[#9CA3AF]">Without the team of 30.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[620px] leading-[1.55]">
                StratifyAI deploys 7 named AI agents — Kai, Atlas, Nova, Remy, Echo, Sage, Pulse — that run your
                marketing, sales, support, and analytics around the clock. Built specifically for Shopify
                brands doing $1M to $10M.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/contact" className="btn-primary" data-testid="ecom-cta-book">
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/pricing" className="btn-ghost" data-testid="ecom-cta-pricing">
                  See pricing <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-5">
            <FadeUp delay={0.15}>
              <div className="card-base overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1741896136071-3f8c1d472aa8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc2tpbmNhcmUlMjBib3R0bGV8ZW58MHx8fHwxNzc3MzQxNjU4fDA&ixlib=rb-4.1.0&q=85"
                  alt="Minimal DTC product"
                  className="w-full h-[420px] object-cover"
                />
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF]">Replaces</div>
                    <div className="text-[20px] font-medium tracking-tight">$12,000–$20,000/mo</div>
                    <div className="text-[12.5px] text-[#6B7280]">in tools and headcount</div>
                  </div>
                  <div className="text-[#0066FF] font-mono text-[11px] tracking-wider uppercase">live in 7 days</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 md:py-28 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="ecom-problem">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The reality</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] max-w-[940px]">
              Nobody is operating the stack. <span className="text-[#9CA3AF]">StratifyAI runs the stack.</span>
            </h2>
            <p className="mt-6 max-w-[820px] text-[17px] md:text-[18px] text-[#4B5563] leading-relaxed">
              You're running a $3M brand with a team of 5. You're paying for Klaviyo, Triple Whale, AdEspresso,
              Gorgias, Yotpo, AfterShip, Shogun, Loop Returns... and a freelance creative team. Your CAC keeps
              climbing. Your LTV is stuck. And your Sundays are gone. The problem isn't a missing tool — the
              problem is that nobody is operating the stack.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Agents for vertical */}
      <section className="py-24 md:py-32" data-testid="ecom-agents">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">The team for DTC</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] max-w-[860px]">
              7 agents. One coordinated operator.
            </h2>
          </FadeUp>
          <StaggerGroup className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ECOM_AGENTS.map((a) => (
              <StaggerItem key={a.name}>
                <div className="card-base p-6 h-full" data-testid={`ecom-agent-${a.name.toLowerCase()}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-[14px] font-medium">
                      {a.name[0]}
                    </div>
                    <div>
                      <div className="text-[17px] font-medium tracking-tight">{a.name}</div>
                      <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#0066FF]">
                        {a.role}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-[14px] text-[#4B5563] leading-relaxed">{a.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 md:py-32 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="ecom-roi">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">ROI calculator</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] max-w-[700px]">
              See your savings in 30 seconds.
            </h2>
          </FadeUp>
          <div className="mt-12">
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32" data-testid="ecom-pricing">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">Pricing for DTC</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05] max-w-[640px]">
              Pick a tier. Deploy in 7 days.
            </h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {ECOM_PRICING.map((p) => (
              <PricingCard key={p.name} plan={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28" data-testid="ecom-faq">
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
      data-testid={`pricing-card-${plan.name.toLowerCase()}`}
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
