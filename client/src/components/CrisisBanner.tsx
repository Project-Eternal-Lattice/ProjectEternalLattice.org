import { Sparkles, Phone, MessageCircle, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

/**
 * Integration Support Banner
 * 
 * Reframed from "crisis warning" to "paradigm-shift preparation"
 * 
 * The message: This content is powerful enough to shift paradigms.
 * For the rare seeker who needs support integrating these perspectives,
 * resources are available. This frames the content as POWERFUL, not
 * the visitor as FRAGILE.
 */
export default function CrisisBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Check if user has previously minimized the banner
  useEffect(() => {
    const minimized = localStorage.getItem("crisisBannerMinimized");
    if (minimized === "true") {
      setIsMinimized(true);
    }
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
    localStorage.setItem("crisisBannerMinimized", "true");
  };

  const handleExpand = () => {
    setIsMinimized(false);
    localStorage.removeItem("crisisBannerMinimized");
  };

  if (!isVisible) return null;

  // Minimized state - subtle floating button
  if (isMinimized) {
    return (
      <button
        onClick={handleExpand}
        className="fixed bottom-4 right-4 z-[9999] bg-purple-600/90 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
        aria-label="Integration support resources available"
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Integration Support</span>
      </button>
    );
  }

  return (
    <div
      id="crisis-support"
      role="complementary"
      aria-label="Integration support resources"
      tabIndex={-1}
      className="sticky top-0 z-[9999] bg-gradient-to-r from-purple-900/95 via-purple-800/95 to-purple-900/95 text-white shadow-lg backdrop-blur-sm border-b border-purple-500/30"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-purple-100">
              <span className="hidden sm:inline">Paradigm shifts can be intense. </span>
              <span className="font-medium">Integration support available</span>
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:988"
              rel="emergency"
              aria-label="Call 988 - 24/7 support line"
              className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">988</span>
            </a>
            
            <a
              href="sms:741741?body=HELLO"
              rel="emergency"
              aria-label="Text 741741 for support"
              className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>741741</span>
            </a>
            
            <Link
              href="/safety"
              className="inline-flex items-center gap-1 bg-purple-500/30 hover:bg-purple-500/50 px-3 py-1 rounded-full transition-colors border border-purple-400/30"
            >
              Resources →
            </Link>
          </div>

          <button
            onClick={handleMinimize}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Minimize banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
