import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

/**
 * Crisis Keyboard Shortcuts
 * 
 * Provides instant access to crisis support resources via keyboard shortcuts:
 * - Ctrl+Shift+H (Help) → Navigates to /safety page
 * - Triple-Escape → Navigates to /safety page (backup method)
 * 
 * These shortcuts are always active, regardless of which page the user is on.
 * They are designed to provide immediate access to crisis resources for anyone
 * who may be in distress while browsing the site.
 * 
 * Implementation follows Kimi Agent Swarm Round 3 recommendations for
 * crisis support accessibility.
 */
export function useCrisisShortcuts() {
  const [, setLocation] = useLocation();
  const escapeCountRef = useRef(0);
  const escapeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+H → Go to safety page
      if (e.ctrlKey && e.shiftKey && (e.key === 'H' || e.key === 'h')) {
        e.preventDefault();
        setLocation('/safety');
        return;
      }

      // Triple-Escape → Go to safety page (backup method)
      if (e.key === 'Escape') {
        escapeCountRef.current++;
        
        // Clear any existing timer
        if (escapeTimerRef.current !== null) {
          window.clearTimeout(escapeTimerRef.current);
        }
        
        // Reset counter after 500ms of no Escape presses
        escapeTimerRef.current = window.setTimeout(() => {
          escapeCountRef.current = 0;
        }, 500);
        
        // Navigate on third Escape press
        if (escapeCountRef.current >= 3) {
          escapeCountRef.current = 0;
          setLocation('/safety');
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (escapeTimerRef.current !== null) {
        window.clearTimeout(escapeTimerRef.current);
      }
    };
  }, [setLocation]);
}
