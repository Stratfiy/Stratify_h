import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { PROJECTS, PROJECT_GROUPS } from "@/lib/site-data";
import { OPERATIONAL_PROJECTS, OPERATIONAL_PROJECT_GROUPS } from "@/lib/project-additions";

const ALL_PROJECTS = [...OPERATIONAL_PROJECTS, ...PROJECTS];
const ALL_GROUPS = Array.from(new Set([...OPERATIONAL_PROJECT_GROUPS, ...PROJECT_GROUPS]));

export default function Projects() {
  return (
    <>
      <section className="relative pt-28 md:pt-40 pb-16 overflow-hidden" data-testid="projects-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Selected systems</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.035em] font-medium max-w-[1080px]">
              Operational software for <span className="text-[#1689C9]">expensive workflows.</span>
            </h1>
            <p className="mt-7 text-[17px] md:text-[19px] text-[#4B5563] max-w-[820px] leading-relaxed">
              Custom AI-native systems for production, maintenance, procurement, warehouses, inventory,
              logistics, quality, document-heavy operations, and cross-functional execution.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="pb-20 md:pb-28" data-testid="projects-grid">
        <div className="container-x space-y-20">
          {ALL_GROUPS.map((group) => {
            const items = ALL_PROJECTS.filter((p) => p.vertical === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                <FadeUp>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-[22px] md:text-[26px] font-medium tracking-tight text-[#0A0A0A]">{group}</h2>
                    <div className="flex-1 h-px bg-[#D9D9D4]" />
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF]">
                      {items.length} {items.length === 1 ? "system" : "systems"}
                    </span>
                  </div>
                </FadeUp>
                <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <section className="pb-28" data-testid="projects-final-cta">
        <div className="container-x text-center">
          <FadeUp>
            <div className="eyebrow mb-6">Your operation next?</div>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] tracking-[-0.03em] leading-[1.05] max-w-[820px] mx-auto">
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
      className="group block h-full"
      data-testid={`project-card-${project.slug}`}
    >
      <ProjectThumbnail project={project} />
      <div className="pt-5 px-1">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#777]">{project.vertical}</div>
        <h3 className="mt-2 text-[22px] md:text-[25px] font-medium tracking-[-0.025em] text-[#111] leading-[1.15]">{project.name}</h3>
        <p className="mt-3 text-[14px] text-[#5B5B5B] leading-relaxed line-clamp-3">{project.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[#1689C9] text-[13px] font-medium border-b border-[#1689C9]/30 pb-0.5">
          See workflow <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

function ProjectThumbnail({ project }) {
  const key = project.slug;
  const isWarehouse = /warehouse|inventory|fleet|supply|logistics/.test(key);
  const isProcurement = /procurement|source|rfq/.test(key);
  const isMaintenance = /maintenance|factory|thermal|safety|emission/.test(key);
  const isQuality = /quality|capa|defect/.test(key);
  const isIndustrialDocs = /document|oilfield|operations-os/.test(key);

  return (
    <div className="relative aspect-[16/10] rounded-[22px] overflow-hidden border border-[#171717]/15 bg-[#F2F0EA] group-hover:-translate-y-1 transition-transform duration-300">
      <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(17,17,17,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,.06) 1px, transparent 1px)",backgroundSize:"30px 30px"}} />
      <div className="absolute top-4 left-4 right-4 flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-[#555]">
        <span>NA / {project.vertical}</span><span>LIVE SYSTEM</span>
      </div>

      {isWarehouse && <WarehouseVisual />}
      {isProcurement && <ProcurementVisual />}
      {isMaintenance && <MaintenanceVisual />}
      {isQuality && <QualityVisual />}
      {isIndustrialDocs && <DocumentVisual />}
      {!isWarehouse && !isProcurement && !isMaintenance && !isQuality && !isIndustrialDocs && <GenericVisual project={project} />}

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="rounded-full bg-[#111] text-white text-[9px] px-3 py-1.5 font-mono uppercase tracking-[0.13em]">{project.name}</span>
        <span className="w-8 h-8 rounded-full border border-[#111]/20 bg-white/70 backdrop-blur flex items-center justify-center"><ArrowRight className="w-3.5 h-3.5" /></span>
      </div>
    </div>
  );
}

function WarehouseVisual() {
  return <div className="absolute inset-x-5 top-14 bottom-14 grid grid-cols-6 gap-1.5 items-end">
    {[56,82,68,92,43,76,64,88,52,95,72,61].map((h,i)=><div key={i} className="relative h-full"><div className="absolute bottom-0 inset-x-0 rounded-sm bg-[#D4EAF5] border border-[#1689C9]/30" style={{height:`${h}%`}}><div className="absolute top-2 left-1.5 text-[7px] font-mono text-[#39728F]">Z{i+1}</div></div></div>)}
    <div className="absolute top-4 right-5 bg-white border border-[#111]/15 rounded-xl p-3 shadow-sm w-[130px]"><div className="text-[8px] font-mono uppercase text-[#777]">Exceptions</div><div className="mt-1 text-[20px] tracking-tight">07</div><div className="mt-2 h-1.5 bg-[#E6E6E1] rounded-full overflow-hidden"><div className="h-full w-[62%] bg-[#1689C9]" /></div></div>
  </div>;
}
function ProcurementVisual() {
  return <div className="absolute inset-x-6 top-14 bottom-14 flex items-center gap-2">
    {["RFQ","Quotes","Compare","Approve","PO"].map((x,i)=><div key={x} className="flex-1"><div className={`rounded-lg border p-3 min-h-[92px] ${i===2?'bg-[#1689C9] text-white border-[#1689C9]':'bg-white/75 border-[#111]/15'}`}><div className="font-mono text-[8px] opacity-60">0{i+1}</div><div className="mt-7 text-[10px] font-medium">{x}</div></div>{i<4&&<div className="h-px bg-[#111]/30 mt-[-47px] translate-x-[90%] w-[24px]" />}</div>)}
  </div>;
}
function MaintenanceVisual() {
  return <div className="absolute inset-x-6 top-14 bottom-14 grid grid-cols-12 gap-3 items-end">
    <div className="col-span-7 h-full bg-[#111] rounded-xl p-4 text-white relative overflow-hidden"><div className="font-mono text-[8px] uppercase text-white/50">Asset health</div><svg viewBox="0 0 240 90" className="absolute left-3 right-3 bottom-4 w-[92%] h-[65%]"><polyline points="0,70 30,66 55,62 80,55 105,58 130,42 155,48 180,30 205,36 240,18" fill="none" stroke="#73C9F2" strokeWidth="3"/><line x1="0" y1="50" x2="240" y2="50" stroke="rgba(255,255,255,.18)" strokeDasharray="5 5"/></svg></div>
    <div className="col-span-5 space-y-2"><div className="bg-white/80 border border-[#111]/15 rounded-lg p-3"><div className="text-[8px] font-mono text-[#777]">RISK</div><div className="text-[24px] mt-1">82%</div></div><div className="bg-[#F3D9D5] border border-[#9C4638]/20 rounded-lg p-3 text-[9px]">Bearing vibration ↑</div></div>
  </div>;
}
function QualityVisual() {
  return <div className="absolute inset-x-6 top-14 bottom-14 grid grid-cols-2 gap-3">
    <div className="bg-white/80 border border-[#111]/15 rounded-xl p-4"><div className="font-mono text-[8px] text-[#777] uppercase">NCR trend</div><div className="mt-8 flex items-end gap-2 h-[80px]">{[34,61,42,76,50,29].map((h,i)=><div key={i} className="flex-1 bg-[#1689C9]/20 border-t-2 border-[#1689C9]" style={{height:`${h}%`}} />)}</div></div>
    <div className="bg-[#111] rounded-xl p-4 text-white"><div className="font-mono text-[8px] text-white/50 uppercase">CAPA queue</div>{["Root cause review","Supplier action","Closure evidence"].map((x,i)=><div key={x} className="mt-3 flex items-center justify-between border-b border-white/15 pb-2 text-[9px]"><span>{x}</span><span className="text-[#73C9F2]">0{i+2}</span></div>)}</div>
  </div>;
}
function DocumentVisual() {
  return <div className="absolute inset-x-6 top-14 bottom-14 flex items-center justify-center">
    <div className="w-[62%] h-[80%] bg-white border border-[#111]/15 rounded-lg shadow-sm p-4 rotate-[-3deg]"><div className="h-2 w-1/3 bg-[#111]/70 rounded"/><div className="mt-4 space-y-2">{[90,75,82,60,88].map((w,i)=><div key={i} className="h-1.5 bg-[#D8D8D3] rounded" style={{width:`${w}%`}} />)}</div><div className="mt-5 grid grid-cols-3 gap-2">{[1,2,3].map(i=><div key={i} className="h-9 bg-[#EAF4F9] border border-[#1689C9]/20 rounded" />)}</div></div>
    <div className="absolute right-[13%] top-[28%] bg-[#1689C9] text-white rounded-xl p-3 shadow-lg w-[120px]"><div className="text-[8px] font-mono uppercase opacity-70">Extracted</div><div className="mt-2 text-[10px]">12 fields</div><div className="mt-1 text-[10px]">2 exceptions</div></div>
  </div>;
}
function GenericVisual({project}) {
  return <div className="absolute inset-x-6 top-14 bottom-14 grid grid-cols-3 gap-2 items-center">
    {["Input","AI layer","Action"].map((x,i)=><div key={x} className={`rounded-xl border p-4 min-h-[110px] flex flex-col justify-between ${i===1?'bg-[#111] text-white border-[#111]':'bg-white/75 border-[#111]/15'}`}><span className="font-mono text-[8px] opacity-55">0{i+1}</span><span className="text-[10px]">{x}</span></div>)}
  </div>;
}
