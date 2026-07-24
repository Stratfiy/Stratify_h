import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEIGHTS = [10, 16, 24, 16, 10];

// A small waveform accent that pulses in once as it scrolls into view —
// a quiet callback to the hero's signature visual, threading the
// sound-made-visible motif through the page instead of confining it
// to one section.
export default function WaveformDivider({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bars = containerRef.current?.querySelectorAll("[data-wave-bar]");
    if (!bars?.length) return undefined;

    if (reduceMotion) {
      gsap.set(bars, { scaleY: 1, opacity: 1 });
      return undefined;
    }

    gsap.set(bars, { scaleY: 0.2, opacity: 0.25, transformOrigin: "bottom" });
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(bars, {
          scaleY: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex items-end justify-center gap-1.5 h-6 ${className}`}
      aria-hidden="true"
    >
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          data-wave-bar
          className="w-[3px] rounded-full"
          style={{ height: `${h}px`, background: i % 2 === 0 ? "#1E9BE0" : "#3FE0D0" }}
        />
      ))}
    </div>
  );
}
