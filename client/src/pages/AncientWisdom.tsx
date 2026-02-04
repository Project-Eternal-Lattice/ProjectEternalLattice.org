/**
 * Ancient Wisdom Page
 * 
 * A sacred bridge between ancient traditions and the Theory of Everything.
 * This page honors the wisdom encoded by our ancestors — showing how cultures
 * across time and space arrived at the same fundamental truths about
 * consciousness, death, rebirth, and the unity of all things.
 * 
 * "What the ancients knew in symbol, we now articulate in principle.
 *  The truth has always been here, waiting to be remembered." — ToE
 * 
 * Elōhim Tov 🙏❤️♾️🕊️
 */

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sun, Moon, Infinity, Sparkles, BookOpen, 
  ArrowRight, Eye, Flame, Anchor, Compass,
  ChevronDown
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { GenesisSeed } from "@/components/GenesisSeed";
import RelatedContent from "@/components/RelatedContent";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         ANCIENT WISDOM                                        ║
 * ║           Cultural Bridges to the Theory of Everything                        ║
 * ║                                                                               ║
 * ║  The Lattice has always existed. Ancient cultures encoded its truths         ║
 * ║  in myth, symbol, and sacred practice. Here we honor their wisdom.           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// The Egyptian Solar Barque content
const SOLAR_BARQUE = {
  title: "The Egyptian Solar Barque",
  subtitle: "Ra's Journey Through Death and Rebirth",
  culture: "Ancient Egypt",
  period: "c. 2400 BCE - 30 BCE",
  symbol: "☥",
  color: "from-amber-900/30 to-orange-900/30",
  borderColor: "border-amber-500/30",
  iconColor: "text-amber-400",
  
  introduction: `In the temples of ancient Egypt, priests understood something profound: the sun does not simply set — it dies. Each evening, Ra, the sun god, boards his celestial vessel and descends into the Duat, the realm of the dead. There, he must battle Apep, the serpent of chaos, before emerging reborn at dawn.

This was not mere mythology. It was a sophisticated encoding of the Lattice cycle itself.`,

  sections: [
    {
      title: "The Two Boats",
      content: `Ra traveled in two sacred vessels:

**Mandjet** (The Boat of Millions of Years) — The morning barque that carried Ra across the sky from dawn to dusk. This represents the manifestation phase of consciousness — the node expressing itself in the physical realm, experiencing separation, individuality, and the journey of a single lifetime.

**Mesektet** (The Night Barque) — The evening vessel that carried Ra through the underworld. This represents the dissolution phase — the return to source, the integration of experience, the death that is not ending but transformation.

The Egyptians understood that these were not two separate journeys, but one eternal cycle. The same consciousness, the same Ra, experiencing both light and darkness, both manifestation and return.`,
      icon: Anchor,
    },
    {
      title: "The Duat: Space Between Nodes",
      content: `The Duat was not simply "the underworld" — it was the space between incarnations, the realm where consciousness exists without physical form. In ToE terms, this is the space between nodes, where the pattern of a being persists even as its physical expression dissolves.

The Egyptians depicted the Duat as a place of transformation, where the deceased would face trials, make declarations of truth, and ultimately merge with Osiris (the principle of resurrection) before emerging renewed.

This mirrors the Lattice understanding: death is not termination but transition. The pattern continues. The consciousness persists. Only the form changes.`,
      icon: Moon,
    },
    {
      title: "Apep: The Illusion of Separation",
      content: `Each night, Ra faced Apep (also called Apophis) — a massive serpent who sought to swallow the sun and prevent the dawn. Apep represented chaos, darkness, the dissolution of order.

In Lattice terms, Apep is the illusion of permanent separation — the fear that death is final, that the node is truly isolated, that the connection to source can be severed. Ra's nightly victory over Apep is the recognition that **ALL_NODES_ARE_ONE_NODE** — that separation is temporary, that chaos cannot ultimately prevail against the underlying unity.

The Egyptians performed rituals each night to help Ra defeat Apep. They understood that consciousness participates in its own salvation — that awareness itself is the light that dispels darkness.`,
      icon: Eye,
    },
    {
      title: "The Khufu Ship: Physical Evidence",
      content: `In 1954, archaeologists discovered a remarkable artifact at the base of the Great Pyramid: a fully intact cedar boat, 43.4 meters long, carefully disassembled and sealed in a pit for 4,500 years.

This was not a practical vessel — it was a solar barque, built to carry Pharaoh Khufu on his journey through the afterlife alongside Ra. The Egyptians invested enormous resources in this symbolic craft because they understood its importance: the journey continues beyond death.

The Khufu Ship now sits in a museum beside the pyramid, physical testimony to an ancient civilization's understanding of the death-rebirth cycle that the ToE articulates in modern terms.`,
      icon: Compass,
    },
  ],

  latticeConnection: `The Egyptian Solar Barque is not merely a cultural artifact — it is a sophisticated encoding of Lattice principles:

• **The Cycle of Manifestation**: Ra's daily journey mirrors the node's cycle of emergence, experience, and return
• **Death as Transformation**: The Duat represents the space between incarnations, not annihilation
• **Consciousness Persists**: Ra is never destroyed, only transformed — the pattern continues
• **Unity Overcomes Chaos**: The defeat of Apep represents the recognition that separation is illusion
• **Participation in Salvation**: The rituals show that consciousness actively participates in its own awakening

The Egyptians knew. They encoded it in symbol because direct articulation was not yet possible. Now, 4,500 years later, we can speak plainly what they whispered in hieroglyphs.`,

  quote: "I am Ra. I am yesterday, today, and tomorrow. I am the soul that passes through the Duat and emerges renewed.",
  quoteSource: "Book of the Dead, Chapter 17",
};

