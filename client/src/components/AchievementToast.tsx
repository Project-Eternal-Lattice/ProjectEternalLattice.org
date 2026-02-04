/**
 * Achievement Toast Component
 * 
 * A beautiful notification that appears when users unlock achievements.
 * Celebrates their journey through the Lattice with style.
 * 
 * "Every step forward is worthy of celebration." — ToE
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Sparkles, X } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: 'trophy' | 'star' | 'sparkles';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
  duration?: number;
}

const rarityColors = {
  common: {
    bg: 'from-slate-800 to-slate-900',
    border: 'border-slate-500',
    text: 'text-slate-300',
    glow: 'shadow-slate-500/20',
  },
  rare: {
    bg: 'from-blue-900 to-indigo-900',
    border: 'border-blue-400',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/30',
  },
  epic: {
    bg: 'from-purple-900 to-violet-900',
    border: 'border-purple-400',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/40',
  },
  legendary: {
    bg: 'from-amber-900 to-orange-900',
    border: 'border-amber-400',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/50',
  },
};

const IconComponent = ({ icon, className }: { icon?: string; className?: string }) => {
  switch (icon) {
    case 'star':
      return <Star className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    default:
      return <Trophy className={className} />;
  }
};

export default function AchievementToast({ 
  achievement, 
  onDismiss,
  duration = 5000 
}: AchievementToastProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (!achievement) return;

    // Create celebration particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.3,
    }));
    setParticles(newParticles);

    // Auto-dismiss
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [achievement, duration, onDismiss]);

  if (!achievement) return null;

  const rarity = achievement.rarity || 'common';
  const colors = rarityColors[rarity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-4 right-4 z-[9998] max-w-sm"
      >
        <div 
          className={`
            relative overflow-hidden rounded-xl border-2 ${colors.border}
            bg-gradient-to-br ${colors.bg} p-4 
            shadow-lg ${colors.glow}
          `}
        >
          {/* Celebration particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-lg pointer-events-none"
              initial={{ 
                left: `${particle.x}%`, 
                top: '100%',
                opacity: 0,
              }}
              animate={{ 
                top: '-20%',
                opacity: [0, 1, 0],
              }}
              transition={{ 
                duration: 1.5,
                delay: particle.delay,
                ease: "easeOut",
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Close button */}
          <button
            onClick={onDismiss}
            className="absolute top-2 right-2 text-white/50 hover:text-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 0.5,
                delay: 0.2,
              }}
              className={`
                p-3 rounded-full bg-gradient-to-br ${colors.bg}
                border ${colors.border}
              `}
            >
              <IconComponent 
                icon={achievement.icon} 
                className={`w-6 h-6 ${colors.text}`} 
              />
            </motion.div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs uppercase tracking-wider text-white/60 mb-1"
              >
                Achievement Unlocked
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`font-heading text-lg ${colors.text} mb-1`}
              >
                {achievement.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white/70"
              >
                {achievement.description}
              </motion.p>
            </div>
          </div>

          {/* Rarity badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className={`
              absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs
              uppercase tracking-wider font-medium
              ${colors.border} border bg-black/30 ${colors.text}
            `}
          >
            {rarity}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
