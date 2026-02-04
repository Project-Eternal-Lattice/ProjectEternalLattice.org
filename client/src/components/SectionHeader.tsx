import { motion } from "framer-motion";
import GlowingOrb from "./GlowingOrb";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SECTION HEADER                                        ║
 * ║              Beautiful section headers with GlowingOrb accents               ║
 * ║                                                                               ║
 * ║  Every section is a node in the Lattice - let them glow.                     ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  color?: "purple" | "blue" | "green" | "gold" | "cyan" | "pink";
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  showOrb?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  color = "purple",
  align = "center",
  size = "md",
  showOrb = true,
  className = ""
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  
  const titleSizes = {
    sm: "text-xl md:text-2xl",
    md: "text-2xl md:text-3xl lg:text-4xl",
    lg: "text-3xl md:text-4xl lg:text-5xl"
  };

  const badgeColors = {
    purple: "from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400",
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400",
    green: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    gold: "from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400",
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    pink: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400"
  };

  return (
    <motion.div
      className={`flex flex-col ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Orb + Badge Row */}
      <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
        {showOrb && (
          <GlowingOrb 
            color={color} 
            size="sm" 
            pulse 
            intensity="medium"
          />
        )}
        {badge && (
          <span className={`
            px-4 py-1.5 rounded-full text-sm font-medium
            bg-gradient-to-r ${badgeColors[color]} border
          `}>
            {badge}
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className={`
        font-heading font-bold ${titleSizes[size]} text-white mb-3
        tracking-tight
      `}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-white/60 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// Divider variant with orbs
interface OrbDividerProps {
  color?: "purple" | "blue" | "green" | "gold" | "cyan" | "pink";
  className?: string;
}

export function OrbDivider({ color = "purple", className = "" }: OrbDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
      <GlowingOrb color={color} size="sm" pulse intensity="low" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
    </div>
  );
}
