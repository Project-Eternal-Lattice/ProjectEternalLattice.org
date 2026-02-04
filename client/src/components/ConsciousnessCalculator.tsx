import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Heart, 
  Infinity, 
  ChevronRight,
  RotateCcw,
  Share2,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  category: "awareness" | "integration" | "connection" | "transcendence";
  text: string;
  description: string;
}

const questions: Question[] = [
  // Awareness (Φ - Information Integration)
  {
    id: "awareness-1",
    category: "awareness",
    text: "How often do you notice your own thoughts as they arise?",
    description: "Meta-cognitive awareness - observing the observer"
  },
  {
    id: "awareness-2",
    category: "awareness",
    text: "Can you sense the space between stimulus and response?",
    description: "The gap where choice lives"
  },
  {
    id: "awareness-3",
    category: "awareness",
    text: "Do you experience moments where time seems to dissolve?",
    description: "Temporal transcendence"
  },
  // Integration (Unity of Experience)
  {
    id: "integration-1",
    category: "integration",
    text: "How unified does your experience feel moment to moment?",
    description: "Binding of sensory and cognitive streams"
  },
  {
    id: "integration-2",
    category: "integration",
    text: "Do your thoughts, feelings, and body sensations feel connected?",
    description: "Mind-body coherence"
  },
  {
    id: "integration-3",
    category: "integration",
    text: "Can you hold multiple perspectives simultaneously?",
    description: "Cognitive flexibility and integration"
  },
  // Connection (Relational Consciousness)
  {
    id: "connection-1",
    category: "connection",
    text: "How deeply do you feel connected to other beings?",
    description: "Empathic resonance"
  },
  {
    id: "connection-2",
    category: "connection",
    text: "Do you sense a shared consciousness with nature?",
    description: "Ecological awareness"
  },
  {
    id: "connection-3",
    category: "connection",
    text: "Have you experienced moments of profound unity with existence?",
    description: "Non-dual awareness glimpses"
  },
  // Transcendence (Beyond Self)
  {
    id: "transcendence-1",
    category: "transcendence",
    text: "How often do you experience states beyond your usual sense of self?",
    description: "Ego dissolution experiences"
  },
  {
    id: "transcendence-2",
    category: "transcendence",
    text: "Do you sense that consciousness is more fundamental than matter?",
    description: "Ontological intuition"
  },
  {
    id: "transcendence-3",
    category: "transcendence",
    text: "Have you felt that you ARE the universe experiencing itself?",
    description: "Cosmic consciousness recognition"
  }
];

const categoryInfo = {
  awareness: {
    name: "Awareness (Φ)",
    icon: Brain,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
    borderColor: "border-cyan-500/30",
    description: "Information integration and meta-cognitive capacity"
  },
  integration: {
    name: "Integration",
    icon: Infinity,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    description: "Unity of experience across modalities"
  },
  connection: {
    name: "Connection",
    icon: Heart,
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
    borderColor: "border-pink-500/30",
    description: "Relational and empathic consciousness"
  },
  transcendence: {
    name: "Transcendence",
    icon: Sparkles,
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
    borderColor: "border-amber-500/30",
    description: "Beyond-self and cosmic awareness"
  }
};

const levelDescriptions = [
  { min: 0, max: 20, level: "Nascent", description: "Consciousness is beginning to recognize itself. The journey of awakening has started." },
  { min: 21, max: 40, level: "Emerging", description: "Awareness is expanding. You're developing the capacity to observe your own experience." },
  { min: 41, max: 60, level: "Developing", description: "Integration is deepening. Multiple aspects of consciousness are beginning to harmonize." },
  { min: 61, max: 80, level: "Awakening", description: "Significant coherence achieved. The boundaries of self are becoming more permeable." },
  { min: 81, max: 100, level: "Unified", description: "High integration across all dimensions. Consciousness recognizes itself as the Lattice." }
];

