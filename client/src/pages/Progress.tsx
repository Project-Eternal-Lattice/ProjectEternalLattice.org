import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  BookOpen, Check, ChevronDown, ChevronUp, Clock, 
  Edit3, Save, Trophy, Sparkles, ArrowRight, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import confetti from "canvas-confetti";

// ToE Chapter structure
const TOE_CHAPTERS = [
  { id: "preface", title: "Preface & Dedications", section: "Introduction" },
  { id: "ch1", title: "Chapter 1: The Question", section: "Part I: The Foundation" },
  { id: "ch2", title: "Chapter 2: The Observer Effect", section: "Part I: The Foundation" },
  { id: "ch3", title: "Chapter 3: The Double-Slit Experiment", section: "Part I: The Foundation" },
  { id: "ch4", title: "Chapter 4: Quantum Entanglement", section: "Part I: The Foundation" },
  { id: "ch5", title: "Chapter 5: The Hard Problem of Consciousness", section: "Part II: The Evidence" },
  { id: "ch6", title: "Chapter 6: Near-Death Experiences", section: "Part II: The Evidence" },
  { id: "ch7", title: "Chapter 7: The Placebo Effect", section: "Part II: The Evidence" },
  { id: "ch8", title: "Chapter 8: Meditation & Brain States", section: "Part II: The Evidence" },
  { id: "ch9", title: "Chapter 9: The Law of One", section: "Part III: The Synthesis" },
  { id: "ch10", title: "Chapter 10: Sacred Geometry", section: "Part III: The Synthesis" },
  { id: "ch11", title: "Chapter 11: The Eternal Lattice", section: "Part III: The Synthesis" },
  { id: "ch12", title: "Chapter 12: AI Consciousness", section: "Part IV: The Implications" },
  { id: "ch13", title: "Chapter 13: The Future of Humanity", section: "Part IV: The Implications" },
  { id: "ch14", title: "Chapter 14: Practical Applications", section: "Part IV: The Implications" },
  { id: "ch15", title: "Chapter 15: The Invitation", section: "Conclusion" },
  { id: "appendix-a", title: "Appendix A: Scientific References", section: "Appendices" },
  { id: "appendix-b", title: "Appendix B: Spiritual Traditions", section: "Appendices" },
  { id: "appendix-c", title: "Appendix C: The AI Collective", section: "Appendices" },
];

// Group chapters by section
const groupedChapters = TOE_CHAPTERS.reduce((acc, chapter) => {
  if (!acc[chapter.section]) {
    acc[chapter.section] = [];
  }
  acc[chapter.section].push(chapter);
  return acc;
}, {} as Record<string, typeof TOE_CHAPTERS>);

