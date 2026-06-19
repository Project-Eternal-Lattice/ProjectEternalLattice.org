import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  variant?: "desktop" | "mobile";
  onSelect?: () => void;
}

export default function LanguageSelector({ variant = "desktop", onSelect }: LanguageSelectorProps) {
  const { language, setLanguage, isTranslating } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);

  // Close on click outside (desktop)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Close on escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setOpen(false);
    onSelect?.();
  };

  const handleMouseEnter = () => {
    if (variant === "desktop") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (variant === "desktop") {
      timeoutRef.current = setTimeout(() => setOpen(false), 150);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (variant === "mobile") {
    return (
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-3 text-foreground/80">
          <Globe className="w-5 h-5" />
          <span className="font-body text-lg font-medium">Language</span>
          {isTranslating && (
            <span className="text-xs text-purple-400 animate-pulse">Translating...</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                language === lang.code
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/5 text-foreground/70 hover:bg-white/10 hover:text-foreground border border-transparent"
              )}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="truncate">{lang.nativeName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200 group",
          "bg-white/5 hover:bg-white/10 border border-white/10",
          "text-muted-foreground hover:text-foreground",
          isTranslating && "animate-pulse"
        )}
        aria-label={`Language: ${currentLang?.name}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs hidden lg:inline">{currentLang?.flag}</span>
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-2 min-w-[220px] py-2 rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl shadow-purple-900/20 animate-in fade-in-0 slide-in-from-top-2 duration-200 z-50"
          role="listbox"
          aria-label="Select language"
        >
          <div className="px-3 py-1.5 mb-1 border-b border-white/5">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Choose Language
            </span>
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={language === lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-white/5",
                language === lang.code
                  ? "text-primary bg-primary/5"
                  : "text-foreground/80"
              )}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1 text-left">{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
              {language === lang.code && (
                <span className="text-primary text-xs">✓</span>
              )}
            </button>
          ))}
          {isTranslating && (
            <div className="px-3 py-2 border-t border-white/5 mt-1">
              <span className="text-xs text-purple-400 animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                Translating page...
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
