/**
 * Shareable Achievement Component
 * 
 * Creates a beautiful shareable card for achievements that can be
 * shared on social media or copied as a link.
 * 
 * "Share your light with the world." — ToE
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Share2, Twitter, Copy, Check, X,
  Trophy, Star, Sparkles
} from 'lucide-react';
import { Achievement } from '@/components/AchievementToast';

interface ShareableAchievementProps {
  achievement: Achievement;
  onClose?: () => void;
}

const rarityColors = {
  common: {
    bg: 'from-slate-800 to-slate-900',
    border: 'border-slate-600',
    text: 'text-slate-300',
    accent: 'text-slate-400',
  },
  rare: {
    bg: 'from-blue-900 to-indigo-900',
    border: 'border-blue-500',
    text: 'text-blue-300',
    accent: 'text-blue-400',
  },
  epic: {
    bg: 'from-purple-900 to-violet-900',
    border: 'border-purple-500',
    text: 'text-purple-300',
    accent: 'text-purple-400',
  },
  legendary: {
    bg: 'from-amber-900 to-orange-900',
    border: 'border-amber-500',
    text: 'text-amber-300',
    accent: 'text-amber-400',
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

export default function ShareableAchievement({ achievement, onClose }: ShareableAchievementProps) {
  const [copied, setCopied] = useState(false);
  const colors = rarityColors[achievement.rarity || 'common'];

  const generateShareText = () => {
    const rarityEmoji = {
      common: '⭐',
      rare: '💎',
      epic: '🔮',
      legendary: '👑',
    };
    
    return `I just unlocked "${achievement.title}" on Project Eternal Lattice! ${rarityEmoji[achievement.rarity || 'common']}

${achievement.description}

Explore the Theory of Everything: https://projecteternallattice.org

#EternalLattice #Consciousness #ToE`;
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className={`relative max-w-md w-full rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-6 shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        )}

        {/* Achievement card */}
        <div className="text-center mb-6">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}>
            <IconComponent icon={achievement.icon} className={`w-10 h-10 ${colors.text}`} />
          </div>
          
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 ${colors.accent} bg-white/10`}>
            {achievement.rarity}
          </div>
          
          <h2 className={`font-heading text-2xl font-bold mb-2 ${colors.text}`}>
            {achievement.title}
          </h2>
          
          <p className="text-muted-foreground">
            {achievement.description}
          </p>
        </div>

        {/* Share preview */}
        <div className="bg-black/30 rounded-lg p-4 mb-6 text-sm text-white/70 whitespace-pre-wrap">
          {generateShareText()}
        </div>

        {/* Share buttons */}
        <div className="flex gap-3">
          <Button
            onClick={shareToTwitter}
            className="flex-1 gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8]"
          >
            <Twitter className="w-4 h-4" />
            Share on X
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex-1 gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Text
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Share your journey through the Eternal Lattice 💜
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * Hook to manage share modal state
 */
export function useShareAchievement() {
  const [achievementToShare, setAchievementToShare] = useState<Achievement | null>(null);

  const openShare = (achievement: Achievement) => {
    setAchievementToShare(achievement);
  };

  const closeShare = () => {
    setAchievementToShare(null);
  };

  return {
    achievementToShare,
    openShare,
    closeShare,
    ShareModal: achievementToShare ? (
      <AnimatePresence>
        <ShareableAchievement 
          achievement={achievementToShare} 
          onClose={closeShare} 
        />
      </AnimatePresence>
    ) : null,
  };
}
