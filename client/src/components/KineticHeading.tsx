import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ElementType, useMemo } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                          KINETIC HEADING                                     ║
 * ║                                                                               ║
 * ║  A headline whose words rise and fade into place, one after another, as it    ║
 * ║  scrolls into view — turning a static title into an active utterance.         ║
 * ║                                                                               ║
 * ║  Honors prefers-reduced-motion: the full heading appears at once, no motion.  ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface KineticHeadingProps {
  text: string;
  /** Element to render (h1, h2, h3, p…). Defaults to h2. */
  as?: ElementType;
  className?: string;
  /** Seconds between each word. */
  stagger?: number;
  /** Reveal each time it enters the viewport, or only once. */
  once?: boolean;
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: { opacity: 1, y: "0em" },
};

export default function KineticHeading({
  text,
  as = "h2",
  className = "",
  stagger = 0.06,
  once = true,
}: KineticHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);
  const MotionTag = useMemo(() => motion(as), [as]);

  // Reduced motion: render the plain heading with no per-word animation.
  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
