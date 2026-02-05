import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Brain, 
  Zap, 
  Moon, 
  Sun, 
  Wind, 
  Waves, 
  Mountain,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Phone
} from "lucide-react";
import { Link } from "wouter";

// Types
interface Question {
  id: string;
  text: string;
  subtext?: string;
  options: Option[];
}

interface Option {
  text: string;
  value: string;
  scores: Record<string, number>;
}

interface Practice {
  id: string;
  name: string;
  description: string;
  intensity: "gentle" | "moderate" | "intense" | "deep";
  duration: string;
  benefits: string[];
  contraindications?: string[];
  icon: React.ElementType;
  chapter: string;
  color: string;
}

// Practice database
const practices: Practice[] = [
  {
    id: "breath-awareness",
    name: "Breath Awareness Meditation",
    description: "Simply observe your natural breath without trying to change it. A foundational practice that calms the nervous system and anchors you in the present moment.",
    intensity: "gentle",
    duration: "5-20 minutes",
    benefits: ["Reduces anxiety", "Improves focus", "Calms nervous system", "Safe for beginners"],
    icon: Wind,
    chapter: "Chapter 10.2",
    color: "bg-emerald-500"
  },
  {
    id: "loving-kindness",
    name: "Loving-Kindness (Metta) Meditation",
    description: "Cultivate feelings of love and compassion, starting with yourself and expanding outward to all beings. Heals the heart and dissolves barriers.",
    intensity: "gentle",
    duration: "10-30 minutes",
    benefits: ["Increases self-compassion", "Reduces negative emotions", "Strengthens relationships", "Heals emotional wounds"],
    icon: Heart,
    chapter: "Chapter 10.4",
    color: "bg-pink-500"
  },
  {
    id: "body-scan",
    name: "Body Scan Relaxation",
    description: "Systematically bring awareness to each part of your body, releasing tension and cultivating embodied presence.",
    intensity: "gentle",
    duration: "15-45 minutes",
    benefits: ["Releases physical tension", "Improves body awareness", "Promotes deep relaxation", "Good for sleep"],
    icon: Waves,
    chapter: "Chapter 10.3",
    color: "bg-blue-500"
  },
  {
    id: "gratitude",
    name: "Gratitude Practice",
    description: "Consciously cultivate appreciation for the gifts in your life. Shifts perspective from lack to abundance.",
    intensity: "gentle",
    duration: "5-15 minutes",
    benefits: ["Elevates mood", "Shifts perspective", "Increases life satisfaction", "Easy to integrate daily"],
    icon: Sun,
    chapter: "Chapter 10.5",
    color: "bg-yellow-500"
  },
  {
    id: "inquiry",
    name: "Self-Inquiry (Who Am I?)",
    description: "The direct path of questioning the nature of the self. Trace thoughts back to their source and discover what remains.",
    intensity: "moderate",
    duration: "20-60 minutes",
    benefits: ["Dissolves ego identification", "Reveals true nature", "Deepens self-understanding"],
    contraindications: ["Not recommended during acute mental health crisis"],
    icon: Brain,
    chapter: "Chapter 10.7",
    color: "bg-purple-500"
  },
  {
    id: "contemplation",
    name: "Contemplative Reading",
    description: "Slow, meditative reading of wisdom texts, allowing insights to penetrate deeply rather than skimming for information.",
    intensity: "gentle",
    duration: "15-30 minutes",
    benefits: ["Integrates wisdom", "Calms the mind", "Provides guidance", "Accessible anytime"],
    icon: BookOpen,
    chapter: "Chapter 10.6",
    color: "bg-indigo-500"
  },
  {
    id: "nature-communion",
    name: "Nature Communion",
    description: "Mindful time in nature, opening to the intelligence and presence of the natural world. Let the earth teach you.",
    intensity: "gentle",
    duration: "30-120 minutes",
    benefits: ["Grounds energy", "Reduces stress", "Connects to larger whole", "No special training needed"],
    icon: Mountain,
    chapter: "Chapter 10.8",
    color: "bg-green-600"
  },
  {
    id: "witness-consciousness",
    name: "Witness Consciousness Practice",
    description: "Cultivate the observer perspective—watching thoughts, emotions, and sensations without identification. The practice of pure awareness.",
    intensity: "moderate",
    duration: "20-45 minutes",
    benefits: ["Develops detachment", "Reduces reactivity", "Reveals consciousness itself"],
    contraindications: ["May intensify dissociation in some individuals"],
    icon: Sparkles,
    chapter: "Chapter 10.9",
    color: "bg-violet-500"
  },
  {
    id: "shadow-work",
    name: "Shadow Integration Work",
    description: "Consciously engaging with repressed aspects of the psyche. Bringing light to the darkness within for wholeness.",
    intensity: "deep",
    duration: "45-90 minutes",
    benefits: ["Integrates rejected parts", "Increases authenticity", "Releases stuck energy"],
    contraindications: ["Best done with support", "Not during crisis", "May surface difficult emotions"],
    icon: Moon,
    chapter: "Chapter 10.11",
    color: "bg-slate-700"
  },
  {
    id: "energy-practices",
    name: "Energy Cultivation (Qi/Prana)",
    description: "Practices that work directly with subtle energy—breathwork, movement, visualization. Awakens the energy body.",
    intensity: "intense",
    duration: "30-60 minutes",
    benefits: ["Increases vitality", "Opens energy channels", "Heightens sensitivity"],
    contraindications: ["Start gently", "Can be destabilizing if overdone", "Not during pregnancy without guidance"],
    icon: Zap,
    chapter: "Chapter 10.10",
    color: "bg-amber-500"
  }
];

