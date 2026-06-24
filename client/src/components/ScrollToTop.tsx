import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Back to Top — Energy Node
 *
 * A glowing energy node that appears when scrolling down.
 * Styled to match the InteractiveScrollBackground — pulsing glow,
 * connection-line orbits, and color temperature that shifts with scroll.
 */

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? scrollY / scrollHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Canvas animation for the orbiting particles
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 56;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    let time = 0;

    const orbitParticles = Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      radius: 22 + Math.random() * 4,
      speed: 0.8 + Math.random() * 0.4,
      size: 1.5 + Math.random() * 1,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, size, size);

      // Color shifts with scroll progress (cool → warm)
      const r = Math.round(168 * (1 - scrollProgress * 0.3) + 251 * scrollProgress * 0.3);
      const g = Math.round(85 * (1 - scrollProgress * 0.2) + 191 * scrollProgress * 0.2);
      const b = Math.round(247 * (1 - scrollProgress * 0.5));

      // Outer glow ring
      const glowIntensity = isHovered ? 0.4 : 0.15 + Math.sin(time * 2) * 0.08;
      const glowRadius = isHovered ? 26 : 23 + Math.sin(time * 1.5) * 2;
      const grad = ctx.createRadialGradient(cx, cy, 12, cx, cy, glowRadius);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowIntensity})`);
      grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${glowIntensity * 0.4})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Orbiting particles
      for (const p of orbitParticles) {
        const angle = p.angle + time * p.speed;
        const orbitRadius = p.radius + (isHovered ? 2 : 0);
        const px = cx + Math.cos(angle) * orbitRadius;
        const py = cy + Math.sin(angle) * orbitRadius;
        const pulse = Math.sin(time * 3 + p.phase) * 0.3 + 0.7;
        const particleSize = p.size * pulse * (isHovered ? 1.4 : 1);

        // Connection line from particle to center
        const lineAlpha = (isHovered ? 0.3 : 0.12) * pulse;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Particle glow
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, particleSize * 3);
        pGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.6 * pulse})`);
        pGrad.addColorStop(1, "transparent");
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, particleSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(px, py, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.9 * pulse})`;
        ctx.fill();
      }

      // Scroll progress ring
      const ringRadius = 25;
      const ringWidth = isHovered ? 2.5 : 2;
      const startAngle = -Math.PI / 2; // Start from top
      const endAngle = startAngle + scrollProgress * Math.PI * 2;

      // Background track (dim)
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.1)`;
      ctx.lineWidth = ringWidth;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Progress arc (bright, glowing)
      if (scrollProgress > 0.01) {
        // Glow layer
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${isHovered ? 0.4 : 0.25})`;
        ctx.lineWidth = ringWidth + 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, startAngle, endAngle);
        ctx.stroke();

        // Core progress line
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${isHovered ? 0.9 : 0.7})`;
        ctx.lineWidth = ringWidth;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, startAngle, endAngle);
        ctx.stroke();

        // Bright dot at the leading edge
        const dotX = cx + Math.cos(endAngle) * ringRadius;
        const dotY = cy + Math.sin(endAngle) * ringRadius;
        const dotGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 4);
        dotGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
        dotGrad.addColorStop(1, "transparent");
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center core glow
      const corePulse = Math.sin(time * 2.5) * 0.15 + 0.85;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 10 * corePulse);
      coreGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${isHovered ? 0.5 : 0.25})`);
      coreGrad.addColorStop(1, "transparent");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 10 * corePulse, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, scrollProgress, isHovered]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center group cursor-pointer"
          aria-label="Back to top"
          title="Back to top"
          style={{
            background: isHovered
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(15, 10, 30, 0.9) 70%)"
              : "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(15, 10, 30, 0.85) 70%)",
            border: isHovered
              ? "1px solid rgba(168, 85, 247, 0.5)"
              : "1px solid rgba(168, 85, 247, 0.2)",
            boxShadow: isHovered
              ? "0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1), inset 0 0 15px rgba(168, 85, 247, 0.1)"
              : "0 0 10px rgba(168, 85, 247, 0.15), 0 0 20px rgba(168, 85, 247, 0.05)",
            transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Canvas for orbiting particles */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
            style={{ width: 56, height: 56 }}
          />
          {/* Arrow icon */}
          <ArrowUp
            className={`w-5 h-5 relative z-10 transition-all duration-300 ${
              isHovered
                ? "text-purple-200 -translate-y-0.5 scale-110"
                : "text-purple-300/70"
            }`}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
