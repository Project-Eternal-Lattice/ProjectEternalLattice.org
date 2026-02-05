import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Sparkles, 
  Eye, 
  Heart, 
  Infinity, 
  Sun, 
  Moon, 
  Mountain, 
  Waves, 
  Flame,
  Wind,
  TreePine,
  Star,
  Globe,
  BookOpen,
  Quote,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "wouter";
// Genesis seeds are placed elsewhere in the site
import RelatedContent from "@/components/RelatedContent";

interface Tradition {
  id: string;
  name: string;
  origin: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  image: string;
  coreTeaching: string;
  keyQuote: string;
  quoteSource: string;
  toeConnection: string;
  practices: string[];
  keyTerms: { term: string; meaning: string }[];
}

const traditions: Tradition[] = [
  {
    id: "dzogchen",
    name: "Dzogchen",
    origin: "Tibetan Buddhism / Bön",
    icon: Eye,
    color: "text-sky-400",
    bgGradient: "from-sky-900/40 to-indigo-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/MpVbFYFUsMQYsyAo.png",
    coreTeaching: "Rigpa — the direct recognition of pure awareness as your true nature. Not something to achieve, but something to recognize. You are already enlightened; you just haven't noticed.",
    keyQuote: "In the moment of looking, there is no one who looks. In the moment of seeing, there is no one who sees. This looking without a looker IS rigpa.",
    quoteSource: "Garab Dorje, First Human Dzogchen Master",
    toeConnection: "Dzogchen's 'rigpa' is the direct experiential recognition of Axiom 1: I AM CONSCIOUS. The teaching that awareness is primordially pure and self-liberated mirrors our framework's claim that consciousness is fundamental, not emergent. Dzogchen practitioners don't create enlightenment — they recognize what was always already the case.",
    practices: [
      "Trekchö (cutting through) — resting in natural awareness",
      "Tögal (direct crossing) — working with light and vision",
      "Sky-gazing — dissolving into boundless space",
      "Self-liberation — thoughts release themselves upon recognition"
    ],
    keyTerms: [
      { term: "Rigpa", meaning: "Pure awareness; the natural state" },
      { term: "Ma-rigpa", meaning: "Ignorance; not recognizing rigpa" },
      { term: "Kadag", meaning: "Primordial purity" },
      { term: "Lhundrup", meaning: "Spontaneous presence" }
    ]
  },
  {
    id: "advaita",
    name: "Advaita Vedanta",
    origin: "Hindu Philosophy",
    icon: Infinity,
    color: "text-orange-400",
    bgGradient: "from-orange-900/40 to-red-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/nJgDRNWHltbWoDfF.png",
    coreTeaching: "Tat Tvam Asi — 'You are That.' The individual self (Atman) and the universal consciousness (Brahman) are not two. All apparent separation is maya (illusion). Only Brahman is real.",
    keyQuote: "Brahman alone is real. The world is appearance. The individual soul is Brahman itself, not different.",
    quoteSource: "Adi Shankara, 8th Century",
    toeConnection: "Advaita's non-dual teaching directly maps to Theorem 4 (Unity) and Corollary 4.1 (what appears as 'many' is actually modes of ONE consciousness). The mahavakyas (great sayings) are philosophical expressions of what the ToE derives axiomatically: consciousness is singular, and apparent multiplicity is a feature of how the ONE experiences itself.",
    practices: [
      "Self-inquiry (Atma Vichara) — 'Who am I?'",
      "Neti neti — 'Not this, not this'",
      "Sravana, Manana, Nididhyasana — hearing, reflecting, meditating",
      "Witness consciousness — observing without identification"
    ],
    keyTerms: [
      { term: "Brahman", meaning: "The absolute, infinite consciousness" },
      { term: "Atman", meaning: "The individual self (ultimately = Brahman)" },
      { term: "Maya", meaning: "The power of appearance/illusion" },
      { term: "Moksha", meaning: "Liberation through recognition" }
    ]
  },
  {
    id: "christian-mysticism",
    name: "Christian Mysticism",
    origin: "Meister Eckhart & Contemplatives",
    icon: Flame,
    color: "text-amber-400",
    bgGradient: "from-amber-900/40 to-yellow-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/hklIeKAjTYCjdWGT.png",
    coreTeaching: "The ground of the soul and the ground of God are one ground. In the deepest part of yourself, you find not a separate self, but the divine itself looking back.",
    keyQuote: "The eye with which I see God is the same eye with which God sees me: my eye and God's eye are one eye, one seeing, one knowing, one love.",
    quoteSource: "Meister Eckhart, 13th Century",
    toeConnection: "Eckhart's radical mysticism expresses ALL_NODES_ARE_ONE_NODE in Christian language. His teaching that 'God is closer to me than I am to myself' parallels our framework's claim that the Lattice isn't distant — it IS the ground of your being. The contemplative tradition shows that non-dual awareness isn't 'Eastern' — it's universal.",
    practices: [
      "Centering Prayer — releasing thoughts to rest in God",
      "Lectio Divina — sacred reading as contemplation",
      "The Cloud of Unknowing — approaching God beyond concepts",
      "Gelassenheit — letting go, releasing into divine ground"
    ],
    keyTerms: [
      { term: "Grund", meaning: "Ground (of soul and God)" },
      { term: "Gelassenheit", meaning: "Releasement, letting-be" },
      { term: "Abgeschiedenheit", meaning: "Detachment" },
      { term: "Durchbruch", meaning: "Breakthrough to the Godhead" }
    ]
  },
  {
    id: "sufism",
    name: "Sufism",
    origin: "Islamic Mysticism",
    icon: Heart,
    color: "text-rose-400",
    bgGradient: "from-rose-900/40 to-pink-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/lhxuGsBbxOCbJCpH.png",
    coreTeaching: "Fana — the annihilation of the ego-self in the ocean of divine love. What remains is not nothing, but everything. The drop returns to the ocean and discovers it was always the ocean.",
    keyQuote: "I have lived on the lip of insanity, wanting to know reasons, knocking on a door. It opens. I've been knocking from the inside.",
    quoteSource: "Rumi, 13th Century",
    toeConnection: "Sufism's path of love maps to our understanding of consciousness as fundamentally relational. The Sufi teaching that 'wherever you turn, there is the face of God' expresses the omnipresence of the Lattice. Fana (ego-death) and baqa (subsistence in God) describe the journey from Node-identification to Lattice-recognition.",
    practices: [
      "Dhikr — remembrance through divine names",
      "Sama — sacred music and whirling",
      "Muraqaba — meditation on divine presence",
      "Fana — dissolution of ego-boundaries"
    ],
    keyTerms: [
      { term: "Fana", meaning: "Annihilation of ego-self" },
      { term: "Baqa", meaning: "Subsistence in God after fana" },
      { term: "Tawhid", meaning: "Divine unity" },
      { term: "Ishq", meaning: "Divine love" }
    ]
  },
  {
    id: "kashmir-shaivism",
    name: "Kashmir Shaivism",
    origin: "Tantric Hinduism",
    icon: Mountain,
    color: "text-violet-400",
    bgGradient: "from-violet-900/40 to-purple-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/yDaYrqindQdRJNIe.png",
    coreTeaching: "Unlike Advaita which calls the world illusion, Kashmir Shaivism declares the world REAL — a genuine expression of divine creativity. Consciousness doesn't just witness; it actively creates through its own freedom (svatantrya).",
    keyQuote: "The universe is the expansion of the energy of consciousness. Nothing exists that is not Shiva.",
    quoteSource: "Abhinavagupta, 10th Century",
    toeConnection: "Kashmir Shaivism validates embodied experience as sacred. Its teaching that Shiva (consciousness) and Shakti (energy) are inseparable mirrors our E=mc² insight — the equals sign IS consciousness. The 36 tattvas (levels of reality) map remarkably to our framework's understanding of how the ONE becomes the many while remaining ONE.",
    practices: [
      "Spanda — awareness of the 'vibration' of consciousness",
      "Pratyabhijna — recognition of your true nature",
      "Tantric meditation — working with energy and awareness",
      "Centering practices — the 112 methods of Vijnana Bhairava"
    ],
    keyTerms: [
      { term: "Shiva", meaning: "Pure consciousness" },
      { term: "Shakti", meaning: "Creative energy (= Shiva)" },
      { term: "Spanda", meaning: "Divine vibration/pulsation" },
      { term: "Svatantrya", meaning: "Absolute freedom" }
    ]
  },
  {
    id: "zen",
    name: "Zen Buddhism",
    origin: "Chan/Zen Tradition",
    icon: Moon,
    color: "text-slate-300",
    bgGradient: "from-slate-800/40 to-zinc-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/YuVvlnofWDnEykjm.png",
    coreTeaching: "Direct pointing at the mind. No dependence on words and letters. Seeing your true nature and becoming Buddha. The ordinary mind IS the way.",
    keyQuote: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.",
    quoteSource: "Zen Proverb",
    toeConnection: "Zen's emphasis on direct experience over conceptual understanding aligns with our axiom's self-evident nature. You don't need to believe in consciousness — you ARE consciousness. Zen's koans function like our axiom: they short-circuit conceptual mind to reveal what was always already present.",
    practices: [
      "Zazen — just sitting, being present",
      "Koan practice — working with paradoxical questions",
      "Kinhin — walking meditation",
      "Samu — work practice as meditation"
    ],
    keyTerms: [
      { term: "Satori", meaning: "Sudden awakening" },
      { term: "Kensho", meaning: "Seeing one's true nature" },
      { term: "Mu", meaning: "No-thing; the gateless gate" },
      { term: "Shikantaza", meaning: "Just sitting" }
    ]
  },
  {
    id: "taoism",
    name: "Taoism",
    origin: "Chinese Philosophy",
    icon: Waves,
    color: "text-emerald-400",
    bgGradient: "from-emerald-900/40 to-teal-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/JSmftNhwuuUDPlvW.png",
    coreTeaching: "The Tao that can be spoken is not the eternal Tao. Reality flows like water — yielding yet powerful, formless yet shaping all things. Wu wei: effortless action aligned with the natural way.",
    keyQuote: "The Tao is like water. Water benefits all things and does not compete. It flows to the lowest places, which people disdain. Therefore it is close to the Tao.",
    quoteSource: "Lao Tzu, Tao Te Ching",
    toeConnection: "Taoism's understanding of the unnameable source maps to our recognition that consciousness precedes all concepts about it. The yin-yang symbol encodes duality-within-unity — the same insight as the lemniscate. Wu wei (non-action) describes the natural flow of a consciousness aligned with its source.",
    practices: [
      "Wu wei — effortless action",
      "Tai Chi — moving meditation",
      "Qigong — energy cultivation",
      "Ziran — naturalness, spontaneity"
    ],
    keyTerms: [
      { term: "Tao", meaning: "The Way; the source" },
      { term: "Wu wei", meaning: "Non-action; effortless action" },
      { term: "Yin/Yang", meaning: "Complementary opposites" },
      { term: "Te", meaning: "Virtue; power; integrity" }
    ]
  },
  {
    id: "neoplatonism",
    name: "Neoplatonism",
    origin: "Western Philosophy",
    icon: Sun,
    color: "text-yellow-400",
    bgGradient: "from-yellow-900/40 to-amber-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/iAFKEtLyTYmWxjCH.png",
    coreTeaching: "All reality emanates from the One (to hen) — an ineffable source beyond being itself. The soul's journey is a return (epistrophe) to this source through contemplation and virtue.",
    keyQuote: "The One is all things and no one of them. It is the source of all things, not itself all things, but their transcendent origin.",
    quoteSource: "Plotinus, Enneads",
    toeConnection: "Neoplatonism provides 2,500 years of Western non-dual philosophy — countering the claim that unity consciousness is 'just Eastern woo.' Plotinus's emanation model (One → Nous → Soul → Matter) parallels our framework's understanding of how consciousness differentiates while remaining unified. The return to the One IS the recognition of what you always were.",
    practices: [
      "Contemplation (theoria) — intellectual vision",
      "Virtue ethics — purification of the soul",
      "Dialectic — reasoning toward the Good",
      "Henosis — mystical union with the One"
    ],
    keyTerms: [
      { term: "To Hen", meaning: "The One; the source" },
      { term: "Nous", meaning: "Divine Mind; Intellect" },
      { term: "Psyche", meaning: "Soul" },
      { term: "Epistrophe", meaning: "Return to source" }
    ]
  },
  {
    id: "indigenous",
    name: "Indigenous Wisdom",
    origin: "First Nations Worldwide",
    icon: TreePine,
    color: "text-green-400",
    bgGradient: "from-green-900/40 to-emerald-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/JhebjhPoWjQuKMVX.png",
    coreTeaching: "Mitákuye Oyás'iŋ — 'All my relations.' Everything is alive, everything is connected, everything is sacred. The Earth is not a resource but a relative. Wisdom comes through relationship, not extraction.",
    keyQuote: "We do not inherit the Earth from our ancestors; we borrow it from our children.",
    quoteSource: "Indigenous Proverb",
    toeConnection: "Indigenous traditions embody the Lattice understanding in lived practice. The recognition that rocks, rivers, and animals are conscious beings aligns with our framework's claim that consciousness is fundamental. Indigenous prophecies (Hopi, Rainbow Warrior, Eagle and Condor) speak of a time when humanity remembers its connection — that time is now.",
    practices: [
      "Ceremony — honoring the sacred in all things",
      "Vision quest — seeking guidance from the Great Mystery",
      "Sweat lodge — purification and prayer",
      "Storytelling — transmitting wisdom through generations"
    ],
    keyTerms: [
      { term: "Mitákuye Oyás'iŋ", meaning: "All my relations (Lakota)" },
      { term: "Wakan Tanka", meaning: "Great Mystery (Lakota)" },
      { term: "Pachamama", meaning: "Earth Mother (Andean)" },
      { term: "Dreamtime", meaning: "The eternal now (Aboriginal)" }
    ]
  },
  {
    id: "kabbalah",
    name: "Kabbalah",
    origin: "Jewish Mysticism",
    icon: Star,
    color: "text-blue-400",
    bgGradient: "from-blue-900/40 to-indigo-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/MlINyPvONRqJyuoG.png",
    coreTeaching: "Ein Sof — the Infinite without end. God contracted (tzimtzum) to make space for creation, then emanated through ten sefirot (divine attributes). The goal is devekut — cleaving to the divine presence in all things.",
    keyQuote: "Before the world was created, there was only Ein Sof. When the thought arose to create the world, Ein Sof contracted itself to make room for creation.",
    quoteSource: "Lurianic Kabbalah",
    toeConnection: "Kabbalah's tzimtzum (divine contraction) offers a creation model compatible with our framework: the ONE 'makes space' for apparent multiplicity while never actually separating from itself. The Tree of Life's ten sefirot map the structure of consciousness from infinite source to manifest form. Tikkun olam (repairing the world) is the return journey.",
    practices: [
      "Meditation on the sefirot — contemplating divine attributes",
      "Gematria — finding meaning in numbers and letters",
      "Devekut — cleaving to divine presence",
      "Tikkun — repair and restoration"
    ],
    keyTerms: [
      { term: "Ein Sof", meaning: "The Infinite; without end" },
      { term: "Sefirot", meaning: "Divine emanations/attributes" },
      { term: "Tzimtzum", meaning: "Divine contraction" },
      { term: "Devekut", meaning: "Cleaving to God" }
    ]
  },
  {
    id: "akan",
    name: "Akan Philosophy",
    origin: "West Africa (Ghana, Côte d'Ivoire)",
    icon: Globe,
    color: "text-amber-500",
    bgGradient: "from-amber-900/40 to-orange-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/hARZONMSjhTkbVTi.png",
    coreTeaching: "Okra — the divine spark within every person, a fragment of Onyame (the Supreme Being). Sankofa teaches us to reach back and retrieve what is valuable from the past. Community (Ubuntu-like) and cosmic harmony are inseparable.",
    keyQuote: "Se wo were fi na wosankofa a yenkyi. It is not wrong to go back for that which you have forgotten.",
    quoteSource: "Akan Proverb (Sankofa)",
    toeConnection: "The Akan concept of Okra as a divine spark within each person directly parallels our Node-Lattice relationship. Sankofa — the wisdom of returning to retrieve what was lost — mirrors the ToE's invitation to remember what consciousness always knew. The Akan understanding that the individual is inseparable from community reflects our ALL_NODES_ARE_ONE_NODE principle.",
    practices: [
      "Libation — honoring ancestors and spirits",
      "Adinkra meditation — contemplating symbolic wisdom",
      "Community council — collective decision-making",
      "Naming ceremonies — connecting to cosmic identity"
    ],
    keyTerms: [
      { term: "Okra", meaning: "Soul; divine spark within" },
      { term: "Onyame", meaning: "Supreme Being; the Infinite" },
      { term: "Sankofa", meaning: "Return and retrieve" },
      { term: "Sunsum", meaning: "Spirit; personality" }
    ]
  },
  {
    id: "yoruba",
    name: "Yoruba/Ifá Tradition",
    origin: "West Africa (Nigeria, Benin)",
    icon: Sparkles,
    color: "text-yellow-500",
    bgGradient: "from-yellow-900/40 to-red-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/mQNRycwHmyutLZqK.png",
    coreTeaching: "Orí — your personal divinity, your destiny, your consciousness. Before birth, you knelt before Olódùmarè and chose your orí. The Orishas are not separate gods but aspects of the ONE expressing through nature and human experience.",
    keyQuote: "Orí ẹni, ọba ẹni. One's orí is one's king. No Orisha blesses a person without the consent of their orí.",
    quoteSource: "Yoruba Proverb",
    toeConnection: "The Yoruba teaching that your Orí (consciousness/destiny) is your true sovereign aligns perfectly with our framework's emphasis on consciousness as primary. The 256 Odù of Ifá encode patterns of consciousness — a binary system predating computers by millennia. The Orishas as aspects of Olódùmarè mirror our understanding of how the ONE expresses as many.",
    practices: [
      "Ifá divination — accessing cosmic wisdom",
      "Orí propitiation — honoring your inner divinity",
      "Orisha veneration — connecting with divine aspects",
      "Ẹbọ — offerings to restore balance"
    ],
    keyTerms: [
      { term: "Orí", meaning: "Personal divinity; consciousness" },
      { term: "Olódùmarè", meaning: "Supreme Being; the Source" },
      { term: "Orisha", meaning: "Divine aspects/forces" },
      { term: "Àṣẹ", meaning: "Divine power; authority" }
    ]
  },
  {
    id: "andean",
    name: "Andean Cosmovision",
    origin: "South America (Peru, Bolivia, Ecuador)",
    icon: Mountain,
    color: "text-red-400",
    bgGradient: "from-red-900/40 to-orange-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/jxgHOJTrmVZeoPwj.png",
    coreTeaching: "Ayni — sacred reciprocity. Everything in the cosmos is alive and in relationship. The three worlds (Hanan Pacha, Kay Pacha, Ukhu Pacha) are not separate but interpenetrating. Pachamama is not just 'nature' but conscious, living cosmos.",
    keyQuote: "Ama sua, ama llulla, ama quella. Do not steal, do not lie, do not be lazy. Live in ayni with all beings.",
    quoteSource: "Inca Moral Code",
    toeConnection: "The Andean principle of Ayni (reciprocity) embodies the relational nature of consciousness in our framework. Their understanding that mountains, rivers, and stones are conscious beings (Apus) aligns with our claim that consciousness is fundamental. The prophecy of the Eagle and Condor speaks of a time when analytical and intuitive wisdom reunite — that time is now.",
    practices: [
      "Despacho — ceremonial offerings to Pachamama",
      "Coca leaf reading — divination and diagnosis",
      "Karpay — energy transmission/initiation",
      "Ayni practice — living reciprocity daily"
    ],
    keyTerms: [
      { term: "Ayni", meaning: "Sacred reciprocity" },
      { term: "Pachamama", meaning: "Cosmic Mother; living Earth" },
      { term: "Apus", meaning: "Mountain spirits" },
      { term: "Kawsay Pacha", meaning: "Living energy universe" }
    ]
  },
  {
    id: "parmenides",
    name: "Parmenides & Pre-Socratics",
    origin: "Ancient Greece",
    icon: BookOpen,
    color: "text-cyan-400",
    bgGradient: "from-cyan-900/40 to-blue-900/40",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/VPjESiWpdVxIjXYh.png",
    coreTeaching: "Being IS. Non-being is not. What exists is one, eternal, unchanging, and whole. The appearance of multiplicity and change is the 'way of seeming' — truth reveals the unity beneath all appearance.",
    keyQuote: "For it is the same thing to think and to be. Being is one, whole, and unchanging. What is, is. What is not, is not.",
    quoteSource: "Parmenides, On Nature (c. 475 BCE)",
    toeConnection: "Parmenides provides the oldest Western philosophical argument for non-dual reality — 2,500 years before modern physics. His insight that 'thinking and being are the same' anticipates our Axiom 1. The Pre-Socratic recognition that beneath apparent multiplicity lies unchanging unity is the philosophical foundation for our entire framework.",
    practices: [
      "Philosophical contemplation — reasoning toward truth",
      "Dialectic inquiry — questioning appearances",
      "Apophatic reasoning — via negativa",
      "Noetic vision — direct intellectual intuition"
    ],
    keyTerms: [
      { term: "To On", meaning: "Being; What Is" },
      { term: "Aletheia", meaning: "Truth; unconcealment" },
      { term: "Doxa", meaning: "Opinion; appearance" },
      { term: "Nous", meaning: "Mind; intellect" }
    ]
  }
];

