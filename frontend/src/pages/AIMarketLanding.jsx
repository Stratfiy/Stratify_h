import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/Motion";
import SeoHead from "@/components/SeoHead";

const PAGE_DATA = {
  "ai-agency-india": {
    title: "AI Agency India | Custom AI Systems & Automation | NAutomation Labs",
    description: "NAutomation Labs is an AI agency in India building custom AI systems for operations, manufacturing, logistics, procurement, warehouses and document-heavy workflows.",
    eyebrow: "AI agency in India",
    h1: "An AI agency built for operational problems, not generic automation.",
    intro: "NAutomation Labs designs and ships custom AI systems around the way teams already work. We focus on expensive operational workflows where manual coordination, documents, approvals, exceptions and disconnected systems create measurable cost.",
    keywords: ["AI agency India", "AI automation agency India", "AI solutions company India", "custom AI company India", "enterprise AI agency India"],
    sections: [
      ["What makes us different from a typical AI agency", "We do not begin with a chatbot, a model or an automation tool. We begin with the workflow: where information enters, who touches it, what documents are involved, what decisions are repeated, where exceptions occur, and what delays or errors cost. Then we build the smallest production system that can improve a measurable operating metric."],
      ["Where we work", "Our strongest use cases sit in manufacturing, supply chain, logistics, warehousing, inventory-heavy businesses, procurement, industrial maintenance, oil and gas services, EPC, quality, field operations and other document-heavy industries. We also build AI products for commerce and service operations when the workflow is large enough to justify a custom system."],
      ["What we build", "Typical systems include RFQ and tender intelligence, production planning, maintenance and reliability platforms, warehouse exception control, inventory planning, procurement workbenches, document intelligence, quality and NCR/CAPA workflows, logistics control towers, cross-functional operations platforms and AI agents connected to existing ERP, CRM, WMS, MES, telematics and internal tools."],
      ["How engagements work", "We map one high-value workflow, establish a baseline, build a focused pilot, measure the result, then expand into adjacent processes. Production support, monitoring, integrations and ongoing improvement are treated as part of the system lifecycle rather than an afterthought."],
    ],
    proof: ["Fortune 500 procurement automation experience", "Production systems across India and international markets", "Industrial, supply-chain and maintenance workflows", "Custom software + AI + integration, not template automation"],
  },
  "ai-product-studio-india": {
    title: "AI Product Studio India | Build Production AI Software | NAutomation Labs",
    description: "AI product studio in India for custom AI-native software, operational platforms, AI agents and enterprise workflow products built from discovery through production support.",
    eyebrow: "AI product studio in India",
    h1: "We turn operational problems into production AI products.",
    intro: "NAutomation Labs is an AI product studio for companies that need more than a proof of concept. We design, build, deploy and evolve AI-native software that fits existing teams, data and systems.",
    keywords: ["AI product studio India", "AI studio India", "AI development studio India", "AI product development company India", "AI native product studio"],
    sections: [
      ["Product thinking before model selection", "A useful AI product needs a clear user, workflow, decision boundary and economic outcome. We define those first, then choose the right models, data architecture, interfaces and integrations. The result should feel like purpose-built software, not an LLM demo wrapped in a dashboard."],
      ["Internal platforms and customer-facing products", "We build both internal operating systems and external AI products: procurement workbenches, production-control applications, maintenance platforms, inventory intelligence, document workflows, AI assistants, operational control towers and vertical products such as voice agents."],
      ["Production engineering", "A production AI product needs authentication, permissions, observability, fallbacks, evaluation, audit trails, human approval for consequential actions, integration reliability and a plan for model or workflow drift. Those concerns are built into the architecture from the start."],
      ["From focused pilot to platform", "The first release should prove one business metric quickly. Once it does, we expand into connected workflows instead of rebuilding from scratch. This creates a practical path from a focused pilot to a durable internal product or commercial platform."],
    ],
    proof: ["AI-native product architecture", "Human-in-the-loop controls", "ERP/CRM/operations integrations", "Ongoing engineering after launch"],
  },
  "industrial-ai-company-india": {
    title: "Industrial AI Company India | Manufacturing AI Solutions | NAutomation Labs",
    description: "Industrial AI company in India building manufacturing AI solutions for predictive maintenance, production planning, quality, inventory, procurement and plant operations.",
    eyebrow: "Industrial AI company in India",
    h1: "Industrial AI that connects plant data to real operating decisions.",
    intro: "We build custom industrial AI software for manufacturers and operations-heavy businesses. The focus is not another dashboard. It is reducing downtime, planning friction, manual document work, inventory exposure, quality escapes and the time engineers spend coordinating information between systems.",
    keywords: ["industrial AI company India", "manufacturing AI solutions India", "AI for manufacturing India", "predictive maintenance AI India", "production planning AI India", "smart manufacturing AI company"],
    sections: [
      ["Predictive maintenance and reliability", "Combine equipment history, condition readings, IoT or SCADA data, work orders, OEM manuals and spare-part information to identify developing risk, prioritise maintenance and give engineers the evidence needed to act before breakdown."],
      ["Production planning and capacity", "Bring orders, BOMs, materials, machine capacity, manpower, changeovers and due dates into one planning layer. The system can identify bottlenecks, material shortages, schedule risk and re-planning options while keeping planners in control."],
      ["Quality and compliance", "Use inspection records, NCRs, CAPAs, production parameters, images and complaints to surface recurring failure patterns, support root-cause work and maintain an auditable trail from issue to corrective action."],
      ["Procurement, materials and inventory", "Connect RFQs, supplier quotes, purchase history, lead times, inventory, BOM demand and delivery status. AI can structure documents, compare quotations, identify exceptions and help teams focus on the purchases and shortages that threaten production."],
    ],
    proof: ["Maintenance + production + procurement workflows", "Works with existing ERP, SCADA, MES and IoT", "Explainable recommendations and approvals", "Built for phased plant rollout"],
  },
  "ai-automation-company-india": {
    title: "AI Automation Company India | Custom Workflow Systems | NAutomation Labs",
    description: "AI automation company in India building custom workflow systems that reduce manual effort across procurement, logistics, finance, operations and document-heavy processes.",
    eyebrow: "AI automation company in India",
    h1: "Automate the expensive workflow, not just the easy task.",
    intro: "Our automation work targets workflows where skilled people repeatedly move information between email, spreadsheets, PDFs, calls, approvals and enterprise systems. We build a software layer that handles repetitive steps while preserving human control over professional decisions.",
    keywords: ["AI automation company India", "AI automation agency India", "workflow automation company India", "business process AI automation", "enterprise AI automation India"],
    sections: [
      ["Document-heavy automation", "Extract, classify, validate and route information from quotations, purchase documents, tenders, invoices, inspection records, shipping documents, contracts, technical specifications and operational reports."],
      ["Cross-system workflows", "Connect the tools teams already use rather than forcing a rip-and-replace project. Systems can read and write across ERP, CRM, WMS, ticketing, email, document stores, APIs and custom databases with exception queues when automation should stop."],
      ["Operational agents", "Agents can prepare work, chase missing information, generate structured drafts, compare options and escalate exceptions. High-impact actions can require approval, leaving an auditable record of what the system proposed and what a person decided."],
      ["Measure the economics", "Every project should have a baseline such as cycle time, manual touches, exception rate, operating cost, throughput, response time or working capital. That makes expansion decisions based on operating results rather than AI novelty."],
    ],
    proof: ["Workflow-first discovery", "Custom integration and software", "Document AI and operational agents", "Measurable baseline-to-production approach"],
  },
  "ai-development-company-india": {
    title: "AI Development Company India | Custom AI Software | NAutomation Labs",
    description: "Custom AI development company in India building production AI applications, agents, RAG systems, operational software and enterprise integrations.",
    eyebrow: "AI development company in India",
    h1: "Custom AI software engineered for production operations.",
    intro: "NAutomation Labs develops AI applications that sit inside real business processes. We combine product engineering, AI, workflow design, integrations and ongoing production support so the system can be owned, used and improved after launch.",
    keywords: ["AI development company India", "custom AI development India", "AI software development company India", "AI agent development company India", "generative AI development India"],
    sections: [
      ["Custom AI applications", "Internal tools, operational dashboards, planning systems, AI workbenches, document-processing applications, vertical SaaS and customer-facing AI experiences designed around your workflow and data."],
      ["AI agents and RAG", "We build task-focused agents and retrieval systems with grounding, citations, permissions, evaluation and escalation. The objective is dependable work completion, not autonomous behaviour for its own sake."],
      ["Enterprise integration", "Production systems often need to coexist with ERP, CRM, MES, WMS, databases, document stores and internal APIs. Integration design, identity, auditability and failure handling are part of delivery."],
      ["Operate and evolve", "After deployment, useful AI systems need monitoring, evaluation, prompt or model updates, workflow changes, connector maintenance and additional features. We design engagements so the product can continue improving instead of becoming a stranded pilot."],
    ],
    proof: ["End-to-end product engineering", "RAG, agents and document intelligence", "Enterprise integration", "Monitoring and ongoing evolution"],
  },
};

