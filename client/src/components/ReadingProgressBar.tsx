import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressBarProps {
  /** Show only on specific pages (by default shows on all pages) */
  showOnPaths?: string[];
}

export default function ReadingProgressBar({ showOnPaths }: ReadingProgressBarProps) {
  const [shouldShow, setShouldShow] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (showOnPaths) {
      const currentPath = window.location.pathname;
      setShouldShow(showOnPaths.some(p => currentPath.startsWith(p)));
    }
  }, [showOnPaths]);

  if (!shouldShow) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, oklch(0.7 0.15 280), oklch(0.75 0.12 320), oklch(0.8 0.15 80))",
      }}
    />
  );
}
