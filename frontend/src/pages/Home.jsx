import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSpectrum from "@/components/HeroSpectrum";
import DecibylMark from "@/components/DecibylMark";
import WaveformDivider from "@/components/WaveformDivider";
import JsonLd from "@/components/JsonLd";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { FadeUp } from "@/components/Motion";
import { DECIBYL, STUDIO_PRINCIPLES, FAQS, NDA_BRANDS } from "@/lib/site-data";
import {
  buildOrganizationSchema, buildSoftwareApplicationSchema, buildFaqSchema,
} from "@/lib/seo-data";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroSectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const decibylFeaturesRef = useRef(null);
  const principlesGridRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const triggers = [];

    // Hero exit handoff — text column eases out as the hero scrolls past,
    // scrubbed against the same scroll range driving the 3D bars.
    if (heroSectionRef.current && heroTextRef.current) {
      triggers.push(
        ScrollTrigger.create({
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(heroTextRef.current, {
              opacity: 1 - self.progress * 0.6,
              y: -self.progress * 40,
            });
          },
        })
      );
    }

    // decibyl feature cards — scrubbed reveal, like a fader row activating
    // as the section scrolls into view, rather than a one-shot fade-up.
    const featureCards = decibylFeaturesRef.current?.querySelectorAll("[data-feature-card]");
    if (featureCards?.length) {
      gsap.set(featureCards, { opacity: 0, x: -30 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: decibylFeaturesRef.current,
          start: "top 85%",
          end: "top 40%",
          scrub: true,
        },
      });
      tl.to(featureCards, { opacity: 1, x: 0, stagger: 0.15, ease: "none" });
      triggers.push(tl.scrollTrigger);
    }

    // Studio-principle cards + connectors — sequenced left to right so the
    // section reads as a flow, not three tiles appearing at once.
    const principleCards = principlesGridRef.current?.querySelectorAll("[data-principle-card]");
    const connectors = principlesGridRef.current?.querySelectorAll("[data-principle-connector]");
    if (principleCards?.length) {
      gsap.set(principleCards, { opacity: 0, y: 20 });
      if (connectors?.length) gsap.set(connectors, { opacity: 0, scale: 0.5 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: principlesGridRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
      });
      principleCards.forEach((card, i) => {
        tl.to(card, { opacity: 1, y: 0, ease: "none" }, i * 0.3);
        if (connectors?.[i]) {
          tl.to(connectors[i], { opacity: 1, scale: 1, ease: "none" }, i * 0.3 + 0.15);
        }
      });
      triggers.push(tl.scrollTrigger);
    }

    return () => triggers.forEach((t) => t?.kill());
  }, []);

  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildSoftwareApplicationSchema()} />
      <JsonLd data={buildFaqSchema()} />

      {/* ===================== HERO ===================== */}
      <section
        ref={heroSectionRef}
        className="relative py-24 md:py-32 lg:py-36 overflow-hidden bg-brand-navy text-white"
        data-testid="home-hero"
      >
        <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full bg-[#3FE0D0]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-40 w-[600px] h-[600px] rounded-full bg-[#1E9BE0]/15 blur-3xl pointer-events-none" />

        <div className="container-x relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div ref={heroTextRef} className="lg:col-span-7">
              <FadeUp>
                <div className="eyebrow flex items-center gap-2.5 text-[#4FB8EE]">
                  <span className="agent-dot" />
                  AI agents & workflows that operate
                </div>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h1 className="mt-7 text-[38px] sm:text-[54px] lg:text-[72px] leading-[1.03] tracking-[-0.03em] font-extrabold">
                  An AI-native studio.
                  <br />
                  We build agents that <span className="text-[#3FE0D0]">operate</span> — not just assist.
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-8 text-[18px] md:text-[21px] leading-[1.6] text-white/70 max-w-[600px]">
                  NAutomation Labs designs and ships AI agents that run real jobs end to end. Our
                  first product is <DecibylMark textClassName="text-white" />, the AI voice agent
                  platform behind it.
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={DECIBYL.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    data-testid="hero-cta-decibyl"
                  >
                    Explore decibyl <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link to="/contact" className="btn-outline-dark" data-testid="hero-cta-contact">
                    Talk to us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="mt-10 flex items-center gap-3 text-[13px] text-white/50">
                  <span className="agent-dot" />
                  <span className="font-mono tracking-wider uppercase text-[11px]">
                    Ex-Samsung · Ex-RIL · NIT — building production AI, not demos
                  </span>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-5">
              <FadeUp delay={0.2}>
                <div className="glass-dark rounded-2xl overflow-hidden h-[360px] md:h-[440px] relative">
                  <div className="absolute top-5 left-6 z-10 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-white/50">
                    <span className="agent-dot" />
                    Sound, made visible
                  </div>
                  <HeroSpectrum />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LOGO BAR ===================== */}
      <section className="py-12 border-y border-white/50 glass-band" data-testid="home-logos">
        <div className="container-x">
          <div className="text-center eyebrow mb-6">Built and delivered — in production</div>
          <Marquee speed={28} gradient gradientColor="#FBFBFD" gradientWidth={80}>
            {NDA_BRANDS.concat(NDA_BRANDS).map((b, i) => (
              <span key={`${b}__${i}`} className="nda-pill mx-3">{b}</span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================== DECIBYL SPOTLIGHT ===================== */}
      <section className="py-32 md:py-44" data-testid="home-decibyl">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">The flagship product</div>
            <DecibylMark textClassName="text-[32px] md:text-[40px] tracking-tight" className="mb-5" />
            <h2 className="text-4xl md:text-5xl lg:text-[60px] leading-[1.05] tracking-[-0.02em] max-w-[860px]">
              {DECIBYL.tagline}
            </h2>
            <p className="mt-6 text-[17px] md:text-[18px] text-[#4B5563] max-w-[720px] leading-relaxed">
              decibyl makes and answers calls like a trained rep, connected to the tools and CRMs
              you already run — no scripts to maintain, no servers to manage. It's our{" "}
              <a
                href={DECIBYL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E9BE0] underline underline-offset-2 hover:text-[#1781BE]"
              >
                AI voice agent platform
              </a>
              , built by NAutomation Labs with its own identity at decibyl.ai.
            </p>
          </FadeUp>

          <div ref={decibylFeaturesRef} className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {DECIBYL.features.map((f) => (
              <div key={f.title} data-feature-card className="card-base p-6 h-full">
                <div className="text-[18px] font-medium tracking-tight text-[#0A0A0A]">{f.title}</div>
                <p className="mt-3 text-[14px] text-[#4B5563] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {DECIBYL.outcomes.map((o) => (
              <div key={o.label} className="flex items-center gap-2 text-[13px] text-[#4B5563]">
                <span className="agent-dot" />
                <span className="font-mono tracking-wide uppercase text-[11px]">{o.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={DECIBYL.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-testid="decibyl-cta"
            >
              Explore decibyl <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <WaveformDivider className="opacity-80" />

      {/* ===================== HOW WE BUILD ===================== */}
      <section className="relative py-32 md:py-44 ink-band text-white overflow-hidden" data-testid="home-principles">
        <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
        <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[#1E9BE0]/15 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#4FB8EE] mb-4">
              How we build
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[60px] tracking-[-0.02em] max-w-[880px] leading-[1.05]">
              Studio principles — our design north stars.
            </h2>
          </FadeUp>

          <div ref={principlesGridRef} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {STUDIO_PRINCIPLES.map((p, i, arr) => (
              <div key={p.n} data-principle-card className="relative glass-dark p-6 h-full">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#4FB8EE]">
                  {p.n}
                </div>
                <div className="mt-2 text-[22px] font-medium tracking-tight">{p.title}</div>
                <p className="mt-3 text-[14px] text-white/65 leading-relaxed">{p.desc}</p>
                {i < arr.length - 1 && (
                  <ArrowRight
                    data-principle-connector
                    className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white bg-[#1E9BE0] rounded-full p-0.5 z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT'S NEXT ===================== */}
      <section className="py-20 md:py-28" data-testid="home-whats-next">
        <div className="container-x">
          <FadeUp className="max-w-[720px]">
            <div className="eyebrow mb-4 text-[#9CA3AF]">What's next</div>
            <h3 className="text-2xl md:text-3xl tracking-[-0.01em] leading-[1.2] text-[#0A0A0A] font-medium">
              We also build AI on top of the ERP, SCADA, and IoT heavy industry already runs.
            </h3>
            <p className="mt-4 text-[15px] text-[#4B5563] leading-relaxed">
              decibyl is today's focus. The industrial operating-layer work continues quietly
              alongside it — eight sectors, one engine.
            </p>
            <Link to="/industries" className="btn-ghost mt-6" data-testid="whats-next-cta">
              Explore industries <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeUp>
        </div>
      </section>

      <WaveformDivider className="opacity-80" />

      {/* ===================== FAQ ===================== */}
      <section className="py-32 md:py-44 glass-band border-y border-white/50" data-testid="home-faq">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-6">FAQ</div>
            <h2 className="text-4xl md:text-5xl tracking-[-0.02em] max-w-[700px] leading-[1.05]">
              Questions, answered.
            </h2>
          </FadeUp>

          <FadeUp className="mt-14 max-w-[820px]">
            <Accordion type="single" collapsible className="card-base px-6 md:px-8">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`} className="border-white/50">
                  <AccordionTrigger className="text-[16px] md:text-[17px] font-medium text-[#0A0A0A] py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-[#4B5563] leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeUp>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="pt-8 pb-36 md:pb-52" data-testid="home-final-cta">
        <div className="container-x">
          <div className="card-base p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-[#1E9BE0]/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="eyebrow mb-6">The next move</div>
              <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-[-0.02em] leading-[1.05] max-w-[820px] mx-auto">
                Curious what a voice agent could do for your calls?
              </h2>
              <p className="mt-5 text-[16px] md:text-[18px] text-[#4B5563] max-w-[560px] mx-auto">
                See decibyl live, or talk to the team about what AI-native could mean for your workflow.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <a
                  href={DECIBYL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base px-8 py-4"
                  data-testid="final-cta-decibyl"
                >
                  Explore decibyl <ArrowRight className="w-4 h-4" />
                </a>
                <Link to="/contact" className="btn-ghost text-base px-8 py-4" data-testid="final-cta-contact">
                  Talk to us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
