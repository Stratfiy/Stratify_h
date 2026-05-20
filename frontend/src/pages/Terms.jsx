import { FadeUp } from "@/components/Motion";

export default function Terms() {
  return (
    <section className="relative pt-20 md:pt-28 pb-28" data-testid="terms-page">
      <div className="absolute inset-0 bg-grid-soft opacity-40 pointer-events-none" />
      <div className="container-x relative max-w-[760px]">
        <FadeUp>
          <div className="eyebrow mb-5">Terms of use</div>
          <h1 className="text-[36px] md:text-[52px] tracking-[-0.025em] leading-[1.05] font-medium">
            Terms of use
          </h1>
          <p className="mt-4 font-mono text-[11px] tracking-wider uppercase text-[#6B7280]">
            Last updated · 2026
          </p>
        </FadeUp>

        <article className="mt-12 space-y-8 text-[15.5px] leading-[1.75] text-[#1f2937]">
          <p>
            By using nautomationlabs.com you agree to these terms. They cover this marketing website
            only — paid engagements with NAutomation Labs are governed by a separate Master Services
            Agreement (MSA) signed at the start of an engagement.
          </p>

          <Section title="1 · Use of the site">
            You may browse the site, contact us, and download any publicly shared resources for
            personal or business use. You may not scrape at scale, attempt to break or probe our
            systems, or impersonate NAutomation Labs in any communication.
          </Section>

          <Section title="2 · Lead submissions">
            Information you submit through forms is used to contact you about your enquiry. We do
            not sell or share this data. We may retain it for up to 24 months unless you ask us to
            delete it sooner.
          </Section>

          <Section title="3 · No professional advice">
            Content on this site is informational. Nothing here constitutes legal, medical,
            financial, or compliance advice. Any AI-generated outputs shown in marketing demos are
            illustrative. NAutomation Labs does not warrant that demo outputs reflect production
            behaviour of customer deployments.
          </Section>

          <Section title="4 · Intellectual property">
            All site content — copy, code, design, brand marks, and visuals — is the property of
            NAutomation Labs. You may not republish, redistribute, or train models on this content
            without written permission.
          </Section>

          <Section title="5 · Limitation of liability">
            To the maximum extent permitted by law, NAutomation Labs' liability arising from your
            use of this site is capped at INR 100. Engagement-level liability is governed by the
            relevant MSA.
          </Section>

          <Section title="6 · Changes">
            We may update these terms. Material changes will be reflected by updating the
            "Last updated" date above.
          </Section>

          <p className="pt-6 border-t border-[#E5E7EB]">
            Questions about these terms? Email{" "}
            <a href="mailto:office@nautomationlabs.com" className="text-[#0066FF]">office@nautomationlabs.com</a>{" "}
            or use the <a href="/contact" className="text-[#0066FF]">contact page</a>.
          </p>
        </article>
      </div>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-[20px] md:text-[22px] tracking-tight font-medium text-[#0A0A0A] mb-2">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
