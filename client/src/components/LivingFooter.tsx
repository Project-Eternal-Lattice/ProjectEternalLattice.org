import { useRef, useEffect, useState } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         THE LIVING FOOTER                                     ║
 * ║         Particles drift freely, then coalesce into ∞ when visible             ║
 * ║                                                                               ║
 * ║  Devin's idea: "The Living Footer — particles coalesce into the infinity      ║
 * ║  symbol at the page bottom."                                                  ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  phase: number;
}

export default function LivingFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const progressRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

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
      generateInfinityTargets();
    };

    // Generate points along an infinity symbol (lemniscate of Bernoulli)
    function generateInfinityTargets() {
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w * 0.3, h * 0.6);
      const numParticles = 120;

      if (particlesRef.current.length === 0) {
        particlesRef.current = [];
        for (let i = 0; i < numParticles; i++) {
          const t = (i / numParticles) * Math.PI * 2;
          // Parametric lemniscate: x = cos(t) / (1 + sin²(t)), y = sin(t)cos(t) / (1 + sin²(t))
          const denom = 1 + Math.sin(t) * Math.sin(t);
          const tx = cx + (Math.cos(t) / denom) * scale;
          const ty = cy + (Math.sin(t) * Math.cos(t) / denom) * scale * 0.8;

          particlesRef.current.push({
            x: Math.random() * w,
            y: Math.random() * h,
            targetX: tx,
            targetY: ty,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1.5,
            hue: 35 + Math.random() * 30, // Gold spectrum
            phase: Math.random() * Math.PI * 2,
          });
        }
      } else {
        // Update targets on resize
        for (let i = 0; i < particlesRef.current.length; i++) {
          const t = (i / particlesRef.current.length) * Math.PI * 2;
          const denom = 1 + Math.sin(t) * Math.sin(t);
          particlesRef.current[i].targetX = cx + (Math.cos(t) / denom) * scale;
          particlesRef.current[i].targetY = cy + (Math.sin(t) * Math.cos(t) / denom) * scale * 0.8;
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);

    const startTime = performance.now();

    function animate() {
      const t = (performance.now() - startTime) / 1000;
      const particles = particlesRef.current;

      // Smoothly transition progress toward target
      const targetProgress = isVisible ? 1 : 0;
      progressRef.current += (targetProgress - progressRef.current) * 0.02;
      const progress = progressRef.current;

      ctx.clearRect(0, 0, w, h);

      // Draw connections between nearby particles (more visible when formed)
      if (progress > 0.5) {
        const connectionAlpha = (progress - 0.5) * 2 * 0.15;
        for (let i = 0; i < particles.length; i++) {
          const next = (i + 1) % particles.length;
          ctx.strokeStyle = `rgba(218, 165, 32, ${connectionAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[next].x, particles[next].y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      for (const p of particles) {
        // Blend between free-floating and target position
        if (progress > 0.1) {
          // Attract toward target
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.vx += dx * 0.01 * progress;
          p.vy += dy * 0.01 * progress;
          p.vx *= 0.92;
          p.vy *= 0.92;
        } else {
          // Free floating with gentle drift
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;
          p.vx *= 0.98;
          p.vy *= 0.98;
          // Boundary bounce
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle with glow
        const pulse = Math.sin(t * 2 + p.phase) * 0.3 + 0.7;
        const alpha = 0.5 + progress * 0.4;

        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.4 * pulse})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${alpha * pulse})`;
        ctx.fill();
      }

      // When fully formed, add a subtle golden glow at center
      if (progress > 0.8) {
        const glowAlpha = (progress - 0.8) * 5 * 0.15;
        const cx = w / 2;
        const cy = h / 2;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4);
        grad.addColorStop(0, `rgba(218, 165, 32, ${glowAlpha})`);
        grad.addColorStop(0.5, `rgba(218, 165, 32, ${glowAlpha * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.min(w, h) * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      {/* Subtle text that appears when infinity forms */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000"
        style={{ opacity: isVisible ? 0.4 : 0 }}
      >
        <span className="font-display text-sm tracking-[0.3em] text-amber-300/50 uppercase">
          All is One
        </span>
      </div>
    </div>
  );
}
