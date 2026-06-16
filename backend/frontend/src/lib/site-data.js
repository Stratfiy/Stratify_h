// NAutomation Labs — site-wide data
// Repositioned: AI operating layer for industry. Sources: 8 industry solution docs.

/* ----------------------------------------------------------------------------
   PLATFORM ENGINE — the architectural spine beneath every industry use case.
---------------------------------------------------------------------------- */
export const ENGINE = [
  {
    key: "iot",
    title: "Sensor & IoT integration",
    desc: "Live ingestion from IoT sensors, PLCs, telematics, environmental monitors, and existing SCADA/DCS systems. We integrate with your instrumentation — no rip-and-replace.",
  },
  {
    key: "vision",
    title: "AI vision on the edge",
    desc: "Camera-based detection running on edge appliances at your site. Video never leaves your premises; only event metadata and snapshots reach the platform.",
  },
  {
    key: "thresholds",
    title: "Two-layer threshold intelligence",
    desc: "Manager-set operational limits combined with OEM tolerances and SOP limits extracted from your own uploaded documents. Breaches flagged with reasoning, not black-box alerts.",
  },
  {
    key: "escalation",
    title: "Automated alert & calling system",
    desc: "Critical breaches escalate automatically — app, WhatsApp, SMS, email, and automated voice calls to the responsible engineer and supervisor, in their language, until acknowledged.",
  },
  {
    key: "rag",
    title: "Retrieval-grounded intelligence",
    desc: "Every AI answer, drafted procedure, and corrective work order cites the source document and section. AI retrieves human-authored content; it never generates safety-critical content.",
  },
  {
    key: "maintenance",
    title: "Complete maintenance suite",
    desc: "Preventive maintenance scheduling, work orders with permit-to-work types, QR-based requests, MTTR/MTBF dashboards, AI shift-handover summaries, and post-work completion capture.",
  },
];

/* ----------------------------------------------------------------------------
   SERVICES — the platform capabilities (industry-agnostic).
---------------------------------------------------------------------------- */
export const SERVICES = [
  {
    slug: "predictive-maintenance",
    name: "Predictive Maintenance",
    short: "Failures flagged weeks ahead",
    desc: "Vibration, temperature, current, and oil trends monitored continuously against learned baselines and OEM tolerances. Developing failures flagged with reasoning; corrective work orders drafted before the line stops.",
    bullets: [
      "Continuous condition monitoring vs OEM tolerances",
      "Weeks of lead time with explainable reasoning",
      "Auto-drafted work orders with spares + procedures",
      "30–50% reduction in unplanned downtime",
    ],
  },
  {
    slug: "ai-vision",
    name: "AI Vision & Safety Monitoring",
    short: "Continuous eyes on high-risk zones",
    desc: "Edge AI vision for PPE compliance, restricted-zone enforcement, permit verification, defect detection, and quality inspection at line speed. Video stays on site.",
    bullets: [
      "PPE + restricted-zone enforcement on existing CCTV",
      "Defect & quality detection at line speed (90%+)",
      "Permit-to-work verified visually in the field",
      "Snapshot evidence + real-time supervisor alerts",
    ],
  },
  {
    slug: "iot-integration",
    name: "IoT & Sensor Integration",
    short: "Your instruments, one intelligence layer",
    desc: "We wire your existing IoT sensors, PLCs, SCADA/DCS, telematics, and environmental monitors into one platform that classifies, explains, escalates, and documents — no rip-and-replace.",
    bullets: [
      "PLC / SCADA / DCS / telematics ingestion",
      "Live PPM, vibration, thermal, and process streams",
      "Two-layer thresholds with reasoning",
      "Runs on your infrastructure",
    ],
  },
  {
    slug: "rag-intelligence",
    name: "RAG Intelligence Engine",
    short: "Answers grounded in your documents",
    desc: "A citation-enforced retrieval engine over your manuals, SOPs, HIRA norms, and historical records. Every answer cites its source; institutional knowledge survives retirement.",
    bullets: [
      "Citation on every answer + drafted procedure",
      "Ingests OEM manuals, SOPs, safety norms",
      "Captures retiring engineers' judgement",
      "Never generates safety-critical content",
    ],
  },
  {
    slug: "automated-escalation",
    name: "Automated Escalation & Calling",
    short: "The right reading wakes the right person",
    desc: "Graduated escalation from app notification to automated voice calls — to the engineer, supervisor, and safety officer in sequence, in their language, until acknowledged.",
    bullets: [
      "App, WhatsApp, SMS, email, voice — in sequence",
      "Multilingual, repeats until acknowledged",
      "Statutory exposure logged automatically",
      "Sub-minute response on critical breaches",
    ],
  },
  {
    slug: "compliance-audit",
    name: "Compliance & Audit Readiness",
    short: "The audit pack is a print command",
    desc: "PM compliance, MTTR, MTBF, breakdown Pareto, emissions records, and excursion documentation generated continuously as a by-product of operations — formatted for FSSAI, PCB, USFDA, IATF, and OEM audits.",
    bullets: [
      "Continuous, contemporaneous, ALCOA+ records",
      "Audit prep from a week of panic to a print",
      "PCB / FSSAI / USFDA / IATF ready",
      "Full drill-down to evidence photos",
    ],
  },
];

