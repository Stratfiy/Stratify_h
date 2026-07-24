// JSON-LD structured-data builders for the studio homepage.
import { DECIBYL, FAQS, CONTACT } from "@/lib/site-data";

const SITE_URL = "https://nautomationlabs.com";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NAutomation Labs",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mark.png`,
    email: CONTACT.email,
    description:
      "NAutomation Labs is an AI-native studio building AI agents and workflows that operate — run real jobs end to end.",
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: DECIBYL.name,
    url: DECIBYL.url,
    applicationCategory: "BusinessApplication",
    description: DECIBYL.description,
    author: {
      "@type": "Organization",
      name: "NAutomation Labs",
      url: SITE_URL,
    },
  };
}

export function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
