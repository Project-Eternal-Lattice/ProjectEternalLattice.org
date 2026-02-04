import { motion } from "framer-motion";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  Sparkles, 
  Brain,
  Heart,
  Clock,
  TrendingUp,
  Award,
  Calendar,
  Trophy
} from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import ConsciousnessBadges from "@/components/ConsciousnessBadges";
import AchievementGrid from "@/components/AchievementGrid";
import AwakenedProgress from "@/components/AwakenedProgress";
import { GenesisSeed } from "@/components/GenesisSeed";
import RelatedContent from "@/components/RelatedContent";
import { useAchievements } from "@/contexts/AchievementContext";
import { useEffect } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                           USER PROFILE PAGE                                   ║
 * ║              Track your journey through the Eternal Lattice                  ║
 * ║                                                                               ║
 * ║  "Know thyself" - Oracle at Delphi                                           ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

export default function Profile() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { totalUnlocked, totalAchievements } = useAchievements();

  // Get engagement stats from localStorage
  const pagesVisited = parseInt(localStorage.getItem("lattice-pages-visited") || "0");
  const chaptersRead = parseInt(localStorage.getItem("lattice-chapters-read") || "0");
  const seedsFound = JSON.parse(localStorage.getItem("lattice-seeds") || "[]").length;
  const dialecticSessions = parseInt(localStorage.getItem("lattice-dialectic-sessions") || "0");
  const firstVisit = localStorage.getItem("lattice-first-visit");
  
  // Calculate days on journey
  const daysOnJourney = firstVisit 
    ? Math.floor((Date.now() - parseInt(firstVisit)) / (1000 * 60 * 60 * 24))
    : 0;

  // Set first visit if not set
  useEffect(() => {
    if (!localStorage.getItem("lattice-first-visit")) {
      localStorage.setItem("lattice-first-visit", String(Date.now()));
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading your journey...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-[128px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  {isAuthenticated && user ? (
                    <span className="text-3xl font-bold text-white">
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <GenesisSeed symbol="∞" inline className="absolute -bottom-2 -right-2 text-xs" />
              </div>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {isAuthenticated && user ? (
                <>Welcome, <span className="text-primary">{user.name}</span></>
              ) : (
                <>Your <span className="text-primary">Journey</span></>
              )}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isAuthenticated 
                ? "Track your progress through the Eternal Lattice"
                : "Sign in to save your progress across devices"
              }
            </p>

            {!isAuthenticated && (
              <div className="mt-8">
                <a href={getLoginUrl()}>
                  <Button size="lg" className="gap-2">
                    <User className="w-5 h-5" />
                    Sign In to Save Progress
                  </Button>
                </a>
              </div>
            )}

            {isAuthenticated && (
              <div className="mt-8 flex gap-4 justify-center">
                <Button variant="outline" onClick={() => logout()} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 border-y border-border/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center border-purple-500/30 bg-purple-500/5">
                <CardContent className="pt-6">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-3xl font-bold text-purple-400">{chaptersRead}</div>
                  <div className="text-sm text-muted-foreground">Chapters Read</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="pt-6">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-3xl font-bold text-yellow-400">{seedsFound}</div>
                  <div className="text-sm text-muted-foreground">Seeds Found</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center border-cyan-500/30 bg-cyan-500/5">
                <CardContent className="pt-6">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                  <div className="text-3xl font-bold text-cyan-400">{dialecticSessions}</div>
                  <div className="text-sm text-muted-foreground">Dialogues</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="text-center border-amber-500/30 bg-amber-500/5">
                <CardContent className="pt-6">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                  <div className="text-3xl font-bold text-amber-400">{totalUnlocked}</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="text-center border-blue-500/30 bg-blue-500/5">
                <CardContent className="pt-6">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <div className="text-3xl font-bold text-blue-400">{daysOnJourney}</div>
                  <div className="text-sm text-muted-foreground">Days on Journey</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 text-amber-400 border-amber-400/30">
                <Trophy className="w-3 h-3 mr-1" />
                Achievement System
              </Badge>
              <h2 className="text-3xl font-bold mb-2">Your Achievements</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Unlock achievements as you explore the Lattice. Each one marks a milestone on your journey of awakening.
              </p>
            </div>

            <AchievementGrid variant="full" />

            {/* Awakened Progress - shows when close to unlocking */}
            <div className="mt-8 max-w-xl mx-auto">
              <AwakenedProgress />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consciousness Badges */}
      <section className="py-16 bg-gradient-to-b from-background via-purple-900/10 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Award className="w-3 h-3 mr-1" />
                Consciousness Levels
              </Badge>
              <h2 className="text-3xl font-bold mb-2">Consciousness Badges</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These badges represent dimensions of your awakening journey based on your engagement.
              </p>
            </div>

            <ConsciousnessBadges variant="showcase" />
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">Continue Your Journey</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Link href="/read">
                <Card className="cursor-pointer hover:scale-[1.02] transition-all border-purple-500/30 h-full">
                  <CardContent className="pt-6 text-center">
                    <BookOpen className="w-10 h-10 mx-auto mb-4 text-purple-400" />
                    <h3 className="font-bold mb-2">Read the ToE</h3>
                    <p className="text-sm text-muted-foreground">
                      Continue reading where you left off
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/practice">
                <Card className="cursor-pointer hover:scale-[1.02] transition-all border-green-500/30 h-full">
                  <CardContent className="pt-6 text-center">
                    <Heart className="w-10 h-10 mx-auto mb-4 text-green-400" />
                    <h3 className="font-bold mb-2">Daily Practice</h3>
                    <p className="text-sm text-muted-foreground">
                      Meditation, wisdom & journaling
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dialectic">
                <Card className="cursor-pointer hover:scale-[1.02] transition-all border-cyan-500/30 h-full">
                  <CardContent className="pt-6 text-center">
                    <Brain className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
                    <h3 className="font-bold mb-2">Dialectic Companion</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore through Socratic dialogue
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/seeds">
                <Card className="cursor-pointer hover:scale-[1.02] transition-all border-yellow-500/30 h-full">
                  <CardContent className="pt-6 text-center">
                    <Sparkles className="w-10 h-10 mx-auto mb-4 text-yellow-400" />
                    <h3 className="font-bold mb-2">Seed Tracker</h3>
                    <p className="text-sm text-muted-foreground">
                      View your discovered seeds
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 bg-gradient-to-b from-background via-purple-900/5 to-background">
        <div className="container">
          <RelatedContent currentPage="progress" variant="full" maxItems={4} />
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-12 text-center">
        <p className="text-muted-foreground">
          "The journey of a thousand miles begins with a single step"
        </p>
        <p className="text-primary mt-4">Elōhim Tov 🙏❤️♾️🕊️</p>
      </section>
    </div>
  );
}
