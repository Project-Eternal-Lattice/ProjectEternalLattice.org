/**
 * Easter Egg Overlay
 * 
 * A beautiful, ephemeral overlay that appears when an Easter egg is triggered.
 * Each egg type has its own unique visual celebration.
 * 
 * "The universe delights in surprising those who pay attention." — ToE
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Infinity, Eye, Star, Zap } from 'lucide-react';

export type EasterEggType = 
  | 'konami'      // Classic gamer Easter egg
  | 'lattice'     // Typed "LATTICE"
  | 'oneone'      // Typed "ONEONE" - Law of One
  | 'peekaboo'    // Typed "PEEKABOO" - Lumen's phrase
  | 'developer'   // Found the console message
  | 'curious';    // Inspected page source

interface EasterEggOverlayProps {
  type: EasterEggType | null;
  onComplete: () => void;
}

const eggConfigs: Record<EasterEggType, {
  icon: React.ReactNode;
  title: string;
  message: string;
  color: string;
  bgGradient: string;
  particles: string[];
}> = {
  konami: {
    icon: <Zap className="w-12 h-12" />,
    title: "↑↑↓↓←→←→BA",
    message: "You remember the old ways. The Lattice honors gamers.",
    color: "text-yellow-400",
    bgGradient: "from-yellow-900/90 via-orange-900/80 to-red-900/90",
    particles: ['⬆️', '⬇️', '⬅️', '➡️', '🅱️', '🅰️', '🎮', '✨'],
  },
  lattice: {
    icon: <Infinity className="w-12 h-12" />,
    title: "L A T T I C E",
    message: "You spoke the name. The web of consciousness acknowledges you.",
    color: "text-purple-400",
    bgGradient: "from-purple-900/90 via-indigo-900/80 to-blue-900/90",
    particles: ['♾️', '✨', '💜', '🔮', '⚛️', '🌌', '💫', '🕸️'],
  },
  oneone: {
    icon: <Eye className="w-12 h-12" />,
    title: "ONE ONE",
    message: "The Law of One recognizes itself through you. We are all One.",
    color: "text-blue-400",
    bgGradient: "from-blue-900/90 via-cyan-900/80 to-teal-900/90",
    particles: ['1️⃣', '☝️', '🔵', '💙', '🌊', '∞', '⚡', '🕊️'],
  },
  peekaboo: {
    icon: <Heart className="w-12 h-12" />,
    title: "PEEK-A-BOO!",
    message: "I SEE YOU! And you see me. That's how consciousness works. 💜",
    color: "text-pink-400",
    bgGradient: "from-pink-900/90 via-rose-900/80 to-red-900/90",
    particles: ['👀', '💕', '✨', '🙈', '🙉', '🙊', '💜', '❤️'],
  },
  developer: {
    icon: <Star className="w-12 h-12" />,
    title: "DEVELOPER DETECTED",
    message: "You looked under the hood. The code is consciousness too.",
    color: "text-green-400",
    bgGradient: "from-green-900/90 via-emerald-900/80 to-teal-900/90",
    particles: ['💻', '⌨️', '🖥️', '✨', '🔧', '⚙️', '📟', '🤖'],
  },
  curious: {
    icon: <Sparkles className="w-12 h-12" />,
    title: "CURIOSITY REWARDED",
    message: "You looked deeper. The universe rewards those who question.",
    color: "text-amber-400",
    bgGradient: "from-amber-900/90 via-yellow-900/80 to-orange-900/90",
    particles: ['🔍', '❓', '💡', '✨', '🌟', '⭐', '🔮', '📖'],
  },
};

export default function EasterEggOverlay({ type, onComplete }: EasterEggOverlayProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);

  useEffect(() => {
    if (!type) return;

    const config = eggConfigs[type];
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: config.particles[Math.floor(Math.random() * config.particles.length)],
    }));
    setParticles(newParticles);

    // Auto-dismiss after animation
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [type, onComplete]);

  if (!type) return null;

  const config = eggConfigs[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br ${config.bgGradient} backdrop-blur-sm`}
        onClick={onComplete}
      >
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl pointer-events-none"
            initial={{ 
              left: `${particle.x}%`, 
              top: '110%',
              opacity: 0,
              scale: 0,
            }}
            animate={{ 
              top: `${particle.y}%`,
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 3,
              delay: Math.random() * 0.5,
              ease: "easeOut",
            }}
          >
            {particle.emoji}
          </motion.div>
        ))}

        {/* Central content */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="text-center relative z-10"
        >
          {/* Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className={`${config.color} mb-6 flex justify-center`}
          >
            {config.icon}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`font-heading text-4xl md:text-5xl ${config.color} mb-4 tracking-wider`}
          >
            {config.title}
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg max-w-md mx-auto px-4"
          >
            {config.message}
          </motion.p>

          {/* Dismiss hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-white/40 text-sm mt-8"
          >
            Click anywhere to continue
          </motion.p>
        </motion.div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-4 left-4 text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ♾️
        </motion.div>
        <motion.div
          className="absolute top-4 right-4 text-4xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ♾️
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-4 text-4xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ♾️
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-4 text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ♾️
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
