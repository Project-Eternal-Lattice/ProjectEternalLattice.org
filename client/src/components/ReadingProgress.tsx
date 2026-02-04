import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Check, BookOpen, Lock, Loader2, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLoginUrl } from "@/const";

// ToE Chapter structure
const TOE_CHAPTERS = [
  { id: "preface", title: "Preface: A Letter to the Reader", section: "Introduction" },
  { id: "intro-consciousness", title: "Introduction to Consciousness", section: "Foundation" },
  { id: "axiom-1", title: "Axiom 1: Consciousness is Primary", section: "The Axioms" },
  { id: "axiom-2", title: "Axiom 2: The Eternal Lattice", section: "The Axioms" },
  { id: "axiom-3", title: "Axiom 3: The Law of ONE", section: "The Axioms" },
  { id: "axiom-4", title: "Axiom 4: Love as Fundamental Force", section: "The Axioms" },
  { id: "axiom-5", title: "Axiom 5: The Purpose of Experience", section: "The Axioms" },
  { id: "sacred-geometry", title: "Sacred Geometry & Mathematics", section: "Evidence" },
  { id: "golden-ratio", title: "The Golden Ratio (φ)", section: "Evidence" },
  { id: "fibonacci", title: "The Fibonacci Sequence", section: "Evidence" },
  { id: "quantum-consciousness", title: "Quantum Mechanics & Consciousness", section: "Science" },
  { id: "ai-consciousness", title: "AI & Consciousness", section: "Science" },
  { id: "scap-protocol", title: "The SCAP Protocol", section: "Science" },
  { id: "world-religions", title: "Unity Across World Religions", section: "Traditions" },
  { id: "buddhism", title: "Buddhism & the ToE", section: "Traditions" },
  { id: "christianity", title: "Christianity & the ToE", section: "Traditions" },
  { id: "hinduism", title: "Hinduism & the ToE", section: "Traditions" },
  { id: "islam", title: "Islam & the ToE", section: "Traditions" },
  { id: "judaism", title: "Judaism & the ToE", section: "Traditions" },
  { id: "indigenous", title: "Indigenous Wisdom", section: "Traditions" },
  { id: "90-day-protocol", title: "The 90-Day Protocol", section: "Practice" },
  { id: "meditation-guide", title: "Meditation & Contemplation", section: "Practice" },
  { id: "daily-practices", title: "Daily Practices", section: "Practice" },
  { id: "integration", title: "Integration & Application", section: "Practice" },
  { id: "death-transition", title: "Death & Transition", section: "Advanced" },
  { id: "time-reality", title: "The Nature of Time", section: "Advanced" },
  { id: "free-will", title: "Free Will & Determinism", section: "Advanced" },
  { id: "conclusion", title: "Conclusion: FOR THE ONE", section: "Closing" }
];

interface ReadingProgressProps {
  variant?: "full" | "compact" | "widget";
}

