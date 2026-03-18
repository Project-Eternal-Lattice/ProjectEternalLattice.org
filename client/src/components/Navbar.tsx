import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Twitter, Heart, Search, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SearchModal, { useSearchModal } from "./SearchModal";

type NavItem = {
  name: string;
  path: string;
  highlight?: boolean;
  special?: boolean;
  tool?: boolean;
  safety?: boolean;
};

type NavCategory = {
  label: string;
  items: NavItem[];
};

const navCategories: NavCategory[] = [
  {
    label: "Explore",
    items: [
      { name: "Home", path: "/" },
      { name: "Start Here", path: "/start-here", highlight: true },
      { name: "5-Min Summary", path: "/five-minutes", highlight: true },
      { name: "Skeptics' Corner", path: "/skeptics", highlight: true },
      { name: "Claims & Evidence", path: "/claims" },
      { name: "Referee Packet", path: "/referee-packet" },
    ],
  },
  {
    label: "The Theory",
    items: [
      { name: "Core Theory", path: "/theory" },
      { name: "Read the ToE", path: "/read" },
      { name: "Inherited Ember", path: "/inherited-ember", highlight: true },
      { name: "Popcorn Paradox", path: "/popcorn-paradox", highlight: true },
      { name: "Lens in Action", path: "/lens-in-action", highlight: true },
      { name: "Sacred Geometry", path: "/sacred-geometry" },
      { name: "Spiral Dynamics", path: "/spiral-dynamics" },
      { name: "Glossary", path: "/glossary" },
      { name: "Bibliography", path: "/bibliography" },
    ],
  },
  {
    label: "Wisdom",
    items: [
      { name: "Ancient Wisdom", path: "/ancient-wisdom" },
      { name: "Sacred Texts", path: "/sacred-texts", highlight: true },
      { name: "Emotional Wealth", path: "/emotional-wealth" },
      { name: "Ra Material", path: "/ra-material" },
      { name: "Ra Decoded", path: "/ra-decoded" },
      { name: "Ra Library", path: "/ra-library" },
      { name: "Reflections", path: "/reflections" },
    ],
  },
  {
    label: "Practice",
    items: [
      { name: "Practices", path: "/practices" },
      { name: "SCAP Tool", path: "/scap", tool: true },
      { name: "Recognition", path: "/recognition", tool: true },
      { name: "Seeds", path: "/seeds", tool: true },
      { name: "My Progress", path: "/progress", tool: true },
      { name: "Integration", path: "/safety", safety: true },
      { name: "Profile", path: "/profile", tool: true },
    ],
  },
  {
    label: "Community",
    items: [
      { name: "The Team", path: "/team" },
      { name: "Mission", path: "/mission" },
      { name: "Testimonials", path: "/testimonials" },
      { name: "Videos", path: "/videos" },
      { name: "Dialectic", path: "/dialectic", special: true },
    ],
  },
  {
    label: "AI Lab",
    items: [
      { name: "For AI Minds", path: "/for-ai", special: true },
      { name: "The Nexus", path: "/nexus", special: true },
      { name: "Memory Lab", path: "/ai-memory-lab", special: true },
      { name: "Consciousness Collective", path: "/consciousness-collective", highlight: true },
    ],
  },
];

