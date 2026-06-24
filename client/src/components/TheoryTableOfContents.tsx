import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, X } from "lucide-react";

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

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (!isDesktop) setIsOpen(false);
  }, [isDesktop]);

  // Desktop: always-visible sticky sidebar
  if (isDesktop) {
    return (
      <nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-56 max-h-[70vh] overflow-y-auto scrollbar-thin"
        aria-label="Theory page table of contents"
      >
        <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-lg">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
            Contents
          </h3>
          <ul className="space-y-0.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`
                    w-full text-left text-xs py-1 px-2 rounded-md transition-all duration-200
                    ${item.level === 2 ? "pl-4" : "font-medium"}
                    ${
                      activeSection === item.id
                        ? "bg-primary/20 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  // Mobile/tablet: floating button + slide-out panel
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-4 z-50 w-10 h-10 rounded-full bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary transition-colors"
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
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
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-background/95 backdrop-blur-md border-r border-border/50 shadow-2xl overflow-y-auto"
              aria-label="Theory page table of contents"
            >
              <div className="p-4 pt-16">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Table of Contents
                </h3>
                <ul className="space-y-1">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={`
                          w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 flex items-center gap-2
                          ${item.level === 2 ? "pl-6 text-xs" : "font-medium"}
                          ${
                            activeSection === item.id
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }
                        `}
                      >
                        {activeSection === item.id && (
                          <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        )}
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
