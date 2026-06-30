import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Smoothly scrolls to the element matching the URL hash on navigation.
 *
 * Cross-page links like `/theory#evidence` previously landed at the top of the
 * page: wouter ignores the hash for routing, the browser's native hash scroll
 * fires before the lazy-loaded page has mounted, and the fixed navbar covered
 * any heading that did line up. This hook waits for the target to mount, then
 * scrolls it into view below the navbar.
 */

// Fixed navbar + breadcrumb breathing room.
const NAV_OFFSET = 96;

function scrollToHash(hash: string): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion ? "auto" : "smooth" });
  return true;
}

export function useHashScroll() {
  const [location] = useLocation();

  // Cross-page navigation: poll until the (possibly lazy-loaded) target mounts.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 60; // ~3s at 50ms intervals

    const tryScroll = () => {
      if (cancelled) return;
      if (scrollToHash(hash)) {
        // Re-scroll once after layout/images settle to correct any shift.
        setTimeout(() => {
          if (!cancelled) scrollToHash(hash);
        }, 400);
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 50);
      }
    };

    const initial = setTimeout(tryScroll, 0);
    return () => {
      cancelled = true;
      clearTimeout(initial);
    };
  }, [location]);

  // Same-page anchor clicks (`<a href="#section">`) fire hashchange.
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash) scrollToHash(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
}
