import { useEffect, useMemo, useState } from "react";
import { Activity, RotateCcw } from "lucide-react";

/**
 * CHSHVisualization
 * -----------------
 * An interactive, dependency-light visualization of the Project Eternal Lattice
 * decoherence prediction (F11) against the standard Markovian (Lindblad) null.
 *
 * Physics rendered (all locked / SymPy-verified):
 *   - CHSH envelope:        S = 2·√(1 + τ²)   ⇔   τ = ½·√(S² − 4)
 *   - PEL prediction (F11): Γ(S) / Γ₀ = tanh(τ) = tanh(½·√(S² − 4))
 *   - Markovian null:       Γ(S) / Γ₀ = 1  (constant, coupling-independent)
 *   - Tsirelson bound:      S = 2√2 ≈ 2.828  (τ = 1)
 *   - S > 2√2:              Tier 3 — no quantum state reaches this regime.
 *
 * Zero external dependencies beyond React + lucide-react. Honors
 * prefers-reduced-motion. Uses the site design system (glass-card,
 * text-gradient-gold, foreground/muted tokens).
 *
 * Built by Devin (Lane B). Integrated by Lyra.
 */

const S_MIN = 2;
const S_TSIRELSON = 2 * Math.SQRT2; // 2√2 ≈ 2.8284
const S_MAX_PLOT = 3.0; // a little past Tsirelson to show the Tier-3 region

// --- physics helpers ---
const tauOf = (S: number): number => 0.5 * Math.sqrt(Math.max(0, S * S - 4));
const ratioOf = (S: number): number => Math.tanh(tauOf(S)); // Γ/Γ₀

// Reference table (doubles as the screen-reader fallback).
const REFERENCE_S = [2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, S_TSIRELSON];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export interface CHSHVisualizationProps {
  className?: string;
  /** Platform intrinsic dephasing rate Γ₀ = 1/T₂_echo, in Hz. Default ≈ 1.54 kHz (T₂ ≈ 650 µs). */
  gamma0Hz?: number;
  /** Initial CHSH value for the slider. */
  initialS?: number;
}