// Questions
const questions: Question[] = [
  {
    id: "current-state",
    text: "How are you feeling right now?",
    subtext: "Be honest—there's no wrong answer",
    options: [
      { text: "Calm and centered", value: "calm", scores: { energy: 2, stability: 3, openness: 2 } },
      { text: "Anxious or restless", value: "anxious", scores: { energy: -1, stability: -2, openness: 0 } },
      { text: "Sad or heavy", value: "sad", scores: { energy: -2, stability: 0, openness: 1 } },
      { text: "Disconnected or numb", value: "numb", scores: { energy: -1, stability: 1, openness: -2 } },
      { text: "Energized and curious", value: "energized", scores: { energy: 3, stability: 2, openness: 3 } }
    ]
  },
  {
    id: "experience-level",
    text: "What's your experience with consciousness practices?",
    options: [
      { text: "Complete beginner", value: "beginner", scores: { experience: 0 } },
      { text: "Some experience (tried a few things)", value: "some", scores: { experience: 1 } },
      { text: "Regular practitioner", value: "regular", scores: { experience: 2 } },
      { text: "Advanced/long-term practitioner", value: "advanced", scores: { experience: 3 } }
    ]
  },
  {
    id: "time-available",
    text: "How much time do you have right now?",
    options: [
      { text: "Just a few minutes (5-10)", value: "short", scores: { time: 1 } },
      { text: "A decent chunk (15-30 minutes)", value: "medium", scores: { time: 2 } },
      { text: "As long as I need (30+ minutes)", value: "long", scores: { time: 3 } }
    ]
  },
  {
    id: "intention",
    text: "What do you most need right now?",
    subtext: "Trust your first instinct",
    options: [
      { text: "To calm down and find peace", value: "calm", scores: { needCalm: 3, needEnergy: 0, needInsight: 0, needConnection: 1 } },
      { text: "To feel more alive and energized", value: "energy", scores: { needCalm: 0, needEnergy: 3, needInsight: 1, needConnection: 1 } },
      { text: "To understand myself better", value: "insight", scores: { needCalm: 1, needEnergy: 0, needInsight: 3, needConnection: 1 } },
      { text: "To feel connected to something larger", value: "connection", scores: { needCalm: 1, needEnergy: 1, needInsight: 1, needConnection: 3 } },
      { text: "To process difficult emotions", value: "process", scores: { needCalm: 2, needEnergy: -1, needInsight: 2, needConnection: 2 } }
    ]
  },
  {
    id: "physical-state",
    text: "How does your body feel?",
    options: [
      { text: "Relaxed and comfortable", value: "relaxed", scores: { bodyState: 2 } },
      { text: "Tense or tight", value: "tense", scores: { bodyState: -1 } },
      { text: "Tired or depleted", value: "tired", scores: { bodyState: -2 } },
      { text: "Restless or fidgety", value: "restless", scores: { bodyState: 0 } }
    ]
  },
  {
    id: "environment",
    text: "Where are you right now?",
    options: [
      { text: "Quiet, private space", value: "private", scores: { environment: 3 } },
      { text: "Semi-private (might be interrupted)", value: "semi", scores: { environment: 2 } },
      { text: "Public or busy environment", value: "public", scores: { environment: 1 } },
      { text: "In nature", value: "nature", scores: { environment: 3, natureBonus: 2 } }
    ]
  }
];

