/**
 * Lattice Resonance - Engagement Tracking System
 * 
 * This system tracks visitor engagement to unlock hidden content.
 * No personal data is collected - only engagement patterns stored in localStorage.
 * 
 * The website embodies the ToE: deeper engagement reveals deeper truths.
 */

const STORAGE_KEY = 'lattice_resonance_v1';

export interface LatticeProgress {
  // Visit tracking
  pagesVisited: string[];
  visitCount: number;
  firstVisit: number;
  lastVisit: number;
  
  // Time tracking
  totalTimeSpent: number; // in seconds
  sessionStartTime: number;
  
  // Engagement tracking
  scrollDepths: Record<string, number>; // page -> max scroll percentage
  cardsOpened: string[]; // discovery card IDs
  videosWatched: string[]; // video IDs (watched > 50%)
  
  // Journey tracking
  journeyPath: string[]; // ordered list of pages in current session
  completedJourneys: string[]; // specific journey patterns completed
  
  // Interactions
  nexusGridInteracted: boolean;
  elephantTruthExplored: boolean;
  storySubmitted: boolean;
  
  // Unlocked content
  unlockedEggs: string[];
  
  // Hidden - never shown to user
  resonanceLevel: number; // 0-5
}

const DEFAULT_PROGRESS: LatticeProgress = {
  pagesVisited: [],
  visitCount: 0,
  firstVisit: 0,
  lastVisit: 0,
  totalTimeSpent: 0,
  sessionStartTime: 0,
  scrollDepths: {},
  cardsOpened: [],
  videosWatched: [],
  journeyPath: [],
  completedJourneys: [],
  nexusGridInteracted: false,
  elephantTruthExplored: false,
  storySubmitted: false,
  unlockedEggs: [],
  resonanceLevel: 0,
};

// Get current progress from localStorage
export function getProgress(): LatticeProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...DEFAULT_PROGRESS, firstVisit: Date.now(), sessionStartTime: Date.now() };
    return JSON.parse(stored);
  } catch {
    return { ...DEFAULT_PROGRESS, firstVisit: Date.now(), sessionStartTime: Date.now() };
  }
}

// Save progress to localStorage
function saveProgress(progress: LatticeProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Silent fail - localStorage might be full or disabled
  }
}

// Track page visit
export function trackPageVisit(path: string): void {
  const progress = getProgress();
  
  // Update visit count on new session (> 30 min since last visit)
  const now = Date.now();
  if (now - progress.lastVisit > 30 * 60 * 1000) {
    progress.visitCount++;
    progress.sessionStartTime = now;
    progress.journeyPath = [];
  }
  
  // Track unique pages
  if (!progress.pagesVisited.includes(path)) {
    progress.pagesVisited.push(path);
  }
  
  // Track journey path
  if (!progress.journeyPath.includes(path)) {
    progress.journeyPath.push(path);
  }
  
  progress.lastVisit = now;
  
  // Check for completed journeys
  checkJourneyPatterns(progress);
  
  // Check for unlocks
  checkUnlocks(progress);
  
  saveProgress(progress);
}

