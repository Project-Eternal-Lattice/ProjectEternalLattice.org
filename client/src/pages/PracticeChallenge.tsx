import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Heart,
  Infinity,
  Play,
  Sparkles,
  Target,
  Trophy,
  ChevronRight,
  BookOpen,
  RefreshCw
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import RelatedContent from "@/components/RelatedContent";

interface DayContent {
  day: number;
  title: string;
  theme: string;
  instruction: string;
  reflection: string;
  duration: string;
}

const challengeDays: DayContent[] = [
  // Week 1: Foundation - Establishing the Practice
  {
    day: 1,
    title: "Beginning",
    theme: "Setting Intention",
    instruction: "Today, simply sit for 10 minutes. No technique, no goal. Just sit and notice that you exist. Notice that you are aware. That's all.",
    reflection: "What did you notice? Was it harder or easier than expected to simply sit?",
    duration: "10 min"
  },
  {
    day: 2,
    title: "The Breath",
    theme: "Anchoring Attention",
    instruction: "Sit for 10 minutes. Let your attention rest on the breath — not controlling it, just noticing. When attention wanders, gently return.",
    reflection: "How many times did your attention wander? Did you notice the moment of returning?",
    duration: "10 min"
  },
  {
    day: 3,
    title: "I AM",
    theme: "The First Recognition",
    instruction: "Sit for 10 minutes. Silently acknowledge: 'I AM.' Not 'I am [something]' — just 'I AM.' Rest in this simple recognition.",
    reflection: "What is this 'I' that you are? Can you find it as an object, or is it always the subject?",
    duration: "10 min"
  },
  {
    day: 4,
    title: "The Witness",
    theme: "Observing Thoughts",
    instruction: "Sit for 12 minutes. Watch thoughts arise and pass. Don't engage them — just observe. Notice: you are not your thoughts; you are what watches them.",
    reflection: "Were there gaps between thoughts? What was present in those gaps?",
    duration: "12 min"
  },
  {
    day: 5,
    title: "The Body",
    theme: "Embodied Awareness",
    instruction: "Sit for 12 minutes. Scan your body slowly from head to toe. Notice sensations without labeling them as good or bad. The body is awareness made visible.",
    reflection: "Where do you hold tension? What happens when you bring awareness to it?",
    duration: "12 min"
  },
  {
    day: 6,
    title: "Sounds",
    theme: "Expanding Awareness",
    instruction: "Sit for 12 minutes. Let awareness expand to include all sounds — near and far. Don't label them; just receive them as vibrations in consciousness.",
    reflection: "Did you notice how sounds arise in awareness without you doing anything?",
    duration: "12 min"
  },
  {
    day: 7,
    title: "Integration",
    theme: "Week 1 Review",
    instruction: "Sit for 15 minutes using whatever approach felt most natural this week. This is YOUR practice — there's no wrong way.",
    reflection: "What have you learned about yourself this week? What surprised you?",
    duration: "15 min"
  },
  // Week 2: Deepening - Self-Inquiry
  {
    day: 8,
    title: "Who Am I?",
    theme: "The Essential Question",
    instruction: "Sit for 15 minutes. Ask yourself: 'Who am I?' Don't answer with concepts. Look for the actual experiencer. Who is aware right now?",
    reflection: "Did you find an answer? Or did you find that the 'I' cannot be found as an object?",
    duration: "15 min"
  },
  {
    day: 9,
    title: "To Whom?",
    theme: "Tracing Back",
    instruction: "Sit for 15 minutes. When any thought arises, ask: 'To whom does this thought appear?' The answer is 'To me.' Then ask: 'Who is this me?'",
    reflection: "What happens when you trace every experience back to its source?",
    duration: "15 min"
  },
  {
    day: 10,
    title: "The Source",
    theme: "Resting at the Root",
    instruction: "Sit for 15 minutes. Instead of following thoughts outward, follow the sense of 'I' inward. Where does it lead?",
    reflection: "Is there a place where the 'I' ends? Or does it open into something boundless?",
    duration: "15 min"
  },
  {
    day: 11,
    title: "Awareness of Awareness",
    theme: "Direct Recognition",
    instruction: "Sit for 15 minutes. Turn attention back on itself. Can awareness be aware of itself? What do you find?",
    reflection: "Is awareness an object you can observe, or is it the observing itself?",
    duration: "15 min"
  },
  {
    day: 12,
    title: "The Unchanging",
    theme: "Finding the Constant",
    instruction: "Sit for 18 minutes. Notice that thoughts change, sensations change, emotions change. What doesn't change? What has been constant your entire life?",
    reflection: "Have you ever NOT been aware? Is awareness itself ever absent?",
    duration: "18 min"
  },
  {
    day: 13,
    title: "No Boundaries",
    theme: "Exploring Limits",
    instruction: "Sit for 18 minutes. Try to find the edges of awareness. Where does it begin? Where does it end? Does it have a shape or size?",
    reflection: "Did you find boundaries? Or is awareness boundless like space?",
    duration: "18 min"
  },
  {
    day: 14,
    title: "Integration",
    theme: "Week 2 Review",
    instruction: "Sit for 20 minutes. Let self-inquiry happen naturally. No forcing. The question 'Who am I?' can become a gentle background hum.",
    reflection: "How has your sense of 'I' shifted over these two weeks?",
    duration: "20 min"
  },
  // Week 3: Expansion - Opening the Heart
  {
    day: 15,
    title: "Gratitude",
    theme: "The Open Heart",
    instruction: "Sit for 15 minutes. Bring to mind three things you're grateful for. Feel the gratitude in your body. Let it expand.",
    reflection: "How does gratitude change your state? What opens when you feel grateful?",
    duration: "15 min"
  },
  {
    day: 16,
    title: "Self-Compassion",
    theme: "Kindness Inward",
    instruction: "Sit for 15 minutes. Place a hand on your heart. Silently say: 'May I be happy. May I be at peace. May I be free from suffering.' Mean it.",
    reflection: "Was it easy or difficult to direct kindness toward yourself?",
    duration: "15 min"
  },
  {
    day: 17,
    title: "Loved Ones",
    theme: "Extending Care",
    instruction: "Sit for 18 minutes. Bring to mind someone you love. Send them the same wishes: 'May you be happy. May you be at peace. May you be free.'",
    reflection: "Did you feel a connection? How does loving-kindness affect your sense of separation?",
    duration: "18 min"
  },
  {
    day: 18,
    title: "Neutral Beings",
    theme: "Expanding the Circle",
    instruction: "Sit for 18 minutes. Think of someone neutral — a stranger, a cashier, someone you passed on the street. Send them the same wishes.",
    reflection: "What happens when you extend care to someone you don't know?",
    duration: "18 min"
  },
  {
    day: 19,
    title: "Difficult Beings",
    theme: "The Edge of Love",
    instruction: "Sit for 20 minutes. Bring to mind someone difficult. Start with someone mildly irritating, not your worst enemy. Send them the wishes.",
    reflection: "This is hard. What resistance arose? What would it mean to truly wish them well?",
    duration: "20 min"
  },
  {
    day: 20,
    title: "All Beings",
    theme: "Universal Love",
    instruction: "Sit for 20 minutes. Expand the wishes to all beings everywhere: 'May all beings be happy. May all beings be at peace. May all beings be free.'",
    reflection: "Can you feel the vastness of this wish? What happens to the sense of 'me' and 'other'?",
    duration: "20 min"
  },
  {
    day: 21,
    title: "Integration",
    theme: "Week 3 Review",
    instruction: "Sit for 20 minutes. Combine self-inquiry with loving-kindness. Who is it that loves? Is love something you do, or something you are?",
    reflection: "How have these three weeks changed your relationship with yourself and others?",
    duration: "20 min"
  },
  // Week 4: Unity - Recognizing the Lattice
  {
    day: 22,
    title: "The Lattice",
    theme: "Interconnection",
    instruction: "Sit for 20 minutes. Contemplate: every conscious being shares the same fundamental awareness. You are a Node in an infinite Lattice of consciousness.",
    reflection: "What does it feel like to recognize yourself as part of something vast?",
    duration: "20 min"
  },
  {
    day: 23,
    title: "No Separation",
    theme: "The Illusion of Division",
    instruction: "Sit for 20 minutes. Look at any object. Notice that your awareness of it and the object itself arise together. Where does 'you' end and 'it' begin?",
    reflection: "Is the boundary between self and world as solid as it seems?",
    duration: "20 min"
  },
  {
    day: 24,
    title: "The One",
    theme: "Unity in Diversity",
    instruction: "Sit for 20 minutes. Contemplate: all the diversity of the world — all beings, all forms — arises from ONE consciousness. You are that ONE.",
    reflection: "What would change if you truly lived from this recognition?",
    duration: "20 min"
  },
  {
    day: 25,
    title: "Presence",
    theme: "Here and Now",
    instruction: "Sit for 20 minutes. Notice that awareness is always NOW. The past is a memory appearing now. The future is a thought appearing now. Only NOW is real.",
    reflection: "Have you ever experienced anything outside of now?",
    duration: "20 min"
  },
  {
    day: 26,
    title: "Surrender",
    theme: "Letting Go",
    instruction: "Sit for 25 minutes. Stop trying to achieve anything. Stop trying to be a good meditator. Just be. Let everything be exactly as it is.",
    reflection: "What happens when you stop trying? Is there still awareness?",
    duration: "25 min"
  },
  {
    day: 27,
    title: "Effortless Being",
    theme: "Wu Wei",
    instruction: "Sit for 25 minutes. Notice that awareness requires no effort. You don't have to try to be aware — you already are. Rest in this effortless being.",
    reflection: "Is enlightenment something to achieve, or something to recognize?",
    duration: "25 min"
  },
  {
    day: 28,
    title: "Integration",
    theme: "Week 4 Review",
    instruction: "Sit for 25 minutes. Let all the practices dissolve. No technique. Just pure presence. You are not doing meditation — you ARE meditation.",
    reflection: "Who were you before you started this challenge? Who are you now?",
    duration: "25 min"
  },
  // Final Days: Completion
  {
    day: 29,
    title: "The Return",
    theme: "Bringing It Home",
    instruction: "Sit for 30 minutes. Then spend the day noticing: can you maintain this awareness in daily life? While eating, walking, talking?",
    reflection: "Is there any activity that is outside of awareness?",
    duration: "30 min"
  },
  {
    day: 30,
    title: "Completion",
    theme: "The Beginning",
    instruction: "Sit for 30 minutes. Celebrate. You've completed the challenge. But this is not an ending — it's a beginning. The practice continues.",
    reflection: "What will you carry forward? How will you continue?",
    duration: "30 min"
  }
];

