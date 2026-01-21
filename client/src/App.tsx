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
          <Route path="/admin" component={Admin} />
          <Route path="/ra-material" component={RaMaterial} />
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
