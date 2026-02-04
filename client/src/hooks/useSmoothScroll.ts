import { useCallback, useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SMOOTH SCROLL HOOK                                    ║
 * ║              Graceful navigation through the Eternal Lattice                 ║
 * ║                                                                               ║
 * ║  Movement through the Lattice should be fluid, like consciousness itself.    ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
}

// Easing functions for smooth animations
const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
};

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const { offset = 80, duration = 800, easing = "easeInOut" } = options;
  const [location] = useLocation();

  // Scroll to element by ID
  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [offset, duration, easing]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    const startPosition = window.scrollY;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);
      
      window.scrollTo(0, startPosition * (1 - easedProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, [duration, easing]);

  // Handle hash changes on page load and navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => scrollToElement(hash), 100);
    }
  }, [location, scrollToElement]);

  // Intercept anchor clicks for smooth scrolling
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const elementId = href.slice(1);
          scrollToElement(elementId);
          
          // Update URL without triggering navigation
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [scrollToElement]);

  return { scrollToElement, scrollToTop };
}

// Scroll progress hook for reading indicators
export function useScrollProgress() {
  const getProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }, []);

  return { getProgress };
}

// Scroll direction hook for hiding/showing elements
export function useScrollDirection() {
  const getDirection = useCallback(() => {
    let lastScrollY = window.scrollY;
    
    return () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
      return direction;
    };
  }, []);

  return { getDirection };
}
