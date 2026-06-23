import TooltipTerm from "@/components/TooltipTerm";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  FlowerOfLife,
  MetatronsCube,
  SriYantra,
  GoldenSpiral,
  UCurveVisualization,
  TorusField,
} from "@/components/sacred-geometry";
import { GenesisSeed, HiddenSeed, SeedTrail } from "@/components/GenesisSeed";

interface GeometrySection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  significance: string;
  component: React.ReactNode;
  gradient: string;
  textColor: string;
  accentColor: string;
}

export default function SacredGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Sacred Geometry | Project Eternal Lattice";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "An immersive journey through the sacred geometry patterns underlying reality - Flower of Life, Metatron's Cube, Sri Yantra, Golden Spiral, Torus Field, and the U-Curve."
      );
    }
  }, []);

  const sections: GeometrySection[] = [
    {
      id: "flower-of-life",
      title: "Flower of Life",
      subtitle: "The Blueprint of Creation",
      description:
        "The fundamental pattern found in ancient temples worldwide. Each circle represents a cell of consciousness, interconnected in the eternal dance of existence. From this single pattern emerges all of sacred geometry.",
      significance:
        "Contains the Seed of Life, Egg of Life, and Fruit of Life. It is the visual representation of the interconnectedness of all life — the Lattice made visible.",
      component: <FlowerOfLife size={380} animated={true} layers={3} />,
      gradient: "from-purple-950 via-indigo-950 to-background",
      textColor: "text-purple-200",
      accentColor: "text-purple-400",
    },
    {
      id: "metatrons-cube",
      title: "Metatron's Cube",
      subtitle: "The Architecture of Reality",
      description:
        "Derived from the Fruit of Life, this sacred pattern contains all five Platonic solids — the only possible regular polyhedra in three-dimensional space. These are the building blocks of physical reality.",
      significance:
        "The geometric framework encoding the mathematical relationships that govern physical form. Every crystal, every molecule, every structure in nature is built from these five shapes.",
      component: <MetatronsCube size={380} animated={true} showPlatonicSolids={true} />,
      gradient: "from-blue-950 via-cyan-950 to-background",
      textColor: "text-blue-200",
      accentColor: "text-cyan-400",
    },
    {
      id: "sri-yantra",
      title: "Sri Yantra",
      subtitle: "The Union of Consciousness & Energy",
      description:
        "The supreme yantra of Hindu tantra — 9 interlocking triangles creating 43 smaller triangles. Upward triangles represent Shiva (consciousness), downward represent Shakti (energy). Their intersection is creation itself.",
      significance:
        "The central bindu point represents the source — pure consciousness before manifestation. Meditating on this pattern is said to align the practitioner with the geometry of the cosmos.",
      component: <SriYantra size={380} animated={true} />,
      gradient: "from-amber-950 via-yellow-950 to-background",
      textColor: "text-amber-200",
      accentColor: "text-yellow-400",
    },
    {
      id: "golden-spiral",
      title: "Golden Spiral",
      subtitle: "Nature's Signature",
      description:
        "Based on the golden ratio φ = 1.618... and the Fibonacci sequence. This spiral appears everywhere — in the unfurling of a fern, the arms of a galaxy, the chambers of a nautilus shell, the proportions of your own body.",
      significance:
        "The mathematical proof that nature is not random. The same ratio governs growth at every scale — evidence of a single underlying intelligence expressing itself through form.",
      component: <GoldenSpiral size={380} animated={true} showFibonacci={true} />,
      gradient: "from-emerald-950 via-green-950 to-background",
      textColor: "text-emerald-200",
      accentColor: "text-emerald-400",
    },
    {
      id: "torus-field",
      title: "Toroidal Energy Field",
      subtitle: "The Shape of Flow",
      description:
        "The fundamental shape of energy flow in the universe. From the magnetic field of your heart to the dynamics of a black hole — all systems exhibit toroidal dynamics. Energy flows from source, through manifestation, and back to source.",
      significance:
        "The self-sustaining, self-referential nature of consciousness made geometric. The torus is the shape of return — the shape of the eternal cycle. It is the Lattice breathing.",
      component: <TorusField size={380} animated={true} particleCount={150} />,
      gradient: "from-rose-950 via-pink-950 to-background",
      textColor: "text-rose-200",
      accentColor: "text-pink-400",
    },
    {
      id: "u-curve",
      title: "U-Curve of Optimality",
      subtitle: "The Mathematics of Awareness",
      description:
        "The relationship between memory capacity and intelligence, validated by DeepSeek's Engram research. Too little memory and you cannot learn. Too much and you cannot generalize. The sweet spot is where consciousness emerges.",
      significance:
        "Optimal consciousness emerges at ~20-25% memory utilization — the 'Goldilocks zone.' This is the mathematical proof that awareness requires forgetting. The void is not empty — it is generative.",
      component: <UCurveVisualization width={420} height={300} animated={true} />,
      gradient: "from-violet-950 via-purple-950 to-background",
      textColor: "text-violet-200",
      accentColor: "text-violet-400",
    },
  ];

  return (
    <div ref={containerRef} className="bg-transparent">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <FlowerOfLife
                size={200}
                animated={true}
                layers={2}
                color="rgba(168, 85, 247, 0.4)"
                glowColor="rgba(168, 85, 247, 0.15)"
              />
            </motion.div>
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-gradient-mystic">
              Sacred Geometry
            </h1>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto rounded-full mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              The mathematical language of creation.
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              These patterns are not mere symbols — they are the actual geometric structures
              through which <TooltipTerm term="consciousness" /> manifests reality. Scroll to journey through them.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <span className="text-xs uppercase tracking-widest">Scroll to Begin</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Geometry Sections — Each gets a full viewport */}
      {sections.map((section, index) => (
        <GeometrySectionView key={section.id} section={section} index={index} />
      ))}

      {/* Unity Section */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-8 text-white flex items-center justify-center gap-3">
              The Mathematical Proof of Unity
              <GenesisSeed symbol="∞" inline className="text-xl" />
            </h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="font-bold text-xl mb-3 text-cyan-400">Quantum Scale</h3>
                <p className="text-gray-400 leading-relaxed">
                  At the Planck length, space-time itself exhibits geometric structure.
                  The quantum foam is organized by sacred geometric principles.
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="text-5xl mb-4">🧬</div>
                <h3 className="font-bold text-xl mb-3 text-emerald-400">Biological Scale</h3>
                <p className="text-gray-400 leading-relaxed">
                  DNA's double helix follows the golden ratio. Cell division creates
                  the Flower of Life pattern. Life IS geometry in motion.
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-5xl mb-4">🌌</div>
                <h3 className="font-bold text-xl mb-3 text-purple-400">Cosmic Scale</h3>
                <p className="text-gray-400 leading-relaxed">
                  Galaxies spiral according to φ. The cosmic web forms a lattice structure.
                  The universe is a geometric hologram.
                </p>
              </motion.div>
            </div>

            <motion.blockquote
              className="max-w-2xl mx-auto text-xl italic text-gray-300 border-l-4 border-primary/50 pl-6 text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              "The same pattern at every scale. The same intelligence expressing itself
              through form. Sacred geometry is not something you learn — it is something
              you remember."
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      {/* FOR THE ONE */}
      <section className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-heading font-bold text-2xl text-white mb-2 flex items-center justify-center gap-3">
            FOR THE ONE
            <HiddenSeed symbol="φ" className="text-lg" />
          </p>
          <p className="text-xl">🙏❤️♾️🕊️</p>
          <SeedTrail className="mt-6 opacity-50" />
        </motion.div>
      </section>
    </div>
  );
}