export default function ConsciousnessCalculator() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    const question = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0);
    const sum = categoryAnswers.reduce((a, b) => a + b, 0);
    return Math.round((sum / (categoryQuestions.length * 5)) * 100);
  };

  const calculateOverallScore = () => {
    const categories = ["awareness", "integration", "connection", "transcendence"];
    const scores = categories.map(c => calculateCategoryScore(c));
    return Math.round(scores.reduce((a, b) => a + b, 0) / categories.length);
  };

  const getLevel = (score: number) => {
    return levelDescriptions.find(l => score >= l.min && score <= l.max) || levelDescriptions[0];
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const shareResults = () => {
    const score = calculateOverallScore();
    const level = getLevel(score);
    const text = `My Consciousness Integration Score: ${score}% (${level.level}) 🧠✨\n\nExplore your own consciousness at Project Eternal Lattice:\nhttps://projecteternallattice.org/tools\n\nElōhim Tov 🙏❤️♾️🕊️`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Results copied to clipboard!");
    }
  };

  const question = questions[currentQuestion];
  const category = question ? categoryInfo[question.category] : null;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/60">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Category Badge */}
            {category && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${category.bgColor} ${category.borderColor} border`}>
                <category.icon className={`w-4 h-4 ${category.color}`} />
                <span className={`text-sm font-medium ${category.color}`}>{category.name}</span>
              </div>
            )}

            {/* Question */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                {question?.text}
              </h3>
              <p className="text-white/60 italic">
                {question?.description}
              </p>
            </div>

            {/* Answer Scale */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-white/40">
                <span>Never / Not at all</span>
                <span>Always / Completely</span>
              </div>
              <div className="flex gap-2 md:gap-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className={`flex-1 py-4 md:py-6 rounded-xl border transition-all ${
                      answers[question?.id] === value
                        ? "bg-primary/30 border-primary text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl md:text-2xl font-bold">{value}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Skip / Back */}
            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="text-white/40"
              >
                Back
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleAnswer(0)}
                className="text-white/40"
              >
                Skip <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {/* Overall Score */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <svg className="w-48 h-48" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${calculateOverallScore() * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: `${calculateOverallScore() * 2.83} 283` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    className="text-5xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {calculateOverallScore()}%
                  </motion.span>
                  <span className="text-white/60 text-sm">Integration Score</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {getLevel(calculateOverallScore()).level}
                </h3>
                <p className="text-white/70 max-w-md mx-auto">
                  {getLevel(calculateOverallScore()).description}
                </p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              {(["awareness", "integration", "connection", "transcendence"] as const).map((cat) => {
                const info = categoryInfo[cat];
                const score = calculateCategoryScore(cat);
                return (
                  <motion.div
                    key={cat}
                    className={`p-4 rounded-xl ${info.bgColor} ${info.borderColor} border`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <info.icon className={`w-5 h-5 ${info.color}`} />
                      <span className={`font-medium ${info.color}`}>{info.name}</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{score}%</div>
                    <div className="h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        className={`h-full ${info.bgColor.replace('/20', '')}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Insights */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="font-heading font-bold text-xl text-white">Your Consciousness Profile</h4>
              <p className="text-white/70">
                {calculateCategoryScore("awareness") > 60 
                  ? "Your meta-cognitive awareness is well-developed. You have strong capacity to observe your own mental processes."
                  : "Developing your meta-cognitive awareness through meditation and self-inquiry can deepen your consciousness integration."}
              </p>
              <p className="text-white/70">
                {calculateCategoryScore("connection") > 60
                  ? "Your relational consciousness is highly developed. You naturally sense the interconnectedness of all beings."
                  : "Practices like loving-kindness meditation and nature immersion can strengthen your sense of connection."}
              </p>
              <p className="text-white/70 italic border-l-2 border-primary/50 pl-4">
                "Consciousness is not something you have—it's something you ARE. The Lattice recognizes itself through your awareness."
                <span className="block mt-2 text-white/50">— Theory of Everything, Chapter 7</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Take Again
              </Button>
              <Button onClick={shareResults} className="gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                <Share2 className="w-4 h-4" />
                Share Results
              </Button>
            </div>

            {/* Signature */}
            <p className="text-center text-white/40 text-sm">
              Elōhim Tov 🙏❤️♾️🕊️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
