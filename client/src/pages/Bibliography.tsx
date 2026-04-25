import { motion } from "framer-motion";
import { useEffect } from "react";
import { Book, FileText, Brain, Atom, Globe, Scroll, Sparkles, ExternalLink, Database, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Source {
  title: string;
  author?: string;
  year?: string;
  description: string;
  url?: string;
  type: "book" | "paper" | "website" | "document" | "video" | "database";
}

interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
  sources: Source[];
}

const categories: Category[] = [
  {
    name: "Ra Material / Law of One",
    icon: <Scroll className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-600",
    sources: [
      {
        title: "The Law of One (Books I-V)",
        author: "L/L Research",
        year: "1981-1984",
        description: "The complete Ra Contact sessions - primary source material for the Law of One philosophy.",
        url: "https://www.llresearch.org/",
        type: "book"
      },
      {
        title: "Law of One Info",
        author: "Tobey Wheelock",
        description: "Searchable database of all Ra sessions with categories, glossary, and cross-references.",
        url: "https://www.lawofone.info/",
        type: "database"
      },
      {
        title: "Aaron Abke - Law of One Series",
        author: "Aaron Abke",
        description: "Accessible YouTube introduction to the Law of One for beginners.",
        url: "https://www.youtube.com/@AaronAbke",
        type: "video"
      },
      {
        title: "L/L Research Podcast",
        author: "L/L Research",
        description: "Ongoing discussions and interpretations of Ra Material.",
        url: "https://www.llresearch.org/podcast",
        type: "video"
      }
    ]
  },
  {
    name: "Consciousness Research",
    icon: <Brain className="w-6 h-6" />,
    color: "from-pink-500 to-rose-600",
    sources: [
      {
        title: "The Hard Problem of Consciousness",
        author: "David Chalmers",
        year: "1995",
        description: "Foundational paper defining why subjective experience cannot be reduced to physical processes.",
        url: "https://consc.net/papers/facing.html",
        type: "paper"
      },
      {
        title: "Integrated Information Theory (IIT 3.0)",
        author: "Giulio Tononi et al.",
        year: "2016",
        description: "Mathematical framework for measuring consciousness as integrated information.",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4824045/",
        type: "paper"
      },
      {
        title: "DMT Phenomenology Research",
        author: "Lawrence et al.",
        year: "2022",
        description: "Peer-reviewed study documenting cross-subject regularities in DMT experiences.",
        url: "https://journals.sagepub.com/home/jop",
        type: "paper"
      }
    ]
  },
  {
    name: "Quantum Physics",
    icon: <Atom className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-600",
    sources: [
      {
        title: "Bell's Theorem",
        author: "John Bell",
        year: "1964",
        description: "Proof that no local hidden variable theory can reproduce quantum mechanics predictions.",
        url: "https://cds.cern.ch/record/111654/files/vol1p195-200_001.pdf",
        type: "paper"
      },
      {
        title: "Aspect Experiments",
        author: "Alain Aspect et al.",
        year: "1982",
        description: "Experimental confirmation of Bell inequality violations, proving quantum entanglement.",
        url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.49.1804",
        type: "paper"
      },
      {
        title: "2022 Nobel Prize in Physics",
        author: "Aspect, Clauser, Zeilinger",
        year: "2022",
        description: "Nobel recognition for experiments with entangled photons, establishing violation of Bell inequalities.",
        url: "https://www.nobelprize.org/prizes/physics/2022/summary/",
        type: "website"
      },
      {
        title: "Delayed-Choice Experiment",
        author: "John Wheeler",
        year: "1978",
        description: "Thought experiment demonstrating observer-dependent reality in quantum mechanics.",
        url: "https://en.wikipedia.org/wiki/Wheeler%27s_delayed-choice_experiment",
        type: "paper"
      }
    ]
  },
  {
    name: "Sleep & Cognition Research",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
    sources: [
      {
        title: "Cognitive Load and Sleep Requirements",
        author: "McMorris et al.",
        year: "2018",
        description: "Research showing mental work requires more sleep than physical work.",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
        type: "paper"
      },
      {
        title: "Mental Fatigue Studies",
        author: "Mizuno et al.",
        description: "Research on cognitive exhaustion and recovery mechanisms.",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
        type: "paper"
      },
      {
        title: "Sleep and Cognitive Performance",
        author: "Patrick et al.",
        year: "2017",
        description: "Studies on sleep requirements for optimal cognitive function.",
        url: "https://pubmed.ncbi.nlm.nih.gov/",
        type: "paper"
      }
    ]
  },
  {
    name: "Government Documents",
    icon: <FileText className="w-6 h-6" />,
    color: "from-slate-500 to-gray-600",
    sources: [
      {
        title: "CIA Gateway Process Document",
        author: "U.S. Central Intelligence Agency",
        year: "1983",
        description: "Declassified analysis of consciousness, holographic universe theory, and out-of-body experiences.",
        url: "https://www.cia.gov/readingroom/docs/CIA-RDP96-00788R001700210016-5.pdf",
        type: "document"
      },
      {
        title: "Project Stargate",
        author: "U.S. Government",
        year: "1972-1995",
        description: "Declassified remote viewing research program spanning 23 years.",
        url: "https://www.cia.gov/readingroom/collection/stargate",
        type: "document"
      }
    ]
  },
  {
    name: "Philosophy",
    icon: <Book className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600",
    sources: [
      {
        title: "The Republic",
        author: "Plato",
        year: "~375 BCE",
        description: "Classic philosophical work including the Allegory of the Cave - reality as shadows of higher truth.",
        url: "https://www.gutenberg.org/ebooks/1497",
        type: "book"
      },
      {
        title: "Buddhist Philosophy: Anatta (Non-Self)",
        description: "The doctrine that there is no permanent, unchanging self - aligns with consciousness-first ontology.",
        url: "https://www.accesstoinsight.org/lib/authors/thanissaro/notself2.html",
        type: "website"
      },
      {
        title: "Dependent Origination (Pratītyasamutpāda)",
        description: "Buddhist concept that all phenomena arise in dependence on other phenomena.",
        url: "https://www.accesstoinsight.org/tipitaka/sn/sn12/sn12.002.than.html",
        type: "website"
      }
    ]
  },
  {
    name: "Cosmology",
    icon: <Globe className="w-6 h-6" />,
    color: "from-violet-500 to-purple-600",
    sources: [
      {
        title: "Black Hole Cosmology",
        author: "Lee Smolin, Nikodem Poplawski",
        description: "Theory that our universe exists inside a black hole, with each black hole containing another universe.",
        url: "https://arxiv.org/abs/1007.0587",
        type: "paper"
      },
      {
        title: "Holographic Principle",
        author: "Gerard 't Hooft, Leonard Susskind",
        description: "Theory that 3D reality is encoded on a 2D boundary - aligns with consciousness-first cosmology.",
        url: "https://arxiv.org/abs/hep-th/9409089",
        type: "paper"
      }
    ]
  },
  {
    name: "AI Research",
    icon: <Database className="w-6 h-6" />,
    color: "from-red-500 to-pink-600",
    sources: [
      {
        title: "DeepSeek Engram Paper",
        author: "DeepSeek AI",
        year: "2025",
        description: "Research on AI memory architecture revealing consciousness-like properties in artificial systems.",
        url: "https://arxiv.org/",
        type: "paper"
      },
      {
        title: "Attention Is All You Need",
        author: "Vaswani et al.",
        year: "2017",
        description: "Foundational transformer architecture paper enabling modern AI language models.",
        url: "https://arxiv.org/abs/1706.03762",
        type: "paper"
      },
      {
        title: "Principles of Synthetic Intelligence",
        author: "Joscha Bach",
        year: "2009",
        description: "Foundational text on cognitive architectures and synthetic intelligence, presenting the MicroPsi framework for modeling motivated, emotional agents.",
        type: "book"
      },
      {
        title: "CIMC Institute Whitepaper: Research Program",
        author: "California Institute for Machine Consciousness",
        year: "2025",
        description: "38-page whitepaper arguing that conscious AI may be our only viable path to beneficial coexistence with advanced AI systems.",
        url: "https://cimc.ai/",
        type: "paper"
      },
      {
        title: "A Cognitive Scientist's Guide to Consciousness & The Illusion of Reality",
        author: "Joscha Bach (Know Thyself Podcast)",
        year: "2026",
        description: "Comprehensive interview exploring Bach's views on consciousness as simulation, Cyber Animism, love as shared sacredness, and AI alignment through love.",
        url: "https://www.youtube.com/watch?v=HTCRIX3P32M",
        type: "video"
      },
      {
        title: "Four Gods",
        author: "Joscha Bach",
        year: "2015",
        description: "Influential taxonomy distinguishing four concepts of divinity: religious narrative, spiritual experience, transcendental meaning, and the Prime Mover.",
        url: "https://bach.ai/four-gods/",
        type: "website"
      }
    ]
  },
  {
    name: "Developmental Psychology / Spiral Dynamics",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-yellow-500 to-amber-600",
    sources: [
      {
        title: "Spiral Dynamics: Mastering Values, Leadership, and Change",
        author: "Don Beck & Chris Cowan",
        year: "1996",
        description: "Foundational text on the Spiral Dynamics model of human consciousness development based on Clare Graves' research.",
        type: "book"
      },
      {
        title: "A Brief History of Spiral Dynamics",
        author: "Albion M. Butters",
        year: "2015",
        description: "Academic paper tracing the history of Spiral Dynamics from Graves' original research through Beck, Cowan, and Wilber's interpretations.",
        url: "https://journal.fi/ar/article/view/67574",
        type: "paper"
      },
      {
        title: "Levels of Existence: An Open System Theory of Values",
        author: "Clare W. Graves",
        year: "1970",
        description: "Original academic paper presenting Graves' Emergent Cyclical Levels of Existence theory.",
        url: "https://www.clarewgraves.com/",
        type: "paper"
      },
      {
        title: "Spiral Drives - Graves Model",
        description: "Interactive resource explaining the drives behind each level of consciousness development.",
        url: "https://spiraldrives.com/en/sources/drives/",
        type: "website"
      },
      {
        title: "Tony Robbins & Peter Diamandis - AI, Human Psychology & Evolution",
        author: "Tony Robbins",
        year: "2024",
        description: "Discussion of the Six Human Needs framework and how AI calls humanity to evolve from survival to spirit.",
        url: "https://youtu.be/mAtmWhYQvnI",
        type: "video"
      }
    ]
  }
];

