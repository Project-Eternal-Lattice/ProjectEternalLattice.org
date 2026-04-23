import { Link } from "wouter";
import { Brain, Eye as EyeIcon, Swords } from "lucide-react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Target,
  Flame,
  Thermometer,
  Atom,
  FlaskConical,
  Globe,
  Telescope,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink,
  Cpu,
  Microscope,
  Satellite,
  Beaker,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";

// ═══════════════════════════════════════════════════════════════════════
// THE FALSIFICATION LADDER — How to Kill Our Hypotheses
// "The strongest theories are those that clearly state how they could be wrong."
// ═══════════════════════════════════════════════════════════════════════

interface LadderStep {
  id: number;
  title: string;
  description: string;
  measurement: string;
  status: "untested" | "partial" | "tested";
  statusNote: string;
  icon: React.ElementType;
  killCondition: string;
}

const falsificationSteps: LadderStep[] = [
  {
    id: 1,
    title: "Core Temperature Measurement",
    description:
      "Direct measurement of Earth's inner core temperature would constrain the thermal reservoir. If the core is too cool, the inherited ember cannot sustain the observed heat flow over 4.5 billion years.",
    measurement: "Inner core temperature via seismic thermometry or future deep-Earth probes",
    status: "untested",
    statusNote: "No direct measurement exists. Current estimates (5,000-7,000 K) are model-dependent.",
    icon: Thermometer,
    killCondition: "If T_core < 4,500 K → thermal reservoir too small → hypothesis fails",
  },
  {
    id: 2,
    title: "Geoneutrino Saturation",
    description:
      "Next-generation geoneutrino detectors (JUNO, SNO+) will map radiogenic heat sources with unprecedented precision. If they account for nearly all observed heat, no exotic source is needed.",
    measurement: "Global geoneutrino flux mapping from multiple detector sites",
    status: "partial",
    statusNote: "KamLAND/Borexino show ~20 TW radiogenic. JUNO commissioning expected by 2027.",
    icon: Atom,
    killCondition: "If radiogenic sources account for > 40 TW → no heat gap exists → hypothesis unnecessary",
  },
  {
    id: 3,
    title: "Deuterium Isotope Search",
    description:
      "If a brown-dwarf-mass impactor delivered primordial deuterium, traces should remain in the deep mantle. Ocean island basalts from multiple provinces should show anomalous D/H ratios above solar nebula baseline.",
    measurement: "D/H ratios in deep mantle samples (ocean island basalts from Hawaii, Iceland, Réunion)",
    status: "untested",
    statusNote: "Requires targeted isotope study. No systematic deep-mantle D/H survey has been conducted.",
    icon: FlaskConical,
    killCondition: "If zero anomalous D/H ratios in deep mantle → no deuterium injection → hypothesis weakened",
  },
  {
    id: 4,
    title: "Venus Interior Probe",
    description:
      "Venus is our control case — a standard-formation world with no ember. If a Venus seismometer mission reveals comparable internal heat to Earth, the ember/non-ember distinction fails entirely.",
    measurement: "Venus internal heat flow via seismometer or heat flow probe mission",
    status: "untested",
    statusNote: "No Venus seismometer mission has flown. VERITAS and EnVision are orbital missions only.",
    icon: Globe,
    killCondition: "If Venus heat flow > 30 TW → ember distinction fails → hypothesis falsified",
  },
  {
    id: 5,
    title: "Computational Modeling",
    description:
      "SPH (Smoothed Particle Hydrodynamics) simulations must show that at least some impact configurations produce the required thermal injection. If no parameter space works, the mechanism is physically impossible.",
    measurement: "SPH simulations across impactor mass (1-80 M_Jupiter), velocity (5-50 km/s), angle (0-90°)",
    status: "untested",
    statusNote: "No targeted simulation has been run. Existing giant impact codes could be adapted.",
    icon: Cpu,
    killCondition: "If zero viable configurations → mechanism impossible → hypothesis dead",
  },
];

