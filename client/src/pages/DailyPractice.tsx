/**
 * Daily Practice Page
 * 
 * A sanctuary for daily spiritual practice, combining:
 * - Morning and evening practice modes
 * - Meditation timer with guided options
 * - Daily wisdom from the ToE
 * - Journaling prompts and reflection space
 * - Streak tracking for consistent practice
 * 
 * "The practice is not preparation for life. The practice IS life." — ToE
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sun, Moon, Play, Pause, RotateCcw, 
  Flame, BookOpen, PenLine, Heart,
  Sparkles, Clock, Calendar, CheckCircle2
} from 'lucide-react';
import { useAchievements } from '@/contexts/AchievementContext';

// Daily wisdom quotes from the ToE
const MORNING_WISDOM = [
  { quote: "Today, consciousness wakes through you. What will you create?", source: "ToE, Chapter 1" },
  { quote: "The Lattice holds steady. And so do you.", source: "ToE, Closing" },
  { quote: "You are not a drop in the ocean. You are the entire ocean in a drop.", source: "Rumi, via ToE" },
  { quote: "Every morning is a new universe being born. You are its witness and creator.", source: "ToE, Chapter 7" },
  { quote: "The ONE experiences itself through your eyes today. What will you show it?", source: "ToE, Chapter 3" },
  { quote: "Separation is the illusion. Connection is the reality. Act accordingly.", source: "ToE, Chapter 4" },
  { quote: "Your thoughts shape reality. Choose them with intention.", source: "ToE, Chapter 5" },
];

const EVENING_WISDOM = [
  { quote: "Rest now. The Lattice continues its work while you dream.", source: "ToE, Chapter 12" },
  { quote: "What did you learn today? The universe is curious.", source: "ToE, Chapter 8" },
  { quote: "Gratitude is not just politeness. It's a technology for abundance.", source: "ToE, Chapter 6" },
  { quote: "Sleep is not unconsciousness. It's a different kind of awareness.", source: "ToE, Chapter 11" },
  { quote: "Release what no longer serves. Tomorrow is a fresh canvas.", source: "ToE, Chapter 9" },
  { quote: "You did enough today. You ARE enough. Always.", source: "ToE, Chapter 10" },
];

const JOURNALING_PROMPTS = {
  morning: [
    "What intention do I want to set for today?",
    "What am I grateful for this morning?",
    "How can I serve the Lattice today?",
    "What would make today meaningful?",
    "What fear am I ready to release?",
  ],
  evening: [
    "What moment today felt most alive?",
    "Where did I notice the ONE today?",
    "What am I grateful for from today?",
    "What would I do differently?",
    "What insight wants to emerge?",
  ],
};

// Meditation presets
const MEDITATIONS = [
  { name: "Quick Center", duration: 180, description: "3 minutes to return to presence" },
  { name: "Lattice Breath", duration: 420, description: "7 minutes of connected breathing" },
  { name: "Deep Unity", duration: 900, description: "15 minutes of dissolution into ONE" },
  { name: "Custom", duration: 0, description: "Set your own duration" },
];

// Storage keys
const STORAGE_KEYS = {
  streak: 'daily_practice_streak',
  lastPractice: 'daily_practice_last',
  journal: 'daily_practice_journal',
};

interface JournalEntry {
  date: string;
  mode: 'morning' | 'evening';
  prompt: string;
  response: string;
}

export default function DailyPractice() {
  const [mode, setMode] = useState<'morning' | 'evening'>(() => {
    const hour = new Date().getHours();
    return hour < 14 ? 'morning' : 'evening';
  });
  
  const [streak, setStreak] = useState(0);
  const [todayComplete, setTodayComplete] = useState(false);
  const { unlockAchievement } = useAchievements();
  const hasUnlockedMeditation = useRef(false);
  
  // Meditation state
  const [selectedMeditation, setSelectedMeditation] = useState(MEDITATIONS[0]);
  const [customDuration, setCustomDuration] = useState(300);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [meditationComplete, setMeditationComplete] = useState(false);
  
  // Journal state
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([]);
  
  // Daily wisdom
  const [wisdom, setWisdom] = useState({ quote: '', source: '' });

  // Initialize on mount
  useEffect(() => {
    document.title = "Daily Practice | Project Eternal Lattice";
    
    // Load streak
    const storedStreak = localStorage.getItem(STORAGE_KEYS.streak);
    const lastPractice = localStorage.getItem(STORAGE_KEYS.lastPractice);
    
    if (storedStreak && lastPractice) {
      const lastDate = new Date(lastPractice);
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        setStreak(parseInt(storedStreak));
        setTodayComplete(true);
      } else if (diffDays === 1) {
        setStreak(parseInt(storedStreak));
      } else {
        // Streak broken
        setStreak(0);
        localStorage.setItem(STORAGE_KEYS.streak, '0');
      }
    }
    
    // Load journal entries
    const storedJournal = localStorage.getItem(STORAGE_KEYS.journal);
    if (storedJournal) {
      setSavedEntries(JSON.parse(storedJournal));
    }
    
    // Set random wisdom and prompt
    const wisdomList = mode === 'morning' ? MORNING_WISDOM : EVENING_WISDOM;
    setWisdom(wisdomList[Math.floor(Math.random() * wisdomList.length)]);
    
    const prompts = JOURNALING_PROMPTS[mode];
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, [mode]);

  // Meditation timer
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setMeditationComplete(true);
            // Unlock first_meditation achievement
            if (!hasUnlockedMeditation.current) {
              hasUnlockedMeditation.current = true;
              unlockAchievement('first_meditation');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);

  const startMeditation = () => {
    const duration = selectedMeditation.duration || customDuration;
    setTimeRemaining(duration);
    setIsRunning(true);
    setMeditationComplete(false);
  };

  const toggleMeditation = () => {
    setIsRunning(!isRunning);
  };

  const resetMeditation = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setMeditationComplete(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveJournalEntry = () => {
    if (!journalEntry.trim()) return;
    
    const entry: JournalEntry = {
      date: new Date().toISOString(),
      mode,
      prompt: currentPrompt,
      response: journalEntry,
    };
    
    const newEntries = [entry, ...savedEntries].slice(0, 30); // Keep last 30 entries
    setSavedEntries(newEntries);
    localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(newEntries));
    
    // Update streak
    if (!todayComplete) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setTodayComplete(true);
      localStorage.setItem(STORAGE_KEYS.streak, newStreak.toString());
      localStorage.setItem(STORAGE_KEYS.lastPractice, new Date().toISOString());
    }
    
    setJournalEntry('');
    
    // Get new prompt
    const prompts = JOURNALING_PROMPTS[mode];
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  const getNewPrompt = () => {
    const prompts = JOURNALING_PROMPTS[mode];
    let newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    while (newPrompt === currentPrompt && prompts.length > 1) {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    }
    setCurrentPrompt(newPrompt);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      mode === 'morning' 
        ? 'bg-gradient-to-b from-amber-950/30 via-background to-background' 
        : 'bg-gradient-to-b from-indigo-950/30 via-background to-background'
    }`}>
      <div className="container max-w-4xl py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            {mode === 'morning' ? (
              <Sun className="w-8 h-8 text-amber-400" />
            ) : (
              <Moon className="w-8 h-8 text-indigo-400" />
            )}
            <h1 className="font-heading text-4xl md:text-5xl">
              {mode === 'morning' ? 'Morning Practice' : 'Evening Practice'}
            </h1>
          </div>
          
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            A sacred space for daily connection with the Lattice
          </p>

          {/* Mode Toggle */}
          <div className="flex justify-center gap-2">
            <Button
              variant={mode === 'morning' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('morning')}
              className="gap-2"
            >
              <Sun className="w-4 h-4" />
              Morning
            </Button>
            <Button
              variant={mode === 'evening' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('evening')}
              className="gap-2"
            >
              <Moon className="w-4 h-4" />
              Evening
            </Button>
          </div>
        </motion.div>

        {/* Streak Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border ${
            todayComplete 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-card border-border text-muted-foreground'
          }`}>
            <Flame className={`w-5 h-5 ${streak > 0 ? 'text-orange-400' : ''}`} />
            <span className="font-medium">
              {streak} day streak
            </span>
            {todayComplete && (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>
        </motion.div>

        {/* Daily Wisdom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className={`border-2 ${
            mode === 'morning' ? 'border-amber-500/20' : 'border-indigo-500/20'
          }`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Sparkles className={`w-6 h-6 flex-shrink-0 ${
                  mode === 'morning' ? 'text-amber-400' : 'text-indigo-400'
                }`} />
                <div>
                  <p className="text-lg font-medium mb-2 italic">"{wisdom.quote}"</p>
                  <p className="text-sm text-muted-foreground">— {wisdom.source}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="meditate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meditate" className="gap-2">
              <Clock className="w-4 h-4" />
              Meditate
            </TabsTrigger>
            <TabsTrigger value="journal" className="gap-2">
              <PenLine className="w-4 h-4" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <BookOpen className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className={mode === 'morning' ? 'text-amber-400' : 'text-indigo-400'} />
                  Meditation Timer
                </CardTitle>
                <CardDescription>
                  Find stillness. The Lattice speaks in silence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timer Display */}
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    {timeRemaining > 0 || isRunning ? (
                      <motion.div
                        key="timer"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className={`text-7xl font-mono font-bold ${
                          mode === 'morning' ? 'text-amber-400' : 'text-indigo-400'
                        }`}>
                          {formatTime(timeRemaining)}
                        </div>
                        
                        {/* Progress ring */}
                        <div className="w-48 h-48 mx-auto relative">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="96"
                              cy="96"
                              r="88"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="text-muted/20"
                            />
                            <motion.circle
                              cx="96"
                              cy="96"
                              r="88"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              className={mode === 'morning' ? 'text-amber-400' : 'text-indigo-400'}
                              strokeDasharray={553}
                              animate={{
                                strokeDashoffset: 553 * (1 - timeRemaining / (selectedMeditation.duration || customDuration))
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">
                              {isRunning ? 'Breathing...' : 'Paused'}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-center gap-4">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={toggleMeditation}
                          >
                            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={resetMeditation}
                          >
                            <RotateCcw className="w-5 h-5" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : meditationComplete ? (
                      <motion.div
                        key="complete"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="py-8 space-y-4"
                      >
                        <div className="text-6xl">🙏</div>
                        <h3 className="text-2xl font-heading">Practice Complete</h3>
                        <p className="text-muted-foreground">
                          The stillness remains within you.
                        </p>
                        <Button onClick={resetMeditation} variant="outline">
                          Practice Again
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="select"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <p className="text-muted-foreground mb-4">
                          Choose your practice:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {MEDITATIONS.map((med) => (
                            <button
                              key={med.name}
                              onClick={() => setSelectedMeditation(med)}
                              className={`p-4 rounded-lg border text-left transition-all ${
                                selectedMeditation.name === med.name
                                  ? mode === 'morning'
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-indigo-500 bg-indigo-500/10'
                                  : 'border-border hover:border-muted-foreground'
                              }`}
                            >
                              <div className="font-medium">{med.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {med.duration > 0 ? `${med.duration / 60} min` : 'Custom'}
                              </div>
                            </button>
                          ))}
                        </div>

                        {selectedMeditation.name === 'Custom' && (
                          <div className="flex items-center gap-4 justify-center">
                            <span className="text-muted-foreground">Duration:</span>
                            <input
                              type="range"
                              min="60"
                              max="1800"
                              step="60"
                              value={customDuration}
                              onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                              className="w-48"
                            />
                            <span className="font-mono w-16">{customDuration / 60} min</span>
                          </div>
                        )}

                        <Button
                          size="lg"
                          onClick={startMeditation}
                          className={`gap-2 ${
                            mode === 'morning' 
                              ? 'bg-amber-600 hover:bg-amber-700' 
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          <Play className="w-5 h-5" />
                          Begin Practice
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenLine className={mode === 'morning' ? 'text-amber-400' : 'text-indigo-400'} />
                  Reflection Journal
                </CardTitle>
                <CardDescription>
                  Write without judgment. Let the words flow.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt */}
                <div className={`p-4 rounded-lg ${
                  mode === 'morning' ? 'bg-amber-500/10' : 'bg-indigo-500/10'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium italic">"{currentPrompt}"</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={getNewPrompt}
                      className="flex-shrink-0"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Text Area */}
                <Textarea
                  placeholder="Begin writing... Let your thoughts flow freely."
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-[200px] resize-none"
                />

                {/* Save Button */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {journalEntry.length} characters
                  </span>
                  <Button
                    onClick={saveJournalEntry}
                    disabled={!journalEntry.trim()}
                    className={
                      mode === 'morning' 
                        ? 'bg-amber-600 hover:bg-amber-700' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }
                  >
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className={mode === 'morning' ? 'text-amber-400' : 'text-indigo-400'} />
                  Journal History
                </CardTitle>
                <CardDescription>
                  Your journey of reflection
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No journal entries yet.</p>
                    <p className="text-sm">Start writing to build your history.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {savedEntries.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                          {entry.mode === 'morning' ? (
                            <Sun className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Moon className="w-4 h-4 text-indigo-400" />
                          )}
                          <span>
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <p className="text-sm italic text-muted-foreground mb-2">
                          "{entry.prompt}"
                        </p>
                        <p className="text-sm whitespace-pre-wrap">{entry.response}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-muted-foreground/60 text-sm"
        >
          <p>The practice is not preparation for life.</p>
          <p>The practice IS life.</p>
          <p className="mt-4">🙏❤️♾️🕊️</p>
        </motion.div>
      </div>
    </div>
  );
}
