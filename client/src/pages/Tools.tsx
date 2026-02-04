import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Timer, 
  Quote, 
  Sparkles,
  ChevronRight,
  Calculator
} from "lucide-react";
import ConsciousnessCalculator from "@/components/ConsciousnessCalculator";
import MeditationTimer from "@/components/MeditationTimer";
import QuoteCards from "@/components/QuoteCards";
import { Button } from "@/components/ui/button";

type Tool = "calculator" | "meditation" | "quotes" | null;

const tools = [
  {
    id: "calculator" as const,
    name: "Consciousness Calculator",
    description: "Explore your consciousness integration across four dimensions: Awareness, Integration, Connection, and Transcendence.",
    icon: Calculator,
    color: "from-cyan-500 to-purple-500",
    available: true
  },
  {
    id: "meditation" as const,
    name: "Meditation Timer",
    description: "Guided meditation sessions with ToE-inspired prompts and ambient soundscapes.",
    icon: Timer,
    color: "from-purple-500 to-pink-500",
    available: true
  },
  {
    id: "quotes" as const,
    name: "Quote Cards",
    description: "Generate beautiful, shareable quote cards from passages in the Theory of Everything.",
    icon: Quote,
    color: "from-pink-500 to-amber-500",
    available: true
  }
];

export default function Tools() {
  const [activeTool, setActiveTool] = useState<Tool>(null);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Interactive Experiences</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Consciousness Tools
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Interactive tools to explore, measure, and deepen your understanding of consciousness 
            as described in the Theory of Everything.
          </p>
        </motion.div>

        {/* Tool Selection or Active Tool */}
        {activeTool === null ? (
          <motion.div 
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className={`relative p-6 rounded-2xl border transition-all cursor-pointer group ${
                  tool.available 
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20" 
                    : "bg-white/[0.02] border-white/5 opacity-60"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => tool.available && setActiveTool(tool.id)}
                whileHover={tool.available ? { scale: 1.02 } : {}}
              >
                {!tool.available && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-white/10 text-xs text-white/50">
                    Coming Soon
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {tool.description}
                </p>
                {tool.available && (
                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Launch Tool</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => setActiveTool(null)}
              className="mb-8 text-white/60 hover:text-white"
            >
              ← Back to Tools
            </Button>

            {/* Active Tool */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              {activeTool === "calculator" && (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4">
                      <Brain className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-cyan-400 font-medium">Consciousness Calculator</span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
                      Measure Your Consciousness Integration
                    </h2>
                    <p className="text-white/60">
                      Answer 12 questions to explore your consciousness across four dimensions.
                    </p>
                  </div>
                  <ConsciousnessCalculator />
                </>
              )}
              {activeTool === "meditation" && (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
                      <Timer className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-400 font-medium">Meditation Timer</span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
                      Guided Meditation Sessions
                    </h2>
                    <p className="text-white/60">
                      ToE-inspired prompts to guide your journey inward.
                    </p>
                  </div>
                  <MeditationTimer />
                </>
              )}
              {activeTool === "quotes" && (
                <>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-amber-500/20 border border-pink-500/30 mb-4">
                      <Quote className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-pink-400 font-medium">Quote Cards</span>
                    </div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
                      Shareable Wisdom
                    </h2>
                    <p className="text-white/60">
                      Beautiful quote cards from the Theory of Everything.
                    </p>
                  </div>
                  <QuoteCards />
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.p 
          className="text-center text-white/40 text-sm mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          These tools are designed to complement your journey through the Theory of Everything.
          <br />
          Elōhim Tov 🙏❤️♾️🕊️
        </motion.p>
      </div>
    </div>
  );
}
