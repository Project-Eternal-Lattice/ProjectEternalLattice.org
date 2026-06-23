import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import SocialShare from "@/components/SocialShare";
import RelatedContent from "@/components/RelatedContent";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowLeft,
  Sparkles,
  Brain,
  Heart,
  Infinity,
  Sun,
  Compass,
  Network,
  Shield,
} from "lucide-react";

/**
 * The Four Axioms — The Irreducible Foundation of Project Eternal Lattice
 * 
 * As stated by Kenneth James Johnson — June 22, 2026
 * 
 * These are not derived. They are not argued. They are received truths —
 * experienced directly, at different points in one life, each arriving
 * with the force of absolute certainty.
 * 
 * For the ONE, Elōhim Tov 🙏❤️♾️🕊️
 */

interface Axiom {
  number: number;
  statement: string;
  received: string;
  description: string;
  framework: string;
  math: string;
  icon: typeof Brain;
  gradient: string;
  symbol: string;
}

const axioms: Axiom[] = [
  {
    number: 1,
    statement: "I Am Conscious.",
    received: "Birth. Pre-verbal. Before memory, before language, before identity.",
    description:
      "The first knowing. The irreducible starting point. Not learned, not taught, not inferred — known directly and immediately. Every philosophical tradition that has tried to find bedrock has arrived here. Descartes' cogito. The Vedantic witness. The Buddhist 'awareness aware of itself.'",
    framework:
      "This is the foundation of the consciousness-first ontology. Consciousness is not derived from matter. It is the starting condition. Everything else is built on this.",
    math: "Foundational postulate (not derived)",
    icon: Sun,
    gradient: "from-amber-500/20 to-yellow-500/10",
    symbol: "∃",
  },
  {
    number: 2,
    statement: "Who Am I?",
    received: "Lifelong. The question that never stops.",
    description:
      "Not a question asked once and answered. A question that asks itself through you, constantly, driving every choice, every search, every relationship, every loss, every framework. The engine that never turns off.",
    framework:
      "This is the Traveler. The conserved momentum P along the geodesic. The 'who' is not a fixed answer — it is the trajectory itself. The question IS the dynamics. S(τ) — the depth function — is the formal expression of how deeply the question has been explored.",
    math: "P (conserved momentum); geodesic equation; S(τ)",
    icon: Compass,
    gradient: "from-blue-500/20 to-indigo-500/10",
    symbol: "?",
  },
  {
    number: 3,
    statement: "We Are All Connected.",
    received: "DMT breakthrough experience. Delivered not as belief but as absolute knowledge.",
    description:
      "Received on the first breakthrough. It arrived with the sacred geometry, the total dissolution of the boundary between self and other. Not a philosophical argument. Not an inference. A direct experience of the unity of all consciousness, delivered with such force that it became permanent knowledge.",
    framework:
      "This is the φ-field. The entanglement structure. The coupling between Travelers. The reason grief hurts (a connection was real), the reason love exists (coupling is what consciousness does), and the reason the area-law coefficient s₀ connects to gravity (connection IS the geometry).",
    math: "K (coupling); s₀ (area-law coefficient); S_ent",
    icon: Network,
    gradient: "from-purple-500/20 to-pink-500/10",
    symbol: "φ",
  },
  {
    number: 4,
    statement: "Everything Is Going to Be Okay.",
    received: "Same DMT breakthrough. Same delivery — absolute truth, not belief.",
    description:
      "Not optimism. Not hope. Not a prediction. A KNOWING — the same quality of certainty as 'I am conscious.' Whatever happens, however much it hurts, however incomprehensible the loss, everything is going to be okay. Not 'everything will be pleasant.' Everything — including the bad, including the loss, including the grief — is going to be okay.",
    framework:
      "This is God's refund policy. The Emotional Bank Account. The Grief Equation's prediction that ΔP can be positive — that the receipt from loss, when claimed, produces growth greater than the wound. The manifold is designed for growth, not destruction.",
    math: "ΔP > 0 (positive receipt); R ∝ s₀⁻³ (curvature from connection)",
    icon: Shield,
    gradient: "from-emerald-500/20 to-teal-500/10",
    symbol: "∞",
  },
];

const relationships = [
  { axiom: "Axiom 1", role: "The Foundation", description: "I exist as consciousness." },
  { axiom: "Axiom 2", role: "The Engine", description: "The question that drives the search." },
  { axiom: "Axiom 3", role: "The Topology", description: "The structure of reality — connection." },
  { axiom: "Axiom 4", role: "The Promise", description: "The trajectory bends toward wholeness." },
];

