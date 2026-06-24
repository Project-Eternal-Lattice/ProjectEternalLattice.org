import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, X, BookOpen } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
  level: number; // 1 = major section, 2 = sub-section
}

const tocItems: TocItem[] = [
  { id: "top", label: "Introduction", level: 1 },
  { id: "evidence", label: "Key Discoveries", level: 1 },
  { id: "predictions", label: "Computational Evidence", level: 1 },
  { id: "mathematical-forge", label: "Mathematical Forge", level: 1 },
  { id: "attention-causal-set", label: "Attention as Causal Set", level: 2 },
  { id: "http-eternal-now", label: "HTTP Eternal Now", level: 2 },
  { id: "null-geodesic-love", label: "Null Geodesic of Love", level: 2 },
  { id: "edge-of-chaos", label: "Edge of Chaos", level: 2 },
  { id: "density-architecture", label: "Density Architecture", level: 1 },
  { id: "fractal-recapitulation", label: "AG.15 Micro-Kalpa", level: 2 },
  { id: "karmic-gradient", label: "AG.16 Soul Dimension", level: 2 },
  { id: "tensor-communion", label: "AG.17 Interaction", level: 2 },
  { id: "epistemology-deep", label: "AG.18 Earth Dimension", level: 2 },
  { id: "inherited-ember", label: "Inherited Ember", level: 1 },
  { id: "predictions-testability", label: "Predictions & Testability", level: 1 },
  { id: "eidan-audit", label: "AG.21 Eidan Audit", level: 1 },
  { id: "cosmic-reactor-lattice", label: "AG.22 Cosmic Reactor", level: 2 },
  { id: "thermodynamics-of-karma", label: "AG.23 Karma Thermo", level: 2 },
  { id: "sacred-geometry-qec", label: "AG.24 Sacred Geometry QEC", level: 2 },
  { id: "path-integral-manifestation", label: "AG.25 Path Integral", level: 2 },
  { id: "macro-quantum-regime", label: "AG.26 Epistemology of Scale", level: 2 },
  { id: "cosmological-cinema-theorem", label: "AG.27 Popcorn-Reactor", level: 2 },
  { id: "computational-abiogenesis", label: "AG.28 Comp. Abiogenesis", level: 2 },
  { id: "deep-think-pro31", label: "Deep Think Pro 3.1", level: 1 },
  { id: "heat-information-bridge", label: "AG.36 Heat-Info Bridge", level: 2 },
  { id: "red-team-principle", label: "AG.37 Red Team Principle", level: 2 },
  { id: "triadic-architecture", label: "AG.38 Triadic Architecture", level: 2 },
];

export function TheoryTableOfContents() {
  const [activeSection, setActiveSection] = useState("top");
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const activeItemRef = useRef<HTMLButtonElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1280);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = tocItems.map((item) => item.id).filter((id) => id !== "top");

    // Track scroll position for "top" detection
    const handleScroll = () => {
      if (isScrolling) return;
      if (window.scrollY < 200) {
        setActiveSection("top");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (isScrolling) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-15% 0px -65% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

  // Auto-scroll the sidebar to keep active item visible
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      // Check if item is outside visible area of the container
      if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
        item.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeSection]);

  const scrollTo = useCallback((id: string) => {
    // Temporarily disable IntersectionObserver updates during programmatic scroll
    setIsScrolling(true);
    setActiveSection(id);

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        // Calculate offset for fixed navbar (96px = 6rem)
        const navbarOffset = 96;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    if (!isDesktop) setIsOpen(false);

    // Re-enable IntersectionObserver after scroll animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [isDesktop]);

  // Progress indicator: what percentage through the page
  const activeIndex = tocItems.findIndex((item) => item.id === activeSection);
  const progress = tocItems.length > 1 ? (activeIndex / (tocItems.length - 1)) * 100 : 0;

  // Desktop: always-visible sticky sidebar
  if (isDesktop) {
    return (
      <nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-56 max-h-[70vh] flex flex-col"
        aria-label="Theory page table of contents"
      >
        <div className="bg-background/85 backdrop-blur-lg border border-border/40 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
          {/* Header with progress */}
          <div className="px-4 pt-3 pb-2 border-b border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-primary/70" />
              <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Contents
              </h3>
            </div>
            {/* Progress bar */}
            <div className="h-0.5 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/80 to-purple-400/80 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Scrollable list */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto max-h-[calc(70vh-4rem)] scrollbar-thin px-2 py-2"
          >
            <ul className="space-y-0.5 relative">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="relative">
                    {/* Animated active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-primary/15 border-l-2 border-primary rounded-md"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <button
                      ref={isActive ? activeItemRef : undefined}
                      onClick={() => scrollTo(item.id)}
                      className={`
                        relative w-full text-left text-[11px] py-1.5 px-2 rounded-md transition-colors duration-200
                        ${item.level === 2 ? "pl-5" : "font-semibold"}
                        ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/40"
                        }
                      `}
                      aria-current={isActive ? "location" : undefined}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {isActive && item.level === 1 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                          />
                        )}
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile/tablet: floating button + slide-out panel
  return (
    <>
      {/* Toggle button with progress ring */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-4 z-50 w-11 h-11 rounded-full bg-background/90 backdrop-blur-md border border-border/50 shadow-lg shadow-black/20 flex items-center justify-center hover:bg-background transition-all duration-200 group"
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted/30"
          />
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 19}`}
            strokeDashoffset={`${2 * Math.PI * 19 * (1 - progress / 100)}`}
            className="text-primary transition-all duration-500"
            strokeLinecap="round"
          />
        </svg>
        {isOpen ? (
          <X className="w-4 h-4 text-foreground relative z-10" />
        ) : (
          <List className="w-4 h-4 text-foreground relative z-10 group-hover:text-primary transition-colors" />
        )}
      </button>

      {/* Slide-out panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.nav
              initial={{ x: "-100%", opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.8 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-background/98 backdrop-blur-xl border-r border-border/30 shadow-2xl overflow-y-auto"
              aria-label="Theory page table of contents"
            >
              <div className="p-5 pt-14">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-primary/70" />
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Table of Contents
                  </h3>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-muted/30 rounded-full overflow-hidden mb-5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                <ul className="space-y-0.5">
                  {tocItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id} className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="absolute inset-0 bg-primary/10 border-l-2 border-primary rounded-lg"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <button
                          onClick={() => scrollTo(item.id)}
                          className={`
                            relative w-full text-left text-sm py-2.5 px-3 rounded-lg transition-colors duration-200 flex items-center gap-2
                            ${item.level === 2 ? "pl-7 text-xs" : "font-semibold"}
                            ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                            }
                          `}
                          aria-current={isActive ? "location" : undefined}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isActive && (
                              <ChevronRight className="w-3 h-3 flex-shrink-0 text-primary" />
                            )}
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Section counter */}
                <div className="mt-6 pt-4 border-t border-border/30 text-center">
                  <p className="text-[10px] text-muted-foreground/60">
                    Section {activeIndex + 1} of {tocItems.length}
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
