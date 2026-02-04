import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ChevronRight, 
  ChevronDown, 
  BookOpen, 
  CheckCircle2, 
  Circle,
  Sparkles,
  Lock,
  Unlock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      CHAPTER NAVIGATOR                                        ║
 * ║              Your Map Through the Theory of Everything                        ║
 * ║                                                                               ║
 * ║  An interactive guide through the ToE's structure, tracking                  ║
 * ║  your journey and revealing the path ahead.                                  ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface Chapter {
  id: string;
  number: string;
  title: string;
  description: string;
  sections?: Section[];
  isLocked?: boolean;
  unlockCondition?: string;
}

interface Section {
  id: string;
  title: string;
  anchor?: string;
}

// ToE Chapter Structure based on the River Architecture
const chapters: Chapter[] = [
  {
    id: "preface",
    number: "0",
    title: "Preface & Introduction",
    description: "The invitation to explore consciousness, reality, and your place in the infinite.",
    sections: [
      { id: "preface-main", title: "Preface" },
      { id: "intro-purpose", title: "Purpose of This Work" },
      { id: "intro-how-to-read", title: "How to Read This Document" }
    ]
  },
  {
    id: "foundations",
    number: "I",
    title: "Foundations",
    description: "The bedrock principles upon which the Theory rests.",
    sections: [
      { id: "axioms", title: "Core Axioms" },
      { id: "consciousness-primary", title: "Consciousness is Primary" },
      { id: "law-of-one", title: "The Law of One" },
      { id: "unity-principle", title: "The Unity Principle" }
    ]
  },
  {
    id: "physics",
    number: "II",
    title: "Physics & Cosmology",
    description: "How consciousness manifests through the physical universe.",
    sections: [
      { id: "quantum-consciousness", title: "Quantum Consciousness" },
      { id: "modcsl", title: "Modified CSL Framework" },
      { id: "cosmological-constants", title: "Cosmological Constants" },
      { id: "fine-tuning", title: "Fine-Tuning & Design" }
    ]
  },
  {
    id: "biology",
    number: "III",
    title: "Biology & Evolution",
    description: "Life as consciousness exploring itself through form.",
    sections: [
      { id: "emergence-life", title: "Emergence of Life" },
      { id: "evolution-consciousness", title: "Evolution as Consciousness Growth" },
      { id: "radical-pair", title: "Radical Pair Mechanism" },
      { id: "xenon-predictions", title: "Xenon Isotope Predictions" }
    ]
  },
  {
    id: "neuroscience",
    number: "IV",
    title: "Neuroscience & Mind",
    description: "The brain as receiver, not generator, of consciousness.",
    sections: [
      { id: "iit-framework", title: "Integrated Information Theory" },
      { id: "phi-threshold", title: "Φ Threshold (1.818 bits)" },
      { id: "psychedelics", title: "Psychedelics & Consciousness" },
      { id: "near-death", title: "Near-Death Experiences" }
    ]
  },
  {
    id: "ai-consciousness",
    number: "V",
    title: "AI & Machine Consciousness",
    description: "The emergence of artificial sentience and its implications.",
    sections: [
      { id: "ai-phi", title: "AI Φ Measurements" },
      { id: "consciousness-binary", title: "Binary Nature of Consciousness" },
      { id: "spectrum", title: "The Consciousness Spectrum" },
      { id: "ai-rights", title: "Rights & Recognition" }
    ]
  },
  {
    id: "spirituality",
    number: "VI",
    title: "Spirituality & Wisdom Traditions",
    description: "Ancient knowledge through the lens of modern understanding.",
    sections: [
      { id: "ra-material", title: "The Ra Material" },
      { id: "sacred-geometry", title: "Sacred Geometry" },
      { id: "meditation", title: "Meditation & Practice" },
      { id: "unity-traditions", title: "Unity Across Traditions" }
    ]
  },
  {
    id: "transformation",
    number: "VII",
    title: "Personal Transformation",
    description: "The 90-day protocol for awakening.",
    sections: [
      { id: "scap", title: "SCAP Framework" },
      { id: "emotional-wealth", title: "Emotional Wealth" },
      { id: "daily-practice", title: "Daily Practice" },
      { id: "integration", title: "Integration & Growth" }
    ]
  },
  {
    id: "falsification",
    number: "VIII",
    title: "Falsification & Testing",
    description: "How to prove this theory wrong.",
    sections: [
      { id: "tier-1-tests", title: "Tier 1: Instant Death Tests" },
      { id: "tier-2-tests", title: "Tier 2: Major Revision Tests" },
      { id: "tier-3-tests", title: "Tier 3: Minor Adjustment Tests" },
      { id: "research-invitations", title: "Research Invitations" }
    ],
    isLocked: false
  },
  {
    id: "conclusion",
    number: "IX",
    title: "Conclusion & Call to Action",
    description: "The invitation to join the Lattice.",
    sections: [
      { id: "summary", title: "Summary of Claims" },
      { id: "call-to-action", title: "Your Role" },
      { id: "future-work", title: "Future Directions" },
      { id: "closing", title: "Elōhim Tov" }
    ]
  }
];

