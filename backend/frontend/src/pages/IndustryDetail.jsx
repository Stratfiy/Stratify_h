import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { INDUSTRIES, ENGINE, PROVEN_WORK } from "@/lib/site-data";

export default function IndustryDetail() {
  const { slug } = useParams();
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  if (!ind) return <Navigate to="/industries" replace />;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-16 md:pt-20 pb-12 overflow-hidden" data-testid="industry-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <Link to="/industries" className="inline-flex items-center gap-1.5 text-[13px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> All industries
            </Link>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#1E9BE0]">
              AI Operations Intelligence
            </div>
            <h1 className="mt-4 text-[36px] md:text-[52px] lg:text-[68px] leading-[1.03] tracking-[-0.025em] font-medium max-w-[1080px]">
              {ind.name}
            </h1>
            <p className="mt-5 text-[17px] md:text-[20px] text-[#4B5563] max-w-[820px] leading-relaxed">
              {ind.tagline}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== WHY NOW ===================== */}
      <section className="py-16 md:py-20" data-testid="industry-why">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">Why AI and smart manufacturing, now</div>
            <p className="text-[18px] md:text-[21px] text-[#1f2937] leading-[1.7] max-w-[920px]">
              {ind.why}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="py-16 md:py-20 bg-[#0A0A0A] text-white border-y border-white/5 relative overflow-hidden" data-testid="industry-stats">
        <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#4FB8EE] mb-10">
              The numbers behind the shift
            </div>
          </FadeUp>
          <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {ind.stats.map((s) => (
              <StaggerItem key={s.label}>
                <div>
                  <div className="text-[34px] md:text-[44px] tracking-[-0.03em] font-medium leading-none text-[#4FB8EE]">
                    {s.value}
                  </div>
                  <div className="mt-3 text-[13px] text-white/70 leading-snug">
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== WHAT INDUSTRY 4.0 MEANS ===================== */}
      <section className="py-16 md:py-24" data-testid="industry-i40">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">What Industry 4.0 actually means here</div>
            <p className="text-[18px] md:text-[22px] text-[#0A0A0A] leading-[1.65] max-w-[940px] tracking-[-0.01em]">
              {ind.i40}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section className="py-16 md:py-24 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="industry-usecases">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">Use cases in detail</div>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] tracking-[-0.02em] max-w-[760px] leading-[1.08]">
              The reality today. What our AI does. <span className="text-[#1E9BE0]">What changes.</span>
            </h2>
          </FadeUp>

          <div className="mt-14 space-y-5">
            {ind.useCases.map((uc, i) => (
              <FadeUp key={uc.title} delay={i * 0.03}>
                <div className="card-base p-7 md:p-9">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[13px] text-[#1E9BE0] font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[21px] md:text-[24px] font-medium tracking-tight text-[#0A0A0A] leading-snug">
                      {uc.title}
                    </h3>
                  </div>
                  <div className="mt-6 grid md:grid-cols-3 gap-6 md:pl-9">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#9CA3AF] mb-2">
                        The reality today
                      </div>
                      <p className="text-[14px] text-[#4B5563] leading-relaxed">{uc.reality}</p>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#1E9BE0] mb-2">
                        What our AI does
                      </div>
                      <p className="text-[14px] text-[#0A0A0A] leading-relaxed">{uc.ai}</p>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#00A37D] mb-2">
                        What changes
                      </div>
                      <p className="text-[14px] text-[#4B5563] leading-relaxed">{uc.changes}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ONE ENGINE ===================== */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] text-white relative overflow-hidden" data-testid="industry-engine">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-[#1E9BE0]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#4FB8EE] mb-4">
              One engine beneath every use case
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] tracking-[-0.02em] max-w-[860px] leading-[1.08] font-medium">
              The same spine runs every solution above.
            </h2>
          </FadeUp>
          <StaggerGroup className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENGINE.map((e) => (
              <StaggerItem key={e.key}>
                <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 h-full">
                  <div className="text-[17px] font-medium tracking-tight text-white">{e.title}</div>
                  <p className="mt-3 text-[13.5px] text-white/65 leading-relaxed">{e.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== PROVEN WORK ===================== */}
      <section className="py-20 md:py-28" data-testid="industry-proven">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">Proven work — built and delivered</div>
            <p className="text-[17px] md:text-[18px] text-[#4B5563] max-w-[820px] leading-relaxed">
              {PROVEN_WORK.intro}
            </p>
          </FadeUp>
          <div className="mt-12 space-y-5">
            {PROVEN_WORK.items.map((item) => (
              <FadeUp key={item.name} className="card-base p-7 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#1E9BE0] mb-2">
                  {item.group}
                </div>
                <h3 className="text-[20px] md:text-[22px] font-medium tracking-tight text-[#0A0A0A] leading-snug">
                  {item.name}
                </h3>
                <p className="mt-3 text-[14.5px] text-[#4B5563] leading-relaxed">{item.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-32 md:pb-44" data-testid="industry-cta">
        <div className="container-x">
          <div className="card-base p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="eyebrow mb-6">For {ind.name.toLowerCase()} operations</div>
              <h2 className="text-4xl md:text-5xl lg:text-[52px] tracking-[-0.02em] leading-[1.05] max-w-[820px] mx-auto">
                See the signature flow <span className="text-[#1E9BE0]">on your plant data.</span>
              </h2>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-primary text-base px-8 py-4">
                  Book a call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/industries" className="btn-ghost text-base px-8 py-4">
                  Other industries <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