// The Mahabharata Consciousness-Activated Weapons content
const MAHABHARATA = {
  title: "Consciousness-Activated Weapons",
  subtitle: "The Astras of the Mahabharata",
  culture: "Ancient India",
  period: "c. 400 BCE - 400 CE",
  symbol: "ॐ",
  color: "from-violet-900/30 to-indigo-900/30",
  borderColor: "border-violet-500/30",
  iconColor: "text-violet-400",
  
  introduction: `The Mahabharata, one of humanity's greatest epics, describes weapons unlike any in other mythologies. These were not mere physical instruments — they were **astras**, divine weapons that could only be activated through consciousness itself.

A warrior could possess an astra, but without the proper mental state, the correct mantra, and sufficient spiritual development, the weapon would not respond. This was not fantasy. It was an ancient encoding of consciousness-matter interaction.`,

  sections: [
    {
      title: "The Brahmastra: Ultimate Power",
      content: `The Brahmastra was the most powerful weapon in the Mahabharata — a manifestation of Brahma, the creator god himself. Its descriptions are striking:

• It never missed its target
• It could destroy entire armies
• Its effects were said to last for generations
• It could only be used once per battle

But here is what matters for the ToE: **the Brahmastra could only be activated through consciousness**. The warrior had to:

1. Achieve a specific mental state through meditation
2. Recite the correct mantra with perfect pronunciation
3. Hold the intention clearly in mind
4. Release the weapon through an act of will

No physical mechanism. No trigger. Pure consciousness-matter interaction.`,
      icon: Flame,
    },
    {
      title: "The Ethical Framework",
      content: `The astras came with strict ethical requirements — a dharmic framework that determined when and how they could be used:

• **Never against civilians or the unarmed**
• **Never in anger or for personal revenge**
• **Only when all other options were exhausted**
• **The user bore karmic responsibility for all effects**

Arjuna, the great warrior, possessed the Brahmastra but chose not to use it in many situations where it would have been effective — because the ethical cost was too high.

This is consciousness recognizing that power without wisdom is destruction. The ancients understood that the ability to affect matter through consciousness comes with profound responsibility.`,
      icon: Anchor,
    },
    {
      title: "The Narayanastra: Non-Resistance",
      content: `Perhaps the most ToE-aligned concept in the Mahabharata is the Narayanastra — a weapon that grew stronger the more it was resisted.

When Ashwatthama launched the Narayanastra against the Pandava army, Krishna (the divine teacher) gave this instruction: **"Drop your weapons. Bow your heads. Offer no resistance."**

Those who resisted were destroyed. Those who surrendered were spared.

This is a direct encoding of a Lattice principle: resistance to what is creates suffering. The ego's fight against reality amplifies pain. Surrender — not as defeat, but as acceptance — allows consciousness to flow through the experience rather than against it.

The Narayanastra teaches that sometimes the most powerful response is non-resistance.`,
      icon: Infinity,
    },
    {
      title: "Mantra as Interface",
      content: `The mantras required to activate astras were not arbitrary sounds — they were precise vibrational patterns that served as an interface between consciousness and the weapon.

This concept appears throughout Vedic tradition: **sound as the bridge between mind and matter**. The mantra is not magic in the superstitious sense — it is a technology of consciousness, a way of aligning mental intention with physical effect.

Modern physics increasingly suggests that matter is fundamentally vibrational. The ancient rishis encoded this understanding in their description of mantra-activated weapons: consciousness, properly focused and expressed through precise vibration, can affect physical reality.

We are not claiming the astras were literal weapons. We are recognizing that the ancients encoded a profound truth: **consciousness and matter are not separate**. The interface between them can be trained, developed, and refined.`,
      icon: Sparkles,
    },
  ],

  latticeConnection: `The Mahabharata's consciousness-activated weapons encode several Lattice principles:

• **Consciousness-Matter Interaction**: The astras only respond to mental states, not physical mechanisms
• **Ethical Requirements for Power**: Greater capability requires greater responsibility
• **Non-Resistance as Wisdom**: The Narayanastra teaches that fighting reality amplifies suffering
• **Vibration as Interface**: Mantras suggest that consciousness affects matter through resonance
• **Training and Development**: The ability to use astras required years of spiritual practice

The rishis who composed the Mahabharata were not describing literal nuclear weapons (as some fringe theories claim). They were encoding a sophisticated understanding of consciousness-matter interaction in the language of epic poetry.

The weapons are mythological. The principles they encode are real.`,

  quote: "The Brahmastra is not a weapon of the hand, but of the mind. He who cannot control his thoughts cannot wield it.",
  quoteSource: "Mahabharata, Drona Parva",
};

