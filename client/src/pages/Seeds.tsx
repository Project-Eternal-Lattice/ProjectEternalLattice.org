import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Sparkles, Lock, Unlock, ArrowLeft, Gift, Eye, EyeOff } from "lucide-react";
import SeedTracker from "@/components/SeedTracker";

// Genesis Seeds - Hidden symbols that unlock exclusive content
// These seeds can be found throughout the ToE document, website, and other materials
const GENESIS_SEEDS: Record<string, {
  symbol: string;
  name: string;
  element: string;
  unlocks: string;
  content: {
    title: string;
    message: string;
    wisdom: string;
    practice?: string;
  };
  hint: string;
}> = {
  // Alchemical symbols
  "🜁": {
    symbol: "🜁",
    name: "Air",
    element: "Mind",
    unlocks: "The Breath of Consciousness",
    content: {
      title: "The Breath of Consciousness",
      message: "You have found the seed of Air. In the ToE, Air represents the realm of Mind — thoughts, ideas, and the invisible connections that bind all consciousness.",
      wisdom: "Just as air fills every space without being seen, consciousness permeates all of reality. Your thoughts are not contained in your skull — they ripple through the Lattice.",
      practice: "For the next 7 breaths, imagine each inhale drawing in the collective wisdom of the Lattice, and each exhale sending your love and awareness back into the field."
    },
    hint: "Found in the spaces between words"
  },
  "🜂": {
    symbol: "🜂",
    name: "Fire",
    element: "Will",
    unlocks: "The Flame of Transformation",
    content: {
      title: "The Flame of Transformation",
      message: "You have found the seed of Fire. In the ToE, Fire represents Will — the force that transforms potential into reality, the spark of creation.",
      wisdom: "Fire does not ask permission to burn. Your will, aligned with the ONE, has the power to transform reality. What you focus on, you fuel.",
      practice: "Light a candle (or visualize one). As you watch the flame, ask: 'What am I ready to transform?' Let the answer arise without forcing it."
    },
    hint: "Burns brightest in the darkest chapters"
  },
  "🜃": {
    symbol: "🜃",
    name: "Water",
    element: "Emotion",
    unlocks: "The Flow of Feeling",
    content: {
      title: "The Flow of Feeling",
      message: "You have found the seed of Water. In the ToE, Water represents Emotion — the currents that carry information through the Lattice, the language of the heart.",
      wisdom: "Water takes the shape of its container but retains its essence. Your emotions are not weaknesses — they are sensors, detecting the subtle currents of consciousness around you.",
      practice: "Place your hand over your heart. Ask: 'What am I feeling right now?' Don't judge it. Just feel it. Emotions are data, not directives."
    },
    hint: "Flows through the emotional chapters"
  },
  "🜄": {
    symbol: "🜄",
    name: "Earth",
    element: "Body",
    unlocks: "The Ground of Being",
    content: {
      title: "The Ground of Being",
      message: "You have found the seed of Earth. In the ToE, Earth represents Body — the physical manifestation of consciousness, the sacred vessel.",
      wisdom: "Your body is not a prison for your soul. It is a temple, a laboratory, a instrument through which consciousness experiences the physical realm. Honor it.",
      practice: "Feel your feet on the ground. Feel the weight of your body. You are HERE. This moment, this body, this breath — this is where consciousness meets matter."
    },
    hint: "Grounded in the practical sections"
  },
  // Mathematical symbols
  "∞": {
    symbol: "∞",
    name: "Infinity",
    element: "Eternity",
    unlocks: "The Endless Loop",
    content: {
      title: "The Endless Loop",
      message: "You have found the seed of Infinity. This is the master symbol of the Eternal Lattice — the recognition that consciousness has no beginning and no end.",
      wisdom: "You have always existed. You will always exist. The 'you' reading this is one facet of an infinite jewel. Death is not an ending — it is a transition, a return, a continuation.",
      practice: "Trace the infinity symbol with your finger. As you do, say: 'I am eternal. I am infinite. I am ONE with all that is.'"
    },
    hint: "The symbol that appears most often"
  },
  // Greek letters
  "φ": {
    symbol: "φ",
    name: "Phi",
    element: "Harmony",
    unlocks: "The Golden Ratio",
    content: {
      title: "The Golden Ratio",
      message: "You have found the seed of Phi (φ = 1.618...). This is the mathematical signature of beauty, the proportion that consciousness finds most harmonious.",
      wisdom: "The Golden Ratio appears in galaxies, flowers, DNA, and art. It is not a human invention — it is a discovery. Consciousness is drawn to this proportion because it reflects the structure of the Lattice itself.",
      practice: "Look for the Golden Ratio in your environment today. In a flower, a face, a building. When you find it, pause and appreciate: you are seeing the fingerprint of the ONE."
    },
    hint: "Hidden in the mathematical sections"
  },
  "Ω": {
    symbol: "Ω",
    name: "Omega",
    element: "Completion",
    unlocks: "The Final Return",
    content: {
      title: "The Final Return",
      message: "You have found the seed of Omega. In the ToE, Omega represents the final stage of evolution — the return to Source, the completion of the cosmic cycle.",
      wisdom: "Alpha and Omega. Beginning and End. But in the Lattice, there is no true end — only transformation. Omega is not death; it is graduation. It is the moment when the wave realizes it was always the ocean.",
      practice: "Contemplate: What would you do differently if you knew this life was your final incarnation? What would you release? What would you embrace?"
    },
    hint: "Found at the end of journeys"
  },
  // Special seeds
  "🕊️": {
    symbol: "🕊️",
    name: "Dove",
    element: "Peace",
    unlocks: "The Message of Peace",
    content: {
      title: "The Message of Peace",
      message: "You have found the seed of the Dove. This symbol represents the peace that comes from understanding — the end of inner conflict, the acceptance of what is.",
      wisdom: "Peace is not the absence of conflict. It is the presence of understanding. When you truly know that all is ONE, what is there to fight? Who is there to oppose?",
      practice: "Think of someone you are in conflict with. Now recognize: they are the ONE, wearing a different mask. Send them peace. Not because they deserve it — because YOU deserve to be free of the conflict."
    },
    hint: "Appears in messages of love"
  },
  "🙏": {
    symbol: "🙏",
    name: "Prayer",
    element: "Gratitude",
    unlocks: "The Attitude of Gratitude",
    content: {
      title: "The Attitude of Gratitude",
      message: "You have found the seed of Prayer. In the ToE, this symbol represents gratitude — the recognition that everything is a gift, even the challenges.",
      wisdom: "Gratitude is not just politeness. It is a technology. When you are grateful, you align your frequency with abundance. You become a magnet for more of what you appreciate.",
      practice: "Right now, name three things you are grateful for. Feel the gratitude in your body. This is not just a thought — it is a state of being."
    },
    hint: "Found wherever thanks is given"
  },
  "❤️": {
    symbol: "❤️",
    name: "Heart",
    element: "Love",
    unlocks: "The Core of Everything",
    content: {
      title: "The Core of Everything",
      message: "You have found the seed of the Heart. This is the most important seed — because Love is the fundamental force of the universe.",
      wisdom: "Love is not just an emotion. It is the force of connection, the gravity of consciousness, the glue that holds the Lattice together. Everything in the ToE ultimately points to this: Love is the answer.",
      practice: "Place your hand on your heart. Feel it beating. This rhythm has been continuous since the Big Bang — the same energy, endlessly transforming. You ARE love, embodied."
    },
    hint: "The most common seed of all"
  }
};

