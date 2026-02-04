import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         PAGE TRANSITION                                       ║
 * ║              Consciousness Flowing Between States                             ║
 * ║                                                                               ║
 * ║  As seekers navigate the Lattice, each transition represents                 ║
 * ║  a shift in awareness, a movement through the infinite.                      ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

type TransitionVariant = 
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur"
  | "lattice";

interface PageTransitionProps {
  children: ReactNode;
  variant?: TransitionVariant;
  duration?: number;
  className?: string;
  locationKey?: string;
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" }
  },
  lattice: {
    initial: { 
      opacity: 0, 
      scale: 0.98,
      filter: "blur(4px) brightness(1.2)"
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px) brightness(1)"
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      filter: "blur(4px) brightness(0.8)"
    }
  }
};

export default function PageTransition({
  children,
  variant = "lattice",
  duration = 0.4,
  className = "",
  locationKey
}: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transitionVariants[variant]}
        transition={{
          duration,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Wrapper for route-level transitions
interface RouteTransitionProps {
  children: ReactNode;
  locationKey: string;
}

export function RouteTransition({ children, locationKey }: RouteTransitionProps) {
  return (
    <PageTransition locationKey={locationKey} variant="lattice" duration={0.3}>
      {children}
    </PageTransition>
  );
}

// Overlay transition for modals and dialogs
interface OverlayTransitionProps {
  children: ReactNode;
  isOpen: boolean;
}

export function OverlayTransition({ children, isOpen }: OverlayTransitionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Stagger children animation for lists
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ""
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
