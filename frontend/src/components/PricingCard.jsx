import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

/**
 * Single source of truth for pricing-tier cards.
 * Used by Ecommerce, Healthcare, and Pricing pages.
 */
export default function PricingCard({ plan, testIdPrefix = "pricing-card" }) {
  const isHi = plan.highlight;
  const tag = plan.tag;
  const cardCls = isHi
    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
    : "bg-white border-[#E5E7EB] hover:shadow-md";
  const labelCls = isHi ? "text-[#00D4AA]" : "text-[#0066FF]";
  const cadenceCls = isHi ? "text-white/60" : "text-[#9CA3AF]";
  const bulletText = isHi ? "text-white/85" : "text-[#0A0A0A]";
  const bulletIcon = isHi ? "text-[#00D4AA]" : "text-[#0066FF]";
  const ctaCls = isHi
    ? "bg-white text-[#0A0A0A] hover:bg-white/90"
    : "bg-[#0066FF] text-white hover:bg-[#0052CC]";

  return (
    <div
      className={`relative rounded-2xl p-7 border transition-shadow ${cardCls}`}
      data-testid={`${testIdPrefix}-${plan.name.toLowerCase()}`}
    >
      {tag && (
        <div className="absolute -top-3 left-7 px-2.5 py-1 rounded-full bg-[#0066FF] text-white text-[11px] font-mono tracking-wider uppercase">
          {tag}
        </div>
      )}
      <div className={`font-mono text-[11px] tracking-[0.18em] uppercase ${labelCls}`}>
        {plan.name}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-[44px] font-medium tracking-[-0.025em]">{plan.price}</span>
        <span className={`text-[14px] ${cadenceCls}`}>{plan.cadence}</span>
      </div>
      <ul className="mt-6 space-y-2.5">
        {plan.bullets.map((b) => (
          <li key={b} className={`flex items-start gap-2.5 text-[14px] ${bulletText}`}>
            <Check className={`w-4 h-4 mt-0.5 ${bulletIcon}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-colors ${ctaCls}`}
      >
        Book a demo <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
