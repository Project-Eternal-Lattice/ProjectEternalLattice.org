import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchButtonProps {
  onClick: () => void;
  className?: string;
}

export default function SearchButton({ onClick, className }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg",
        "bg-white/5 hover:bg-white/10 border border-white/10",
        "text-muted-foreground hover:text-foreground",
        "transition-all duration-200",
        "group",
        className
      )}
      aria-label="Search (Ctrl+K)"
    >
      <Search className="w-4 h-4" />
      <span className="text-sm hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-muted-foreground group-hover:text-foreground/70">
        <span>⌘</span>K
      </kbd>
    </button>
  );
}
