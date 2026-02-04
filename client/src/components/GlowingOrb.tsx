import { motion } from "framer-motion";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         THE GLOWING ORB                                       ║
 * ║              Consciousness Node Visual Representation                         ║
 * ║                                                                               ║
 * ║  A point of light in the infinite field - each one a node of awareness.      ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface GlowingOrbProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "purple" | "blue" | "green" | "gold" | "cyan" | "pink";
  pulse?: boolean;
  float?: boolean;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

const colorMap = {
  purple: {
    gradient: "from-purple-500 to-violet-600",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]",
    glowHigh: "shadow-[0_0_60px_rgba(168,85,247,0.8)]"
  },
  blue: {
    gradient: "from-blue-500 to-cyan-600",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.6)]",
    glowHigh: "shadow-[0_0_60px_rgba(59,130,246,0.8)]"
  },
  green: {
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.6)]",
    glowHigh: "shadow-[0_0_60px_rgba(16,185,129,0.8)]"
  },
  gold: {
    gradient: "from-amber-400 to-yellow-500",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.6)]",
    glowHigh: "shadow-[0_0_60px_rgba(251,191,36,0.8)]"
  },
  cyan: {
    gradient: "from-cyan-400 to-blue-500",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.6)]",
    glowHigh: "shadow-[0_0_60px_rgba(34,211,238,0.8)]"
  },
  pink: {
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-[0_0_30px_rgba(236,72,153,0.6)]",
    glowHigh: "shadow-[0_0_60px_rgba(236,72,153,0.8)]"
  }
};

export default function GlowingOrb({
  size = "md",
  color = "purple",
  pulse = true,
  float = false,
  className = "",
  intensity = "medium"
}: GlowingOrbProps) {
  const colors = colorMap[color];
  const sizeClass = sizeMap[size];
  const glowClass = intensity === "high" ? colors.glowHigh : colors.glow;

  return (
    <motion.div
      className={`
        rounded-full bg-gradient-to-br ${colors.gradient} ${sizeClass} ${glowClass}
        ${className}
      `}
      animate={pulse ? {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8]
      } : undefined}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
      style={float ? {
        animation: `float 6s ease-in-out infinite`
      } : undefined}
    />
  );
}

// Floating animation keyframes (add to global CSS if not present)
export const floatKeyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
`;

// Constellation of orbs
interface OrbConstellationProps {
  count?: number;
  colors?: GlowingOrbProps["color"][];
  className?: string;
}

export function OrbConstellation({
  count = 5,
  colors = ["purple", "blue", "green", "gold", "cyan"],
  className = ""
}: OrbConstellationProps) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length] as GlowingOrbProps["color"],
    size: (["sm", "md", "lg"] as const)[Math.floor(Math.random() * 3)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));

  return (
    <div className={`relative w-full h-full ${className}`}>
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className="absolute"
          style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: orb.delay, duration: 0.5 }}
        >
          <GlowingOrb
            color={orb.color}
            size={orb.size}
            pulse
            intensity="low"
          />
        </motion.div>
      ))}
    </div>
  );
}
