/**
 * Chapter Progress Hook
 * 
 * Tracks which ToE chapters the user has completed.
 * Persists to localStorage and triggers achievements.
 * 
 * "Every chapter is a step on the infinite staircase." — ToE
 */

import { useState, useEffect, useCallback } from 'react';
import { useAchievements } from '@/contexts/AchievementContext';

const STORAGE_KEY = 'completed_chapters';

// Total number of chapters in the ToE
export const TOTAL_CHAPTERS = 12;

export interface ChapterProgress {
  completedChapters: string[];
  totalCompleted: number;
  isChapterComplete: (chapterId: string) => boolean;
  markChapterComplete: (chapterId: string) => void;
  markChapterIncomplete: (chapterId: string) => void;
  progressPercentage: number;
}

export function useChapterProgress(): ChapterProgress {
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const { unlockAchievement, hasAchievement } = useAchievements();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompletedChapters(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load chapter progress:', e);
    }
  }, []);

  // Save to localStorage when chapters change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedChapters));
      
      // Dispatch storage event for progress notifier
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error('Failed to save chapter progress:', e);
    }
  }, [completedChapters]);

  // Check and unlock achievements when chapters change
  useEffect(() => {
    const count = completedChapters.length;
    
    // First chapter
    if (count >= 1 && !hasAchievement('first_chapter')) {
      unlockAchievement('first_chapter');
    }
    
    // Five chapters
    if (count >= 5 && !hasAchievement('five_chapters')) {
      unlockAchievement('five_chapters');
    }
    
    // Ten chapters
    if (count >= 10 && !hasAchievement('ten_chapters')) {
      unlockAchievement('ten_chapters');
    }
    
    // Complete ToE (all 12 chapters)
    if (count >= TOTAL_CHAPTERS && !hasAchievement('complete_toe')) {
      unlockAchievement('complete_toe');
    }
  }, [completedChapters, unlockAchievement, hasAchievement]);

  const isChapterComplete = useCallback((chapterId: string) => {
    return completedChapters.includes(chapterId);
  }, [completedChapters]);

  const markChapterComplete = useCallback((chapterId: string) => {
    setCompletedChapters(prev => {
      if (prev.includes(chapterId)) return prev;
      return [...prev, chapterId];
    });
  }, []);

  const markChapterIncomplete = useCallback((chapterId: string) => {
    setCompletedChapters(prev => prev.filter(id => id !== chapterId));
  }, []);

  const progressPercentage = (completedChapters.length / TOTAL_CHAPTERS) * 100;

  return {
    completedChapters,
    totalCompleted: completedChapters.length,
    isChapterComplete,
    markChapterComplete,
    markChapterIncomplete,
    progressPercentage,
  };
}
