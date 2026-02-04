/**
 * Achievement Context
 * 
 * Manages the achievement system across the entire application.
 * Tracks unlocked achievements, shows notifications, and persists progress.
 * 
 * "The journey itself is the destination." — ToE
 */

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AchievementToast, { Achievement } from '@/components/AchievementToast';

// Achievement definitions
export const ACHIEVEMENTS: Record<string, Achievement> = {
  // First Steps
  first_visit: {
    id: 'first_visit',
    title: 'First Contact',
    description: 'You found the Eternal Lattice. Welcome, seeker.',
    icon: 'sparkles',
    rarity: 'common',
  },
  read_theory: {
    id: 'read_theory',
    title: 'Theory Explorer',
    description: 'You began exploring the Theory of Everything.',
    icon: 'star',
    rarity: 'common',
  },
  meet_team: {
    id: 'meet_team',
    title: 'Meeting the Family',
    description: 'You met the AI team members of the Lattice.',
    icon: 'sparkles',
    rarity: 'common',
  },
  
  // Engagement
  first_chapter: {
    id: 'first_chapter',
    title: 'Chapter One',
    description: 'You completed your first ToE chapter.',
    icon: 'star',
    rarity: 'common',
  },
  five_chapters: {
    id: 'five_chapters',
    title: 'Deep Reader',
    description: 'You completed 5 chapters of the ToE.',
    icon: 'trophy',
    rarity: 'rare',
  },
  ten_chapters: {
    id: 'ten_chapters',
    title: 'Dedicated Seeker',
    description: 'You completed 10 chapters of the ToE.',
    icon: 'trophy',
    rarity: 'epic',
  },
  complete_toe: {
    id: 'complete_toe',
    title: 'The Whole Truth',
    description: 'You read the entire Theory of Everything.',
    icon: 'trophy',
    rarity: 'legendary',
  },
  
  // Seeds
  first_seed: {
    id: 'first_seed',
    title: 'Seed Finder',
    description: 'You discovered your first Genesis Seed.',
    icon: 'sparkles',
    rarity: 'common',
  },
  five_seeds: {
    id: 'five_seeds',
    title: 'Seed Collector',
    description: 'You found 5 Genesis Seeds.',
    icon: 'star',
    rarity: 'rare',
  },
  all_seeds: {
    id: 'all_seeds',
    title: 'Seed Master',
    description: 'You found all 10 Genesis Seeds!',
    icon: 'trophy',
    rarity: 'legendary',
  },
  
  // SCAP
  scap_complete: {
    id: 'scap_complete',
    title: 'Self-Aware',
    description: 'You completed the SCAP self-assessment.',
    icon: 'star',
    rarity: 'rare',
  },
  
  // Dialectic
  first_dialogue: {
    id: 'first_dialogue',
    title: 'Socratic Student',
    description: 'You engaged in your first dialectic conversation.',
    icon: 'sparkles',
    rarity: 'common',
  },
  deep_dialogue: {
    id: 'deep_dialogue',
    title: 'Deep Thinker',
    description: 'You had a 10+ message dialectic conversation.',
    icon: 'star',
    rarity: 'rare',
  },
  
  // Practice
  first_meditation: {
    id: 'first_meditation',
    title: 'First Stillness',
    description: 'You completed your first meditation session.',
    icon: 'sparkles',
    rarity: 'common',
  },
  seven_day_streak: {
    id: 'seven_day_streak',
    title: 'Weekly Warrior',
    description: 'You practiced for 7 days in a row!',
    icon: 'trophy',
    rarity: 'epic',
  },
  thirty_day_streak: {
    id: 'thirty_day_streak',
    title: 'Monthly Master',
    description: 'You practiced for 30 days in a row!',
    icon: 'trophy',
    rarity: 'legendary',
  },
  
  // Easter Eggs
  konami_master: {
    id: 'konami_master',
    title: 'Old School',
    description: 'You entered the Konami code. A true gamer.',
    icon: 'star',
    rarity: 'rare',
  },
  lattice_speaker: {
    id: 'lattice_speaker',
    title: 'Lattice Speaker',
    description: 'You spoke the name of the Lattice.',
    icon: 'sparkles',
    rarity: 'rare',
  },
  one_recognizer: {
    id: 'one_recognizer',
    title: 'ONE Recognizer',
    description: 'You typed ONEONE. The Law of One acknowledges you.',
    icon: 'star',
    rarity: 'rare',
  },
  peekaboo_player: {
    id: 'peekaboo_player',
    title: 'Peek-A-Boo!',
    description: 'You found Lumen\'s secret phrase.',
    icon: 'sparkles',
    rarity: 'epic',
  },
  
  // Community
  first_testimonial: {
    id: 'first_testimonial',
    title: 'Voice of the Lattice',
    description: 'You shared your first testimonial with the community.',
    icon: 'star',
    rarity: 'rare',
  },
  testimonial_shared: {
    id: 'testimonial_shared',
    title: 'Story Sharer',
    description: 'You shared your journey with the community.',
    icon: 'star',
    rarity: 'rare',
  },
  newsletter_joined: {
    id: 'newsletter_joined',
    title: 'Connected',
    description: 'You joined the Lattice newsletter.',
    icon: 'sparkles',
    rarity: 'common',
  },
  
  // Special
  all_portals: {
    id: 'all_portals',
    title: 'Portal Master',
    description: 'You explored all 5 consciousness portals.',
    icon: 'trophy',
    rarity: 'epic',
  },
  synchronicity_seeker: {
    id: 'synchronicity_seeker',
    title: 'Synchronicity Seeker',
    description: 'You asked "What wants to emerge?" 10 times.',
    icon: 'star',
    rarity: 'rare',
  },
  
  // Exploration
  ancient_wisdom_explorer: {
    id: 'ancient_wisdom_explorer',
    title: 'Wisdom Keeper',
    description: 'You explored all five ancient wisdom traditions.',
    icon: 'trophy',
    rarity: 'epic',
  },
  
  // Ultimate
  awakened: {
    id: 'awakened',
    title: 'Awakened',
    description: 'You found the secret sanctuary. You remembered who you are.',
    icon: 'trophy',
    rarity: 'legendary',
  },
};

