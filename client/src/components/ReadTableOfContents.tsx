import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, BookOpen, Search } from "lucide-react";

/**
 * Sticky chapter navigation for the Read page.
 *
 * The full Theory of Everything is rendered inside a same-origin iframe
 * (`/toe-full.html`, ~2,850 pages, 100+ chapters). This component reads the
 * iframe's chapter headings on load, assigns stable ids to any that lack one,
 * and lets readers jump to a chapter — scrolling within the iframe. Desktop
 * shows a fixed left sidebar; mobile shows a floating button + drawer.
 */

interface TocItem {
  id: string;
  label: string;
}

export function ReadTableOfContents({
  iframeRef,
}: {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [query, setQuery] = useState("");
  const activeItemRef = useRef<HTMLButtonElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Build the TOC from the iframe's chapter headings once it loads.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const build = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const headings = Array.from(doc.querySelectorAll<HTMLElement>("h1"));
        const list: TocItem[] = [];
        headings.forEach((h, i) => {
          const label = (h.textContent || "").trim().replace(/\s+/g, " ");
          if (!label) return;
          if (!h.id) h.id = `read-toc-${i}`;
          list.push({ id: h.id, label });
        });
        setItems(list);
      } catch {
        // Same-origin only; ignore if the document isn't accessible.
        setItems([]);
      }
    };

    if (iframe.contentDocument?.readyState === "complete") build();
    iframe.addEventListener("load", build);
    return () => iframe.removeEventListener("load", build);
  }, [iframeRef]);

  // Track the active chapter as the reader scrolls inside the iframe.
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    const doc = iframeRef.current?.contentDocument;
    if (!win || !doc || items.length === 0) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let current = items[0]?.id ?? "";
        for (const item of items) {
          const el = doc.getElementById(item.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= 120) current = item.id;
          else break;
        }
        setActiveId(current);
        ticking = false;
      });
    };

    win.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => win.removeEventListener("scroll", onScroll);
  }, [iframeRef, items]);

  // Keep the active item visible in the sidebar.
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current && !query) {
      const container = scrollContainerRef.current;
      const item = activeItemRef.current;
      const cRect = container.getBoundingClientRect();
      const iRect = item.getBoundingClientRect();
      if (iRect.top < cRect.top || iRect.bottom > cRect.bottom) {
        item.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeId, query]);

  const scrollTo = useCallback(
    (id: string) => {
      const doc = iframeRef.current?.contentDocument;
      const el = doc?.getElementById(id);
      if (el) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        setActiveId(id);
      }
      if (!isDesktop) setIsOpen(false);
    },
    [iframeRef, isDesktop],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) => it.label.toLowerCase().includes(q));
  }, [items, query]);

  if (items.length === 0) return null;

  const list = (
    <div ref={scrollContainerRef} className="overflow-y-auto scrollbar-thin px-2 py-2 flex-1">
      <ul className="space-y-0.5">
        {filtered.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                ref={isActive && !query ? activeItemRef : undefined}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left text-[11px] leading-snug py-1.5 px-2 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-primary bg-primary/15 border-l-2 border-primary font-semibold"
                    : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/40"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                {item.label}
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="py-4 text-center text-[10px] text-muted-foreground/60">No chapters match</li>
        )}
      </ul>
    </div>
  );

  const searchInput = (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground/60" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter chapters..."
        className="w-full bg-muted/30 border border-border/40 rounded-lg pl-7 pr-7 py-1 text-[10px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50"
        aria-label="Filter chapters"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground"
          aria-label="Clear filter"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  // Desktop: fixed left sidebar.
  if (isDesktop) {
    return (
      <nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-56 max-h-[72vh] flex flex-col"
        aria-label="Chapter navigation"
      >
        <div className="bg-background/85 backdrop-blur-lg border border-border/40 rounded-2xl shadow-xl shadow-black/20 overflow-hidden flex flex-col max-h-[72vh]">
          <div className="px-3 pt-3 pb-2 border-b border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-primary/70" />
              <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                Chapters
              </h3>
              <span className="ml-auto text-[9px] text-muted-foreground/50">{items.length}</span>
            </div>
            {searchInput}
          </div>
          {list}
        </div>
      </nav>
    );
  }

  // Mobile: floating button + slide-in drawer.
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/90 backdrop-blur-lg border border-border/40 shadow-lg text-xs font-semibold text-foreground xl:hidden"
        aria-label="Open chapter navigation"
      >
        <List className="w-4 h-4 text-primary" />
        Chapters
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm xl:hidden"
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 max-w-[85vw] bg-background/95 backdrop-blur-lg border-r border-border/40 flex flex-col xl:hidden"
              aria-label="Chapter navigation"
            >
              <div className="px-3 pt-4 pb-2 border-b border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary/70" />
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    Chapters
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto text-muted-foreground/60 hover:text-foreground"
                    aria-label="Close chapter navigation"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {searchInput}
              </div>
              {list}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
