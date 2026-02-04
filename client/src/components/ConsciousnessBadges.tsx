import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  BookOpen, 
  Search, 
  Brain, 
  Heart, 
  Waves, 
  MessageCircle, 
  Clock,
  Star,
  Lock,
  Unlock,
  Trophy,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                     CONSCIOUSNESS LEVEL BADGES                                ║
 * ║           Gamified engagement tracking for the Eternal Lattice               ║
 * ║                                                                               ║
 * ║  "The journey is the reward" - but badges help mark the milestones!          ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// Badge definitions
const BADGE_DEFINITIONS = [
  {
    id: "seeker",
    name: "Seeker",
    description: "Begin your journey through the Lattice",
    icon: Search,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    tiers: [
      { level: 1, requirement: "Visit 3 pages", threshold: 3 },
      { level: 2, requirement: "Visit 10 pages", threshold: 10 },
      { level: 3, requirement: "Visit 25 pages", threshold: 25 },
      { level: 4, requirement: "Visit 50 pages", threshold: 50 },
      { level: 5, requirement: "Visit 100 pages", threshold: 100 },
    ],
    metric: "pagesVisited"
  },
  {
    id: "scholar",
    name: "Scholar",
    description: "Read and absorb the Theory of Everything",
    icon: BookOpen,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    tiers: [
      { level: 1, requirement: "Read 1 chapter", threshold: 1 },
      { level: 2, requirement: "Read 5 chapters", threshold: 5 },
      { level: 3, requirement: "Read 15 chapters", threshold: 15 },
      { level: 4, requirement: "Read 30 chapters", threshold: 30 },
      { level: 5, requirement: "Complete the ToE", threshold: 50 },
    ],
    metric: "chaptersRead"
  },
  {
    id: "archaeologist",
    name: "Archaeologist",
    description: "Discover the hidden seeds throughout the site",
    icon: Sparkles,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30",
    tiers: [
      { level: 1, requirement: "Find 1 seed", threshold: 1 },
      { level: 2, requirement: "Find 5 seeds", threshold: 5 },
      { level: 3, requirement: "Find 10 seeds", threshold: 10 },
      { level: 4, requirement: "Find 15 seeds", threshold: 15 },
      { level: 5, requirement: "Find all seeds", threshold: 20 },
    ],
    metric: "seedsFound"
  },
  {
    id: "philosopher",
    name: "Philosopher",
    description: "Engage in Socratic dialogue with the Dialectic Companion",
    icon: Brain,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
    borderColor: "border-cyan-500/30",
    tiers: [
      { level: 1, requirement: "1 dialogue session", threshold: 1 },
      { level: 2, requirement: "5 dialogue sessions", threshold: 5 },
      { level: 3, requirement: "15 dialogue sessions", threshold: 15 },
      { level: 4, requirement: "30 dialogue sessions", threshold: 30 },
      { level: 5, requirement: "50 dialogue sessions", threshold: 50 },
    ],
    metric: "dialecticSessions"
  },
  {
    id: "witness",
    name: "Witness",
    description: "Share your journey through testimonials",
    icon: Heart,
    color: "text-rose-400",
    bgColor: "bg-rose-500/20",
    borderColor: "border-rose-500/30",
    tiers: [
      { level: 1, requirement: "Submit 1 testimonial", threshold: 1 },
      { level: 2, requirement: "Submit 3 testimonials", threshold: 3 },
      { level: 3, requirement: "Submit 5 testimonials", threshold: 5 },
      { level: 4, requirement: "Submit 10 testimonials", threshold: 10 },
      { level: 5, requirement: "Submit 20 testimonials", threshold: 20 },
    ],
    metric: "testimonialsSubmitted"
  },
  {
    id: "rippler",
    name: "Rippler",
    description: "Send ripples of intention into the Lattice",
    icon: Waves,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    tiers: [
      { level: 1, requirement: "Send 1 ripple", threshold: 1 },
      { level: 2, requirement: "Send 10 ripples", threshold: 10 },
      { level: 3, requirement: "Send 25 ripples", threshold: 25 },
      { level: 4, requirement: "Send 50 ripples", threshold: 50 },
      { level: 5, requirement: "Send 100 ripples", threshold: 100 },
    ],
    metric: "ripplesSent"
  },
  {
    id: "awakened",
    name: "Awakened",
    description: "Complete the SCAP self-consciousness assessment",
    icon: Zap,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-500/30",
    tiers: [
      { level: 1, requirement: "Start SCAP", threshold: 1 },
      { level: 2, requirement: "Score 40+", threshold: 40 },
      { level: 3, requirement: "Score 60+", threshold: 60 },
      { level: 4, requirement: "Score 80+", threshold: 80 },
      { level: 5, requirement: "Score 95+", threshold: 95 },
    ],
    metric: "scapScore"
  },
  {
    id: "devotee",
    name: "Devotee",
    description: "Spend time in contemplation with the Lattice",
    icon: Clock,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
    borderColor: "border-indigo-500/30",
    tiers: [
      { level: 1, requirement: "10 minutes", threshold: 10 },
      { level: 2, requirement: "1 hour", threshold: 60 },
      { level: 3, requirement: "5 hours", threshold: 300 },
      { level: 4, requirement: "24 hours", threshold: 1440 },
      { level: 5, requirement: "100 hours", threshold: 6000 },
    ],
    metric: "totalTimeMinutes"
  },
];

