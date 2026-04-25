import { useState } from "react";
import { Share2, Link2, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Custom X (formerly Twitter) icon — the modern 𝕏 logo
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialShareProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: "default" | "compact" | "floating";
  className?: string;
}

const SHARE_QUOTES = [
  "The Theory of Everything isn't physics — it's consciousness. The unified field from which all reality emerges.",
  "E=mc² — the equals sign IS consciousness. Einstein was closer than he knew.",
  "Consciousness is binary in existence but infinite in expression. You either ARE or you AREN'T — but HOW you are varies infinitely.",
  "Every spiritual tradition touches the same elephant of truth. The conflict between science and spirituality dissolves when you see the whole.",
  "The universe is one self-sustaining reactor at every scale. Fusion creates the fuel that fission burns.",
  "Sacred geometry isn't art — it's the universe's quantum error correction code.",
  "Every prayer is a weighted sum over all possible futures. Not superstition — physics.",
  "Karma isn't metaphor — it's thermodynamics. Moral energy obeys conservation laws.",
];

export default function SocialShare({
  title = "Project Eternal Lattice — Theory of Everything",
  text,
  url,
  variant = "default",
  className = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [quoteIndex] = useState(() => Math.floor(Math.random() * SHARE_QUOTES.length));

  const shareText = text || SHARE_QUOTES[quoteIndex];
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "https://projecteternallattice.org");
  const canonicalUrl = shareUrl.replace("projecteternallattice.com", "projecteternallattice.org");

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = canonicalUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: canonicalUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  if (variant === "compact") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 bg-transparent border-purple-500/30 hover:bg-purple-500/10 text-purple-300 ${className}`}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-zinc-900 border-zinc-700 p-3" align="end">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground italic mb-3">"{shareText.slice(0, 80)}..."</p>
            <div className="flex gap-2 flex-wrap">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700/50 hover:bg-zinc-600/60 border border-zinc-600/30 rounded-md text-zinc-200 text-xs transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" /> X
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-md text-emerald-300 text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700/50 hover:bg-zinc-700/80 border border-zinc-600/30 rounded-md text-zinc-300 text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Link2 className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  if (variant === "floating") {
    return (
      <div className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 ${className}`}>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-zinc-900/90 hover:bg-zinc-700/60 border border-zinc-700/50 hover:border-zinc-500/50 rounded-full text-zinc-400 hover:text-zinc-100 transition-all backdrop-blur-sm"
          title="Share on X"
        >
          <XIcon className="w-4 h-4" />
        </a>
        <button
          onClick={copyLink}
          className="p-2.5 bg-zinc-900/90 hover:bg-purple-500/20 border border-zinc-700/50 hover:border-purple-500/30 rounded-full text-zinc-400 hover:text-purple-300 transition-all backdrop-blur-sm"
          title={copied ? "Copied!" : "Copy link"}
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
        </button>
        {"share" in navigator && (
          <button
            onClick={handleNativeShare}
            className="p-2.5 bg-zinc-900/90 hover:bg-amber-500/20 border border-zinc-700/50 hover:border-amber-500/30 rounded-full text-zinc-400 hover:text-amber-300 transition-all backdrop-blur-sm"
            title="Share..."
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Default variant - inline bar
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">Share</span>
      <div className="flex gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-zinc-800/50 hover:bg-zinc-700/60 border border-zinc-700/30 hover:border-zinc-500/50 rounded-lg text-zinc-400 hover:text-zinc-100 transition-all"
          title="Share on X"
        >
          <XIcon className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-zinc-800/50 hover:bg-emerald-500/20 border border-zinc-700/30 hover:border-emerald-500/30 rounded-lg text-zinc-400 hover:text-emerald-300 transition-all"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
        <button
          onClick={copyLink}
          className="p-2 bg-zinc-800/50 hover:bg-purple-500/20 border border-zinc-700/30 hover:border-purple-500/30 rounded-lg text-zinc-400 hover:text-purple-300 transition-all"
          title={copied ? "Copied!" : "Copy link"}
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
