/**
 * React hook for Lattice Resonance engagement tracking
 * 
 * Use this hook in components to track engagement and check unlocks.
 * The tracking is completely invisible to users - no UI, no hints.
 */

import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import {
  initializeLatticeResonance,
  trackPageVisit,
  trackScrollDepth,
  trackCardOpened,
  trackVideoWatched,
  trackNexusInteraction,
  trackElephantExplored,
  trackStorySubmitted,
  isUnlocked,
  getResonanceLevel,
} from '@/lib/latticeResonance';

export function useLatticeResonance() {
  const [location] = useLocation();
  
  // Initialize on mount
  useEffect(() => {
    initializeLatticeResonance();
  }, []);
  
  // Track page visits
  useEffect(() => {
    trackPageVisit(location);
  }, [location]);
  
  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      trackScrollDepth(location, percentage);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);
  
  // Tracking functions for components to use
  const onCardOpened = useCallback((cardId: string) => {
    trackCardOpened(cardId);
  }, []);
  
  const onVideoWatched = useCallback((videoId: string) => {
    trackVideoWatched(videoId);
  }, []);
  
  const onNexusInteraction = useCallback(() => {
    trackNexusInteraction();
  }, []);
  
  const onElephantExplored = useCallback(() => {
    trackElephantExplored();
  }, []);
  
  const onStorySubmitted = useCallback(() => {
    trackStorySubmitted();
  }, []);
  
  // Check if content is unlocked (for conditional rendering)
  const checkUnlocked = useCallback((egg: string) => {
    return isUnlocked(egg);
  }, []);
  
  // Get resonance level (internal use only)
  const resonanceLevel = getResonanceLevel();
  
  return {
    onCardOpened,
    onVideoWatched,
    onNexusInteraction,
    onElephantExplored,
    onStorySubmitted,
    checkUnlocked,
    resonanceLevel,
  };
}

export default useLatticeResonance;