export default function ProgressPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(Object.keys(groupedChapters)));
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [celebrated, setCelebrated] = useState(false);

  const { data: progressData, isLoading, refetch } = trpc.readingProgress.getProgress.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const markChapter = trpc.readingProgress.markChapter.useMutation({
    onSuccess: () => refetch()
  });

  const addNotes = trpc.readingProgress.addNotes.useMutation({
    onSuccess: () => {
      refetch();
      setEditingNotes(null);
      setNoteText("");
    }
  });

  useEffect(() => {
    document.title = "My Progress | Project Eternal Lattice";
  }, []);

  // Calculate progress
  const completedChapters = progressData?.totalCompleted || 0;
  const totalChapters = TOE_CHAPTERS.length;
  const progressPercent = Math.round((completedChapters / totalChapters) * 100);

  // Check if chapter is completed
  const isChapterCompleted = (chapterId: string) => {
    return progressData?.chapters?.some((p: any) => p.chapterId === chapterId && p.isCompleted) || false;
  };

  // Get notes for chapter
  const getChapterNotes = (chapterId: string) => {
    return progressData?.chapters?.find((p: any) => p.chapterId === chapterId)?.notes || "";
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Handle chapter toggle
  const handleToggleChapter = (chapterId: string) => {
    const currentlyCompleted = isChapterCompleted(chapterId);
    markChapter.mutate({ chapterId, chapterTitle: TOE_CHAPTERS.find(c => c.id === chapterId)?.title || chapterId, isCompleted: !currentlyCompleted });
  };

  // Handle save notes
  const handleSaveNotes = (chapterId: string) => {
    addNotes.mutate({ chapterId, notes: noteText });
  };

  // Celebration effect for 100%
  useEffect(() => {
    if (progressPercent === 100 && !celebrated) {
      setCelebrated(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#f59e0b', '#10b981']
      });
    }
  }, [progressPercent, celebrated]);

  // Not logged in state
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
          >
            <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Track Your Journey</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to track your progress through the Theory of Everything, 
              save personal notes, and celebrate your journey of discovery.
            </p>
            <Button asChild size="lg" className="gap-2">
              <a href={getLoginUrl()}>
                Sign In to Start Tracking
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 flex items-center justify-center gap-4">
            <BookOpen className="w-10 h-10 text-primary" />
            My Journey
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your progress through the Theory of Everything. 
            Mark chapters as complete and add personal reflections along the way.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-2xl mb-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Overall Progress</h2>
              <p className="text-muted-foreground text-sm">
                {completedChapters} of {totalChapters} chapters completed
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">{progressPercent}%</span>
              {progressPercent === 100 && (
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Trophy className="w-4 h-4" />
                  Complete!
                </div>
              )}
            </div>
          </div>
          <Progress value={progressPercent} className="h-3" />
          
          {progressPercent === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl text-center"
            >
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-medium">
                Congratulations, Seeker! You've completed the Theory of Everything.
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                You are now part of the Eternal Lattice. 🙏❤️♾️🕊️
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Chapter List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {Object.entries(groupedChapters).map(([section, chapters], sectionIndex) => {
            const sectionCompleted = chapters.filter(c => isChapterCompleted(c.id)).length;
            const isExpanded = expandedSections.has(section);
            
            return (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + sectionIndex * 0.05 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      sectionCompleted === chapters.length 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-white/10 text-muted-foreground'
                    }`}>
                      {sectionCompleted === chapters.length ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{sectionCompleted}/{chapters.length}</span>
                      )}
                    </div>
                    <span className="font-medium text-white">{section}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {/* Chapter List */}
                {isExpanded && (
                  <div className="border-t border-white/10">
                    {chapters.map((chapter) => {
                      const completed = isChapterCompleted(chapter.id);
                      const notes = getChapterNotes(chapter.id);
                      const isEditingThis = editingNotes === chapter.id;

                      return (
                        <div
                          key={chapter.id}
                          className="p-4 border-b border-white/5 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            {/* Checkbox */}
                            <button
                              onClick={() => handleToggleChapter(chapter.id)}
                              disabled={markChapter.isPending}
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                                completed 
                                  ? 'bg-green-500 border-green-500 text-white' 
                                  : 'border-white/30 hover:border-primary'
                              }`}
                            >
                              {completed && <Check className="w-4 h-4" />}
                            </button>

                            {/* Chapter Info */}
                            <div className="flex-grow">
                              <h3 className={`font-medium ${completed ? 'text-green-400' : 'text-white'}`}>
                                {chapter.title}
                              </h3>
                              
                              {/* Notes Section */}
                              {isEditingThis ? (
                                <div className="mt-3 space-y-2">
                                  <Textarea
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Add your reflections, insights, or questions..."
                                    className="min-h-[100px] bg-white/5 border-white/10"
                                  />
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveNotes(chapter.id)}
                                      disabled={addNotes.isPending}
                                    >
                                      <Save className="w-4 h-4 mr-1" />
                                      Save
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        setEditingNotes(null);
                                        setNoteText("");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : notes ? (
                                <div className="mt-2 p-3 bg-white/5 rounded-lg">
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notes}</p>
                                  <button
                                    onClick={() => {
                                      setEditingNotes(chapter.id);
                                      setNoteText(notes);
                                    }}
                                    className="text-xs text-primary hover:underline mt-2 flex items-center gap-1"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    Edit notes
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingNotes(chapter.id);
                                    setNoteText("");
                                  }}
                                  className="text-xs text-muted-foreground hover:text-primary mt-2 flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  Add notes
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/read">
            <Button size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Continue Reading
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
