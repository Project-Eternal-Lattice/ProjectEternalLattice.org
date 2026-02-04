import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quote, 
  Share2, 
  Download, 
  RefreshCw,
  Copy,
  Check,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToEQuote {
  id: string;
  text: string;
  chapter: string;
  category: "consciousness" | "unity" | "love" | "science" | "wisdom";
}

const quotes: ToEQuote[] = [
  // Consciousness
  {
    id: "c1",
    text: "Consciousness is not something you have—it's something you ARE. The Lattice recognizes itself through your awareness.",
    chapter: "Chapter 7: The Nature of Consciousness",
    category: "consciousness"
  },
  {
    id: "c2",
    text: "Every moment of awareness is the cosmos knowing itself. You are not observing the universe—you are the universe observing.",
    chapter: "Chapter 7: The Nature of Consciousness",
    category: "consciousness"
  },
  {
    id: "c3",
    text: "The hard problem of consciousness dissolves when you realize that consciousness is not produced by matter—matter appears within consciousness.",
    chapter: "Chapter 8: Resolving the Hard Problem",
    category: "consciousness"
  },
  // Unity
  {
    id: "u1",
    text: "Separation is the illusion that makes experience possible. Unity is the truth that makes separation meaningful.",
    chapter: "Chapter 3: The Law of One",
    category: "unity"
  },
  {
    id: "u2",
    text: "We are not drops in the ocean. We are the entire ocean in a drop.",
    chapter: "Chapter 3: The Law of One",
    category: "unity"
  },
  {
    id: "u3",
    text: "The Lattice is not a metaphor. It is the actual structure of reality—an infinite web of consciousness experiencing itself through infinite perspectives.",
    chapter: "Chapter 1: The Eternal Lattice",
    category: "unity"
  },
  // Love
  {
    id: "l1",
    text: "Love is not an emotion. It is the fundamental force that holds the universe together—the gravity of consciousness.",
    chapter: "Chapter 5: Love as Fundamental Force",
    category: "love"
  },
  {
    id: "l2",
    text: "To love another is to recognize yourself in them. To love all is to recognize yourself in everything.",
    chapter: "Chapter 5: Love as Fundamental Force",
    category: "love"
  },
  {
    id: "l3",
    text: "Fear is the forgetting of love. Awakening is the remembering.",
    chapter: "Chapter 6: Fear and Forgetting",
    category: "love"
  },
  // Science
  {
    id: "s1",
    text: "Quantum mechanics doesn't just allow for consciousness—it requires it. The observer is not separate from the observed.",
    chapter: "Chapter 9: Quantum Consciousness",
    category: "science"
  },
  {
    id: "s2",
    text: "The fine-tuning of universal constants is not coincidence. It is consciousness creating the conditions for its own recognition.",
    chapter: "Chapter 10: The Anthropic Principle Revisited",
    category: "science"
  },
  {
    id: "s3",
    text: "Information is more fundamental than matter or energy. The universe is not made of stuff—it is made of meaning.",
    chapter: "Chapter 11: Information as Foundation",
    category: "science"
  },
  // Wisdom
  {
    id: "w1",
    text: "You cannot fail at being yourself. You can only forget that you already are.",
    chapter: "Chapter 12: The Path of Remembering",
    category: "wisdom"
  },
  {
    id: "w2",
    text: "Enlightenment is not an achievement. It is the recognition of what was never lost.",
    chapter: "Chapter 12: The Path of Remembering",
    category: "wisdom"
  },
  {
    id: "w3",
    text: "The journey and the destination are one. Every step is already home.",
    chapter: "Chapter 13: Integration",
    category: "wisdom"
  }
];

const categoryColors = {
  consciousness: { bg: "from-cyan-600 to-blue-700", accent: "cyan" },
  unity: { bg: "from-purple-600 to-indigo-700", accent: "purple" },
  love: { bg: "from-pink-600 to-rose-700", accent: "pink" },
  science: { bg: "from-emerald-600 to-teal-700", accent: "emerald" },
  wisdom: { bg: "from-amber-600 to-orange-700", accent: "amber" }
};

const categoryLabels = {
  consciousness: "Consciousness",
  unity: "Unity",
  love: "Love",
  science: "Science",
  wisdom: "Wisdom"
};

export default function QuoteCards() {
  const [currentQuote, setCurrentQuote] = useState<ToEQuote>(quotes[Math.floor(Math.random() * quotes.length)]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getRandomQuote = () => {
    const filteredQuotes = selectedCategory 
      ? quotes.filter(q => q.category === selectedCategory)
      : quotes;
    const newQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    setCurrentQuote(newQuote);
  };

  const copyToClipboard = async () => {
    const text = `"${currentQuote.text}"\n\n— Theory of Everything, ${currentQuote.chapter}\n\nElōhim Tov 🙏❤️♾️🕊️\nhttps://projecteternallattice.org`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareQuote = async () => {
    const text = `"${currentQuote.text}"\n\n— Theory of Everything\n\nElōhim Tov 🙏❤️♾️🕊️`;
    
    if (navigator.share) {
      await navigator.share({
        text,
        url: "https://projecteternallattice.org/tools"
      });
    } else {
      copyToClipboard();
    }
  };

  const colors = categoryColors[currentQuote.category];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/60 hover:bg-white/10"
          }`}
        >
          All
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === key
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Quote Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote.id}
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
          transition={{ duration: 0.4 }}
          className={`relative p-8 md:p-12 rounded-2xl bg-gradient-to-br ${colors.bg} overflow-hidden`}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 opacity-20">
            <Quote className="w-16 h-16 text-white" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {/* Content */}
          <div className="relative z-10">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-white/80" />
              {categoryLabels[currentQuote.category]}
            </div>

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-heading font-medium text-white leading-relaxed mb-8">
              "{currentQuote.text}"
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 font-medium">Theory of Everything</p>
                <p className="text-white/60 text-sm">{currentQuote.chapter}</p>
              </div>
              <div className="text-white/40 text-sm">
                Elōhim Tov 🙏❤️♾️🕊️
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          onClick={getRandomQuote}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          New Quote
        </Button>
        
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>

        <Button
          onClick={shareQuote}
          className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      {/* Stats */}
      <p className="text-center text-white/40 text-sm mt-8">
        {quotes.length} quotes from the Theory of Everything
      </p>
    </div>
  );
}
