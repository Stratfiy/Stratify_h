import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { PROJECTS } from "@/lib/site-data";

export default function Projects() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-28 md:pt-40 pb-16 overflow-hidden" data-testid="projects-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#00D4AA]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Portfolio</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              Shipped. <span className="text-[#0066FF]">In production.</span>
            </h1>
            <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[680px] leading-relaxed">
              A selection of AI products and automation pipelines we've deployed for clients across
              ecommerce, healthcare, manufacturing, and supply chain.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== PROJECTS GRID ===================== */}
      <section className="pb-24 md:pb-32" data-testid="projects-grid">
        <div className="container-x">
          <StaggerGroup className="grid md:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <StaggerItem key={p.slug}>
                {p.placeholder ? (
                  <PlaceholderCard project={p} />
                ) : (
                  <ProjectCard project={p} />
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-28" data-testid="projects-final-cta">
        <div className="container-x text-center">
          <FadeUp>
            <div className="eyebrow mb-6">Yours next?</div>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] tracking-[-0.02em] leading-[1.05] max-w-[760px] mx-auto">
              Tell us the problem. We'll show you the MVP.
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

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block card-base p-7 md:p-8 h-full transition-all hover:border-[#0066FF]/40 hover:shadow-[0_20px_60px_-20px_rgba(0,102,255,0.18)]"
      data-testid={`project-card-${project.slug}`}
    >
      <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-[#0066FF]/10 via-[#0066FF]/5 to-[#00D4AA]/10 border border-[#E5E7EB] flex items-center justify-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-40" />
        <Sparkles className="w-8 h-8 text-[#0066FF] relative" />
      </div>
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B7280]">
        {project.vertical}
      </div>
      <h3 className="mt-2 text-[22px] md:text-[24px] font-medium tracking-tight text-[#0A0A0A] leading-[1.2]">
        {project.name}
      </h3>
      <p className="mt-4 text-[15px] text-[#4B5563] leading-relaxed">{project.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[#0066FF] text-[14px] font-medium">
        Know more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}

function PlaceholderCard({ project }) {
  return (
    <div className="card-base p-7 md:p-8 h-full opacity-70" data-testid={`project-placeholder-${project.slug}`}>
      <div className="aspect-[16/9] rounded-xl bg-[#FBFBFD] border border-dashed border-[#E5E7EB] flex items-center justify-center mb-6">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9CA3AF]">Case study soon</span>
      </div>
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#9CA3AF]">
        {project.vertical}
      </div>
      <h3 className="mt-2 text-[20px] font-medium tracking-tight text-[#0A0A0A] leading-[1.2]">
        {project.name}
      </h3>
      <p className="mt-3 text-[14px] text-[#6B7280] leading-relaxed">{project.summary}</p>
    </div>
  );
}