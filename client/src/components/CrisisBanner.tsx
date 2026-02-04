import { Heart, Phone, MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

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

  // Minimized state - just a small floating button
  if (isMinimized) {
    return (
      <button
        onClick={handleExpand}
        className="fixed bottom-4 right-4 z-[9999] bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        aria-label="Need Support? Click to expand crisis resources"
      >
        <Heart className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Need Support?</span>
      </button>
    );
  }

  return (
    <div
      id="crisis-support"
      role="alert"
      aria-live="polite"
      tabIndex={-1}
      className="sticky top-0 z-[9999] bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 animate-pulse" />
            <span className="font-semibold">Need Support?</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:988"
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors font-bold"
            >
              <Phone className="w-4 h-4" />
              Call 988
            </a>
            
            <a
              href="sms:741741?body=HELLO"
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Text 741741
            </a>
            
            <Link
              href="/safety"
              className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors underline-offset-2 hover:underline"
            >
              Get Help Now →
            </Link>
          </div>

          <button
            onClick={handleMinimize}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Minimize crisis banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
