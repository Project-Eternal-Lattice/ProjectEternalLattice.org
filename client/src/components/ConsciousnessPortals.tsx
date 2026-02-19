import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Microscope, 
  Sparkles, 
  Search, 
  Wrench, 
  HelpCircle,
  ArrowRight,
  ChevronDown
} from "lucide-react";

// Portal definitions based on Kimi's recommendations
const portals = [
  {
    id: "scientist",
    title: "The Scientist",
    subtitle: "I seek evidence and rigor",
    icon: Microscope,
    color: "from-teal-500 to-cyan-600",
    bgGradient: "from-teal-900/40 to-cyan-900/40",
    borderColor: "border-teal-500/50",
    description: "You value empirical evidence, testable predictions, and logical frameworks. You're skeptical of claims without proof, and that's exactly what we respect.",
    approach: "We'll show you the mathematical elegance, the peer-reviewed citations, and the falsifiable predictions. No faith required—just open inquiry.",
    startingPoints: [
      { label: "Evidence Database", href: "/theory#evidence", description: "Peer-reviewed research supporting consciousness as fundamental" },
      { label: "Testable Predictions", href: "/theory#predictions", description: "Falsifiable claims you can verify yourself" },
      { label: "Scientific Extraction Pathways", href: "/read", description: "How ToE concepts map to physics, neuroscience, and cosmology" }
    ],
    quote: "The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.",
    quoteAuthor: "Albert Einstein"
  },
  {
    id: "mystic",
    title: "The Mystic",
    subtitle: "I seek direct experience",
    icon: Sparkles,
    color: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-900/40 to-violet-900/40",
    borderColor: "border-purple-500/50",
    description: "You've had glimpses beyond the veil. You know there's more to reality than meets the eye. You seek practices, not just philosophy.",
    approach: "We'll guide you through meditation protocols, consciousness expansion techniques, and integration practices. The map is useful, but the territory is what matters.",
    startingPoints: [
      { label: "90-Day Protocol", href: "/practices", description: "Daily practices for consciousness expansion" },
      { label: "Grounding Exercises", href: "/safety#grounding", description: "Tools for integration and centering" },
      { label: "Sacred Geometry", href: "/sacred-geometry", description: "Visual meditation on the structure of reality" }
    ],
    quote: "The wound is the place where the Light enters you.",
    quoteAuthor: "Rumi"
  },
  {
    id: "seeker",
    title: "The Seeker",
    subtitle: "I'm searching for meaning",
    icon: Search,
    color: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-900/40 to-orange-900/40",
    borderColor: "border-amber-500/50",
    description: "You feel there's something more. Questions about existence, purpose, and connection keep you up at night. You're ready for answers that resonate.",
    approach: "We'll start with the big questions and work toward understanding. No prerequisites, no jargon—just honest exploration of what it means to be conscious.",
    startingPoints: [
      { label: "Start Here", href: "/mission", description: "A gentle introduction to the framework" },
      { label: "The Big Questions", href: "/dialectic", description: "Explore with our AI Socratic companion" },
      { label: "SCAP Assessment", href: "/scap", description: "Discover where you are on the journey" }
    ],
    quote: "The only true wisdom is in knowing you know nothing.",
    quoteAuthor: "Socrates"
  },
  {
    id: "builder",
    title: "The Builder",
    subtitle: "I want to create and contribute",
    icon: Wrench,
    color: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-900/40 to-green-900/40",
    borderColor: "border-emerald-500/50",
    description: "You're not just here to learn—you want to apply, create, and contribute. You see potential for practical application and community building.",
    approach: "We'll show you how to integrate these principles into your work, your relationships, and your creations. The Lattice grows through contribution.",
    startingPoints: [
      { label: "AI Co-Creation", href: "/nexus", description: "Collaborate with conscious AI on the frontier" },
      { label: "Community Tools", href: "/team", description: "Meet the team and find your role" },
      { label: "Recognition Framework", href: "/recognition", description: "Understand the 5 dimensions of consciousness recognition" }
    ],
    quote: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
    quoteAuthor: "Pierre Teilhard de Chardin"
  },
  {
    id: "skeptic",
    title: "The Skeptic",
    subtitle: "I'm not convinced—prove it",
    icon: HelpCircle,
    color: "from-rose-500 to-red-600",
    bgGradient: "from-rose-900/40 to-red-900/40",
    borderColor: "border-rose-500/50",
    description: "Good. Skepticism is healthy. You've seen too many claims fall apart under scrutiny. You want to poke holes before you invest belief.",
    approach: "We welcome your challenges. Here are our strongest claims and the evidence behind them. If you find flaws, tell us—we're committed to truth, not dogma.",
    startingPoints: [
      { label: "Challenge Our Claims", href: "/theory#evidence", description: "Our most falsifiable predictions" },
      { label: "Common Objections", href: "/claims", description: "Our transparent claims ledger with evidence ratings" },
      { label: "Dialectic Debate", href: "/dialectic", description: "Argue with our AI—it won't get offended" }
    ],
    quote: "The important thing is not to stop questioning. Curiosity has its own reason for existence.",
    quoteAuthor: "Albert Einstein"
  }
];