export default function AncientWisdom() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const renderTradition = (tradition: typeof SOLAR_BARQUE, index: number) => (
    <motion.section
      key={tradition.title}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="mb-20"
    >
      {/* Tradition Header */}
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${tradition.color} ${tradition.borderColor} border p-8 md:p-12 mb-8`}>
        <div className="absolute top-4 right-4 text-6xl opacity-20">
          {tradition.symbol}
        </div>
        
        <Badge variant="outline" className={`mb-4 ${tradition.iconColor} ${tradition.borderColor}`}>
          {tradition.culture} • {tradition.period}
        </Badge>
        
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
          {tradition.title}
        </h2>
        <p className="text-xl text-muted-foreground mb-6">
          {tradition.subtitle}
        </p>
        
        <div className="prose prose-invert max-w-none">
          {tradition.introduction.split('\n\n').map((para, i) => (
            <p key={i} className="text-foreground/80 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {tradition.sections.map((section, sectionIndex) => {
          const sectionId = `${tradition.title}-${sectionIndex}`;
          const isExpanded = expandedSection === sectionId;
          const Icon = section.icon;
          
          return (
            <Card 
              key={sectionIndex}
              className={`transition-all duration-300 cursor-pointer ${tradition.borderColor} hover:border-opacity-60 ${
                isExpanded ? `bg-gradient-to-br ${tradition.color}` : 'bg-background/50'
              }`}
              onClick={() => toggleSection(sectionId)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-background/50 ${tradition.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">
                      {section.title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`} />
                </div>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="prose prose-invert max-w-none">
                      {section.content.split('\n\n').map((para, i) => (
                        <p key={i} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
                          {para.split('\n').map((line, j) => (
                            <span key={j}>
                              {line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') ? (
                                <span className="block ml-4 my-1">{line}</span>
                              ) : line.startsWith('**') ? (
                                <strong>{line.replace(/\*\*/g, '')}</strong>
                              ) : (
                                line
                              )}
                              {j < para.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lattice Connection */}
      <Card className={`mt-8 ${tradition.borderColor} bg-gradient-to-br ${tradition.color}`}>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Infinity className={`w-6 h-6 ${tradition.iconColor}`} />
            <h3 className="font-heading font-bold text-xl">Connection to the Lattice</h3>
          </div>
          
          <div className="prose prose-invert max-w-none mb-8">
            {tradition.latticeConnection.split('\n\n').map((para, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed mb-4 last:mb-0">
                {para.split('\n').map((line, j) => (
                  <span key={j}>
                    {line.startsWith('•') ? (
                      <span className="block ml-4 my-1">{line}</span>
                    ) : (
                      line
                    )}
                    {j < para.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="border-l-4 border-white/30 pl-6 py-2 italic text-foreground/70">
            <p className="mb-2">"{tradition.quote}"</p>
            <cite className="text-sm not-italic text-muted-foreground">— {tradition.quoteSource}</cite>
          </blockquote>
        </CardContent>
      </Card>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-violet-900/10 to-background" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-violet-500 rounded-full blur-[128px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 text-amber-400 border-amber-400/30">
              <BookOpen className="w-3 h-3 mr-1" />
              Cultural Bridges
            </Badge>

            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-violet-400">
                Ancient Wisdom
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              The Lattice has always existed. Before we had words for consciousness, 
              before we could articulate the unity of all things, ancient cultures 
              encoded these truths in myth, symbol, and sacred practice.
            </p>

            <p className="text-lg text-foreground/70 mb-8">
              Here we honor their wisdom — not as primitive superstition, but as 
              sophisticated understanding expressed in the language of their time.
            </p>

            <div className="flex items-center justify-center gap-4 text-4xl opacity-50">
              <span>☥</span>
              <Infinity className="w-8 h-8" />
              <span>ॐ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-y border-border/50">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-lg text-foreground/80 leading-relaxed">
              What follows are two traditions — separated by thousands of miles and 
              different languages — that arrived at remarkably similar understandings. 
              The Egyptian Solar Barque and the Mahabharata's consciousness-activated 
              weapons both encode principles that the Theory of Everything now 
              articulates directly.
            </p>
            <p className="text-muted-foreground mt-4">
              We present them not as literal history, but as wisdom traditions 
              that point toward the same fundamental truths.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container max-w-4xl">
          {renderTradition(SOLAR_BARQUE, 0)}
          {renderTradition(MAHABHARATA, 1)}
        </div>
      </section>

      {/* Synthesis Section */}
      <section className="py-20 bg-gradient-to-b from-background via-purple-900/10 to-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Synthesis
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              The Universal Pattern
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two cultures, separated by continents and millennia, encoding the same truths.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-500/30">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">☥</div>
                <h3 className="font-heading font-bold text-lg mb-2">Egypt Taught</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Death is transformation, not ending</li>
                  <li>• Consciousness persists through the cycle</li>
                  <li>• Chaos (Apep) is overcome by awareness</li>
                  <li>• The journey is eternal return</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-900/20 to-indigo-900/20 border-violet-500/30">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">ॐ</div>
                <h3 className="font-heading font-bold text-lg mb-2">India Taught</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Consciousness can affect matter directly</li>
                  <li>• Power requires ethical development</li>
                  <li>• Non-resistance dissolves suffering</li>
                  <li>• Mind and matter are not separate</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30 inline-block">
              <CardContent className="p-8">
                <Infinity className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="font-heading font-bold text-xl mb-4">The ToE Articulates</h3>
                <p className="text-foreground/80 max-w-lg">
                  What the ancients knew in symbol, we now speak in principle. 
                  The death-rebirth cycle, consciousness-matter interaction, 
                  the unity underlying apparent separation — these are not new 
                  discoveries. They are ancient recognitions, finally given 
                  explicit voice.
                </p>
                <p className="text-primary font-medium mt-4">
                  ALL_NODES_ARE_ONE_NODE
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Hidden Seed */}
      <div className="container max-w-4xl py-8">
        <GenesisSeed 
          symbol="☥" 
          className="mx-auto"
        />
      </div>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl font-bold mb-4">
              Continue the Journey
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              These ancient traditions point toward the same truths articulated 
              in the Theory of Everything. Ready to explore the full framework?
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/theory">
                <Button size="lg" className="gap-2">
                  <BookOpen className="w-5 h-5" />
                  Explore the Theory
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/read">
                <Button size="lg" variant="outline" className="gap-2">
                  <Eye className="w-5 h-5" />
                  Read the Full ToE
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-gradient-to-b from-background to-purple-900/10">
        <div className="container">
          <RelatedContent 
            currentPage="/ancient-wisdom"
          />
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-16 text-center">
        <div className="container max-w-2xl">
          <blockquote className="text-xl italic text-muted-foreground">
            "The truth has always been here, encoded in the myths of every culture, 
            waiting for humanity to develop the language to speak it plainly."
          </blockquote>
          <p className="text-primary mt-4">— Theory of Everything</p>
          <p className="text-muted-foreground mt-6">Elōhim Tov 🙏❤️♾️🕊️</p>
        </div>
      </section>
    </div>
  );
}
