import { Link } from "react-router-dom";
import {
  ArrowRight, Fuel, FlaskConical, Pill, Zap, Car, Factory, UtensilsCrossed, Truck,
} from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { INDUSTRIES, ENGINE, TAGLINES } from "@/lib/site-data";

const INDUSTRY_ICON = {
  "oil-and-gas":   Fuel,
  "pharma":        Pill,
  "chemical":      FlaskConical,
  "energy-power":  Zap,
  "automotive":    Car,
  "cement-steel":  Factory,
  "food-beverage": UtensilsCrossed,
  "supply-chain":  Truck,
};

export default function Industries() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-28 md:pt-40 pb-16 overflow-hidden" data-testid="industries-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Industries</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              One operating layer. <span className="text-[#1E9BE0]">Every heavy industry.</span>
            </h1>
            <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[760px] leading-relaxed">
              {TAGLINES.diving} We bring the same engine — IoT ingestion, edge AI vision,
              two-layer thresholds, retrieval-grounded intelligence, and automated escalation — to
              the operational reality of eight sectors. The use cases differ; the spine is the same.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== INDUSTRY GRID ===================== */}
      <section className="pb-24 md:pb-32" data-testid="industries-grid">
        <div className="container-x">
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {INDUSTRIES.map((ind) => {
              const Icon = INDUSTRY_ICON[ind.slug] || Factory;
              return (
                <StaggerItem key={ind.slug}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="card-base p-6 group hover:border-[#1E9BE0] transition-colors duration-200 h-full flex flex-col"
                    data-testid={`industry-card-${ind.slug}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#1E9BE0] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-5 flex-1">
                      <div className="text-[19px] font-medium tracking-tight text-[#0A0A0A]">{ind.name}</div>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-[#4B5563]">{ind.tagline}</p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== ONE ENGINE ===================== */}
      <section className="py-28 md:py-40 bg-[#0A0A0A] text-white border-y border-white/5 relative overflow-hidden" data-testid="industries-engine">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#1E9BE0]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#4FB8EE] mb-4">
              One engine beneath every use case
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[60px] tracking-[-0.02em] max-w-[920px] leading-[1.05] font-medium">
              A sensor stream in. A grounded, approved action out. Every step on the record.
            </h2>
            <p className="mt-6 text-[17px] text-white/70 max-w-[780px] leading-relaxed">
              Every industry solution runs on the same architectural spine: a sensor or event stream
              is ingested, AI flags what matters with explainable reasoning, a retrieval-grounded
              corrective action is drafted from your own documents, and a qualified human approves
              it — every step recorded in an immutable audit trail.
            </p>
          </FadeUp>

          <StaggerGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENGINE.map((e) => (
              <StaggerItem key={e.key}>
                <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 h-full">
                  <div className="text-[18px] font-medium tracking-tight text-white">{e.title}</div>
                  <p className="mt-3 text-[14px] text-white/65 leading-relaxed">{e.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-28 md:py-36" data-testid="industries-cta">
        <div className="container-x text-center">
          <FadeUp>
            <div className="eyebrow mb-6">See it on your data</div>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] tracking-[-0.02em] leading-[1.05] max-w-[820px] mx-auto">
              Your instruments already produce the data. <span className="text-[#1E9BE0]">We make it reach a decision.</span>
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
