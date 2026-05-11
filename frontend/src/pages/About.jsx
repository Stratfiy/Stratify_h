import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/Motion";

export default function About() {
  return (
    <>
      <section className="relative pt-20 md:pt-28 pb-16" data-testid="about-hero">
        <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />
        <div className="container-x relative">
          <FadeUp>
            <div className="eyebrow mb-5">Manifesto</div>
            <h1 className="text-[40px] md:text-[60px] lg:text-[76px] leading-[1.04] tracking-[-0.025em] font-medium max-w-[1080px]">
              We're building the operating layer for AI labor.
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="pb-20 md:pb-28" data-testid="about-body">
        <div className="container-x">
          <article className="max-w-[760px] text-[18px] md:text-[19px] leading-[1.75] text-[#1f2937] space-y-7">
            <p>
              The first wave of AI was about <strong>answers</strong>. Ask GPT a question, get a paragraph
              back. The second wave is about <strong>action</strong>. AI agents that don't just think — they
              execute.
            </p>
            <p>
              Every business in the world is about to hire AI agents the way they once hired employees.
              Marketing. Sales. Support. Operations. Analytics. The work itself is changing — not because
              tools got better, but because there's finally a labor force that scales without breaking.
            </p>
            <p>
              Most companies will fumble this transition. They'll buy 47 disconnected SaaS tools and call
              it transformation. They'll hire a "Head of AI" to manage prompts. They'll spend two years
              figuring out what we already know: <strong>nobody wants another tool. They want the work done.</strong>
            </p>
            <p>
              That's where StratifyAI comes in. We deploy named AI agents — Kai, Atlas, Nova, Remy, Echo,
              Sage, Pulse — that run as a coordinated team. Each agent owns a stage of the loop that drives
              every business: <em>Create. Acquire. Convert. Retain.</em> They talk to each other. They never
              sleep. They cost a fraction of the team they replace.
            </p>
            <p>
              Today we serve DTC e-commerce brands and healthcare practices. Tomorrow it's finance,
              manufacturing, logistics, legal, education, and government. We are not building an agency.
              We are building the infrastructure that makes business operations programmable for any
              company, in any vertical, in any country.
            </p>
            <p>
              Our bet: the next $100B company in software won't be a tool. It'll be an operator.
            </p>
            <p className="text-[#0066FF] font-medium">
              If you want your work done — talk to us. If you want to build the future of agentic
              operations — we're hiring. Either way, this is the most exciting decade to be alive.
            </p>
          </article>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 md:py-28 bg-[#FBFBFD] border-y border-[#F3F4F6]" data-testid="about-founder">
        <div className="container-x">
          <FadeUp>
            <div className="eyebrow mb-10">The founders</div>

            {/* Nithish — Founder & CEO */}
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-3">
                <div className="aspect-square rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-dark opacity-50" />
                  <span className="text-white font-mono text-[88px] font-medium tracking-tighter relative">N</span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/30 font-mono text-[10px] tracking-wider uppercase text-[#00D4AA]">
                    Founder
                  </span>
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">
                  Nithish · Founder & CEO
                </div>
                <h3 className="mt-3 text-[26px] md:text-[34px] tracking-[-0.02em] font-medium leading-[1.15] max-w-[680px]">
                  NIT Durgapur. Built my first AI agent at 21 to recover abandoned carts for a friend's Shopify store.
                </h3>
                <p className="mt-5 text-[16px] text-[#4B5563] leading-relaxed max-w-[680px]">
                  It worked too well. He told 3 founders. They told 30. StratifyAI is what came out of that
                  — a real company building the future of how work gets done.
                </p>
                <div className="mt-7">
                  <Link to="/contact" className="btn-primary" data-testid="about-cta">
                    Talk to Nithish <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sri Harsha — Co-Founder */}
            <div className="grid md:grid-cols-12 gap-10 items-center mt-16 pt-16 border-t border-[#E5E7EB]">
              <div className="md:col-span-3">
                <div className="aspect-square rounded-2xl bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-dark opacity-50" />
                  <span className="text-white font-mono text-[88px] font-medium tracking-tighter relative">S</span>
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/30 font-mono text-[10px] tracking-wider uppercase text-[#00D4AA]">
                    Co-Founder
                  </span>
                </div>
              </div>
              <div className="md:col-span-9">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#0066FF]">
                  Sri Harsha · Co-Founder
                </div>
                <h3 className="mt-3 text-[26px] md:text-[34px] tracking-[-0.02em] font-medium leading-[1.15] max-w-[680px]">
                  NIT Durgapur. Ex-Samsung R&D. Linux kernel engineer turned AI builder.
                </h3>
                <p className="mt-5 text-[16px] text-[#4B5563] leading-relaxed max-w-[680px]">
                  Patched CVEs, optimized kernel performance by 20%, and built custom Linux OS
                  builds at Samsung Research. Now applying that same systems-level thinking to
                  StratifyAI — building AI agents that actually work under the hood.
                </p>
                <div className="mt-7">
                  <Link to="/contact" className="btn-primary">
                    Talk to Sri Harsha <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
