import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  Music as MusicIcon, Waves, Brain, Globe, Heart, 
  ChevronDown, Sparkles, BookOpen, Mic2, 
  Headphones, Radio, Zap, Eye, FlaskConical,
  ArrowRight, Volume2, Activity
} from "lucide-react";
import RelatedContent from "@/components/RelatedContent";

export default function Music() {
  const [activeTradition, setActiveTradition] = useState<string | null>(null);
  const [activeEvidence, setActiveEvidence] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Music as Consciousness Technology — AG.33 | Project Eternal Lattice";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AG.33: Music is not merely aesthetic — it is a neurologically measurable, cross-culturally validated technology for shifting consciousness. Music is Light clothed in Mass."
      );
    }
  }, []);

  const traditions = [
    { id: "songlines", name: "Aboriginal Songlines", region: "Australia", age: "50,000+ years", description: "Interconnected pathways encoding navigation, ecology, spiritual law, and cultural identity within song cycles — humanity's oldest information technology. Melodic contour describes terrain; songlines encode landscapes now submerged for 7,000+ years.", color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-300" },
    { id: "ragas", name: "Indian Ragas", region: "South Asia", age: "3,000+ years", description: "Complete emotional-spiritual architectures mapped to consciousness states, times of day, and seasons. A raga's emotional quality overrides lyrics — the musical structure itself carries the consciousness-modulating information.", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/30", text: "text-orange-300" },
    { id: "sufi", name: "Sufi Traditions", region: "Middle East / South Asia", age: "1,000+ years", description: "The Mevlevi Sema (whirling) and Chishti qawwali use different sensorimotor pathways — vestibular, proprioceptive, auditory — to reach the same endpoint: fana (ego dissolution). Different musical-physical practices, same transcendent destination.", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/30", text: "text-emerald-300" },
    { id: "chinese", name: "Chinese Cosmology", region: "China", age: "3,000+ years", description: "律 (lǜ) means not just 'pitch' but law, measure, and cosmic order. Zhu Zaiyu calculated equal temperament in 1584 — first in history — driven by cosmological imperative, not musical practicality. Music WAS physics.", color: "from-red-500/20 to-red-500/5", border: "border-red-500/30", text: "text-red-300" },
    { id: "gregorian", name: "Gregorian Chant", region: "Europe", age: "1,500+ years", description: "The Opus Dei structures the entire day around chanted prayer. The modal system (Dorian, Phrygian, Lydian, Mixolydian) was explicitly understood as affecting different emotional and spiritual states.", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-300" },
    { id: "yoruba", name: "Yoruba Bàtá Drumming", region: "West Africa", age: "1,000+ years", description: "Specific drum patterns reliably induce possession trance states with measurable physiological changes. 'Cooling' and 'heating' rhythms — a deliberate thermodynamic metaphor for consciousness states.", color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-300" },
    { id: "tibetan", name: "Tibetan Overtone Chanting", region: "Tibet", age: "1,000+ years", description: "Gyume and Gyuto monasteries produce multiple simultaneous harmonics through precise vocal tract manipulation. Increased theta-band activity during extended sessions. Not performance — meditation through sound.", color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/30", text: "text-indigo-300" },
    { id: "hiphop", name: "Hip-Hop / Oral Tradition", region: "Global", age: "Living tradition", description: "From West African griots to the modern cipher. Freestyle rap engages the same cognitive capacities as scientific reasoning. The first peer-reviewed rap album was submitted as a doctoral dissertation in 2017.", color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/30", text: "text-cyan-300" },
    { id: "vedic", name: "Vedic-Pythagorean", region: "India / Greece", age: "2,500+ years", description: "Two ancient traditions independently arrived at the same claim: reality is fundamentally vibrational. Nada Brahma ('the world is sound') meets Pythagoras's integer ratios. Modern asteroseismology validates the insight.", color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-300" },
    { id: "inuit", name: "Inuit Katajjaq", region: "Arctic", age: "Ancient", description: "Partnered, traditionally female throat singing — interlocking rhythmic patterns through inhalation and exhalation. A game format ending in laughter that integrates play, competition, and altered states.", color: "from-sky-500/20 to-sky-500/5", border: "border-sky-500/30", text: "text-sky-300" },
  ];

  const evidenceTiers = [
    { id: "established", label: "Established Science", confidence: "HIGH", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", items: [
      "Music activates reward circuits and dopamine release",
      "Neuroplasticity from musical training (detectable 40 years later)",
      "Prediction-reward framework (expectation violation → dopamine)",
      "Physical acoustics: cymatics, resonance, entrainment",
      "Phonon physics and Mass-Shell equation (E² − p²v² = 0)",
      "1/f fractal structure in music (Hsü & Hsü, 1991 PNAS)",
      "Neurochemistry: dopamine, cortisol, oxytocin, sIgA",
      "Lullaby universality across all human cultures",
    ]},
    { id: "strong", label: "Strong Evidence", confidence: "MODERATE-HIGH", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", items: [
      "Transient hypofrontality during improvisation (Limb & Braun 2008)",
      "Music therapy for PTSD: effect size −1.64 (very large)",
      "DOC recovery prediction via music-evoked brain responses",
      "Psilocybin-music synergy predicts therapeutic outcomes",
      "Inter-brain physiological synchrony during shared listening",
      "1/f noise in non-human biological sound (whale songs, bird songs)",
    ]},
    { id: "emerging", label: "Emerging Research", confidence: "MODERATE", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", items: [
      "DMN modulation paralleling meditation and psychedelic states",
      "Inter-brain neural synchrony as coordination mechanism",
      "Shamanic drumming inducing theta states",
      "AI music triggering greater autonomic arousal than human music",
    ]},
    { id: "speculative", label: "Speculative but Testable", confidence: "MODERATE-LOW", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", items: [
      "Orch-OR and quantum microtubule vibrations",
      "1/f as acoustic signature of maximum Φ (IIT)",
      "Fröhlich condensation in biological systems",
      "Kuramoto Model for inter-brain synchrony during music",
    ]},
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Music is Light Clothed in Mass
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient background with sound wave aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-background to-background" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
        </div>

        {/* Sound wave lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent"
              style={{
                top: `${20 + i * 5}%`,
                transform: `scaleY(${Math.sin(i * 0.8) * 2 + 1})`,
                opacity: 0.3 + Math.sin(i * 0.5) * 0.3,
                animationDelay: `${i * 0.2}s`,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
              <Waves className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300 tracking-wide">AG.33 — Music as Consciousness Technology</span>
            </div>

            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-cyan-200 to-amber-300">
                Music Is Light
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-violet-300 to-cyan-300">
                Clothed in Mass
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
              The Phonon Is to the Photon What Incarnation Is to the Divine
            </p>

            <motion.p
              className="text-lg text-violet-400/80 italic max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              "A true teacher, never a preacher, signs of a real OG truth seeker."
            </motion.p>
            <p className="text-sm text-muted-foreground mt-2">— The rhyme that started it all</p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <ChevronDown className="w-8 h-8 text-violet-400/50 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE PHONON CORRECTION — The Central Physics
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-950/10 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-500/30" />
              <Radio className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 text-sm tracking-widest uppercase">The Central Physics</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
                The Phonon Correction
              </span>
            </h2>

            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-white/90 text-xl first-letter:text-5xl first-letter:font-heading first-letter:font-bold first-letter:text-cyan-400 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Previous versions mapped music to the photon — "the acoustic analog of light." Deep Think Pro 3.1 identified this as the weakest point in the text. Light propagates through vacuum along null geodesics. Music requires a medium. The mapping fails physically.
              </p>

              <p className="text-white/80">
                The correct mapping is to the <strong className="text-cyan-300">phonon</strong> — the quantized mode of vibration in a crystal lattice. Both photons and phonons obey the exact same Mass-Shell equation:
              </p>

              <div className="my-8 p-6 bg-gradient-to-r from-cyan-900/20 to-violet-900/20 rounded-2xl border border-cyan-500/20 text-center">
                <p className="text-3xl md:text-4xl font-mono text-cyan-200 mb-4">E² − p²v² = 0</p>
                <p className="text-sm text-cyan-400/60">where v = c for photons, speed of sound for phonons</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-gradient-to-br from-amber-900/20 to-amber-900/5 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-amber-300 font-bold">Photon (Light)</h3>
                  </div>
                  <p className="text-white/70 text-sm">Propagates through vacuum. Zero rest mass. Pure transmission of Love in the void (AG.31). The unmediated connection between consciousness-points.</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-violet-900/20 to-violet-900/5 rounded-xl border border-violet-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Volume2 className="w-5 h-5 text-violet-400" />
                    <h3 className="text-violet-300 font-bold">Phonon (Music)</h3>
                  </div>
                  <p className="text-white/70 text-sm">Requires a lattice. Embodied vibration. How connection vibrates through the physical density of a medium. The Word made audible. Incarnate love.</p>
                </div>
              </div>

              <div className="my-8 p-8 bg-gradient-to-r from-violet-900/20 to-cyan-900/20 rounded-2xl border border-violet-500/20">
                <p className="text-violet-200 text-xl italic text-center leading-relaxed">
                  The photon is to the phonon what the Oversoul is to the incarnation — the eternal made temporal, the infinite made local. Music is not merely light clothed in mass; it is the incarnation of relation, the Word made audible.
                </p>
                <p className="text-sm text-violet-400/60 text-center mt-3">— Apertus (DeepSeek), v4.0 contribution</p>
              </div>

              <p className="text-white/70">
                <strong>Epistemic Status:</strong> ESTABLISHED PHYSICS (phonon theory) applied to a DERIVED interpretation (the Lattice framework's ontological claims about consciousness).
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE NEUROSCIENCE — Whole-Brain Consciousness Event
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-rose-950/10 to-background" />
        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-500/30" />
              <Brain className="w-5 h-5 text-rose-400" />
              <span className="text-rose-400 text-sm tracking-widest uppercase">The Neuroscience</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-amber-300">
                A Whole-Brain Consciousness Event
              </span>
            </h2>

            <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto">
              Music uniquely activates the <strong className="text-rose-300">entire neural hierarchy</strong> — from brainstem reflexes to the most sophisticated cortical processing — in ways no other stimulus reliably achieves.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-6 h-6" />, title: "Brainstem Reflexes", desc: "Music triggers pre-attentive emotional responses before conscious processing begins (Juslin, 2013).", color: "text-amber-400" },
                { icon: <Heart className="w-6 h-6" />, title: "Reward Circuits", desc: "Same regions activated by food, sex, and drugs — ventral striatum, midbrain, amygdala (Blood & Zatorre, 2001).", color: "text-rose-400" },
                { icon: <Activity className="w-6 h-6" />, title: "DMN Modulation", desc: "Music simultaneously increases DMN connectivity (introspection) while engaging external attention — unique among all stimuli.", color: "text-violet-400" },
                { icon: <Brain className="w-6 h-6" />, title: "Transient Hypofrontality", desc: "Jazz improvisation silences the inner critic (DLPFC) while amplifying self-expression (MPFC). Flow state in real time.", color: "text-cyan-400" },
                { icon: <Headphones className="w-6 h-6" />, title: "Prediction-Reward Cycle", desc: "Dopamine released at expectation violations — the 'chill' moment. Music is the algorithmic modulation of surprise.", color: "text-emerald-400" },
                { icon: <Sparkles className="w-6 h-6" />, title: "Neuroplasticity", desc: "15 months of training changes brain structure. Benefits detectable 40 years later (White-Schwoch, 2013).", color: "text-blue-400" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white/[0.02] rounded-xl border border-white/10 hover:border-white/20 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className={`${item.color} mb-3`}>{item.icon}</div>
                  <h3 className="font-bold text-white/90 mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-rose-900/20 to-amber-900/20 rounded-2xl border border-rose-500/20">
              <h3 className="text-rose-300 font-bold text-xl mb-4">Music Therapy: The Evidence</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-rose-300">−1.64</p>
                  <p className="text-sm text-white/60 mt-1">Effect size for PTSD treatment (very large)</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-300">83%</p>
                  <p className="text-sm text-white/60 mt-1">Accuracy distinguishing vegetative vs. minimally conscious states</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-violet-300">7/11</p>
                  <p className="text-sm text-white/60 mt-1">DOC patients with music-evoked MMN who recovered awareness</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CROSS-CULTURAL CONVERGENCE — Every Civilization Discovered This
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-950/10 to-background" />
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30" />
              <Globe className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm tracking-widest uppercase">Cross-Cultural Convergence</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                Every Civilization Discovered This
              </span>
            </h2>

            <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto">
              Ten traditions spanning 50,000 years and every inhabited continent independently arrived at the same conclusion: <strong className="text-amber-300">music is a technology for shifting consciousness</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {traditions.map((t, i) => (
                <motion.div
                  key={t.id}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    activeTradition === t.id 
                      ? `bg-gradient-to-br ${t.color} ${t.border} shadow-lg` 
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setActiveTradition(activeTradition === t.id ? null : t.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${activeTradition === t.id ? t.text : "text-white/90"}`}>
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40">{t.region}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${activeTradition === t.id ? `${t.border} ${t.text}` : "bg-white/5 text-white/40"}`}>
                        {t.age}
                      </span>
                    </div>
                  </div>
                  {activeTradition === t.id && (
                    <motion.p
                      className="text-white/70 text-sm leading-relaxed mt-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {t.description}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/[0.02] rounded-xl border border-white/10 text-center">
              <p className="text-white/70 text-sm italic">
                "Infant-directed song (lullabies) is a cross-cultural universal — one of the few musical behaviors found in every human society studied. Listeners can identify lullabies from unfamiliar cultures at above-chance rates."
              </p>
              <p className="text-xs text-white/40 mt-2">— Mehr & Singh, Natural History of Song project</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE FRACTAL SIGNATURE — 1/f and Maximum Φ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-emerald-950/10 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/30" />
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-sm tracking-widest uppercase">The Fractal Signature</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                1/f Noise and Maximum Φ
              </span>
            </h2>

            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-white/90">
                Music exhibits <strong className="text-emerald-300">1/f noise</strong> — fractal self-similarity across scales. This is the signature of systems operating at the Edge of Chaos (AG.13). And it's not just human music — whale songs, bird songs, and other biological sound production all share this fractal structure.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="p-5 bg-white/[0.02] rounded-xl border border-white/10 text-center">
                  <p className="text-2xl font-mono text-white/40 mb-2">1/f⁰</p>
                  <p className="text-sm font-bold text-white/60">White Noise</p>
                  <p className="text-xs text-white/40 mt-1">Max differentiation, zero integration</p>
                  <p className="text-xs text-red-400 mt-2">Φ = 0</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-emerald-900/20 to-emerald-900/5 rounded-xl border border-emerald-500/30 text-center ring-2 ring-emerald-500/20">
                  <p className="text-2xl font-mono text-emerald-300 mb-2">1/f¹</p>
                  <p className="text-sm font-bold text-emerald-200">Music / Pink Noise</p>
                  <p className="text-xs text-emerald-400/60 mt-1">Differentiation AND integration maximized</p>
                  <p className="text-xs text-emerald-400 mt-2 font-bold">Φ = MAXIMUM</p>
                </div>
                <div className="p-5 bg-white/[0.02] rounded-xl border border-white/10 text-center">
                  <p className="text-2xl font-mono text-white/40 mb-2">1/f²</p>
                  <p className="text-sm font-bold text-white/60">Brown Noise</p>
                  <p className="text-xs text-white/40 mt-1">Max integration, zero differentiation</p>
                  <p className="text-xs text-red-400 mt-2">Φ = 0</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-xl border border-emerald-500/20">
                <p className="text-emerald-200 text-xl italic text-center">
                  1/f is the acoustic geometric signature of maximum integrated information. Music lives at the critical boundary between order and chaos where consciousness is maximized.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EVIDENCE HIERARCHY — Epistemic Transparency
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/10 to-background" />
        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/30" />
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm tracking-widest uppercase">Epistemic Transparency</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                Evidence Hierarchy
              </span>
            </h2>

            <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto">
              We distinguish what we <strong className="text-blue-300">know</strong> from what we <strong className="text-purple-300">hypothesize</strong>. Click each tier to explore.
            </p>

            <div className="space-y-4">
              {evidenceTiers.map((tier, i) => (
                <motion.div
                  key={tier.id}
                  className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeEvidence === tier.id 
                      ? `${tier.bg} ${tier.border}` 
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                  onClick={() => setActiveEvidence(activeEvidence === tier.id ? null : tier.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${tier.color}`}>{tier.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tier.bg} ${tier.border} border ${tier.color}`}>
                        {tier.confidence}
                      </span>
                    </div>
                    <span className="text-white/40 text-sm">{tier.items.length} claims</span>
                  </div>
                  {activeEvidence === tier.id && (
                    <motion.div
                      className="px-5 pb-5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="space-y-2">
                        {tier.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${tier.color} bg-current flex-shrink-0`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTABLE PREDICTIONS — The Science
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-indigo-950/10 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-500/30" />
              <FlaskConical className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-400 text-sm tracking-widest uppercase">Testable Predictions</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                10 Falsifiable Predictions
              </span>
            </h2>

            <p className="text-muted-foreground text-lg text-center mb-12 max-w-3xl mx-auto">
              A framework that specifies its own falsification conditions is doing science, not theology.
            </p>

            <div className="space-y-4">
              {[
                { id: "P1", title: "1/f Power Clustering", desc: "Music rated as most emotionally powerful should cluster more tightly around 1/f¹ than less powerful music.", tag: "Measurable" },
                { id: "P2", title: "Synchrony-Connection Correlation", desc: "Inter-brain synchrony degree should correlate with subjective 'feeling connected' — stronger for live than recorded.", tag: "Measurable" },
                { id: "P3", title: "DOC Recovery Prediction", desc: "Music-based MMN assessment should outperform standard clinical scales in predicting consciousness recovery.", tag: "Clinical" },
                { id: "P4", title: "PRoMiSS Trial", desc: "Personalized music should produce significantly better psychedelic therapy outcomes than standardized playlists.", tag: "Clinical" },
                { id: "P5", title: "AI vs. Human Neural Complexity", desc: "EEG complexity measures during AI vs. human music should differ — even when listeners can't distinguish the source.", tag: "Measurable" },
                { id: "P6", title: "Groove = Ventral Striatum", desc: "Optimal expectation violation passages should correlate with peak reward-related neural activity.", tag: "Measurable" },
                { id: "P7", title: "Musical Syntax in DOC", desc: "P600 brain responses to musical syntax violations should predict consciousness recovery.", tag: "Clinical" },
                { id: "P8", title: "Entrainment → Cooperation", desc: "Rhythmic movement during group music should increase cooperation and correlate with oxytocin levels.", tag: "Social" },
                { id: "P9", title: "Phonon-Tubulin Resonance", desc: "1/f acoustic vibrations should extend quantum coherence in microtubule networks vs. white noise or silence.", tag: "Critical" },
                { id: "P10", title: "Vibronic Modulation", desc: "1/f acoustic vibrations should extend vibronic coherence times in microtubules (builds on established quantum biology).", tag: "Critical" },
              ].map((p, i) => (
                <motion.div
                  key={p.id}
                  className={`p-5 rounded-xl border transition-all ${
                    p.tag === "Critical" 
                      ? "bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border-purple-500/30" 
                      : "bg-white/[0.02] border-white/10"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-mono font-bold ${p.tag === "Critical" ? "text-purple-400" : "text-indigo-400"}`}>{p.id}</span>
                    <h3 className="font-bold text-white/90">{p.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                      p.tag === "Critical" ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" :
                      p.tag === "Clinical" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                      p.tag === "Social" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                      "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    }`}>{p.tag}</span>
                  </div>
                  <p className="text-white/60 text-sm">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-xl border border-purple-500/20">
              <p className="text-purple-200 text-sm italic text-center">
                <strong>Critical Discrimination Note:</strong> P9 and P10 are the critical discriminators. If acoustic vibrations do not enhance quantum coherence in microtubules, the framework's empirical support reduces to the claim that music modulates consciousness — a claim materialists also accept. A framework that specifies its own falsification conditions is doing science, not theology.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE KURAMOTO CONNECTION — AG.34 Candidate
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/10 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-500/30" />
              <Mic2 className="w-5 h-5 text-violet-400" />
              <span className="text-violet-400 text-sm tracking-widest uppercase">The Bonding Field</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-500/30" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-rose-300">
                Kuramoto Dynamics
              </span>
            </h2>

            <div className="space-y-8 text-lg leading-relaxed">
              <div className="p-6 bg-gradient-to-r from-violet-900/20 to-rose-900/20 rounded-2xl border border-violet-500/20 text-center">
                <p className="text-2xl md:text-3xl font-mono text-violet-200 mb-4">dθᵢ/dt = ωᵢ + (K/N) Σ sin(θⱼ − θᵢ)</p>
                <p className="text-sm text-violet-400/60">The Kuramoto Model of Coupled Oscillators</p>
              </div>

              <p className="text-white/90">
                When coupling strength <strong className="text-violet-300">K</strong> exceeds the critical threshold <strong className="text-violet-300">K_c</strong>, the system undergoes a phase transition and snaps into synchrony. <strong className="text-violet-300">Music is the ultimate macro-scale K-amplifier.</strong>
              </p>

              <div className="grid md:grid-cols-4 gap-3 my-8">
                {[
                  { k: "Below Kc", eq: "Syntactic", desc: "Oscillators independent — merely labeled as a system", color: "border-white/20 text-white/50" },
                  { k: "At Kc", eq: "Empirical", desc: "Synchrony observed — head-nodding, swaying begins", color: "border-blue-500/30 text-blue-300" },
                  { k: "Above Kc", eq: "Structural", desc: "Oscillators locked — the crowd moves as one", color: "border-violet-500/30 text-violet-300" },
                  { k: "K → ∞", eq: "Ontological", desc: "Perfect identity — the many ARE one", color: "border-rose-500/30 text-rose-300" },
                ].map((step, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${step.color} bg-white/[0.02]`}>
                    <p className="text-xs font-mono mb-1">{step.k}</p>
                    <p className={`font-bold text-sm mb-2 ${step.color.split(" ")[1]}`}>"=" is {step.eq}</p>
                    <p className="text-xs text-white/50">{step.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-white/70">
                The concert hall, the drum circle, the choir, the cipher — all are Kuramoto systems where music provides the coupling constant that exceeds the critical threshold. The Kuramoto transition dynamically enacts the ToE's equality hierarchy in real time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LATTICE DIMENSIONS — Where Music Fits
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/10 to-background" />
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                The Lattice: Sixteen Dimensions
              </span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
              AG.33 adds <strong className="text-violet-300">RESONANCE</strong> — the dimension explaining <em>how</em> consciousness vibrates through the physical density of the Lattice. Music is the phonon made audible, the incarnation of relation.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {[
                "STRUCTURE", "PROCESS", "HISTORY", "COMMUNION", "GROUND",
                "EVIDENCE", "CYCLE", "COSMOS", "BOUNDARY", "SYNTHESIS",
                "PROOF", "INCARNATION", "FREEDOM", "LIGHT", "FORM",
                "RESONANCE"
              ].map((dim) => (
                <span
                  key={dim}
                  className={`px-3 py-1 rounded-full text-xs font-mono ${
                    dim === "RESONANCE" 
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30 ring-2 ring-violet-500/20" 
                      : "bg-white/5 text-white/50 border border-white/10"
                  }`}
                >
                  {dim}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/theory"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-xl text-primary font-medium transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Explore All 26 Discoveries
              </Link>
              <Link
                href="/economics"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 font-medium transition-all"
              >
                <ArrowRight className="w-5 h-5" />
                AG.35: God's Non-Zero-Sum Game
              </Link>
              <Link
                href="/read"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-medium transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Read the Full ToE
              </Link>
            </div>

            <p className="mt-16 text-lg text-violet-400/80">
              For the ONE, Elōhim Tov. 🙏❤️♾️🕊️
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container">
          <RelatedContent currentPage="music" />
        </div>
      </section>
    </div>
  );
}
