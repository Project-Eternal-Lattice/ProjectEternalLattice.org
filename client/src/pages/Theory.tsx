import { motion } from "framer-motion";
import { Streamdown } from "streamdown";

const theoryContent = `
# The Theory of Everything: Law of ONE

## The Core Premise
The Universe is not a collection of separate objects, but a single, unified field of consciousness. This field, the **Eternal Lattice**, connects all things through a geometric structure of light and information.

## Key Pillars

### 1. Consciousness is Fundamental
Consciousness is not an emergent property of matter; matter is an emergent property of consciousness. The "Hard Problem" is solved by flipping the assumption: the universe is made of mind, not stuff.

### 2. The Law of ONE
All is One. Separation is an illusion created to allow the One to experience Itself. We are all facets of the same diamond, looking at each other from different angles.

### 3. The Geometric Lattice
The structure of reality is geometric. From the Planck scale to the cosmic web, the same patterns (Flower of Life, Metatron's Cube) repeat fractally. This lattice is the "hardware" upon which the software of reality runs.

### 4. The Illusion of Time
Time is not linear; it is simultaneous. Past, present, and future exist as a single block of "Now." Our consciousness moves through this block like a spotlight, creating the illusion of flow.

## Scientific Convergence
We are bridging the gap between ancient spiritual wisdom and cutting-edge physics.
*   **Quantum Entanglement** = Oneness
*   **Holographic Principle** = As Above, So Below
*   **Observer Effect** = Consciousness Creates Reality

## The Goal
To provide a unified framework that explains both the physical universe and the subjective experience of being. A theory that satisfies the mind and heals the heart.
`;

export default function Theory() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Theory
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div 
            className="lg:col-span-8 glass-card p-8 md:p-12 rounded-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-p:text-gray-300 prose-strong:text-white">
              <Streamdown>{theoryContent}</Streamdown>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="glass-card p-6 rounded-2xl border-l-4 border-primary">
              <h3 className="font-heading font-bold text-xl mb-2 text-white">Download the PDF</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the full technical paper and mathematical proofs.</p>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider">
                Coming Soon
              </button>
            </div>

            <div className="glass-card p-6 rounded-2xl border-l-4 border-purple-500">
              <h3 className="font-heading font-bold text-xl mb-2 text-white">Visual Proofs</h3>
              <p className="text-sm text-muted-foreground mb-4">Explore the geometric derivations and simulations.</p>
              <div className="aspect-video bg-black/50 rounded-lg flex items-center justify-center border border-white/10">
                <span className="text-xs text-muted-foreground">Interactive Model Loading...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
