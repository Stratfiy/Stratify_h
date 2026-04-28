// Shared agent and constants data
export const AGENTS = [
  {
    name: "Kai",
    role: "Creative & Ad Production",
    desc: "Generates hooks, stitches video, uploads to Meta Ads with your approval.",
    initial: "K",
  },
  {
    name: "Atlas",
    role: "Outbound & Lead Gen",
    desc: "Scrapes ICP contacts, enriches them, and runs personalized cold sequences.",
    initial: "A",
  },
  {
    name: "Nova",
    role: "Conversational AI",
    desc: "Handles inbound DMs, qualifies leads, books meetings on your calendar.",
    initial: "N",
  },
  {
    name: "Remy",
    role: "Cart Recovery",
    desc: "Recovers 22% of abandoned carts within 30 minutes via SMS and email.",
    initial: "R",
  },
  {
    name: "Echo",
    role: "Reviews & UGC",
    desc: "Pulls fresh reviews and user-generated content, feeds it back to Kai for new ads.",
    initial: "E",
  },
  {
    name: "Sage",
    role: "Customer Support",
    desc: "Resolves 80% of tickets without human intervention. Escalates the rest.",
    initial: "S",
  },
  {
    name: "Pulse",
    role: "Analytics & Reporting",
    desc: "Sends a Monday morning report that shows what changed, what worked, what to fix.",
    initial: "P",
  },
];

export const HEALTHCARE_AGENTS = [
  { name: "Iris", role: "Patient Intake", desc: "Collects forms, history, and consent before patients arrive.", initial: "I" },
  { name: "Ambra", role: "Appointment Recovery", desc: "Recovers 30%+ of no-shows by reaching out within 10 minutes.", initial: "A" },
  { name: "Vera", role: "Insurance Verification", desc: "Verifies coverage before the visit. Catches denials before they happen.", initial: "V" },
  { name: "Cora", role: "Care Follow-up & Reviews", desc: "Sends post-visit care instructions and pulls 5-star reviews.", initial: "C" },
  { name: "Sage", role: "Clinical Triage", desc: "Routes patient questions to the right person. Never gives clinical advice.", initial: "S" },
  { name: "Pulse", role: "Practice Analytics", desc: "Monday morning ROI report — what worked, what to fix.", initial: "P" },
];

export const NDA_BRANDS = [
  "Quiet Protector · Italy",
  "DTC Skincare · Mexico",
  "Premium Apparel · NDA",
  "Footwear Co. · NDA",
  "Wellness Brand · NDA",
  "Dental Group · NDA",
  "Med Spa Chain · NDA",
  "Pet Care DTC · NDA",
];

export const HERO_STATS = [
  { value: "60%", label: "Lower creative production cost" },
  { value: "22%", label: "Cart recovery rate (Remy)" },
  { value: "80%", label: "Tickets resolved without human (Sage)" },
  { value: "24/7", label: "Outbound running, never sleeps" },
];

export const ECOM_PRICING = [
  {
    name: "Starter",
    price: "$1,497",
    cadence: "/mo",
    highlight: false,
    bullets: [
      "3 agents of choice",
      "Up to 5 Meta ads / month",
      "Email support",
      "Onboarding within 7 days",
    ],
  },
  {
    name: "Growth",
    price: "$2,997",
    cadence: "/mo",
    tag: "Most popular",
    highlight: true,
    bullets: [
      "All 7 agents deployed",
      "20 Meta ads / month",
      "Slack support",
      "Monthly strategy call",
    ],
  },
  {
    name: "Scale",
    price: "$6,997",
    cadence: "/mo",
    highlight: false,
    bullets: [
      "All 7 agents deployed",
      "60 Meta ads / month",
      "Dedicated account manager",
      "Priority everything",
    ],
  },
];

export const HC_PRICING = [
  {
    name: "Essentials",
    price: "$1,497",
    cadence: "/mo",
    highlight: false,
    bullets: [
      "Single-location practice",
      "3 agents of choice",
      "BAA + HIPAA-compliant deployment",
      "Email support",
    ],
  },
  {
    name: "Practice",
    price: "$3,997",
    cadence: "/mo",
    tag: "Most popular",
    highlight: true,
    bullets: [
      "Multi-location (3–10 sites)",
      "All 6 healthcare agents",
      "Dedicated CS lead",
      "Quarterly business review",
    ],
  },
  {
    name: "Enterprise",
    price: "$7,997+",
    cadence: "/mo",
    highlight: false,
    bullets: [
      "DSOs, telehealth, 10+ sites",
      "All 6 agents + custom workflows",
      "Dedicated HIPAA engineer",
      "Custom SLAs",
    ],
  },
];
