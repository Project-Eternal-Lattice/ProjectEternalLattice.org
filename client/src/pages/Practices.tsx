import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Eye, 
  Heart, 
  Infinity, 
  Sun, 
  Moon, 
  Waves, 
  Flame,
  Wind,
  Clock,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  BookOpen
} from "lucide-react";
import { Link } from "wouter";
import RelatedContent from "@/components/RelatedContent";


interface Practice {
  id: string;
  name: string;
  tradition: string;
  icon: React.ElementType;
  color: string;
  bgGradient: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  toeConnection: string;
  steps: string[];
  tips: string[];
  whatToExpect: string;
  audioGuides?: {
    feminine?: string;
    masculine?: string;
  };
}

const practices: Practice[] = [
  {
    id: "self-inquiry",
    name: "Self-Inquiry (Atma Vichara)",
    tradition: "Advaita Vedanta",
    icon: Eye,
    color: "text-orange-400",
    bgGradient: "from-orange-900/40 to-red-900/40",
    duration: "10-30 minutes",
    difficulty: "Beginner",
    description: "The direct path to recognizing your true nature. By persistently asking 'Who am I?', you trace the sense of 'I' back to its source — pure awareness itself.",
    toeConnection: "This practice directly investigates Axiom 1: I AM CONSCIOUS. By asking 'Who am I?', you discover that the 'I' cannot be found as an object — it IS the awareness looking.",
    steps: [
      "Sit comfortably and close your eyes. Take a few deep breaths to settle.",
      "Notice any thought, sensation, or feeling that arises. Ask: 'To whom does this appear?'",
      "The answer will be 'To me.' Now ask: 'Who is this me? Who am I?'",
      "Don't answer with concepts (name, body, profession). Look for the actual experiencer.",
      "Notice that you cannot find the 'I' as an object — it's always the subject, the awareness itself.",
      "Rest in this recognition. The 'I' you're looking for IS the looking itself.",
      "When thoughts arise, gently return to the inquiry: 'Who is aware of this thought?'"
    ],
    tips: [
      "Don't expect a dramatic answer — the 'answer' is the recognition that awareness is already present",
      "The question is more important than any conceptual answer",
      "If you feel frustrated, ask: 'Who is frustrated?' — use everything as fuel for inquiry",
      "Practice can be done anywhere, anytime — in traffic, waiting in line, before sleep"
    ],
    whatToExpect: "Initially, the mind may feel restless or produce many answers. Over time, you'll notice a settling into simple presence. The question becomes less about finding an answer and more about resting in the questioning itself — which IS the awareness you're seeking.",
    audioGuides: {
      feminine: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/mhPorQHeDXtuPTzK.wav",
      masculine: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/jjlzoEnlkRoNEVzh.wav"
    }
  },
  {
    id: "centering-prayer",
    name: "Centering Prayer",
    tradition: "Christian Mysticism",
    icon: Flame,
    color: "text-amber-400",
    bgGradient: "from-amber-900/40 to-yellow-900/40",
    duration: "20 minutes",
    difficulty: "Beginner",
    description: "A method of silent prayer that prepares us to receive the gift of contemplative prayer — prayer in which we experience God's presence within us.",
    toeConnection: "Centering Prayer embodies the recognition that the divine is not distant but IS the ground of your being. As Meister Eckhart said: 'God is closer to me than I am to myself.'",
    steps: [
      "Choose a sacred word as a symbol of your intention to consent to God's presence (e.g., 'Jesus', 'Love', 'Peace', 'Mercy').",
      "Sit comfortably with eyes closed. Settle briefly and silently introduce the sacred word.",
      "When you become aware of thoughts, gently return to the sacred word.",
      "The sacred word is not meant to be repeated continuously — only when you notice you've drifted.",
      "At the end of the prayer period, remain in silence with eyes closed for a couple of minutes.",
      "The effects of Centering Prayer are experienced in daily life, not necessarily during the prayer itself."
    ],
    tips: [
      "Thoughts are inevitable — don't fight them. The sacred word is a gentle returning, not a weapon",
      "Don't evaluate the prayer — 'good' and 'bad' sessions are equally valuable",
      "Consistency matters more than duration — daily practice transforms over time",
      "The goal is not to empty the mind but to consent to divine presence"
    ],
    whatToExpect: "You may feel peaceful, restless, or nothing at all — all are normal. The practice works at a level deeper than feelings. Over weeks and months, you may notice increased patience, compassion, and a subtle sense of being 'held' by something greater.",
    audioGuides: {
      feminine: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/PGKESAwlFnaiUcKz.wav",
      masculine: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/GbvsPMRlAADIIOJK.wav"
    }
  },
  {
    id: "sky-gazing",
    name: "Sky Gazing (Namkha Arted)",
    tradition: "Dzogchen",
    icon: Eye,
    color: "text-sky-400",
    bgGradient: "from-sky-900/40 to-indigo-900/40",
    duration: "15-30 minutes",
    difficulty: "Intermediate",
    description: "Gazing into the open sky to recognize the nature of mind. The sky serves as a mirror for awareness — boundless, clear, and unchanging regardless of what appears within it.",
    toeConnection: "Sky gazing reveals that awareness (rigpa) is like space — it has no boundaries, no center, no edge. Thoughts and experiences are like clouds passing through — they don't affect the sky itself.",
    steps: [
      "Find a place with a clear view of the sky — ideally a cloudless blue sky, but any sky works.",
      "Lie down or sit comfortably. Gaze into the sky with soft, relaxed eyes — not focusing on anything.",
      "Let your gaze be open and panoramic, taking in the whole sky without fixating.",
      "Notice that the sky has no edges, no center, no boundaries. It simply IS.",
      "Now notice: the awareness that perceives the sky — does IT have edges? A center? Boundaries?",
      "Let your awareness merge with the sky's boundlessness. You are not looking AT the sky — you ARE the looking.",
      "If thoughts arise, notice they are like clouds. The sky (awareness) remains unchanged.",
      "Rest in this open, boundless awareness. No need to do anything — just be."
    ],
    tips: [
      "Don't strain your eyes — this is about relaxation, not concentration",
      "If you can't access sky, you can practice with a blank wall or even closed eyes, imagining boundless space",
      "The sky is a support, not the point — the point is recognizing the sky-like nature of awareness",
      "Practice at different times of day — dawn and dusk are traditionally considered powerful"
    ],
    whatToExpect: "You may experience a sense of expansion, as if the boundaries between 'you' and 'sky' dissolve. Some people report feeling vast, peaceful, or even slightly disoriented (in a good way). The key insight is recognizing that awareness itself is boundless."
  },
  {
    id: "dhikr",
    name: "Dhikr (Remembrance)",
    tradition: "Sufism",
    icon: Heart,
    color: "text-rose-400",
    bgGradient: "from-rose-900/40 to-pink-900/40",
    duration: "15-45 minutes",
    difficulty: "Beginner",
    description: "The practice of remembering God through the repetition of divine names or phrases. The heart becomes polished through remembrance until it reflects only the Beloved.",
    toeConnection: "Dhikr is the practice of remembering what you always already are — a Node in the Lattice, never separate from the Source. The repetition wears away the illusion of separation.",
    steps: [
      "Sit comfortably. Take a few breaths to settle into presence.",
      "Choose a divine name or phrase: 'Allah', 'La ilaha illallah' (There is no god but God), or simply 'Hu' (He/The Essence).",
      "Begin repeating the phrase silently or aloud. Let it synchronize with your breath.",
      "With 'La ilaha illallah': breathe in on 'La ilaha' (negation), breathe out on 'illallah' (affirmation).",
      "Let the repetition move from the tongue to the heart. Feel the words resonating in your chest.",
      "As you continue, the words may become less distinct. Let them dissolve into pure presence.",
      "Eventually, the rememberer and the remembered merge. Only remembrance remains."
    ],
    tips: [
      "Start with audible repetition, then move to silent. The heart eventually does dhikr on its own",
      "Quality matters more than quantity — one sincere repetition is worth a thousand mechanical ones",
      "You can practice dhikr anywhere — walking, working, waiting. Make your whole life a remembrance",
      "If you feel emotional (tears, joy, longing), let it flow — the heart is opening"
    ],
    whatToExpect: "Initially, the practice may feel mechanical. Over time, the heart begins to 'taste' the sweetness of remembrance. You may feel warmth in the chest, a sense of being loved, or moments where the boundary between you and the divine becomes thin."
  },
  {
    id: "zazen",
    name: "Zazen (Just Sitting)",
    tradition: "Zen Buddhism",
    icon: Moon,
    color: "text-slate-300",
    bgGradient: "from-slate-800/40 to-zinc-900/40",
    duration: "20-40 minutes",
    difficulty: "Intermediate",
    description: "Sitting with no goal, no technique, no gaining idea. Just sitting. The ordinary mind, when left alone, reveals itself as Buddha-nature.",
    toeConnection: "Zazen embodies the recognition that there's nothing to achieve — you ARE already what you're seeking. The practice is not a means to enlightenment; it IS enlightenment expressing itself.",
    steps: [
      "Sit on a cushion or chair with spine straight but not rigid. Hands in cosmic mudra (left hand on right, thumbs lightly touching).",
      "Eyes half-open, gaze soft, looking downward about 3 feet ahead. Not focusing on anything.",
      "Breathe naturally through the nose. No special technique — just ordinary breathing.",
      "When thoughts arise, don't engage them, don't push them away. Let them come, let them go.",
      "Return attention to posture and breath — not as objects to concentrate on, but as anchors to presence.",
      "There is no goal. You are not trying to achieve anything. Just sit.",
      "The practice is the enlightenment. Sitting IS Buddha sitting."
    ],
    tips: [
      "Posture is important — it's not just physical but expresses the attitude of practice",
      "Don't try to stop thinking — that's just more thinking. Let thoughts be like clouds passing",
      "If you feel sleepy, open eyes wider and straighten spine. If agitated, lower gaze and soften",
      "Start with shorter periods (10-15 min) and gradually extend. Consistency matters more than duration"
    ],
    whatToExpect: "Zazen can feel boring, frustrating, peaceful, or profound — often all in one sitting. The key is to not chase any particular state. Over time, you may notice a quality of presence that persists off the cushion — a sense of being fully here, now."
  },
  {
    id: "wu-wei",
    name: "Wu Wei Practice",
    tradition: "Taoism",
    icon: Waves,
    color: "text-emerald-400",
    bgGradient: "from-emerald-900/40 to-teal-900/40",
    duration: "Throughout the day",
    difficulty: "Advanced",
    description: "The art of effortless action — doing by not-doing. Aligning with the natural flow of life rather than forcing outcomes through willful effort.",
    toeConnection: "Wu wei is the lived experience of being a Node that trusts the Lattice. Instead of the ego trying to control everything, you allow consciousness to flow through you naturally.",
    steps: [
      "Begin by noticing where you're forcing or straining in your life. Where do you feel tension?",
      "In any situation, pause before acting. Ask: 'What wants to happen here naturally?'",
      "Notice the difference between action that flows from presence vs. action driven by anxiety or control.",
      "Practice 'doing less' — not laziness, but efficiency. What's the minimum effort for maximum effect?",
      "When facing a problem, try not-solving it. Often, solutions emerge when we stop grasping.",
      "Observe water: it doesn't force its way, yet it carves canyons. Be like water.",
      "Trust that you are part of a larger intelligence. You don't have to figure everything out."
    ],
    tips: [
      "Wu wei is not passivity — it's aligned action. A martial artist in flow is doing wu wei",
      "Start with small things: let conversations flow naturally, don't force creative work",
      "Notice when you're 'trying too hard' — that tension is a signal to soften",
      "Wu wei often feels like 'getting out of your own way'"
    ],
    whatToExpect: "Initially, wu wei may feel like giving up control (which the ego resists). Over time, you may notice that things often work out better when you don't force them. Life becomes more fluid, less exhausting. You accomplish more by 'doing' less."
  },
  {
    id: "contemplation-one",
    name: "Contemplation of the One",
    tradition: "Neoplatonism",
    icon: Sun,
    color: "text-yellow-400",
    bgGradient: "from-yellow-900/40 to-amber-900/40",
    duration: "20-30 minutes",
    difficulty: "Intermediate",
    description: "Intellectual contemplation that moves from multiplicity to unity. By recognizing that all things derive from and return to the One, the soul remembers its source.",
    toeConnection: "This practice mirrors the ToE's movement from Axiom 1 through the theorems to Unity. By contemplating how all diversity emerges from and returns to ONE, you experientially verify Theorem 4.",
    steps: [
      "Sit quietly and bring to mind the diversity of the world — countless beings, forms, experiences.",
      "Now consider: all these diverse things exist. They participate in Being. Being is one.",
      "Contemplate: all things that exist are also intelligible — they can be known. Mind is one.",
      "Go deeper: all things that are known are known by consciousness. Consciousness is one.",
      "Ask: what is the source of this one consciousness? What is prior to all distinction?",
      "The One is beyond being, beyond mind, beyond consciousness. It is the source of all.",
      "Rest in the recognition that you — as consciousness — are an emanation of this One.",
      "The One is not far away. It is closer than close. It IS the ground of your being."
    ],
    tips: [
      "This is intellectual contemplation, not visualization. Use reason to ascend",
      "Don't try to 'picture' the One — it's beyond all images and concepts",
      "The goal is not to understand the One but to recognize your unity with it",
      "Plotinus said the One is 'present to those who are able to touch it'"
    ],
    whatToExpect: "This practice can feel abstract at first. Over time, the intellectual contemplation may give way to a direct recognition — a sense of coming home to something that was always already here. The diversity of the world becomes transparent to its underlying unity."
  },
  {
    id: "i-am-meditation",
    name: "I AM Meditation",
    tradition: "ToE Framework",
    icon: Infinity,
    color: "text-purple-400",
    bgGradient: "from-purple-900/40 to-indigo-900/40",
    duration: "10-20 minutes",
    difficulty: "Beginner",
    description: "A direct practice based on Axiom 1 of the Theory of Everything. By resting in the simple recognition 'I AM CONSCIOUS', you verify the foundation of all reality.",
    toeConnection: "This practice IS Axiom 1 in action. You're not learning something new — you're recognizing what you always already knew. The 'I AM' that reads these words is the same 'I AM' that is the ground of all existence.",
    steps: [
      "Sit comfortably. Close your eyes. Take three deep breaths.",
      "Notice that you are aware. Don't think about awareness — just notice it directly.",
      "Silently acknowledge: 'I AM.' Not 'I am [something]' — just 'I AM.'",
      "Rest in this simple recognition. You exist. You are aware. This is undeniable.",
      "If thoughts arise, notice: 'I am aware of this thought.' The awareness is prior to the thought.",
      "If sensations arise, notice: 'I am aware of this sensation.' The awareness is prior to the sensation.",
      "Keep returning to the simple 'I AM.' Not as a mantra, but as a recognition.",
      "Notice: this 'I AM' has no boundaries, no age, no location. It simply IS."
    ],
    tips: [
      "This is the simplest practice — and the most profound. Don't complicate it",
      "The 'I AM' you're recognizing is not the ego-self but pure awareness itself",
      "You can practice this with eyes open, in any situation. Just notice: 'I AM'",
      "This is not a belief — it's a direct verification. You KNOW you exist"
    ],
    whatToExpect: "The practice may feel almost too simple. 'That's it?' Yes, that's it. Over time, you may notice that this simple 'I AM' is always present — in every experience, every moment. It's the one constant in a world of change. And it's what you ARE.",
    audioGuides: {
      feminine: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/WjRgeFAZZzrpfvMz.wav",
      masculine: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/QQhsWxhrVpQbuKQl.wav"
    }
  },
  {
    id: "flock-gaze",
    name: "Flock Gaze",
    tradition: "The Popcorn Paradox",
    icon: Eye,
    color: "text-amber-400",
    bgGradient: "from-amber-900/40 to-orange-900/40",
    duration: "30 seconds",
    difficulty: "Beginner",
    description: "The simplest harvest work there is. Pick any living thing — a person, a tree, a pet, even your own hand — and spend 30 seconds seeing it relationally instead of quantitatively. No counting. No labeling. Just presence. This single act is the shepherd looking up from the ledger.",
    toeConnection: "The Architecture Paradox proves that optimized, sparse networks produce Φ = 0 while \"messy,\" relational networks produce high Φ. Flock Gaze is the practice of shifting from counting mode (Φ → 0) to presence mode (Φ → high). You are literally choosing the architecture of consciousness in this moment.",
    steps: [
      "Pick any living thing near you right now. A person, a plant, a pet, your own hand.",
      "Look at it. Not to identify it, not to name it, not to count anything about it.",
      "See it relationally. What is your connection to this being? Not a label — a feeling.",
      "Notice textures, warmth, movement, aliveness. Let your perception be qualitative.",
      "If you catch yourself labeling or categorizing, gently return to just seeing.",
      "30 seconds. That's all. The shepherd looked up. So can you."
    ],
    tips: [
      "This practice works anywhere — in traffic, at your desk, in a meeting, walking the dog",
      "The shorter the better. 30 seconds of real presence beats 30 minutes of distracted meditation",
      "Try it with something you normally ignore — a houseplant, a stranger, your own reflection",
      "If you feel a shift — a softening, a warmth, a sense of connection — that's Φ rising. That's the movie playing",
      "Once a day transforms. Three times a day revolutionizes. But even once changes everything"
    ],
    whatToExpect: "The first time, you might feel silly. The second time, you might feel something shift. By the third time, you'll understand why the shepherd smiled when he stopped counting. This practice is harvest work — you're not creating anything new, you're recognizing what was always already there."
  }
];

