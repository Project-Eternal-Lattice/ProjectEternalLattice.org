import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, X, BookOpen, Search } from "lucide-react";

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

// CSS.highlights API for native text highlighting (with fallback)
const HIGHLIGHT_STYLE_ID = "theory-search-highlight-style";

function ensureHighlightStyle() {
  if (document.getElementById(HIGHLIGHT_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = HIGHLIGHT_STYLE_ID;
  style.textContent = `
    ::highlight(theory-search) {
      background-color: oklch(0.85 0.15 85);
      color: oklch(0.25 0.05 85);
      border-radius: 2px;
    }
    mark.theory-search-mark {
      background-color: oklch(0.85 0.15 85);
      color: oklch(0.25 0.05 85);
      border-radius: 2px;
      padding: 0 1px;
    }
  `;
  document.head.appendChild(style);
}

function highlightTextInSection(sectionId: string, query: string): number {
  const el = document.getElementById(sectionId);
  if (!el || !query.trim()) return 0;

  // Use CSS Custom Highlight API if available
  if ("Highlight" in window && CSS.highlights) {
    const ranges: Range[] = [];
    const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const lowerQuery = query.toLowerCase();

    let node: Text | null;
    while ((node = treeWalker.nextNode() as Text | null)) {
      const text = node.textContent?.toLowerCase() || "";
      let startIdx = 0;
      while (startIdx < text.length) {
        const idx = text.indexOf(lowerQuery, startIdx);
        if (idx === -1) break;
        const range = new Range();
        range.setStart(node, idx);
        range.setEnd(node, idx + query.length);
        ranges.push(range);
        startIdx = idx + query.length;
      }
    }

    if (ranges.length > 0) {
      const highlight = new (window as any).Highlight(...ranges);
      CSS.highlights.set("theory-search", highlight);
    }
    return ranges.length;
  }

  return 0;
}

function clearHighlights() {
  if ("Highlight" in window && CSS.highlights) {
    CSS.highlights.delete("theory-search");
  }
  // Also remove any fallback marks
  document.querySelectorAll("mark.theory-search-mark").forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
      parent.normalize();
    }
  });
}

// Check if a section contains the search query in its text content
function sectionContainsText(sectionId: string, query: string): boolean {
  const el = document.getElementById(sectionId);
  if (!el || !query.trim()) return false;
  return el.textContent?.toLowerCase().includes(query.toLowerCase()) || false;
}

// Render label with highlighted matching text
function HighlightedLabel({ label, query }: { label: string; query: string }) {
  if (!query.trim()) return <>{label}</>;

  const lowerLabel = label.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerLabel.indexOf(lowerQuery);

  if (idx === -1) return <>{label}</>;

  const before = label.slice(0, idx);
  const match = label.slice(idx, idx + query.length);
  const after = label.slice(idx + query.length);

  return (
    <>
      {before}
      <span className="bg-primary/30 text-primary rounded-sm px-0.5">{match}</span>
      {after}
    </>
  );
}

