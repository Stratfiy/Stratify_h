import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <section className="container-x py-20 md:py-28 max-w-[820px]" data-testid="privacy-page">
      <div className="eyebrow mb-4">Legal</div>
      <h1 className="text-[40px] md:text-[56px] tracking-[-0.025em] font-medium leading-[1.05]">
        Privacy Policy
      </h1>
      <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF]">
        Last updated · April 2026
      </div>

      <article className="mt-12 space-y-8 text-[16px] leading-[1.7] text-[#1f2937]">
        <p>
          StratifyAI ("we", "us") is operated by Nithish, building from India and serving clients globally.
          This page explains, plainly, what data we collect on this marketing website, why, and how you can
          control it.
        </p>

        <Section title="What we collect">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Demo requests.</strong> When you submit the contact form, we store: name, work email, company, website, industry, approximate revenue range, your free-text answer, and how you found us.</li>
            <li><strong>Anonymous traffic.</strong> Page views and basic device info via privacy-first analytics. We do not use Facebook Pixel or third-party ad trackers on this site.</li>
            <li><strong>Audit metadata.</strong> A salted hash of your IP address (not the IP itself) and your browser user agent, kept only for spam and abuse defense.</li>
          </ul>
        </Section>

        <Section title="What we don't collect">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Sensitive PII (no SSNs, government IDs, payment details).</li>
            <li>Health information (PHI). HIPAA-regulated data is only handled inside paid client engagements under a signed BAA — never via this site.</li>
            <li>Behavioral profiles for ad retargeting.</li>
          </ul>
        </Section>

        <Section title="How we use it">
          <p>
            We use your demo request to: reply to you (typically within 4 hours during India business hours),
            scope a possible engagement, and add you to our internal CRM. We will not sell or rent your
            information. We will not use it to train any AI model.
          </p>
        </Section>

        <Section title="Where it lives">
          <p>
            Data is stored in MongoDB Atlas. Transit is encrypted via TLS. Access is restricted to Nithish
            and named team members under contract.
          </p>
        </Section>

        <Section title="Your rights (GDPR / India DPDP)">
          <p>
            You can request a copy, correction, or deletion of your data at any time by emailing{" "}
            <a href="mailto:privacy@stratifyai.com" className="text-[#0066FF]">privacy@stratifyai.com</a>.
            We will respond within 14 days.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            We use a single first-party cookie to remember your cookie banner choice. Optional analytics
            cookies are only set if you click "Accept". Reject and the site still works fully.
          </p>
        </Section>

        <Section title="AI usage">
          <p>
            This marketing site does not run any LLM on your input. Our paid agent platform (Kai, Atlas,
            Nova, etc.) is a separate engagement governed by a signed Master Services Agreement and
            Data Processing Agreement, which detail our model providers, retention, and opt-out terms.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We will note the "Last updated" date at the top of this page when we change anything material.
            Material changes will also be emailed to active clients.
          </p>
        </Section>

        <p className="text-[14px] text-[#6B7280] pt-6 border-t border-[#E5E7EB]">
          Questions? Email{" "}
          <a href="mailto:hello@stratifyai.com" className="text-[#0066FF]">hello@stratifyai.com</a>{" "}
          or read the <Link to="/terms" className="text-[#0066FF]">Terms of Service</Link>.
        </p>
      </article>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-[22px] md:text-[24px] font-medium tracking-tight">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
