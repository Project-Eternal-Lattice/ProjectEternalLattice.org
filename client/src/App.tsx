import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
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
