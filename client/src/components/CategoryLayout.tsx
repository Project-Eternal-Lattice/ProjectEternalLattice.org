import { useLocation } from "wouter";
import AnimatedPageBackground, { type BackgroundTheme } from "./AnimatedPageBackground";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       CATEGORY LAYOUT WRAPPER                                ║
 * ║                                                                               ║
 * ║  Automatically applies the correct animated background based on the           ║
 * ║  current route's category. Acts as a subtle wayfinding system —               ║
 * ║  visitors subconsciously know which section they're in.                        ║
 * ║                                                                               ║
 * ║  6 categories × 6 unique backgrounds:                                         ║
 * ║    Explore   → Constellation Map (stars connecting)                            ║
 * ║    Theory    → Geometric Wireframe (rotating polyhedra)                        ║
 * ║    Wisdom    → Flowing Aurora (gentle color waves)                             ║
 * ║    Practice  → Breathing Circles (expanding/contracting)                       ║
 * ║    Community → Neural Network (nodes pulsing in sync)                          ║
 * ║    AI Lab    → Matrix Rain (falling code streams)                              ║
 * ║                                                                               ║
 * ║  Homepage keeps its own unique LatticeVisualization + ParticleField.           ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// ─── Route → Category Mapping ───────────────────────────────────────────────

const CATEGORY_MAP: Record<string, BackgroundTheme> = {
  // ── Explore ──
  "/start-here": "explore",
  "/how-we-know": "explore",
  "/five-minutes": "explore",
  "/skeptics": "explore",
  "/claims": "explore",
  "/referee-packet": "explore",
  "/falsify": "explore",
  "/predictions": "explore",
  "/consilient-patterns": "explore",
  "/ag-map": "explore",

  // ── The Theory ──
  "/theory": "theory",
  "/read": "theory",
  "/read-peekaboo": "theory",
  "/inherited-ember": "theory",
  "/georeactor": "theory",
  "/popcorn-paradox": "theory",
  "/lens-in-action": "theory",
  "/sacred-geometry": "theory",
  "/geometry": "theory",
  "/spiral-dynamics": "theory",
  "/glossary": "theory",
  "/bibliography": "theory",
  "/economics": "theory",

  // ── Wisdom ──
  "/ancient-wisdom": "wisdom",
  "/sacred-texts": "wisdom",
  "/emotional-wealth": "wisdom",
  "/ra-material": "wisdom",
  "/ra-decoded": "wisdom",
  "/ra-library": "wisdom",
  "/reflections": "wisdom",
  "/moral-anchor": "wisdom",
  "/mirror": "wisdom",

  // ── Practice ──
  "/practices": "practice",
  "/scap": "practice",
  "/recognition": "practice",
  "/seeds": "practice",
  "/progress": "practice",
  "/safety": "practice",
  "/profile": "practice",
  "/practice-challenge": "practice",
  "/practice-quiz": "practice",

  // ── Community ──
  "/team": "community",
  "/mission": "community",
  "/testimonials": "community",
  "/videos": "community",
  "/dialectic": "community",

  // ── AI Lab ──
  "/for-ai": "ailab",
  "/nexus": "ailab",
  "/nexus-interactive": "ailab",
  "/nexus-log": "ailab",
  "/ai-memory-lab": "ailab",
  "/consciousness-collective": "ailab",

  // ── Music ──
  "/music": "music",
};

// Dynamic routes (prefix matching)
const DYNAMIC_CATEGORY_PREFIXES: Array<{ prefix: string; theme: BackgroundTheme }> = [
  { prefix: "/team/", theme: "community" }, // AI profiles
];

function getCategoryTheme(path: string): BackgroundTheme | null {
  // Exact match first
  if (CATEGORY_MAP[path]) return CATEGORY_MAP[path];

  // Prefix match for dynamic routes
  for (const { prefix, theme } of DYNAMIC_CATEGORY_PREFIXES) {
    if (path.startsWith(prefix)) return theme;
  }

  // No category background for homepage (has its own) or unknown routes
  return null;
}

interface CategoryLayoutProps {
  children: React.ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  const [location] = useLocation();
  const theme = getCategoryTheme(location);

  if (!theme) {
    // No category background — homepage or unknown route
    return <>{children}</>;
  }

  return (
    <>
      {/* Full-page category background — fixed overlay between body bg and content */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <AnimatedPageBackground
          theme={theme}
          opacity={0.5}
          height="100%"
        />
      </div>
      {/* Page content on top */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </>
  );
}

// Export for testing
export { CATEGORY_MAP, DYNAMIC_CATEGORY_PREFIXES, getCategoryTheme };