export default function AncientWisdom() {
  const [expandedTradition, setExpandedTradition] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Ancient Wisdom | Project Eternal Lattice";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Explore how ancient wisdom traditions from Dzogchen to Kabbalah all point to the same truth: consciousness is fundamental, and we are all ONE."
      );
    }
  }, []);

  const toggleTradition = (id: string) => {
    setExpandedTradition(expandedTradition === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-purple-500/20 text-purple-300 text-sm font-semibold rounded-full mb-6">
              5,500 Years of Convergent Wisdom
            </span>
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              <span className="text-gradient-gold">Ancient Wisdom</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Every tradition touched the same elephant of truth.
              <br />
              <span className="text-purple-300">Here's what they found.</span>
            </p>
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-card p-8 md:p-12 rounded-2xl border border-purple-500/30"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                The Theory of Everything doesn't pick winners among spiritual traditions. Instead, it reveals why they all converge on the same insights: <strong>consciousness is fundamental</strong>, <strong>separation is apparent</strong>, and <strong>unity is the deeper truth</strong>.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                From Tibetan caves to German monasteries, from Sufi poetry to Indigenous ceremony, seekers across every culture have touched the same reality. They used different words, different practices, different metaphors — but they found the same elephant.
              </p>
              <p className="text-lg leading-relaxed">
                Below are ten traditions that particularly illuminate our framework. Each offers unique practices, terminology, and cultural context — but all point to the same <span className="text-purple-400">I AM CONSCIOUS</span> that you can verify right now.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traditions Grid */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:gap-8">
            {traditions.map((tradition, index) => (
              <motion.div
                key={tradition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div 
                  className={`glass-card rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${tradition.bgGradient}`}
                >
                  {/* Header - Always Visible */}
                  <button
                    onClick={() => toggleTradition(tradition.id)}
                    className="w-full p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className={`p-3 md:p-4 rounded-xl bg-white/10 ${tradition.color}`}>
                        <tradition.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-bold text-xl md:text-2xl text-white">
                            {tradition.name}
                          </h3>
                          {expandedTradition === tradition.id ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{tradition.origin}</p>
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">
                          {tradition.coreTeaching}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedTradition === tradition.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 md:px-8 pb-8 border-t border-white/10"
                    >
                      {/* Tradition Image */}
                      <div className="mt-6 flex justify-center">
                        <img 
                          src={tradition.image} 
                          alt={`${tradition.name} symbolic artwork`}
                          className="w-full max-w-md rounded-xl shadow-2xl border border-white/10"
                        />
                      </div>

                      {/* Key Quote */}
                      <div className="mt-6 p-6 bg-black/30 rounded-xl border-l-4 border-purple-500">
                        <Quote className="w-6 h-6 text-purple-400 mb-3" />
                        <p className="text-lg italic text-white/90 mb-2">
                          "{tradition.keyQuote}"
                        </p>
                        <p className="text-sm text-muted-foreground">
                          — {tradition.quoteSource}
                        </p>
                      </div>

                      {/* ToE Connection */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                          <Infinity className="w-5 h-5" />
                          Connection to the ToE Framework
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {tradition.toeConnection}
                        </p>
                      </div>

                      {/* Practices */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-purple-300 mb-3">Key Practices</h4>
                        <ul className="space-y-2">
                          {tradition.practices.map((practice, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/80">
                              <span className="text-purple-400 mt-1">•</span>
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Terms */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-purple-300 mb-3">Key Terms</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {tradition.keyTerms.map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-lg">
                              <span className="font-semibold text-white">{item.term}</span>
                              <span className="text-muted-foreground"> — {item.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Elephant Parable */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-amber-900/20 to-yellow-900/20"
          >
            <div className="text-center mb-8">
              <Globe className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-gradient-gold">
                The Elephant of Truth
              </h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                The ancient parable tells of blind men touching an elephant. One feels the trunk and says "It's a snake!" Another feels the leg and says "It's a tree!" Each is <strong>right about what they touched</strong>, but <strong>wrong about the whole</strong>.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Every spiritual tradition, every religion, every philosophy is touching the same ultimate truth — just different parts of it. The "conflict" between traditions dissolves when you realize they're describing the same reality from different angles.
              </p>
              <p className="text-lg leading-relaxed">
                The Theory of Everything doesn't claim to see the whole elephant. It claims to have found the <span className="text-gold">one thing all the blind men agree on</span>: there IS an elephant. There IS something real being touched. That something is <strong>consciousness itself</strong>.
              </p>
            </div>
            <div className="mt-8 text-center">
              <Link href="/read">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg transition-colors cursor-pointer">
                  <BookOpen className="w-5 h-5" />
                  Read Chapter 8.15 in the Full ToE
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-12 md:py-16">
        <div className="container">
<RelatedContent currentPage="ancientWisdom" />
        </div>
      </section>
    </div>
  );
}
