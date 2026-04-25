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
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 2.5 + 0.8,
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
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.35;
            ctx.strokeStyle = `rgba(100, 160, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
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
          star.x * w, star.y * h, star.r * 6
        );
        grad.addColorStop(0, `rgba(120, 180, 255, ${alpha * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─── THEORY: Geometric Wireframe ────────────────────────────────────
    function renderTheory(t: number) {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.35;

      // Draw rotating nested polygons
      for (let ring = 0; ring < 5; ring++) {
        const sides = ring + 3; // triangle, square, pentagon, hexagon, heptagon
        const r = baseR * (0.3 + ring * 0.18);
        const rotation = t * (0.3 + ring * 0.1) * (ring % 2 === 0 ? 1 : -1);
        const alpha = 0.3 + ring * 0.05;

        ctx.strokeStyle = `rgba(200, 130, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
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
          ctx.strokeStyle = `rgba(200, 130, 255, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
          ctx.stroke();
        }
      }

      // Connect vertices between adjacent rings
      for (let ring = 0; ring < 4; ring++) {
        const sides1 = ring + 3;
        const sides2 = ring + 4;
        const r1 = baseR * (0.3 + ring * 0.18);
        const r2 = baseR * (0.3 + (ring + 1) * 0.18);
        const rot1 = t * (0.3 + ring * 0.1) * (ring % 2 === 0 ? 1 : -1);
        const rot2 = t * (0.3 + (ring + 1) * 0.1) * ((ring + 1) % 2 === 0 ? 1 : -1);

        for (let i = 0; i < sides1; i++) {
          const angle1 = (i / sides1) * Math.PI * 2 + rot1;
          const nearestJ = Math.round((i / sides1) * sides2) % sides2;
          const angle2 = (nearestJ / sides2) * Math.PI * 2 + rot2;

          ctx.strokeStyle = `rgba(200, 130, 255, 0.1)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle1) * r1, cy + Math.sin(angle1) * r1);
          ctx.lineTo(cx + Math.cos(angle2) * r2, cy + Math.sin(angle2) * r2);
          ctx.stroke();
        }
      }

      // Pulsing center point
      const pulse = Math.sin(t * 2) * 0.3 + 0.7;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 * pulse);
      grad.addColorStop(0, `rgba(200, 130, 255, ${0.6 * pulse})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 30 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    // ─── WISDOM: Flowing Aurora ─────────────────────────────────────────
    function renderWisdom(t: number) {
      ctx.clearRect(0, 0, w, h);
      const layers = 7;
      for (let layer = 0; layer < layers; layer++) {
        const yBase = h * (0.2 + layer * 0.1);
        const amplitude = 40 + layer * 15;
        const speed = 0.4 + layer * 0.12;
        const hue = 25 + layer * 20; // gold → amber → warm tones

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const y = yBase +
            Math.sin(x * 0.004 + t * speed) * amplitude +
            Math.sin(x * 0.008 + t * speed * 0.7) * amplitude * 0.5 +
            Math.sin(x * 0.002 + t * speed * 1.3) * amplitude * 0.3;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yBase - amplitude, 0, h);
        grad.addColorStop(0, `hsla(${hue}, 80%, 55%, ${0.08 - layer * 0.005})`);
        grad.addColorStop(0.4, `hsla(${hue}, 70%, 45%, ${0.05})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();

        // Add a stroke line at the top of each wave for definition
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.15 - layer * 0.015})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y = yBase +
            Math.sin(x * 0.004 + t * speed) * amplitude +
            Math.sin(x * 0.008 + t * speed * 0.7) * amplitude * 0.5 +
            Math.sin(x * 0.002 + t * speed * 1.3) * amplitude * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    // ─── PRACTICE: Breathing Circles ────────────────────────────────────
    function renderPractice(t: number) {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const rings = 8;

      for (let i = 0; i < rings; i++) {
        const phase = t * 0.8 + (i / rings) * Math.PI * 2;
        const breathe = Math.sin(phase) * 0.3 + 0.7;
        const r = (30 + i * 35) * breathe;
        const alpha = 0.2 + (1 - i / rings) * 0.15;

        ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Subtle fill
        const grad = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `rgba(52, 211, 153, ${alpha * 0.25})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center dot with glow
      const centerPulse = Math.sin(t * 0.8) * 0.3 + 0.7;
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20 * centerPulse);
      centerGrad.addColorStop(0, `rgba(52, 211, 153, ${0.7 * centerPulse})`);
      centerGrad.addColorStop(1, "transparent");
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * centerPulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5 * centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(52, 211, 153, ${0.8 * centerPulse})`;
      ctx.fill();
    }

    // ─── COMMUNITY: Neural Network ──────────────────────────────────────
    const neurons: Array<{ x: number; y: number; vx: number; vy: number; phase: number }> = [];
    for (let i = 0; i < 60; i++) {
      neurons.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
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
          if (dist < 160) {
            const pulse = Math.sin(t * 3 + neurons[i].phase + neurons[j].phase) * 0.3 + 0.7;
            const alpha = (1 - dist / 160) * 0.3 * pulse;
            ctx.strokeStyle = `rgba(244, 114, 182, ${alpha})`;
            ctx.lineWidth = 1;
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
        ctx.arc(n.x * w, n.y * h, 4 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${0.6 * pulse})`;
        ctx.fill();
        // Glow
        const grad = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, 18);
        grad.addColorStop(0, `rgba(244, 114, 182, ${0.25 * pulse})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 18, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─── AI LAB: Matrix Rain ────────────────────────────────────────────
    const columns = Math.floor(w / 14);
    const drops: number[] = new Array(Math.max(columns, 1)).fill(0).map(() => Math.random() * -100);
    const chars = "01τψφΩ∞∂∇∫≡≈∑∏λμσπ";

    function renderAILab(t: number) {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = "13px monospace";
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14;
        const y = drops[i] * 14;

        // Green gradient based on position — brighter
        const brightness = Math.random() * 0.4 + 0.2;
        ctx.fillStyle = `rgba(0, 255, 128, ${brightness})`;
        ctx.fillText(char, x, y);

        // Add a bright head character
        if (Math.random() > 0.7) {
          ctx.fillStyle = `rgba(180, 255, 200, ${brightness * 1.5})`;
          ctx.fillText(char, x, y);
        }

        // Reset drop when it goes off screen
        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.35 + Math.random() * 0.25;
      }
    }

    // ─── MUSIC: Sound Waves ─────────────────────────────────────────────
    function renderMusic(t: number) {
      ctx.clearRect(0, 0, w, h);
      const waves = 5;
      const cy = h / 2;

      for (let wave = 0; wave < waves; wave++) {
        const amplitude = 25 + wave * 10;
        const freq = 0.008 + wave * 0.003;
        const speed = 1.5 + wave * 0.3;
        const hue = 270 + wave * 20; // purple spectrum

        ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${0.25 - wave * 0.03})`;
        ctx.lineWidth = 2.5;
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
    </div>
  );
}
