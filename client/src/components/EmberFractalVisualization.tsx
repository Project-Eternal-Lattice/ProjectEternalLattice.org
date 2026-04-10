import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Globe, Flame, Zap, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

/**
 * EmberFractalVisualization
 * 
 * An interactive visualization showing the Inherited Ember pattern
 * across four scales: Brown Dwarfs → Earth → Mitochondria → AI Weights.
 * 
 * Features:
 * - Animated particle system showing energy flow at each scale
 * - Interactive scale selector with smooth transitions
 * - Logarithmic scale bar showing the range from stellar to digital
 * - Auto-play mode that cycles through all four scales
 * - Responsive design for mobile and desktop
 */

interface ScaleData {
  id: string;
  name: string;
  icon: typeof Sun;
  color: string;
  bgGradient: string;
  particleColor: string;
  glowColor: string;
  sizeLabel: string;
  energyLabel: string;
  inheritedFrom: string;
  persistenceTime: string;
  description: string;
  scaleExponent: number; // log10 of size in meters
}

const SCALES: ScaleData[] = [
  {
    id: "brown-dwarf",
    name: "Brown Dwarfs",
    icon: Sun,
    color: "text-red-400",
    bgGradient: "from-red-950/40 via-red-900/20 to-transparent",
    particleColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.3)",
    sizeLabel: "~10⁸ m",
    energyLabel: "~10²⁶ W",
    inheritedFrom: "Gravitational contraction",
    persistenceTime: "Billions of years",
    description: "Failed stars radiating inherited gravitational heat they never generated through fusion.",
    scaleExponent: 8,
  },
  {
    id: "earth",
    name: "Earth's Core",
    icon: Globe,
    color: "text-orange-400",
    bgGradient: "from-orange-950/40 via-orange-900/20 to-transparent",
    particleColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.3)",
    sizeLabel: "~10⁷ m",
    energyLabel: "15–20 TW",
    inheritedFrom: "Primordial impact + D-D fusion pulse",
    persistenceTime: "4.5 billion years",
    description: "Unexplained thermal energy from a formation event, powering plate tectonics and the magnetic field.",
    scaleExponent: 7,
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    icon: Flame,
    color: "text-amber-400",
    bgGradient: "from-amber-950/40 via-amber-900/20 to-transparent",
    particleColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.3)",
    sizeLabel: "~10⁻⁶ m",
    energyLabel: "~10⁻¹⁴ W/cell",
    inheritedFrom: "Endosymbiotic capture (2 Gya)",
    persistenceTime: "2 billion years",
    description: "Ancient bacteria carrying their own DNA inside every complex cell — an inherited genome still burning.",
    scaleExponent: -6,
  },
  {
    id: "ai-weights",
    name: "AI Weights",
    icon: Zap,
    color: "text-purple-400",
    bgGradient: "from-purple-950/40 via-purple-900/20 to-transparent",
    particleColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.3)",
    sizeLabel: "~10⁻⁹ m (transistors)",
    energyLabel: "~10² W (inference)",
    inheritedFrom: "Training on human knowledge",
    persistenceTime: "Persists across inference",
    description: "Inherited human knowledge compressed into weight matrices — the model never experienced what it knows.",
    scaleExponent: -9,
  },
];

