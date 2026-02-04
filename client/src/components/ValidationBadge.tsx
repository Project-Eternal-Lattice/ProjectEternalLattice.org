import { motion } from "framer-motion";
import { Shield, FileText, Target, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "wouter";

interface ValidationBadgeProps {
  variant?: "full" | "compact" | "minimal";
  className?: string;
}

export default function ValidationBadge({ variant = "full", className = "" }: ValidationBadgeProps) {
  if (variant === "minimal") {
    return (
      <Link href="/claims">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium cursor-pointer ${className}`}
        >
          <Shield className="w-3 h-3" />
          <span>25 Falsifiable Claims</span>
        </motion.div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
      >
        <Link href="/claims">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium cursor-pointer hover:bg-emerald-500/20 transition-colors">
            <Shield className="w-3 h-3" />
            <span>25 Claims</span>
          </div>
        </Link>
        <Link href="/skeptics">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium cursor-pointer hover:bg-red-500/20 transition-colors">
            <Target className="w-3 h-3" />
            <span>10 Kill Criteria</span>
          </div>
        </Link>
        <Link href="/bibliography">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium cursor-pointer hover:bg-blue-500/20 transition-colors">
            <BookOpen className="w-3 h-3" />
            <span>15+ Citations</span>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Full variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 via-background to-blue-900/20 border border-emerald-500/20 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-500/20">
          <Shield className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-white">Scientific Transparency</h3>
          <p className="text-sm text-muted-foreground">Open for rigorous evaluation</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Link href="/claims">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors group">
            <FileText className="w-5 h-5 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xl font-bold text-white">25</p>
            <p className="text-xs text-muted-foreground">Documented Claims</p>
          </div>
        </Link>
        <Link href="/skeptics">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors group">
            <Target className="w-5 h-5 text-red-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xl font-bold text-white">10</p>
            <p className="text-xs text-muted-foreground">Kill Criteria</p>
          </div>
        </Link>
        <Link href="/bibliography">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition-colors group">
            <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
            <p className="text-xl font-bold text-white">15+</p>
            <p className="text-xs text-muted-foreground">Citations</p>
          </div>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Link href="/referee-packet">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Download Referee Packet
          </motion.button>
        </Link>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Every claim has an explicit falsification criterion. If it can't be wrong, it can't be right.
      </p>
    </motion.div>
  );
}