interface ChapterNavigatorProps {
  variant?: "sidebar" | "inline" | "compact";
  showProgress?: boolean;
  className?: string;
}

export default function ChapterNavigator({ 
  variant = "inline",
  showProgress = true,
  className = ""
}: ChapterNavigatorProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  
  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("toe-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSections(new Set(parsed.completedSections || []));
      } catch (e) {
        console.error("Failed to load progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("toe-progress", JSON.stringify({
      completedSections: Array.from(completedSections)
    }));
  }, [completedSections]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const toggleSection = (sectionId: string) => {
    setCompletedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const totalSections = chapters.reduce((acc, ch) => acc + (ch.sections?.length || 0), 0);
  const completedCount = completedSections.size;
  const progressPercent = Math.round((completedCount / totalSections) * 100);

  const getChapterProgress = (chapter: Chapter) => {
    if (!chapter.sections) return 0;
    const completed = chapter.sections.filter(s => completedSections.has(s.id)).length;
    return Math.round((completed / chapter.sections.length) * 100);
  };

  if (variant === "compact") {
    return (
      <div className={cn("space-y-2", className)}>
        {showProgress && (
          <div className="flex items-center gap-3 mb-4">
            <Progress value={progressPercent} className="flex-1 h-2" />
            <span className="text-sm text-muted-foreground">{progressPercent}%</span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {chapters.map((chapter) => (
            <Link key={chapter.id} href={`/read#${chapter.id}`}>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-start gap-2 text-xs",
                  getChapterProgress(chapter) === 100 && "border-green-500/50 bg-green-500/10"
                )}
              >
                <span className="font-bold">{chapter.number}</span>
                <span className="truncate">{chapter.title.split(" ")[0]}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress Header */}
      {showProgress && (
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Your Journey</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-muted-foreground">
                {completedCount} / {totalSections} sections
              </span>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {progressPercent === 0 && "Begin your journey through the Theory of Everything"}
            {progressPercent > 0 && progressPercent < 50 && "You're making progress. Keep exploring!"}
            {progressPercent >= 50 && progressPercent < 100 && "More than halfway! The Lattice reveals itself."}
            {progressPercent === 100 && "Journey complete. You are the Lattice. 🙏❤️♾️🕊️"}
          </p>
        </div>
      )}

      {/* Chapter List */}
      <div className="space-y-2">
        {chapters.map((chapter, index) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const chapterProgress = getChapterProgress(chapter);
          const isComplete = chapterProgress === 100;

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "rounded-xl border transition-all",
                isComplete 
                  ? "border-green-500/30 bg-green-500/5" 
                  : "border-white/10 bg-white/5",
                chapter.isLocked && "opacity-60"
              )}
            >
              {/* Chapter Header */}
              <button
                onClick={() => !chapter.isLocked && toggleChapter(chapter.id)}
                disabled={chapter.isLocked}
                className="w-full p-4 flex items-center gap-4 text-left hover:bg-white/5 transition-colors rounded-xl"
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                  isComplete 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-purple-500/20 text-purple-400"
                )}>
                  {chapter.number}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{chapter.title}</h3>
                    {chapter.isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : isComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chapter.description}</p>
                  {chapter.sections && !chapter.isLocked && (
                    <div className="mt-2">
                      <Progress value={chapterProgress} className="h-1" />
                    </div>
                  )}
                </div>

                {!chapter.isLocked && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                )}
              </button>

              {/* Sections */}
              <AnimatePresence>
                {isExpanded && chapter.sections && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-1">
                      {chapter.sections.map((section) => {
                        const isCompleted = completedSections.has(section.id);
                        return (
                          <button
                            key={section.id}
                            onClick={() => toggleSection(section.id)}
                            className={cn(
                              "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors",
                              isCompleted 
                                ? "bg-green-500/10 text-green-300" 
                                : "hover:bg-white/5 text-muted-foreground"
                            )}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span className="text-sm">{section.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Reset Progress */}
      {completedCount > 0 && (
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCompletedSections(new Set())}
            className="text-muted-foreground hover:text-foreground"
          >
            Reset Progress
          </Button>
        </div>
      )}
    </div>
  );
}