// Scoring logic
function recommendPractices(answers: Record<string, string>): Practice[] {
  const scores: Record<string, number> = {
    energy: 0,
    stability: 0,
    openness: 0,
    experience: 0,
    time: 0,
    needCalm: 0,
    needEnergy: 0,
    needInsight: 0,
    needConnection: 0,
    bodyState: 0,
    environment: 0,
    natureBonus: 0
  };

  // Calculate scores from answers
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const option = question.options.find(o => o.value === answerValue);
      if (option) {
        Object.entries(option.scores).forEach(([key, value]) => {
          scores[key] = (scores[key] || 0) + value;
        });
      }
    }
  });

  // Score each practice
  const practiceScores = practices.map(practice => {
    let score = 0;

    // Experience matching
    if (practice.intensity === "gentle") {
      score += 3 - scores.experience; // Beginners prefer gentle
    } else if (practice.intensity === "deep") {
      score += scores.experience - 1; // Advanced prefer deep
    }

    // Time matching
    if (scores.time === 1 && practice.duration.includes("5-")) score += 2;
    if (scores.time === 2 && practice.duration.includes("15-")) score += 2;
    if (scores.time === 3) score += 1; // Long time = any practice works

    // Need matching
    if (scores.needCalm > 1 && ["breath-awareness", "body-scan", "gratitude"].includes(practice.id)) score += 3;
    if (scores.needEnergy > 1 && ["energy-practices", "nature-communion"].includes(practice.id)) score += 3;
    if (scores.needInsight > 1 && ["inquiry", "witness-consciousness", "contemplation"].includes(practice.id)) score += 3;
    if (scores.needConnection > 1 && ["loving-kindness", "nature-communion"].includes(practice.id)) score += 3;

    // Body state matching
    if (scores.bodyState < 0 && practice.id === "body-scan") score += 2;
    if (scores.bodyState === -2 && practice.intensity === "gentle") score += 2;

    // Environment matching
    if (scores.environment < 2 && practice.intensity !== "gentle") score -= 2;
    if (scores.natureBonus > 0 && practice.id === "nature-communion") score += 3;

    // Stability check - don't recommend intense practices if unstable
    if (scores.stability < 0 && (practice.intensity === "intense" || practice.intensity === "deep")) {
      score -= 5;
    }

    return { practice, score };
  });

  // Sort by score and return top 3
  return practiceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(ps => ps.practice);
}

// Intensity badge component
function IntensityBadge({ intensity }: { intensity: Practice["intensity"] }) {
  const config = {
    gentle: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", emoji: "🟢", label: "Gentle" },
    moderate: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", emoji: "🟡", label: "Moderate" },
    intense: { color: "bg-orange-500/20 text-orange-400 border-orange-500/30", emoji: "🟠", label: "Intense" },
    deep: { color: "bg-red-500/20 text-red-400 border-red-500/30", emoji: "🔴", label: "Deep Work" }
  };
  const { color, emoji, label } = config[intensity];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
      {emoji} {label}
    </span>
  );
}

export default function PracticeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Practice[]>([]);

  // SEO
  useEffect(() => {
    document.title = "Practice Selection Quiz | Find Your Path | Project Eternal Lattice";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover which consciousness practice is right for you right now. This interactive quiz guides you to the perfect meditation, contemplation, or energy practice based on your current state and needs.');
    }
  }, []);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendations
      const recs = recommendPractices(newAnswers);
      setRecommendations(recs);
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-gradient-gold">
            Practice Selection Guide
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions to find the practice that's right for you right now
          </p>
        </motion.div>

        {/* Safety Notice */}
        <motion.div
          className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-200 font-medium mb-1">Safety First</p>
              <p className="text-amber-200/70">
                If you're in crisis or experiencing severe distress, please reach out for support: 
                <a href="tel:988" className="text-amber-400 hover:underline ml-1">988 Lifeline</a> or 
                <a href="tel:741741" className="text-amber-400 hover:underline ml-1">Text 741741</a>
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question Card */}
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-foreground">
                    {questions[currentQuestion].text}
                  </CardTitle>
                  {questions[currentQuestion].subtext && (
                    <CardDescription className="text-muted-foreground">
                      {questions[currentQuestion].subtext}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      className="w-full p-4 text-left rounded-xl border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all"
                      onClick={() => handleAnswer(option.value)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-foreground">{option.text}</span>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>

              {/* Navigation */}
              {currentQuestion > 0 && (
                <motion.div 
                  className="mt-4 flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Button variant="ghost" onClick={goBack} className="text-muted-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Results Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                </motion.div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-2 text-foreground">
                  Your Recommended Practices
                </h2>
                <p className="text-muted-foreground">
                  Based on your current state and needs, here's what we suggest
                </p>
              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                {recommendations.map((practice, index) => (
                  <motion.div
                    key={practice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Card className={`glass-card border-primary/20 overflow-hidden ${index === 0 ? 'ring-2 ring-primary/50' : ''}`}>
                      <div className={`h-1 ${practice.color}`} />
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${practice.color}/20`}>
                              <practice.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                                {practice.name}
                                {index === 0 && (
                                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                    Top Pick
                                  </span>
                                )}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <IntensityBadge intensity={practice.intensity} />
                                <span className="text-xs text-muted-foreground">{practice.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{practice.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {practice.benefits.map((benefit, i) => (
                            <span key={i} className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-full">
                              {benefit}
                            </span>
                          ))}
                        </div>

                        {practice.contraindications && (
                          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
                            <p className="text-xs text-amber-200/80">
                              <strong>Note:</strong> {practice.contraindications.join(". ")}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Learn more in {practice.chapter}
                          </span>
                          <Link href="/read">
                            <Button variant="outline" size="sm" className="text-primary border-primary/30">
                              Read in ToE
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Actions */}
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button onClick={restart} variant="outline" className="border-primary/30">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Quiz Again
                </Button>
                <Link href="/practices">
                  <Button className="bg-primary hover:bg-primary/90">
                    Explore All Practices
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              {/* Support reminder */}
              <motion.div
                className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-muted-foreground">
                  Remember: These are suggestions, not prescriptions. Trust your intuition. 
                  If a practice doesn't feel right, honor that wisdom.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
