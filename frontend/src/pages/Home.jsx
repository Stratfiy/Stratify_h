import { Link } from "react-router-dom";
import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { FadeUp } from "@/components/Motion";
import SeoHead from "@/components/SeoHead";
import { OPERATIONAL_PROJECTS } from "@/lib/project-additions";

const CAPABILITIES = [
  ["01", "Production & planning", "Capacity, materials, schedules, bottlenecks and delivery risk in one operating layer."],
  ["02", "Procurement intelligence", "RFQs, supplier quotations, approvals, PO follow-up and material exceptions."],
  ["03", "Maintenance & reliability", "Equipment history, condition data, manuals, work orders and failure-risk prioritisation."],
  ["04", "Warehouse & inventory", "Inbound, GRN, put-away, replenishment, picking, dispatch, returns and working capital."],
  ["05", "Industrial documents", "Tenders, drawings, certificates, inspection packs, revisions, approvals and billing evidence."],
  ["06", "Operations control towers", "A shared state across sales, engineering, procurement, production, quality and finance."],
];

const PROCESS = [
  ["01", "Find the expensive workflow", "We map where skilled people lose time, where money waits, and where information breaks between systems."],
  ["02", "Build around your operation", "We connect the ERP, WMS, MES, CRM, documents, email and APIs you already use. No forced rip-and-replace."],
  ["03", "Prove one operating metric", "A focused pilot targets cycle time, manual touches, downtime, throughput, exceptions or working capital."],
  ["04", "Operate and expand", "Once the system proves value, we monitor it, improve it and extend it into adjacent workflows."],
];

const FEATURED = OPERATIONAL_PROJECTS.slice(0, 4);

