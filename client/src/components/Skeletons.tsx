import { motion } from "framer-motion";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SKELETON COMPONENTS                                   ║
 * ║              Beautiful loading states for the Eternal Lattice                ║
 * ║                                                                               ║
 * ║  Even in waiting, there is beauty. Even in loading, there is presence.       ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// Base skeleton with shimmer animation
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`
        relative overflow-hidden bg-white/5 rounded
        before:absolute before:inset-0
        before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
        before:animate-shimmer
        ${className}
      `}
    />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

// Profile card skeleton
export function ProfileSkeleton() {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

// Text block skeleton
export function TextBlockSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
}

// Chapter card skeleton
export function ChapterSkeleton() {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

// Stats skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}

// Timeline skeleton
export function TimelineSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <Skeleton className="w-4 h-4 rounded-full" />
            {i < items - 1 && <Skeleton className="w-0.5 h-full min-h-[60px]" />}
          </div>
          <div className="flex-1 pb-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Quote skeleton
export function QuoteSkeleton() {
  return (
    <div className="p-8 rounded-xl bg-white/5 border border-white/10">
      <Skeleton className="h-6 w-full mb-3" />
      <Skeleton className="h-6 w-full mb-3" />
      <Skeleton className="h-6 w-3/4 mb-6" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

// Full page loading skeleton
export function PageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-24 px-4"
    >
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Content */}
        <div className="space-y-8">
          <CardSkeleton />
          <TextBlockSkeleton lines={6} />
          <div className="grid md:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Lattice-themed loading animation
export function LatticeLoader({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div className={`relative ${sizeMap[size]}`}>
      {/* Central orb */}
      <motion.div
        className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Orbiting nodes */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-400"
          style={{
            top: "50%",
            left: "50%",
            marginTop: -4,
            marginLeft: -4
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI) / 2) * 20,
              Math.cos((i * Math.PI) / 2 + Math.PI) * 20,
              Math.cos((i * Math.PI) / 2) * 20
            ],
            y: [
              Math.sin((i * Math.PI) / 2) * 20,
              Math.sin((i * Math.PI) / 2 + Math.PI) * 20,
              Math.sin((i * Math.PI) / 2) * 20
            ],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
        <motion.circle
          cx="32"
          cy="32"
          r="20"
          fill="none"
          stroke="url(#latticeGradient)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: "center" }}
        />
        <defs>
          <linearGradient id="latticeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Add shimmer animation to global CSS
export const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer::before {
  animation: shimmer 2s infinite;
}
`;
