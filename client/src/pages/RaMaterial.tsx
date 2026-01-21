import { motion } from "framer-motion";
import { useEffect } from "react";
import { ExternalLink, BookOpen, Headphones, Search, List, Layers, MessageCircle, Library } from "lucide-react";
import { Link } from "wouter";

// Key categories for quick access
const keyCategories = [
  { name: "Law of One", description: "The core principle: All is One", url: "https://www.lawofone.info/c/Law%20of%20One" },
  { name: "Densities", description: "The seven levels of consciousness evolution", url: "https://www.lawofone.info/c/Densities" },
  { name: "Harvest", description: "Graduation between densities", url: "https://www.lawofone.info/c/Harvest" },
  { name: "Service to Others", description: "The positive path of love", url: "https://www.lawofone.info/c/Service%20to%20Others" },
  { name: "Energy Centers", description: "The chakra system explained", url: "https://www.lawofone.info/c/Energy%20Centers" },
  { name: "Wanderers", description: "Souls who came to help Earth", url: "https://www.lawofone.info/c/Wanderers" },
  { name: "Archetypical Mind", description: "The deep structure of consciousness", url: "https://www.lawofone.info/c/Archetypical%20Mind" },
  { name: "Cosmology", description: "The structure of the universe", url: "https://www.lawofone.info/c/Cosmology" },
];

// Quick links to main resources
const quickLinks = [
  { 
    name: "All 106 Sessions", 
    description: "Complete transcripts from 1981-1984", 
    url: "https://www.lawofone.info/sessions.php",
    icon: List,
    color: "text-blue-400 bg-blue-500/20 border-blue-500/30"
  },
  { 
    name: "Categories", 
    description: "Browse by topic", 
    url: "https://www.lawofone.info/categories.php",
    icon: Layers,
    color: "text-purple-400 bg-purple-500/20 border-purple-500/30"
  },
  { 
    name: "Synopsis", 
    description: "Key concepts explained", 
    url: "https://www.lawofone.info/synopsis.php",
    icon: BookOpen,
    color: "text-green-400 bg-green-500/20 border-green-500/30"
  },
  { 
    name: "Audio", 
    description: "Listen to the sessions", 
    url: "https://www.lawofone.info/audio.php",
    icon: Headphones,
    color: "text-orange-400 bg-orange-500/20 border-orange-500/30"
  },
  { 
    name: "Search", 
    description: "Find specific quotes", 
    url: "https://www.lawofone.info/search.php",
    icon: Search,
    color: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30"
  },
  { 
    name: "Glossary", 
    description: "Ra's terminology defined", 
    url: "https://www.lawofone.info/glossary.php",
    icon: MessageCircle,
    color: "text-pink-400 bg-pink-500/20 border-pink-500/30"
  },
];

// Featured sessions for newcomers
const featuredSessions = [
  { number: 1, title: "Introduction to Ra", description: "Ra introduces themselves and the Law of One", url: "https://www.lawofone.info/s/1" },
  { number: 6, title: "The Harvest", description: "Understanding graduation to fourth density", url: "https://www.lawofone.info/s/6" },
  { number: 13, title: "The Densities", description: "Complete explanation of the seven densities", url: "https://www.lawofone.info/s/13" },
  { number: 16, title: "Service & Polarity", description: "The two paths: Service to Others vs Self", url: "https://www.lawofone.info/s/16" },
  { number: 27, title: "Free Will & Love", description: "The first and second distortions explained", url: "https://www.lawofone.info/s/27" },
  { number: 52, title: "The Octave", description: "The infinite cycle of creation", url: "https://www.lawofone.info/s/52" },
];

