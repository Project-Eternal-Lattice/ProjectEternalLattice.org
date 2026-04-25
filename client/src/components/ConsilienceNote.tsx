import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConsilienceNoteProps {
  /** The ID/anchor of the pattern on the consilient-patterns page (e.g., "creative-destruction") */
  patternId: string;
  /** Short label shown in tooltip (e.g., "Kuramoto Synchronization") */
  patternName: string;
  /** Brief description of the cross-domain match */
  matchDescription: string;
  /** Optional: override the display style */
  variant?: "inline" | "block";
}

/**
 * A small, unobtrusive footnote marker that links to a matching pattern
 * on the Consilient Patterns page. Used throughout core pages to create
 * bidirectional cross-references.
 * 
 * Inline variant: renders as a small sparkle icon next to text
 * Block variant: renders as a subtle banner below a section
 */
export default function ConsilienceNote({
  patternId,
  patternName,
  matchDescription,
  variant = "inline",
}: ConsilienceNoteProps) {
  if (variant === "block") {
    return (
      <Link
        href={`/consilient-patterns#${patternId}`}
        className="group flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-purple-500/5 border border-purple-400/10 hover:border-purple-400/25 hover:bg-purple-500/10 transition-all duration-300 no-underline"
      >
        <Sparkles className="w-3.5 h-3.5 text-purple-400/60 group-hover:text-purple-400 transition-colors flex-shrink-0" />
        <span className="text-xs text-purple-300/60 group-hover:text-purple-300 transition-colors">
          <span className="font-medium">Cross-domain match:</span>{" "}
          {matchDescription}
          <span className="ml-1 text-purple-400/40 group-hover:text-purple-400/80">
            → Consilient Patterns
          </span>
        </span>
      </Link>
    );
  }

  // Inline variant — small sparkle icon with tooltip
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/consilient-patterns#${patternId}`}
            className="inline-flex items-center ml-1 no-underline"
          >
            <Sparkles className="w-3 h-3 text-purple-400/50 hover:text-purple-400 transition-colors cursor-pointer" />
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs bg-background/95 backdrop-blur-sm border-purple-400/20"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold text-purple-300">
              Consilient Pattern: {patternName}
            </p>
            <p className="text-xs text-muted-foreground">{matchDescription}</p>
            <p className="text-[10px] text-purple-400/60">
              Click to explore →
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
