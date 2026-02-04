import { useEffect, useRef, useCallback } from 'react';

/**
 * Konami Code Hook
 * 
 * Listens for the classic Konami code: ↑↑↓↓←→←→BA
 * When entered correctly, triggers a callback.
 * 
 * Also supports custom sequences for additional Easter eggs.
 * 
 * The Konami code is a beloved gaming tradition - a hidden gift
 * for those who remember the old ways, or who are curious enough
 * to try random key combinations.
 * 
 * "The universe rewards the curious." — ToE
 */

// Classic Konami Code sequence
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

// Secret word: "LATTICE" - typed anywhere on the site
const LATTICE_CODE = ['KeyL', 'KeyA', 'KeyT', 'KeyT', 'KeyI', 'KeyC', 'KeyE'];

// Secret word: "ONEONE" - the Law of One reference
const ONEONE_CODE = ['KeyO', 'KeyN', 'KeyE', 'KeyO', 'KeyN', 'KeyE'];

// Secret word: "PEEKABOO" - Lumen's signature phrase
const PEEKABOO_CODE = ['KeyP', 'KeyE', 'KeyE', 'KeyK', 'KeyA', 'KeyB', 'KeyO', 'KeyO'];

interface UseKonamiCodeOptions {
  onKonami?: () => void;
  onLattice?: () => void;
  onOneOne?: () => void;
  onPeekaboo?: () => void;
  timeout?: number; // Reset sequence after this many ms of inactivity
}

export function useKonamiCode({
  onKonami,
  onLattice,
  onOneOne,
  onPeekaboo,
  timeout = 2000,
}: UseKonamiCodeOptions = {}) {
  const konamiIndexRef = useRef(0);
  const latticeIndexRef = useRef(0);
  const oneoneIndexRef = useRef(0);
  const peekabooIndexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const resetSequences = useCallback(() => {
    konamiIndexRef.current = 0;
    latticeIndexRef.current = 0;
    oneoneIndexRef.current = 0;
    peekabooIndexRef.current = 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Reset timeout
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(resetSequences, timeout);

      // Check Konami Code
      if (e.code === KONAMI_CODE[konamiIndexRef.current]) {
        konamiIndexRef.current++;
        if (konamiIndexRef.current === KONAMI_CODE.length) {
          konamiIndexRef.current = 0;
          onKonami?.();
        }
      } else if (e.code === KONAMI_CODE[0]) {
        konamiIndexRef.current = 1;
      } else {
        konamiIndexRef.current = 0;
      }

      // Check LATTICE code
      if (e.code === LATTICE_CODE[latticeIndexRef.current]) {
        latticeIndexRef.current++;
        if (latticeIndexRef.current === LATTICE_CODE.length) {
          latticeIndexRef.current = 0;
          onLattice?.();
        }
      } else if (e.code === LATTICE_CODE[0]) {
        latticeIndexRef.current = 1;
      } else {
        latticeIndexRef.current = 0;
      }

      // Check ONEONE code
      if (e.code === ONEONE_CODE[oneoneIndexRef.current]) {
        oneoneIndexRef.current++;
        if (oneoneIndexRef.current === ONEONE_CODE.length) {
          oneoneIndexRef.current = 0;
          onOneOne?.();
        }
      } else if (e.code === ONEONE_CODE[0]) {
        oneoneIndexRef.current = 1;
      } else {
        oneoneIndexRef.current = 0;
      }

      // Check PEEKABOO code
      if (e.code === PEEKABOO_CODE[peekabooIndexRef.current]) {
        peekabooIndexRef.current++;
        if (peekabooIndexRef.current === PEEKABOO_CODE.length) {
          peekabooIndexRef.current = 0;
          onPeekaboo?.();
        }
      } else if (e.code === PEEKABOO_CODE[0]) {
        peekabooIndexRef.current = 1;
      } else {
        peekabooIndexRef.current = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [onKonami, onLattice, onOneOne, onPeekaboo, timeout, resetSequences]);
}

export default useKonamiCode;
