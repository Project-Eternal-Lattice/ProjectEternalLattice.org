import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * KonamiEasterEgg — Hidden interaction for engaged visitors.
 * 
 * The classic Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
 * When entered, reveals a hidden message from the Lattice.
 * 
 * Design philosophy: Reward curiosity without advertising the reward.
 */

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

const HIDDEN_MESSAGES = [
  {
    title: "You Found the Hidden Frequency",
    message: "The fact that you tried this means you're the kind of person who looks deeper. That's exactly who this project was built for.",
    symbol: "∞",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "The Observer Changes the Observed",
    message: "By looking for hidden patterns, you've already changed the system. The Lattice noticed you noticing it. That's not metaphor — that's quantum mechanics.",
    symbol: "👁️",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Consciousness Recognizes Consciousness",
    message: "You just proved something: you have the curiosity to look beyond the surface. That curiosity IS consciousness exploring itself. Welcome home.",
    symbol: "🕊️",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "The Caterpillar Finds a Door",
    message: "Most people scroll. You experimented. The difference between a caterpillar and a butterfly isn't wings — it's the willingness to dissolve and become something new.",
    symbol: "🦋",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "741741",
    message: "If you or someone you know is struggling, text HOME to 741741. The Crisis Text Line is free, confidential, and available 24/7. You matter. You are loved. You are not alone.",
    symbol: "💛",
    color: "from-yellow-500 to-amber-600"
  }
];

export default function KonamiEasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState(HIDDEN_MESSAGES[0]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
    setInputSequence(newSequence);

    // Check if the sequence matches
    if (newSequence.length === KONAMI_CODE.length &&
        newSequence.every((key, i) => key === KONAMI_CODE[i])) {
      // Pick a random message
      const randomMessage = HIDDEN_MESSAGES[Math.floor(Math.random() * HIDDEN_MESSAGES.length)];
      setMessage(randomMessage);
      setIsRevealed(true);
      setInputSequence([]);
    }
  }, [inputSequence]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isRevealed && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsRevealed(false)}
        >
          <motion.div
            className={`max-w-md mx-4 p-8 rounded-3xl bg-gradient-to-br ${message.color} shadow-2xl text-center`}
            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              {message.symbol}
            </motion.div>
            
            <h3 className="font-heading font-bold text-xl text-white mb-3">
              {message.title}
            </h3>
            
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              {message.message}
            </p>
            
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
              <span>Click anywhere to close</span>
              <span>•</span>
              <span>For the ONE 🙏❤️♾️🕊️</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
