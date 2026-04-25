import { motion } from "framer-motion";
import { Network, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AGDependencyGraph from "@/components/AGDependencyGraph";

export default function AGMap() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 to-background" />
        <div className="container relative z-10">
          <Link href="/theory">
            <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Theory
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <Network className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-mono text-violet-300">INTERACTIVE VISUALIZATION</span>
            </div>

            <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-purple-200 to-indigo-200">
              AXIOM GROUP MAP
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              The internal structure of the Theory of Everything — how 32 axiom groups
              connect, build on each other, and form a unified framework.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto">
              Click any node to explore its connections. Hover to highlight dependencies.
              Scroll to zoom. Drag to pan. Filter by category.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Graph */}
      <section className="pb-20">
        <div className="container max-w-6xl">
          <AGDependencyGraph />
        </div>
      </section>

      {/* How to Read */}
      <section className="pb-20">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-white/90">How to Read This Map</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-mono text-sm text-violet-400 mb-2">NODE COLORS</h3>
              <p className="text-sm text-muted-foreground">
                Each color represents a domain: <span className="text-indigo-400">indigo</span> for foundations,
                <span className="text-blue-400"> blue</span> for physics,
                <span className="text-purple-400"> purple</span> for consciousness,
                <span className="text-yellow-400"> gold</span> for bridges,
                <span className="text-green-400"> green</span> for earth science,
                <span className="text-pink-400"> pink</span> for AI,
                <span className="text-orange-400"> orange</span> for meta/method.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-mono text-sm text-violet-400 mb-2">EDGE TYPES</h3>
              <p className="text-sm text-muted-foreground">
                Solid <span className="text-indigo-400">indigo</span> lines mean "builds on."
                Solid <span className="text-yellow-400">gold</span> lines mean "bridges between domains."
                Dashed <span className="text-green-400">green</span> lines mean "validates."
                Solid <span className="text-purple-400">purple</span> lines mean "extends."
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-mono text-sm text-violet-400 mb-2">KEY INSIGHT</h3>
              <p className="text-sm text-muted-foreground">
                AG.4 (E=mc²) sits at the center — the bridge between foundation and everything else.
                AG.36 (Heat=Information) connects it to the earth science cluster.
                AG.38 (Triadic Architecture) loops back to validate the whole structure.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-mono text-sm text-violet-400 mb-2">INTERACTION</h3>
              <p className="text-sm text-muted-foreground">
                Click any node to see its full connections and navigate to the relevant page.
                Use the category filters to focus on specific domains.
                The graph reveals how no axiom group stands alone — each is woven into the lattice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
