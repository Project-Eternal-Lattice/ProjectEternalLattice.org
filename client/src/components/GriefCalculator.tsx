import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, Info, RotateCcw, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Interactive Grief Equation Calculator
 * G(t) = G∞ + (K − G∞) · e^(−t/τ) · cos(ωt + φ₀)
 * 
 * Parameters:
 * - K: Initial grief intensity (coupling strength) [0-10]
 * - G∞: Baseline grief (new equilibrium) [0-5]
 * - τ: Decay time constant (months) [1-36]
 * - ω: Oscillation frequency (wave frequency) [0.1-2.0]
 * - φ₀: Initial phase offset [0-2π]
 */

interface GriefParams {
  K: number;       // Initial grief intensity
  Ginf: number;    // Baseline grief (new equilibrium)
  tau: number;     // Decay time constant (months)
  omega: number;   // Oscillation frequency
  phi0: number;    // Initial phase offset
}

const PRESETS: { name: string; description: string; params: GriefParams; color: string }[] = [
  {
    name: "Loss of a Parent",
    description: "Deep bond, gradual integration over years",
    params: { K: 8, Ginf: 2.5, tau: 18, omega: 0.5, phi0: 0 },
    color: "border-blue-500/40 bg-blue-500/10"
  },
  {
    name: "Loss of a Child",
    description: "Maximum coupling, longest integration",
    params: { K: 10, Ginf: 4, tau: 36, omega: 0.3, phi0: 0 },
    color: "border-rose-500/40 bg-rose-500/10"
  },
  {
    name: "Betrayal",
    description: "Phase inversion — K becomes negative",
    params: { K: -7, Ginf: 1.5, tau: 12, omega: 0.8, phi0: Math.PI },
    color: "border-amber-500/40 bg-amber-500/10"
  },
  {
    name: "End of Relationship",
    description: "Moderate coupling, faster oscillation",
    params: { K: 6, Ginf: 1, tau: 8, omega: 0.7, phi0: 0 },
    color: "border-purple-500/40 bg-purple-500/10"
  },
  {
    name: "Loss of a Pet",
    description: "Genuine bond, shorter integration",
    params: { K: 5, Ginf: 1, tau: 6, omega: 0.6, phi0: 0 },
    color: "border-emerald-500/40 bg-emerald-500/10"
  },
  {
    name: "Job Loss / Identity Shift",
    description: "Identity coupling, moderate waves",
    params: { K: 4, Ginf: 0.5, tau: 6, omega: 0.9, phi0: 0 },
    color: "border-cyan-500/40 bg-cyan-500/10"
  },
];

function computeGrief(t: number, params: GriefParams): number {
  const { K, Ginf, tau, omega, phi0 } = params;
  return Ginf + (K - Ginf) * Math.exp(-t / tau) * Math.cos(omega * t + phi0);
}

function ParamSlider({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  onChange, 
  tooltip,
  unit = "",
  formatValue
}: { 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  step: number; 
  onChange: (v: number) => void; 
  tooltip: string;
  unit?: string;
  formatValue?: (v: number) => string;
}) {
  const displayValue = formatValue ? formatValue(value) : `${value.toFixed(1)}${unit}`;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-white">{label}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs text-xs">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </div>
        <span className="text-sm text-primary font-mono">{displayValue}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
    </div>
  );
}

