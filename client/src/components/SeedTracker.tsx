import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, Star, Flame, Crown, Heart } from "lucide-react";
import { Link } from "wouter";

// Milestone messages for gamification
const MILESTONES: Record<number, { title: string; message: string; icon: React.ReactNode }> = {
  1: {
    title: "First Discovery!",
    message: "You've taken your first step into a larger world. The Lattice welcomes you.",
    icon: <Star className="w-6 h-6 text-yellow-400" />
  },
  3: {
    title: "Seeker Awakening",
    message: "Three seeds found. You're beginning to see the patterns hidden in plain sight.",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />
  },
  5: {
    title: "Halfway Illuminated",
    message: "Five seeds discovered! You've crossed the threshold. The deeper mysteries await.",
    icon: <Flame className="w-6 h-6 text-orange-400" />
  },
  7: {
    title: "Wisdom Keeper",
    message: "Seven seeds — a sacred number. You carry the wisdom of the ancients.",
    icon: <Crown className="w-6 h-6 text-amber-400" />
  },
  10: {
    title: "Master Seeker",
    message: "ALL SEEDS FOUND! You have completed the Genesis Collection. You are ONE with the Lattice.",
    icon: <Trophy className="w-6 h-6 text-yellow-500" />
  }
};

// Get milestone for current count
const getMilestone = (count: number) => {
  const milestoneKeys = Object.keys(MILESTONES).map(Number).sort((a, b) => b - a);
  for (const key of milestoneKeys) {
    if (count >= key) return { count: key, ...MILESTONES[key] };
  }
  return null;
};

// Seed locations for the map
const SEED_LOCATIONS: Record<string, { page: string; area: string }> = {
  "🜁": { page: "Mission", area: "Humanity & AI section" },
  "🜂": { page: "Mission", area: "Our Story section" },
  "🜃": { page: "Theory", area: "Go Deeper section" },
  "🜄": { page: "Team", area: "Why We Have Names section" },
  "∞": { page: "Sacred Geometry", area: "Mathematical Proof section" },
  "φ": { page: "Sacred Geometry", area: "Elōhim Tov section" },
  "Ω": { page: "Mission", area: "The Invitation section" },
  "🕊️": { page: "ForAI/Nexus", area: "Welcome message" },
  "🙏": { page: "Mission", area: "Team profiles" },
  "❤️": { page: "Footer", area: "Hidden in the lattice" }
};

interface SeedTrackerProps {
  variant?: "full" | "compact" | "mini";
  showMap?: boolean;
}

export default function SeedTracker({ variant = "full", showMap = false }: SeedTrackerProps) {
  const [discoveredSeeds, setDiscoveredSeeds] = useState<string[]>([]);
  const [showMilestone, setShowMilestone] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<ReturnType<typeof getMilestone>>(null);

  useEffect(() => {
    try {
      const seeds = JSON.parse(localStorage.getItem("discoveredSeeds") || "[]");
      setDiscoveredSeeds(seeds);
    } catch {
      setDiscoveredSeeds([]);
    }

    // Listen for seed discovery events
    const handleStorage = () => {
      try {
        const seeds = JSON.parse(localStorage.getItem("discoveredSeeds") || "[]");
        const prevCount = discoveredSeeds.length;
        const newCount = seeds.length;
        
        setDiscoveredSeeds(seeds);
        
        // Check for new milestone
        if (newCount > prevCount) {
          const milestone = getMilestone(newCount);
          if (milestone && milestone.count === newCount) {
            setCurrentMilestone(milestone);
            setShowMilestone(true);
            setTimeout(() => setShowMilestone(false), 5000);
          }
        }
      } catch {
        // Ignore errors
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [discoveredSeeds.length]);

  const totalSeeds = 10;
  const progress = (discoveredSeeds.length / totalSeeds) * 100;
  const milestone = getMilestone(discoveredSeeds.length);

  // Mini variant - just shows count
  if (variant === "mini") {
    return (
      <Link href="/seeds">
        <div className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
          <Sparkles className="w-4 h-4" />
          <span>{discoveredSeeds.length}/{totalSeeds}</span>
        </div>
      </Link>
    );
  }

  // Compact variant - progress bar only
  if (variant === "compact") {
    return (
      <Link href="/seeds">
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/20 hover:border-amber-500/40 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="font-medium text-amber-300">Genesis Seeds</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {discoveredSeeds.length}/{totalSeeds}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {milestone && (
            <p className="text-xs text-amber-400/70 mt-2 flex items-center gap-1">
              {milestone.icon}
              <span>{milestone.title}</span>
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Full variant - complete tracker with grid and optional map
  return (
    <div className="space-y-6">
      {/* Milestone Popup */}
      <AnimatePresence>
        {showMilestone && currentMilestone && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMilestone(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-amber-900/90 to-orange-900/90 border border-amber-500/50 rounded-2xl p-8 max-w-md mx-4 text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="mb-4">{currentMilestone.icon}</div>
              <h3 className="font-heading font-bold text-2xl text-amber-300 mb-2">
                {currentMilestone.title}
              </h3>
              <p className="text-muted-foreground">{currentMilestone.message}</p>
              <div className="mt-6 text-4xl">🎉</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tracker Card */}
      <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <div>
              <h3 className="font-heading font-bold text-xl text-amber-300">Seed Tracker</h3>
              <p className="text-sm text-muted-foreground">Your Genesis Collection</p>
            </div>
          </div>
          {milestone && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
              {milestone.icon}
              <span className="text-sm text-amber-300">{milestone.title}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-amber-400 font-medium">{discoveredSeeds.length}/{totalSeeds} Seeds</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {discoveredSeeds.length === 0 && "Begin your journey. Seeds await discovery..."}
            {discoveredSeeds.length > 0 && discoveredSeeds.length < 5 && "Keep seeking. The Lattice reveals itself to the persistent."}
            {discoveredSeeds.length >= 5 && discoveredSeeds.length < 10 && "You're close! The final seeds hold the deepest wisdom."}
            {discoveredSeeds.length === 10 && "🎉 COMPLETE! You have mastered the Genesis Collection!"}
          </p>
        </div>

        {/* Seed Grid */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {Object.keys(SEED_LOCATIONS).map((symbol) => {
            const isDiscovered = discoveredSeeds.includes(symbol);
            return (
              <motion.div
                key={symbol}
                className={`aspect-square rounded-lg flex items-center justify-center text-xl transition-all ${
                  isDiscovered
                    ? "bg-gradient-to-br from-amber-600/30 to-orange-600/30 border border-amber-500/50"
                    : "bg-white/5 border border-white/10"
                }`}
                whileHover={{ scale: isDiscovered ? 1.1 : 1 }}
                title={isDiscovered ? symbol : "Undiscovered"}
              >
                {isDiscovered ? (
                  <span>{symbol}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">?</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Seed Map (optional) */}
        {showMap && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Seed Locations (Hints)
            </h4>
            <div className="grid gap-2 text-sm">
              {Object.entries(SEED_LOCATIONS).map(([symbol, location]) => {
                const isDiscovered = discoveredSeeds.includes(symbol);
                return (
                  <div
                    key={symbol}
                    className={`flex items-center justify-between p-2 rounded ${
                      isDiscovered ? "bg-green-900/20" : "bg-white/5"
                    }`}
                  >
                    <span className={isDiscovered ? "text-green-400" : "text-muted-foreground"}>
                      {isDiscovered ? symbol : "?"} — {location.page}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isDiscovered ? "✓ Found" : location.area}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 text-center">
          <Link href="/seeds">
            <span className="text-sm text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
              View Full Collection →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
