import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      ILLUMINATED MANUSCRIPT QUOTE                             ║
 * ║         Sacred quotes with gold drop caps and letter-by-letter reveal         ║
 * ║                                                                               ║
 * ║  Devin's idea: "Illuminated Manuscript Mode — quotes with gold drop caps      ║
 * ║  and letter-by-letter reveal."                                                ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface IlluminatedQuoteProps {
  text: string;
  attribution?: string;
  className?: string;
}

export default function IlluminatedQuote({
  text,
  attribution,
  className = "",
}: IlluminatedQuoteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [revealedChars, setRevealedChars] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isVisible]);

  // Letter-by-letter reveal animation
  useEffect(() => {
    if (!isVisible) return;

    const totalChars = text.length;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setRevealedChars(current);
      if (current >= totalChars) {
        clearInterval(interval);
      }
    }, 30); // 30ms per character — feels like careful inscription

    return () => clearInterval(interval);
  }, [isVisible, text]);

  const firstChar = text.charAt(0);
  const restOfText = text.slice(1);

  return (
    <div
      ref={containerRef}
      className={`relative my-12 ${className}`}
    >
      {/* Decorative border — illuminated manuscript frame */}
      <div className="relative border border-amber-500/20 rounded-lg p-8 md:p-12 bg-gradient-to-br from-amber-950/10 via-transparent to-purple-950/10">
        {/* Corner ornaments */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/40 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/40 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/40 rounded-br-lg" />

        {/* The quote itself */}
        <blockquote className="relative font-display text-xl md:text-2xl leading-relaxed text-foreground/90">
          {/* Gold drop cap */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="float-left text-6xl md:text-7xl font-heading font-bold mr-3 mt-1 leading-none"
            style={{
              background: "linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f6d365 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(246, 211, 101, 0.3)",
            }}
          >
            {isVisible ? firstChar : "\u00A0"}
          </motion.span>

          {/* Letter-by-letter reveal */}
          <span aria-label={text}>
            {restOfText.split("").map((char, i) => (
              <span
                key={i}
                className="transition-all duration-300"
                style={{
                  opacity: i < revealedChars - 1 ? 1 : 0,
                  transform: i < revealedChars - 1 ? "translateY(0)" : "translateY(4px)",
                  display: "inline",
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </blockquote>

        {/* Attribution */}
        {attribution && (
          <motion.cite
            initial={{ opacity: 0 }}
            animate={isVisible && revealedChars >= text.length ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block mt-6 text-right font-body text-sm text-amber-300/70 not-italic tracking-wide"
          >
            — {attribution}
          </motion.cite>
        )}

        {/* Subtle golden glow behind the quote */}
        <div
          className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-1000"
          style={{
            opacity: isVisible ? 0.05 : 0,
            background: "radial-gradient(ellipse at 30% 50%, rgba(218, 165, 32, 0.3), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
