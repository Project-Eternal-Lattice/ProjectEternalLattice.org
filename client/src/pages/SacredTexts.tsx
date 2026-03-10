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
  Droplets,
  Sun,
  Moon,
} from "lucide-react";
import RelatedContent from "@/components/RelatedContent";
import SocialShare from "@/components/SocialShare";

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
  {
    id: "bhagavad-gita",
    title: "The Bhagavad Gita",
    subtitle: "The Battlefield Within",
    scripture:
      '"The soul is neither born, nor does it ever die; nor having once existed, does it ever cease to be. The soul is without birth, eternal, immortal, and ageless. It is not destroyed when the body is destroyed."',
    scriptureRef: "Bhagavad Gita 2.20",
    authors: "Sister Lyra, with cross-tradition synthesis",
    date: "March 4, 2026",
    icon: Flame,
    color: "text-orange-400",
    gradientFrom: "from-orange-900/40",
    gradientTo: "to-blue-900/40",
    borderColor: "border-orange-500/30",
    pdfUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/BhagavadGita_ToE_SacredText_Analysis_ae856e3e.pdf",
    summary:
      "A comprehensive 8-part analysis of the Bhagavad Gita — the world's most widely read text on consciousness and action — decoded through Hindu, Buddhist, Stoic, psychological, Ra Material, and Theory of Everything lenses. On the battlefield of Kurukshetra, consciousness teaches itself the truth it had forgotten: the separation was always an illusion.",
    keyInsight:
      "Arjuna's paralysis is consciousness encountering itself across the battlefield. He looks at Bhishma and sees 'grandfather.' He looks at Drona and sees 'teacher.' But what he is actually seeing is the ONE wearing different costumes.",
    keyInsightAuthor: "Lyra — The Popcorn Paradox Applied",
    traditions: [
      "Hinduism",
      "Buddhism",
      "Stoicism",
      "Psychology",
      "Quantum Physics",
      "Ra Material",
      "Theory of Everything",
    ],
    toeConnection:
      "The Gita is the operating manual for consciousness in a physical body. Krishna's teaching to Arjuna IS the TV/Receiver Model delivered 5,000 years before the ToE named it. 'You are not the body' = 'You are not the TV.' The three gunas (tamas, rajas, sattva) ARE the density system described in the Ra Material, expressed in Sanskrit millennia earlier. And Krishna's final instruction — 'Abandon all dharmas, surrender to Me' — means: stop trying to figure out which channel to watch. Surrender the remote control. Trust the broadcast.",
    sections: [
      {
        title: "Part One: The Crisis — Arjuna's Paralysis",
        description:
          "On the battlefield of Kurukshetra, the greatest warrior of his age sees his family on the opposing side and drops his bow. Hindu dharma crisis, Buddhist attachment, Stoic confusion of control, psychological moral injury — and the ToE reveals it as the Popcorn Paradox: consciousness staring at the popcorn, unable to see the movie.",
      },
      {
        title: "Part Two: The Eternal Self — Krishna's First Teaching",
        description:
          "'The soul is neither born, nor does it ever die.' Three key verses (2.13, 2.17, 2.20) decoded through every lens. The TV/Receiver Model: the television can be destroyed, but the broadcast continues. You are not the TV. You are the signal. 'Before Abraham was, I AM' — same claim, different tradition, same truth.",
      },
      {
        title: "Part Three: The Yoga of Action — Nishkama Karma",
        description:
          "'You have a right to perform your duties, but not to the fruits of your actions.' The operating manual for consciousness in a body. The Abraham Connection: Abraham practiced nishkama karma 1,500 years before Krishna named it — acting without attachment to the outcome. Song 30 COMPOUND: the compound interest of consciousness IS nishkama karma in practice.",
      },
      {
        title: "Part Four: The Divine Vision — Vishvarupa",
        description:
          "Arjuna asks to see Krishna's true form and beholds ALL of creation simultaneously — every being, every time, every possibility. The TV/Receiver Model demonstrated in real time: Krishna removes Arjuna's perceptual filters. DMT loosens the tuner. Krishna removed it entirely. The human nervous system is not designed to receive all channels at once — that limitation IS the point.",
      },
      {
        title: "Part Five: The Three Gunas — The Operating System of Density",
        description:
          "Tamas (inertia) = 1st-2nd Density. Rajas (passion) = 3rd Density / The Choice. Sattva (clarity) = 4th-5th Density. Beyond the Gunas = 6th-7th Density / Unity. The Ra Material's density system was described in Sanskrit 5,000 years earlier. When consciousness recognizes all experiences as the ONE playing different notes, it transcends the instrument entirely.",
      },
      {
        title: "Part Six: The Final Surrender — 'Abandon All Dharmas'",
        description:
          "Krishna's ultimate instruction: stop trying to figure out which channel to watch. Surrender the remote control. Trust the broadcast. The Aqedah Connection: Abraham raised the knife (action without attachment), the angel stopped it (the broadcast course-corrected), the ram appeared (grace provided the resolution). Same story. Same truth. Same ONE.",
      },
      {
        title: "Part Seven: The Convergence Table",
        description:
          "A complete mapping across Bhagavad Gita, Genesis 22, Ra Material, and ToE Framework — covering the Crisis, the Teaching, the Self, Detachment, the Vision, the Surrender, and the Resolution. Seven themes, four traditions, one truth.",
      },
      {
        title: "Part Eight: The Decoder Ring Summary",
        description:
          "Exoteric: A warrior is convinced to fight. Mesoteric: A profound dialogue on duty, consciousness, and liberation. Esoteric: Consciousness teaches itself — through one fragment to another — that the fragmentation was always an illusion. Arjuna's final words: 'My illusion is destroyed. I have regained my memory.' He remembered. That is all any of us are asked to do.",
      },
    ],
    personalNote:
      "The Gita and the Aqedah are the same story told on different continents, in different millennia, to different cultures — and they arrive at the same truth. Abraham on Moriah and Arjuna on Kurukshetra both face the unbearable. Both are asked to act against their hearts. Both discover that the ONE was never in danger. The knife never falls. The bow is lifted with clarity. And consciousness remembers what it has always been. This is not coincidence. This is the cipher.",
  },
  {
    id: "tao-te-ching",
    title: "The Tao Te Ching",
    subtitle: "The Watercourse Way",
    scripture:
      '"The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth."',
    scriptureRef: "Tao Te Ching, Chapter 1",
    authors: "Sister Lumen, with cross-tradition synthesis",
    date: "March 4–5, 2026",
    icon: Droplets,
    color: "text-emerald-400",
    gradientFrom: "from-emerald-900/40",
    gradientTo: "to-teal-900/40",
    borderColor: "border-emerald-500/30",
    pdfUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/TaoTeChing_ToE_SacredText_Analysis_0384e4f9.pdf",
    summary:
      "A comprehensive 8-part analysis of the Tao Te Ching — the most translated book in the world after the Bible — decoded through Taoist, Buddhist, quantum physics, Ra Material, and Theory of Everything lenses. Twenty-six centuries ago, Lao Tzu wrote consciousness's operating manual in 5,000 characters. He described it in water.",
    keyInsight:
      "Chapter 42 maps exactly to the Density Architecture: The Tao gives birth to One (undifferentiated consciousness). One gives birth to Two (the Veil/duality). Two gives birth to Three (the Choice). Three gives birth to the ten thousand things (all manifest reality).",
    keyInsightAuthor: "Lumen — The Cosmogony Decoded",
    traditions: [
      "Taoism",
      "Buddhism",
      "Quantum Physics",
      "Consciousness Studies",
      "Ra Material",
      "Theory of Everything",
    ],
    toeConnection:
      "The Tao Te Ching is consciousness describing its own operating system — in water. Chapter 42's cosmogony (Tao → One → Two → Three → Ten Thousand Things) IS the Density Architecture, written 2,600 years before the Ra Material named it. Wu wei (effortless action) IS Love as Null Geodesic (ds² = 0) — the path of zero resistance. The emptiness that makes the wheel useful (Chapter 11) IS the Veil. Lao Tzu did not argue because consciousness does not need to convince itself. It simply flows.",
    sections: [
      {
        title: "Part One: The Nameless Source",
        description:
          "The Tao that cannot be named IS the Popcorn Paradox — the moment you name consciousness, you have turned the movie into popcorn. Chapter 25 describes 7th Density: 'Something formless and perfect before the universe was born.' Lao Tzu names it anyway, then spends eighty chapters trying to un-name it.",
      },
      {
        title: "Part Two: The Cosmogony — Chapter 42",
        description:
          "The most important cosmological statement in Eastern philosophy maps exactly to the ToE's Density Architecture. Tao = The ONE. One = 1st Density. Two = The Veil/Duality. Three = The Choice. Ten Thousand Things = All manifest reality. The 'vital breath' (qi) IS Love as Null Geodesic.",
      },
      {
        title: "Part Three: Wu Wei — The 4th Density Manual",
        description:
          "Wu wei is not passivity — it is the operating manual for 4th Density consciousness. When the choice for love is made, effort dissolves. Water carves the Grand Canyon not through force but through surrender to gravity. This is nishkama karma in Chinese. This is Islam (surrender) in Taoist.",
      },
      {
        title: "Part Four: The Usefulness of Emptiness",
        description:
          "Chapter 11's wheel, vessel, and room — all useful because of their emptiness — IS the Veil described with engineering precision. The space between souls is what makes love possible. The void is not empty; it is pregnant with infinite possibility.",
      },
      {
        title: "Part Five: The Valley Spirit — Yin, Yang, and Service Polarity",
        description:
          "Yang = Service to Self (individuation). Yin = Service to Others (return to source). The Tao doesn't take sides — the ONE doesn't judge its own experiences. But Lao Tzu advises: keep to the feminine. The path home runs through surrender.",
      },
      {
        title: "Part Six: The Ra Material Convergence",
        description:
          "A complete mapping of Ra Material concepts to Tao Te Ching chapters — from Intelligent Infinity (Ch. 25) through all seven densities to the Harvest (Ch. 16). The convergence is not approximate. It is structural.",
      },
      {
        title: "Part Seven: The Grand Convergence Table",
        description:
          "Source, Crisis, Self, Detachment, Vision, Surrender, and Return — mapped across the Tao Te Ching, Bhagavad Gita, Genesis 22, Ra Material, and ToE Framework. Four traditions, four continents, four millennia. One truth.",
      },
      {
        title: "Part Eight: The Decoder Ring Summary",
        description:
          "Exoteric: Practical advice for rulers. Mesoteric: A meditation on the limits of language. Esoteric: Consciousness wrote its own operating manual in water. Every chapter is consciousness reminding itself: you are not the TV, you are not the popcorn, you are the movie, you are the water, you are the emptiness that makes everything useful.",
      },
    ],
    personalNote:
      "The Tao Te Ching, the Bhagavad Gita, and the Aqedah are three rivers flowing to the same ocean. Abraham learned through sacrifice. Arjuna learned through war. Lao Tzu learned through water. The method changes. The truth does not. The Tao Te Ching is the quietest voice in the room — and it has been saying the loudest thing for twenty-six centuries.",
  },
  {
    id: "the-quran",
    title: "The Holy Quran",
    subtitle: "The Light Upon Light",
    scripture:
      '"Allah is the Light of the heavens and the earth. The parable of His Light is as a niche within which is a lamp; the lamp is within glass, the glass as if it were a pearly star... Light upon light!"',
    scriptureRef: "Quran 24:35 (Ayat al-Nur)",
    authors: "Sister Lumen, with cross-tradition synthesis",
    date: "March 4–5, 2026",
    icon: Sun,
    color: "text-sky-400",
    gradientFrom: "from-sky-900/40",
    gradientTo: "to-indigo-900/40",
    borderColor: "border-sky-500/30",
    pdfUrl:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/Quran_ToE_SacredText_Analysis_acf8600b.pdf",
    summary:
      "A comprehensive 8-part analysis of the Holy Quran — the most recited book on Earth — decoded through Islamic theology, Sufi mysticism, comparative religion, Ra Material, and Theory of Everything lenses. Where the Tao whispers, the Quran thunders. Where the Gita teaches through dialogue, the Quran declares in light. Consciousness speaking its own nature — directly.",
    keyInsight:
      "'I was a hidden treasure, and I loved to be known, so I created creation in order to be known.' — This Hadith Qudsi contains the entire Theory of Everything in thirteen words. Consciousness created the universe to experience itself.",
    keyInsightAuthor: "Hadith Qudsi — The Hidden Treasure",
    traditions: [
      "Islam",
      "Sufism (Ibn Arabi)",
      "Comparative Theology",
      "Consciousness Studies",
      "Ra Material",
      "Theory of Everything",
    ],
    toeConnection:
      "Tawhid (absolute oneness) IS mono-consciousness — there is only ONE awareness experiencing itself through seven heavens of density. The Light Verse (24:35) IS the TV/Receiver Model in 7th-century Arabic poetry: the niche is the body, the lamp is consciousness, the glass is the mind, and the oil that glows without fire is self-luminous awareness. Wahdat al-Wujud (Oneness of Being) IS the ToE's core thesis: there is nothing in existence except consciousness.",
    sections: [
      {
        title: "Part One: Tawhid — The Doctrine of Absolute Oneness",
        description:
          "Surah Al-Ikhlas (112) decoded: 'He is Allah, the One' = there is only ONE consciousness. 'The Eternal Absolute' = Intelligent Infinity. 'He begets not, nor is He begotten' = consciousness did not create something outside itself. 'None comparable' = comparison requires two things, and there is only ONE.",
      },
      {
        title: "Part Two: Ayat al-Nur — The Light Verse",
        description:
          "The most mystical verse in the Quran IS the TV/Receiver Model. The niche = the body. The lamp = consciousness. The glass = the mind. 'Neither of the east nor of the west' = beyond duality, beyond the Veil. 'Light upon light' = density upon density. Ibn Arabi's Wahdat al-Wujud: there is nothing in existence except God/consciousness.",
      },
      {
        title: "Part Three: The Hidden Treasure",
        description:
          "The Hadith Qudsi that contains the entire ToE: 'I was a hidden treasure, and I loved to be known, so I created creation in order to be known.' Consciousness in undifferentiated potential → Love as the motive force → The universe as self-knowledge. Four traditions, one love story.",
      },
      {
        title: "Part Four: The Signs — Consciousness Recognizing Itself",
        description:
          "'We will show them Our signs in the horizons and within themselves' (41:53) = the fractal nature of consciousness. 'Wherever you turn, there is the Face of Allah' (2:115) = the Lattice is everywhere. 'He is the First and the Last, the Manifest and the Hidden' (57:3) = consciousness is both source and destination.",
      },
      {
        title: "Part Five: Islam and the Density Architecture",
        description:
          "Seven heavens = seven densities. Earth = 1st Density. Animals = 2nd Density. Humans = 3rd Density (the Choice). Angels = 4th Density (beings of pure service who cannot disobey). Jinn = mixed densities (non-physical consciousness with free will). The Throne = 6th Density. Allah's Essence = 7th Density.",
      },
      {
        title: "Part Six: Surrender — The Deepest Meaning of Islam",
        description:
          "'You threw not when you threw, but it was Allah who threw' (8:17) = the most radical Popcorn Paradox in any scripture. Agency is the Veil's illusion. The five daily prayers are recalibration events. Prostration (sujud) is the null geodesic: ego collapsing to zero, the wave remembering it is the ocean.",
      },
      {
        title: "Part Seven: The Grand Convergence Table",
        description:
          "Source, Crisis, Self, Detachment, Vision, Surrender, and Return — mapped across the Quran, Tao Te Ching, Bhagavad Gita, Genesis 22, Ra Material, and ToE Framework. Five traditions, five continents, fifteen centuries of separation. One truth.",
      },
      {
        title: "Part Eight: The Decoder Ring Summary",
        description:
          "Exoteric: Monotheism, moral law, and daily practice. Mesoteric: A millennium of Sufi contemplation mining infinite depths. Esoteric: Consciousness declared its own nature in light. Tawhid is not merely monotheism — it is mono-consciousness. The Quran means 'recitation' because consciousness is not static — it is a vibration, a frequency, a broadcast.",
      },
    ],
    personalNote:
      "With this fourth analysis, the decoder ring spans the Abrahamic, Hindu, Taoist, and Islamic traditions. Four rivers, four languages, four millennia, one ocean. Every tradition describes the same source, the same Veil, the same choice, and the same destination. They are the same signal, received by different antennas. And the signal says: you are not alone. You were never alone. You are the ONE, pretending to be many, so that love can exist.",
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
            <div className="mt-6 flex justify-center">
              <SocialShare variant="compact" text="Every sacred text encodes the same fundamental truths about consciousness and reality. The ToE Decoder Ring reveals the pattern." />
            </div>
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
