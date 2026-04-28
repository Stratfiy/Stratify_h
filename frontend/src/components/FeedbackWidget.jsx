import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, X, MessageSquare, Check } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Reset state when reopened.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setRating(null);
        setNote("");
        setDone(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const submit = async (chosen) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/feedback`, {
        page: window.location.pathname,
        rating: chosen || rating,
        note,
      });
      setDone(true);
    } catch (_) {
      setDone(true); // fail-quiet: never block the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-[55] w-11 h-11 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:bg-[#1a1a1a] transition-colors"
        aria-label="Send feedback"
        data-testid="feedback-toggle"
      >
        <MessageSquare className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-5 z-[55] w-[300px] dash-card p-5"
            data-testid="feedback-panel"
          >
            <div className="flex items-start justify-between">
              <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#9CA3AF]">
                Quick feedback
              </div>
              <button
                onClick={() => setOpen(false)}
                className="-mt-1 -mr-1 p-1 text-[#9CA3AF] hover:text-[#0A0A0A]"
                aria-label="Close"
                data-testid="feedback-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {done ? (
              <div className="mt-4 text-center py-3">
                <div className="mx-auto w-10 h-10 rounded-full bg-[#00D4AA]/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#00A37D]" />
                </div>
                <div className="mt-3 text-[14px] font-medium text-[#0A0A0A]">Thanks — we read every note.</div>
              </div>
            ) : (
              <>
                <div className="mt-3 text-[14px] text-[#0A0A0A] leading-snug">
                  Was this page useful?
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => { setRating("up"); }}
                    className={`flex-1 py-2 rounded-xl border transition-colors flex items-center justify-center gap-1.5 text-[13px] ${
                      rating === "up"
                        ? "bg-[#00D4AA]/10 border-[#00D4AA]/40 text-[#00A37D]"
                        : "border-[#E5E7EB] text-[#0A0A0A] hover:bg-[#F3F4F6]"
                    }`}
                    data-testid="feedback-up"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> Yes
                  </button>
                  <button
                    onClick={() => { setRating("down"); }}
                    className={`flex-1 py-2 rounded-xl border transition-colors flex items-center justify-center gap-1.5 text-[13px] ${
                      rating === "down"
                        ? "bg-[#0066FF]/10 border-[#0066FF]/30 text-[#0066FF]"
                        : "border-[#E5E7EB] text-[#0A0A0A] hover:bg-[#F3F4F6]"
                    }`}
                    data-testid="feedback-down"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" /> No
                  </button>
                </div>

                {rating && (
                  <>
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value.slice(0, 500))}
                      placeholder={rating === "up" ? "What worked?" : "What was missing?"}
                      className="mt-3 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0066FF] resize-none"
                      data-testid="feedback-note"
                    />
                    <button
                      onClick={() => submit()}
                      disabled={submitting}
                      className="mt-3 w-full btn-primary py-2 text-[13.5px] disabled:opacity-60"
                      data-testid="feedback-submit"
                    >
                      {submitting ? "Sending..." : "Send"}
                    </button>
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
