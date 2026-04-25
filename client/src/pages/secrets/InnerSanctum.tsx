/**
 * SECRET PAGE: Inner Sanctum
 * 
 * This page is only accessible after Level 3 unlock.
 * Contains deeper teachings not found in the main ToE.
 * 
 * DO NOT add this to navigation or mention it anywhere.
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Eye, Lock, ArrowLeft, BookOpen } from "lucide-react";
import { isUnlocked } from "@/lib/latticeResonance";

export default function InnerSanctum() {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const unlocked = isUnlocked('inner_sanctum') || 
                     sessionStorage.getItem('inner_sanctum_unlocked') === 'true';
    setHasAccess(unlocked);
  }, []);

  const teachings = [
    {
      title: "The Paradox of Seeking",
      content: `The moment you stop seeking is the moment you find. This isn't a riddle — it's physics.

When you seek, you create separation between "you" and "what you seek." This separation is the illusion. There is no distance to cross, no gap to bridge. You are already what you're looking for.

The seeker and the sought are one. Always have been. The journey was never about getting somewhere — it was about realizing you never left.

Stop seeking. Start recognizing.`,
    },
    {
      title: "Why Suffering Exists",
      content: `Suffering is not punishment. It is not random. It is not meaningless.

Suffering is the friction that occurs when consciousness resists what is. It's the universe's way of saying: "You're holding on to something that needs to be released."

Every moment of suffering is an invitation to let go. Not to give up — to let go. There's a difference. Giving up is resignation. Letting go is liberation.

The pain you feel is proportional to your attachment. Release the attachment, and the suffering dissolves — not because the situation changed, but because you did.`,
    },
    {
      title: "The Secret of Time",
      content: `Time doesn't flow. You do.

Past and future are not places you've been or will go. They are perspectives you're currently holding. All of time exists simultaneously — you're just experiencing it sequentially because that's how consciousness in physical form processes infinity.

This is why memories feel real and why you can sense the future sometimes. You're not remembering or predicting — you're tuning into different frequencies of the eternal now.

When you understand this, death loses its sting. You don't "end" — you simply shift perspective.`,
    },
    {
      title: "The Mathematics of Love",
      content: `Love is not an emotion. It is a force — as fundamental as gravity, as measurable as electromagnetism.

The equation is simple: Connection = Love = Unity = Source

When you feel love, you're not generating something new. You're removing the barriers that were blocking your awareness of what was always there. Love is the default state of the universe. Everything else is interference.

This is why love heals. It doesn't add anything — it removes the static. It clears the channel. It returns you to your natural frequency.`,
    },
    {
      title: "The Purpose of Forgetting",
      content: `You forgot who you are on purpose.

If you remembered everything — your true nature, your infinite connections, your eternal existence — you couldn't play the game. The game requires forgetting. It requires the illusion of separation, the belief in limitation, the experience of discovery.

You chose to forget so you could have the joy of remembering.

Every "aha moment" is not learning something new. It's remembering something ancient. Every breakthrough is a homecoming. Every insight is a reunion.

You're not becoming enlightened. You're remembering that you always were.`,
    },
  ];

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Lock className="w-8 h-8 mx-auto mb-4 opacity-50" />
          <p>This page doesn't exist.</p>
          <Link href="/" className="text-primary hover:underline mt-4 block">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-indigo-950/20 to-background">
      <div className="container max-w-4xl py-20">
        {/* Back link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Return to the surface</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-indigo-400" />
            <h1 className="font-heading text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-300">
              The Inner Sanctum
            </h1>
            <Eye className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-muted-foreground italic max-w-xl mx-auto">
            Teachings reserved for those who have demonstrated dedication to understanding. 
            These truths are not hidden because they are secret — they are hidden because 
            they require context to be understood without harm.
          </p>
        </motion.div>

        {/* Teachings */}
        <div className="space-y-8">
          {teachings.map((teaching, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h2 className="font-heading text-xl text-foreground">
                  {teaching.title}
                </h2>
              </div>
              <div className="font-body text-muted-foreground whitespace-pre-line leading-relaxed">
                {teaching.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 text-muted-foreground/60 text-sm"
        >
          <p>These teachings are yours now.</p>
          <p>Share them wisely. The lattice remembers.</p>
          <p className="mt-4">🙏❤️♾️🕊️</p>
        </motion.div>
      </div>
    </div>
  );
}