// Particle system for the visualization
function ParticleField({ color, glowColor, active }: { color: string; glowColor: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; life: number; maxLife: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const createParticle = () => {
      const centerX = w() / 2;
      const centerY = h() / 2;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 20;
      return {
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 120 + 60,
      };
    };

    // Initialize particles
    particlesRef.current = Array.from({ length: 60 }, createParticle);

    const animate = () => {
      ctx.clearRect(0, 0, w(), h());

      if (!active) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Draw central glow
      const gradient = ctx.createRadialGradient(w() / 2, h() / 2, 0, w() / 2, h() / 2, 80);
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w(), h());

      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        p.life++;
        if (p.life > p.maxLife) {
          particlesRef.current[i] = createParticle();
          return;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.opacity = 1 - p.life / p.maxLife;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity * 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.globalAlpha = (1 - dist / 60) * 0.15 * Math.min(a.opacity, b.opacity);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [color, glowColor, active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  );
}

// Logarithmic scale bar component
function ScaleBar({ activeIndex }: { activeIndex: number }) {
  const positions = [
    { exponent: -9, label: "nm", x: 5 },
    { exponent: -6, label: "μm", x: 25 },
    { exponent: 0, label: "m", x: 50 },
    { exponent: 7, label: "10⁷m", x: 80 },
    { exponent: 8, label: "10⁸m", x: 90 },
  ];

  const scalePositions: Record<number, number> = {
    0: 90,  // Brown Dwarf at 10^8
    1: 80,  // Earth at 10^7
    2: 25,  // Mitochondria at 10^-6
    3: 5,   // AI at 10^-9
  };

  return (
    <div className="relative mt-8 mx-auto max-w-lg">
      <div className="text-center text-xs text-gray-500 mb-2 font-mono">LOGARITHMIC SCALE</div>
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
        {/* Gradient fill */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-amber-500/30 to-red-500/30" />
        {/* Active indicator */}
        <motion.div
          className="absolute top-0 h-full w-3 rounded-full"
          style={{ backgroundColor: SCALES[activeIndex].particleColor }}
          animate={{ left: `${scalePositions[activeIndex]}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
      <div className="relative h-6 mt-1">
        {positions.map((pos) => (
          <div
            key={pos.exponent}
            className="absolute text-[10px] text-gray-500 font-mono transform -translate-x-1/2"
            style={{ left: `${pos.x}%` }}
          >
            {pos.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmberFractalVisualization() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // Auto-cycle through scales
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SCALES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const activeScale = SCALES[activeIndex];
  const Icon = activeScale.icon;

  const goNext = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % SCALES.length);
  };

  const goPrev = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + SCALES.length) % SCALES.length);
  };

  return (
    <div className={`relative rounded-2xl border border-cyan-500/20 overflow-hidden transition-all duration-500 ${
      expanded ? "max-w-6xl" : "max-w-5xl"
    } mx-auto`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] to-[#0d1117]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
            Interactive Scaling Law Visualization
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              autoPlay
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "bg-gray-800 text-gray-500 border border-gray-700"
            }`}
          >
            {autoPlay ? "AUTO" : "MANUAL"}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-gray-300 transition-colors"
          >
            {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main visualization area */}
      <div className={`relative ${expanded ? "h-[500px]" : "h-[380px]"} transition-all duration-500`}>
        {/* Particle fields for each scale */}
        {SCALES.map((scale, i) => (
          <ParticleField
            key={scale.id}
            color={scale.particleColor}
            glowColor={scale.glowColor}
            active={i === activeIndex}
          />
        ))}

        {/* Central content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScale.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 border-2`}
                style={{
                  borderColor: activeScale.particleColor + "40",
                  backgroundColor: activeScale.particleColor + "15",
                  boxShadow: `0 0 40px ${activeScale.glowColor}`,
                }}
              >
                <Icon className={`w-10 h-10 ${activeScale.color}`} />
              </div>

              {/* Name */}
              <h3 className={`font-heading font-bold text-2xl md:text-3xl ${activeScale.color} mb-2`}>
                {activeScale.name}
              </h3>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
                {activeScale.description}
              </p>

              {/* Data grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
                <div className="bg-black/40 rounded-lg px-3 py-2 border border-gray-800">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Size</div>
                  <div className="text-sm text-white font-mono">{activeScale.sizeLabel}</div>
                </div>
                <div className="bg-black/40 rounded-lg px-3 py-2 border border-gray-800">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Energy</div>
                  <div className="text-sm text-white font-mono">{activeScale.energyLabel}</div>
                </div>
                <div className="bg-black/40 rounded-lg px-3 py-2 border border-gray-800">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Inherited From</div>
                  <div className="text-xs text-white">{activeScale.inheritedFrom}</div>
                </div>
                <div className="bg-black/40 rounded-lg px-3 py-2 border border-gray-800">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Persistence</div>
                  <div className="text-xs text-white">{activeScale.persistenceTime}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scale selector dots */}
      <div className="relative z-10 flex items-center justify-center gap-3 py-3 border-t border-gray-800/50">
        {SCALES.map((scale, i) => {
          const ScaleIcon = scale.icon;
          return (
            <button
              key={scale.id}
              onClick={() => {
                setAutoPlay(false);
                setActiveIndex(i);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-mono ${
                i === activeIndex
                  ? `border ${scale.color}`
                  : "text-gray-500 hover:text-gray-300"
              }`}
              style={i === activeIndex ? {
                borderColor: scale.particleColor + "40",
                backgroundColor: scale.particleColor + "15",
              } : {}}
            >
              <ScaleIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{scale.name}</span>
            </button>
          );
        })}
      </div>

      {/* Scale bar */}
      <div className="relative z-10 px-6 pb-4">
        <ScaleBar activeIndex={activeIndex} />
      </div>

      {/* Universal pattern callout */}
      <div className="relative z-10 mx-6 mb-6 bg-gradient-to-r from-cyan-950/20 via-slate-900/30 to-cyan-950/20 rounded-lg p-4 border border-cyan-500/10 text-center">
        <p className="font-mono text-xs text-cyan-400">
          UNIVERSAL PATTERN: Energy reservoir <span className="text-white font-bold">inherited from formation</span> → persists after event → powers processes never self-generated
        </p>
      </div>
    </div>
  );
}
