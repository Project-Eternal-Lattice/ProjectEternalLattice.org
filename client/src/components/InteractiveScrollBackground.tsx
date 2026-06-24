import { useEffect, useRef, useCallback } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                   INTERACTIVE SCROLL BACKGROUND                               ║
 * ║                                                                               ║
 * ║  A full-page canvas background that LIGHTS UP as you scroll:                  ║
 * ║    • Nodes glow brighter and pulse faster as scroll progresses                ║
 * ║    • Connection lines illuminate in waves following scroll direction           ║
 * ║    • Mouse proximity creates a "spotlight" effect with radial glow            ║
 * ║    • Scroll velocity creates energy bursts and particle acceleration          ║
 * ║    • Color temperature shifts from cool indigo → warm gold with depth         ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: [number, number, number]; // RGB
  pulsePhase: number;
  energy: number; // 0-1, increases with scroll/mouse proximity
}

interface InteractiveScrollBackgroundProps {
  nodeCount?: number;
  className?: string;
}

export default function InteractiveScrollBackground({
  nodeCount = 90,
  className = "",
}: InteractiveScrollBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const stateRef = useRef({
    scrollProgress: 0,
    scrollVelocity: 0,
    lastScrollY: 0,
    mouseX: -1000,
    mouseY: -1000,
    mouseActive: false,
    width: 0,
    height: 0,
    time: 0,
    energyWave: 0, // Travels down the page as you scroll
  });

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    const colors: [number, number, number][] = [
      [168, 85, 247],  // Purple
      [139, 92, 246],  // Violet
      [59, 130, 246],  // Blue
      [16, 185, 129],  // Emerald
      [251, 191, 36],  // Gold
      [236, 72, 153],  // Pink
    ];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.5,
        baseRadius: Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        energy: 0,
      });
    }
    nodesRef.current = nodes;
  }, [nodeCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const state = stateRef.current;

    // Resize handler
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodesRef.current.length === 0) {
        initNodes(state.width, state.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Scroll handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const velocity = scrollY - state.lastScrollY;

      state.scrollProgress = scrollHeight > 0 ? scrollY / scrollHeight : 0;
      state.scrollVelocity = velocity;
      state.lastScrollY = scrollY;

      // Energy wave follows scroll position
      state.energyWave = state.scrollProgress;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      state.mouseActive = true;
    };
    const handleMouseLeave = () => {
      state.mouseActive = false;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      if (prefersReducedMotion.current) {
        // Static render for reduced motion
        renderStatic(ctx, state);
        return;
      }

      state.time += 0.016; // ~60fps
      render(ctx, state);
      animationRef.current = requestAnimationFrame(animate);
    };

    function render(
      ctx: CanvasRenderingContext2D,
      state: typeof stateRef.current
    ) {
      const { width: w, height: h, scrollProgress, scrollVelocity, mouseX, mouseY, mouseActive, time, energyWave } = state;
      const nodes = nodesRef.current;

      ctx.clearRect(0, 0, w, h);

      // Scroll velocity creates a "burst" intensity
      const burstIntensity = Math.min(Math.abs(scrollVelocity) / 30, 1);
      // Decay velocity
      state.scrollVelocity *= 0.92;

      // Base intensity increases with scroll depth
      const baseIntensity = 0.3 + scrollProgress * 0.5;

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary bounce
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        // Energy from scroll position — nodes near the "energy wave" light up
        const nodeYProgress = node.y / h;
        const waveDistance = Math.abs(nodeYProgress - energyWave);
        const waveEnergy = Math.max(0, 1 - waveDistance * 3); // Nodes within 33% of wave glow

        // Energy from mouse proximity — dual force field
        let mouseEnergy = 0;
        if (mouseActive) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 250) {
            mouseEnergy = (1 - dist / 250) * 0.8;

            if (dist < 60) {
              // REPEL — very close particles push away from cursor
              const repelForce = (1 - dist / 60) * 0.15;
              const angle = Math.atan2(dy, dx);
              node.vx -= Math.cos(angle) * repelForce;
              node.vy -= Math.sin(angle) * repelForce;
            } else if (dist < 150) {
              // ORBIT — medium distance particles swirl around cursor
              const orbitForce = (1 - (dist - 60) / 90) * 0.04;
              // Perpendicular + slight inward pull creates orbit
              const angle = Math.atan2(dy, dx);
              const perpX = -Math.sin(angle);
              const perpY = Math.cos(angle);
              node.vx += perpX * orbitForce + dx * 0.00002;
              node.vy += perpY * orbitForce + dy * 0.00002;
            } else {
              // ATTRACT — far particles gently drift toward cursor
              node.vx += dx * 0.00005;
              node.vy += dy * 0.00005;
            }
          }
        }

        // Energy from scroll velocity burst
        const burstEnergy = burstIntensity * 0.6;

        // Combine energies with smooth interpolation
        const targetEnergy = Math.min(1, waveEnergy + mouseEnergy + burstEnergy + baseIntensity * 0.3);
        node.energy += (targetEnergy - node.energy) * 0.08; // Smooth transition

        // Velocity damping
        const maxVel = 0.8 + node.energy * 0.5;
        node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
        node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));
        node.vx *= 0.995;
        node.vy *= 0.995;

        // Pulse radius based on energy
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 1;
        node.radius = node.baseRadius * pulse * (1 + node.energy * 0.8);
      }

      // Draw connections
      const connectionDist = 120 + scrollProgress * 40; // Connections reach further as you scroll
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const avgEnergy = (nodes[i].energy + nodes[j].energy) / 2;
            const alpha = (1 - dist / connectionDist) * (0.05 + avgEnergy * 0.25);

            // Color shifts with scroll: cool → warm
            const r = Math.round(nodes[i].color[0] * (1 - scrollProgress * 0.3) + 251 * scrollProgress * 0.3);
            const g = Math.round(nodes[i].color[1] * (1 - scrollProgress * 0.2) + 191 * scrollProgress * 0.2);
            const b = Math.round(nodes[i].color[2] * (1 - scrollProgress * 0.5));

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 0.5 + avgEnergy * 1.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Energy pulse traveling along connection
            if (avgEnergy > 0.4) {
              const pulsePos = (time * 0.8 + i * 0.05) % 1;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 1.5 * avgEnergy, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 1.5})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const { x, y, radius, color, energy } = node;

        // Node glow (larger when energized)
        if (energy > 0.1) {
          const glowRadius = radius * (3 + energy * 8);
          const grad = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
          const r = Math.round(color[0] * (1 - scrollProgress * 0.2) + 251 * scrollProgress * 0.2);
          const g = Math.round(color[1] * (1 - scrollProgress * 0.1) + 191 * scrollProgress * 0.1);
          const b = Math.round(color[2] * (1 - scrollProgress * 0.4));
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${energy * 0.4})`);
          grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${energy * 0.15})`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core node
        const coreAlpha = 0.3 + energy * 0.7;
        const r = Math.round(color[0] * (1 - scrollProgress * 0.2) + 251 * scrollProgress * 0.2);
        const g = Math.round(color[1] * (1 - scrollProgress * 0.1) + 191 * scrollProgress * 0.1);
        const b = Math.round(color[2] * (1 - scrollProgress * 0.4));
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${coreAlpha})`;
        ctx.fill();
      }

      // Mouse spotlight effect
      if (mouseActive) {
        const spotlightRadius = 180;
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, spotlightRadius);
        grad.addColorStop(0, `rgba(168, 85, 247, ${0.06 + burstIntensity * 0.04})`);
        grad.addColorStop(0.5, `rgba(139, 92, 246, ${0.03 + burstIntensity * 0.02})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, spotlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function renderStatic(
      ctx: CanvasRenderingContext2D,
      state: typeof stateRef.current
    ) {
      const { width: w, height: h } = state;
      const nodes = nodesRef.current;
      ctx.clearRect(0, 0, w, h);

      // Just draw nodes and connections at low opacity for reduced-motion users
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.1;
            ctx.strokeStyle = `rgba(${nodes[i].color.join(",")}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color.join(",")}, 0.4)`;
        ctx.fill();
      }
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