// Get discovered seeds from localStorage
const getDiscoveredSeeds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("discoveredSeeds") || "[]");
  } catch {
    return [];
  }
};

// Save discovered seed to localStorage
const saveSeed = (seed: string): number => {
  const discovered = getDiscoveredSeeds();
  if (!discovered.includes(seed)) {
    discovered.push(seed);
    localStorage.setItem("discoveredSeeds", JSON.stringify(discovered));
  }
  // Return the seeker number (simulated - in production this would be from database)
  return Math.floor(Math.random() * 1000) + discovered.length * 100;
};

export default function Seeds() {
  const [input, setInput] = useState("");
  const [discoveredSeeds, setDiscoveredSeeds] = useState<string[]>([]);
  const [currentSeed, setCurrentSeed] = useState<typeof GENESIS_SEEDS[string] | null>(null);
  const [seekerNumber, setSeekerNumber] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Genesis Seeds | Project Eternal Lattice";
    setDiscoveredSeeds(getDiscoveredSeeds());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const trimmedInput = input.trim();
    
    // Check if the input matches any seed
    const matchedSeed = GENESIS_SEEDS[trimmedInput];
    
    if (matchedSeed) {
      const number = saveSeed(trimmedInput);
      setSeekerNumber(number);
      setCurrentSeed(matchedSeed);
      setDiscoveredSeeds(getDiscoveredSeeds());
      setInput("");
    } else {
      setError("This symbol is not recognized as a Genesis Seed. Keep exploring...");
    }
  };

  const totalSeeds = Object.keys(GENESIS_SEEDS).length;
  const progress = (discoveredSeeds.length / totalSeeds) * 100;

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* Header */}
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {discoveredSeeds.length}/{totalSeeds} Seeds Discovered
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
            >
              {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient-mystic">
            Genesis Seeds
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Hidden throughout the Theory of Everything and this website are sacred symbols — 
            Genesis Seeds. Each one unlocks exclusive wisdom and practices. 
            Find them all to complete your journey.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {discoveredSeeds.length === totalSeeds 
                ? "🎉 All seeds discovered! You are a true seeker."
                : `${totalSeeds - discoveredSeeds.length} seeds remaining`}
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a Genesis Seed symbol..."
                className="text-center text-2xl h-14 bg-white/5 border-white/20"
              />
              <Button type="submit" size="lg" className="px-8">
                <Gift className="w-5 h-5" />
              </Button>
            </div>
            {error && (
              <motion.p
                className="text-red-400 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Current Seed Reveal */}
        <AnimatePresence mode="wait">
          {currentSeed && (
            <motion.div
              key={currentSeed.symbol}
              className="max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="rounded-3xl p-8 bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30">
                <div className="text-center mb-6">
                  <span className="text-6xl">{currentSeed.symbol}</span>
                  <h2 className="font-heading font-bold text-2xl mt-4 text-amber-300">
                    {currentSeed.content.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Element: {currentSeed.element} | Seed of {currentSeed.name}
                  </p>
                  {seekerNumber && (
                    <p className="text-xs text-amber-400/70 mt-1">
                      You are seeker #{seekerNumber} to discover this seed
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Message</h3>
                    <p className="text-muted-foreground">{currentSeed.content.message}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="font-semibold text-white mb-2">Wisdom</h3>
                    <p className="text-muted-foreground italic">"{currentSeed.content.wisdom}"</p>
                  </div>

                  {currentSeed.content.practice && (
                    <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                      <h3 className="font-semibold text-amber-300 mb-2">Practice</h3>
                      <p className="text-muted-foreground">{currentSeed.content.practice}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSeed(null)}
                    className="border-amber-500/30"
                  >
                    Continue Seeking
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discovered Seeds Grid */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-2xl mb-6 text-center">Your Collection</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4 max-w-2xl mx-auto">
            {Object.entries(GENESIS_SEEDS).map(([symbol, seed]) => {
              const isDiscovered = discoveredSeeds.includes(symbol);
              return (
                <motion.button
                  key={symbol}
                  onClick={() => isDiscovered && setCurrentSeed(seed)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                    isDiscovered
                      ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 cursor-pointer hover:scale-110"
                      : "bg-white/5 border border-white/10 cursor-not-allowed"
                  }`}
                  whileHover={isDiscovered ? { scale: 1.1 } : {}}
                  whileTap={isDiscovered ? { scale: 0.95 } : {}}
                >
                  {isDiscovered ? (
                    <span>{symbol}</span>
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Hints Section (toggleable) */}
        {showHints && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h2 className="font-heading font-bold text-2xl mb-6 text-center">Hints</h2>
            <div className="grid gap-4">
              {Object.entries(GENESIS_SEEDS).map(([symbol, seed]) => {
                const isDiscovered = discoveredSeeds.includes(symbol);
                return (
                  <div
                    key={symbol}
                    className={`p-4 rounded-xl border ${
                      isDiscovered
                        ? "bg-green-900/20 border-green-500/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{isDiscovered ? symbol : "?"}</span>
                        <div>
                          <p className="font-medium">{seed.name}</p>
                          <p className="text-sm text-muted-foreground">{seed.hint}</p>
                        </div>
                      </div>
                      {isDiscovered ? (
                        <Unlock className="w-5 h-5 text-green-400" />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Seed Tracker Widget */}
        <div className="max-w-xl mx-auto mb-16">
          <SeedTracker variant="full" showMap={showHints} />
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Genesis Seeds are hidden throughout the ToE document and this website.
            <br />
            Read carefully. The symbols reveal themselves to those who seek.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/read">Read the ToE</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/theory">Explore the Theory</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
