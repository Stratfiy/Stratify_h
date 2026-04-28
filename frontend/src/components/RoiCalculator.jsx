import { useMemo, useState } from "react";

export default function RoiCalculator() {
  const [revenue, setRevenue] = useState(3); // $M / yr
  const [tools, setTools] = useState(8); // SaaS tools
  const [creatives, setCreatives] = useState(20); // ads / month

  const toolCost = tools * 220; // avg per tool / mo
  const creativeCost = creatives * 180; // avg cost per ad
  const oldMonthly = toolCost + creativeCost + 5000; // SDR/agency overhead
  const stratify = 2997;
  const savings = Math.max(0, oldMonthly - stratify);
  const yearly = savings * 12;

  const fmt = (n) => "$" + n.toLocaleString();

  const sliders = useMemo(
    () => [
      { id: "rev", label: "Annual revenue ($M)", value: revenue, min: 1, max: 10, step: 0.5, onChange: setRevenue, suffix: "M" },
      { id: "tools", label: "SaaS tools subscribed", value: tools, min: 3, max: 25, step: 1, onChange: setTools, suffix: "" },
      { id: "creatives", label: "Ad creatives needed / month", value: creatives, min: 5, max: 80, step: 5, onChange: setCreatives, suffix: "" },
    ],
    [revenue, tools, creatives]
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 card-base p-6 md:p-10" data-testid="roi-calculator">
      <div>
        <div className="space-y-7">
          {sliders.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between">
                <label className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                  {s.label}
                </label>
                <div className="font-mono text-[14px] text-[#0A0A0A]">
                  {s.id === "rev" ? `$${s.value}${s.suffix}` : `${s.value}${s.suffix}`}
                </div>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.value}
                onChange={(e) => s.onChange(parseFloat(e.target.value))}
                className="mt-3 w-full accent-[#0066FF]"
                data-testid={`roi-slider-${s.id}`}
              />
              <div className="mt-1 flex justify-between text-[11px] font-mono text-[#9CA3AF]">
                <span>{s.id === "rev" ? `$${s.min}${s.suffix}` : s.min}</span>
                <span>{s.id === "rev" ? `$${s.max}${s.suffix}` : s.max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-[#0A0A0A] text-white p-7 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="relative">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#00D4AA]">Estimated savings</div>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-[60px] md:text-[72px] tracking-[-0.03em] font-medium leading-none">
              {fmt(savings)}
            </span>
            <span className="text-white/60 text-[14px]">/ month</span>
          </div>
          <div className="mt-2 text-white/70 text-[14px]">
            That's <span className="text-white">{fmt(yearly)}</span> back in your bank account every year.
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 font-mono text-[12px]">
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-white/60 tracking-wider uppercase text-[10px]">Today (manual)</div>
              <div className="text-white text-[18px] font-medium tracking-tight mt-1">{fmt(oldMonthly)}/mo</div>
            </div>
            <div className="rounded-lg border border-white/10 p-3">
              <div className="text-[#00D4AA] tracking-wider uppercase text-[10px]">With StratifyAI</div>
              <div className="text-white text-[18px] font-medium tracking-tight mt-1">{fmt(stratify)}/mo</div>
            </div>
          </div>

          <a
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-[#0A0A0A] px-5 py-3 text-[14px] font-medium hover:bg-white/90"
          >
            Lock in these savings →
          </a>
        </div>
      </div>
    </div>
  );
}
