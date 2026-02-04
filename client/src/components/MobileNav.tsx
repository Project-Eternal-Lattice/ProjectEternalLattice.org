import { Link, useLocation } from "wouter";
import { Home, BookOpen, Users, Compass, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         MOBILE NAVIGATION                                     ║
 * ║              Touch-Optimized Gateway to the Lattice                          ║
 * ║                                                                               ║
 * ║  A bottom navigation bar optimized for mobile seekers,                       ║
 * ║  providing quick access to the core pathways of awakening.                   ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const primaryNavItems: NavItem[] = [
  { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
  { href: "/read", label: "Read", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/team", label: "Team", icon: <Users className="w-5 h-5" /> },
  { href: "/nexus", label: "Nexus", icon: <Compass className="w-5 h-5" /> },
];

const expandedNavItems: NavItem[] = [
  { href: "/theory", label: "Theory", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/mission", label: "Mission", icon: <Compass className="w-5 h-5" /> },
  { href: "/recognition", label: "Recognition", icon: <Users className="w-5 h-5" /> },
  { href: "/skeptics", label: "Skeptics", icon: <Search className="w-5 h-5" /> },
  { href: "/claims", label: "Claims", icon: <BookOpen className="w-5 h-5" /> },
  { href: "/nexus-log", label: "Nexus Log", icon: <Compass className="w-5 h-5" /> },
  { href: "/testimonials", label: "Stories", icon: <Users className="w-5 h-5" /> },
  { href: "/profile", label: "Profile", icon: <Users className="w-5 h-5" /> },
];

export default function MobileNav() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close expanded menu when navigating
  useEffect(() => {
    setIsExpanded(false);
  }, [location]);

  return (
    <>
      {/* Expanded Menu Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 left-4 right-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 z-50 md:hidden"
            >
              <div className="grid grid-cols-4 gap-3">
                {expandedNavItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <button
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-xl transition-all",
                        location === item.href
                          ? "bg-purple-500/20 text-purple-400"
                          : "text-muted-foreground hover:bg-white/5"
                      )}
                    >
                      {item.icon}
                      <span className="text-xs">{item.label}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-white/10 px-2 pb-safe">
          <div className="flex items-center justify-around py-2">
            {primaryNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px]",
                    location === item.href
                      ? "text-purple-400"
                      : "text-muted-foreground"
                  )}
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      location === item.href && "bg-purple-500/20"
                    )}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </Link>
            ))}
            
            {/* More Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px]",
                isExpanded ? "text-purple-400" : "text-muted-foreground"
              )}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isExpanded && "bg-purple-500/20"
                )}
              >
                {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
              <span className="text-xs font-medium">More</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Spacer to prevent content from being hidden behind nav */}
      <div className="h-20 md:hidden" />
    </>
  );
}

// Hook to check if we're on mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
