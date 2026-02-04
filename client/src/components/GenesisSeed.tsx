import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";

interface GenesisSeedProps {
  symbol: string;
  className?: string;
  inline?: boolean;
  showHint?: boolean;
}

/**
 * GenesisSeed Component
 * 
 * Embeds a discoverable Genesis Seed symbol that links to /seeds when clicked.
 * Seeds can be placed throughout the site for visitors to discover organically.
 * 
 * Usage:
 * <GenesisSeed symbol="∞" />                    // Block display with glow
 * <GenesisSeed symbol="🜁" inline />            // Inline within text
 * <GenesisSeed symbol="φ" showHint />           // Shows subtle hint on hover
 */
export function GenesisSeed({ symbol, className = "", inline = false, showHint = false }: GenesisSeedProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Check if this seed has been discovered
  const isDiscovered = (): boolean => {
    try {
      const discovered = JSON.parse(localStorage.getItem("discoveredSeeds") || "[]");
      return discovered.includes(symbol);
    } catch {
      return false;
    }
  };

  if (inline) {
    return (
      <Link href="/seeds">
        <motion.span
          className={`cursor-pointer transition-all duration-300 ${
            isDiscovered() 
              ? "text-gold opacity-100" 
              : "opacity-60 hover:opacity-100 hover:text-purple-400"
          } ${className}`}
          whileHover={{ scale: 1.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title={showHint ? "A Genesis Seed awaits..." : undefined}
        >
          {symbol}
          {isHovered && !isDiscovered() && (
            <Sparkles className="inline w-3 h-3 ml-1 text-purple-400 animate-pulse" />
          )}
        </motion.span>
      </Link>
    );
  }

  return (
    <Link href="/seeds">
      <motion.div
        className={`relative inline-flex items-center justify-center cursor-pointer group ${className}`}
        whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl"
            />
          )}
        </AnimatePresence>
        
        {/* Symbol */}
        <span className={`relative text-2xl ${
          isDiscovered() 
            ? "text-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" 
            : "text-white/40 group-hover:text-purple-400 transition-colors"
        }`}>
          {symbol}
        </span>

        {/* Hint tooltip */}
        {showHint && isHovered && !isDiscovered() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-purple-400 bg-background/90 px-2 py-1 rounded border border-purple-500/30"
          >
            A Genesis Seed awaits...
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}

/**
 * SeedTrail Component
 * 
 * Displays a decorative trail of seed symbols, some discoverable.
 * Great for section dividers or decorative elements.
 */
export function SeedTrail({ className = "" }: { className?: string }) {
  const trailSymbols = ["·", "∞", "·", "🜁", "·", "φ", "·", "Ω", "·"];
  
  return (
    <div className={`flex items-center justify-center gap-2 text-white/20 ${className}`}>
      {trailSymbols.map((symbol, index) => {
        // Only some symbols are actual seeds
        const isSeed = ["∞", "🜁", "φ", "Ω"].includes(symbol);
        
        if (isSeed) {
          return <GenesisSeed key={index} symbol={symbol} inline className="text-sm" />;
        }
        
        return <span key={index}>{symbol}</span>;
      })}
    </div>
  );
}

/**
 * HiddenSeed Component
 * 
 * A seed that's nearly invisible until hovered - for truly hidden easter eggs.
 */
export function HiddenSeed({ symbol, className = "" }: { symbol: string; className?: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Link href="/seeds">
      <motion.span
        className={`cursor-pointer transition-all duration-500 ${
          revealed 
            ? "opacity-60 text-purple-400" 
            : "opacity-[0.05] text-white"
        } ${className}`}
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        whileHover={{ scale: 1.3 }}
      >
        {symbol}
      </motion.span>
    </Link>
  );
}

export default GenesisSeed;
