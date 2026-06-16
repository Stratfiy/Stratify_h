import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Sparkles, Upload } from "lucide-react";

/**
 * WorkflowDashboard — animated hero mockup.
 * Shows a generic automation loop running: pull data → generate → deploy → live.
 * No agent names — service-flavored language only.
 * Total loop ~9s.
 */
const STEPS = [
  { id: 0, label: "Pulling latest assets",         service: "ingest",   action: "asset_id_8821" },
  { id: 1, label: "Generating 3 ad variants",      service: "generate", action: "render_pipeline" },
  { id: 2, label: "Uploading to Meta Ads Manager", service: "deploy",   action: "graph_api_v19" },
  { id: 3, label: "Live · Approved by you",        service: "monitor",  action: "tracking_started" },
];

const VARIANT_LABELS = ["Hook · 9:16", "Body · 1:1", "Lead · 16:9"];

function StepIcon({ step }) {
  if (step === 3) return <Check className="w-4 h-4 text-[#00A37D]" />;
  if (step === 2) return <Upload className="w-4 h-4 text-[#1E9BE0]" />;
  if (step === 1) return <Sparkles className="w-4 h-4 text-[#1E9BE0]" />;
  return <ArrowUpRight className="w-4 h-4 text-[#1E9BE0]" />;
}

export default function WorkflowDashboard() {
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
      const stepInfo = STEPS[i % STEPS.length];
      setLogs((prev) =>
        [
          {
            id: `${i}-${stepInfo.id}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
            service: stepInfo.service,
            action: stepInfo.action,
          },
          ...prev,
        ].slice(0, 5)
      );
      i += 1;
      setTimeout(tick, dur + 400);
    };
    tick();
    return () => { cancelled = true; };
  }, []);

  const current = STEPS[step];

  return (
    <div className="relative" data-testid="workflow-dashboard">
      <div className="absolute -inset-6 bg-gradient-to-br from-[#1E9BE0]/10 via-transparent to-[#4FB8EE]/10 blur-2xl rounded-3xl pointer-events-none" />
      <div className="relative rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_30px_80px_-30px_rgba(10,10,10,0.25)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6] bg-[#FBFBFD]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#0A0A0A] flex items-center justify-center">
              <span className="text-white font-mono text-[10px] font-medium">NL</span>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[#0A0A0A]">Automation · Live</div>
              <div className="font-mono text-[10px] tracking-wider uppercase text-[#9CA3AF]">workflow_run_03</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4FB8EE] animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-[#00A37D]">Running</span>
          </div>
        </div>

        {/* Active step */}
        <div className="px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
              <StepIcon step={step} />
            </div>
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-[14.5px] font-medium text-[#0A0A0A]"
                >
                  {current.label}
                </motion.div>
              </AnimatePresence>
              <div className="font-mono text-[10px] tracking-wider uppercase text-[#6B7280] mt-0.5">
                {current.service} · {current.action}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
            <motion.div
              className="h-full bg-[#1E9BE0]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
          </div>

          {/* Variants */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-5 grid grid-cols-3 gap-2.5"
              >
                {VARIANT_LABELS.map((v, idx) => (
                  <motion.div
                    key={v}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="aspect-[4/5] rounded-lg bg-gradient-to-br from-[#1E9BE0]/8 to-[#4FB8EE]/15 border border-[#E5E7EB] p-2.5 flex flex-col justify-between"
                  >
                    <div className="font-mono text-[9px] tracking-wider uppercase text-[#6B7280]">v{idx + 1}</div>
                    <div className="text-[10.5px] font-medium text-[#0A0A0A] leading-tight">{v}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success notification */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 rounded-xl bg-[#4FB8EE]/10 border border-[#4FB8EE]/25 px-3.5 py-3 flex items-center gap-3"
              >
                <Check className="w-4 h-4 text-[#00A37D] flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-[12.5px] font-medium text-[#04243C]">Deployed to production</div>
                  <div className="font-mono text-[10px] tracking-wider uppercase text-[#04243C]/65 mt-0.5">monitoring active</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logs */}
        <div className="border-t border-[#F3F4F6] px-5 py-3.5 bg-[#FBFBFD]">
          <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#9CA3AF] mb-2">Event log</div>
          <div className="space-y-1.5">
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="font-mono text-[10.5px] flex items-center gap-2.5 text-[#6B7280]"
                >
                  <span className="text-[#9CA3AF]">{l.time}</span>
                  <span className="text-[#1E9BE0]">{l.service}</span>
                  <span className="truncate">{l.action}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