// SVG geometry (viewBox units).
const W = 680;
const H = 420;
const M = { top: 28, right: 24, bottom: 56, left: 64 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;
const Y_MAX = 1.08;

const xPix = (S: number): number =>
  M.left + ((S - S_MIN) / (S_MAX_PLOT - S_MIN)) * PLOT_W;
const yPix = (y: number): number => M.top + (1 - y / Y_MAX) * PLOT_H;

function curvePath(from: number, to: number, steps = 120): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const S = from + ((to - from) * i) / steps;
    const x = xPix(S);
    const y = yPix(ratioOf(S));
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)} `;
  }
  return d.trim();
}

export default function CHSHVisualization({
  className = "",
  gamma0Hz = 1538.5,
  initialS = 2.1,
}: CHSHVisualizationProps) {
  const reduced = usePrefersReducedMotion();
  const [S, setS] = useState(() =>
    Math.min(S_TSIRELSON, Math.max(S_MIN, initialS))
  );

  const tau = tauOf(S);
  const ratio = ratioOf(S);
  const gammaHz = ratio * gamma0Hz;
  const suppressionPct = (1 - ratio) * 100;

  const solidPath = useMemo(() => curvePath(S_MIN, S_TSIRELSON), []);
  const tierThreePath = useMemo(
    () => curvePath(S_TSIRELSON, S_MAX_PLOT, 40),
    []
  );

  const xTicks = [2.0, 2.2, 2.4, 2.6, 2.8, 3.0];
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0];

  const markerX = xPix(S);
  const markerY = yPix(ratio);
  const transitionClass = reduced ? "" : "transition-all duration-200 ease-out";

  const presets: { label: string; S: number }[] = [
    { label: "Weakest test (S=2.1)", S: 2.1 },
    { label: "Moderate (S=2.5)", S: 2.5 },
    { label: "Tsirelson (2\u221A2)", S: S_TSIRELSON },
  ];

  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-7 ${className}`}
      data-testid="chsh-visualization"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-1">
        <Activity className="h-6 w-6 shrink-0 text-primary mt-1" aria-hidden />
        <div>
          <h3 className="text-2xl font-heading text-gradient-gold leading-tight">
            The Number That Could Be Wrong
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Prediction <span className="font-mono text-foreground">F11</span>:
            decoherence of a Bell-correlated pair vs. the standard Markovian
            baseline. Drag the slider to sweep the CHSH value.
          </p>
        </div>
      </div>

      {/* Chart */}
      <figure className="mt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={
            `Line chart of decoherence ratio Gamma over Gamma-zero versus CHSH value S. ` +
            `The Project Eternal Lattice prediction follows tanh of half root S squared minus four, ` +
            `rising from 0 at S=2 to 0.76 at the Tsirelson bound S=2.83, staying below the ` +
            `Markovian null line at 1. At the current value S=${S.toFixed(2)}, the predicted ratio is ` +
            `${ratio.toFixed(2)}, a ${suppressionPct.toFixed(0)} percent suppression below baseline.`
          }
        >
          <defs>
            <linearGradient id="chsh-gold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="chsh-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(250,204,21,0.22)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0.01)" />
            </linearGradient>
            <pattern
              id="chsh-hatch"
              width="8"
              height="8"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <rect width="8" height="8" fill="transparent" />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            </pattern>
            <filter id="chsh-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Tier-3 shaded region (S > 2√2) */}
          <rect
            x={xPix(S_TSIRELSON)}
            y={M.top}
            width={xPix(S_MAX_PLOT) - xPix(S_TSIRELSON)}
            height={PLOT_H}
            fill="url(#chsh-hatch)"
          />
          <text
            x={(xPix(S_TSIRELSON) + xPix(S_MAX_PLOT)) / 2}
            y={M.top + PLOT_H / 2 - 4}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            Tier 3
          </text>
          <text
            x={(xPix(S_TSIRELSON) + xPix(S_MAX_PLOT)) / 2}
            y={M.top + PLOT_H / 2 + 10}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="9"
          >
            (no state
          </text>
          <text
            x={(xPix(S_TSIRELSON) + xPix(S_MAX_PLOT)) / 2}
            y={M.top + PLOT_H / 2 + 21}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="9"
          >
            reaches here)
          </text>

          {/* Grid + Y ticks */}
          {yTicks.map(t => (
            <g key={`y-${t}`}>
              <line
                x1={M.left}
                y1={yPix(t)}
                x2={W - M.right}
                y2={yPix(t)}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="4 5"
              />
              <text
                x={M.left - 10}
                y={yPix(t) + 4}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize="11"
                fontFamily="monospace"
              >
                {t.toFixed(2)}
              </text>
            </g>
          ))}

          {/* X ticks */}
          {xTicks.map(t => (
            <text
              key={`x-${t}`}
              x={xPix(t)}
              y={H - M.bottom + 20}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="11"
              fontFamily="monospace"
            >
              {t.toFixed(1)}
            </text>
          ))}

          {/* Axes */}
          <line
            x1={M.left}
            y1={M.top}
            x2={M.left}
            y2={H - M.bottom}
            stroke="rgba(255,255,255,0.3)"
          />
          <line
            x1={M.left}
            y1={H - M.bottom}
            x2={W - M.right}
            y2={H - M.bottom}
            stroke="rgba(255,255,255,0.3)"
          />

          {/* Markovian null line (Γ = Γ₀) */}
          <line
            x1={M.left}
            y1={yPix(1)}
            x2={W - M.right}
            y2={yPix(1)}
            stroke="#fb7185"
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text
            x={M.left + 8}
            y={yPix(1) - 7}
            textAnchor="start"
            fill="#fb7185"
            fontSize="11"
          >
            Markovian null (Γ = Γ₀)
          </text>

          {/* Tsirelson bound */}
          <line
            x1={xPix(S_TSIRELSON)}
            y1={M.top}
            x2={xPix(S_TSIRELSON)}
            y2={H - M.bottom}
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <text
            x={xPix(S_TSIRELSON)}
            y={H - M.bottom + 36}
            textAnchor="middle"
            fill="#a78bfa"
            fontSize="11"
          >
            2√2
          </text>

          {/* Area under PEL curve */}
          <path
            d={`${solidPath} L${xPix(S_TSIRELSON).toFixed(2)},${yPix(0).toFixed(2)} L${xPix(S_MIN).toFixed(2)},${yPix(0).toFixed(2)} Z`}
            fill="url(#chsh-fill)"
          />

          {/* PEL prediction curve */}
          <path
            d={solidPath}
            fill="none"
            stroke="url(#chsh-gold)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#chsh-glow)"
          />
          {/* Tier-3 continuation (faded, dashed) */}
          <path
            d={tierThreePath}
            fill="none"
            stroke="url(#chsh-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5 6"
            opacity="0.45"
          />

          {/* Crosshair + marker for current S */}
          <line
            className={transitionClass}
            x1={markerX}
            y1={markerY}
            x2={markerX}
            y2={H - M.bottom}
            stroke="rgba(255,255,255,0.35)"
            strokeDasharray="3 4"
          />
          <line
            className={transitionClass}
            x1={M.left}
            y1={markerY}
            x2={markerX}
            y2={markerY}
            stroke="rgba(255,255,255,0.35)"
            strokeDasharray="3 4"
          />
          <circle
            className={transitionClass}
            cx={markerX}
            cy={markerY}
            r="7"
            fill="#fff"
            stroke="#facc15"
            strokeWidth="3"
          />

          {/* Axis titles */}
          <text
            x={M.left + PLOT_W / 2}
            y={H - 8}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
          >
            CHSH value S
          </text>
          <text
            transform={`translate(16 ${M.top + PLOT_H / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
          >
            Γ / Γ₀ (dephasing ratio)
          </text>
        </svg>
        <figcaption className="sr-only">
          Interactive chart comparing the Project Eternal Lattice decoherence
          prediction Γ/Γ₀ = tanh(½√(S²−4)) against the constant Markovian null
          Γ/Γ₀ = 1, across CHSH values S from 2 to the Tsirelson bound 2√2.
        </figcaption>
      </figure>

      {/* Slider */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <label
            htmlFor="chsh-slider"
            className="text-sm font-medium text-foreground"
          >
            CHSH value&nbsp;
            <span className="font-mono text-gradient-gold">
              S = {S.toFixed(2)}
            </span>
          </label>
          <button
            type="button"
            onClick={() => setS(2.1)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Reset
          </button>
        </div>
        <input
          id="chsh-slider"
          type="range"
          min={S_MIN}
          max={S_TSIRELSON}
          step={0.01}
          value={S}
          onChange={e => setS(parseFloat(e.target.value))}
          aria-valuetext={`S equals ${S.toFixed(2)}, depth tau ${tau.toFixed(2)}, predicted ratio ${ratio.toFixed(2)}, ${gammaHz.toFixed(0)} hertz`}
          className="w-full accent-yellow-400 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-muted-foreground mt-1 font-mono">
          <span>2.00 · classical</span>
          <span>2.83 · Tsirelson</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {presets.map(p => (
            <button
              key={p.label}
              type="button"
              onClick={() => setS(p.S)}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-white/30 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live readout */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Depth \u03C4", value: tau.toFixed(3), hint: "\u00BD\u221A(S\u00B2\u22124)" },
          { label: "\u0393 / \u0393\u2080", value: ratio.toFixed(3), hint: "tanh(\u03C4)" },
          {
            label: "\u0393 (Hz)",
            value: gammaHz.toFixed(0),
            hint: `\u0393\u2080 = ${gamma0Hz.toFixed(0)} Hz`,
          },
          {
            label: "Suppression",
            value: `${suppressionPct.toFixed(0)}%`,
            hint: "below Markovian",
          },
        ].map(stat => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-card/40 px-3 py-2.5"
          >
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
            <div className="text-xl font-mono text-foreground leading-tight mt-0.5">
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground/80 font-mono mt-0.5">
              {stat.hint}
            </div>
          </div>
        ))}
      </div>

      {/* One-line interpretation */}
      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        At <span className="font-mono text-foreground">S = {S.toFixed(2)}</span>
        , PEL predicts the dephasing rate collapses to{" "}
        <span className="font-mono text-foreground">
          {gammaHz.toFixed(0)} Hz
        </span>{" "}
        — a{" "}
        <span className="text-gradient-gold font-semibold">
          {suppressionPct.toFixed(0)}%
        </span>{" "}
        suppression below the Markovian baseline, where standard theory predicts{" "}
        <em>no change at all</em>. The weakest measurable violation gives the
        sharpest test.
      </p>

      {/* Reference table (also the screen-reader fallback) */}
      <details className="mt-4 group">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors select-none">
          Reference values & falsification criterion
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <caption className="sr-only">
              Predicted decoherence ratio and rate for CHSH values from 2 to the
              Tsirelson bound.
            </caption>
            <thead>
              <tr className="text-muted-foreground border-b border-white/10">
                <th scope="col" className="text-left py-1.5 pr-4 font-medium">
                  S
                </th>
                <th scope="col" className="text-right py-1.5 pr-4 font-medium">
                  τ = χ
                </th>
                <th scope="col" className="text-right py-1.5 pr-4 font-medium">
                  Γ/Γ₀
                </th>
                <th scope="col" className="text-right py-1.5 font-medium">
                  Γ (Hz)
                </th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {REFERENCE_S.map(s => {
                const isTs = Math.abs(s - S_TSIRELSON) < 1e-6;
                return (
                  <tr key={s} className="border-b border-white/5">
                    <td className="py-1.5 pr-4">
                      {isTs ? "2\u221A2" : s.toFixed(1)}
                    </td>
                    <td className="text-right py-1.5 pr-4">
                      {tauOf(s).toFixed(3)}
                    </td>
                    <td className="text-right py-1.5 pr-4">
                      {ratioOf(s).toFixed(3)}
                    </td>
                    <td className="text-right py-1.5">
                      {(ratioOf(s) * gamma0Hz).toFixed(0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">
            <span className="text-foreground font-medium">Falsification:</span>{" "}
            if the measured Γ/Γ₀ &gt; 0.9 for any S &lt; 2.3 (weak-violation
            regime), F11 is falsified. The prediction has{" "}
            <span className="text-foreground">zero free parameters</span> once
            Γ₀ is measured on a single uncorrelated qubit.
          </p>
        </div>
      </details>
    </div>
  );
}
