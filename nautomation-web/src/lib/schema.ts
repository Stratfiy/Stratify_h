import { SITE } from './site';

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.svg`,
  description: SITE.description,
  foundingDate: String(SITE.founded),
  email: SITE.email,
  telephone: SITE.phone,
  address: { '@type': 'PostalAddress', addressLocality: 'Hosur', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
  areaServed: ['IN', 'Worldwide'],
  sameAs: [SITE.linkedin, SITE.decibyl],
});

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${SITE.url}${it.path === '/' ? '/' : it.path}`,
  })),
});

export const faqPage = (qa: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map((x) => ({
    '@type': 'Question',
    name: x.q,
    acceptedAnswer: { '@type': 'Answer', text: x.a },
  })),
});

export const jobPosting = (role: {
  title: string; area: string; summary: string; slug: string; datePosted: string; validThrough: string; employmentType: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: role.title,
  description: role.summary,
  datePosted: role.datePosted,
  validThrough: role.validThrough,
  employmentType: role.employmentType,
  hiringOrganization: { '@type': 'Organization', name: SITE.name, sameAs: SITE.url, logo: `${SITE.url}/logo.svg` },
  jobLocationType: 'TELECOMMUTE',
  applicantLocationRequirements: { '@type': 'Country', name: 'India' },
  directApply: true,
  url: `${SITE.url}/careers#${role.slug}`,
});
