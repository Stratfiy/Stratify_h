import { lazy, Suspense, useEffect, useRef, useState } from "react";
import HeroSpectrumFallback from "./HeroSpectrumFallback";

const HeroSpectrumCanvas = lazy(() => import("./HeroSpectrumCanvas"));

function isLowPowerDevice() {
  if (typeof window === "undefined") return true;
  const smallViewport = window.innerWidth < 768;
  const fewCores = (navigator.hardwareConcurrency || 4) <= 4;
  return smallViewport || fewCores;
}

// Signature hero visual: a generative audio-spectrum scene (WebGL) that
// degrades to a static waveform for reduced-motion / low-power / mobile.
// The 3D bundle is dynamically imported and deferred until idle so it never
// competes with the hero's text content for first paint.
export default function HeroSpectrum() {
  const containerRef = useRef(null);
  const [canRender3D, setCanRender3D] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || isLowPowerDevice()) {
      setCanRender3D(false);
      return undefined;
    }
    setCanRender3D(true);

    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = schedule(() => setShouldLoad(true));
    return () => cancel(id);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full" aria-hidden="true">
      {canRender3D && shouldLoad ? (
        <Suspense fallback={<HeroSpectrumFallback />}>
          <HeroSpectrumCanvas containerRef={containerRef} />
        </Suspense>
      ) : (
        <HeroSpectrumFallback />
      )}
    </div>
  );
}
