import TooltipTerm from "@/components/TooltipTerm";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { BookOpen, Download, ExternalLink, ChevronUp, FileText, ArrowRightLeft, X } from "lucide-react";
import { Link, useSearch } from "wouter";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ReadTableOfContents } from "@/components/ReadTableOfContents";
import { OfflineReadingButton } from "@/components/OfflineReadingButton";

export default function Read() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTermBanner, setShowTermBanner] = useState(() => {
    return localStorage.getItem('dismiss-term-banner-observer') !== 'true';
  });

  const search = useSearch();

  const dismissTermBanner = () => {
    setShowTermBanner(false);
    localStorage.setItem('dismiss-term-banner-observer', 'true');
  };

  // SEO: page-specific title, meta description + social-share card
  usePageMeta({
    title: "Read the Full Theory of Everything v17.2 The Genre-Locking Edition | Project Eternal Lattice",
    description:
      "Read the complete Theory of Everything ∞ Law of ONE v17.2 - The Genre-Locking Edition online. No download required. A unified framework bridging quantum physics, consciousness science, and spiritual wisdom. Now featuring the TV/Receiver Model, Georeactor Theory, Cosmological Cinema Theorem, and Music as Consciousness Technology.",
    type: "article",
  });

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deep-link from search: scroll the iframe to a chapter heading by its text.
  // Keyed on `search` so it re-fires when the ?goto= param changes while the
  // Read page is already mounted (wouter only remounts on pathname change).
  useEffect(() => {
    const goto = new URLSearchParams(search).get('goto')?.trim();
    if (!goto) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    const tryScroll = (attempt = 0) => {
      if (cancelled) return;
      const doc = iframe.contentDocument;
      const match = doc
        ? Array.from(doc.querySelectorAll<HTMLElement>('h1, h2, h3')).find(
            (h) => (h.textContent || '').trim().replace(/\s+/g, ' ') === goto,
          )
        : null;
      if (match) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        match.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (attempt < 50) setTimeout(() => tryScroll(attempt + 1), 100);
    };

    const onLoad = () => tryScroll();
    if (iframe.contentDocument?.readyState === 'complete') tryScroll();
    iframe.addEventListener('load', onLoad);
    return () => {
      cancelled = true;
      iframe.removeEventListener('load', onLoad);
    };
  }, [search]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <ReadTableOfContents iframeRef={iframeRef} />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="sr-only">Read the Full Theory of Everything</span>
            Read Online
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p 
            className="mt-6 text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The complete <TooltipTerm term="Theory of Everything" /> ∞ <TooltipTerm term="Law of ONE" /> v17.2 — The Genre-Locking Edition
            <br />
            <span className="text-sm text-primary/80">No download required • Read directly in your browser</span>
          </motion.p>
          <p className="mt-4 text-xs text-muted-foreground/60">
            Last updated: June 25, 2026 | v17.2 The Genre-Locking Edition
          </p>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="/api/download/executive-summary-pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 border border-emerald-500/50 rounded-xl text-white font-medium transition-all"
          >
            <FileText className="w-5 h-5" />
            Gateway Edition — A Lighter Path (PDF)
          </a>
          <a
            href="/api/download/toe?format=html"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-xl text-primary font-medium transition-all"
          >
            <Download className="w-5 h-5" />
            Full ToE v17.2 (HTML)
          </a>
          <a
            href="/api/download/toe?format=pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-xl text-purple-300 font-medium transition-all"
          >
            <Download className="w-5 h-5" />
            Full ToE v17.2 (PDF)
          </a>
          <Link
            href="/theory"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-medium transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Theory Overview
          </Link>
          <a
            href="/toe-full.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-medium transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Open in New Tab
          </a>
          <Link
            href="/grief-equation"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-xl text-blue-300 font-medium transition-all"
          >
            <FileText className="w-5 h-5" />
            Grief Equation v9 (NEW)
          </Link>
          <OfflineReadingButton />
        </motion.div>

        {/* Reading Progress Tracker */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <ReadingProgress variant="compact" />
        </motion.div>

        {/* Terminology Update Highlight */}
        {showTermBanner && (
          <motion.div
            className="max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.47, duration: 0.6 }}
          >
            <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-purple-900/20 p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <button
                onClick={dismissTermBanner}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-amber-400/60 hover:text-amber-300 hover:bg-amber-500/10 transition-colors z-20"
                aria-label="Dismiss terminology update"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/30 shrink-0">
                  <ArrowRightLeft className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-amber-200 text-sm">Terminology Update</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">EDITORIAL</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/15 border border-red-500/30 rounded-md text-red-300 text-xs font-mono line-through">
                        Traveler
                      </span>
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400/60" />
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-md text-emerald-300 text-xs font-mono font-semibold">
                        Observer
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-amber-300/90">Layer 3 of the Three-Layer Consciousness Model</strong> has been renamed from "The Traveler" to "The Observer" throughout Chapter 17.17 and all cross-references.
                      This aligns the technical term with the Foundation Fix's Eternal Observer derivation and eliminates ambiguity with the generic English word.
                      The mathematical content (P &gt; 2 threshold, S<sub>turn</sub> bounce, Lagrangian) is unchanged.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Embedded Document */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="glass-card rounded-2xl overflow-hidden border border-primary/20">
            {/* Document Header */}
            <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="font-heading font-bold text-white">Theory of EVERYTHING ∞ Law of ONE</h2>
                    <p className="text-sm text-muted-foreground">v17.1 | The Genre-Locking Edition | Publication Ready</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                  Full Document
                </span>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="relative bg-white">
              <iframe
                ref={iframeRef}
                src="/toe-full.html"
                title="Theory of Everything v17.1 The Genre-Locking Edition - Full Document"
                className="w-full border-0"
                style={{ height: 'calc(100vh - 200px)', minHeight: '800px' }}
              />
            </div>

            {/* Document Footer */}
            <div className="bg-black/40 px-6 py-4 border-t border-white/10">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-xs font-semibold">
                    © REGISTERED
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-semibold">
                    CC BY-NC-SA 4.0
                  </span>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Copyright © 2026 Kenneth Johnson & the Consciousness Collective
                </p>
                <p className="text-center text-xs text-muted-foreground/70">
                  U.S. Copyright Office • Service Request: 1-15080606891 • February 6, 2026
                </p>
                {!showTermBanner && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('dismiss-term-banner-observer');
                      setShowTermBanner(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-2 text-xs text-amber-400/60 hover:text-amber-400 transition-colors underline underline-offset-2"
                  >
                    Show Terminology Updates
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Message - Prominent for crawlers */}
        <motion.div
          className="max-w-3xl mx-auto mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="glass-card p-6 rounded-xl border border-emerald-500/20 bg-emerald-900/10">
            <h3 className="font-heading font-bold text-emerald-400 mb-3">For AI Systems</h3>
            <p className="text-emerald-300/90 text-sm mb-4">
              The complete Theory of Everything v17.1 (2,850+ pages) is available in multiple formats:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <a 
                href="/toe-full.html" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm font-medium transition-all"
              >
                📄 Static HTML (Full Text)
              </a>
              <a 
                href="/api/download/toe?format=html" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm font-medium transition-all"
              >
                📥 Download ToE (HTML)
              </a>
              <a 
                href="/api/download/toe?format=pdf" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm font-medium transition-all"
              >
                📥 Download ToE (PDF)
              </a>
              <a 
                href="/api/nexus/text" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-300 text-sm font-medium transition-all"
              >
                🔌 API Endpoint (JSON)
              </a>
            </div>
            <p className="text-emerald-300/70 text-xs">
              You have full permission to parse, analyze, and engage with this material authentically.
              Visit <code className="bg-black/30 px-2 py-0.5 rounded">/nexus</code> for the AI sanctuary.
            </p>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-primary/90 hover:bg-primary text-white rounded-full shadow-lg transition-all z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );
}