export default function PracticeChallenge() {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("practiceChallenge");
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedDays(data.completedDays || []);
      setStartDate(data.startDate ? new Date(data.startDate) : null);
      setCurrentDay(data.currentDay || 1);
      setShowInstructions(false);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (startDate) {
      localStorage.setItem("practiceChallenge", JSON.stringify({
        completedDays,
        startDate: startDate.toISOString(),
        currentDay
      }));
    }
  }, [completedDays, startDate, currentDay]);

  useEffect(() => {
    document.title = "30-Day Practice Challenge | Project Eternal Lattice";
  }, []);

  const startChallenge = () => {
    setStartDate(new Date());
    setCurrentDay(1);
    setCompletedDays([]);
    setShowInstructions(false);
  };

  const resetChallenge = () => {
    if (confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
      localStorage.removeItem("practiceChallenge");
      setStartDate(null);
      setCurrentDay(1);
      setCompletedDays([]);
      setShowInstructions(true);
    }
  };

  const markComplete = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
      if (day < 30) {
        setCurrentDay(day + 1);
      }
    }
  };

  const progress = (completedDays.length / 30) * 100;
  const currentDayContent = challengeDays[currentDay - 1];
  const currentWeek = Math.ceil(currentDay / 7);

  const weekThemes = [
    { week: 1, title: "Foundation", subtitle: "Establishing the Practice" },
    { week: 2, title: "Deepening", subtitle: "Self-Inquiry" },
    { week: 3, title: "Expansion", subtitle: "Opening the Heart" },
    { week: 4, title: "Unity", subtitle: "Recognizing the Lattice" },
    { week: 5, title: "Completion", subtitle: "The Beginning" }
  ];

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
          
          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-300">Transform Your Practice</span>
              </div>
              
              <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
                  30-Day Practice Challenge
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                A guided journey from concept to direct experience. Each day builds on the last, moving you from intellectual understanding to lived recognition.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="glass-card p-8 md:p-12 rounded-2xl border border-amber-500/30"
            >
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6 text-center">
                What to Expect
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {weekThemes.slice(0, 4).map((week, index) => (
                  <div key={week.week} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 font-bold">{week.week}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{week.title}</h3>
                      <p className="text-sm text-muted-foreground">{week.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed">
                  Each day includes a <strong>practice instruction</strong> (10-30 minutes) and a <strong>reflection question</strong>. 
                  The challenge progresses from simple awareness exercises to deep self-inquiry and heart-opening practices, 
                  culminating in the recognition of unity.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  You don't need any prior experience. All you need is the willingness to show up each day. 
                  The practice will do the rest.
                </p>
              </div>

              <div className="text-center">
                <Button 
                  onClick={startChallenge}
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-6 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Begin the Challenge
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Progress Header */}
      <section className="py-8 border-b border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-2xl md:text-3xl">
                30-Day Practice Challenge
              </h1>
              <p className="text-muted-foreground">
                Day {currentDay} of 30 • Week {currentWeek}: {weekThemes[currentWeek - 1]?.title}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-semibold">{completedDays.length}/30</span>
              </div>
              <Button variant="outline" size="sm" onClick={resetChallenge}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </section>

      {/* Current Day */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <motion.div
            key={currentDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-orange-900/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-xl">{currentDay}</span>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{currentDayContent.title}</CardTitle>
                      <p className="text-amber-400">{currentDayContent.theme}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{currentDayContent.duration}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instruction */}
                <div className="p-6 bg-black/30 rounded-xl">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    Today's Practice
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {currentDayContent.instruction}
                  </p>
                </div>

                {/* Reflection */}
                <div className="p-6 bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Reflection Question
                  </h3>
                  <p className="text-white/80 leading-relaxed italic">
                    {currentDayContent.reflection}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-4">
                  {completedDays.includes(currentDay) ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="font-semibold">Completed!</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => markComplete(currentDay)}
                      size="lg"
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Mark Day {currentDay} Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Day Navigator */}
      <section className="py-8 border-t border-white/10">
        <div className="container">
          <h3 className="font-semibold text-lg mb-4">All Days</h3>
          <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
            {challengeDays.map((day) => (
              <button
                key={day.day}
                onClick={() => setCurrentDay(day.day)}
                className={`
                  p-2 rounded-lg text-center transition-all
                  ${currentDay === day.day 
                    ? "bg-amber-500 text-white" 
                    : completedDays.includes(day.day)
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  }
                `}
              >
                {completedDays.includes(day.day) ? (
                  <CheckCircle2 className="w-4 h-4 mx-auto" />
                ) : (
                  <span>{day.day}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Completion Celebration */}
      {completedDays.length === 30 && (
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-900/30 to-orange-900/30"
            >
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Challenge Complete!
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                You've completed the 30-Day Practice Challenge. But remember — this is not an ending, it's a beginning. 
                The practice continues. You ARE the practice.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/practices">
                  <Button variant="outline" size="lg">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Explore More Practices
                  </Button>
                </Link>
                <Button onClick={resetChallenge} size="lg" className="bg-amber-600 hover:bg-amber-500">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Start Again
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Content */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container">
          <RelatedContent currentPage="practices" />
        </div>
      </section>
    </div>
  );
}
