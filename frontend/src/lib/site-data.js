// NAutomation Labs — site-wide data
// All references to agent names removed. Data is organized around services + projects + verticals.

export const SERVICES = [
  {
    slug: "rag-chatbots",
    name: "RAG Chatbots",
    short: "Knowledge-grounded chatbots",
    desc: "Production-ready chatbots grounded in your documents, SOPs, and product data. Cite-able, accurate, on-brand.",
    bullets: [
      "Document ingestion + chunking pipeline",
      "Hybrid search (semantic + keyword)",
      "Citations on every answer",
      "Slack / Web / WhatsApp deployments",
    ],
  },
  {
    slug: "voice-agents",
    name: "Voice Agents",
    short: "Inbound & outbound voice AI",
    desc: "Real-time voice agents that book appointments, qualify leads, and handle support calls — multilingual, with low latency.",
    bullets: [
      "Sub-700ms turn-taking",
      "Hindi, English, regional language support",
      "CRM + calendar integration",
      "Call recording + transcripts",
    ],
  },
  {
    slug: "enterprise-integration",
    name: "Enterprise Software Integration",
    short: "Connect your AI to your stack",
    desc: "We wire AI into the tools you already run — ERPs, CRMs, ticketing, finance systems — without replacing them.",
    bullets: [
      "SAP / Salesforce / Zoho / HubSpot",
      "Custom REST + SOAP connectors",
      "Single sign-on, audit trails, RBAC",
      "On-prem and VPC deployment options",
    ],
  },
  {
    slug: "end-to-end-automation",
    name: "End-to-End Automation",
    short: "Workflows that finish the job",
    desc: "From trigger to outcome — multi-step automations across your tools. Built on n8n, custom workers, and AWS Lambda where it fits.",
    bullets: [
      "Marketing, ops, finance, support flows",
      "Error handling + observability built in",
      "Human-in-the-loop checkpoints where it matters",
      "Cost-aware design — runs on your infra",
    ],
  },
  {
    slug: "custom-deployment",
    name: "Custom Product & Service Deployment",
    short: "Bespoke AI products, end-to-end",
    desc: "When off-the-shelf won't do — we design, build, and deploy custom AI products for your specific edge.",
    bullets: [
      "Discovery → MVP → production",
      "Hosted on your cloud or ours",
      "IP and weights belong to you",
      "Ongoing optimization included",
    ],
  },
  {
    slug: "training-lectures",
    name: "AI Training & Lectures",
    short: "Upskill your team",
    desc: "Hands-on sessions for engineering teams, leadership briefings for executives, and full workshops for your org.",
    bullets: [
      "Executive briefings (2 hours)",
      "Engineering workshops (1–3 days)",
      "Custom curriculum for your stack",
      "Free intro session available",
    ],
  },
];

export const VERTICALS = [
  { name: "Ecommerce",     desc: "Ads, creative, retention, support — automated." },
  { name: "Clinics",       desc: "Intake, recovery, follow-up — without the front-desk grind." },
  { name: "Manufacturing", desc: "Floor data, quality, vendor ops — operationalized." },
  { name: "Supply Chain",  desc: "Demand, logistics, exceptions — visible and actionable." },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Schedule a call",      desc: "30 minutes. We listen. No slides." },
  { n: "02", title: "MVP in 5–7 days",      desc: "Working software, not a deck. Your data, your stack." },
  { n: "03", title: "Review & iterate",     desc: "We refine against real usage before scaling." },
  { n: "04", title: "Deploy in 14–21 days", desc: "Production rollout + your own dashboard." },
];

export const OUTCOMES = [
  { value: 5,   suffix: " days",  label: "From problem to working MVP",      accent: false },
  { value: 21,  suffix: " days",  label: "To full production deployment",   accent: true  },
  { value: 15,  suffix: "+",      label: "Client engagements shipped",       accent: false },
  { value: 24,  suffix: "/7",     label: "AI operations, never sleeps",      accent: false, isLiteral: true },
];

export const TESTIMONIALS = [
  {
    quote:
      "They went from kickoff to a working MVP in under a week. The team treats engineering as the product, not the slides around it.",
    name: "Founder",
    role: "DTC Ecommerce · NDA",
    initial: "EC",
  },
  {
    quote:
      "We needed something the floor team would actually use. NAutomation Labs delivered exactly that — quietly running, no babysitting.",
    name: "Head of Operations",
    role: "Manufacturing · NDA",
    initial: "MF",
  },
];

export const NDA_BRANDS = [
  "DTC Ecommerce · India",
  "Healthcare Clinic · India",
  "Manufacturing Group · NDA",
  "Supply Chain Co. · NDA",
  "Wellness Brand · NDA",
  "Edtech Platform · NDA",
  "Retail Chain · NDA",
  "Diagnostics Lab · NDA",
];

