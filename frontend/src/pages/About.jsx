import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { FadeUp } from "@/components/Motion";
import { FOUNDER, TAGLINES } from "@/lib/site-data";

export default function About() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-20 md:pt-28 pb-16" data-testid="about-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#0066FF]/10 blur-3xl pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">About us</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[72px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              {TAGLINES.manifesto} <span className="text-[#9CA3AF]">Engineered into the work — not bolted on top of it.</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ===================== BODY ===================== */}
      <section className="pb-20 md:pb-28" data-testid="about-body">
        <div className="container-x">
          <article className="max-w-[760px] text-[18px] md:text-[19px] leading-[1.75] text-[#1f2937] space-y-7">
            <p>
              NAutomation Labs is <strong>India's first AI-native engineering labs</strong>. We design,
              build, and ship AI products for businesses that want outcomes — not experiments,
              not slide decks, not another tool to log into.
            </p>
            <p>
              The world is diving into AI. Most companies will buy a stack of disconnected SaaS
              tools and call it transformation. The ones that win will <strong>infuse AI into the work
              itself</strong> — quietly, deeply, and with engineers who understand both the AI and
              the business.
            </p>
            <p>
              We came up shipping production systems at Samsung and Reliance, where "almost
              working" is a failure mode. We brought that same discipline to AI. Every engagement
              starts with a real problem, ships a working MVP in 5–7 days, and reaches production
              in 14–21. You get the working software, your own dashboard, and a team that
              treats engineering as the product — not the slides around it.
            </p>
            <p className="text-[#0066FF] font-medium">
              If you want AI infused into your stack — talk to us. We'll quote in days, ship in weeks.
            </p>
          </article>
        </div>
      </section>

      {/* ===================== FOUNDER ===================== */}
      <section className="py-20 md:py-28 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="about-founder">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-10">The founder</div>

            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-3">
                <div className="aspect-square rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-dark opacity-50" />
                  <span className="text-white font-mono text-[88px] font-medium tracking-tighter relative">N</span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/30 font-mono text-[10px] tracking-wider uppercase text-[#00D4AA]">
                    {FOUNDER.title}
                  </span>
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">
                  {FOUNDER.name} · {FOUNDER.title}
                </div>
                <h3 className="mt-3 text-[26px] md:text-[34px] tracking-[-0.02em] font-medium leading-[1.15] max-w-[680px]">
                  Fusion of core engineering knowledge and applied AI.
                </h3>
                <p className="mt-5 text-[16px] text-[#4B5563] leading-relaxed max-w-[680px]">
                  {FOUNDER.bio}
                </p>

                <ul className="mt-7 grid sm:grid-cols-2 gap-2.5 max-w-[600px]">
                  {FOUNDER.background.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-[14.5px] text-[#0A0A0A]">
                      <Check className="w-4 h-4 text-[#00A37D] flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link to="/contact" className="btn-primary" data-testid="about-cta">
                    Talk to {FOUNDER.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="py-24 md:py-28" data-testid="about-final-cta">
        <div className="container-x text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] tracking-[-0.02em] leading-[1.05] max-w-[800px] mx-auto">
              {TAGLINES.bookCall}
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Book a call <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/projects" className="btn-ghost text-base px-8 py-4">
                See our projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