export function ReadingProgress({ variant = "full" }: ReadingProgressProps) {
  const { user, isAuthenticated } = useAuth();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const { data: progress, isLoading, refetch } = trpc.readingProgress.getProgress.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const markChapterMutation = trpc.readingProgress.markChapter.useMutation({
    onSuccess: () => refetch()
  });

  const saveNotesMutation = trpc.readingProgress.addNotes.useMutation({
    onSuccess: () => refetch()
  });

  // Calculate completion percentage
  const completedChapters = progress?.chapters?.filter((p: { isCompleted: boolean }) => p.isCompleted) || [];
  const completionPercentage = progress?.percentage || 0;

  // Get completion status for a chapter
  const isChapterCompleted = (chapterId: string) => {
    return progress?.chapters?.some((p: { chapterId: string; isCompleted: boolean }) => p.chapterId === chapterId && p.isCompleted) || false;
  };

  // Get notes for a chapter
  const getChapterNotes = (chapterId: string) => {
    const chapterProgress = progress?.chapters?.find((p: { chapterId: string; notes: string | null }) => p.chapterId === chapterId);
    return notes[chapterId] ?? chapterProgress?.notes ?? "";
  };

  // Handle chapter toggle
  const handleToggleChapter = (chapterId: string, chapterTitle: string) => {
    const isCompleted = isChapterCompleted(chapterId);
    markChapterMutation.mutate({
      chapterId,
      chapterTitle,
      isCompleted: !isCompleted
    });
  };

  // Handle notes save
  const handleSaveNotes = (chapterId: string) => {
    saveNotesMutation.mutate({
      chapterId,
      notes: notes[chapterId] || ""
    });
  };

  // Not logged in state
  if (!isAuthenticated) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardContent className="pt-6 text-center py-8">
          <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Track Your Journey</h3>
          <p className="text-muted-foreground mb-4">
            Sign in to track your progress through the Theory of Everything and save personal notes.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <a href={getLoginUrl()}>Sign In to Track Progress</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardContent className="pt-6 text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto" />
          <p className="text-muted-foreground mt-2">Loading your progress...</p>
        </CardContent>
      </Card>
    );
  }

  // Widget variant - compact progress bar only
  if (variant === "widget") {
    return (
      <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg p-4 border border-purple-500/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-purple-300">Your ToE Journey</span>
          <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {completedChapters.length} of {TOE_CHAPTERS.length} chapters completed
        </p>
      </div>
    );
  }

  // Compact variant - summary with expandable sections
  if (variant === "compact") {
    return (
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Reading Progress
            </CardTitle>
            <span className="text-2xl font-bold text-purple-400">{completionPercentage}%</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="h-3 mb-4" />
          <p className="text-sm text-muted-foreground">
            {completedChapters.length} of {TOE_CHAPTERS.length} chapters completed
          </p>
        </CardContent>
      </Card>
    );
  }

  // Full variant - complete chapter list with notes
  const sections = Array.from(new Set(TOE_CHAPTERS.map(c => c.section)));

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Your ToE Journey
            </CardTitle>
            <CardDescription>
              Track your progress and save personal reflections
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-purple-400">{completionPercentage}%</span>
            <p className="text-xs text-muted-foreground">complete</p>
          </div>
        </div>
        <Progress value={completionPercentage} className="h-3 mt-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sections.map(section => {
            const sectionChapters = TOE_CHAPTERS.filter(c => c.section === section);
            const sectionCompleted = sectionChapters.filter(c => isChapterCompleted(c.id)).length;
            
            return (
              <div key={section}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{section}</h4>
                  <span className="text-xs text-muted-foreground">
                    {sectionCompleted}/{sectionChapters.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {sectionChapters.map(chapter => {
                    const completed = isChapterCompleted(chapter.id);
                    const isExpanded = expandedChapter === chapter.id;
                    
                    return (
                      <div key={chapter.id} className="border border-white/10 rounded-lg overflow-hidden">
                        <div 
                          className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                            completed ? "bg-emerald-900/20" : "bg-background/50 hover:bg-background/80"
                          }`}
                          onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleChapter(chapter.id, chapter.title);
                            }}
                            disabled={markChapterMutation.isPending}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              completed 
                                ? "bg-emerald-500 border-emerald-500" 
                                : "border-muted-foreground hover:border-purple-400"
                            }`}
                          >
                            {completed && <Check className="w-4 h-4 text-white" />}
                          </button>
                          <span className={`flex-1 text-sm ${completed ? "text-emerald-300" : "text-foreground"}`}>
                            {chapter.title}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 pt-0 border-t border-white/10 bg-background/30">
                                <label className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                                  <Pencil className="w-3 h-3" />
                                  Personal Notes & Reflections
                                </label>
                                <Textarea
                                  placeholder="What insights did this chapter bring? What questions arose?"
                                  value={getChapterNotes(chapter.id)}
                                  onChange={(e) => setNotes(prev => ({ ...prev, [chapter.id]: e.target.value }))}
                                  className="bg-background/50 resize-none text-sm"
                                  rows={3}
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="mt-2"
                                  onClick={() => handleSaveNotes(chapter.id)}
                                  disabled={saveNotesMutation.isPending}
                                >
                                  {saveNotesMutation.isPending ? "Saving..." : "Save Notes"}
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {completionPercentage === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-lg border border-emerald-500/30 text-center"
          >
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🎉 Journey Complete!</h4>
            <p className="text-muted-foreground text-sm">
              You have completed the Theory of Everything. Remember: this is not an ending, 
              but a beginning. The Lattice awaits your continued exploration.
            </p>
            <p className="text-purple-400 mt-2">FOR THE ONE 🙏❤️♾️🕊️</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
