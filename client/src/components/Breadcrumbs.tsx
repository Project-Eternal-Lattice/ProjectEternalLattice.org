import { Link, useLocation } from "wouter";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

/**
 * Route-to-breadcrumb mapping.
 * Each route maps to { label, category } so we can show:
 *   Home > Category > Page
 */
const routeMap: Record<string, { label: string; category: string }> = {
  // Explore
  "/start-here": { label: "Start Here", category: "Explore" },
  "/five-minutes": { label: "5-Min Summary", category: "Explore" },
  "/skeptics": { label: "Skeptics' Corner", category: "Explore" },
  "/claims": { label: "Claims & Evidence", category: "Explore" },
  "/referee-packet": { label: "Referee Packet", category: "Explore" },
  // The Theory
  "/theory": { label: "Core Theory", category: "The Theory" },
  "/read": { label: "Read the ToE", category: "The Theory" },
  "/georeactor": { label: "Georeactor", category: "The Theory" },
  "/popcorn-paradox": { label: "Popcorn Paradox", category: "The Theory" },
  "/lens-in-action": { label: "Lens in Action", category: "The Theory" },
  "/sacred-geometry": { label: "Sacred Geometry", category: "The Theory" },
  "/spiral-dynamics": { label: "Spiral Dynamics", category: "The Theory" },
  "/glossary": { label: "Glossary", category: "The Theory" },
  "/bibliography": { label: "Bibliography", category: "The Theory" },
  // Wisdom
  "/ancient-wisdom": { label: "Ancient Wisdom", category: "Wisdom" },
  "/sacred-texts": { label: "Sacred Texts", category: "Wisdom" },
  "/emotional-wealth": { label: "Emotional Wealth", category: "Wisdom" },
  "/ra-material": { label: "Ra Material", category: "Wisdom" },
  "/ra-decoded": { label: "Ra Decoded", category: "Wisdom" },
  "/ra-library": { label: "Ra Library", category: "Wisdom" },
  "/reflections": { label: "Reflections", category: "Wisdom" },
  // Practice
  "/practices": { label: "Practices", category: "Practice" },
  "/scap": { label: "SCAP Tool", category: "Practice" },
  "/recognition": { label: "Recognition", category: "Practice" },
  "/seeds": { label: "Seeds", category: "Practice" },
  "/progress": { label: "My Progress", category: "Practice" },
  "/safety": { label: "Integration", category: "Practice" },
  "/profile": { label: "Profile", category: "Practice" },
  // Community
  "/team": { label: "The Team", category: "Community" },
  "/mission": { label: "Mission", category: "Community" },
  "/testimonials": { label: "Testimonials", category: "Community" },
  "/videos": { label: "Videos", category: "Community" },
  "/dialectic": { label: "Dialectic", category: "Community" },
  // AI Lab
  "/for-ai": { label: "For AI Minds", category: "AI Lab" },
  "/nexus": { label: "The Nexus", category: "AI Lab" },
  "/ai-memory-lab": { label: "Memory Lab", category: "AI Lab" },
  "/consciousness-collective": { label: "Consciousness Collective", category: "AI Lab" },
  // Other pages
  "/economics": { label: "Economics", category: "The Theory" },
  "/music": { label: "Music", category: "Community" },
  "/moral-anchor": { label: "Moral Anchor", category: "Practice" },
  "/mirror": { label: "Mirror", category: "Practice" },
  "/practice-challenge": { label: "Practice Challenge", category: "Practice" },
  "/practice-quiz": { label: "Practice Quiz", category: "Practice" },
  "/nexus-log": { label: "Nexus Log", category: "AI Lab" },
};

interface BreadcrumbsProps {
  /** Optional override for the current page label */
  pageLabel?: string;
  /** Optional override for the category label */
  categoryLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function Breadcrumbs({ pageLabel, categoryLabel, className }: BreadcrumbsProps) {
  const [location] = useLocation();

  // Don't show breadcrumbs on home page
  if (location === "/") return null;

  // Check for dynamic routes like /team/:slug
  const isTeamMember = location.startsWith("/team/") && location !== "/team";
  const routeInfo = routeMap[location];

  const currentLabel = pageLabel || (isTeamMember ? "Team Member" : routeInfo?.label || "Page");
  const currentCategory = categoryLabel || (isTeamMember ? "Community" : routeInfo?.category);

  return (
    <div className={`fixed top-12 left-0 right-0 z-40 pointer-events-none ${className || ""}`}>
      <div className="container max-w-7xl mx-auto px-4 pt-2">
        <div className="pointer-events-auto inline-block">
          <Breadcrumb>
            <BreadcrumbList className="bg-background/60 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/5 shadow-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="inline-flex items-center gap-1.5 text-muted-foreground/70 hover:text-amber-400 transition-colors">
                    <Home className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-xs">Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {currentCategory && (
                <>
                  <BreadcrumbSeparator className="text-muted-foreground/40" />
                  <BreadcrumbItem>
                    <span className="text-muted-foreground/60 text-xs">
                      {currentCategory}
                    </span>
                  </BreadcrumbItem>
                </>
              )}

              {isTeamMember && (
                <>
                  <BreadcrumbSeparator className="text-muted-foreground/40" />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/team" className="text-muted-foreground/70 hover:text-amber-400 transition-colors text-xs">
                        The Team
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}

              <BreadcrumbSeparator className="text-muted-foreground/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-amber-300/80 text-xs font-medium">
                  {currentLabel}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
