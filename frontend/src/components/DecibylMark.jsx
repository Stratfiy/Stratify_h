const BAR_HEIGHTS = [0.4, 0.85, 0.6, 1, 0.5];

// decibyl wordmark — a small waveform glyph (the studio's sound-made-visible
// motif) + type. Code-built lockup; swap for a designed asset if one exists.
export default function DecibylMark({ className = "", textClassName = "text-[15px]" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex items-end gap-[2px] h-4" aria-hidden="true">
        {BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: `${h * 100}%`,
              background: i % 2 === 0 ? "#1E9BE0" : "#3FE0D0",
            }}
          />
        ))}
      </span>
      <span className={`font-medium tracking-tight ${textClassName}`}>decibyl</span>
    </span>
  );
}