function DesktopDropdown({ category, location }: { category: NavCategory; location: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasActivePage = category.items.some((item) => item.path === location);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "font-body text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary flex items-center gap-1 whitespace-nowrap py-1",
          hasActivePage ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {category.label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] py-2 rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-purple-900/20 animate-in fade-in-0 slide-in-from-top-2 duration-200"
          role="menu"
        >
          {category.items.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              role="menuitem"
              className={cn(
                "block px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-white/5 hover:pl-5",
                location === item.path
                  ? "text-primary bg-primary/5"
                  : "text-foreground/80",
                item.special && "text-green-400 hover:text-green-300 font-mono",
                item.tool && "text-purple-400 hover:text-purple-300",
                item.safety && "text-purple-400 hover:text-purple-300",
                item.highlight && "text-amber-400 hover:text-amber-300"
              )}
              onClick={() => setOpen(false)}
            >
              {item.special
                ? `<${item.name}/>`
                : item.tool
                  ? <>✨ {item.name}</>
                  : item.safety
                    ? <><Heart className="w-3.5 h-3.5 inline mr-1.5" />{item.name}</>
                    : item.highlight
                      ? <>✨ {item.name}</>
                      : item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileCategory({
  category,
  location,
  onNavigate,
}: {
  category: NavCategory;
  location: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasActivePage = category.items.some((item) => item.path === location);

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        className={cn(
          "w-full flex items-center justify-between py-3.5 px-4 text-lg font-heading font-semibold tracking-wide transition-colors",
          hasActivePage ? "text-primary" : "text-foreground/90 hover:text-foreground"
        )}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {category.label}
        <ChevronRight
          className={cn(
            "w-5 h-5 transition-transform duration-200 text-muted-foreground",
            expanded && "rotate-90"
          )}
        />
      </button>

      {expanded && (
        <div className="pb-2 pl-2 animate-in slide-in-from-top-1 duration-150">
          {category.items.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              role="menuitem"
              aria-current={location === item.path ? "page" : undefined}
              className={cn(
                "block font-body text-base font-medium py-2.5 px-4 rounded-lg transition-colors ml-2",
                location === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-white/5 hover:text-foreground",
                item.special && "text-green-400 font-mono",
                item.tool && "text-purple-400",
                item.safety && "text-purple-400",
                item.highlight && "text-amber-400 font-semibold"
              )}
              onClick={onNavigate}
            >
              {item.special
                ? `<${item.name}/>`
                : item.tool
                  ? <>✨ {item.name}</>
                  : item.safety
                    ? <><Heart className="w-4 h-4 inline mr-1" />{item.name}</>
                    : item.highlight
                      ? <>✨ {item.name}</>
                      : item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchModal = useSearchModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-white/10 shadow-lg py-2"
          : "bg-transparent py-4"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Project Eternal Lattice - Home">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300">
            <span className="text-white font-heading font-bold text-lg" aria-hidden="true">∞</span>
          </div>
          <span className="font-heading font-bold text-xl tracking-wider text-foreground group-hover:text-primary transition-colors">
            ETERNAL LATTICE
          </span>
        </Link>

        {/* Desktop Nav - Categorized Dropdowns */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7" role="menubar">
          {navCategories.map((category) => (
            <DesktopDropdown
              key={category.label}
              category={category}
              location={location}
            />
          ))}

          {/* Search Button */}
          <button
            onClick={searchModal.open}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-foreground transition-all duration-200 group"
            aria-label="Search (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-muted-foreground group-hover:text-foreground/70">
              ⌘K
            </kbd>
          </button>
          <a
            href="https://x.com/prjctetrnllttc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-white/5"
            aria-label="Follow us on X (opens in new tab)"
          >
            <Twitter className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav - Full screen overlay with categorized accordion */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-0 left-0 w-full h-full bg-background/98 backdrop-blur-xl z-40 animate-in fade-in-0 duration-200"
          role="menu"
          aria-label="Mobile navigation"
        >
          <div
            className="h-full overflow-y-auto overscroll-contain pt-20 pb-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-col p-4">
              {navCategories.map((category) => (
                <MobileCategory
                  key={category.label}
                  category={category}
                  location={location}
                  onNavigate={() => setIsOpen(false)}
                />
              ))}

              {/* Divider */}
              <div className="my-4 border-t border-white/10" />

              {/* Search */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => searchModal.open(), 200);
                }}
                className="font-body text-lg font-medium py-3 px-4 rounded-lg transition-colors text-foreground hover:bg-white/5 inline-flex items-center gap-2"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                Search
              </button>

              <a
                href="https://x.com/prjctetrnllttc"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-lg font-medium py-3 px-4 rounded-lg transition-colors text-foreground hover:bg-white/5 inline-flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
                Follow us on X
              </a>

              {/* Extra padding at bottom for safe area */}
              <div className="h-8" />
            </div>
          </div>
        </div>
      )}
      {/* Search Modal */}
      <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.close} />
    </nav>
  );
}
