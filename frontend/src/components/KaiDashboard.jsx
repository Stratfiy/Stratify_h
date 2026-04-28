import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowUpRight, Check, Sparkles, Upload } from "lucide-react";

/**
 * KaiDashboard — animated hero mockup
 * Loop choreography:
 *  0  – idle / "Pulling latest UGC from Echo"
 *  1  – "Generating 3 ad variants" (3 thumbnail tiles fade in)
 *  2  – "Uploading to Meta Ads Manager"
 *  3  – Success + ROAS notification
 * Total ~9s loop
 */
const STEPS = [
  { id: 0, label: "Pulling latest UGC", agent: "Echo", action: "review_id_8821" },
  { id: 1, label: "Generating 3 ad variants", agent: "Kai", action: "render_pipeline" },
  { id: 2, label: "Uploading to Meta Ads Manager", agent: "Kai", action: "graph_api_v19" },
  { id: 3, label: "Live · Approved by you", agent: "Pulse", action: "tracking_started" },
];

const VARIANT_LABELS = ["Hook · 9:16", "Body · 1:1", "Lead · 16:9"];

// Replaces nested ternary — clearer to scan and easier to extend later.
function StepIcon({ step }) {
  if (step === 3) return <Check className="w-4 h-4 text-[#00A37D]" />;
  if (step === 2) return <Upload className="w-4 h-4 text-[#0066FF]" />;
  if (step === 1) return <Sparkles className="w-4 h-4 text-[#0066FF]" />;
  return <ArrowUpRight className="w-4 h-4 text-[#0066FF]" />;
}

export default function KaiDashboard() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const tick = () => {
      if (cancelled) return;
      setStep(i % STEPS.length);
      setProgress(0);
      const dur = i % STEPS.length === 2 ? 2400 : 1800;
      const start = Date.now();
      const interval = setInterval(() => {
        const p = Math.min(100, ((Date.now() - start) / dur) * 100);
        setProgress(p);
        if (p >= 100) clearInterval(interval);
      }, 60);

      // Add a log line with a stable id so React keys are reliable.
      const s = STEPS[i % STEPS.length];
      const ts = new Date();
      setLogs((prev) => [
        ...prev.slice(-3),
        {
          id: `${ts.getTime()}-${i}`,
          line: `[${ts.toISOString().slice(11, 19)}] ${s.agent.toLowerCase()}.${s.action}`,
        },
      ]);

      i++;
      setTimeout(tick, dur + 400);
    };
    tick();
    return () => { cancelled = true; };
  }, []);

  const cur = STEPS[step];

  return (
    <div className="relative" data-testid="hero-kai-dashboard">
      {/* Soft glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-[#0066FF]/10 via-transparent to-[#00D4AA]/10 blur-3xl rounded-[40px] -z-10" />

      <div className="dash-card overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="font-mono text-[11px] tracking-wider text-[#9CA3AF] uppercase">
            stratifyai · agents · kai
          </div>
          <div className="flex items-center gap-1.5">
            <span className="agent-dot" />
            <span className="font-mono text-[10px] text-[#00A37D] tracking-wider uppercase">Live</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 space-y-5 bg-[#FBFBFD]">
          {/* Top row: agent identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-[14px] font-medium">
              K
            </div>
            <div>
              <div className="text-[14px] font-medium text-[#0A0A0A] leading-tight">Kai</div>
              <div className="font-mono text-[11px] tracking-wider text-[#6B7280] uppercase">Creative · Ad Production</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-[#00A37D]">
              <Activity className="w-3.5 h-3.5" />
              <span className="text-[12px] font-mono">+45% ROAS</span>
            </div>
          </div>

          {/* Status + progress */}
          <div className="rounded-xl border border-[#EDEEF1] bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StepIcon step={step} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cur.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-[13.5px] text-[#0A0A0A]"
                  >
                    {cur.label}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="font-mono text-[11px] text-[#9CA3AF]">
                step 0{step + 1}/04
              </span>
            </div>
            <div className="mt-3 h-1 rounded-full bg-[#F3F4F6] overflow-hidden">
              <motion.div
                className={`h-full ${step === 3 ? "bg-[#00D4AA]" : "bg-[#0066FF]"}`}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>

          {/* Variant tiles */}
          <div className="grid grid-cols-3 gap-3">
            {VARIANT_LABELS.map((label, idx) => {
              const visible = step >= 1;
              const success = step >= 2;
              return (
                <motion.div
                  key={label}
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0.25,
                    y: visible ? 0 : 6,
                  }}
                  transition={{ duration: 0.4, delay: idx * 0.12 }}
                  className="rounded-lg border border-[#EDEEF1] bg-white overflow-hidden"
                >
                  <div className="aspect-[4/5] bg-gradient-to-br from-[#0A0A0A] via-[#1c1f29] to-[#0A0A0A] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/80 font-mono text-[10px] tracking-widest uppercase">{label}</div>
                    </div>
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-white/10 backdrop-blur text-[9px] font-mono text-white/80 tracking-wider uppercase">
                      kai-{idx + 1}
                    </div>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#00D4AA] flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-[#0A0A0A]" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Logs terminal */}
          <div className="rounded-lg bg-[#0A0A0A] p-3 font-mono text-[11px] leading-[1.6] text-[#9CA3AF] min-h-[88px]">
            <div className="text-[#00D4AA]">$ stratify run --agent kai</div>
            {logs.map((entry) => (
              <div key={entry.id} className="opacity-90">{entry.line}</div>
            ))}
            <div className="opacity-60">{step === 3 ? "✓ live · ROAS tracking ↗" : "•"} <span className="animate-pulse">_</span></div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-4 md:-left-10 dash-card px-4 py-3 flex items-center gap-3 max-w-[320px]"
          >
            <div className="w-8 h-8 rounded-full bg-[#00D4AA]/15 flex items-center justify-center">
              <Check className="w-4 h-4 text-[#00A37D]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[#0A0A0A] leading-tight">3 ads approved · live on Meta</div>
              <div className="font-mono text-[10.5px] tracking-wider uppercase text-[#6B7280] mt-0.5">ROAS tracking started</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
