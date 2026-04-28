import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { FadeUp } from "@/components/Motion";
import { ECOM_PRICING, HC_PRICING } from "@/lib/site-data";

const FAQS = [
  { q: "How fast can I get started?", a: "Most clients are live within 7 days. Onboarding call, agent customization, deployment, training." },
  { q: "Do you replace my existing tools?", a: "Often yes — most brands cancel 5-10 SaaS subscriptions after we deploy. We integrate with what you keep (Shopify, Klaviyo, Meta, etc.)." },
  { q: "What if I need a custom agent?", a: "We build custom workflows for $2,500-$5,000 one-time. Most clients on Growth or Scale get one custom agent included." },
  { q: "Can I cancel anytime?", a: "Yes. Month-to-month billing. No annual lock-in unless you want a discount." },
  { q: "Where are you based?", a: "India-led, serving brands globally. We work in your timezone." },
  { q: "Who owns the agents?", a: "We deploy and operate them on your behalf. You always own your data." },
];

export default function Pricing() {
  const [tab, setTab] = useState("ecom");
  const data = tab === "ecom" ? ECOM_PRICING : HC_PRICING;

  return (
    <>
      <section className="relative pt-20 md:pt-28 pb-12" data-testid="pricing-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Pricing</div>
            <h1 className="text-[40px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.025em] font-medium max-w-[1100px]">
              Pricing built for <span className="text-[#0066FF]">outcomes</span>, not seats.
            </h1>
            <p className="mt-6 text-[17px] md:text-[19px] text-[#4B5563] max-w-[620px]">
              Pick a vertical. Pick a tier. Get your AI team deployed in 7 days.
            </p>
          </FadeUp>

          <div className="mt-12 inline-flex p-1 rounded-full border border-[#E5E7EB] bg-white" data-testid="pricing-tabs">
            <button
              onClick={() => setTab("ecom")}
              className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all ${
                tab === "ecom" ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A] hover:bg-[#F3F4F6]"
              }`}
              data-testid="pricing-tab-ecom"
            >
              E-commerce
            </button>
            <button
              onClick={() => setTab("healthcare")}
              className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all ${
                tab === "healthcare" ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A] hover:bg-[#F3F4F6]"
              }`}
              data-testid="pricing-tab-healthcare"
            >
              Healthcare
            </button>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32" data-testid="pricing-cards-section">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-5">
            {data.map((p) => (
              <PricingCard key={p.name + tab} plan={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-32 bg-[#FBFBFD] border-t border-[#F3F4F6] py-20 md:py-28" data-testid="pricing-faq">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-4">FAQ</div>
            <h2 className="text-3xl md:text-5xl tracking-[-0.02em] leading-[1.05]">Common questions.</h2>
          </FadeUp>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {FAQS.map((f) => (
              <FadeUp key={f.q} className="card-base p-6">
                <div className="font-medium text-[16px]">{f.q}</div>
                <p className="mt-2 text-[14.5px] text-[#4B5563] leading-relaxed">{f.a}</p>
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
      data-testid={`pricing-page-card-${plan.name.toLowerCase()}`}
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
