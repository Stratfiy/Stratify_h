// High-value operational systems built from hands-on enterprise workflow experience.
// These are deliberately framed around business systems and measurable operating outcomes,
// not around automation tooling.

export const OPERATIONAL_PROJECTS = [
  {
    slug: "production-planning-control-tower",
    name: "Production Planning & Capacity Control Tower",
    vertical: "Manufacturing",
    summary: "AI-assisted production planning across orders, BOMs, materials, machine capacity, manpower, changeovers, and delivery commitments.",
    stack: ["ERP / order ingestion", "BOM + routing intelligence", "Capacity planning", "Constraint detection", "Exception workflows", "Planning dashboards"],
    useCase: "Production planners often reconcile orders, BOMs, material availability, machine capacity, manpower, changeovers, and promised delivery dates across ERP screens and spreadsheets. This system creates a single planning layer that identifies shortages and bottlenecks before release, recommends feasible schedules, surfaces late-order risk, and re-plans when material or machine availability changes. Human planners retain approval while the repetitive reconciliation and exception detection is handled continuously.",
    numbers: [
      { value: "1 view", label: "Orders, materials, capacity + due dates" },
      { value: "Earlier", label: "Bottleneck + shortage visibility" },
      { value: "Continuous", label: "Re-planning as conditions change" },
    ],
  },
  {
    slug: "warehouse-inventory-control",
    name: "Warehouse & Inventory Control System",
    vertical: "Supply Chain",
    summary: "Operational control across inbound, GRN, put-away, replenishment, picking, dispatch, returns, and inventory exceptions.",
    stack: ["WMS / ERP integration", "Inventory intelligence", "Replenishment logic", "Exception management", "Document capture", "Operations dashboard"],
    useCase: "Warehouses lose time and working capital when inbound receipts, GRNs, put-away, replenishment, picking, dispatch, returns, and inventory adjustments are handled across disconnected systems and manual follow-ups. This operating layer unifies inventory movement and exceptions, highlights stock mismatches and aging inventory, predicts replenishment needs, prioritises shortages, and creates role-based action queues for warehouse, procurement, and operations teams.",
    numbers: [
      { value: "End-to-end", label: "Inbound → storage → dispatch → returns" },
      { value: "Lower", label: "Inventory exception handling time" },
      { value: "Higher", label: "Working-capital visibility" },
    ],
  },
  {
    slug: "procurement-rfq-intelligence",
    name: "Procurement & RFQ Intelligence Platform",
    vertical: "Supply Chain",
    summary: "Requirement-to-RFQ workflow with quotation comparison, supplier intelligence, approvals, PO follow-up, and delivery exceptions.",
    stack: ["Document intelligence", "ERP integration", "Supplier history", "Quote comparison", "Approval workflows", "Exception queues"],
    useCase: "Procurement teams spend significant time translating requirements into RFQs, collecting supplier responses, normalising quotations, comparing technical and commercial terms, chasing approvals, tracking POs, and escalating delayed material. This system structures requirements, compares supplier offers against historical buying data, flags commercial and delivery exceptions, routes approvals, and tracks the transaction through PO and receipt while preserving human decision-making on sourcing and award.",
    numbers: [
      { value: "End-to-end", label: "Requirement → RFQ → PO → receipt" },
      { value: "Faster", label: "Quote comparison + approval cycles" },
      { value: "Auditable", label: "Human-approved sourcing decisions" },
    ],
  },
  {
    slug: "predictive-maintenance-reliability",
    name: "Predictive Maintenance & Reliability Intelligence",
    vertical: "Manufacturing",
    summary: "Equipment health and maintenance prioritisation using breakdown history, readings, work orders, OEM documentation, and live condition data where available.",
    stack: ["Maintenance history", "IoT / SCADA optional", "OEM manual RAG", "Failure-risk scoring", "Work-order workflows", "Spares planning"],
    useCase: "Maintenance teams often have equipment history, work orders, breakdown records, manual readings, OEM manuals, and condition data scattered across systems. This reliability layer combines those signals to rank assets by failure risk, identify recurring failure modes, surface the relevant maintenance procedure, recommend intervention windows, and connect each finding to work-order and spare-parts workflows. It can operate with historical and manual data first, then improve as live sensor data becomes available.",
    numbers: [
      { value: "Risk-ranked", label: "Maintenance priorities by asset" },
      { value: "Earlier", label: "Failure-pattern visibility" },
      { value: "Connected", label: "Finding → work order → spares" },
    ],
  },
  {
    slug: "quality-ncr-capa-platform",
    name: "Quality, NCR & CAPA Intelligence",
    vertical: "Manufacturing",
    summary: "Inspection, non-conformance, complaint, root-cause, and CAPA workflows connected to production and supplier history.",
    stack: ["Inspection data", "NCR workflows", "Root-cause retrieval", "CAPA tracking", "Supplier / batch history", "Document intelligence"],
    useCase: "Quality teams repeatedly investigate similar defects while inspection records, NCRs, customer complaints, supplier information, process parameters, and corrective actions remain fragmented. This system consolidates the evidence, finds recurring patterns, surfaces similar historical cases, drafts investigation starting points, tracks CAPA ownership and due dates, and gives management a live view of repeat defects and unresolved risk without replacing engineering or quality judgement.",
    numbers: [
      { value: "One chain", label: "Inspection → NCR → RCA → CAPA" },
      { value: "Faster", label: "Recurring-defect identification" },
      { value: "Visible", label: "Open quality risk by owner + site" },
    ],
  },
  {
    slug: "industrial-document-control",
    name: "Industrial Document & Workflow Control",
    vertical: "Industrial Operations",
    summary: "Document-heavy operational workflows across tenders, drawings, technical submittals, certifications, approvals, inspection packs, and billing support.",
    stack: ["OCR + document extraction", "RAG", "Version control", "Approval routing", "Metadata validation", "ERP / DMS integration"],
    useCase: "In EPC, oilfield services, construction, industrial supply, and engineering businesses, expensive work is slowed by documents: tenders, drawings, specifications, vendor data, certificates, inspection reports, approvals, material records, and billing support. This platform extracts and validates key information, tracks document status and revisions, routes approvals, identifies missing evidence, and gives teams a single exception queue instead of chasing files across email, shared drives, and messaging apps.",
    numbers: [
      { value: "One queue", label: "Missing docs, approvals + exceptions" },
      { value: "Traceable", label: "Revision + approval history" },
      { value: "Less", label: "Manual document chasing" },
    ],
  },
  {
    slug: "oilfield-job-readiness",
    name: "Oilfield / EPC Job Readiness Platform",
    vertical: "Industrial Operations",
    summary: "Tender-to-field-execution control across technical scope, materials, procurement, equipment, crew, certifications, reporting, and billing readiness.",
    stack: ["Tender extraction", "Material readiness", "Equipment readiness", "Crew + certification checks", "Field reporting", "Billing document control"],
    useCase: "Oilfield service and EPC jobs are expensive to delay because technical scope, materials, purchased items, equipment, crew, certifications, permits, field reports, and billing documentation must all be ready together. This platform converts the job into a structured readiness model, highlights blockers by owner, tracks procurement and equipment status, validates required documentation, and carries the workflow from tender or work order through mobilisation, execution, reporting, and invoice readiness.",
    numbers: [
      { value: "One view", label: "Scope + material + equipment + crew" },
      { value: "Earlier", label: "Mobilisation blockers surfaced" },
      { value: "End-to-end", label: "Tender / WO → field → billing" },
    ],
  },
  {
    slug: "cross-functional-operations-os",
    name: "Cross-Functional Operations OS",
    vertical: "Industrial Operations",
    summary: "A custom operating layer connecting sales, engineering, procurement, production, quality, maintenance, dispatch, and finance around the real workflow.",
    stack: ["ERP / CRM integration", "Workflow engine", "Document intelligence", "Role-based action queues", "Operational analytics", "AI assistants"],
    useCase: "The highest-cost operational problems rarely live inside one department. A customer requirement moves through sales, engineering, procurement, production, quality, maintenance, dispatch, and finance while information is re-entered in spreadsheets, emails, PDFs, ERP screens, and messaging threads. This system creates a shared operational object, keeps every team on the same state, automates repetitive transitions, and escalates only the exceptions that require professional judgement. It is built around the company's actual process rather than forcing the process into another generic SaaS tool.",
    numbers: [
      { value: "Cross-functional", label: "Commercial → operations → finance" },
      { value: "Lower", label: "Manual handoffs + duplicate entry" },
      { value: "Live", label: "Management exception view" },
    ],
  },
];

export const OPERATIONAL_PROJECT_GROUPS = [
  "Manufacturing",
  "Supply Chain",
  "Industrial Operations",
];