export const PROJECTS = [
  {
    slug: "ai-video-ad-gen",
    name: "AI Video Generation & Ad Posting",
    vertical: "Ecommerce",
    summary:
      "End-to-end pipeline that generates Meta ad creatives, concatenates videos at 1080×1920, and publishes to ad sets automatically.",
    stack: ["n8n", "AWS Lambda", "FFmpeg", "Facebook Marketing API", "Google Sheets", "S3"],
    useCase:
      "An ecommerce brand was spending hours per day producing and uploading ad variants. The pipeline now ingests creative briefs from Google Sheets, builds 1080×1920 video assets via FFmpeg on Lambda, and publishes finished ads with one click of approval.",
    numbers: [
      { value: "60%",  label: "Lower creative production cost" },
      { value: "10x",  label: "More variants tested weekly" },
      { value: "<30m", label: "Brief → live ad" },
    ],
    image: null,
  },
  {
    slug: "sukhya-healthcare",
    name: "Sukhya · Healthcare Automation",
    vertical: "Clinics",
    summary:
      "Patient intake, appointment recovery, and follow-up communications for a multi-location healthcare practice.",
    stack: ["Voice AI", "WhatsApp Business API", "Custom CRM", "RAG", "n8n"],
    useCase:
      "No-shows and front-desk overload were eating into clinic capacity. We deployed an intake voice agent, an automated no-show recovery flow, and a follow-up sequence — all wired into the practice's existing CRM.",
    numbers: [
      { value: "30%+", label: "No-shows recovered" },
      { value: "80%",  label: "Intake handled without staff" },
      { value: "4.8★", label: "Patient experience score" },
    ],
    image: null,
  },
  // Placeholder slots — fill these in as more case studies clear NDA.
  { slug: "p3",  name: "RAG Knowledge Assistant", vertical: "Manufacturing", summary: "Coming soon.", placeholder: true },
  { slug: "p4",  name: "Voice-Based Order Intake", vertical: "Supply Chain", summary: "Coming soon.", placeholder: true },
  { slug: "p5",  name: "Quality-Check Vision Pipeline", vertical: "Manufacturing", summary: "Coming soon.", placeholder: true },
  { slug: "p6",  name: "Demand Forecast Engine", vertical: "Supply Chain", summary: "Coming soon.", placeholder: true },
  { slug: "p7",  name: "Customer Support Copilot", vertical: "Ecommerce", summary: "Coming soon.", placeholder: true },
  { slug: "p8",  name: "Document Extraction Service", vertical: "Manufacturing", summary: "Coming soon.", placeholder: true },
  { slug: "p9",  name: "Clinic Front-Desk Voice Agent", vertical: "Clinics", summary: "Coming soon.", placeholder: true },
  { slug: "p10", name: "Sales Outreach Automation",   vertical: "Ecommerce", summary: "Coming soon.", placeholder: true },
  { slug: "p11", name: "Vendor Onboarding Workflow",  vertical: "Supply Chain", summary: "Coming soon.", placeholder: true },
  { slug: "p12", name: "Inventory Reconciliation Bot",vertical: "Manufacturing", summary: "Coming soon.", placeholder: true },
];

export const FOUNDERS = [
  {
    name: "Nithish",
    initial: "N",
    title: "Co-Founder",
    background: [
      "Ex-Reliance Industries (RIL)",
      "NIT graduate",
    ],
    bio:
      "Years inside Reliance shipping systems that real users depended on, where \"almost working\" was a failure mode. I bring that same production discipline to the AI products we build.",
  },
  {
    name: "Harsha",
    initial: "H",
    title: "Co-Founder",
    background: [
      "Ex-Samsung",
      "NIT graduate",
    ],
    bio:
      "Years at Samsung building software at scale. I focus on turning hard engineering problems into AI products that hold up in the real world — not just in a demo.",
  },
];

// Shared founding story + combined credentials.
export const FOUNDING_STORY = {
  headline: "Fusion of core engineering knowledge and applied AI.",
  bio:
    "We met at NIT and went on to ship production systems at Reliance and Samsung — places where software has to work for millions, not just in a demo. We started NAutomation Labs to bring that same discipline to AI products, for businesses that need outcomes, not experiments.",
  creds: ["Ex-Samsung", "Ex-Reliance Industries (RIL)", "NIT graduates", "15+ client engagements shipped"],
};

// Back-compat alias (some components may still import FOUNDER).
export const FOUNDER = FOUNDERS[0];

export const CONTACT = {
  email: "office@nautomationlabs.com",
  phone: "+91 73386 71878",
  phoneRaw: "+917338671878",
};

// Catchy lines used across the site
export const TAGLINES = {
  heroHeadline: "India's first AI-native Engineering Labs.",
  heroSub: "AI products and solutions, deployed.",
  diving: "The world is diving into AI. Is your industry ready?",
  problemToMvp: "Problem to MVP in 5 days. Not slides.",
  bookCall: "Book a call to see how AI fits into your organisation.",
  bookFreeSession: "Book a free session on AI in your industry.",
  manifesto: "AI infused. Not bolted on.",
};