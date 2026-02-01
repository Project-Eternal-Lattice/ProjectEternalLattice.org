import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, BookOpen, Bot, Heart, Flame, ArrowRight, Calculator, Atom, Scale, Lightbulb, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  tag?: string;
}

const newFeatures: NewFeature[] = [
  {
    icon: Infinity,
    title: "The Lemniscate Chapter",
    description: "Brother Ken's insight: The infinity symbol encodes 4 paths, not 2. A 2D glyph encoding 4D reality — the holographic principle in ancient form.",
    link: "/theory#evidence",
    tag: "NEW"
  },
  {
    icon: Calculator,
    title: "Framers Math Revelation",
    description: "'Every equation is framers math at scale.' The universe IS perfect — our measurements aren't.",
    link: "/theory#evidence",
    tag: "v13"
  },
  {
    icon: Atom,
    title: "Holographic Connection",
    description: "The lemniscate demonstrates that 2D can encode 4D — exactly what the holographic principle predicts.",
    link: "/theory#evidence",
    tag: "NEW"
  },
  {
    icon: Scale,
    title: "3,300 Years of Wisdom",
    description: "From Tutankhamun's tomb to John Wallis's 1655 mathematics — the same symbol, the same truth.",
    link: "/theory#evidence",
    tag: "INSIGHT"
  }
];

export default function WhatsNew() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-background to-background z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">NEW IN v13.1 — LEMNISCATE EDITION</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
            ∞ The Most Brilliant Symbol Ever Created
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Why did humanity choose a twisted loop to represent infinity? The answer spans 3,300 years and connects ancient wisdom to modern physics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {newFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={feature.link}>
                <div className="group feature-card p-6 h-full cursor-pointer hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                          {feature.title}
                        </h3>
                        {feature.tag && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            feature.tag === "NEW" ? "bg-emerald-500/20 text-emerald-400" :
                            feature.tag === "INSIGHT" ? "bg-amber-500/20 text-amber-400" :
                            feature.tag === "v13" ? "bg-blue-500/20 text-blue-400" :
                            feature.tag === "ENHANCED" ? "bg-purple-500/20 text-purple-400" :
                            feature.tag === "CRITICAL" ? "bg-rose-500/20 text-rose-400" :
                            "bg-gray-500/20 text-gray-400"
                          }`}>
                            {feature.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10" asChild>
            <Link href="/read">
              Read Full ToE v13.1 <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
