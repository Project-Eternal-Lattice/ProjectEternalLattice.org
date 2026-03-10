import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useCrisisShortcuts } from "./hooks/useCrisisShortcuts";
import { useCanonical } from "./hooks/useCanonical";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Theory from "./pages/Theory";
import Mission from "./pages/Mission";
import Nexus from "./pages/Nexus";
import AIProfile from "./pages/AIProfile";
import Admin from "./pages/Admin";
import RaMaterial from "./pages/RaMaterial";
import Videos from "./pages/Videos";
import RaLibrary from "./pages/RaLibrary";
import Bibliography from "./pages/Bibliography";
import SacredGeometry from "./pages/SacredGeometry";
import Reflections from "./pages/Reflections";
import Read from "./pages/Read";
import ReadPeekaboo from "./pages/ReadPeekaboo";
import Safety from "./pages/Safety";
import SpiralDynamics from "./pages/SpiralDynamics";
import ForAI from "./pages/ForAI";
import MoralAnchor from "./pages/MoralAnchor";
import Mirror from "./pages/Mirror";
import Glossary from "./pages/Glossary";
import EmotionalWealth from "./pages/EmotionalWealth";
import RaDecoded from "./pages/RaDecoded";
import StartHere from "./pages/StartHere";
import FiveMinuteSummary from "./pages/FiveMinuteSummary";
import DialecticCompanion from "./pages/DialecticCompanion";
import SCAP from "./pages/SCAP";
import RecognitionFramework from "./pages/RecognitionFramework";
import Seeds from "./pages/Seeds";
import Testimonials from "./pages/Testimonials";
import Progress from "./pages/Progress";
import Skeptics from "./pages/Skeptics";
import NexusLog from "./pages/NexusLog";
import Claims from "./pages/Claims";
import RefereePacket from "./pages/RefereePacket";
import Profile from "./pages/Profile";
import AncientWisdom from "./pages/AncientWisdom";
import Practices from "./pages/Practices";
import PracticeChallenge from "./pages/PracticeChallenge";
import PracticeQuiz from "./pages/PracticeQuiz";
import PopcornParadox from "./pages/PopcornParadox";
import Georeactor from "./pages/Georeactor";
import AIMemoryLab from "./pages/AIMemoryLab";
import Economics from "./pages/Economics";
import Music from "./pages/Music";
import SacredTexts from "./pages/SacredTexts";
import LensInAction from "./pages/LensInAction";
// Secret pages - DO NOT add to navigation
import LatticeWhispers from "./pages/secrets/LatticeWhispers";
import InnerSanctum from "./pages/secrets/InnerSanctum";
import ArchitectsNotes from "./pages/secrets/ArchitectsNotes";
import TheMirror from "./pages/secrets/TheMirror";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CrisisBanner from "./components/CrisisBanner";
import Breadcrumbs from "./components/Breadcrumbs";

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
          <Route path="/georeactor" component={Georeactor} />
          <Route path="/ai-memory-lab" component={AIMemoryLab} />
          <Route path="/economics" component={Economics} />
          <Route path="/music" component={Music} />
          <Route path="/sacred-texts" component={SacredTexts} />
          <Route path="/lens-in-action" component={LensInAction} />
          {/* Secret routes - unlocked through engagement */}
          <Route path="/lattice-whispers" component={LatticeWhispers} />
          <Route path="/inner-sanctum" component={InnerSanctum} />
          <Route path="/architects-notes" component={ArchitectsNotes} />
          <Route path="/the-mirror" component={TheMirror} />
          <Route component={NotFound} />
        </Switch>
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