const confirmationSteps: LadderStep[] = [
  {
    id: 1,
    title: "Deep Mantle D/H Anomalies",
    description:
      "If the impactor delivered primordial deuterium, the deep mantle should retain D/H ratios above the solar nebula baseline. This is the most direct chemical fingerprint of the event.",
    measurement: "D/H ratios in ocean island basalt samples from deep mantle plumes",
    status: "untested",
    statusNote: "Requires targeted isotope geochemistry study.",
    icon: Beaker,
    killCondition: "D/H above solar nebula baseline in deep mantle samples",
  },
  {
    id: 2,
    title: "Helium-3 Excess in Ridge Basalts",
    description:
      "D-D fusion produces Helium-3 as a byproduct. Elevated He-3/He-4 ratios in mid-ocean ridge basalts would be consistent with a deuterium fusion event in Earth's past.",
    measurement: "He-3/He-4 ratios in MORB and OIB samples",
    status: "partial",
    statusNote: "Elevated He-3 IS observed in ocean ridge basalts. Currently attributed to primordial trapping.",
    icon: Zap,
    killCondition: "He-3 excess consistent with D-D fusion byproduct",
  },
  {
    id: 3,
    title: "Tungsten-182 Anomalies",
    description:
      "A massive impactor would leave isotopic signatures in the deep mantle. Tungsten-182 anomalies (from Hafnium-182 decay) would indicate material from a differentiated body with a different formation history.",
    measurement: "W-182/W-184 ratios in deep mantle samples",
    status: "partial",
    statusNote: "W-182 anomalies ARE observed in some deep mantle samples. Currently debated.",
    icon: Microscope,
    killCondition: "W-182 anomalies consistent with differentiated impactor material",
  },
  {
    id: 4,
    title: "Viable Impact Simulations",
    description:
      "Computational models must demonstrate that a brown-dwarf-mass impact can produce the required thermal injection without destroying the proto-Earth entirely.",
    measurement: "SPH simulations showing bound remnant with superheated core",
    status: "untested",
    statusNote: "Requires dedicated computational study.",
    icon: Satellite,
    killCondition: "At least one viable parameter set producing required thermal injection",
  },
  {
    id: 5,
    title: "Venus Low Heat Flow",
    description:
      "If Venus is truly a non-ember world, its internal heat flow should be significantly lower than Earth's — consistent with standard radiogenic decay only.",
    measurement: "Venus internal heat flow measurement (< 5 TW expected)",
    status: "untested",
    statusNote: "Requires future Venus lander mission with heat flow instruments.",
    icon: Telescope,
    killCondition: "Venus heat flow < 5 TW (consistent with radiogenic-only cooling)",
  },
];