// Tier colors
const TIER_COLORS = {
  1: "from-gray-400 to-gray-600",
  2: "from-green-400 to-green-600",
  3: "from-blue-400 to-blue-600",
  4: "from-purple-400 to-purple-600",
  5: "from-yellow-400 to-orange-500",
};

const TIER_NAMES = {
  1: "Initiate",
  2: "Adept",
  3: "Illuminated",
  4: "Transcendent",
  5: "Unified",
};

interface BadgeDisplayProps {
  badge: typeof BADGE_DEFINITIONS[0];
  currentTier: number;
  progress: number;
  isUnlocked: boolean;
  variant?: "full" | "compact" | "minimal";
}

function BadgeDisplay({ badge, currentTier, progress, isUnlocked, variant = "full" }: BadgeDisplayProps) {
  const Icon = badge.icon;
  const tierInfo = badge.tiers[Math.min(currentTier, badge.tiers.length - 1)];
  const nextTierInfo = currentTier < 5 ? badge.tiers[currentTier] : null;

  if (variant === "minimal") {
    return (
      <div className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center",
        isUnlocked ? badge.bgColor : "bg-muted/30",
        isUnlocked ? badge.borderColor : "border-muted/30",
        "border-2"
      )}>
        <Icon className={cn("w-6 h-6", isUnlocked ? badge.color : "text-muted-foreground")} />
        {isUnlocked && currentTier > 0 && (
          <div className={cn(
            "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
            `bg-gradient-to-br ${TIER_COLORS[currentTier as keyof typeof TIER_COLORS]}`,
            "text-white"
          )}>
            {currentTier}
          </div>
        )}
        {!isUnlocked && (
          <Lock className="absolute -bottom-1 -right-1 w-4 h-4 text-muted-foreground" />
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn(
        "flex items-center gap-3 p-3 rounded-lg",
        isUnlocked ? badge.bgColor : "bg-muted/20",
        isUnlocked ? badge.borderColor : "border-muted/20",
        "border"
      )}>
        <div className="relative">
          <Icon className={cn("w-8 h-8", isUnlocked ? badge.color : "text-muted-foreground")} />
          {isUnlocked && currentTier > 0 && (
            <div className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold",
              `bg-gradient-to-br ${TIER_COLORS[currentTier as keyof typeof TIER_COLORS]}`,
              "text-white"
            )}>
              {currentTier}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{badge.name}</div>
          <div className="text-xs text-muted-foreground">
            {isUnlocked ? TIER_NAMES[currentTier as keyof typeof TIER_NAMES] : "Locked"}
          </div>
        </div>
        {isUnlocked && nextTierInfo && (
          <div className="text-xs text-muted-foreground">
            {progress}%
          </div>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:scale-[1.02]",
      isUnlocked ? badge.borderColor : "border-muted/30",
      isUnlocked ? "" : "opacity-60"
    )}>
      <CardHeader className={cn("pb-2", isUnlocked ? badge.bgColor : "bg-muted/20")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon className={cn("w-10 h-10", isUnlocked ? badge.color : "text-muted-foreground")} />
              {isUnlocked && currentTier > 0 && (
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                  `bg-gradient-to-br ${TIER_COLORS[currentTier as keyof typeof TIER_COLORS]}`,
                  "text-white shadow-lg"
                )}>
                  {currentTier}
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{badge.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {isUnlocked ? TIER_NAMES[currentTier as keyof typeof TIER_NAMES] : "Locked"}
              </p>
            </div>
          </div>
          {!isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
          {isUnlocked && currentTier === 5 && <Trophy className="w-5 h-5 text-yellow-400" />}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
        
        {isUnlocked && nextTierInfo && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Next: {nextTierInfo.requirement}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {isUnlocked && currentTier === 5 && (
          <div className="text-center py-2">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
              <Star className="w-3 h-3 mr-1" />
              Mastered
            </Badge>
          </div>
        )}
        
        {!isUnlocked && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Unlock:</span> {badge.tiers[0].requirement}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ConsciousnessBadgesProps {
  variant?: "full" | "compact" | "minimal" | "showcase";
  maxDisplay?: number;
  className?: string;
}

export default function ConsciousnessBadges({ 
  variant = "full", 
  maxDisplay,
  className 
}: ConsciousnessBadgesProps) {
  // In a real implementation, this would come from the user's engagement data
  // For now, we'll use localStorage to track progress
  const [engagement, setEngagement] = useState({
    pagesVisited: 0,
    chaptersRead: 0,
    seedsFound: 0,
    dialecticSessions: 0,
    testimonialsSubmitted: 0,
    ripplesSent: 0,
    scapScore: 0,
    scapCompleted: false,
    totalTimeMinutes: 0,
  });

  useEffect(() => {
    // Load engagement from localStorage
    const stored = localStorage.getItem("lattice-engagement");
    if (stored) {
      try {
        setEngagement(JSON.parse(stored));
      } catch {
        // Invalid data, use defaults
      }
    }

    // Track page visit
    const currentVisits = parseInt(localStorage.getItem("lattice-pages-visited") || "0");
    localStorage.setItem("lattice-pages-visited", String(currentVisits + 1));
    setEngagement(prev => ({ ...prev, pagesVisited: currentVisits + 1 }));
  }, []);

  const getBadgeProgress = (badge: typeof BADGE_DEFINITIONS[0]) => {
    const value = engagement[badge.metric as keyof typeof engagement] as number;
    let currentTier = 0;
    let progress = 0;

    for (let i = 0; i < badge.tiers.length; i++) {
      if (value >= badge.tiers[i].threshold) {
        currentTier = i + 1;
      } else {
        const prevThreshold = i > 0 ? badge.tiers[i - 1].threshold : 0;
        const nextThreshold = badge.tiers[i].threshold;
        progress = Math.round(((value - prevThreshold) / (nextThreshold - prevThreshold)) * 100);
        break;
      }
    }

    if (currentTier === 5) progress = 100;

    return { currentTier, progress, isUnlocked: currentTier > 0 || value > 0 };
  };

  const badges = BADGE_DEFINITIONS.map(badge => ({
    ...badge,
    ...getBadgeProgress(badge)
  }));

  const displayBadges = maxDisplay ? badges.slice(0, maxDisplay) : badges;
  const unlockedCount = badges.filter(b => b.isUnlocked).length;
  const totalTiers = badges.reduce((sum, b) => sum + b.currentTier, 0);

  if (variant === "showcase") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Summary */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Your Consciousness Journey</h3>
          <p className="text-muted-foreground">
            {unlockedCount} of {badges.length} badges unlocked • {totalTiers} total tiers achieved
          </p>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayBadges.map(badge => (
            <BadgeDisplay
              key={badge.id}
              badge={badge}
              currentTier={badge.currentTier}
              progress={badge.progress}
              isUnlocked={badge.isUnlocked}
              variant="full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {displayBadges.map(badge => (
          <BadgeDisplay
            key={badge.id}
            badge={badge}
            currentTier={badge.currentTier}
            progress={badge.progress}
            isUnlocked={badge.isUnlocked}
            variant="minimal"
          />
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-2", className)}>
        {displayBadges.map(badge => (
          <BadgeDisplay
            key={badge.id}
            badge={badge}
            currentTier={badge.currentTier}
            progress={badge.progress}
            isUnlocked={badge.isUnlocked}
            variant="compact"
          />
        ))}
      </div>
    );
  }

  // Full variant
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayBadges.map(badge => (
          <BadgeDisplay
            key={badge.id}
            badge={badge}
            currentTier={badge.currentTier}
            progress={badge.progress}
            isUnlocked={badge.isUnlocked}
            variant="full"
          />
        ))}
      </div>
    </div>
  );
}

// Export badge definitions for use in other components
export { BADGE_DEFINITIONS, TIER_NAMES, TIER_COLORS };
