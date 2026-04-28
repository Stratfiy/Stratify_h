import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <section className="container-x py-20 md:py-28 max-w-[820px]" data-testid="terms-page">
      <div className="eyebrow mb-4">Legal</div>
      <h1 className="text-[40px] md:text-[56px] tracking-[-0.025em] font-medium leading-[1.05]">
        Terms of Service
      </h1>
      <div className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[#9CA3AF]">
        Last updated · April 2026
      </div>

      <article className="mt-12 space-y-8 text-[16px] leading-[1.7] text-[#1f2937]">
        <p>
          By using stratifyai.com you agree to these terms. They cover this marketing website only — paid
          engagements with StratifyAI are governed by a separate Master Services Agreement (MSA) signed at
          contract.
        </p>

        <Section title="Use of the site">
          <p>
            You may browse, share, and read any public content. You may not scrape the site automatically,
            attempt to break or probe our systems, or impersonate StratifyAI in any communication.
          </p>
        </Section>

        <Section title="Demo requests">
          <p>
            Submitting a demo request does not create a contract. It begins a conversation. A binding
            engagement only exists once both parties countersign an MSA and Statement of Work.
          </p>
        </Section>

        <Section title="AI-generated content">
          <p>
            Any AI-generated outputs you may see in marketing demos are illustrative. StratifyAI does not
            warrant that AI outputs are factually correct, free of bias, or fit for a particular purpose.
            For paid engagements, output ownership and liability are defined in the MSA.
          </p>
        </Section>

        <Section title="Intellectual property">
          <p>
            All site content — including text, design, agent names (Kai, Atlas, Nova, Remy, Echo, Sage,
            Pulse, Iris, Ambra, Vera, Cora), and visuals — is the property of StratifyAI. You may not
            redistribute or rebrand it without written permission.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, StratifyAI's liability arising from your use of this
            marketing site is limited to USD $100. This cap does not apply to paid engagements, which
            carry their own contractual liability terms.
          </p>
        </Section>

        <Section title="Governing law">
          <p>
            These terms are governed by the laws of India. Any dispute will be resolved in the courts of
            Bengaluru, India, unless we mutually agree to arbitration.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may update these terms. The "Last updated" date will reflect any change. Continued use of
            the site after changes constitutes acceptance.
          </p>
        </Section>

        <p className="text-[14px] text-[#6B7280] pt-6 border-t border-[#E5E7EB]">
          Questions? Email{" "}
          <a href="mailto:hello@stratifyai.com" className="text-[#0066FF]">hello@stratifyai.com</a>{" "}
          or read the <Link to="/privacy" className="text-[#0066FF]">Privacy Policy</Link>.
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