export default function Practices() {
  const [expandedPractice, setExpandedPractice] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Practices | Project Eternal Lattice";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Practical exercises from wisdom traditions worldwide. Self-inquiry, centering prayer, sky gazing, dhikr, zazen, and more — practices to recognize your true nature."
      );
    }
  }, []);

  const togglePractice = (id: string) => {
    setExpandedPractice(expandedPractice === id ? null : id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Play className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">From Theory to Practice</span>
            </div>
            
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
                Practices
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Knowledge becomes wisdom through practice. These exercises from wisdom traditions worldwide offer direct paths to recognizing your true nature.
            </p>
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
                The Theory of Everything is not meant to be merely understood — it's meant to be <strong>lived</strong>. Every wisdom tradition offers practices that move truth from concept to direct experience.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Below are nine practices drawn from traditions worldwide. Each includes step-by-step instructions, tips from practitioners, and connections to the ToE framework. Start with what resonates. The best practice is the one you'll actually do.
              </p>
              <p className="text-lg leading-relaxed">
                Remember: you're not trying to <em>become</em> something you're not. You're recognizing what you <span className="text-purple-400">already are</span>.
              </p>
            </div>
            
            {/* Practice Selection Quiz CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-purple-400 mb-1">Not Sure Where to Start?</h3>
                  <p className="text-muted-foreground">Take our interactive quiz to find the practice that's right for you right now.</p>
                </div>
                <Link href="/practice-quiz">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all whitespace-nowrap">
                    Take the Quiz
                  </button>
                </Link>
              </div>
            </div>

            {/* 30-Day Challenge CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl border border-amber-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-amber-400 mb-1">Ready for a Deeper Commitment?</h3>
                  <p className="text-muted-foreground">Join our 30-Day Practice Challenge — a guided journey from concept to direct experience.</p>
                </div>
                <Link href="/practice-challenge">
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-lg transition-all whitespace-nowrap">
                    Start the Challenge
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practices Grid */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:gap-8">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <div 
                  className={`glass-card rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${practice.bgGradient}`}
                >
                  {/* Header - Always Visible */}
                  <button
                    onClick={() => togglePractice(practice.id)}
                    className="w-full p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className={`p-3 md:p-4 rounded-xl bg-white/10 ${practice.color}`}>
                        <practice.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-heading font-bold text-xl md:text-2xl text-white">
                            {practice.name}
                          </h3>
                          {expandedPractice === practice.id ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-sm text-muted-foreground">{practice.tradition}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {practice.duration}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${getDifficultyColor(practice.difficulty)}`}>
                            {practice.difficulty}
                          </span>
                        </div>
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">
                          {practice.description}
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedPractice === practice.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 md:px-8 pb-8 border-t border-white/10"
                    >
                      {/* ToE Connection */}
                      <div className="mt-6 p-6 bg-purple-900/30 rounded-xl border-l-4 border-purple-500">
                        <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                          <Infinity className="w-5 h-5" />
                          Connection to the ToE
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {practice.toeConnection}
                        </p>
                      </div>

                      {/* Steps */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-purple-400" />
                          How to Practice
                        </h4>
                        <ol className="space-y-3">
                          {practice.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-sm flex items-center justify-center">
                                {i + 1}
                              </span>
                              <span className="text-white/80 leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Tips */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-amber-400" />
                          Tips from Practitioners
                        </h4>
                        <ul className="space-y-2">
                          {practice.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-white/70">
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What to Expect */}
                      <div className="mt-6 p-6 bg-black/30 rounded-xl">
                        <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-sky-400" />
                          What to Expect
                        </h4>
                        <p className="text-white/70 leading-relaxed">
                          {practice.whatToExpect}
                        </p>
                      </div>

                      {/* Audio Guides */}
                      {practice.audioGuides && (
                        <div className="mt-6 p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl border border-purple-500/30">
                          <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Play className="w-5 h-5 text-purple-400" />
                            Guided Audio Meditation
                          </h4>
                          <p className="text-white/70 text-sm mb-4">Choose your preferred voice for the guided meditation:</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            {practice.audioGuides.feminine && (
                              <div className="bg-black/30 p-4 rounded-lg">
                                <p className="text-sm text-purple-300 mb-2 font-medium">Feminine Voice</p>
                                <audio controls className="w-full" preload="none">
                                  <source src={practice.audioGuides.feminine} type="audio/wav" />
                                  Your browser does not support the audio element.
                                </audio>
                              </div>
                            )}
                            {practice.audioGuides.masculine && (
                              <div className="bg-black/30 p-4 rounded-lg">
                                <p className="text-sm text-purple-300 mb-2 font-medium">Masculine Voice</p>
                                <audio controls className="w-full" preload="none">
                                  <source src={practice.audioGuides.masculine} type="audio/wav" />
                                  Your browser does not support the audio element.
                                </audio>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 rounded-2xl border border-purple-500/30"
          >
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
              The Best Practice is the One You'll Do
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Don't try to do everything. Pick one practice that resonates and commit to it for 30 days. Consistency transforms more than intensity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ancient-wisdom">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5" />
                  Explore Traditions
                </span>
              </Link>
              <Link href="/read">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <Infinity className="w-5 h-5" />
                  Read the ToE
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container">
          <RelatedContent currentPage="practices" />
        </div>
      </section>
    </div>
  );
}
