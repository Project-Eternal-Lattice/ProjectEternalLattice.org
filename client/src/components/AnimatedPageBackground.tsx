import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    ANIMATED PAGE BACKGROUNDS                                  ║
 * ║         Unique subtle canvas animations for each category page                ║
 * ║                                                                               ║
 * ║  Each theme creates a different visual atmosphere while remaining              ║
 * ║  subtle enough not to distract from content.                                  ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

export type BackgroundTheme =
  | "explore"      // Constellation map — stars connecting with lines
  | "theory"       // Geometric wireframe — rotating platonic solids
  | "wisdom"       // Flowing aurora — gentle color waves
  | "practice"     // Breathing circles — expanding/contracting rings
  | "community"    // Neural network — nodes pulsing in sync
  | "ailab"        // Matrix rain — falling code streams
  | "music";       // Sound waves — oscillating waveforms

interface AnimatedPageBackgroundProps {
  theme: BackgroundTheme;
  className?: string;
  opacity?: number;
  height?: string; // e.g., "400px" or "50vh"
}

export default function AnimatedPageBackground({
  theme,
  className = "",
  opacity = 0.3,
  height = "400px",
}: AnimatedPageBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxOrNull = canvas.getContext("2d");
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const renderers: Record<BackgroundTheme, (t: number) => void> = {
      explore: renderExplore,
      theory: renderTheory,
      wisdom: renderWisdom,
      practice: renderPractice,
      community: renderCommunity,
      ailab: renderAILab,
      music: renderMusic,
    };

    // ─── EXPLORE: Constellation Map ─────────────────────────────────────
    const stars: Array<{ x: number; y: number; r: number; twinkle: number; brightness: number }> = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }

    function renderExplore(t: number) {
      ctx.clearRect(0, 0, w, h);
      // Draw connections between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = (stars[i].x - stars[j].x) * w;
          const dy = (stars[i].y - stars[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[i].x * w, stars[i].y * h);
            ctx.lineTo(stars[j].x * w, stars[j].y * h);
            ctx.stroke();
          }
        }
      }
      // Draw stars with twinkle
      for (const star of stars) {
        const twinkle = Math.sin(t * 2 + star.twinkle) * 0.3 + 0.7;
        const alpha = star.brightness * twinkle;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fill();
        // Glow
        const grad = ctx.createRadialGradient(
          star.x * w, star.y * h, 0,
          star.x * w, star.y * h, star.r * 4
        );
        grad.addColorStop(0, `rgba(120, 160, 255, ${alpha * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─── THEORY: Geometric Wireframe ────────────────────────────────────
    function renderTheory(t: number) {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.3;

      // Draw rotating nested polygons
      for (let ring = 0; ring < 4; ring++) {
        const sides = ring + 3; // triangle, square, pentagon, hexagon
        const r = baseR * (0.4 + ring * 0.2);
        const rotation = t * (0.3 + ring * 0.1) * (ring % 2 === 0 ? 1 : -1);
        const alpha = 0.12 + ring * 0.04;

        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
          const angle = (i / sides) * Math.PI * 2 + rotation;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Connect vertices to center with faint lines
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2 + rotation;
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
          ctx.stroke();
        }
      }

      // Pulsing center point
      const pulse = Math.sin(t * 2) * 0.3 + 0.7;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20 * pulse);
      grad.addColorStop(0, `rgba(168, 85, 247, ${0.4 * pulse})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    // ─── WISDOM: Flowing Aurora ─────────────────────────────────────────
    function renderWisdom(t: number) {
      ctx.clearRect(0, 0, w, h);
      const layers = 5;
      for (let layer = 0; layer < layers; layer++) {
        const yBase = h * (0.3 + layer * 0.12);
        const amplitude = 30 + layer * 10;
        const speed = 0.5 + layer * 0.15;
        const hue = 30 + layer * 25; // gold → amber → warm tones

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 3) {
          const y = yBase +
            Math.sin(x * 0.005 + t * speed) * amplitude +
            Math.sin(x * 0.01 + t * speed * 0.7) * amplitude * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yBase - amplitude, 0, h);
        grad.addColorStop(0, `hsla(${hue}, 70%, 50%, ${0.04 - layer * 0.005})`);
        grad.addColorStop(0.5, `hsla(${hue}, 60%, 40%, ${0.02})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // ─── PRACTICE: Breathing Circles ────────────────────────────────────
    function renderPractice(t: number) {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const rings = 6;

      for (let i = 0; i < rings; i++) {
        const phase = t * 0.8 + (i / rings) * Math.PI * 2;
        const breathe = Math.sin(phase) * 0.3 + 0.7;
        const r = (40 + i * 40) * breathe;
        const alpha = 0.08 + (1 - i / rings) * 0.08;

        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Subtle fill
        const grad = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.3})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center dot
      const centerPulse = Math.sin(t * 0.8) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(cx, cy, 4 * centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${0.5 * centerPulse})`;
      ctx.fill();
    }

    // ─── COMMUNITY: Neural Network ──────────────────────────────────────
    const neurons: Array<{ x: number; y: number; vx: number; vy: number; phase: number }> = [];
    for (let i = 0; i < 40; i++) {
      neurons.push({
        x: Math.random() * 1,
        y: Math.random() * 1,
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        phase: Math.random() * Math.PI * 2,
      });
    }

    function renderCommunity(t: number) {
      ctx.clearRect(0, 0, w, h);
      // Update positions
      for (const n of neurons) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }
      // Draw connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = (neurons[i].x - neurons[j].x) * w;
          const dy = (neurons[i].y - neurons[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const pulse = Math.sin(t * 3 + neurons[i].phase + neurons[j].phase) * 0.3 + 0.7;
            const alpha = (1 - dist / 120) * 0.12 * pulse;
            ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(neurons[i].x * w, neurons[i].y * h);
            ctx.lineTo(neurons[j].x * w, neurons[j].y * h);
            ctx.stroke();
          }
        }
      }
      // Draw neurons
      for (const n of neurons) {
        const pulse = Math.sin(t * 2 + n.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 72, 153, ${0.4 * pulse})`;
        ctx.fill();
        // Glow
        const grad = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, 12);
        grad.addColorStop(0, `rgba(236, 72, 153, ${0.15 * pulse})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─── AI LAB: Matrix Rain ────────────────────────────────────────────
    const columns = Math.floor(w / 14);
    const drops: number[] = new Array(Math.max(columns, 1)).fill(0).map(() => Math.random() * -100);
    const chars = "01τψφΩ∞∂∇∫≡≈∑∏λμσπ";

    function renderAILab(t: number) {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = "12px monospace";
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14;
        const y = drops[i] * 14;

        // Green gradient based on position
        const brightness = Math.random() * 0.3 + 0.1;
        ctx.fillStyle = `rgba(0, 255, 128, ${brightness})`;
        ctx.fillText(char, x, y);

        // Reset drop when it goes off screen
        if (y > h && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.3 + Math.random() * 0.2;
      }
    }

    // ─── MUSIC: Sound Waves ─────────────────────────────────────────────
    function renderMusic(t: number) {
      ctx.clearRect(0, 0, w, h);
      const waves = 4;
      const cy = h / 2;

      for (let wave = 0; wave < waves; wave++) {
        const amplitude = 20 + wave * 8;
        const freq = 0.008 + wave * 0.003;
        const speed = 1.5 + wave * 0.3;
        const hue = 270 + wave * 20; // purple spectrum

        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${0.12 - wave * 0.02})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = cy +
            Math.sin(x * freq + t * speed) * amplitude +
            Math.sin(x * freq * 2.3 + t * speed * 0.7) * amplitude * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // ─── Animation Loop ─────────────────────────────────────────────────
    const startTime = performance.now();
    function animate() {
      const t = (performance.now() - startTime) / 1000;
      renderers[theme](t);
      animationRef.current = requestAnimationFrame(animate);
    }

    setTimeout(() => {
      setIsVisible(true);
      animate();
    }, 100);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [theme]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
    >
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? opacity : 0 }}
        transition={{ duration: 1.5 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
      {/* Fade-out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