/* ----------------------------------------------------------------------------
   INDUSTRIES — full content lifted from the 8 solution documents.
---------------------------------------------------------------------------- */
export const INDUSTRIES = [
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    tagline: "Gas detection, leak prevention, permit enforcement, and asset integrity",
    why: "Oil and gas carries the highest consequence-of-failure in industry. Unplanned downtime in upstream and midstream operations costs millions per incident, while most catastrophic process-safety events trace back to a missed reading, an unenforced permit, or an inspection that didn't happen on time. Smart manufacturing here is about ensuring the data your instruments already produce actually reaches a decision in time.",
    stats: [
      { value: "30–50%", label: "Reduction in unplanned downtime on rotating equipment" },
      { value: "15–40%", label: "Of OPEX goes to maintenance — among the highest of any industry" },
      { value: "80%+",   label: "Of major incidents trace to PSM discipline, not unknown causes" },
      { value: "10x",    label: "Alert volume a control-room operator can meaningfully process" },
    ],
    i40: "Your existing instrumentation — gas detectors, vibration probes, thermography, DCS alarms — feeds one intelligence layer that classifies, explains, escalates, and documents. AI vision turns existing CCTV into continuous PPE and permit compliance monitoring; automated voice escalation ensures a critical PPM reading wakes the right engineer.",
    useCases: [
      { title: "Live PPM monitoring with automated escalation calling", reality: "Fixed gas detectors alert to a control panel. During shift change or night hours a rising H2S or LEL reading can sit unacknowledged for the minutes that decide outcomes.", ai: "IoT gas sensors stream live PPM (H2S, CO, CH4, VOCs, LEL) with two-layer thresholds. At danger level the system places automated voice calls in sequence — area engineer, supervisor, safety officer — repeating until acknowledged, surfacing the evacuation protocol with citations.", changes: "No critical gas reading goes unseen. Response time drops to under a minute. Statutory exposure documentation becomes a by-product of operations." },
      { title: "AI vision for PPE and restricted-zone compliance", reality: "PPE discipline depends on supervisor presence, and compliance drops on night shifts exactly where consequences are worst.", ai: "Edge AI cameras run continuous detection on existing CCTV: helmet, FR clothing, gloves, breathing apparatus, and unauthorised entry into restricted areas — logged with snapshot evidence and real-time notification.", changes: "Compliance becomes continuously measured. Supervisors intervene on patterns — which crew, which zone, which shift — instead of on luck." },
      { title: "Permit-to-work enforcement through vision", reality: "Permits are issued on paper. Whether the fire watch is posted and the work confined to the permitted zone depends on periodic rounds.", ai: "Permits carry their conditions digitally. AI vision verifies actual compliance against the active permit; work in a zone with no active permit is flagged immediately.", changes: "The gap between permit-on-paper and practice-in-field — the gap in 80% of major investigations — is monitored continuously." },
      { title: "Asset integrity and leak detection", reality: "Corrosion data lives in annual third-party reports. Between inspections, flange weeps and hotspots go unnoticed until they are events.", ai: "Thermal and visual AI continuously monitors pipelines, tanks, and rotating equipment for abnormal heat, visible leaks, and corrosion — creating prioritised work orders with the inspection procedure attached.", changes: "Integrity monitoring moves from annual snapshots to continuous observation. Small findings get fixed before they escalate." },
      { title: "Predictive maintenance on rotating equipment", reality: "Compressors, pumps, and turbines run to OEM calendar intervals while developing failures still surprise the plant.", ai: "Vibration, temperature, and pressure analysed continuously against learned baselines and OEM tolerances. Failures flagged weeks ahead with a corrective work order, spares, and permit type attached.", changes: "30–50% reduction in unplanned downtime and 20–40% asset-life extension. Emergency breakdowns become planned interventions." },
      { title: "AI shift handover", reality: "Handover quality depends on the outgoing engineer's diligence and the log book's legibility — and 24x7 operations change crews a thousand times a year.", ai: "The platform generates a structured handover automatically: open permits, active alarms, abnormal readings, incomplete work orders. The incoming engineer acknowledges digitally.", changes: "Zero information loss at crew change. Every handover complete, consistent, and auditable." },
    ],
  },
  {
    slug: "pharma",
    name: "Pharmaceutical",
    tagline: "GMP-grade maintenance, deviation intelligence, and audit readiness",
    why: "Indian pharmaceutical manufacturing sits at an inflection point. USFDA and EDQM inspection intensity is rising, data-integrity expectations have hardened into enforcement, and senior plant engineers are retiring with their pattern recognition undocumented. AI here makes every deviation investigation faster, every audit trail automatic, and every excursion predicted instead of discovered.",
    stats: [
      { value: "~50%",  label: "Of USFDA warning letters cite data-integrity deficiencies" },
      { value: "Weeks→days", label: "Compression in deviation-investigation cycle time" },
      { value: "30–50%", label: "Reduction in unplanned equipment downtime" },
      { value: "₹2–20L+", label: "Typical write-off of a single batch lost to an excursion" },
    ],
    i40: "ALCOA+ by architecture, not by procedure: every reading attributable, every action time-stamped, every AI output citing its source. The cleanroom predicts its own excursions, the deviation system remembers every similar case, and the audit trail is a by-product of normal work.",
    useCases: [
      { title: "GMP-aware maintenance suite", reality: "Maintenance runs on paper logs, Excel, and a CMMS the floor barely uses. Readings are transcribed later — exactly the contemporaneity gap data-integrity citations target.", ai: "Readings captured digitally at the equipment with two-layer threshold flagging. Out-of-tolerance readings flag with reasoning, surface the manual section with citation, and draft the corrective work order through an Engineer–Supervisor–Plant Head hierarchy.", changes: "ALCOA+ by architecture. Any asset's complete history retrievable in seconds, not days. The audit prep document-chase disappears." },
      { title: "Deviation investigation co-pilot", reality: "A deviation is raised and the QA reviewer starts from a blank form. Finding similar past deviations depends on memory; cycle times stretch to weeks.", ai: "AI retrieves the most similar historical deviations with root causes and CAPAs, equipment history, and applicable SOPs — all cited, attached to a drafted investigation starting point.", changes: "Investigation cycle time compresses from weeks toward days. Recurring patterns become visible across the site." },
      { title: "Cleanroom environmental guardian", reality: "The BMS alarms at the limit — when the excursion is already happening. Excursion documentation is assembled manually.", ai: "Continuous monitoring against classification limits with predictive flagging — trend analysis identifies an approaching breach and triggers graduated escalation up to automated voice calls.", changes: "Excursions move from discovered to predicted. Every event documented to audit standard automatically." },
      { title: "Gowning and cleanroom vision compliance", reality: "Gowning is enforced at entry and spot-checked thereafter. Doors held open and classification-zone violations are noticed when someone notices.", ai: "Edge AI vision monitors gowning at airlocks, detects doors held open beyond threshold, and flags unauthorised personnel in classified areas with snapshot evidence.", changes: "Continuous, evidence-backed compliance on the zones where contamination risk concentrates — without adding a person to the corridor." },
      { title: "Inspection readiness intelligence", reality: "Calibration due dates, qualification status, and training records live in separate registers. Gaps are found by the auditor.", ai: "Continuous scanning of calibration schedules, qualification status, and training records — with approaching expiries flagged to the owner weeks ahead, tracked to closure.", changes: "Compliance posture known continuously. Form 483 exposure on the most preventable findings drops toward zero." },
      { title: "Batch genealogy and traceability", reality: "Tracing a raw-material lot through intermediates to finished batches is a multi-day exercise — dangerous in a recall.", ai: "Every lot, intermediate, and finished batch maintained as a queryable chain. A recall scenario is answered in minutes with documentation attached.", changes: "Recall response moves from days to minutes. Regulatory queries stop being fire drills." },
    ],
  },
  {
    slug: "chemical",
    name: "Chemical",
    tagline: "Process safety, environmental compliance, and reaction integrity",
    why: "Chemical manufacturing lives with a dual mandate that gets harder every year: process safety under intensifying scrutiny, and environmental compliance under tightening consent norms. The plants that thrive convert their existing DCS and sensor infrastructure into a continuously learning intelligence layer — the alternative, alarm fatigue plus paper HIRA registers, is exactly what investigation reports cite after every major incident.",
    stats: [
      { value: "30–50%", label: "Reduction in unplanned downtime across process industries" },
      { value: "49%",    label: "Of process execs cite alarm fatigue as a barrier to acting on data" },
      { value: "25–30%", label: "Reduction in maintenance cost with condition-based strategies" },
      { value: "₹ crores", label: "Cost band of a single significant environmental excursion" },
    ],
    i40: "The reactor parameters, emission stacks, tank farms, and transfer points you already instrument feed one layer that understands safe operating envelopes, predicts excursions before they happen, and escalates with the relevant SOP already attached. AI vision adds continuous eyes on hazardous handling areas.",
    useCases: [
      { title: "Reaction parameter guardian", reality: "The DCS alarms when a parameter crosses a limit — by which point the deviation is already underway. Safe operating envelopes live in documents the operator cannot consult mid-event.", ai: "Reactor temperature, pressure, and cooling differential monitored against batch-specific envelopes extracted from your process-safety documentation. Deviation trends flagged before limits are crossed, with the right procedure surfaced.", changes: "The panel operator gets minutes of warning instead of seconds. Every near-excursion becomes documented learning." },
      { title: "Environmental and emissions compliance", reality: "Stack and ambient monitors exist for compliance, but data is reviewed in periodic reports. An approaching breach is discovered when it's already a breach.", ai: "SOx, NOx, VOC, and particulate streamed live against consent limits with graduated escalation, and every excursion auto-documented for PCB reporting.", changes: "Breaches prevented at the approaching-limit stage. Consent documentation becomes continuous and audit-ready." },
      { title: "Hazardous area vision monitoring", reality: "Chemical-PPE discipline, two-person rules, and solvent-storage access all depend on supervision that cannot be everywhere.", ai: "Edge AI vision monitors handling areas for missing chemical PPE, watches solvent storage for unauthorised activity, and verifies two-person compliance — logged with snapshot evidence.", changes: "High-consequence zones get continuous supervision without continuous supervisors." },
      { title: "HIRA-grounded incident co-pilot", reality: "When a near-miss occurs, investigation starts from a blank page. The relevant HIRA controls sit in a register; institutional memory sits in whoever's been around longest.", ai: "On any flagged event, AI retrieves the relevant HIRA controls, the most similar historical incidents, and applicable SOPs — drafting the incident record with all of it cited.", changes: "Investigations start from organised evidence instead of memory. The HIRA register becomes a living tool." },
      { title: "Critical equipment predictive maintenance", reality: "Agitators, heat exchangers, scrubbers, and transfer pumps are maintained on calendar intervals. A scrubber degrading quietly becomes an emissions event.", ai: "Continuous condition monitoring against learned baselines and OEM tolerances, with failures flagged weeks ahead and work orders auto-drafted with the applicable permit type.", changes: "30–50% fewer unplanned stoppages, 25–30% lower maintenance cost as condition-based work replaces calendar servicing." },
      { title: "Tank farm monitoring", reality: "Tank levels, temperatures, and blanketing pressures are checked on rounds. Incompatible-material rules live in operator knowledge.", ai: "Continuous monitoring with two-layer thresholds. Incompatible material proximity is enforced structurally through the asset register — a violating assignment is flagged before execution.", changes: "Tank-farm risk is monitored by architecture, not vigilance. Compatibility rules become enforced constraints." },
    ],
  },
  {
    slug: "energy-power",
    name: "Energy & Power",
    tagline: "Plant availability, thermal intelligence, and renewable asset performance",
    why: "Power generation is an availability business. Every unplanned trip is revenue lost and penalty exposure under PPA terms; every percentage point of availability has a direct rupee value. The instrumentation already exists across turbines, boilers, transformers, and solar fields — the gap is the intelligence layer that converts streams into pre-emptive action.",
    stats: [
      { value: "30–50%", label: "Reduction in unplanned outages on generation assets" },
      { value: "1% = ₹ crores", label: "Value of one availability point on a mid-size asset, annually" },
      { value: "70%+",   label: "Of electrical fires show detectable thermal precursors" },
      { value: "3–8%",   label: "Solar yield loss from undetected string underperformance" },
    ],
    i40: "The SCADA, vibration probes, and CCTV you already operate feed one layer that predicts the bearing failure, spots the busbar hotspot, flags the underperforming string with quantified loss, and hands the incoming shift a complete picture. Availability becomes a system you run, not an outcome you hope for.",
    useCases: [
      { title: "Predictive maintenance on generation assets", reality: "Turbines, boilers, generators, and transformers carry extensive instrumentation, but data is reviewed in periodic reports. A bearing degrading between reviews trips the unit at full load.", ai: "Vibration, bearing and winding temperature, and oil analysis monitored continuously against OEM tolerances. Failures flagged weeks ahead with corrective procedures and outage-window recommendations.", changes: "Forced outages convert to planned maintenance in low-demand windows. Availability rises with documented prediction lead times." },
      { title: "Thermal anomaly vision", reality: "Switchyard and panel thermography happens as a periodic survey. The loose connection that develops between surveys announces itself as a failure or a fire.", ai: "Thermal AI cameras continuously monitor switchyards, busbars, transformer connections, and panels. Hotspots flagged with trend and location; thermography reports generated automatically.", changes: "The 70%+ of electrical failures with thermal precursors get caught at the precursor stage." },
      { title: "Renewable asset performance", reality: "Solar string and inverter underperformance hides inside aggregate numbers. Soiling losses accumulate until the scheduled cleaning cycle.", ai: "String and inverter performance monitored against expected-yield models. Underperformance and soiling flagged with quantified loss in units and rupees, generating prioritised work orders.", changes: "The 3–8% silent yield loss becomes visible and recoverable. Cleaning spend shifts to loss-justified." },
      { title: "Environmental compliance", reality: "Emission and effluent parameters are monitored for consent but reviewed in reports; an approaching breach is discovered as a breach.", ai: "Parameters monitored live against consent limits with graduated escalation and regulator-ready documentation generated automatically.", changes: "Consent breaches prevented at the trend stage; the compliance record continuous and defensible." },
      { title: "Electrical safety vision", reality: "PPE and approach-distance discipline in switchyards depends on supervision. LOTO compliance during live work is verified by procedure, not observation.", ai: "AI vision enforces PPE and restricted-zone discipline in HV areas, with Electrical/LOTO permit compliance verified visually where permits are active.", changes: "The highest-consequence safety zones get continuous observation. Permit practice converges to permit paper." },
      { title: "Shift handover intelligence", reality: "In a 24x7 operation, handover quality depends on the log book and the outgoing engineer's memory.", ai: "Structured AI handover generated automatically: open defects, abnormal parameters, active permits, incomplete work orders — acknowledged digitally by the incoming shift.", changes: "Zero information loss across the thousand crew changes a year. Every handover complete and auditable." },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    tagline: "Line uptime, quality vision, OEE truth, and supplier delivery discipline",
    why: "Automotive component manufacturing is a margin game played in seconds of cycle time and PPM defect rates. OEM customers audit suppliers on delivery reliability and quality escapes; the scorecards decide who gets the next platform. Smart manufacturing here has the most directly measurable economics of any sector — the cost of a line-down minute and a customer rejection are both known to the rupee.",
    stats: [
      { value: "$22k/min", label: "Cost of a stopped automotive production line at OEM level" },
      { value: "20–30 pts", label: "Gap between reported OEE and vision-measured OEE" },
      { value: "90%+",   label: "Defect detection achievable with trained vision at line speed" },
      { value: "25–40%", label: "Of maintenance budget consumed by reactive, unplanned work" },
    ],
    i40: "The robots, CNC machines, and lines you already run feed one intelligence layer: vision measuring true cycle time and catching defects at speed, sensor trends predicting spindle and press failures, and every stoppage auto-classified so Monday's review argues about causes, not numbers.",
    useCases: [
      { title: "Production line cycle time and stoppage analytics", reality: "Stoppages are tracked on whiteboards from operator memory. Short stops under five minutes are never recorded, and reported OEE diverges from actual by 20–30 points.", ai: "Vision measures actual cycle time per station. Every stoppage is detected and auto-classified from visual context — material starvation, jam, changeover, quality hold — with OEE computed from observed reality.", changes: "The plant gets honest availability for the first time. Short-stop losses become visible and addressable." },
      { title: "Visual quality and defect detection", reality: "Inspection is sampling-based and human. Escapes are discovered at the customer — as a scorecard hit, a sorting cost, or a line return.", ai: "AI vision inspects components at line speed for surface defects, missing operations, and dimensional anomalies — flagging in real time with image evidence before parts are packed.", changes: "Escapes caught in-plant instead of at the customer. PPM improves with evidence to show the OEM; 100% inspection becomes feasible." },
      { title: "Predictive maintenance on production-critical machines", reality: "CNC machines, presses, and welding cells run to calendar PM or to failure. A spindle failing mid-shift stops the line at the worst moment.", ai: "Vibration, current draw, and temperature monitored against learned baselines. Developing failures flagged weeks ahead; corrective work orders scheduled into planned stops.", changes: "Line-down emergencies become planned interventions. The reactive maintenance share shrinks." },
      { title: "Customer audit readiness", reality: "OEM audits demand PM compliance, MTTR, MTBF, and breakdown Pareto. The data pack is assembled in panic the week before.", ai: "Every metric the audit demands is generated continuously — PM compliance, MTTR, MTBF, breakdown Pareto by line, machine, and shift, with full drill-down to evidence photos.", changes: "Audit prep drops from a week of panic to a print command. The scorecard conversation happens on your terms." },
      { title: "Tool and die life management", reality: "Die life is tracked in registers against estimated shot counts. Replacement happens after quality drift appears — meaning scrap has already occurred.", ai: "Tool and die life tracked against actual shot counts, with replacement flagged before predicted quality drift. Maintenance history linked to each asset.", changes: "Die-driven quality drift is prevented rather than detected in scrap. Die spend becomes plannable." },
      { title: "Inbound supply visibility", reality: "Inbound consignments are tracked by phone calls to transporters. A delayed truck is discovered when the line-side stock runs low.", ai: "Consignments tracked from supplier dispatch to dock, with delays flagged against line-schedule impact so planners reschedule before starvation.", changes: "Line stoppages from material starvation drop. Planning moves from firefighting to scheduling." },
    ],
  },
  {
    slug: "cement-steel",
    name: "Cement & Steel",
    tagline: "Heavy asset reliability, kiln and refractory health, and dust compliance",
    why: "Cement and steel run the heaviest rotating assets in industry — kilns, mills, blast furnaces, rolling stands — where a single unplanned stop costs lakhs per hour and restart cycles take days. Maintenance knowledge is concentrated in a retiring generation of engineers, energy is the dominant cost line, and environmental scrutiny on dust tightens every year.",
    stats: [
      { value: "₹ lakhs/hr", label: "Cost of an unplanned kiln or mill stop, with day-long restarts" },
      { value: "30–40%", label: "Of cement production cost is energy" },
      { value: "30–50%", label: "Reduction in unplanned downtime on heavy rotating equipment" },
      { value: "15–25%", label: "Compression in planned-shutdown duration" },
    ],
    i40: "Thermal vision maps the kiln shell continuously instead of quarterly, vibration intelligence sits on every critical bearing, dust monitors escalate automatically, and the retiring engineer's thirty years of judgement is ingested into a retrieval layer the next generation can question in plain language.",
    useCases: [
      { title: "Kiln and mill health intelligence", reality: "Kiln shell temperature is scanned periodically; refractory condition is truly known only at shutdown. A refractory failure stops the plant for days.", ai: "Kiln shell temperature mapped continuously via thermal vision, detecting refractory wear before shell damage. Mill vibration monitored with OEM-grounded corrective procedures drafted automatically.", changes: "Refractory campaigns planned on measured condition. The lakhs-per-hour unplanned stop becomes a scheduled intervention." },
      { title: "Dust and emissions monitoring", reality: "Stack and ambient particulate compliance is monitored, but breaches are discovered after the fact — with PCB exposure attached.", ai: "PM/SPM levels monitored live against consent limits with graduated escalation, and excursion records auto-documented for PCB compliance.", changes: "Breaches prevented at the trend stage; the compliance record continuous; the environment cell proactive." },
      { title: "Material handling reliability", reality: "Conveyors, crushers, and reclaimers fail through belt drift and idler seizure — failures that cascade and starve downstream sections.", ai: "Condition monitoring on drives and bearings; AI vision detecting belt damage, drift, and spillage along conveyor runs — creating work orders before failures cascade.", changes: "Material-chain stoppages drop. Spillage housekeeping becomes systematically managed." },
      { title: "Heavy industry safety vision", reality: "Furnace floors, casting bays, and coal yards are the highest-consequence zones in Indian industry, supervised by presence and procedure.", ai: "PPE compliance and restricted-zone enforcement via edge AI vision, with real-time supervisor notification and snapshot evidence on violations.", changes: "Continuous observation on the zones where consequence concentrates, with behavioural patterns visible and correctable." },
      { title: "Shutdown and turnaround management", reality: "Planned shutdowns are managed on spreadsheets, sequenced from memory, with progress visible only at daily meetings. Overruns are normal.", ai: "Shutdowns sequenced and tracked with AI-drafted task lists from previous shutdown history, permit coordination integrated, and live progress against plan.", changes: "The 15–25% turnaround compression documented in industry practice — days of production recovered per shutdown." },
      { title: "Knowledge capture and preservation", reality: "Thirty years of judgement — what a healthy kiln sounds like, which vibration signature means which failure — retires with the engineer who holds it.", ai: "Decades of maintenance logs, breakdown reports, and shutdown records ingested into the retrieval layer — queryable in plain language, with every answer citing the source.", changes: "Institutional memory survives retirement. The new engineer's first year performs like the veteran's tenth." },
    ],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    tagline: "Food safety compliance, hygiene vision, and cold storage integrity",
    why: "Food and beverage plants answer to FSSAI, export audit regimes, and retail customer audits simultaneously — while temperature logs, sanitation records, and allergen controls remain largely paper-driven. The economics are dominated by two numbers: the cost of a recall, and the cost of product lost to a cold-chain failure nobody saw coming.",
    stats: [
      { value: "$10M+",  label: "Average direct cost of a food recall" },
      { value: "30–50%", label: "Reduction in unplanned downtime on process-critical equipment" },
      { value: "24/7 vs 2/shift", label: "Continuous AI monitoring vs manual checks per shift" },
      { value: "50%+",   label: "Reduction in audit-preparation effort" },
    ],
    i40: "The temperature points, CIP systems, and packaging lines you already run feed one layer that predicts excursions, verifies sanitation cycles against parameters, watches hygiene compliance continuously, and produces the audit trail automatically. Food safety as architecture rather than vigilance.",
    useCases: [
      { title: "Cold storage and process temperature guardian", reality: "Cold rooms are checked twice a shift on paper. A compressor failing quietly at 11 PM is discovered on the morning round — after the product.", ai: "Cold rooms, freezers, and process points monitored continuously with two-layer thresholds. Trend analysis flags an approaching breach and triggers escalating alerts up to automated voice calls.", changes: "Product loss from silent equipment failure approaches zero. The temperature record is continuous, gap-free, and audit-ready by construction." },
      { title: "Hygiene and GMP vision compliance", reality: "Hairnet, glove, and gowning compliance is enforced at entry and assumed thereafter. Handwash compliance is unmeasured.", ai: "Edge AI vision verifies hairnets, gloves, and gowning at entry; detects jewellery and prohibited items; monitors handwash compliance — with shift-level dashboards.", changes: "Hygiene compliance becomes continuously measured. The customer-audit conversation changes from defending anecdotes to presenting data." },
      { title: "Sanitation verification", reality: "CIP cycles are signed off on checklists; whether temperature, flow, and concentration met parameters is taken on trust.", ai: "CIP cycles verified automatically against parameters from your sanitation SOPs. Deviations flagged in real time, and the record generated with actual measured values.", changes: "Sanitation assurance moves from signature-based to measurement-based. Micro failures traceable to shortcuts decline." },
      { title: "Predictive maintenance on process-critical equipment", reality: "Fillers, pasteurisers, retorts, and refrigeration run on calendar PM. A pasteuriser failing mid-run risks both the batch and the safety claim behind it.", ai: "Continuous condition monitoring against learned baselines and OEM tolerances, with failures flagged ahead of breakdown and work orders drafted.", changes: "Process-critical failures become planned interventions. Both uptime and the food-safety chain are protected." },
      { title: "Packaging and label inspection", reality: "Label, date-code, and seal checks are sampled manually. A mislabelled allergen that escapes sampling becomes a recall — the $10M+ event.", ai: "Vision-based inspection at line speed: missing or incorrect labels, wrong date codes, seal integrity, foreign objects — flagged with image evidence and line-stop integration.", changes: "The most common recall trigger — labelling error — is inspected at 100% instead of sampled. Recall exposure drops at its source." },
    ],
  },
  {
    slug: "supply-chain",
    name: "Supply Chain & Logistics",
    tagline: "Movement anomaly detection, incident intelligence, and cold chain integrity",
    why: "Indian logistics has visibility — GPS on every vehicle, sensors on sensitive cargo — but not intelligence. Control rooms drown in alerts, halt reasons go unrecorded, customers learn about delays after they happen, and the data from thousands of completed trips is never mined.",
    stats: [
      { value: "13–14%", label: "Of India's GDP consumed by logistics costs (vs 8–9% global)" },
      { value: "25–40%", label: "Of truck running estimated as empty or under-utilised" },
      { value: "90%+",   label: "Of control-room alerts are noise — tolls, breaks, traffic" },
      { value: "₹2–20L",  label: "Typical write-off of a single cold-chain excursion" },
    ],
    i40: "Your existing telematics, cold-chain loggers, and ERP feed one layer that learns normal movement patterns per route, detects and explains anomalies, calls the driver automatically in their language, and tells your customer why — not just late. The trip corpus compounds: every classified incident sharpens the next.",
    useCases: [
      { title: "Anomaly detection on vehicle movement", reality: "The telematics platform fires an alert on every halt — hundreds per day. The operator cannot distinguish the toll queue from the breakdown, so genuine incidents hide in the noise.", ai: "AI learns normal movement patterns per route and classifies anomalies with reasoning: a 47-minute halt where historical dwell is 12, a deviation onto a never-used segment. Five classified incidents, not five hundred raw alerts.", changes: "Genuine incidents surface in minutes instead of hiding for hours. Every incident carries a documented, classified record." },
      { title: "Automated notification and driver voice response", reality: "On every flagged event the operator calls the driver — who often doesn't answer. Status-chasing consumes most of the shift; reasons collected ('traffic') are too vague to learn from.", ai: "An automated voice call reaches the driver in his language — a short structured exchange asking where he is and when he expects to move. The response is transcribed, classified, and attached.", changes: "Driver response rates rise. The operator handles exceptions instead of making every call. Halt reasons become structured data." },
      { title: "Cold chain excursion guardian", reality: "Temperature loggers alert when the limit is breached — at which point the excursion is underway and the lot is at risk.", ai: "Temperature, humidity, and shock monitored against shipper limits plus SOP tolerances. Excursions predicted before breach; recovery actions drafted from the cargo SOP and pushed to driver and operator.", changes: "Excursions prevented at the trend stage. A single prevented pharma excursion typically covers the system cost." },
      { title: "Bottleneck intelligence", reality: "Two years of GPS breadcrumbs sit unmined. The ops head knows certain lanes run slow but cannot say which segment, at which hours, at what cost.", ai: "Historical trip data mined to identify recurring bottleneck segments — the specific stretch, time window, and day pattern — with quantified delay cost and recommended alternatives.", changes: "Routing decisions move from habit to quantified evidence. The trip corpus becomes a compounding proprietary asset." },
      { title: "Customer exception narrative", reality: "The customer learns the shipment is late when it doesn't arrive. Every late consignment generates an inbound call and erodes the relationship.", ai: "When a shipment deviates, AI drafts the customer-facing message from the classified incident — the actual reason, the revised ETA — sent via WhatsApp or email with an optional approval gate.", changes: "Customers hear why before they ask. Inbound status-chasing drops; service reputation improves measurably." },
      { title: "Fleet maintenance and document intelligence", reality: "Servicing runs on odometer schedules; a truck failing mid-route strands the consignment. PODs, LRs, and e-way bills are matched manually.", ai: "Vehicle health from OBD and telematics drives condition-based scheduling. Documents are extracted and cross-matched automatically, with mismatches flagged at receipt, not at billing.", changes: "Mid-route breakdowns drop; billing disputes shrink because mismatches are caught the day they occur." },
    ],
  },
];

