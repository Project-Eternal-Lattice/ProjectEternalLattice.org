import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

interface ReadingProgressBarProps {
  /** Show only on specific pages (by default shows on all pages) */
  showOnPaths?: string[];
}

export default function ReadingProgressBar({ showOnPaths }: ReadingProgressBarProps) {
  const [shouldShow, setShouldShow] = useState(true);
  const [percent, setPercent] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Under prefers-reduced-motion, track scroll directly (no spring easing) so
  // the bar still works but introduces no extra motion.
  const scaleX: MotionValue<number> = prefersReducedMotion ? scrollYProgress : smoothed;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(v * 100));
  });

  useEffect(() => {
    if (showOnPaths) {
      const currentPath = window.location.pathname;
      setShouldShow(showOnPaths.some((p) => currentPath.startsWith(p)));
    }
  }, [showOnPaths]);

  if (!shouldShow) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(0.7 0.15 280), oklch(0.75 0.12 320), oklch(0.8 0.15 80))",
      }}
    />
  );
}