export default function Home() {
  return (
    <>
      <SeoHead
        title="AI Agency & AI Product Studio India | NAutomation Labs"
        description="NAutomation Labs builds custom AI software for manufacturing, procurement, logistics, warehouses, maintenance and complex business operations."
        path="/"
        keywords={["AI agency India", "AI product studio India", "industrial AI company India", "AI automation company India", "custom AI software India"]}
      />

      <section className="relative overflow-hidden bg-[#F2F0EA] border-b border-[#171717]/15" data-testid="home-hero">
        <div className="container-x pt-24 md:pt-32 pb-12 md:pb-16">
          <FadeUp>
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[#171717]/20 py-3 font-mono text-[10px] md:text-[11px] tracking-[0.16em] uppercase text-[#171717]/60">
              <span>AI product studio · India / Global</span>
              <span>Operational software · built for production</span>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 pt-10 md:pt-14">
            <div className="lg:col-span-9">
              <FadeUp delay={0.04}>
                <h1 className="text-[52px] sm:text-[72px] md:text-[92px] lg:text-[112px] leading-[0.88] tracking-[-0.055em] font-semibold text-[#111111] max-w-[1180px]">
                  We build the software your <span className="text-[#1689C9]">operations</span> are missing.
                </h1>
              </FadeUp>
            </div>
            <div className="lg:col-span-3 lg:flex lg:items-end">
              <FadeUp delay={0.08}>
                <p className="text-[17px] md:text-[18px] leading-[1.55] text-[#343434] max-w-[380px]">
                  Custom AI systems for manufacturing, procurement, logistics, maintenance, warehouses and complex operational workflows.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#111] text-white px-6 py-3.5 text-[14px] font-medium hover:opacity-80 transition-opacity">
                    Map a workflow <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-[#111]/25 px-6 py-3.5 text-[14px] font-medium hover:bg-white/60 transition-colors">
                    See systems <MoveUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>

        <div className="container-x pb-16 md:pb-24">
          <FadeUp delay={0.12}>
            <div className="relative min-h-[360px] md:min-h-[500px] rounded-[28px] md:rounded-[42px] overflow-hidden bg-[#111] text-white p-7 md:p-12">
              <div className="absolute inset-0 opacity-70" style={{backgroundImage:"radial-gradient(circle at 75% 20%, rgba(30,155,224,.55), transparent 30%), radial-gradient(circle at 55% 80%, rgba(63,224,208,.2), transparent 28%)"}} />
              <div className="absolute inset-0 opacity-[0.16]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)", backgroundSize:"56px 56px"}} />
              <div className="relative h-full min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
                <div className="flex justify-between gap-6 font-mono uppercase tracking-[0.16em] text-[10px] text-white/55">
                  <span>Operational intelligence / 2026</span><span>Human decisions stay human</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-end">
                  <div>
                    <div className="text-[13px] text-[#73C9F2] mb-4">01 — From fragmented work to one operating layer</div>
                    <h2 className="text-[38px] md:text-[60px] leading-[0.98] tracking-[-0.035em] max-w-[650px]">Documents. Data. Decisions. One system around the way your team actually works.</h2>
                  </div>
                  <div className="md:justify-self-end w-full md:max-w-[390px] grid grid-cols-2 gap-px bg-white/20 border border-white/20">
                    {["ERP / WMS / MES","Email + documents","AI reasoning","Approval + audit","Exception queues","Operational analytics"].map((x) => <div key={x} className="bg-[#111]/70 backdrop-blur p-4 text-[12px] text-white/70 min-h-[74px] flex items-end">{x}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#FBFAF7] py-20 md:py-28 border-b border-[#171717]/15">
        <div className="container-x">
          <FadeUp>
            <div className="grid lg:grid-cols-12 gap-8 mb-14">
              <div className="lg:col-span-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#777]">What we build</div>
              <h2 className="lg:col-span-8 text-[38px] md:text-[60px] leading-[1.02] tracking-[-0.035em]">AI earns its place when it changes an operating metric.</h2>
            </div>
          </FadeUp>
          <div className="border-t border-[#171717]/20">
            {CAPABILITIES.map(([n,title,desc]) => (
              <FadeUp key={n}>
                <div className="grid md:grid-cols-12 gap-5 py-7 md:py-9 border-b border-[#171717]/20 group">
                  <div className="md:col-span-1 font-mono text-[11px] text-[#1689C9]">{n}</div>
                  <div className="md:col-span-4 text-[24px] md:text-[30px] tracking-[-0.02em]">{title}</div>
                  <p className="md:col-span-6 text-[15px] md:text-[16px] text-[#5A5A5A] leading-relaxed max-w-[650px]">{desc}</p>
                  <ArrowRight className="hidden md:block md:col-span-1 w-5 h-5 justify-self-end group-hover:translate-x-1 transition-transform" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] text-white py-20 md:py-28">
        <div className="container-x">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
              <div><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#73C9F2] mb-5">Selected systems</div><h2 className="text-[42px] md:text-[66px] leading-[0.98] tracking-[-0.04em] max-w-[780px]">Built around expensive operational problems.</h2></div>
              <Link to="/projects" className="inline-flex items-center gap-2 text-[14px] border-b border-white/40 pb-1">View all systems <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURED.map((p, i) => (
              <FadeUp key={p.slug} delay={i * .03}>
                <Link to={`/projects/${p.slug}`} className="group block min-h-[330px] md:min-h-[390px] rounded-[26px] border border-white/15 p-7 md:p-9 relative overflow-hidden hover:border-white/35 transition-colors">
                  <div className="absolute -right-16 -bottom-20 w-64 h-64 rounded-full bg-[#1689C9]/20 blur-3xl group-hover:bg-[#1689C9]/30 transition-colors" />
                  <div className="relative h-full flex flex-col justify-between min-h-[275px] md:min-h-[325px]">
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/45"><span>0{i+1}</span><span>{p.vertical}</span></div>
                    <div><h3 className="text-[30px] md:text-[38px] leading-[1.02] tracking-[-0.03em] max-w-[520px]">{p.name}</h3><p className="mt-5 text-[14px] md:text-[15px] text-white/55 leading-relaxed max-w-[520px]">{p.summary}</p><span className="mt-7 inline-flex items-center gap-2 text-[13px] text-[#73C9F2]">See workflow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span></div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#DDEFF8] py-20 md:py-28 border-y border-[#111]/10">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <FadeUp className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#39728F] mb-5">Why NAutomation Labs</div>
            <h2 className="text-[42px] md:text-[62px] leading-[0.98] tracking-[-0.04em]">Built from inside operations, not from an automation template.</h2>
          </FadeUp>
          <FadeUp className="lg:col-span-7 lg:pt-2">
            <p className="text-[20px] md:text-[25px] leading-[1.45] tracking-[-0.015em] text-[#1D3039]">Our founder has hands-on Fortune 500 experience building and working around procurement, maintenance, supply-chain and cross-functional operational workflows. That changes where we start: with the process, economics and decision boundaries — not with a model or automation tool.</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {["Workflow-first discovery","Existing-system integration","Human approval for consequential actions","Production monitoring + continuous improvement"].map(x => <div key={x} className="flex gap-3 border-t border-[#111]/20 pt-4 text-[14px]"><Check className="w-4 h-4 mt-0.5" />{x}</div>)}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#FBFAF7] py-20 md:py-28">
        <div className="container-x">
          <FadeUp><div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#777] mb-5">How we work</div><h2 className="text-[42px] md:text-[64px] leading-[1] tracking-[-0.04em] max-w-[850px]">Start narrow. Prove the economics. Expand where the operation benefits.</h2></FadeUp>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#111]/20">
            {PROCESS.map(([n,t,d]) => <FadeUp key={n}><div className="min-h-[300px] p-6 md:p-7 border-r border-b border-[#111]/20 flex flex-col justify-between"><span className="font-mono text-[11px] text-[#1689C9]">{n}</span><div><h3 className="text-[22px] tracking-[-0.02em]">{t}</h3><p className="mt-4 text-[14px] leading-relaxed text-[#626262]">{d}</p></div></div></FadeUp>)}
          </div>
        </div>
      </section>

      <section className="bg-[#1689C9] text-white py-20 md:py-28">
        <div className="container-x">
          <FadeUp>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/65 mb-6">Bring us the bottleneck</div>
            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <h2 className="lg:col-span-9 text-[48px] md:text-[78px] lg:text-[92px] leading-[0.92] tracking-[-0.05em]">Where is your operation losing time, capacity or working capital?</h2>
              <div className="lg:col-span-3"><p className="text-white/75 text-[15px] leading-relaxed mb-7">We will structure the workflow before proposing the build.</p><Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[#111] px-6 py-3.5 text-[14px] font-medium">Book a strategy call <ArrowRight className="w-4 h-4" /></Link></div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