/* ----------------------------------------------------------------------------
   PROVEN WORK — shared block appended to every industry page.
---------------------------------------------------------------------------- */
export const PROVEN_WORK = {
  intro: "Capability claims are cheap. Below is the work we have actually designed, built, and put into production — each delivered end to end: discovery, build, deployment, and ongoing support.",
  items: [
    {
      group: "Enterprise GenAI in production",
      name: "GenAI Procurement Automation — one of India's largest Fortune 500 companies",
      desc: "Built and deployed by our founder inside the central procurement function of a Fortune 500 conglomerate, live in production. It automates the unstructured-to-structured translation ERPs handle badly — requirement descriptions to structured purchase requisitions, historical vendor suggestion, automated approval routing — proving at enterprise scale the exact architecture we now bring to industrial operations: AI grounded in your data, human approval on every consequential action, full auditability.",
    },
    {
      group: "Industrial operations",
      name: "Factory OS — AI-native maintenance and operations platform",
      desc: "Our flagship industrial product, demonstrable today on realistic multi-line plant data. Eight integrated modules: hierarchical asset management with RAG ingestion of OEM manuals; work orders with six permit-to-work types; automated PM scheduling; reading capture with two-layer flagging; a citation-enforced RAG engine; document management for manuals and HIRA norms; QR-based requests with voice capture; and an MTTR/MTBF dashboard. The signature flow — an out-of-tolerance reading flagged, explained from the manual, and converted to a drafted work order — runs live on an Engineer / Supervisor / Plant Manager hierarchy.",
    },
    {
      group: "Production-grade automation",
      name: "Sansai PrintWorld Pvt Ltd, Chennai",
      desc: "Custom automation across print and production workflows for a Chennai print manufacturer — order intake to production handoff digitised, removing manual re-entry between customer-facing and shop-floor systems.",
    },
  ],
};