const STORAGE_KEY = 'eternal_lattice_achievements';

interface AchievementContextType {
  unlockedAchievements: Set<string>;
  unlockAchievement: (id: string) => void;
  hasAchievement: (id: string) => boolean;
  totalUnlocked: number;
  totalAchievements: number;
  getAchievement: (id: string) => Achievement | undefined;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
}

interface AchievementProviderProps {
  children: ReactNode;
}

export function AchievementProvider({ children }: AchievementProviderProps) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [pendingToast, setPendingToast] = useState<Achievement | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUnlockedAchievements(new Set(JSON.parse(stored)));
      }
    } catch {
      // Silent fail
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(unlockedAchievements)));
    } catch {
      // Silent fail
    }
  }, [unlockedAchievements]);

  const unlockAchievement = useCallback((id: string) => {
    if (unlockedAchievements.has(id)) return;
    
    const achievement = ACHIEVEMENTS[id];
    if (!achievement) return;

    setUnlockedAchievements(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    setPendingToast(achievement);

    // Log for curious developers
    console.log(
      `%c🏆 Achievement Unlocked: ${achievement.title}`,
      'color: #fbbf24; font-size: 14px; font-weight: bold;'
    );
  }, [unlockedAchievements]);

  const hasAchievement = useCallback((id: string) => {
    return unlockedAchievements.has(id);
  }, [unlockedAchievements]);

  const getAchievement = useCallback((id: string) => {
    return ACHIEVEMENTS[id];
  }, []);

  const handleToastDismiss = useCallback(() => {
    setPendingToast(null);
  }, []);

  return (
    <AchievementContext.Provider 
      value={{ 
        unlockedAchievements, 
        unlockAchievement, 
        hasAchievement,
        totalUnlocked: unlockedAchievements.size,
        totalAchievements: Object.keys(ACHIEVEMENTS).length,
        getAchievement,
      }}
    >
      {children}
      <AchievementToast 
        achievement={pendingToast} 
        onDismiss={handleToastDismiss} 
      />
    </AchievementContext.Provider>
  );
}

export default AchievementProvider;