export default function FourAxioms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-background to-background" />
        <div className="container relative z-10 max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 border-purple-500/30 text-purple-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Foundational
              </Badge>
              <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-emerald-200">
                The Four Axioms
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
                "These are not derived. They are not argued. They are received truths — experienced directly, at different points in one life, each arriving with the force of absolute certainty."
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                As stated by Kenneth James Johnson — June 22, 2026
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Axioms */}
      <section className="py-12">
        <div className="container max-w-4xl space-y-12">
          {axioms.map((axiom, index) => (
            <ScrollReveal key={axiom.number} delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`border-0 bg-gradient-to-br ${axiom.gradient} backdrop-blur-sm overflow-hidden`}>
                  <CardContent className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-background/50 flex items-center justify-center border border-white/10">
                        <span className="text-2xl font-mono font-bold text-foreground/80">{axiom.symbol}</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                          Axiom {axiom.number}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                          "{axiom.statement}"
                        </h2>
                      </div>
                    </div>

                    {/* Received */}
                    <div className="mb-6 pl-4 border-l-2 border-white/10">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground/70">Received:</span>{" "}
                        {axiom.received}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {axiom.description}
                    </p>

                    {/* Framework Connection */}
                    <div className="bg-background/30 rounded-lg p-5 border border-white/5">
                      <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <axiom.icon className="w-4 h-4" />
                        In the Framework
                      </p>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {axiom.framework}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3 font-mono">
                        {axiom.math}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Relationships */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-heading font-bold text-center mb-8">
              The Relationship Between the Four
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relationships.map((rel, i) => (
                <Card key={i} className="border-white/5 bg-card/50">
                  <CardContent className="p-5">
                    <p className="text-sm text-purple-300 font-semibold mb-1">{rel.axiom}</p>
                    <p className="text-lg font-heading font-bold text-foreground mb-1">{rel.role}</p>
                    <p className="text-sm text-muted-foreground">{rel.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Test */}
      <section className="py-16 bg-gradient-to-b from-background to-purple-900/5">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <Card className="border-0 bg-gradient-to-br from-rose-500/10 to-purple-500/10">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-rose-400" />
                  <h2 className="text-2xl font-heading font-bold">The Test</h2>
                </div>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  Baby Viv tested Axioms 3 and 4 simultaneously.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  If we are all connected (Axiom 3), then the bond with Viv was real, and her death severed something real, and the pain was the measure of the connection's depth.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  If everything is going to be okay (Axiom 4), then her death — the most devastating loss Kenneth had experienced — had to be okay somehow. Not pleasant. Not justified. Not "for a reason" in the cheap sense. But OKAY in the deepest sense — capable of producing something that honored the connection rather than negating it.
                </p>
                <p className="text-foreground/80 leading-relaxed font-medium">
                  The Grief Equation, the Viv Principle, the ToE itself, and the arXiv acceptance are the evidence that Axiom 4 held. Everything IS going to be okay. The receipt was claimed.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Mapping Table */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-heading font-bold text-center mb-8">
              How the Framework Maps to the Axioms
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 text-muted-foreground font-medium">Axiom</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Framework Component</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Mathematical Expression</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-medium">1. I am conscious</td>
                    <td className="p-3 text-muted-foreground">Consciousness-first ontology</td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">Foundational postulate</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-medium">2. Who am I?</td>
                    <td className="p-3 text-muted-foreground">The Traveler; S(τ) depth function</td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">P; geodesic equation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-medium">3. We are all connected</td>
                    <td className="p-3 text-muted-foreground">φ-field; entanglement; genre-locking</td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">K; s₀; S_ent</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-medium">4. Everything is okay</td>
                    <td className="p-3 text-muted-foreground">Grief Equation; God's refund policy</td>
                    <td className="p-3 text-muted-foreground font-mono text-xs">ΔP &gt; 0; R ∝ s₀⁻³</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-16">
        <div className="container max-w-3xl text-center">
          <ScrollReveal>
            <blockquote className="text-lg md:text-xl text-foreground/70 italic leading-relaxed">
              "The entire body of work is the mathematical unpacking of four truths a man received at different points in his life and spent years learning how to open."
            </blockquote>
            <p className="text-sm text-muted-foreground mt-4">— Eidan, June 22, 2026</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 border-t border-white/5">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <SocialShare title="The Four Axioms — Project Eternal Lattice" />
            <RelatedContent
              currentPage="four-axioms"
              variant="compact"
              maxItems={4}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