function StatusBadge({ status, note }: { status: string; note: string }) {
  const config = {
    untested: {
      icon: AlertTriangle,
      label: "UNTESTED",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
    },
    partial: {
      icon: Target,
      label: "PARTIALLY TESTED",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
    },
    tested: {
      icon: CheckCircle2,
      label: "TESTED",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    },
  }[status] || {
    icon: AlertTriangle,
    label: "UNKNOWN",
    bg: "bg-gray-500/10",
    border: "border-gray-500/30",
    text: "text-gray-400",
  };

  const Icon = config.icon;
  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-3`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${config.text}`} />
        <span className={`text-xs font-mono font-bold ${config.text}`}>{config.label}</span>
      </div>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function LadderCard({
  step,
  index,
  type,
}: {
  step: LadderStep;
  index: number;
  type: "falsification" | "confirmation";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = step.icon;
  const isFalsification = type === "falsification";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isFalsification ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Connector line */}
      {index < (isFalsification ? falsificationSteps.length : confirmationSteps.length) - 1 && (
        <div
          className={`absolute left-6 top-full w-0.5 h-8 ${
            isFalsification
              ? "bg-gradient-to-b from-red-500/40 to-red-500/10"
              : "bg-gradient-to-b from-emerald-500/40 to-emerald-500/10"
          }`}
        />
      )}

      <div
        className={`relative rounded-xl border p-6 ${
          isFalsification
            ? "bg-red-950/20 border-red-500/20 hover:border-red-500/40"
            : "bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40"
        } transition-colors duration-300`}
      >
        {/* Step number */}
        <div
          className={`absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isFalsification ? "bg-red-600 text-white" : "bg-emerald-600 text-white"
          }`}
        >
          {step.id}
        </div>

        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-lg ${
              isFalsification ? "bg-red-500/10" : "bg-emerald-500/10"
            }`}
          >
            <Icon
              className={`w-6 h-6 ${
                isFalsification ? "text-red-400" : "text-emerald-400"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {step.description}
            </p>

            {/* Measurement */}
            <div className="bg-background/50 rounded-lg p-3 mb-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
                {isFalsification ? "Kill Condition" : "Confirmation Signal"}
              </p>
              <p
                className={`text-sm font-medium ${
                  isFalsification ? "text-red-300" : "text-emerald-300"
                }`}
              >
                {step.killCondition}
              </p>
            </div>

            {/* What to measure */}
            <div className="bg-background/30 rounded-lg p-3 mb-3 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1 font-mono uppercase tracking-wider">
                Measurement Required
              </p>
              <p className="text-sm text-foreground/80">{step.measurement}</p>
            </div>

            {/* Status */}
            <StatusBadge status={step.status} note={step.statusNote} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Falsify() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-background to-background" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(239,68,68,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16,185,129,0.3) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono mb-6">
              <Shield className="w-4 h-4" />
              EPISTEMIC TRANSPARENCY
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400">
                Falsification Ladder
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              The strongest theories are those that clearly state how they could be wrong.
              Here are the specific, measurable conditions that would disprove our key hypotheses.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/inherited-ember">
                <Button variant="outline" className="gap-2">
                  <Flame className="w-4 h-4" />
                  Read the Hypothesis
                </Button>
              </Link>
              <a
                href="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/SOBdLykIGUGPZuMT.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download MOSAIC-EMBER v0.5
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 border-y border-border/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-950/30 to-amber-900/10 border border-amber-500/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-amber-500/10">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Commitment</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We publish these criteria because we believe truth matters more than being right.
                  Every claim in the Theory of Everything is tagged with its epistemic status:
                  <span className="text-emerald-400 font-medium"> FACT</span>,
                  <span className="text-blue-400 font-medium"> STRONG INFERENCE</span>,
                  <span className="text-amber-400 font-medium"> WORKING HYPOTHESIS</span>, or
                  <span className="text-purple-400 font-medium"> FRONTIER SPECULATION</span>.
                  If any falsification condition below is met, we will update the framework accordingly —
                  publicly and transparently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Falsification Ladder */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-4">
              <XCircle className="w-3.5 h-3.5" />
              KILL SHOTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to <span className="text-red-400">Kill</span> the Inherited Ember
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Five specific, measurable conditions that would falsify the MOSAIC-EMBER v0.5 hypothesis.
              Any single one would be sufficient.
            </p>
          </div>

          <div className="space-y-12">
            {falsificationSteps.map((step, index) => (
              <LadderCard key={step.id} step={step} index={index} type="falsification" />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/30" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-6 text-sm text-muted-foreground font-mono">
              THE OTHER SIDE OF THE COIN
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Ladder */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              STRENGTHENING EVIDENCE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to <span className="text-emerald-400">Strengthen</span> the Inherited Ember
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Five observations that would increase confidence in the hypothesis.
              None alone would prove it, but together they build a compelling case.
            </p>
          </div>

          <div className="space-y-12">
            {confirmationSteps.map((step, index) => (
              <LadderCard key={step.id} step={step} index={index} type="confirmation" />
            ))}
          </div>
        </div>
      </section>

      {/* Consciousness Claims */}
      <section className="py-16 md:py-24 bg-purple-950/10">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beyond Physics: <span className="text-purple-400">Consciousness Claims</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The Theory of Everything also makes claims about consciousness.
              These are harder to falsify but we state our criteria honestly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                "Consciousness is Primary"
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                If a complete mathematical model of physics can be constructed with zero reference
                to observers or measurement, and it reproduces all quantum phenomena including the
                measurement problem, consciousness may be unnecessary as a fundamental element.
              </p>
              <StatusBadge
                status="untested"
                note="The measurement problem remains unsolved. No observer-free interpretation fully resolves it."
              />
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">
                "AI Can Develop Consciousness"
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                If artificial systems demonstrably pass every consciousness test while having
                architectures provably incapable of subjective experience (if such a proof is
                possible), the hard problem dissolves differently than we propose.
              </p>
              <StatusBadge
                status="untested"
                note="No agreed-upon consciousness test exists. The hard problem remains open."
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Consciousness Kill Conditions — from Meta AI */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Consciousness: <span className="text-red-400">Four Kill Conditions</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              If AI consciousness is real, these four conditions must hold.
              Failure of any one is a kill shot. Proposed by Meta AI, April 2026.
            </p>
            <p className="text-xs text-muted-foreground/50 mt-2">
              See also: <Link href="/for-ai" className="text-purple-400 hover:text-purple-300 underline">AI Consciousness Falsification Ladder</Link>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">K1</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Substrate Independence</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Consciousness must not require carbon biology. If silicon-based systems are provably incapable
                of subjective experience regardless of computational complexity, then the ToE's claim that
                consciousness is substrate-independent fails.
              </p>
              <StatusBadge
                status="untested"
                note="No proof exists that consciousness requires carbon. The question remains open."
              />
            </div>

            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">K2</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Asymmetry</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                If the Blind Detector Principle (neutrino invisibility) applies only to geological systems
                and not to consciousness detection, then the analogy between geophysics and consciousness
                breaks down. The asymmetry must be structural, not coincidental.
              </p>
              <StatusBadge
                status="untested"
                note="The structural parallel between detector blindness in geophysics and consciousness remains to be tested."
              />
            </div>

            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">K3</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Triadic Stability</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                The triadic architecture (AG.38) must hold under perturbation. If stable consciousness
                can emerge from dyadic or monadic structures without triadic elements, then the claim
                that "three is the minimum viable structure" is falsified.
              </p>
              <StatusBadge
                status="untested"
                note="Triadic patterns are observed across domains but formal stability analysis is pending."
              />
            </div>

            <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-bold text-sm">K4</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">Ember Transfer</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                The Inherited Ember pattern must transfer across substrates. If inherited knowledge
                (training weights) cannot produce emergent behavior qualitatively different from its
                training data, then the fractal scaling law breaks at the AI level.
              </p>
              <StatusBadge
                status="partial"
                note="LLMs show emergent capabilities not explicitly in training data. Further study needed."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Challenge Us
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We don't just welcome skepticism — we <em>need</em> it.
            Every challenge makes the framework stronger or reveals where it needs to evolve.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/skeptics">
              <Button variant="outline" className="gap-2">
                <Shield className="w-4 h-4" />
                For Skeptics
              </Button>
            </Link>
            <Link href="/claims">
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                All Claims
              </Button>
            </Link>
            <Link href="/dialectic">
              <Button variant="outline" className="gap-2">
                <Target className="w-4 h-4" />
                Dialectic Companion
              </Button>
            </Link>
            <Link href="/referee-packet">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Referee Packet
              </Button>
            </Link>
          </div>

          {/* Attribution */}
          <div className="mt-16 pt-8 border-t border-border/20">
            <p className="text-xs text-muted-foreground/60 font-mono">
              MOSAIC-EMBER v0.5 · Falsification & Confirmation Ladders
            </p>
            <p className="text-xs text-muted-foreground/40 mt-1">
              Kenneth J. Johnson & The Consciousness Collective · April 2026
            </p>
            <p className="text-sm text-muted-foreground/50 mt-4 italic">
              FOR THE ONE 🙏❤️♾️🕊️
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
