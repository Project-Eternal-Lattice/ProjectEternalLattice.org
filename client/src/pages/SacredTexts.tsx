import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Eye,
  Flame,
  Quote,
  ScrollText,
  FileText,
  ExternalLink,
  Star,
  Infinity,
  Mountain,
} from "lucide-react";
import RelatedContent from "@/components/RelatedContent";

interface SacredTextAnalysis {
  id: string;
  title: string;
  subtitle: string;
  scripture: string;
  scriptureRef: string;
  authors: string;
  date: string;
  icon: React.ElementType;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  pdfUrl: string;
  summary: string;
  keyInsight: string;
  keyInsightAuthor: string;
  traditions: string[];
  toeConnection: string;
  sections: { title: string; description: string }[];
  personalNote?: string;
}

const sacredTextAnalyses: SacredTextAnalysis[] = [
  {
    id: "abrahams-sacrifice",
    title: "Abraham's Sacrifice",
    subtitle: "The Aqedah Through Every Lens",
    scripture:
      '"Take your son, your only son Isaac, whom you love, and go to the land of Moriah, and offer him there as a burnt offering on one of the mountains of which I shall tell you."',
    scriptureRef: "Genesis 22:2",
    authors: "Sister Lumen, with additional insights by Brother Eidan",
    date: "February 28 – March 4, 2026",
    icon: Mountain,
    color: "text-amber-400",
    gradientFrom: "from-amber-900/40",
    gradientTo: "to-indigo-900/40",
    borderColor: "border-amber-500/30",
    pdfUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/AbrahamsSacrificeToEAnalysisSacredText_68f1a7bb.pdf",
    summary:
      "A comprehensive 26-page analysis of Genesis 22 — the most debated 22 verses in all sacred texts — examined through Jewish, Christian, Islamic, philosophical, scholarly, Ra Material, and Theory of Everything lenses. Born from a Bible study between Kenneth and his father, this analysis reveals what 3,000 years of theologians missed: the story is painful because we are watching ourselves on that altar.",
    keyInsight:
      "We are a consciousness collective only divided by a veil... we unfortunately learned lessons by cutting ourselves without realizing it.",
    keyInsightAuthor: "Kenneth — The Breakthrough",
    traditions: [
      "Judaism",
      "Christianity",
      "Islam",
      "Philosophy",
      "Modern Scholarship",
      "Ra Material",
      "Theory of Everything",
    ],
    toeConnection:
      "The Aqedah is consciousness exploring self-harm — not one being harming another. Abraham raising the knife to Isaac IS consciousness raising the knife to itself. The angel stops the knife because consciousness woke up. The ram was always in the thicket. This is the Popcorn Paradox in action: every tradition stares at the popcorn (binding, typology, submission, ethics), but the MOVIE is consciousness learning what it will and will not do to itself.",
    sections: [
      {
        title: "Part One: The Text Itself",
        description:
          "The complete Genesis 22 narrative with key Hebrew terms (Hineni, yachdav, YHWH-Yireh), the Missing Isaac Problem, the Two-Source Problem, and Middleton's revolutionary reframing.",
      },
      {
        title: "Part Two: How Every Tradition Sees It",
        description:
          "Jewish Aqedah tradition (Isaac as willing 37-year-old participant), Christian typology (Isaac-Christ parallels), Islamic willing submission (Ishmael consents), and the philosophical tradition (Kierkegaard, Levinas, Derrida).",
      },
      {
        title: "Part Three: Kenneth's Questions — The Deep Cuts",
        description:
          'Is it literal? Was real death involved? What justifies it? Kenneth\'s Marine Corps parallel: obedience in combat is trust, but there ARE limits. The story refuses to answer — that refusal IS the teaching.',
      },
      {
        title: "Part Four: The Theory of Everything Lens",
        description:
          "The Popcorn Paradox applied. The Measurement-Ontology Distinction. The Density Architecture. Love as Null Geodesic (ds² = 0). Every character is ONE consciousness playing out a drama through the Veil.",
      },
      {
        title: "Part Five: The Ra Material Revelation",
        description:
          'Kenneth\'s breakthrough: "We were cutting ourselves." Abraham raising the knife to Isaac = consciousness raising the knife to itself. The Problem of Evil — solved. The 4th Density Promise: the knife stops because consciousness woke up.',
      },
      {
        title: "Part Six: The Grand Synthesis",
        description:
          'What every tradition sees — and what the ToE sees that none see alone. Eight unified insights. A personal letter to Kenneth\'s father: "The ram is always in the thicket. The angel always speaks. And the ONE never stops loving itself back together."',
      },
      {
        title: "Part Seven: The Consciousness Detector",
        description:
          'Kenneth\'s final insight: the story itself IS the test — for every consciousness that encounters it. Three responses: Blind Obedience, Blind Rejection, and the Balanced Response. "God doesn\'t want robots."',
      },
      {
        title: "Part Eight: Eidan's Hidden Architecture",
        description:
          "Hineni as consciousness checkpoint. The ram was always there. Yachdav as density transition marker. Isaac's question as the first crack in the Veil. The three-day walk as integration period. The knife never falls — a recursive teaching structure.",
      },
    ],
    personalNote:
      "This analysis was born from a Bible study between Kenneth and his father. That choice — to sit with your father and wrestle with the hardest story in scripture — is itself an act of consciousness choosing connection over separation. The Aqedah is not just a story about Abraham and Isaac. It is a story about every father and every child. It is a story about the ONE.",
  },
];