export default function RaMaterial() {
  // SEO: Set page-specific title and meta description
  useEffect(() => {
    document.title = "The Ra Material - Law of One | Project Eternal Lattice";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore the Ra Material and Law of One teachings. 106 channeled sessions revealing the nature of consciousness, densities, harvest, and the unity of all existence. Direct links to lawofone.info.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Ra Material
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p 
            className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The foundational channeled text that introduced the Law of One to humanity.
            106 sessions of profound wisdom received between 1981-1984.
          </motion.p>
          
          {/* Archive Library Link */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/ra-library">
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                <Library className="w-6 h-6" />
                <span>Browse Our Complete Archive</span>
                <span className="text-sm opacity-75">(108 Sessions)</span>
              </button>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Preserved for future generations - searchable and always available
            </p>
          </motion.div>
        </div>

        {/* Introduction Section */}
        <motion.div 
          className="glass-card p-8 md:p-12 rounded-2xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl mb-6 text-primary">What is the Ra Material?</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6">
              The Ra Material, also known as <strong>The Law of One</strong>, is a series of 106 channeled sessions 
              conducted between January 1981 and March 1984 by L/L Research (Don Elkins, Carla Rueckert, and Jim McCarty). 
              In these sessions, a sixth-density social memory complex identifying itself as "Ra" shared profound teachings 
              about the nature of reality, consciousness, and spiritual evolution.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Ra's central message is simple yet revolutionary: <strong>All is One</strong>. There is only the Infinite Creator, 
              and everything we perceive as separate—every person, planet, star, and dimension—is actually a facet of this 
              single unified consciousness exploring itself through infinite experiences.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The material describes seven "densities" of consciousness evolution, the concept of "harvest" (graduation 
              between densities), and the two paths of spiritual evolution: Service to Others and Service to Self. 
              These teachings form the philosophical foundation of our Theory of Everything.
            </p>
          </div>
          
          {/* Quote Block */}
          <div className="mt-8 p-6 bg-primary/10 border-l-4 border-primary rounded-r-lg">
            <p className="text-xl italic text-gray-200 mb-2">
              "I am Ra. The Law of One, though beyond the limitations of name, as you call vibratory sound complexes, 
              may be approximated by stating that all things are one, that there is no polarity, no right or wrong, 
              no disharmony, but only identity. All is one, and that one is love/light, light/love, the Infinite Creator."
            </p>
            <p className="text-sm text-primary">— Ra, Session 4.20</p>
          </div>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl mb-8 text-center text-white">
            Explore the Material
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 border ${link.color} group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <link.icon className={`w-8 h-8 mx-auto mb-3 ${link.color.split(' ')[0]}`} />
                <h3 className="font-bold text-white text-sm mb-1">{link.name}</h3>
                <p className="text-xs text-muted-foreground">{link.description}</p>
                <ExternalLink className="w-3 h-3 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/50" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Key Categories */}
          <motion.div 
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-2xl mb-6 text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary" />
              Key Topics
            </h2>
            <div className="space-y-3">
              {keyCategories.map((category, index) => (
                <a
                  key={category.name}
                  href={category.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <div>
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Featured Sessions */}
          <motion.div 
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-2xl mb-6 text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Start Here: Key Sessions
            </h2>
            <div className="space-y-3">
              {featuredSessions.map((session) => (
                <a
                  key={session.number}
                  href={session.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                    {session.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate">{session.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{session.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </a>
              ))}
            </div>
            <a 
              href="https://www.lawofone.info/sessions.php"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg transition-colors text-primary font-bold"
            >
              View All 106 Sessions <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* The Seven Densities Overview */}
        <motion.div 
          className="glass-card p-8 md:p-12 rounded-2xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl mb-8 text-center text-white">The Seven Densities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: 1, name: "Awareness", desc: "Elements: earth, air, water, fire", color: "from-red-500/20 to-red-900/20 border-red-500/30" },
              { num: 2, name: "Growth", desc: "Plants, animals, biological life", color: "from-orange-500/20 to-orange-900/20 border-orange-500/30" },
              { num: 3, name: "Self-Awareness", desc: "Humans: choice of path", color: "from-yellow-500/20 to-yellow-900/20 border-yellow-500/30" },
              { num: 4, name: "Love", desc: "Social memory complex", color: "from-green-500/20 to-green-900/20 border-green-500/30" },
              { num: 5, name: "Wisdom", desc: "Light and understanding", color: "from-blue-500/20 to-blue-900/20 border-blue-500/30" },
              { num: 6, name: "Unity", desc: "Love and wisdom balanced (Ra)", color: "from-indigo-500/20 to-indigo-900/20 border-indigo-500/30" },
              { num: 7, name: "Gateway", desc: "Return to the Creator", color: "from-purple-500/20 to-purple-900/20 border-purple-500/30" },
              { num: 8, name: "Octave", desc: "New creation begins", color: "from-white/20 to-gray-900/20 border-white/30" },
            ].map((density) => (
              <div 
                key={density.num}
                className={`p-4 rounded-xl bg-gradient-to-br ${density.color} border text-center`}
              >
                <div className="text-3xl font-bold text-white mb-1">{density.num}</div>
                <div className="font-bold text-white text-sm">{density.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{density.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            Earth is currently transitioning from third to fourth density. This is the "Harvest" Ra speaks of.
          </p>
        </motion.div>

        {/* Connection to ToE */}
        <motion.div 
          className="glass-card p-8 md:p-12 rounded-2xl border-l-4 border-primary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl mb-6 text-primary">Connection to Our Theory</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed mb-6">
              The Ra Material's "Law of One" is the spiritual foundation upon which our Theory of Everything is built. 
              Where Ra provides the metaphysical framework—consciousness as primary, the illusion of separation, 
              the evolution through densities—our ToE provides the scientific and geometric structure: the Eternal Lattice.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Ra describes reality as a unified field of consciousness. We describe that field's structure as a 
              geometric lattice of light and information. Ra speaks of "distortions" from unity. We map those 
              distortions mathematically. Ra teaches that "all is one." We prove it through quantum entanglement, 
              the holographic principle, and the convergence of physics and consciousness science.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Together, the Ra Material and the Theory of Everything form a complete picture: the ancient wisdom 
              and the modern science, united at last. <strong>FOR THE ONE.</strong> 🙏❤️♾️🕊️
            </p>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            All Ra Material content is hosted by and credited to{" "}
            <a 
              href="https://www.lawofone.info" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              lawofone.info
            </a>
            {" "}(Tobey Wheelock) and{" "}
            <a 
              href="https://www.llresearch.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              L/L Research
            </a>.
          </p>
          <a 
            href="https://www.lawofone.info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition-colors"
          >
            Visit lawofone.info <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
