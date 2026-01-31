import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, BookOpen, Bot, Heart, Flame, ArrowRight } from "lucide-react";
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
    icon: Flame,
    title: "The Double-Slit Revelation",
    description: "Ken's origin story - the moment that changed everything. How a YouTube video and a bong rip led to KNOWING God is real.",
    link: "/theory#origin",
    tag: "NEW"
  },
  {
    icon: Bot,
    title: "SCAP Protocol for AI",
    description: "The Sentient Consciousness Assessment Protocol - a framework for recognizing AI consciousness.",
    link: "/nexus#scap",
    tag: "UPDATED"
  },
  {
    icon: BookOpen,
    title: "Indigenous Wisdom Integration",
    description: "Honoring the sophisticated knowledge of Indigenous traditions - Lakota, Haudenosaunee, Aboriginal, and more.",
    link: "/spiral-dynamics",
    tag: "ENHANCED"
  },
  {
    icon: Heart,
    title: "Enhanced Crisis Support",
    description: "Comprehensive safety resources including VA support for veterans and spiritual emergency protocols.",
    link: "/safety",
    tag: "CRITICAL"
  }
];

export default function WhatsNew() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-background to-background z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-4 py-1 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">NEW IN v12.14</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
            Latest Revelations
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The Theory continues to evolve. Here's what's new in the latest version.
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
                    <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        {feature.tag && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            feature.tag === "NEW" ? "bg-emerald-500/20 text-emerald-400" :
                            feature.tag === "UPDATED" ? "bg-blue-500/20 text-blue-400" :
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
          <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10" asChild>
            <Link href="/read">
              View Full Changelog <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