const BASE = "https://nautomationlabs.com";

export default function AIMarketLanding({ pageKey }) {
  const route = useParams();
  const key = pageKey || route.pageKey;
  const page = PAGE_DATA[key];
  if (!page) return <Navigate to="/" replace />;

  const path = `/${key}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NAutomation Labs",
    url: `${BASE}${path}`,
    areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Canada", "Australia"],
    serviceType: page.keywords,
    description: page.description,
  };

  return (
    <>
      <SeoHead title={page.title} description={page.description} path={path} keywords={page.keywords} schema={schema} />

      <section className="relative pt-28 md:pt-40 pb-20 overflow-hidden bg-brand-navy text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow text-[#4FB8EE]">{page.eyebrow}</div>
            <h1 className="mt-6 text-[40px] md:text-[62px] lg:text-[76px] leading-[1.03] tracking-[-0.03em] font-extrabold max-w-[1100px]">
              {page.h1}
            </h1>
            <p className="mt-7 text-[18px] md:text-[21px] leading-relaxed text-white/70 max-w-[820px]">{page.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Discuss your workflow <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/projects" className="btn-outline-dark">See systems we build <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 md:py-28 border-b border-[#E5E7EB]">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-14">
            {page.sections.map(([heading, copy]) => (
              <FadeUp key={heading}>
                <h2 className="text-[28px] md:text-[38px] leading-tight tracking-[-0.02em]">{heading}</h2>
                <p className="mt-4 text-[16px] md:text-[17px] text-[#4B5563] leading-[1.8]">{copy}</p>
              </FadeUp>
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="card-base p-7 sticky top-24">
              <div className="eyebrow mb-5">Built for production</div>
              <div className="space-y-4">
                {page.proof.map((item) => (
                  <div key={item} className="flex gap-3 text-[14px] leading-relaxed text-[#1F2937]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#00A37D] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                <Link to="/industries" className="text-[#1E9BE0] font-medium inline-flex items-center gap-1.5">Explore industries <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-5">High-value systems</div>
            <h2 className="text-[34px] md:text-[52px] tracking-[-0.025em] leading-tight max-w-[900px]">Where AI earns its place in the operating model.</h2>
          </FadeUp>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Production planning & capacity", "Warehouse & inventory control", "Predictive maintenance", "RFQ & procurement intelligence", "Quality / NCR / CAPA", "Logistics exception control", "Industrial document intelligence", "Cross-functional operations OS"].map((item) => (
              <div key={item} className="card-base p-5 text-[15px] font-medium text-[#111827]">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x text-center">
          <FadeUp>
            <div className="eyebrow mb-5">Start with one expensive workflow</div>
            <h2 className="text-[36px] md:text-[54px] tracking-[-0.025em] leading-tight max-w-[850px] mx-auto">Map the bottleneck. Build the system. Measure the operating result.</h2>
            <p className="mt-6 text-[#4B5563] text-[17px] max-w-[680px] mx-auto leading-relaxed">Bring us the workflow that consumes the most skilled time, creates the most delay, or puts the most money at risk. We will structure the problem before proposing the build.</p>
            <div className="mt-9"><Link to="/contact" className="btn-primary text-base px-8 py-4">Book a strategy call <ArrowRight className="w-4 h-4" /></Link></div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