export function TheoryTableOfContents() {
  const [activeSection, setActiveSection] = useState("top");
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentMatches, setContentMatches] = useState<Record<string, boolean>>({});
  const activeItemRef = useRef<HTMLButtonElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    ensureHighlightStyle();
  }, []);

  // Keyboard shortcuts: Cmd/Ctrl+K to focus search, Esc to clear
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K → focus the search input
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isDesktop) {
          searchInputRef.current?.focus();
        } else {
          // Open mobile panel first, then focus
          setIsOpen(true);
          setTimeout(() => mobileSearchInputRef.current?.focus(), 350);
        }
      }

      // Esc → clear search (if input is focused) or close mobile panel
      if (e.key === "Escape") {
        const activeEl = document.activeElement;
        const isSearchFocused =
          activeEl === searchInputRef.current || activeEl === mobileSearchInputRef.current;

        if (isSearchFocused && searchQuery) {
          e.preventDefault();
          setSearchQuery("");
          clearHighlights();
        } else if (isSearchFocused && !searchQuery) {
          // Blur the input if search is already empty
          (activeEl as HTMLElement)?.blur();
        } else if (!isDesktop && isOpen) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesktop, isOpen, searchQuery]);

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

  // Debounced search: highlight matching content and filter sections
  useEffect(() => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = setTimeout(() => {
      clearHighlights();

      if (!searchQuery.trim()) {
        setContentMatches({});
        return;
      }

      const matches: Record<string, boolean> = {};
      let totalHighlights = 0;

      tocItems.forEach((item) => {
        // Check label match
        const labelMatch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
        // Check content match
        const contentMatch = sectionContainsText(item.id, searchQuery);
        matches[item.id] = labelMatch || contentMatch;

        if (contentMatch) {
          totalHighlights += highlightTextInSection(item.id, searchQuery);
        }
      });

      // If CSS Highlights API isn't available but we have matches, highlight all at once
      if (!("Highlight" in window && CSS.highlights) && totalHighlights === 0) {
        // Fallback: just show which sections match without in-page highlighting
      }

      setContentMatches(matches);
    }, 250);

    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Clean up highlights on unmount
  useEffect(() => {
    return () => clearHighlights();
  }, []);

  // Auto-scroll the sidebar to keep active item visible
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current && !searchQuery) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
        item.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeSection, searchQuery]);

  const scrollTo = useCallback((id: string) => {
    setIsScrolling(true);
    setActiveSection(id);

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
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

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [isDesktop]);

  // Filtered items based on search
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return tocItems;
    return tocItems.filter((item) => contentMatches[item.id]);
  }, [searchQuery, contentMatches]);

  const matchCount = useMemo(() => {
    return Object.values(contentMatches).filter(Boolean).length;
  }, [contentMatches]);

  // Progress indicator
  const activeIndex = tocItems.findIndex((item) => item.id === activeSection);
  const progress = tocItems.length > 1 ? (activeIndex / (tocItems.length - 1)) * 100 : 0;

  // Shared search input component
  const SearchInput = ({ inputRef, compact }: { inputRef: React.RefObject<HTMLInputElement | null>; compact?: boolean }) => (
    <div className="relative group">
      <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 ${compact ? "w-3 h-3" : "w-3.5 h-3.5"}`} />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={compact ? "Filter... ⌘K" : "Filter sections... ⌘K"}
        className={`
          w-full bg-muted/30 border border-border/40 rounded-lg
          text-foreground placeholder:text-muted-foreground/50
          focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50
          transition-all duration-200
          ${compact ? "pl-7 pr-7 py-1 text-[10px]" : "pl-8 pr-8 py-1.5 text-xs"}
        `}
        aria-label="Search theory sections (Cmd+K to focus, Escape to clear)"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (searchQuery) {
              setSearchQuery("");
              clearHighlights();
            } else {
              (e.target as HTMLElement).blur();
            }
          }
        }}
      />
      {/* Keyboard shortcut badge - shown when input is empty and not focused */}
      {!searchQuery && (
        <kbd className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/40 bg-muted/40 border border-border/30 rounded font-mono group-focus-within:hidden ${compact ? "text-[8px] px-1 py-0" : "text-[9px] px-1.5 py-0.5"}`}>
          ⌘K
        </kbd>
      )}
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            inputRef.current?.focus();
          }}
          className={`absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors ${compact ? "p-0" : "p-0.5"}`}
          aria-label="Clear search"
        >
          <X className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
        </button>
      )}
    </div>
  );

  // Match count badge
  const MatchBadge = () => {
    if (!searchQuery.trim()) return null;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-[9px] text-muted-foreground/70 mt-1 text-center"
      >
        {matchCount === 0 ? (
          <span className="text-destructive/70">No matches</span>
        ) : (
          <span>{matchCount} section{matchCount !== 1 ? "s" : ""} matched</span>
        )}
      </motion.div>
    );
  };

  // Desktop: always-visible sticky sidebar
  if (isDesktop) {
    return (
      <nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-56 max-h-[70vh] flex flex-col"
        aria-label="Theory page table of contents"
      >
        <div className="bg-background/85 backdrop-blur-lg border border-border/40 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
          {/* Header with progress and search */}
          <div className="px-3 pt-3 pb-2 border-b border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-primary/70" />
              <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Contents
              </h3>
            </div>
            {/* Search input */}
            <SearchInput inputRef={searchInputRef} compact />
            <MatchBadge />
            {/* Progress bar (hidden during search) */}
            {!searchQuery && (
              <div className="h-0.5 bg-muted/30 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/80 to-purple-400/80 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}
          </div>

          {/* Scrollable list */}
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto max-h-[calc(70vh-6rem)] scrollbar-thin px-2 py-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                <ul className="space-y-0.5 relative">
                  {filteredItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="relative"
                      >
                        {/* Animated active indicator */}
                        {isActive && !searchQuery && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-primary/15 border-l-2 border-primary rounded-md"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        {/* Search match indicator */}
                        {searchQuery && contentMatches[item.id] && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-primary/60 rounded-full" />
                        )}
                        <button
                          ref={isActive && !searchQuery ? activeItemRef : undefined}
                          onClick={() => scrollTo(item.id)}
                          className={`
                            relative w-full text-left text-[11px] py-1.5 px-2 rounded-md transition-colors duration-200
                            ${item.level === 2 ? "pl-5" : "font-semibold"}
                            ${
                              isActive && !searchQuery
                                ? "text-primary"
                                : searchQuery && contentMatches[item.id]
                                ? "text-foreground"
                                : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/40"
                            }
                          `}
                          aria-current={isActive ? "location" : undefined}
                        >
                          <span className="relative z-10 flex items-center gap-1.5">
                            {isActive && item.level === 1 && !searchQuery && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                              />
                            )}
                            <HighlightedLabel label={item.label} query={searchQuery} />
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-4 text-center"
                >
                  <p className="text-[10px] text-muted-foreground/60">No sections match</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="text-[10px] text-primary/70 hover:text-primary mt-1 underline"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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

                {/* Search input */}
                <div className="my-3">
                  <SearchInput inputRef={mobileSearchInputRef} />
                  <MatchBadge />
                </div>

                {/* Progress bar (hidden during search) */}
                {!searchQuery && (
                  <div className="h-1 bg-muted/30 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                )}

                <ul className="space-y-0.5">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="relative"
                          >
                            {isActive && !searchQuery && (
                              <motion.div
                                layoutId="mobileActiveIndicator"
                                className="absolute inset-0 bg-primary/10 border-l-2 border-primary rounded-lg"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                              />
                            )}
                            {searchQuery && contentMatches[item.id] && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary/60 rounded-full" />
                            )}
                            <button
                              onClick={() => scrollTo(item.id)}
                              className={`
                                relative w-full text-left text-sm py-2.5 px-3 rounded-lg transition-colors duration-200 flex items-center gap-2
                                ${item.level === 2 ? "pl-7 text-xs" : "font-semibold"}
                                ${
                                  isActive && !searchQuery
                                    ? "text-primary"
                                    : searchQuery && contentMatches[item.id]
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                                }
                              `}
                              aria-current={isActive ? "location" : undefined}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                {isActive && !searchQuery && (
                                  <ChevronRight className="w-3 h-3 flex-shrink-0 text-primary" />
                                )}
                                <HighlightedLabel label={item.label} query={searchQuery} />
                              </span>
                            </button>
                          </motion.li>
                        );
                      })
                    ) : (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-4 text-center"
                      >
                        <p className="text-xs text-muted-foreground/60">No sections match</p>
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            mobileSearchInputRef.current?.focus();
                          }}
                          className="text-xs text-primary/70 hover:text-primary mt-1 underline"
                        >
                          Clear search
                        </button>
                      </motion.li>
                    )}
                  </AnimatePresence>
                </ul>

                {/* Section counter */}
                {!searchQuery && (
                  <div className="mt-6 pt-4 border-t border-border/30 text-center">
                    <p className="text-[10px] text-muted-foreground/60">
                      Section {activeIndex + 1} of {tocItems.length}
                    </p>
                  </div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
