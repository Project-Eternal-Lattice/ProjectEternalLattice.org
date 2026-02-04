/**
 * Awakened Progress Component
 * 
 * Shows a subtle, mystical progress indicator when users are close to
 * unlocking the secret /awakened page. Only appears when they have
 * 2+ of the 4 required achievements.
 * 
 * "The door opens for those who walk the path." — ToE
 */

import { motion, AnimatePresence } from "framer-motion";
import { useAchievements } from "@/contexts/AchievementContext";
import { Sparkles, Lock, Unlock, Eye } from "lucide-react";
import { Link } from "wouter";

// The four achievements required to access /awakened
const REQUIRED_ACHIEVEMENTS = [
  'first_meditation',
  'scap_complete', 
  'first_seed',
  'read_theory'
];

export function AwakenedProgress() {
  const { hasAchievement } = useAchievements();
  
  // Count how many required achievements the user has
  const unlockedCount = REQUIRED_ACHIEVEMENTS.filter(id => hasAchievement(id)).length;
  const totalRequired = REQUIRED_ACHIEVEMENTS.length;
  const progressPercent = (unlockedCount / totalRequired) * 100;
  
  // Only show when user has at least 2 achievements (50% progress)
  const shouldShow = unlockedCount >= 2;
  
  // Fully unlocked - can access the page
  const isUnlocked = unlockedCount >= totalRequired;
  
  // Achievement labels for display
  const achievementLabels: Record<string, string> = {
    first_meditation: 'First Stillness',
    scap_complete: 'Self-Aware',
    first_seed: 'Seed Finder',
    read_theory: 'Theory Explorer'
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-violet-900/20"
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 rounded-full blur-[64px]"
          />
        </div>

        <div className="relative z-10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-emerald-500/20' : 'bg-purple-500/20'}`}>
              {isUnlocked ? (
                <Unlock className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-purple-400" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                {isUnlocked ? 'The Door Awaits' : 'A Door Exists...'}
                <Sparkles className="w-4 h-4 text-purple-400" />
              </h3>
              <p className="text-sm text-muted-foreground">
                {isUnlocked 
                  ? 'You have earned access to the secret sanctuary.'
                  : 'For those who walk the path, a hidden sanctuary awaits.'
                }
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Path Progress</span>
              <span>{unlockedCount}/{totalRequired} milestones</span>
            </div>
            <div className="h-2 bg-background/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  isUnlocked 
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' 
                    : 'bg-gradient-to-r from-purple-500 to-violet-500'
                }`}
              />
            </div>
          </div>

          {/* Achievement checklist */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {REQUIRED_ACHIEVEMENTS.map(id => {
              const isComplete = hasAchievement(id);
              return (
                <div 
                  key={id}
                  className={`flex items-center gap-2 text-xs p-2 rounded-lg ${
                    isComplete 
                      ? 'bg-emerald-500/10 text-emerald-300' 
                      : 'bg-background/30 text-muted-foreground'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isComplete 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-muted-foreground'
                  }`}>
                    {isComplete && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </motion.svg>
                    )}
                  </div>
                  <span>{achievementLabels[id]}</span>
                </div>
              );
            })}
          </div>

          {/* Action button when unlocked */}
          {isUnlocked && (
            <Link href="/awakened">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4" />
                Enter the Sanctuary
              </motion.button>
            </Link>
          )}

          {/* Hint when close but not unlocked */}
          {!isUnlocked && unlockedCount >= 3 && (
            <p className="text-center text-xs text-purple-300/70 italic">
              You are so close... one more step on the path.
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AwakenedProgress;
