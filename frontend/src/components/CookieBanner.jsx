import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "stratify_cookie_consent_v1";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (!localStorage.getItem(KEY)) setShow(true);
      } catch (_storageErr) {
        // localStorage throws in Safari Private Mode and a few enterprise lockdowns.
        // Banner just stays hidden — that's the correct, privacy-respecting fallback.
      }
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const decide = (val) => {
    try {
      localStorage.setItem(KEY, val);
    } catch (_storageErr) {
      // Same private-mode case — choice won't persist across reloads, that's fine.
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 md:max-w-[460px] z-[60]"
          data-testid="cookie-banner"
        >
          <div className="dash-card p-5 md:p-6 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-[#0066FF]/10 flex items-center justify-center shrink-0">
              <Cookie className="w-4 h-4 text-[#0066FF]" />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-medium text-[#0A0A0A]">
                Cookies (the boring but honest kind)
              </div>
              <p className="mt-1.5 text-[13px] text-[#4B5563] leading-relaxed">
                We use a minimal cookie to remember this choice and anonymous analytics to improve the site.
                No advertising trackers. No selling your data.{" "}
                <a href="/privacy" className="text-[#0066FF] hover:underline">Privacy</a>.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => decide("accept")}
                  className="px-4 py-2 rounded-full bg-[#0A0A0A] text-white text-[12.5px] font-medium hover:bg-[#1a1a1a] transition-colors"
                  data-testid="cookie-accept"
                >
                  Accept
                </button>
                <button
                  onClick={() => decide("reject")}
                  className="px-4 py-2 rounded-full border border-[#E5E7EB] text-[#0A0A0A] text-[12.5px] font-medium hover:bg-[#F3F4F6] transition-colors"
                  data-testid="cookie-reject"
                >
                  Reject non-essential
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
