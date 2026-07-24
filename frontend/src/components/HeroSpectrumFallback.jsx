const BAR_COUNT = 24;

// Deterministic pseudo-waveform heights (no Math.random — stable across renders).
const HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  return 28 + Math.sin(t * Math.PI) * 52 + Math.sin(t * Math.PI * 4) * 10;
});

export default function HeroSpectrumFallback() {
  return (
    <div className="flex items-end justify-center gap-[5px] md:gap-[7px] h-full w-full px-6">
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className="w-[7px] md:w-2.5 rounded-full animate-pulse-soft"
          style={{
            height: `${h}%`,
            background: "linear-gradient(180deg, #3FE0D0, #1E9BE0)",
            animationDelay: `${(i % 6) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
