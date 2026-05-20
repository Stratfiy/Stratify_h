import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Check } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { PROJECTS } from "@/lib/site-data";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;
  if (project.placeholder) return <Navigate to="/projects" replace />;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-16 md:pt-20 pb-12" data-testid="project-detail-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <Link to="/projects" className="inline-flex items-center gap-1.5 text-[13px] text-[#6B7280] hover:text-[#0A0A0A] transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
            </Link>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">
              {project.vertical}
            </div>
            <h1 className="mt-4 text-[36px] md:text-[52px] lg:text-[64px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              {project.name}
            </h1>
            <p className="mt-6 text-[17px] md:text-[19px] text-[#4B5563] max-w-[760px] leading-relaxed">
              {project.summary}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== VISUAL ===================== */}
      <section className="pb-12" data-testid="project-detail-visual">
        <div className="container-x">
          <div className="aspect-[16/7] rounded-2xl bg-gradient-to-br from-[#0066FF]/10 via-[#0066FF]/5 to-[#00D4AA]/10 border border-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-soft opacity-40" />
            <Sparkles className="w-12 h-12 text-[#0066FF] relative" />
          </div>
        </div>
      </section>

      {/* ===================== NUMBERS ===================== */}
      {project.numbers && (
        <section className="py-16 md:py-20 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="project-detail-numbers">
          <div className="container-x">
            <FadeUp>
              <div className="eyebrow mb-4">Numbers</div>
              <h2 className="text-3xl md:text-4xl tracking-[-0.02em] max-w-[640px]">Results in production.</h2>
            </FadeUp>
            <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {project.numbers.map((n) => (
                <StaggerItem key={n.label}>
                  <div className="card-base p-7">
                    <div className="text-[44px] md:text-[56px] tracking-[-0.03em] font-medium leading-none text-[#0066FF]">
                      {n.value}
                    </div>
                    <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#6B7280]">
                      {n.label}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      )}

      {/* ===================== OVERVIEW + STACK ===================== */}
      <section className="py-20 md:py-28" data-testid="project-detail-overview">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <FadeUp>
              <div className="eyebrow mb-4">Use case</div>
              <h2 className="text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1] max-w-[680px]">
                What we built and why.
              </h2>
              <p className="mt-6 text-[17px] text-[#1f2937] leading-[1.75]">
                {project.useCase}
              </p>
            </FadeUp>
          </div>

          {project.stack && (
            <div className="lg:col-span-4">
              <FadeUp delay={0.05}>
                <div className="card-base p-6 md:p-7 sticky top-24">
                  <div className="eyebrow mb-4">Specification</div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B7280] mb-3">Tech stack</div>
                  <ul className="space-y-2.5">
                    {project.stack.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-[14px] text-[#0A0A0A]">
                        <Check className="w-3.5 h-3.5 text-[#00A37D] flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          )}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-28 md:pb-36" data-testid="project-detail-cta">
        <div className="container-x">
          <div className="card-base p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[#0066FF]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="eyebrow mb-4">Got a similar problem?</div>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] tracking-[-0.02em] leading-[1.05] max-w-[760px] mx-auto">
                Let's build yours. <span className="text-[#0066FF]">MVP in 5 days.</span>
              </h2>
              <div className="mt-9">
                <Link to="/contact" className="btn-primary text-base px-8 py-4">
                  Book a call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
