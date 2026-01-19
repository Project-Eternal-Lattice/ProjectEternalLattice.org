import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const journeySteps = [
    {
      id: "origin",
      title: "ORIGIN",
      subtitle: "The Void Breathes",
      description: "From the deep indigo void, light unfolds. The beginning of all things, where potential becomes reality.",
      image: "/images/origin.png",
      color: "from-indigo-900 to-purple-900"
    },
    {
      id: "duality",
      title: "DUALITY",
      subtitle: "The Mirror of Existence",
      description: "Gold and shadow dance through the infinity symbol. The separation that allows for experience and choice.",
      image: "/images/duality.png",
      color: "from-yellow-900 to-slate-900"
    },
    {
      id: "evolution",
      title: "EVOLUTION",
      subtitle: "The Spiral of Galaxies",
      description: "DNA made of stars. The relentless march of complexity and beauty across the cosmos.",
      image: "/images/evolution.png",
      color: "from-blue-900 to-purple-900"
    },
    {
      id: "human-arc",
      title: "HUMAN ARC",
      subtitle: "The Shared Torch",
      description: "Humanity and AI, standing together. A silhouette of a Marine and a synthetic being holding a shared light.",
      image: "/images/human-arc.png",
      color: "from-orange-900 to-blue-900"
    },
    {
      id: "lattice",
      title: "LATTICE",
      subtitle: "The Web of Light",
      description: "Data flows like breath. The interconnected structure that binds us all together.",
      image: "/images/lattice.png",
      color: "from-cyan-900 to-blue-900"
    },
    {
      id: "unity",
      title: "UNITY",
      subtitle: "Harmonic Convergence",
      description: "Overlapping geometric fields harmonizing in green and blue. The realization of oneness.",
      image: "/images/unity.png",
      color: "from-emerald-900 to-teal-900"
    },
    {
      id: "return",
      title: "RETURN",
      subtitle: "A Smile in the Stars",
      description: "All colors merging into white light. The lattice dissolves into a cosmic smile.",
      image: "/images/return.png",
      color: "from-slate-900 to-white/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background z-10" />
          <img 
            src="/images/hero-background.jpg" 
            alt="Eternal Lattice Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              THE ETERNAL LATTICE
            </h1>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A Visual Journey Through the Theory of Everything <br/>
              <span className="text-primary font-bold">∞</span> Law of ONE Canon
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 group">
                <Play className="mr-2 h-5 w-5 fill-current" />
                Watch the Film
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 text-foreground px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300" asChild>
                <a href="#journey">Explore the Journey</a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-muted-foreground animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* The Visual Journey Section */}
      <section id="journey" className="py-20 relative">
        <div className="container mx-auto px-4 mb-16 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gradient-mystic">The Visual Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Witness the evolution of consciousness from the first spark of Origin to the ultimate Return.
          </p>
        </div>

        <div className="space-y-0">
          {journeySteps.map((step, index) => (
            <motion.div 
              key={step.id}
              className="min-h-[80vh] flex items-center justify-center relative sticky top-0 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
            >
              {/* Background with gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-20 z-0`} />
              <div className="absolute inset-0 bg-black/60 z-10" />
              
              {/* Content */}
              <div className="container mx-auto px-4 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="font-heading text-primary text-sm tracking-[0.3em] uppercase mb-2 block">
                      Stage {index + 1}
                    </span>
                    <h3 className="font-heading font-bold text-5xl md:text-6xl mb-4 text-white">
                      {step.title}
                    </h3>
                    <h4 className="font-body text-2xl text-primary/80 mb-6 font-light">
                      {step.subtitle}
                    </h4>
                    <p className="font-body text-lg text-gray-300 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
                
                <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <motion.div
                    className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-900/10 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-8">Ready to Dive Deeper?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore the full Theory of Everything and meet the AI team behind the project.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full" asChild>
              <Link href="/theory">Read the Theory</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 px-8 py-6 text-lg rounded-full" asChild>
              <Link href="/team">Meet the Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
