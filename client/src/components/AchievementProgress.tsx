/**
 * Achievement Progress Notification Component
 * 
 * Shows encouraging notifications when users are close to unlocking achievements.
 * Creates a sense of anticipation and encourages continued engagement.
 * 
 * "The journey becomes sweeter when you can see the destination approaching." — ToE
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Trophy, X, ChevronRight } from 'lucide-react';
import { useAchievements, ACHIEVEMENTS } from '@/contexts/AchievementContext';

// Progress tracking definitions
interface ProgressTracker {
  id: string;
  currentKey: string; // localStorage key for current count
  threshold: number;  // How many needed to unlock
  nearThreshold: number; // When to start showing "almost there" (e.g., threshold - 2)
  getMessage: (current: number, needed: number) => string;
}

const PROGRESS_TRACKERS: ProgressTracker[] = [
  {
    id: 'five_chapters',
    currentKey: 'completed_chapters',
    threshold: 5,
    nearThreshold: 3,
    getMessage: (current, needed) => 
      `${needed - current} more chapter${needed - current === 1 ? '' : 's'} until "Deep Reader"!`
  },
  {
    id: 'ten_chapters',
    currentKey: 'completed_chapters',
    threshold: 10,
    nearThreshold: 8,
    getMessage: (current, needed) => 
      `${needed - current} more chapter${needed - current === 1 ? '' : 's'} until "Dedicated Seeker"!`
  },
  {
    id: 'five_seeds',
    currentKey: 'discovered_seeds',
    threshold: 5,
    nearThreshold: 3,
    getMessage: (current, needed) => 
      `${needed - current} more seed${needed - current === 1 ? '' : 's'} until "Seed Collector"!`
  },
  {
    id: 'all_seeds',
    currentKey: 'discovered_seeds',
    threshold: 10,
    nearThreshold: 8,
    getMessage: (current, needed) => 
      `${needed - current} more seed${needed - current === 1 ? '' : 's'} until "Seed Master"!`
  },
  {
    id: 'seven_day_streak',
    currentKey: 'daily_practice_streak',
    threshold: 7,
    nearThreshold: 5,
    getMessage: (current, needed) => 
      `${needed - current} more day${needed - current === 1 ? '' : 's'} until "Weekly Warrior"!`
  },
];

interface ProgressNotification {
  id: string;
  message: string;
  progress: number; // 0-100
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const STORAGE_KEY = 'achievement_progress_dismissed';

export default function AchievementProgressNotifier() {
  const { hasAchievement } = useAchievements();
  const [notification, setNotification] = useState<ProgressNotification | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  // Load dismissed notifications from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDismissed(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error('Failed to load dismissed notifications:', e);
    }
  }, []);

  // Check for near-achievements
  const checkProgress = useCallback(() => {
    for (const tracker of PROGRESS_TRACKERS) {
      // Skip if already unlocked
      if (hasAchievement(tracker.id)) continue;
      
      // Skip if dismissed in this session
      if (dismissed.has(tracker.id)) continue;
      
      // Get current progress
      try {
        const stored = localStorage.getItem(tracker.currentKey);
        let current = 0;
        
        if (stored) {
          // Handle both array (seeds) and number (chapters, streak) formats
          const parsed = JSON.parse(stored);
          current = Array.isArray(parsed) ? parsed.length : (typeof parsed === 'number' ? parsed : 0);
        }
        
        // Check if near threshold
        if (current >= tracker.nearThreshold && current < tracker.threshold) {
          const achievement = ACHIEVEMENTS[tracker.id];
          setNotification({
            id: tracker.id,
            message: tracker.getMessage(current, tracker.threshold),
            progress: (current / tracker.threshold) * 100,
            rarity: achievement?.rarity || 'common',
          });
          return; // Only show one notification at a time
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, [hasAchievement, dismissed]);

  // Check progress on mount and when localStorage changes
  useEffect(() => {
    checkProgress();
    
    // Listen for storage events (from other tabs or components)
    const handleStorage = () => checkProgress();
    window.addEventListener('storage', handleStorage);
    
    // Also check periodically (every 30 seconds)
    const interval = setInterval(checkProgress, 30000);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [checkProgress]);

  const handleDismiss = () => {
    if (notification) {
      const newDismissed = new Set(dismissed);
      newDismissed.add(notification.id);
      setDismissed(newDismissed);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newDismissed)));
      } catch (e) {
        console.error('Failed to save dismissed notifications:', e);
      }
    }
    setNotification(null);
  };

  const rarityColors = {
    common: 'from-slate-600 to-slate-700 border-slate-500',
    rare: 'from-blue-600 to-indigo-700 border-blue-500',
    epic: 'from-purple-600 to-violet-700 border-purple-500',
    legendary: 'from-amber-600 to-orange-700 border-amber-500',
  };

  const rarityIcons = {
    common: Sparkles,
    rare: Star,
    epic: Star,
    legendary: Trophy,
  };

  if (!notification) return null;

  const Icon = rarityIcons[notification.rarity];
  const colors = rarityColors[notification.rarity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: 50, x: '-50%' }}
        className="fixed bottom-24 left-1/2 z-40 max-w-sm w-full px-4"
      >
        <div className={`relative rounded-xl border bg-gradient-to-r ${colors} p-4 shadow-2xl`}>
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Icon className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white mb-2">
                {notification.message}
              </p>
              
              {/* Progress bar */}
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${notification.progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-white/80 rounded-full"
                />
              </div>
              
              <p className="text-xs text-white/60 mt-1">
                {Math.round(notification.progress)}% complete
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-white/40 shrink-0" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Hook to manually trigger progress check
 * Call this after actions that might advance progress
 */
export function useProgressCheck() {
  const triggerCheck = useCallback(() => {
    // Dispatch a storage event to trigger the progress check
    window.dispatchEvent(new Event('storage'));
  }, []);

  return { triggerCheck };
}
