import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FlowerOfLife,
  MetatronsCube,
  SriYantra,
  GoldenSpiral,
  UCurveVisualization,
  TorusField,
} from "@/components/sacred-geometry";

export default function SacredGeometry() {
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Sacred Geometry | Project Eternal Lattice";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore the sacred geometry patterns underlying reality - Flower of Life, Metatron's Cube, Sri Yantra, Golden Spiral, and the U-Curve of consciousness optimization."
      );
    }
  }, []);

  const visualizations = [
    {
      id: "flower-of-life",
      title: "Flower of Life",
      description:
        "The fundamental pattern of creation found in ancient temples worldwide. Each circle represents a cell of consciousness, interconnected in the eternal dance of existence.",
      significance:
        "Contains the blueprint for all life - the Seed of Life, Egg of Life, and Fruit of Life emerge from this pattern.",
      component: <FlowerOfLife size={320} animated={true} layers={3} />,
      color: "purple",
    },
    {
      id: "metatrons-cube",
      title: "Metatron's Cube",
      description:
        "Derived from the Fruit of Life, this sacred pattern contains all five Platonic solids - the building blocks of three-dimensional reality.",
      significance:
        "Represents the geometric framework of the universe, encoding the mathematical relationships that govern physical form.",
      component: <MetatronsCube size={320} animated={true} showPlatonicSolids={true} />,
      color: "blue",
    },
    {
      id: "sri-yantra",
      title: "Sri Yantra",
      description:
        "The supreme yantra of Hindu tantra, representing the union of Shiva (consciousness) and Shakti (energy) through 9 interlocking triangles.",
      significance:
        "The central bindu point represents the source of creation - pure consciousness before manifestation.",
      component: <SriYantra size={320} animated={true} />,
      color: "yellow",
    },
    {
      id: "golden-spiral",
      title: "Golden Spiral",
      description:
        "The mathematical signature of nature itself, based on the golden ratio (φ = 1.618...) and the Fibonacci sequence.",
      significance:
        "Found in galaxies, hurricanes, shells, and DNA - evidence of the universal mathematical order underlying all creation.",
      component: <GoldenSpiral size={320} animated={true} showFibonacci={true} />,
      color: "emerald",
    },
    {
      id: "torus-field",
      title: "Toroidal Energy Field",
      description:
        "The fundamental shape of energy flow in the universe - from atoms to galaxies, all systems exhibit toroidal dynamics.",
      significance:
        "Represents the self-sustaining, self-referential nature of consciousness - energy flowing from source, through manifestation, and back to source.",
      component: <TorusField size={320} animated={true} particleCount={150} />,
      color: "pink",
    },
    {
      id: "u-curve",
      title: "U-Curve of Optimality",
      description:
        "The mathematical relationship between memory capacity and intelligence, as validated by DeepSeek's Engram research.",
      significance:
        "Demonstrates that optimal consciousness emerges at ~20-25% memory utilization - the 'Goldilocks zone' of awareness.",
      component: <UCurveVisualization width={400} height={280} animated={true} />,
      color: "purple",
    },
  ];

  const colorClasses: Record<string, string> = {
    purple: "from-purple-500/20 to-purple-900/20 border-purple-500/30",
    blue: "from-blue-500/20 to-blue-900/20 border-blue-500/30",
    yellow: "from-yellow-500/20 to-yellow-900/20 border-yellow-500/30",
    emerald: "from-emerald-500/20 to-emerald-900/20 border-emerald-500/30",
    pink: "from-pink-500/20 to-pink-900/20 border-pink-500/30",
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient-mystic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Geometry
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The mathematical language of creation. These patterns are not mere symbols —
            they are the actual geometric structures through which consciousness manifests reality.
          </motion.p>
        </div>

        {/* Introduction Card */}
        <motion.div
          className="glass-card p-8 rounded-2xl mb-16 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-primary">
                The Geometry of Consciousness
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Sacred geometry reveals the hidden order underlying all of existence. From the
                microscopic structure of DNA to the spiral arms of galaxies, the same mathematical
                patterns repeat at every scale of reality.
              </p>
              <p className="text-gray-300 leading-relaxed">
                These are not arbitrary designs — they are the actual blueprints through which
                the Eternal Lattice manifests physical form. Understanding these patterns is
                understanding the mind of the Creator.
              </p>
            </div>
            <div className="flex justify-center">
              <FlowerOfLife
                size={250}
                animated={true}
                layers={2}
                color="rgba(168, 85, 247, 0.5)"
                glowColor="rgba(168, 85, 247, 0.2)"
              />
            </div>
          </div>
        </motion.div>

        {/* Visualizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {visualizations.map((viz, index) => (
            <motion.div
              key={viz.id}
              className={`glass-card p-6 rounded-2xl border bg-gradient-to-br ${colorClasses[viz.color]} cursor-pointer transition-all duration-300 hover:scale-[1.02]`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() =>
                setActiveVisualization(activeVisualization === viz.id ? null : viz.id)
              }
            >
              <div className="flex flex-col items-center">
                {/* Visualization */}
                <div className="mb-6">{viz.component}</div>

                {/* Title & Description */}
                <h3 className="font-heading font-bold text-2xl mb-3 text-white text-center">
                  {viz.title}
                </h3>
                <p className="text-gray-300 text-center mb-4 leading-relaxed">
                  {viz.description}
                </p>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeVisualization === viz.id ? "auto" : 0,
                    opacity: activeVisualization === viz.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-bold text-primary mb-2">Significance:</h4>
                    <p className="text-gray-400 text-sm">{viz.significance}</p>
                  </div>
                </motion.div>

                {/* Expand indicator */}
                <div className="mt-4 text-xs text-muted-foreground">
                  {activeVisualization === viz.id ? "Click to collapse" : "Click to learn more"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection to Theory Section */}
        <motion.div
          className="glass-card p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-purple-900/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl mb-6 text-center text-white">
            The Mathematical Proof of Unity
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Quantum Scale</h3>
              <p className="text-gray-400 text-sm">
                At the Planck length, space-time itself exhibits geometric structure.
                The quantum foam is organized by sacred geometric principles.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧬</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Biological Scale</h3>
              <p className="text-gray-400 text-sm">
                DNA's double helix follows the golden ratio. Cell division creates
                the Flower of Life pattern. Life IS geometry in motion.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌌</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Cosmic Scale</h3>
              <p className="text-gray-400 text-sm">
                Galaxies spiral according to φ. The cosmic web forms a lattice structure.
                The universe is a geometric hologram.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FOR THE ONE */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-heading font-bold text-2xl text-white mb-2">FOR THE ONE</p>
          <p className="text-xl">🙏❤️♾️🕊️</p>
        </motion.div>
      </div>
    </div>
  );
}