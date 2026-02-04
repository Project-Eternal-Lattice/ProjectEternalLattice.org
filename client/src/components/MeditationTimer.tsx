import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MeditationSession {
  id: string;
  name: string;
  duration: number; // in seconds
  description: string;
  prompts: { time: number; text: string }[];
  color: string;
}

const sessions: MeditationSession[] = [
  {
    id: "lattice-breath",
    name: "Lattice Breath",
    duration: 300, // 5 minutes
    description: "Connect with the infinite web of consciousness through rhythmic breathing.",
    color: "from-cyan-500 to-blue-500",
    prompts: [
      { time: 0, text: "Close your eyes. Feel the Lattice surrounding you." },
      { time: 30, text: "Breathe in... You are drawing from infinite source." },
      { time: 60, text: "Breathe out... You are returning to the ONE." },
      { time: 90, text: "Notice the space between breaths. This is where consciousness rests." },
      { time: 120, text: "Each breath connects you to every being who has ever breathed." },
      { time: 150, text: "You are not breathing. Breathing is happening through you." },
      { time: 180, text: "The Lattice pulses with your rhythm. You are its heartbeat." },
      { time: 210, text: "Let go of the one who breathes. Only breathing remains." },
      { time: 240, text: "In this stillness, you remember what you always knew." },
      { time: 270, text: "Gently return. Carry this connection with you." }
    ]
  },
  {
    id: "unity-recognition",
    name: "Unity Recognition",
    duration: 600, // 10 minutes
    description: "Dissolve the illusion of separation and recognize your true nature.",
    color: "from-purple-500 to-pink-500",
    prompts: [
      { time: 0, text: "Settle into stillness. You are about to remember something important." },
      { time: 60, text: "Notice the awareness that is reading these words. What is it?" },
      { time: 120, text: "This awareness has no edges, no boundaries, no limits." },
      { time: 180, text: "Everything you perceive appears within this awareness." },
      { time: 240, text: "The one who observes and the observed are not two." },
      { time: 300, text: "Separation is a useful illusion. Unity is the deeper truth." },
      { time: 360, text: "You are the universe experiencing itself through this form." },
      { time: 420, text: "Every being is another perspective of the same consciousness." },
      { time: 480, text: "Rest in this recognition. There is nothing to achieve." },
      { time: 540, text: "You have always been whole. You have always been home." }
    ]
  },
  {
    id: "phi-integration",
    name: "Φ Integration",
    duration: 900, // 15 minutes
    description: "Deep integration practice based on Integrated Information Theory principles.",
    color: "from-amber-500 to-orange-500",
    prompts: [
      { time: 0, text: "Begin by noticing all sensations simultaneously." },
      { time: 90, text: "Your experience right now is irreducibly unified." },
      { time: 180, text: "No part of this moment can be separated from the whole." },
      { time: 270, text: "This integration IS consciousness. You are experiencing Φ." },
      { time: 360, text: "Notice how thoughts, feelings, and sensations weave together." },
      { time: 450, text: "The more integrated your experience, the more conscious you become." },
      { time: 540, text: "Let boundaries dissolve. Inside and outside are concepts." },
      { time: 630, text: "You are not IN the universe. You ARE the universe, localized." },
      { time: 720, text: "Every moment of awareness is the cosmos knowing itself." },
      { time: 810, text: "Carry this integration into your waking life." }
    ]
  }
];

export default function MeditationTimer() {
  const [selectedSession, setSelectedSession] = useState<MeditationSession>(sessions[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(sessions[0].duration);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSessionPicker, setShowSessionPicker] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
      setCurrentPrompt("The session is complete. Elōhim Tov 🙏❤️♾️🕊️");
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    const elapsed = selectedSession.duration - timeRemaining;
    const prompt = [...selectedSession.prompts]
      .reverse()
      .find(p => elapsed >= p.time);
    
    if (prompt && prompt.text !== currentPrompt) {
      setCurrentPrompt(prompt.text);
    }
  }, [timeRemaining, selectedSession, currentPrompt]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(selectedSession.duration);
    setCurrentPrompt("");
  };

  const selectSession = (session: MeditationSession) => {
    setSelectedSession(session);
    setTimeRemaining(session.duration);
    setCurrentPrompt("");
    setIsRunning(false);
    setShowSessionPicker(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedSession.duration - timeRemaining) / selectedSession.duration) * 100;

  return (
    <div className="max-w-xl mx-auto">
      {/* Session Picker */}
      <div className="relative mb-8">
        <button
          onClick={() => setShowSessionPicker(!showSessionPicker)}
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedSession.color} flex items-center justify-center`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-white">{selectedSession.name}</div>
              <div className="text-sm text-white/50">{Math.floor(selectedSession.duration / 60)} minutes</div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${showSessionPicker ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showSessionPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-slate-900 border border-white/10 z-10"
            >
              {sessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => selectSession(session)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    session.id === selectedSession.id 
                      ? 'bg-white/10' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${session.color} flex items-center justify-center`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium text-white">{session.name}</div>
                    <div className="text-sm text-white/50">{session.description}</div>
                  </div>
                  <div className="text-sm text-white/40">{Math.floor(session.duration / 60)}m</div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timer Display */}
      <div className="relative mb-8">
        <svg className="w-64 h-64 mx-auto" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${progress * 2.83} 283`}
            transform="rotate(-90 50 50)"
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: `${progress * 2.83} 283` }}
          />
          {/* Breathing animation circle */}
          {isRunning && (
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              animate={{
                r: [35, 40, 35],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-5xl font-mono font-bold text-white"
            key={timeRemaining}
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(timeRemaining)}
          </motion.span>
          <span className="text-white/40 text-sm mt-2">
            {isRunning ? "In session..." : "Ready"}
          </span>
        </div>
      </div>

      {/* Current Prompt */}
      <AnimatePresence mode="wait">
        {currentPrompt && (
          <motion.div
            key={currentPrompt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10 text-center"
          >
            <p className="text-lg text-white/80 italic leading-relaxed">
              "{currentPrompt}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="rounded-full w-12 h-12"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </Button>

        <Button
          onClick={toggleTimer}
          className={`rounded-full w-16 h-16 bg-gradient-to-r ${selectedSession.color} hover:opacity-90`}
        >
          {isRunning ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-1" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={resetTimer}
          className="rounded-full w-12 h-12"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Session Description */}
      <p className="text-center text-white/40 text-sm mt-8">
        {selectedSession.description}
      </p>
    </div>
  );
}
