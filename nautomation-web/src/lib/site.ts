export const SITE = {
  name: 'NAutomation Labs',
  url: 'https://nautomationlabs.com',
  tagline: 'Your work, done by agents.',
  description:
    'An AI-native studio that gets your work done through AI agents, with approvals and a record of every action. Managed for procurement and logistics teams; self-serve for everyone else.',
  email: 'office@nautomationlabs.com',
  securityEmail: 'security@nautomationlabs.com', // TODO(founder): create the mailbox
  phone: '+91 73386 71878',
  decibyl: 'https://decibyl.ai',
  decibylSignup: 'https://app.decibyl.ai/signup',
  linkedin: 'https://www.linkedin.com/company/nautomationlabs',
  founded: 2025,
  registeredIn: 'Hosur, Tamil Nadu, India',
  // Cloudflare Worker endpoints (same-origin routes proxied by Pages Functions / Worker routes)
  contactEndpoint: '/api/contact',
  waitlistEndpoint: '/api/waitlist',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
  posthogKey: import.meta.env.PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: import.meta.env.PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
};

export const NAV = [
  { href: '/what-we-do', label: 'What we do' },
  { href: '/procurement', label: 'Procurement' },
  { href: '/decibyl', label: 'Decibyl' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/security', label: 'Security' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export const JOB_FAMILIES = [
  { value: 'follow-ups', label: 'Follow-ups' },
  { value: 'vendor-coordination', label: 'Vendor coordination' },
  { value: 'front-desk', label: 'Front desk' },
  { value: 'back-office', label: 'Back office' },
  { value: 'procurement-logistics', label: 'Procurement & logistics' },
  { value: 'something-else', label: 'Something else' },
];

export const TRUST = [
  'Every action logged',
  'Approvals before consequences',
  'Data stays yours',
  'AI identity disclosed on calls',
];

export const directoryDescription =
  'NAutomation Labs is an AI-native studio that gets businesses’ work done through AI agents. We set up and run agents that handle follow-ups, vendor coordination, front-desk calls and back-office tasks, from a business’s own email, WhatsApp and apps, with approvals before anything is sent, spent or deleted, and a record of every action. Procurement and logistics teams work with us as a managed service; other businesses use our product, Decibyl, self-serve. Founded 2025, registered in Hosur, Tamil Nadu, operating remotely across India, serving India and global customers.';