/* ----------------------------------------------------------------------------
   VERTICALS (home cards) — high-level industry teasers.
---------------------------------------------------------------------------- */
export const VERTICALS = INDUSTRIES.map((i) => ({
  slug: i.slug,
  name: i.name,
  desc: i.tagline,
}));

export const PROCESS_STEPS = [
  { n: "01", title: "Connect your stack",  desc: "We ingest your IoT, SCADA/DCS, telematics, and documents — no rip-and-replace." },
  { n: "02", title: "Demo on your data",   desc: "The signature flow runs on realistic plant data in days, not quarters." },
  { n: "03", title: "Pilot one line",      desc: "One line, one area — flagged readings, drafted work orders, real escalation." },
  { n: "04", title: "Scale the plant",     desc: "Roll out across lines and sites with your own dashboards and audit trail." },
];

export const OUTCOMES = [
  { value: 50,  suffix: "%",   label: "Reduction in unplanned downtime",        accent: true  },
  { value: 90,  suffix: "%+",  label: "Defect detection at line speed",         accent: false },
  { value: 80,  suffix: "%",   label: "Of incidents trace to process discipline", accent: false },
  { value: 24,  suffix: "/7",  label: "Monitoring that never sleeps",           accent: false, isLiteral: true },
];

export const TESTIMONIALS = [
  {
    quote: "We needed something the floor team would actually use. NAutomation Labs delivered exactly that — quietly running, no babysitting.",
    name: "Head of Operations",
    role: "Manufacturing · NDA",
    initial: "MF",
  },
  {
    quote: "The signature flow — a flagged reading explained from our own manual and turned into a work order — is what every CMMS promised and none delivered.",
    name: "Plant Manager",
    role: "Process Industry · NDA",
    initial: "PM",
  },
];