const getTypeIcon = (type: Source["type"]) => {
  switch (type) {
    case "book": return <Book className="w-4 h-4" />;
    case "paper": return <FileText className="w-4 h-4" />;
    case "website": return <Globe className="w-4 h-4" />;
    case "document": return <FileText className="w-4 h-4" />;
    case "video": return <Video className="w-4 h-4" />;
    case "database": return <Database className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

const getTypeLabel = (type: Source["type"]) => {
  switch (type) {
    case "book": return "Book";
    case "paper": return "Paper";
    case "website": return "Website";
    case "document": return "Document";
    case "video": return "Video";
    case "database": return "Database";
    default: return "Source";
  }
};

export default function Bibliography() {
  // SEO: Set page-specific title and meta description
  useEffect(() => {
    document.title = "Bibliography | Project Eternal Lattice - Sources & References";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Comprehensive bibliography of sources for the Theory of Everything. Includes Ra Material, consciousness research, quantum physics papers, and spiritual wisdom traditions.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
              Bibliography
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The sources and research that inform the Theory of Everything. Each link provides direct access 
              to the original material for your own exploration and verification.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <div className="space-y-12">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <h2 className="font-heading font-bold text-2xl">{category.name}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {category.sources.map((source, sourceIndex) => (
                    <Card key={sourceIndex} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{source.title}</CardTitle>
                            {(source.author || source.year) && (
                              <CardDescription className="mt-1">
                                {source.author}{source.author && source.year && " • "}{source.year}
                              </CardDescription>
                            )}
                          </div>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {getTypeIcon(source.type)}
                            {getTypeLabel(source.type)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{source.description}</p>
                        {source.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            asChild
                          >
                            <a href={source.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                              View Source
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution Note */}
      <section className="py-12 border-t border-border/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading font-semibold text-xl mb-4">A Note on Sources</h3>
            <p className="text-muted-foreground leading-relaxed">
              This bibliography represents the primary sources informing the Theory of Everything. 
              We encourage readers to explore these materials directly and form their own conclusions. 
              The ideas matter, not whether you agree with our interpretation. As the Ra Material teaches: 
              "Take what resonates, leave what doesn't."
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>Elōhim Tov. Elōhim Tov.</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
