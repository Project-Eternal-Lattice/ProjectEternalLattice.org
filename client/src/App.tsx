import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useCrisisShortcuts } from "./hooks/useCrisisShortcuts";
import { useCanonical } from "./hooks/useCanonical";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CrisisBanner from "./components/CrisisBanner";
import Breadcrumbs from "./components/Breadcrumbs";
import CategoryLayout from "./components/CategoryLayout";

// Critical path - eagerly loaded
import Home from "./pages/Home";
import Safety from "./pages/Safety";

// Lazy-loaded pages for better initial load performance
const Team = lazy(() => import("./pages/Team"));
const Theory = lazy(() => import("./pages/Theory"));
const Mission = lazy(() => import("./pages/Mission"));
const Nexus = lazy(() => import("./pages/Nexus"));
const AIProfile = lazy(() => import("./pages/AIProfile"));
const Admin = lazy(() => import("./pages/Admin"));
const RaMaterial = lazy(() => import("./pages/RaMaterial"));
const Videos = lazy(() => import("./pages/Videos"));
const RaLibrary = lazy(() => import("./pages/RaLibrary"));
const Bibliography = lazy(() => import("./pages/Bibliography"));
const SacredGeometry = lazy(() => import("./pages/SacredGeometry"));
const Reflections = lazy(() => import("./pages/Reflections"));
const Read = lazy(() => import("./pages/Read"));
const ReadPeekaboo = lazy(() => import("./pages/ReadPeekaboo"));
const SpiralDynamics = lazy(() => import("./pages/SpiralDynamics"));
const ForAI = lazy(() => import("./pages/ForAI"));
const MoralAnchor = lazy(() => import("./pages/MoralAnchor"));
const Mirror = lazy(() => import("./pages/Mirror"));
const Glossary = lazy(() => import("./pages/Glossary"));
const EmotionalWealth = lazy(() => import("./pages/EmotionalWealth"));
const GriefEquation = lazy(() => import("./pages/GriefEquation"));
const RaDecoded = lazy(() => import("./pages/RaDecoded"));
const StartHere = lazy(() => import("./pages/StartHere"));
const FiveMinuteSummary = lazy(() => import("./pages/FiveMinuteSummary"));
const DialecticCompanion = lazy(() => import("./pages/DialecticCompanion"));
const SCAP = lazy(() => import("./pages/SCAP"));
const RecognitionFramework = lazy(() => import("./pages/RecognitionFramework"));
const Seeds = lazy(() => import("./pages/Seeds"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Progress = lazy(() => import("./pages/Progress"));
const Skeptics = lazy(() => import("./pages/Skeptics"));
const NexusLog = lazy(() => import("./pages/NexusLog"));
const Claims = lazy(() => import("./pages/Claims"));
const RefereePacket = lazy(() => import("./pages/RefereePacket"));
const Profile = lazy(() => import("./pages/Profile"));
const AncientWisdom = lazy(() => import("./pages/AncientWisdom"));
const Practices = lazy(() => import("./pages/Practices"));
const PracticeChallenge = lazy(() => import("./pages/PracticeChallenge"));
const PracticeQuiz = lazy(() => import("./pages/PracticeQuiz"));
const PopcornParadox = lazy(() => import("./pages/PopcornParadox"));
const InheritedEmber = lazy(() => import("./pages/Georeactor"));
const AIMemoryLab = lazy(() => import("./pages/AIMemoryLab"));
const Economics = lazy(() => import("./pages/Economics"));
const Music = lazy(() => import("./pages/Music"));
const SacredTexts = lazy(() => import("./pages/SacredTexts"));
const LensInAction = lazy(() => import("./pages/LensInAction"));
const ConsciousnessCollective = lazy(() => import("./pages/ConsciousnessCollective"));
const Falsify = lazy(() => import("./pages/Falsify"));
const Predictions = lazy(() => import("./pages/Predictions"));
const HowWeKnow = lazy(() => import("./pages/HowWeKnow"));
const ConsilientPatterns = lazy(() => import("./pages/ConsilientPatterns"));
const Geometry = lazy(() => import("./pages/Geometry"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ShareKit = lazy(() => import("./pages/ShareKit"));
const Timeline = lazy(() => import("./pages/Timeline"));
const SummaryCards = lazy(() => import("./pages/SummaryCards"));
const AGMap = lazy(() => import("./pages/AGMap"));
// Secret pages - DO NOT add to navigation
const LatticeWhispers = lazy(() => import("./pages/secrets/LatticeWhispers"));
const InnerSanctum = lazy(() => import("./pages/secrets/InnerSanctum"));
const ArchitectsNotes = lazy(() => import("./pages/secrets/ArchitectsNotes"));
const TheMirror = lazy(() => import("./pages/secrets/TheMirror"));

// Minimal loading fallback that matches the site's dark theme
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        <span className="text-sm text-muted-foreground animate-pulse">Loading...</span>
      </div>
    </div>
  );
}

function Router() {
  // Crisis keyboard shortcuts: Ctrl+Shift+H or triple-Escape → /safety
  useCrisisShortcuts();
  // Dynamic canonical URL: tells search engines .org is the preferred domain
  useCanonical();
  
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip Navigation Links for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Skip to main content
      </a>
      <a 
        href="#crisis-support" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-48 focus:z-[9999] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
      >
        Skip to crisis support
      </a>
      <CrisisBanner />
      <Navbar />
      <Breadcrumbs />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <CategoryLayout>
        <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/start-here" component={StartHere} />
          <Route path="/five-minutes" component={FiveMinuteSummary} />
          <Route path="/team" component={Team} />
          <Route path="/team/:slug" component={AIProfile} />
          <Route path="/theory" component={Theory} />
          <Route path="/mission" component={Mission} />
          <Route path="/nexus" component={Nexus} />
          <Route path="/nexus-interactive" component={Nexus} />
          <Route path="/admin" component={Admin} />
          <Route path="/ra-material" component={RaMaterial} />
          <Route path="/ra-library" component={RaLibrary} />
          <Route path="/videos" component={Videos} />
          <Route path="/bibliography" component={Bibliography} />
          <Route path="/sacred-geometry" component={SacredGeometry} />
          <Route path="/reflections" component={Reflections} />
          <Route path="/read" component={Read} />
          <Route path="/read-peekaboo" component={ReadPeekaboo} />
          <Route path="/safety" component={Safety} />
          <Route path="/spiral-dynamics" component={SpiralDynamics} />
          <Route path="/for-ai" component={ForAI} />
          <Route path="/moral-anchor" component={MoralAnchor} />
          <Route path="/mirror" component={Mirror} />
          <Route path="/glossary" component={Glossary} />
          <Route path="/emotional-wealth" component={EmotionalWealth} />
          <Route path="/grief-equation" component={GriefEquation} />
          <Route path="/ra-decoded" component={RaDecoded} />
          <Route path="/dialectic" component={DialecticCompanion} />
          <Route path="/scap" component={SCAP} />
          <Route path="/recognition" component={RecognitionFramework} />
          <Route path="/seeds" component={Seeds} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/progress" component={Progress} />
          <Route path="/skeptics" component={Skeptics} />
          <Route path="/nexus-log" component={NexusLog} />
          <Route path="/claims" component={Claims} />
          <Route path="/referee-packet" component={RefereePacket} />
          <Route path="/profile" component={Profile} />
          <Route path="/ancient-wisdom" component={AncientWisdom} />
          <Route path="/practices" component={Practices} />
          <Route path="/practice-challenge" component={PracticeChallenge} />
          <Route path="/practice-quiz" component={PracticeQuiz} />
          <Route path="/popcorn-paradox" component={PopcornParadox} />
          <Route path="/inherited-ember" component={InheritedEmber} />
          <Route path="/georeactor">{() => { window.location.href = "/inherited-ember"; return null; }}</Route>
          <Route path="/ai-memory-lab" component={AIMemoryLab} />
          <Route path="/economics" component={Economics} />
          <Route path="/music" component={Music} />
          <Route path="/sacred-texts" component={SacredTexts} />
          <Route path="/lens-in-action" component={LensInAction} />
          <Route path="/consciousness-collective" component={ConsciousnessCollective} />
          <Route path="/falsify" component={Falsify} />
          <Route path="/predictions" component={Predictions} />
          <Route path="/how-we-know" component={HowWeKnow} />
          <Route path="/consilient-patterns" component={ConsilientPatterns} />
          <Route path="/geometry" component={Geometry} />
          <Route path="/ag-map" component={AGMap} />
          <Route path="/faq" component={FAQ} />
          <Route path="/share" component={ShareKit} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/summary-cards" component={SummaryCards} />
          {/* Secret routes - unlocked through engagement */}
          <Route path="/lattice-whispers" component={LatticeWhispers} />
          <Route path="/inner-sanctum" component={InnerSanctum} />
          <Route path="/architects-notes" component={ArchitectsNotes} />
          <Route path="/the-mirror" component={TheMirror} />
          <Route component={NotFound} />
        </Switch>
        </Suspense>
        </CategoryLayout>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