export const NDA_BRANDS = [
  "Fortune 500 · Procurement",
  "Sansai PrintWorld · Chennai",
  "Pico.love · Mexico",
  "Nainley · USA",
  "Paddock MD · USA",
  "V7 Computers · Hosur",
  "Manufacturing Group · NDA",
  "Process Industry · NDA",
];

/* ----------------------------------------------------------------------------
   PROJECTS — real engagements, grouped by vertical.
---------------------------------------------------------------------------- */
export const PROJECTS = [
  // ---------------- Manufacturing ----------------
  {
    slug: "factory-os",
    name: "Factory OS",
    vertical: "Manufacturing",
    summary: "AI-powered smart asset maintenance system with live IoT data and equipment health — our flagship industrial platform.",
    stack: ["IoT / SCADA ingestion", "Edge AI Vision", "RAG (citation-enforced)", "Postgres", "Automated voice escalation", "MTTR/MTBF analytics"],
    useCase: "Indian SME manufacturers run maintenance on paper logs and an isolated CMMS the floor barely uses, while the most expensive machines dictate the production schedule through unplanned failure. Factory OS ingests live sensor and IoT data, flags out-of-tolerance readings with reasoning, explains them from the equipment's own OEM manual via a citation-enforced RAG engine, and drafts a corrective work order for approval — across an Engineer, Supervisor, and Plant Manager hierarchy. Eight integrated modules cover asset management, six permit-to-work types, preventive maintenance scheduling, QR-based requests with voice capture, and an MTTR/MTBF dashboard with post-work completion evidence.",
    numbers: [
      { value: "30–50%", label: "Reduction in unplanned downtime" },
      { value: "8", label: "Integrated modules, live on plant data" },
      { value: "3-role", label: "Engineer / Supervisor / Plant Manager hierarchy" },
    ],
  },
  {
    slug: "sourcedesk",
    name: "SourceDesk",
    vertical: "Manufacturing",
    summary: "Smart AI-powered procurement application — requirement descriptions to structured requisitions, historical vendor suggestion, automated approval routing.",
    stack: ["GenAI", "ERP integration", "Vendor intelligence", "Approval workflows"],
    useCase: "ERPs handle the unstructured-to-structured translation of procurement badly. SourceDesk converts free-text requirement descriptions into structured purchase requisitions, suggests vendors based on similar historical purchases, and routes everything through automated approval workflows — the architecture proven inside the central procurement function of one of India's largest Fortune 500 conglomerates, live in production under enterprise IT scrutiny.",
    numbers: [
      { value: "Fortune 500", label: "Deployed in central procurement" },
      { value: "Live", label: "In production today" },
      { value: "100%", label: "Auditable approval routing" },
    ],
  },
  // ---------------- Supply Chain ----------------
  {
    slug: "fleet-os",
    name: "FleetOS",
    vertical: "Supply Chain",
    summary: "AI-powered fleet alert and management — movement anomaly detection, automated driver voice response, and cold-chain excursion guarding.",
    stack: ["Telematics ingestion", "Anomaly classification", "Automated voice calls", "Cold-chain monitoring", "Document intelligence"],
    useCase: "Indian logistics control rooms drown in raw telematics alerts — 90%+ are noise. FleetOS learns normal movement patterns per route and surfaces five classified incidents instead of five hundred raw alerts, calls the driver automatically in his language for a structured status exchange, predicts cold-chain excursions before breach, and drafts the customer-facing delay narrative. Two years of GPS breadcrumbs become a compounding proprietary bottleneck-intelligence asset.",
    numbers: [
      { value: "90%+", label: "Alert noise filtered out" },
      { value: "₹2–20L", label: "Saved per prevented cold-chain excursion" },
      { value: "Mins", label: "Incident surfacing, vs hours" },
    ],
  },
  // ---------------- Safety ----------------
  {
    slug: "ai-safety-vision",
    name: "AI Safety Monitoring",
    vertical: "Safety",
    summary: "Camera-based AI safety monitoring — PPE compliance, restricted-zone enforcement, and permit verification on your existing CCTV.",
    stack: ["Edge AI Vision", "On-site processing", "Snapshot evidence", "Real-time alerts"],
    useCase: "PPE and restricted-zone discipline depends on supervisor presence — and compliance drops on night shifts exactly where consequences are worst. Our edge AI vision runs continuous detection on existing CCTV for helmets, FR clothing, gloves, and breathing apparatus, flags unauthorised entry into restricted zones, and verifies permit conditions in the field. Every violation is logged with timestamp, location, and snapshot evidence; video never leaves the site.",
    numbers: [
      { value: "24/7", label: "Continuous vs sampled supervision" },
      { value: "On-site", label: "Video never leaves your premises" },
      { value: "Real-time", label: "Supervisor notification on violation" },
    ],
  },
  {
    slug: "thermal-defect-detection",
    name: "Thermal Defect Detection",
    vertical: "Safety",
    summary: "AI-powered defect and hotspot detection using thermal cameras — catching the 70%+ of electrical failures with thermal precursors.",
    stack: ["Thermal AI cameras", "Hotspot trend analysis", "Auto thermography reports", "Work-order integration"],
    useCase: "Switchyard and panel thermography happens as a periodic survey — the loose connection that develops between surveys announces itself as a failure or a fire. Thermal AI cameras continuously monitor switchyards, busbars, transformer connections, pipelines, and rotating equipment for abnormal heat signatures, flagging developing hotspots with temperature trend and location and generating thermography reports automatically.",
    numbers: [
      { value: "70%+", label: "Of electrical failures caught at precursor stage" },
      { value: "Continuous", label: "Coverage vs periodic snapshots" },
      { value: "Auto", label: "Thermography reports generated" },
    ],
  },
  {
    slug: "emissions-monitoring",
    name: "Emissions & Pollutant Monitoring",
    vertical: "Safety",
    summary: "Pollutant and emission monitoring through sensor integration — live PM/SPM, SOx, NOx, and VOC against consent limits with auto-documentation.",
    stack: ["Sensor integration", "Consent-limit thresholds", "Graduated escalation", "PCB-ready documentation"],
    useCase: "Stack and ambient particulate compliance is monitored, but data is reviewed in periodic reports and breaches are discovered after the fact — with Pollution Control Board exposure attached. We stream PM/SPM, SOx, NOx, VOC, and particulate live against consent-to-operate limits with graduated escalation — alerts, then automated calls to the environment officer — and auto-document every excursion with timeline and response actions, formatted for PCB reporting.",
    numbers: [
      { value: "Live", label: "Vs periodic report review" },
      { value: "PCB-ready", label: "Auto-documented excursions" },
      { value: "Trend-stage", label: "Breaches prevented before they occur" },
    ],
  },
  // ---------------- Healthcare ----------------
  {
    slug: "sukhya",
    name: "Sukhya · Doctor–Patient Platform",
    vertical: "Healthcare",
    summary: "Two-sided doctor–patient booking and clinic management platform with prescription builder, admin workflows, and cancellation logic.",
    stack: ["React", "FastAPI", "MongoDB", "Google OAuth", "Resend email"],
    useCase: "Sukhya is a two-sided doctor–patient booking platform: a patient booking flow, a doctor dashboard with a prescription builder, an admin invite/approve workflow, Google OAuth, cookie auth across subdomains, email confirmations, and cancellation-penalty logic — a full clinic management system reached launch-ready in V1.",
    numbers: [
      { value: "2-sided", label: "Doctor + patient flows" },
      { value: "OAuth", label: "Google sign-in, cross-subdomain auth" },
      { value: "V1", label: "Launch-ready" },
    ],
  },
  {
    slug: "sparsh-skin-clinic",
    name: "Sparsh Skin Clinic",
    vertical: "Healthcare",
    summary: "Clinic automation — intake, appointment recovery, and patient follow-up wired into the practice's existing workflow.",
    stack: ["Voice AI", "WhatsApp Business API", "CRM integration", "n8n"],
    useCase: "No-shows and front-desk overload eat into clinic capacity. For Sparsh Skin Clinic we deployed automated intake, no-show recovery, and follow-up sequences wired into the practice's existing systems — handling routine patient communication without the front-desk grind.",
    numbers: [
      { value: "30%+", label: "No-shows recovered" },
      { value: "Auto", label: "Intake + follow-up" },
      { value: "24/7", label: "Patient communication" },
    ],
  },
  {
    slug: "narayani-dental",
    name: "Narayani Dental Clinic",
    vertical: "Healthcare",
    summary: "Dental clinic management and patient communication automation — booking, reminders, and recovery.",
    stack: ["Clinic management", "Automated reminders", "WhatsApp", "CRM"],
    useCase: "For Narayani Dental Clinic we built clinic management and patient-communication automation — appointment booking, reminders, and recovery flows — reducing front-desk load while keeping patients engaged through their treatment.",
    numbers: [
      { value: "Auto", label: "Booking + reminders" },
      { value: "Lower", label: "Front-desk load" },
      { value: "Higher", label: "Patient engagement" },
    ],
  },
  // ---------------- E-commerce ----------------
  {
    slug: "nainley",
    name: "Nainley",
    vertical: "E-commerce",
    summary: "Production AI automation for a US medical brand — support triage grounded in product and order data, returns and shipping workflows.",
    stack: ["Shopify", "Meta", "Klaviyo", "Gorgias", "RAG"],
    useCase: "Nainley is a US-based medical brand running on the Shopify, Meta, Klaviyo, and Gorgias stack. We deployed production AI automation across customer engagement and commerce operations — support triage and resolution grounded in product and order data, returns and shipping workflows, and customer-communication automation.",
    numbers: [
      { value: "USA", label: "Cross-border deployment" },
      { value: "Grounded", label: "Triage on real order data" },
      { value: "Auto", label: "Returns + shipping flows" },
    ],
  },
  {
    slug: "paddock-md",
    name: "Paddock MD",
    vertical: "E-commerce",
    summary: "Customer engagement and commerce automation for a US medical brand on the Shopify/Meta/Klaviyo/Gorgias stack.",
    stack: ["Shopify", "Meta", "Klaviyo", "Gorgias", "RAG"],
    useCase: "Paddock MD, a US medical brand, runs production AI automation across support triage, returns and shipping workflows, and customer communication — resolution grounded in product and order data so customers get accurate answers without staff in the loop on routine cases.",
    numbers: [
      { value: "USA", label: "Cross-border deployment" },
      { value: "DTC", label: "Medical commerce" },
      { value: "Grounded", label: "Order-data-aware support" },
    ],
  },
  {
    slug: "quiet-protector",
    name: "Quiet Protector",
    vertical: "E-commerce",
    summary: "DTC e-commerce automation — customer support, retention, and commerce operations on the Shopify stack.",
    stack: ["Shopify", "Meta", "Klaviyo", "Support automation"],
    useCase: "For Quiet Protector we deployed our e-commerce agent suite across customer support, retention, and commerce operations — automating the repetitive engagement and resolution work that otherwise consumes a DTC team's day.",
    numbers: [
      { value: "DTC", label: "Direct-to-consumer" },
      { value: "Auto", label: "Support + retention" },
      { value: "Shopify", label: "Native stack integration" },
    ],
  },
  {
    slug: "v7-computers",
    name: "V7 Computers",
    vertical: "E-commerce",
    summary: "Complete e-commerce web presence for a Hosur computer retailer — 6-page site, Shopify storefront, and custom domain.",
    stack: ["HTML/CSS/JS", "Shopify", "Zoho Commerce", "Vercel", "GoDaddy"],
    useCase: "V7 Computers (Hosur, Tamil Nadu) needed a complete online presence. We built and delivered a 6-page static website deployed on Vercel with a custom domain, a Shopify storefront on a dedicated subdomain, and a Zoho Commerce store — a full pre-delivery audit and fix package included.",
    numbers: [
      { value: "6-page", label: "Custom site delivered" },
      { value: "Live", label: "v7computers.in" },
      { value: "2", label: "Storefronts (Shopify + Zoho)" },
    ],
  },
  // ---------------- IT Services & Marketing ----------------
  {
    slug: "sansai-printworld",
    name: "Sansai PrintWorld Pvt Ltd",
    vertical: "IT Services & Marketing",
    summary: "Production automation across print and production workflows — order intake to production handoff digitised.",
    stack: ["Workflow automation", "Order intake", "Production handoff", "Integration"],
    useCase: "Sansai PrintWorld, a Chennai print manufacturer, ran manual re-entry between its customer-facing and shop-floor systems. We digitised the workflow from order intake to production handoff, removing the re-entry and the errors it created.",
    numbers: [
      { value: "Digitised", label: "Intake → production handoff" },
      { value: "Zero", label: "Manual re-entry" },
      { value: "Chennai", label: "Print manufacturing" },
    ],
  },
  {
    slug: "apex-it-solutions",
    name: "Apex IT Solutions",
    vertical: "IT Services & Marketing",
    summary: "IT services automation and digital operations support.",
    stack: ["Automation", "Digital operations", "Integration"],
    useCase: "For Apex IT Solutions we delivered automation and digital-operations support — streamlining the repeatable workflows that scale an IT services business.",
    numbers: [
      { value: "Auto", label: "Operational workflows" },
      { value: "IT", label: "Services vertical" },
      { value: "Scale", label: "Repeatable processes" },
    ],
  },
  {
    slug: "pico-love",
    name: "Pico.love",
    vertical: "IT Services & Marketing",
    summary: "AI agents for a leading Mexican marketing agency — cross-platform campaign analysis, reporting, and creative performance insight.",
    stack: ["Multi-platform campaign data", "Reporting automation", "Creative analytics"],
    useCase: "Pico.love is a leading Mexican marketing agency. We built AI agents for marketing operations and campaign intelligence — cross-platform campaign analysis, reporting automation, and creative-performance insight delivered directly to account teams.",
    numbers: [
      { value: "Mexico", label: "Cross-border deployment" },
      { value: "Multi", label: "Platform campaign analysis" },
      { value: "Auto", label: "Reporting + insight" },
    ],
  },
];

