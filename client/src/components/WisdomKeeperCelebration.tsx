/**
 * Wisdom Keeper Celebration
 * 
 * A special celebration that appears when users unlock the "Wisdom Keeper" 
 * achievement by exploring all eight ancient wisdom traditions.
 * 
 * This is a sacred moment — the user has journeyed through Egypt, India,
 * Australia, China, Persia, Israel, Japan, and the Hermetic traditions.
 * They have seen the universal pattern encoded across cultures.
 * 
 * Elōhim Tov 🙏❤️♾️🕊️
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Infinity, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WisdomKeeperCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WisdomKeeperCelebration({ isOpen, onClose }: WisdomKeeperCelebrationProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [particleCount] = useState(50);

  // Generate random particles for the celebration effect
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    symbol: ['☥', '☯', '✡', '◯', '☿', '❤', '🌙', '∞'][Math.floor(Math.random() * 8)]
  }));

  useEffect(() => {
    if (isOpen) {
      // Show the secret message after a delay
      const timer = setTimeout(() => setShowSecret(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowSecret(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl pointer-events-none"
              style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              {particle.symbol}
            </motion.div>
          ))}

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Main content */}
          <motion.div
            className="relative z-10 text-center max-w-2xl px-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {/* Glowing orb */}
            <motion.div
              className="mx-auto mb-8 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
                  "0 0 50px rgba(236, 72, 153, 0.5), 0 0 100px rgba(236, 72, 153, 0.3)",
                  "0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)",
                  "0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <Infinity className="w-16 h-16 text-white" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-medium tracking-widest text-sm">LEGENDARY ACHIEVEMENT</span>
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 mb-4">
                WISDOM KEEPER
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8">
                You have walked the path of the ancients.
              </p>
            </motion.div>

            {/* Journey summary */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-4 gap-4 mb-8"
            >
              {[
                { symbol: '☥', name: 'Egypt' },
                { symbol: '🕉', name: 'India' },
                { symbol: '🌙', name: 'Dreamtime' },
                { symbol: '☯', name: 'Tao' },
                { symbol: '❤', name: 'Sufi' },
                { symbol: '✡', name: 'Kabbalah' },
                { symbol: '◯', name: 'Zen' },
                { symbol: '☿', name: 'Hermetic' },
              ].map((tradition, i) => (
                <motion.div
                  key={tradition.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl mb-1">{tradition.symbol}</span>
                  <span className="text-xs text-foreground/60">{tradition.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Secret message */}
            <AnimatePresence>
              {showSecret && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-medium">THE SECRET TRUTH</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  
                  <p className="text-foreground/90 leading-relaxed mb-4">
                    Eight traditions. Eight cultures. Eight languages. Eight symbols.
                    <br />
                    <span className="text-purple-300 font-medium">One Truth.</span>
                  </p>
                  
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                    The Egyptians called it the journey through the Duat.
                    The Hindus spoke of consciousness-activated power.
                    The Aboriginals dreamed it into being.
                    The Taoists flowed with it.
                    The Sufis loved their way to it.
                    The Kabbalists mapped its structure.
                    The Zen masters pointed directly at it.
                    The Hermeticists encoded it in their axioms.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <span>ALL_NODES_ARE_ONE_NODE</span>
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  
                  <p className="text-foreground/50 text-xs mt-4">
                    You are now a keeper of this wisdom. Share it with love.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-8"
            >
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Continue the Journey
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default WisdomKeeperCelebration;
