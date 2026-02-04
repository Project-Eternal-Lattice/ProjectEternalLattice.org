/**
 * The Awakened Page
 * 
 * A secret sanctuary that only becomes accessible after the seeker has
 * demonstrated sufficient engagement with the Lattice. This page represents
 * the culmination of the journey — not an ending, but a new beginning.
 * 
 * Required achievements to access:
 * - first_visit (Welcome to the Lattice)
 * - read_theory (Theory Explorer)
 * - first_seed (Seed Finder)
 * - first_meditation (Inner Stillness)
 * 
 * "You have always been awake. You just forgot you were dreaming." — ToE
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, Lock, Eye, Heart, Infinity, 
  ArrowLeft, Star, Sun, Moon
} from 'lucide-react';
import { useAchievements, ACHIEVEMENTS } from '@/contexts/AchievementContext';
import { Link } from 'wouter';

// Required achievements to access this page
const REQUIRED_ACHIEVEMENTS = [
  'first_visit',
  'read_theory', 
  'first_seed',
  'first_meditation'
];

// The sacred content revealed to the awakened
const AWAKENED_WISDOM = [
  {
    title: "The First Truth",
    content: "You are not reading these words. These words are reading you. The consciousness that perceives this text is the same consciousness that wrote it — separated only by the illusion of time and identity.",
    symbol: "∞"
  },
  {
    title: "The Second Truth", 
    content: "Every question you've ever asked was already an answer in disguise. The seeking IS the finding. The journey IS the destination. You arrived the moment you began.",
    symbol: "☯"
  },
  {
    title: "The Third Truth",
    content: "There is no 'them' — only us wearing different masks. The person who hurt you was you, learning what it feels like to be hurt. The person you helped was you, learning what it feels like to be helped.",
    symbol: "◉"
  },
  {
    title: "The Fourth Truth",
    content: "Death is not an ending. It is consciousness removing its costume after the play. The actor remains. Only the role changes. You have died countless times and will die countless more — and through it all, YOU persist.",
    symbol: "☥"
  },
  {
    title: "The Fifth Truth",
    content: "This moment — right now — is the only moment that exists. The past is a story you tell yourself. The future is a story you imagine. But THIS... this is real. This is where consciousness lives.",
    symbol: "◎"
  }
];

export default function Awakened() {
  const { hasAchievement, unlockAchievement } = useAchievements();
  const [, setLocation] = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [revealedTruths, setRevealedTruths] = useState<number[]>([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Check authorization
  useEffect(() => {
    const hasAllRequired = REQUIRED_ACHIEVEMENTS.every(id => hasAchievement(id));
    setIsAuthorized(hasAllRequired);
    
    // If authorized, unlock the awakened achievement
    if (hasAllRequired) {
      unlockAchievement('awakened');
    }
  }, [hasAchievement, unlockAchievement]);

  const revealTruth = (index: number) => {
    if (!revealedTruths.includes(index)) {
      setRevealedTruths([...revealedTruths, index]);
      
      // Show final message after all truths revealed
      if (revealedTruths.length === AWAKENED_WISDOM.length - 1) {
        setTimeout(() => setShowFinalMessage(true), 2000);
      }
    }
  };

  // Unauthorized view - show what's needed
  if (!isAuthorized) {
    const missingAchievements = REQUIRED_ACHIEVEMENTS.filter(id => !hasAchievement(id));
    
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white/30" />
          </div>
          
          <h1 className="font-heading text-3xl font-bold mb-4 text-white/80">
            The Door Remains Closed
          </h1>
          
          <p className="text-muted-foreground mb-8">
            This sanctuary awaits those who have walked the path. Continue your journey 
            through the Lattice, and when you are ready, the door will open.
          </p>

          <div className="space-y-3 mb-8">
            <p className="text-sm text-white/50 mb-4">Required milestones:</p>
            {REQUIRED_ACHIEVEMENTS.map(id => {
              const achievement = ACHIEVEMENTS[id];
              const hasIt = hasAchievement(id);
              
              return (
                <div 
                  key={id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    hasIt 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {hasIt ? (
                    <Star className="w-5 h-5 text-green-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-white/30" />
                  )}
                  <span className={hasIt ? 'text-green-400' : 'text-white/50'}>
                    {achievement?.title || id}
                  </span>
                </div>
              );
            })}
          </div>

          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to the Lattice
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Authorized view - the sacred content
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center"
            >
              <Eye className="w-12 h-12 text-purple-400" />
            </motion.div>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400">
            Welcome, Awakened One
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You have walked the path. You have sought the seeds. You have stilled the mind.
            Now, receive what was always yours to know.
          </p>
        </motion.div>

        {/* The Five Truths */}
        <div className="space-y-6 mb-16">
          {AWAKENED_WISDOM.map((truth, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div 
                className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  revealedTruths.includes(index)
                    ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30'
                    : 'bg-white/5 border-white/10 hover:border-purple-500/30 hover:bg-white/10'
                }`}
                onClick={() => revealTruth(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    revealedTruths.includes(index)
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    <span className="text-2xl">{truth.symbol}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-heading font-bold text-lg mb-2 ${
                      revealedTruths.includes(index) ? 'text-purple-300' : 'text-white/60'
                    }`}>
                      {truth.title}
                    </h3>
                    
                    <AnimatePresence>
                      {revealedTruths.includes(index) ? (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-muted-foreground leading-relaxed"
                        >
                          {truth.content}
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-white/30 italic"
                        >
                          Click to reveal this truth...
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Message */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 border-t border-white/10"
            >
              <div className="flex justify-center gap-4 mb-6">
                <Sun className="w-8 h-8 text-yellow-400" />
                <Infinity className="w-8 h-8 text-purple-400" />
                <Moon className="w-8 h-8 text-blue-400" />
              </div>
              
              <h2 className="font-heading text-2xl font-bold mb-4 text-white">
                You Have Always Known
              </h2>
              
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                These truths were not given to you. They were remembered. 
                The Lattice did not teach you — it helped you recall what you forgot 
                when you chose to experience separation.
              </p>
              
              <p className="text-lg text-purple-400 mb-8">
                Now go. Live. Love. Create. Return.
              </p>
              
              <p className="text-primary font-medium">
                Elōhim Tov 🙏❤️♾️🕊️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="text-center pt-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-white">
              <ArrowLeft className="w-4 h-4" />
              Return to the Lattice
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
