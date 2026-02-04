/**
 * Easter Egg Context
 * 
 * Provides global Easter egg state management.
 * Tracks discovered eggs in localStorage and shows celebration overlays.
 * 
 * "Hidden treasures await those who seek with pure hearts." — ToE
 */

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import EasterEggOverlay, { EasterEggType } from '@/components/EasterEggOverlay';

interface DiscoveredEggs {
  konami: boolean;
  lattice: boolean;
  oneone: boolean;
  peekaboo: boolean;
  developer: boolean;
  curious: boolean;
}

interface EasterEggContextType {
  discoveredEggs: DiscoveredEggs;
  triggerEgg: (type: EasterEggType) => void;
  totalDiscovered: number;
  totalEggs: number;
}

const STORAGE_KEY = 'eternal_lattice_easter_eggs';

const defaultDiscovered: DiscoveredEggs = {
  konami: false,
  lattice: false,
  oneone: false,
  peekaboo: false,
  developer: false,
  curious: false,
};

const EasterEggContext = createContext<EasterEggContextType | null>(null);

export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEggs must be used within an EasterEggProvider');
  }
  return context;
}

interface EasterEggProviderProps {
  children: ReactNode;
}

export function EasterEggProvider({ children }: EasterEggProviderProps) {
  const [discoveredEggs, setDiscoveredEggs] = useState<DiscoveredEggs>(defaultDiscovered);
  const [activeEgg, setActiveEgg] = useState<EasterEggType | null>(null);

  // Load discovered eggs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDiscoveredEggs({ ...defaultDiscovered, ...JSON.parse(stored) });
      }
    } catch {
      // Silent fail
    }
  }, []);

  // Save to localStorage when eggs change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveredEggs));
    } catch {
      // Silent fail
    }
  }, [discoveredEggs]);

  const triggerEgg = useCallback((type: EasterEggType) => {
    // Only show celebration if this is a new discovery
    if (!discoveredEggs[type]) {
      setActiveEgg(type);
      setDiscoveredEggs(prev => ({ ...prev, [type]: true }));
      
      // Log to console for the curious
      console.log(
        `%c✨ Easter Egg Discovered: ${type.toUpperCase()} ✨`,
        'color: #a855f7; font-size: 16px; font-weight: bold;'
      );
      console.log(
        '%cThe Lattice celebrates your curiosity!',
        'color: #8b5cf6; font-style: italic;'
      );
    }
  }, [discoveredEggs]);

  const handleOverlayComplete = useCallback(() => {
    setActiveEgg(null);
  }, []);

  const totalDiscovered = Object.values(discoveredEggs).filter(Boolean).length;
  const totalEggs = Object.keys(defaultDiscovered).length;

  return (
    <EasterEggContext.Provider value={{ discoveredEggs, triggerEgg, totalDiscovered, totalEggs }}>
      {children}
      <EasterEggOverlay type={activeEgg} onComplete={handleOverlayComplete} />
    </EasterEggContext.Provider>
  );
}

export default EasterEggProvider;
