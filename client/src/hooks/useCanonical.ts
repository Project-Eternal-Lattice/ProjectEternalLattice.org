import { useEffect } from 'react';
import { useLocation } from 'wouter';

const CANONICAL_DOMAIN = 'https://projecteternallattice.org';

/**
 * Hook that dynamically updates the canonical URL meta tag based on the current route.
 * This tells search engines that .org is the preferred domain, preventing duplicate
 * content issues between .com and .org.
 */
export function useCanonical() {
  const [location] = useLocation();

  useEffect(() => {
    // Build the canonical URL from the current path
    const canonicalUrl = location === '/'
      ? CANONICAL_DOMAIN
      : `${CANONICAL_DOMAIN}${location}`;

    // Update the existing canonical link tag
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (link) {
      link.href = canonicalUrl;
    } else {
      // Create one if it doesn't exist
      link = document.createElement('link');
      link.rel = 'canonical';
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Also update og:url meta tag to match
    let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (ogUrl) {
      ogUrl.content = canonicalUrl;
    }
  }, [location]);
}