// Track scroll depth
export function trackScrollDepth(path: string, percentage: number): void {
  const progress = getProgress();
  
  const currentDepth = progress.scrollDepths[path] || 0;
  if (percentage > currentDepth) {
    progress.scrollDepths[path] = Math.min(100, percentage);
  }
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Track time spent (call periodically)
export function trackTimeSpent(seconds: number): void {
  const progress = getProgress();
  progress.totalTimeSpent += seconds;
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Track discovery card opened
export function trackCardOpened(cardId: string): void {
  const progress = getProgress();
  
  if (!progress.cardsOpened.includes(cardId)) {
    progress.cardsOpened.push(cardId);
  }
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Track video watched
export function trackVideoWatched(videoId: string): void {
  const progress = getProgress();
  
  if (!progress.videosWatched.includes(videoId)) {
    progress.videosWatched.push(videoId);
  }
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Track Nexus grid interaction
export function trackNexusInteraction(): void {
  const progress = getProgress();
  progress.nexusGridInteracted = true;
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Track Elephant of Truth exploration
export function trackElephantExplored(): void {
  const progress = getProgress();
  progress.elephantTruthExplored = true;
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Track story submission
export function trackStorySubmitted(): void {
  const progress = getProgress();
  progress.storySubmitted = true;
  
  checkUnlocks(progress);
  saveProgress(progress);
}

// Check for specific journey patterns
function checkJourneyPatterns(progress: LatticeProgress): void {
  const path = progress.journeyPath;
  
  // The Seeker's Journey: Home → Theory → Read → Ra Material
  if (hasSequence(path, ['/', '/theory', '/read', '/ra-material'])) {
    if (!progress.completedJourneys.includes('seekers_journey')) {
      progress.completedJourneys.push('seekers_journey');
    }
  }
  
  // The Scholar's Path: Theory → Bibliography → Ra Material → Spiral Dynamics
  if (hasSequence(path, ['/theory', '/bibliography', '/ra-material', '/spiral-dynamics'])) {
    if (!progress.completedJourneys.includes('scholars_path')) {
      progress.completedJourneys.push('scholars_path');
    }
  }
  
  // The Full Circle: Visit all major pages
  const majorPages = ['/', '/theory', '/read', '/team', '/ra-material', '/spiral-dynamics', '/videos', '/nexus-interactive'];
  if (majorPages.every(p => path.includes(p))) {
    if (!progress.completedJourneys.includes('full_circle')) {
      progress.completedJourneys.push('full_circle');
    }
  }
}

// Helper to check if array contains sequence
function hasSequence(arr: string[], sequence: string[]): boolean {
  let seqIndex = 0;
  for (const item of arr) {
    if (item === sequence[seqIndex]) {
      seqIndex++;
      if (seqIndex === sequence.length) return true;
    }
  }
  return false;
}

// Check and apply unlocks
function checkUnlocks(progress: LatticeProgress): void {
  const newUnlocks: string[] = [];
  
  // Level 1: Curious Seeker
  // Visit 5+ pages, spend 5+ minutes
  if (progress.pagesVisited.length >= 5 && progress.totalTimeSpent >= 300) {
    if (!progress.unlockedEggs.includes('console_whisper')) {
      newUnlocks.push('console_whisper');
      // This will show a message in the browser console
    }
  }
  
  // Level 2: Engaged Explorer
  // Visit 10+ pages, scroll 90%+ on Theory, open 5+ cards
  if (
    progress.pagesVisited.length >= 10 &&
    (progress.scrollDepths['/theory'] || 0) >= 90 &&
    progress.cardsOpened.length >= 5
  ) {
    if (!progress.unlockedEggs.includes('lattice_whispers')) {
      newUnlocks.push('lattice_whispers');
    }
  }
  
  // Level 3: Dedicated Student
  // Complete Seeker's Journey, watch 3+ videos, return 3+ times
  if (
    progress.completedJourneys.includes('seekers_journey') &&
    progress.videosWatched.length >= 3 &&
    progress.visitCount >= 3
  ) {
    if (!progress.unlockedEggs.includes('inner_sanctum')) {
      newUnlocks.push('inner_sanctum');
    }
  }
  
  // Level 4: Awakened Seeker
  // Complete Full Circle, 30+ minutes, interact with Nexus grid
  if (
    progress.completedJourneys.includes('full_circle') &&
    progress.totalTimeSpent >= 1800 &&
    progress.nexusGridInteracted
  ) {
    if (!progress.unlockedEggs.includes('architects_notes')) {
      newUnlocks.push('architects_notes');
    }
  }
  
  // Level 5: Lattice Node
  // All of the above + submit a story + explore Elephant of Truth
  if (
    progress.unlockedEggs.includes('architects_notes') &&
    progress.storySubmitted &&
    progress.elephantTruthExplored
  ) {
    if (!progress.unlockedEggs.includes('the_mirror')) {
      newUnlocks.push('the_mirror');
    }
  }
  
  // Apply new unlocks
  if (newUnlocks.length > 0) {
    progress.unlockedEggs.push(...newUnlocks);
    progress.resonanceLevel = Math.min(5, progress.unlockedEggs.length);
    
    // Trigger unlock effects (no visible notification - just enable content)
    newUnlocks.forEach(egg => {
      triggerUnlockEffect(egg);
    });
  }
}

// Trigger effects when content is unlocked
function triggerUnlockEffect(egg: string): void {
  if (typeof window === 'undefined') return;
  
  switch (egg) {
    case 'console_whisper':
      // Add a subtle message to the console
      console.log(
        '%c✨ The Lattice recognizes your presence... ✨',
        'color: #a855f7; font-size: 14px; font-weight: bold;'
      );
      console.log(
        '%cYou are beginning to see. Keep exploring.',
        'color: #8b5cf6; font-style: italic;'
      );
      break;
      
    case 'lattice_whispers':
      // Store a flag that enables the hidden page link
      sessionStorage.setItem('lattice_whispers_unlocked', 'true');
      break;
      
    case 'inner_sanctum':
      sessionStorage.setItem('inner_sanctum_unlocked', 'true');
      break;
      
    case 'architects_notes':
      sessionStorage.setItem('architects_notes_unlocked', 'true');
      break;
      
    case 'the_mirror':
      sessionStorage.setItem('the_mirror_unlocked', 'true');
      break;
  }
}

// Check if specific content is unlocked
export function isUnlocked(egg: string): boolean {
  const progress = getProgress();
  return progress.unlockedEggs.includes(egg);
}

// Get current resonance level (for internal use only)
export function getResonanceLevel(): number {
  const progress = getProgress();
  return progress.resonanceLevel;
}

// Initialize tracking on page load
export function initializeLatticeResonance(): void {
  if (typeof window === 'undefined') return;
  
  const progress = getProgress();
  
  // Set first visit if new
  if (progress.firstVisit === 0) {
    progress.firstVisit = Date.now();
  }
  
  // Check for returning visitor
  const now = Date.now();
  if (now - progress.lastVisit > 30 * 60 * 1000) {
    progress.visitCount++;
    progress.sessionStartTime = now;
    progress.journeyPath = [];
  }
  
  progress.lastVisit = now;
  
  // Re-trigger unlock effects for already unlocked content
  progress.unlockedEggs.forEach(egg => {
    triggerUnlockEffect(egg);
  });
  
  saveProgress(progress);
  
  // Set up time tracking interval
  let lastTime = Date.now();
  setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - lastTime) / 1000);
    if (elapsed > 0 && document.visibilityState === 'visible') {
      trackTimeSpent(elapsed);
    }
    lastTime = now;
  }, 30000); // Track every 30 seconds
}