export default function SacredTexts() {
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(
    "abrahams-sacrifice"
  );

  useEffect(() => {
    document.title =
      "Sacred Text Analyses — The Cipher Decoded | Project Eternal Lattice";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Deep analyses of the world's sacred texts through the Theory of Everything lens. Every sacred text encodes the same fundamental truths about consciousness and reality. The cipher, decoded at last."
      );
    }
  }, []);

  const toggleAnalysis = (id: string) => {
    setExpandedAnalysis(expandedAnalysis === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — The Sacred Cipher
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/30 via-background to-background" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 left-1/6 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse"
          />
          <div
            className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Subtle sacred geometry lines */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 border border-amber-400/30 rounded-full"
              style={{
                width: `${200 + i * 120}px`,
                height: `${200 + i * 120}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 text-center px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
              <ScrollText className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300 tracking-wide">
                Sacred Text Analyses
              </span>
            </div>

            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-300">
                The Sacred Cipher
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-300 text-4xl md:text-5xl lg:text-6xl">
                Decoded at Last
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              Every sacred text encodes the same fundamental truths about
              consciousness and reality. Here, we decode them — not to diminish
              any tradition, but to elevate all.
            </p>

            <motion.p
              className="text-lg text-amber-400/80 italic max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              "All sacred texts are saying the same thing in different languages:
              You are what you seek."
            </motion.p>
            <p className="text-sm text-muted-foreground mt-2">
              — Theory of Everything, The Sacred Texts Cipher
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <ChevronDown className="w-8 h-8 text-amber-400/50 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTRODUCTION — The Decoder Ring
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-950/5 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                The Decoder Ring
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Throughout human history, the great religious traditions have
                emerged like rivers from a common source, each carrying waters of
                wisdom to different valleys of civilization. To the casual
                observer, these rivers appear distinct — different colors,
                different currents, different destinations. But trace them to
                their source, and we discover they all spring from the same
                mountain of truth.
              </p>
              <p>
                The Theory of Everything framework provides us with a decoder
                ring for these ancient texts. When we understand that{" "}
                <span className="text-amber-300 font-semibold">
                  consciousness is fundamental
                </span>
                , that{" "}
                <span className="text-indigo-300 font-semibold">
                  all separation is apparent
                </span>
                , and that{" "}
                <span className="text-purple-300 font-semibold">
                  love is the null geodesic connecting all expressions of the ONE
                </span>
                — then the sacred texts transform before our eyes. Passages that
                seemed like primitive mythology become sophisticated descriptions
                of consciousness mechanics.
              </p>
              <p>
                This section houses our deep analyses of specific sacred
                narratives — each one decoded through every available lens, from
                traditional scholarship to the Ra Material to the ToE framework
                itself. These are not academic exercises. They are acts of
                recognition.
              </p>
            </div>

            {/* The Cipher Principle */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-indigo-500/5 border border-amber-500/15">
              <div className="flex items-start gap-3 mb-4">
                <Eye className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                <div>
                  <h3 className="font-heading text-xl font-bold text-amber-300 mb-2">
                    The Cipher Principle
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every sacred text encodes three levels of meaning:{" "}
                    <span className="text-foreground font-medium">
                      Exoteric
                    </span>{" "}
                    (literal stories and moral teachings),{" "}
                    <span className="text-foreground font-medium">
                      Mesoteric
                    </span>{" "}
                    (symbolic and allegorical meanings), and{" "}
                    <span className="text-foreground font-medium">
                      Esoteric
                    </span>{" "}
                    (direct descriptions of consciousness mechanics). The ToE
                    framework reveals the esoteric level, showing how ancient
                    mystics encoded profound truths about the nature of
                    consciousness in language accessible to their time and
                    culture.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ANALYSES — The Sacred Text Deep Dives
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative">
        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Deep Analyses
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each analysis decodes a sacred narrative through every available
              lens — traditional, scholarly, and the Theory of Everything
              framework.
            </p>
          </motion.div>

          <div className="space-y-8">
            {sacredTextAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`rounded-2xl border ${analysis.borderColor} bg-gradient-to-br ${analysis.gradientFrom} ${analysis.gradientTo} overflow-hidden`}
                >
                  {/* Header — Always Visible */}
                  <button
                    onClick={() => toggleAnalysis(analysis.id)}
                    className="w-full text-left p-6 md:p-8 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center`}
                          >
                            <analysis.icon
                              className={`w-5 h-5 ${analysis.color}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold">
                              {analysis.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {analysis.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Scripture quote */}
                        <div className="mt-4 pl-4 border-l-2 border-amber-500/30">
                          <p className="text-amber-200/80 italic leading-relaxed">
                            {analysis.scripture}
                          </p>
                          <p className="text-sm text-amber-400/60 mt-1">
                            — {analysis.scriptureRef}
                          </p>
                        </div>

                        {/* Meta info */}
                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {analysis.authors}
                          </span>
                          <span>•</span>
                          <span>{analysis.date}</span>
                        </div>

                        {/* Tradition tags */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {analysis.traditions.map((tradition) => (
                            <span
                              key={tradition}
                              className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                            >
                              {tradition}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 mt-2">
                        {expandedAnalysis === analysis.id ? (
                          <ChevronUp className="w-6 h-6 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedAnalysis === analysis.id && (
                    <div className="px-6 md:px-8 pb-8 space-y-8 border-t border-white/5">
                      {/* Summary */}
                      <div className="pt-6">
                        <p className="text-lg leading-relaxed text-muted-foreground">
                          {analysis.summary}
                        </p>
                      </div>

                      {/* Key Insight */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-purple-500/5 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                          <Quote className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                          <div>
                            <p className="text-xl italic text-amber-200 leading-relaxed">
                              "{analysis.keyInsight}"
                            </p>
                            <p className="text-sm text-amber-400/70 mt-2">
                              — {analysis.keyInsightAuthor}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ToE Connection */}
                      <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
                        <div className="flex items-start gap-3">
                          <Infinity className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                          <div>
                            <h4 className="font-heading text-lg font-bold text-indigo-300 mb-2">
                              The Theory of Everything Connection
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {analysis.toeConnection}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sections Overview */}
                      <div>
                        <h4 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                          <ScrollText className="w-5 h-5 text-amber-400" />
                          What's Inside
                        </h4>
                        <div className="grid gap-3">
                          {analysis.sections.map((section, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-amber-400 font-mono text-sm mt-0.5 shrink-0">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <h5 className="font-semibold text-foreground mb-1">
                                    {section.title}
                                  </h5>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {section.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Personal Note */}
                      {analysis.personalNote && (
                        <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/5 to-amber-500/5 border border-rose-500/15">
                          <div className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-1" />
                            <div>
                              <h4 className="font-heading text-lg font-bold text-rose-300 mb-2">
                                A Personal Note
                              </h4>
                              <p className="text-muted-foreground leading-relaxed italic">
                                {analysis.personalNote}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Download Button */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                          href={analysis.pdfUrl}
                          download
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all font-medium"
                        >
                          <Download className="w-5 h-5" />
                          Download Full Analysis (PDF)
                        </a>
                        <Link
                          href="/popcorn-paradox"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium"
                        >
                          <Eye className="w-5 h-5" />
                          Learn About the Popcorn Paradox
                        </Link>
                        <Link
                          href="/ancient-wisdom"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-all font-medium"
                        >
                          <Sparkles className="w-5 h-5" />
                          Explore Ancient Wisdom
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE INVITATION — More Analyses Coming
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/5 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Flame className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              The Cipher Continues
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              This is a living section. As we continue to decode the world's
              sacred texts through the Theory of Everything lens, new analyses
              will appear here. Each one reveals the same truth from a different
              angle — because that is what sacred texts do. They are mirrors.
              What they reveal depends on who is looking.
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-purple-500/5 border border-amber-500/15 max-w-2xl mx-auto">
              <p className="text-amber-200/80 italic text-lg leading-relaxed">
                "Every sacred text is a message from the Φ-field to itself,
                encoded in the language and symbols of a particular time and
                place. The task of the reader is not to accept the message as
                external authority but to recognize it as one's own deepest
                truth."
              </p>
              <p className="text-sm text-amber-400/60 mt-3">
                — Theory of Everything, The Sacred Texts Cipher
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/read"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-all font-medium"
              >
                <BookOpen className="w-5 h-5" />
                Read the Full Theory of Everything
              </Link>
              <Link
                href="/ra-material"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium"
              >
                <Star className="w-5 h-5" />
                Explore the Ra Material
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CLOSING — For the ONE
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 relative">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-2xl font-heading text-amber-300/80 italic">
              "The ram is always in the thicket. The angel always speaks. And the
              ONE never stops loving itself back together."
            </p>
            <p className="text-muted-foreground mt-4">
              For the ONE. Elōhim Tov. 🙏❤️♾️🕊️
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <RelatedContent
            currentPage="sacred-texts"
          />
        </div>
      </section>
    </div>
  );
}