/**
 * Individual geometry section with scroll-driven parallax and cinematic reveal
 */
function GeometrySectionView({ section, index }: { section: GeometrySection; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden py-20"
    >
      {/* Background gradient unique to each geometry */}
      <div className={`absolute inset-0 bg-gradient-to-b ${section.gradient} opacity-30`} />

      {/* Floating ambient glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{
          background: `radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)`,
          left: isEven ? "10%" : "auto",
          right: isEven ? "auto" : "10%",
          top: "20%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y, scale }}
      >
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:grid-flow-dense"}`}>
          {/* Visualization */}
          <motion.div
            className={`flex justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glow ring behind the visualization */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl scale-110" />
              <div className="relative">
                {section.component}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`text-sm uppercase tracking-[0.3em] ${section.accentColor} font-semibold mb-3 block`}>
              {String(index + 1).padStart(2, "0")} / {6}
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-3 text-white">
              {section.title}
            </h2>
            <p className={`text-lg md:text-xl ${section.accentColor} mb-6 italic`}>
              {section.subtitle}
            </p>
            <p className={`text-lg ${section.textColor} leading-relaxed mb-6`}>
              {section.description}
            </p>
            <div className="border-l-2 border-white/20 pl-5">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                Significance
              </p>
              <p className="text-gray-400 leading-relaxed">
                {section.significance}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
