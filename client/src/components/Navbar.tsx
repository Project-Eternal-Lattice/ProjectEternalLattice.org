import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Twitter, Heart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import SearchModal, { useSearchModal } from "./SearchModal";

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
      // Save current scroll position and lock body
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // Restore scroll position
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Start Here", path: "/start-here", highlight: true },
    { name: "Theory", path: "/theory" },
    { name: "Read", path: "/read" },
    { name: "Sacred Geometry", path: "/sacred-geometry" },
    { name: "Ancient Wisdom", path: "/ancient-wisdom" },
    { name: "Team", path: "/team" },
    { name: "Mission", path: "/mission" },
    { name: "Ra Material", path: "/ra-material" },
    { name: "Ra Decoded", path: "/ra-decoded" },
    { name: "Emotional Wealth", path: "/emotional-wealth" },
    { name: "Videos", path: "/videos" },
    { name: "Bibliography", path: "/bibliography" },
    { name: "Glossary", path: "/glossary" },
    { name: "SCAP", path: "/scap", tool: true },
    { name: "Recognition", path: "/recognition", tool: true },
    { name: "Seeds", path: "/seeds", tool: true },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Skeptics", path: "/skeptics", highlight: true },
    { name: "My Progress", path: "/progress", tool: true },
    { name: "Profile", path: "/profile", tool: true },
    { name: "Dialectic", path: "/dialectic", special: true },
    { name: "The Nexus", path: "/nexus", special: true },
    { name: "Integration", path: "/safety", safety: true },
  ];

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

        {/* Desktop Nav - Horizontally scrollable */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 overflow-x-auto scrollbar-hide max-w-[calc(100vw-280px)]" role="menubar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              role="menuitem"
              aria-current={location === item.path ? "page" : undefined}
              className={cn(
                "font-body text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary relative group whitespace-nowrap",
                location === item.path
                  ? "text-primary"
                  : "text-muted-foreground",
                item.special && "text-green-400 hover:text-green-300 font-mono",
                item.tool && "text-purple-400 hover:text-purple-300",
                item.safety && "text-purple-400 hover:text-purple-300",
                item.highlight && "text-amber-400 hover:text-amber-300 font-semibold"
              )}
            >
              {item.special ? `<${item.name}/>` : item.tool ? <>✨ {item.name}</> : item.safety ? <><Heart className="w-4 h-4 inline mr-1" />{item.name}</> : item.highlight ? <>✨ {item.name}</> : item.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                item.special ? "bg-green-400" : item.tool ? "bg-purple-400" : item.safety ? "bg-purple-400" : item.highlight ? "bg-amber-400" : "bg-primary",
                location === item.path ? "w-full" : ""
              )} aria-hidden="true" />
            </Link>
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

      {/* Mobile Nav - Full screen overlay with scrollable content */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-0 left-0 w-full h-full bg-background/98 backdrop-blur-xl z-40 animate-in fade-in-0 duration-200"
          role="menu"
          aria-label="Mobile navigation"
        >
          {/* Scrollable container */}
          <div 
            className="h-full overflow-y-auto overscroll-contain pt-20 pb-8"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  role="menuitem"
                  aria-current={location === item.path ? "page" : undefined}
                  className={cn(
                    "font-body text-lg font-medium py-3 px-4 rounded-lg transition-colors",
                    location === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-white/5",
                    item.special && "text-green-400 font-mono",
                    item.tool && "text-purple-400",
                    item.safety && "text-purple-400",
                    item.highlight && "text-amber-400 font-semibold"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.special ? `<${item.name}/>` : item.tool ? <>✨ {item.name}</> : item.safety ? <><Heart className="w-4 h-4 inline mr-1" />{item.name}</> : item.highlight ? <>✨ {item.name}</> : item.name}
                </Link>
              ))}
              
              {/* Divider */}
              <div className="my-4 border-t border-white/10" />
              
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
