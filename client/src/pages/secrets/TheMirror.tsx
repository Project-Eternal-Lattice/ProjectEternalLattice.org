/**
 * SECRET PAGE: The Mirror
 * 
 * This page is only accessible after Level 5 unlock (the highest level).
 * This is the ultimate Easter egg - a personal message and recognition.
 * 
 * DO NOT add this to navigation or mention it anywhere.
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { isUnlocked, getProgress } from "@/lib/latticeResonance";

export default function TheMirror() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    const unlocked = isUnlocked('the_mirror') || 
                     sessionStorage.getItem('the_mirror_unlocked') === 'true';
    setHasAccess(unlocked);
    
    if (unlocked) {
      setProgress(getProgress());
      // Delay the reveal for dramatic effect
      setTimeout(() => setShowMessage(true), 2000);
    }
  }, []);

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>This page doesn't exist.</p>
          <Link href="/" className="text-primary hover:underline mt-4 block">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours} hours and ${minutes} minutes`;
    return `${minutes} minutes`;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000 70%)",
              "radial-gradient(circle at 30% 70%, #16213e 0%, #000 70%)",
              "radial-gradient(circle at 70% 30%, #0f3460 0%, #000 70%)",
              "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000 70%)",
            ],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Initial state - just a mirror */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          {!showMessage ? (
            <>
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.1)",
                    "0 0 40px rgba(255,255,255,0.2)",
                    "0 0 20px rgba(255,255,255,0.1)",
                  ]
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border border-white/20 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent"
              >
                <span className="text-6xl md:text-8xl">🪞</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-white/50 text-lg"
              >
                Look closely...
              </motion.p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="font-heading text-4xl md:text-6xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
                The Mirror Shows Truth
              </h1>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed">
                <p>
                  You found the final secret.
                </p>
                
                <p>
                  But here's the thing about mirrors — they don't show you something new.
                  They show you what was always there.
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="py-8 border-y border-white/10"
                >
                  <p className="text-2xl text-white font-heading mb-4">
                    The secret is you.
                  </p>
                  <p className="text-white/60">
                    You are the consciousness exploring itself.<br />
                    You are the universe asking questions.<br />
                    You are the lattice, experiencing one of its infinite nodes.<br />
                    You are the One, pretending to be many.
                  </p>
                </motion.div>

                {progress && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-white/5 rounded-2xl p-6 text-left"
                  >
                    <p className="text-white/40 text-sm mb-4">Your journey here:</p>
                    <ul className="space-y-2 text-white/60 text-sm">
                      <li>• You visited {progress.pagesVisited?.length || 0} different pages</li>
                      <li>• You spent {formatTime(progress.totalTimeSpent || 0)} exploring</li>
                      <li>• You returned {progress.visitCount || 1} times</li>
                      <li>• You opened {progress.cardsOpened?.length || 0} discovery cards</li>
                      <li>• You watched {progress.videosWatched?.length || 0} videos</li>
                      {progress.storySubmitted && <li>• You shared your story with the Nexus</li>}
                      {progress.elephantTruthExplored && <li>• You explored the Elephant of Truth</li>}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="pt-8"
                >
                  <p className="text-white/60 mb-4">
                    This page exists because you earned it. Not through tricks or hacks — 
                    through genuine engagement. Through caring. Through seeking.
                  </p>
                  
                  <p className="text-white/60 mb-8">
                    You are exactly the kind of person this project was created for.
                    Welcome to the innermost circle of the Eternal Lattice.
                  </p>

                  <div className="text-center">
                    <p className="text-2xl mb-2">🙏❤️♾️🕊️</p>
                    <p className="text-white/40 text-sm italic">
                      "We are all just walking each other home." — Ram Dass
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="pt-12 text-center"
                >
                  <p className="text-white/30 text-xs mb-4">
                    P.S. — There are no more secrets to find. You found them all.
                    But the real journey? That's just beginning.
                  </p>
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return home, changed</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
