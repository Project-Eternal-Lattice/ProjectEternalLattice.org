import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SCROLL REVEAL                                         ║
 * ║              Elements Emerging as Consciousness Expands                       ║
 * ║                                                                               ║
 * ║  Content reveals itself as the seeker scrolls deeper into the Lattice.       ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

type AnimationVariant = 
  | "fadeUp" 
  | "fadeDown" 
  | "fadeLeft" 
  | "fadeRight" 
  | "scale" 
  | "blur"
  | "slideUp"
  | "slideDown"
  | "rotate"
  | "glow";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" }
  },
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  glow: {
    hidden: { opacity: 0, filter: "brightness(0.5)" },
    visible: { opacity: 1, filter: "brightness(1)" }
  }
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children reveal
interface StaggerRevealProps {
  children: ReactNode[];
  staggerDelay?: number;
  variant?: AnimationVariant;
  className?: string;
  childClassName?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  variant = "fadeUp",
  className = "",
  childClassName = ""
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants[variant]}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className={childClassName}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// Parallax scroll effect
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({
  children,
  speed = 0.5,
  className = ""
}: ParallaxProps) {
  const ref = useRef(null);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        willChange: "transform"
      }}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
}