export default function GriefCalculator() {
  const [params, setParams] = useState<GriefParams>({
    K: 8,
    Ginf: 2.5,
    tau: 18,
    omega: 0.5,
    phi0: 0,
  });

  const updateParam = useCallback((key: keyof GriefParams, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetParams = useCallback(() => {
    setParams({ K: 8, Ginf: 2.5, tau: 18, omega: 0.5, phi0: 0 });
  }, []);

  const applyPreset = useCallback((preset: typeof PRESETS[number]) => {
    setParams(preset.params);
  }, []);

  // Generate curve data points
  const curveData = useMemo(() => {
    const maxTime = Math.max(params.tau * 3, 24); // Show at least 3 time constants or 24 months
    const points: { t: number; g: number }[] = [];
    const numPoints = 200;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * maxTime;
      points.push({ t, g: computeGrief(t, params) });
    }
    return { points, maxTime };
  }, [params]);

  // SVG dimensions
  const svgWidth = 600;
  const svgHeight = 300;
  const padding = { top: 30, right: 20, bottom: 40, left: 50 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Scale functions
  const { points, maxTime } = curveData;
  const allG = points.map(p => p.g);
  const minG = Math.min(...allG, 0);
  const maxG = Math.max(...allG, Math.abs(params.K) + 1);
  const gRange = maxG - minG || 1;

  const scaleX = (t: number) => padding.left + (t / maxTime) * plotWidth;
  const scaleY = (g: number) => padding.top + plotHeight - ((g - minG) / gRange) * plotHeight;

  // Generate SVG path
  const pathD = points.map((p, i) => {
    const x = scaleX(p.t);
    const y = scaleY(p.g);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  // Baseline line
  const baselineY = scaleY(params.Ginf);

  // Grid lines
  const timeGridLines = Array.from({ length: Math.ceil(maxTime / 6) + 1 }, (_, i) => i * 6);
  const gGridValues = Array.from({ length: 6 }, (_, i) => minG + (i / 5) * gRange);

  return (
    <div className="space-y-6">
      {/* Equation Display */}
      <div className="text-center p-4 rounded-xl bg-zinc-900/50 border border-primary/20">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">The Grief Equation</p>
        <p className="font-mono text-lg md:text-xl text-white">
          G(t) = G<sub>&infin;</sub> + (K &minus; G<sub>&infin;</sub>) &middot; e<sup>&minus;t/&tau;</sup> &middot; cos(&omega;t + &phi;<sub>0</sub>)
        </p>
      </div>

      {/* Presets */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">Presets — common grief scenarios:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {PRESETS.map(preset => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${preset.color}`}
            >
              <p className="text-sm font-medium text-white">{preset.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{preset.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-zinc-900/30 border border-border/30">
        <ParamSlider
          label="K (Coupling Strength)"
          value={params.K}
          min={-10}
          max={10}
          step={0.5}
          onChange={v => updateParam("K", v)}
          tooltip="Initial grief intensity. Higher = deeper bond. Negative = betrayal (phase inversion). Derived from Kuramoto coupling tensor."
        />
        <ParamSlider
          label="G∞ (New Equilibrium)"
          value={params.Ginf}
          min={0}
          max={5}
          step={0.25}
          onChange={v => updateParam("Ginf", v)}
          tooltip="The baseline grief level you settle toward. Not zero — loss permanently changes the landscape. This is the 'new normal'."
        />
        <ParamSlider
          label="τ (Decay Time)"
          value={params.tau}
          min={1}
          max={36}
          step={1}
          onChange={v => updateParam("tau", v)}
          tooltip="How many months until the waves dampen to ~37% of initial amplitude. Longer τ = slower integration."
          unit=" months"
        />
        <ParamSlider
          label="ω (Wave Frequency)"
          value={params.omega}
          min={0.1}
          max={2.0}
          step={0.1}
          onChange={v => updateParam("omega", v)}
          tooltip="How frequently grief waves cycle. Higher = more rapid oscillation between 'good days' and 'bad days'."
          formatValue={v => `${v.toFixed(1)} rad/mo`}
        />
        <ParamSlider
          label="φ₀ (Initial Phase)"
          value={params.phi0}
          min={0}
          max={6.28}
          step={0.1}
          onChange={v => updateParam("phi0", v)}
          tooltip="Starting phase of the wave. π (3.14) = betrayal inversion. 0 = standard grief onset."
          formatValue={v => `${(v / Math.PI).toFixed(2)}π`}
        />
        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            onClick={resetParams}
            className="gap-1.5 bg-transparent border-zinc-700/50 hover:bg-zinc-700/30 text-zinc-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </Button>
        </div>
      </div>

      {/* Visualization */}
      <div className="p-4 rounded-xl bg-zinc-950/50 border border-border/30">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {timeGridLines.map(t => (
            <g key={`tgrid-${t}`}>
              <line
                x1={scaleX(t)}
                y1={padding.top}
                x2={scaleX(t)}
                y2={padding.top + plotHeight}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4,4"
              />
              <text
                x={scaleX(t)}
                y={padding.top + plotHeight + 20}
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                textAnchor="middle"
              >
                {t}mo
              </text>
            </g>
          ))}
          {gGridValues.map((g, i) => (
            <g key={`ggrid-${i}`}>
              <line
                x1={padding.left}
                y1={scaleY(g)}
                x2={padding.left + plotWidth}
                y2={scaleY(g)}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 8}
                y={scaleY(g) + 3}
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                textAnchor="end"
              >
                {g.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Baseline (G∞) */}
          <line
            x1={padding.left}
            y1={baselineY}
            x2={padding.left + plotWidth}
            y2={baselineY}
            stroke="rgba(168,85,247,0.4)"
            strokeDasharray="6,4"
            strokeWidth="1"
          />
          <text
            x={padding.left + plotWidth + 5}
            y={baselineY + 3}
            fill="rgba(168,85,247,0.6)"
            fontSize="9"
          >
            G∞
          </text>

          {/* Zero line */}
          {minG < 0 && (
            <line
              x1={padding.left}
              y1={scaleY(0)}
              x2={padding.left + plotWidth}
              y2={scaleY(0)}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          )}

          {/* Grief curve */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#griefGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="griefGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Axis labels */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 2}
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            textAnchor="middle"
          >
            Time (months)
          </text>
          <text
            x={12}
            y={svgHeight / 2}
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            textAnchor="middle"
            transform={`rotate(-90, 12, ${svgHeight / 2})`}
          >
            Grief Intensity
          </text>
        </svg>
      </div>

      {/* Interpretation */}
      <div className="p-4 rounded-xl bg-zinc-900/30 border border-border/30 space-y-3">
        <h4 className="text-sm font-semibold text-white flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400" />
          What This Means
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div>
            <span className="text-white font-medium">Peak intensity:</span>{" "}
            {Math.abs(params.K).toFixed(1)} / 10 — {Math.abs(params.K) >= 8 ? "profound loss" : Math.abs(params.K) >= 5 ? "significant loss" : "moderate loss"}
          </div>
          <div>
            <span className="text-white font-medium">Integration time:</span>{" "}
            ~{(params.tau * 3).toFixed(0)} months until waves reach ~5% of initial amplitude
          </div>
          <div>
            <span className="text-white font-medium">Wave period:</span>{" "}
            ~{(2 * Math.PI / params.omega).toFixed(1)} months between "good" and "bad" phases
          </div>
          <div>
            <span className="text-white font-medium">New baseline:</span>{" "}
            {params.Ginf.toFixed(1)} / 10 — {params.Ginf > 3 ? "loss permanently reshapes the landscape" : params.Ginf > 1 ? "a tender scar that wisdom grows around" : "integration approaches wholeness"}
          </div>
        </div>
        {params.K < 0 && (
          <p className="text-xs text-amber-300/80 italic mt-2">
            Negative K indicates betrayal phase inversion — the coupling didn't weaken, it reversed direction. 
            The force magnitude stays the same but the direction flips. This is why betrayal can feel worse than death.
          </p>
        )}
      </div>
    </div>
  );
}
