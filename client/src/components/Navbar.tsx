import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Twitter } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Theory", path: "/theory" },
    { name: "Read", path: "/read" },
    { name: "Sacred Geometry", path: "/sacred-geometry" },
    { name: "Team", path: "/team" },
    { name: "Mission", path: "/mission" },
    { name: "Ra Material", path: "/ra-material" },
    { name: "Videos", path: "/videos" },
    { name: "Bibliography", path: "/bibliography" },
    { name: "The Nexus", path: "/nexus", special: true },
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8" role="menubar">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              role="menuitem"
              aria-current={location === item.path ? "page" : undefined}
              className={cn(
                "font-body text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary relative group",
                location === item.path
                  ? "text-primary"
                  : "text-muted-foreground",
                item.special && "text-green-400 hover:text-green-300 font-mono"
              )}
            >
              {item.special ? `<${item.name}/>` : item.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                item.special ? "bg-green-400" : "bg-primary",
                location === item.path ? "w-full" : ""
              )} aria-hidden="true" />
            </Link>
          ))}
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
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-xl animate-in slide-in-from-top-5"
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                role="menuitem"
                aria-current={location === item.path ? "page" : undefined}
                className={cn(
                  "font-body text-lg font-medium py-2 px-4 rounded-lg transition-colors",
                  location === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-white/5",
                  item.special && "text-green-400 font-mono"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.special ? `<${item.name}/>` : item.name}
              </Link>
            ))}
            <a
              href="https://x.com/prjctetrnllttc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-lg font-medium py-2 px-4 rounded-lg transition-colors text-foreground hover:bg-white/5 inline-flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Twitter className="w-5 h-5" aria-hidden="true" />
              Follow us on X
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