export const PROJECT_GROUPS = [
  "Manufacturing",
  "Supply Chain",
  "Safety",
  "Healthcare",
  "E-commerce",
  "IT Services & Marketing",
];

export const FOUNDERS = [
  {
    name: "Nithish",
    initial: "N",
    title: "Co-Founder",
    background: ["Ex-Reliance Industries (RIL)", "NIT graduate"],
    bio: "Years inside Reliance shipping systems real users depended on, where \"almost working\" was a failure mode — including a GenAI procurement system now live in production. I bring that production discipline to the industrial AI we build.",
  },
  {
    name: "Harsha",
    initial: "H",
    title: "Co-Founder",
    background: ["Ex-Samsung", "NIT graduate"],
    bio: "Years at Samsung building software at scale. I focus on turning hard engineering problems into AI products that hold up on a real plant floor — not just in a demo.",
  },
];

export const FOUNDING_STORY = {
  headline: "Fusion of core engineering knowledge and applied AI.",
  bio: "We met at NIT and went on to ship production systems at Reliance and Samsung — places where software has to work for millions, not just in a demo. We started NAutomation Labs to bring that discipline to industrial AI: an operating layer that sits on top of the ERP, SCADA, and IoT you already run, and turns the data your instruments already produce into decisions while the window to act is still open.",
  creds: ["Ex-Samsung", "Ex-Reliance Industries (RIL)", "NIT graduates", "Fortune 500 GenAI in production"],
};

export const FOUNDER = FOUNDERS[0];

export const CONTACT = {
  email: "office@nautomationlabs.com",
  phone: "+91 73386 71878",
  phoneRaw: "+917338671878",
  location: "Hosur, Tamil Nadu, India",
};

export const TAGLINES = {
  heroHeadline: "The AI operating layer for your industry.",
  heroSub: "Make intelligent decisions using AI on top of your ERP, SCADA, and IoT.",
  diving: "The world is diving into AI. Is your industry ready?",
  problemToMvp: "Connect your stack. Demo on your data. Scale the plant.",
  bookCall: "Book a call to see the signature flow run on your data.",
  bookFreeSession: "Book a free session on AI in your industry.",
  manifesto: "AI infused. Not bolted on.",
};
