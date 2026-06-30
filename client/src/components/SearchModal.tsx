import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Users, Lightbulb, Wrench, BookOpen, Sparkles, Atom } from "lucide-react";
import { searchContent, getSearchSuggestions, SearchItem, typeLabels as indexTypeLabels, typeColors as indexTypeColors } from "@/lib/searchIndex";
import { loadToeIndex, searchToe, highlightSnippet, ToeSearchResult } from "@/lib/toeSearch";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  page: <FileText className="w-4 h-4" />,
  chapter: <BookOpen className="w-4 h-4" />,
  team: <Users className="w-4 h-4" />,
  concept: <Lightbulb className="w-4 h-4" />,
  tool: <Wrench className="w-4 h-4" />,
  practice: <Sparkles className="w-4 h-4" />,
  axiom: <Atom className="w-4 h-4" />,
};

const typeLabels: Record<string, string> = indexTypeLabels;

const typeColors: Record<string, string> = indexTypeColors;

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [toeResults, setToeResults] = useState<ToeSearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const toeIndexRef = useRef<Awaited<ReturnType<typeof loadToeIndex>> | null>(null);
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens; lazily load the ToE full-text index.
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setToeResults([]);
      setSuggestions([]);
      setSelectedIndex(0);
      if (!toeIndexRef.current) {
        loadToeIndex()
          .then((idx) => {
            toeIndexRef.current = idx;
          })
          .catch(() => {
            // Full-text search is a progressive enhancement; curated search still works.
          });
      }
    }
  }, [isOpen]);

  // Search as user types (curated index + ToE full text)
  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchContent(query, 6));
      setSuggestions(getSearchSuggestions(query, 3));
      setToeResults(toeIndexRef.current ? searchToe(toeIndexRef.current, query, 6) : []);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setToeResults([]);
      setSuggestions([]);
    }
  }, [query]);

  // Keyboard navigation spans both result groups: indices 0..results.length-1
  // are curated hits, results.length.. are ToE full-text hits.
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const total = results.length + toeResults.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, total - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < total) {
      e.preventDefault();
      if (selectedIndex < results.length) {
        navigateToResult(results[selectedIndex]);
      } else {
        navigateToToeResult(toeResults[selectedIndex - results.length]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  }, [results, toeResults, selectedIndex, onClose]);

  // Scroll selected item into view (skip the non-result section headers)
  useEffect(() => {
    const buttons = resultsRef.current?.querySelectorAll<HTMLElement>("[data-result-index]");
    buttons?.[selectedIndex]?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const navigateToResult = (item: SearchItem) => {
    setLocation(item.path);
    onClose();
  };

  const navigateToToeResult = (section: ToeSearchResult) => {
    setLocation(`/read?goto=${encodeURIComponent(section.title)}`);
    onClose();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search the Eternal Lattice..."
                className="flex-1 bg-transparent text-foreground text-lg placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search"
              />
              <button
                onClick={onClose}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && query.length >= 2 && (
              <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Suggestions:</span>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-2 py-0.5 text-xs bg-white/5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Results */}
            <div 
              ref={resultsRef}
              className="max-h-[50vh] overflow-y-auto"
            >
              {results.length > 0 || toeResults.length > 0 ? (
                <div className="py-2">
                  {toeResults.length > 0 && (
                    <div className="px-4 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Site
                    </div>
                  )}
                  {results.map((item, index) => (
                    <button
                      key={item.id}
                      data-result-index={index}
                      onClick={() => navigateToResult(item)}
                      className={cn(
                        "w-full px-4 py-3 flex items-start gap-3 text-left transition-colors",
                        index === selectedIndex
                          ? "bg-primary/10"
                          : "hover:bg-white/5"
                      )}
                    >
                      <div className={cn("mt-0.5", typeColors[item.type])}>
                        {item.icon ? (
                          <span className="text-lg">{item.icon}</span>
                        ) : (
                          typeIcons[item.type]
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate">
                            {item.title}
                          </span>
                          <span className={cn("text-xs px-1.5 py-0.5 rounded-full bg-white/5", typeColors[item.type])}>
                            {typeLabels[item.type]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  ))}

                  {toeResults.length > 0 && (
                    <>
                      <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" />
                        From the Theory of Everything
                      </div>
                      {toeResults.map((section, index) => (
                        <button
                          key={`toe-${section.title}`}
                          data-result-index={results.length + index}
                          onClick={() => navigateToToeResult(section)}
                          className={cn(
                            "w-full px-4 py-3 flex items-start gap-3 text-left transition-colors",
                            results.length + index === selectedIndex
                              ? "bg-primary/10"
                              : "hover:bg-white/5"
                          )}
                        >
                          <div className="mt-0.5 text-purple-400">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-foreground block truncate">
                              {section.title}
                            </span>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                              {highlightSnippet(section, query)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              ) : query.length >= 2 ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try different keywords or browse the navigation</p>
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <p className="text-sm">Start typing to search...</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="text-xs">Try:</span>
                    {["consciousness", "AG.37", "inherited ember", "ACD", "red team", "Landauer"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Enter</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
              <span>Elōhim Tov 🙏❤️♾️🕊️</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to manage search modal state and keyboard shortcut
 */
export function useSearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
