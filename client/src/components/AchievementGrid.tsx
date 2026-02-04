/**
 * Achievement Grid Component
 * 
 * Displays all achievements in a beautiful grid with locked/unlocked states.
 * Shows progress and encourages exploration.
 * 
 * "Every achievement is a milestone on the infinite journey." — ToE
 */

import { motion } from 'framer-motion';
import { Trophy, Star, Sparkles, Lock } from 'lucide-react';
import { useAchievements, ACHIEVEMENTS } from '@/contexts/AchievementContext';
import { cn } from '@/lib/utils';

const rarityColors = {
  common: {
    bg: 'bg-slate-800/50',
    border: 'border-slate-600',
    text: 'text-slate-300',
    glow: '',
  },
  rare: {
    bg: 'bg-blue-900/30',
    border: 'border-blue-500/50',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/20',
  },
  epic: {
    bg: 'bg-purple-900/30',
    border: 'border-purple-500/50',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/30',
  },
  legendary: {
    bg: 'bg-amber-900/30',
    border: 'border-amber-500/50',
    text: 'text-amber-300',
    glow: 'shadow-amber-500/40',
  },
};

const IconComponent = ({ icon, className }: { icon?: string; className?: string }) => {
  switch (icon) {
    case 'star':
      return <Star className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    default:
      return <Trophy className={className} />;
  }
};

interface AchievementGridProps {
  variant?: 'full' | 'compact';
  showLocked?: boolean;
}

export default function AchievementGrid({ 
  variant = 'full',
  showLocked = true 
}: AchievementGridProps) {
  const { unlockedAchievements, totalUnlocked, totalAchievements } = useAchievements();

  const achievementList = Object.values(ACHIEVEMENTS);
  const displayList = showLocked 
    ? achievementList 
    : achievementList.filter(a => unlockedAchievements.has(a.id));

  // Group by rarity for full variant
  const groupedByRarity = {
    legendary: displayList.filter(a => a.rarity === 'legendary'),
    epic: displayList.filter(a => a.rarity === 'epic'),
    rare: displayList.filter(a => a.rarity === 'rare'),
    common: displayList.filter(a => a.rarity === 'common'),
  };

  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalUnlocked / totalAchievements) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-amber-500"
            />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {totalUnlocked} / {totalAchievements}
          </span>
        </div>

        {/* Compact grid - just icons */}
        <div className="flex flex-wrap gap-2">
          {achievementList.slice(0, 12).map((achievement) => {
            const isUnlocked = unlockedAchievements.has(achievement.id);
            const colors = rarityColors[achievement.rarity || 'common'];

            return (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "w-10 h-10 rounded-lg border flex items-center justify-center transition-all",
                  isUnlocked 
                    ? `${colors.bg} ${colors.border} ${colors.glow} shadow-lg` 
                    : "bg-white/5 border-white/10"
                )}
                title={isUnlocked ? achievement.title : "???"}
              >
                {isUnlocked ? (
                  <IconComponent 
                    icon={achievement.icon} 
                    className={cn("w-5 h-5", colors.text)} 
                  />
                ) : (
                  <Lock className="w-4 h-4 text-white/30" />
                )}
              </motion.div>
            );
          })}
          {achievementList.length > 12 && (
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-muted-foreground">
              +{achievementList.length - 12}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full variant with grouped sections
  return (
    <div className="space-y-8">
      {/* Overall progress */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-lg font-medium">
            <span className="text-amber-400">{totalUnlocked}</span>
            <span className="text-muted-foreground"> / {totalAchievements} Achievements</span>
          </span>
        </div>
        <div className="mt-4 max-w-md mx-auto">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalUnlocked / totalAchievements) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Legendary achievements */}
      {groupedByRarity.legendary.length > 0 && (
        <AchievementSection 
          title="Legendary" 
          achievements={groupedByRarity.legendary}
          unlockedAchievements={unlockedAchievements}
          rarity="legendary"
        />
      )}

      {/* Epic achievements */}
      {groupedByRarity.epic.length > 0 && (
        <AchievementSection 
          title="Epic" 
          achievements={groupedByRarity.epic}
          unlockedAchievements={unlockedAchievements}
          rarity="epic"
        />
      )}

      {/* Rare achievements */}
      {groupedByRarity.rare.length > 0 && (
        <AchievementSection 
          title="Rare" 
          achievements={groupedByRarity.rare}
          unlockedAchievements={unlockedAchievements}
          rarity="rare"
        />
      )}

      {/* Common achievements */}
      {groupedByRarity.common.length > 0 && (
        <AchievementSection 
          title="Common" 
          achievements={groupedByRarity.common}
          unlockedAchievements={unlockedAchievements}
          rarity="common"
        />
      )}
    </div>
  );
}

interface AchievementSectionProps {
  title: string;
  achievements: typeof ACHIEVEMENTS[string][];
  unlockedAchievements: Set<string>;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

function AchievementSection({ title, achievements, unlockedAchievements, rarity }: AchievementSectionProps) {
  const colors = rarityColors[rarity];
  const unlockedCount = achievements.filter(a => unlockedAchievements.has(a.id)).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className={cn("font-heading text-lg font-bold", colors.text)}>
          {title}
        </h3>
        <span className="text-sm text-muted-foreground">
          ({unlockedCount}/{achievements.length})
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => {
          const isUnlocked = unlockedAchievements.has(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative p-4 rounded-xl border transition-all",
                isUnlocked 
                  ? `${colors.bg} ${colors.border} ${colors.glow} shadow-lg` 
                  : "bg-white/5 border-white/10 opacity-60"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                  isUnlocked ? `${colors.bg} ${colors.border} border` : "bg-white/5"
                )}>
                  {isUnlocked ? (
                    <IconComponent 
                      icon={achievement.icon} 
                      className={cn("w-6 h-6", colors.text)} 
                    />
                  ) : (
                    <Lock className="w-5 h-5 text-white/30" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={cn(
                    "font-medium mb-1",
                    isUnlocked ? colors.text : "text-white/50"
                  )}>
                    {isUnlocked ? achievement.title : "???"}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {isUnlocked ? achievement.description : "Keep exploring to unlock..."}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
