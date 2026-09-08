import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { PROJECTS, PROJECT_GROUPS } from "@/lib/site-data";
import { OPERATIONAL_PROJECTS, OPERATIONAL_PROJECT_GROUPS } from "@/lib/project-additions";

const ALL_PROJECTS = [...OPERATIONAL_PROJECTS, ...PROJECTS];
const ALL_GROUPS = Array.from(new Set([...OPERATIONAL_PROJECT_GROUPS, ...PROJECT_GROUPS]));

export default function Projects() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-28 md:pt-40 pb-16 overflow-hidden" data-testid="projects-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Selected systems</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              Operational software for <span className="text-[#1E9BE0]">expensive workflows.</span>
            </h1>
            <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[820px] leading-relaxed">
              Custom AI-native systems for production, maintenance, procurement, warehouses, inventory,
              logistics, quality, document-heavy operations, and cross-functional execution — built to
              reduce manual effort, operating cost, delays, and exception-handling time.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ===================== GROUPED PROJECTS ===================== */}
      <section className="pb-20 md:pb-28" data-testid="projects-grid">
        <div className="container-x space-y-20">
          {ALL_GROUPS.map((group) => {
            const items = ALL_PROJECTS.filter((p) => p.vertical === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <FadeUp>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-[22px] md:text-[26px] font-medium tracking-tight text-[#0A0A0A]">
                      {group}
                    </h2>
                    <div className="flex-1 h-px bg-[#E5E7EB]" />
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF]">
                      {items.length} {items.length === 1 ? "system" : "systems"}
                    </span>
                  </div>
                </FadeUp>
                <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p) => (
                    <StaggerItem key={p.slug}>
                      <ProjectCard project={p} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="pb-28" data-testid="projects-final-cta">
        <div className="container-x text-center">
          <FadeUp>
            <div className="eyebrow mb-6">Your operation next?</div>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] tracking-[-0.02em] leading-[1.05] max-w-[820px] mx-auto">
              Show us the expensive workflow. We'll design the operating layer around it.
            </h2>
            <div className="mt-9">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Book an operations AI call <ArrowRight className="w-4 h-4" />
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
      className="group block card-base p-6 md:p-7 h-full transition-all hover:border-[#1E9BE0]/40 hover:shadow-[0_20px_60px_-20px_rgba(30,155,224,0.18)]"
      data-testid={`project-card-${project.slug}`}
    >
      <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-[#1E9BE0]/12 via-[#1E9BE0]/5 to-[#0A0A0A]/[0.04] border border-[#E5E7EB] flex items-center justify-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-40" />
        <Sparkles className="w-8 h-8 text-[#1E9BE0] relative" />
      </div>
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#6B7280]">
        {project.vertical}
      </div>
      <h3 className="mt-2 text-[20px] md:text-[22px] font-medium tracking-tight text-[#0A0A0A] leading-[1.2]">
        {project.name}
      </h3>
      <p className="mt-3 text-[14px] text-[#4B5563] leading-relaxed">{project.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[#1E9BE0] text-[14px] font-medium">
        See the workflow <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}
