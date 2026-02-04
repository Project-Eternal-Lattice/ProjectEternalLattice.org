import { useEffect, useCallback } from "react";
import { useLocation } from "wouter";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      KEYBOARD NAVIGATION HOOK                                 ║
 * ║              Navigate the Lattice with Intention                             ║
 * ║                                                                               ║
 * ║  Accessibility-first navigation for seekers who prefer                       ║
 * ║  keyboard interaction over mouse or touch.                                   ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface KeyboardNavOptions {
  enableArrowNav?: boolean;      // Arrow keys for prev/next page
  enableNumberNav?: boolean;     // Number keys for quick nav
  enableSearchShortcut?: boolean; // Ctrl+K for search
  enableHomeShortcut?: boolean;   // H for home
  customShortcuts?: Record<string, () => void>;
}

// Page order for arrow navigation
const pageOrder = [
  "/",
  "/start-here",
  "/read",
  "/theory",
  "/mission",
  "/team",
  "/nexus",
  "/recognition",
  "/skeptics",
  "/claims",
  "/testimonials",
  "/profile"
];

// Quick nav mapping (Alt + number)
const quickNavMap: Record<string, string> = {
  "1": "/",
  "2": "/read",
  "3": "/theory",
  "4": "/team",
  "5": "/nexus",
  "6": "/skeptics",
  "7": "/claims",
  "8": "/testimonials",
  "9": "/profile"
};

export function useKeyboardNav(options: KeyboardNavOptions = {}) {
  const [location, setLocation] = useLocation();
  
  const {
    enableArrowNav = true,
    enableNumberNav = true,
    enableSearchShortcut = true,
    enableHomeShortcut = true,
    customShortcuts = {}
  } = options;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger if user is typing in an input
    const target = e.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    // Ctrl+K or Cmd+K for search
    if (enableSearchShortcut && (e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      // Dispatch custom event for search modal
      window.dispatchEvent(new CustomEvent("open-search"));
      return;
    }

    // Alt + number for quick navigation
    if (enableNumberNav && e.altKey && quickNavMap[e.key]) {
      e.preventDefault();
      setLocation(quickNavMap[e.key]);
      return;
    }

    // H for home (when not in input)
    if (enableHomeShortcut && e.key.toLowerCase() === "h" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setLocation("/");
      return;
    }

    // Arrow navigation for prev/next page
    if (enableArrowNav && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      // Only trigger with Alt key to avoid conflicts with text navigation
      if (!e.altKey) return;
      
      e.preventDefault();
      const currentIndex = pageOrder.indexOf(location);
      
      if (currentIndex === -1) return;
      
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setLocation(pageOrder[currentIndex - 1]);
      } else if (e.key === "ArrowRight" && currentIndex < pageOrder.length - 1) {
        setLocation(pageOrder[currentIndex + 1]);
      }
      return;
    }

    // Custom shortcuts
    Object.entries(customShortcuts).forEach(([key, handler]) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        handler();
      }
    });
  }, [location, setLocation, enableArrowNav, enableNumberNav, enableSearchShortcut, enableHomeShortcut, customShortcuts]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    currentPage: location,
    goToPage: setLocation,
    pageOrder,
    quickNavMap
  };
}

// Hook for focus management
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef]);
}

// Hook for skip links
export function useSkipLinks() {
  const skipToMain = useCallback(() => {
    const main = document.querySelector("main");
    if (main) {
      main.tabIndex = -1;
      main.focus();
      main.removeAttribute("tabindex");
    }
  }, []);

  const skipToNav = useCallback(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      const firstLink = nav.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    }
  }, []);

  return { skipToMain, skipToNav };
}

export default useKeyboardNav;