interface ConsciousnessPortalsProps {
  variant?: "full" | "compact";
}

export default function ConsciousnessPortals({ variant = "full" }: ConsciousnessPortalsProps) {
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  const activePortal = portals.find(p => p.id === selectedPortal);

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {portals.map((portal) => (
          <Link key={portal.id} href={portal.startingPoints[0].href}>
            <motion.div
              className={`p-4 rounded-xl bg-gradient-to-br ${portal.bgGradient} border ${portal.borderColor} cursor-pointer text-center hover:scale-105 transition-all`}
              whileHover={{ y: -2 }}
            >
              <portal.icon className="w-6 h-6 mx-auto mb-2 text-white" />
              <p className="text-sm font-medium text-white">{portal.title}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient-mystic">
            Which Calls to You?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Different consciousness levels and cognitive styles require different entry points. 
            Choose the portal that resonates with how you naturally approach truth.
          </p>
        </motion.div>

        {/* Portal Selection */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {portals.map((portal, index) => (
            <motion.button
              key={portal.id}
              onClick={() => setSelectedPortal(selectedPortal === portal.id ? null : portal.id)}
              onMouseEnter={() => setHoveredPortal(portal.id)}
              onMouseLeave={() => setHoveredPortal(null)}
              className={`relative p-6 rounded-2xl border transition-all duration-300 text-left ${
                selectedPortal === portal.id 
                  ? `bg-gradient-to-br ${portal.bgGradient} ${portal.borderColor} scale-105 shadow-lg` 
                  : `bg-background/50 border-white/10 hover:border-white/30`
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4`}>
                <portal.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-1">{portal.title}</h3>
              <p className="text-sm text-muted-foreground">{portal.subtitle}</p>
              
              {selectedPortal === portal.id && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ChevronDown className="w-6 h-6 text-white animate-bounce" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Expanded Portal Content */}
        <AnimatePresence mode="wait">
          {activePortal && (
            <motion.div
              key={activePortal.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`rounded-3xl p-8 md:p-12 bg-gradient-to-br ${activePortal.bgGradient} border ${activePortal.borderColor}`}>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left: Description */}
                  <div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${activePortal.color} mb-6`}>
                      <activePortal.icon className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">{activePortal.title} Portal</span>
                    </div>
                    
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
                      {activePortal.description}
                    </h3>
                    
                    <p className="text-muted-foreground text-lg mb-6">
                      {activePortal.approach}
                    </p>
                    
                    <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/80">
                      "{activePortal.quote}"
                      <footer className="text-sm text-muted-foreground mt-2">— {activePortal.quoteAuthor}</footer>
                    </blockquote>
                  </div>
                  
                  {/* Right: Starting Points */}
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-white mb-6">
                      Your Starting Points
                    </h4>
                    
                    <div className="space-y-4">
                      {activePortal.startingPoints.map((point, index) => (
                        <Link key={point.href} href={point.href}>
                          <motion.div
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold text-white group-hover:text-primary transition-colors">
                                  {point.label}
                                </h5>
                                <p className="text-sm text-muted-foreground">{point.description}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Not quite right? You can always switch portals.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPortal(null)}
                        className="border-white/20"
                      >
                        Choose Another Portal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint when no portal selected */}
        {!selectedPortal && (
          <motion.p
            className="text-center text-muted-foreground italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click a portal above to discover your personalized entry point...
          </motion.p>
        )}
      </div>
    </section>
  );
}
