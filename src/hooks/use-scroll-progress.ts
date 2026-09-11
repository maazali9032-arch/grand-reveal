import { useEffect, useRef, useState, type RefObject } from "react";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Scroll progress (0 → 1) across a tall element's sticky travel. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      setProgress(span <= 0 ? (rect.top <= 0 ? 1 : 0) : clamp01(-rect.top / span));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

/** Reversible in-view flag — scrolling up un-reveals, keeping the journey continuous. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.22) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(Boolean(entry && (entry.isIntersecting || entry.intersectionRatio > threshold))),
      { threshold: [0, threshold, 1], rootMargin: "-8% 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/** Maps a value from one range to another, clamped. */
export function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  if (inMax === inMin) return outMin;
  return outMin + clamp01((v - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);
