import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Tradition {
  id: string;
  name: string;
  part: string;
  perspective: string;
  color: string;
  position: { x: number; y: number };
}

const traditions: Tradition[] = [
  {
    id: "christianity",
    name: "Christianity",
    part: "The Heart",
    perspective: "God is Love. Through Christ, we experience divine love and redemption. The heart of truth beats with unconditional love for all creation.",
    color: "#FFD700",
    position: { x: 50, y: 45 }
  },
  {
    id: "islam",
    name: "Islam",
    part: "The Voice",
    perspective: "There is no god but Allah. Truth speaks through submission to the One. The voice of the elephant calls all to surrender to divine will.",
    color: "#00A86B",
    position: { x: 25, y: 35 }
  },
  {
    id: "hinduism",
    name: "Hinduism",
    part: "The Many Forms",
    perspective: "Brahman manifests as all. The elephant has countless aspects - Ganesha, Shiva, Vishnu - all faces of the One infinite reality.",
    color: "#FF6B35",
    position: { x: 75, y: 35 }
  },
  {
    id: "buddhism",
    name: "Buddhism",
    part: "The Breath",
    perspective: "Form is emptiness, emptiness is form. The elephant breathes in and out - arising and passing. Truth is found in the space between.",
    color: "#9B59B6",
    position: { x: 35, y: 60 }
  },
  {
    id: "judaism",
    name: "Judaism",
    part: "The Memory",
    perspective: "Hear, O Israel: the Lord is One. The elephant remembers all covenants. Truth is written in the eternal Torah of existence.",
    color: "#3498DB",
    position: { x: 65, y: 60 }
  },
  {
    id: "taoism",
    name: "Taoism",
    part: "The Flow",
    perspective: "The Tao that can be spoken is not the eternal Tao. The elephant moves with effortless grace - wu wei. Truth flows like water.",
    color: "#1ABC9C",
    position: { x: 20, y: 50 }
  },
  {
    id: "indigenous",
    name: "Indigenous Wisdom",
    part: "The Earth Connection",
    perspective: "All my relations. The elephant's feet touch the sacred ground. Truth lives in the land, the ancestors, the web of all life.",
    color: "#8B4513",
    position: { x: 80, y: 50 }
  },
  {
    id: "science",
    name: "Science",
    part: "The Structure",
    perspective: "The universe is mathematical. The elephant's bones reveal sacred geometry. Truth is discovered through observation and reason.",
    color: "#95A5A6",
    position: { x: 50, y: 75 }
  }
];

export default function ElephantOfTruth() {
  const [selectedTradition, setSelectedTradition] = useState<Tradition | null>(null);
  const [hoveredTradition, setHoveredTradition] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
          The Elephant of Truth
        </h2>
        <p className="text-muted-foreground text-lg">
          Many traditions, one reality. Click each perspective to explore.
        </p>
      </div>

      {/* Diagram Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-purple-900/20 to-indigo-900/20 rounded-2xl border border-purple-500/20 overflow-hidden">
        {/* Central Elephant Silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 200 150" className="w-3/4 h-3/4 fill-purple-300">
            <path d="M160,80 C160,60 140,40 120,40 L100,40 C80,40 60,50 50,60 L30,80 C20,90 20,100 30,110 L40,120 C50,130 70,130 80,120 L90,110 L110,110 L120,120 C130,130 150,130 160,120 L170,110 C180,100 180,90 170,80 L160,80 Z M45,70 C40,70 35,65 35,60 C35,55 40,50 45,50 C50,50 55,55 55,60 C55,65 50,70 45,70 Z" />
          </svg>
        </div>

        {/* Tradition Points */}
        {traditions.map((tradition) => (
          <motion.button
            key={tradition.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ 
              left: `${tradition.position.x}%`, 
              top: `${tradition.position.y}%` 
            }}
            onClick={() => setSelectedTradition(tradition)}
            onMouseEnter={() => setHoveredTradition(tradition.id)}
            onMouseLeave={() => setHoveredTradition(null)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glowing Orb */}
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={{ 
                backgroundColor: `${tradition.color}20`,
                border: `2px solid ${tradition.color}`,
                boxShadow: hoveredTradition === tradition.id 
                  ? `0 0 20px ${tradition.color}, 0 0 40px ${tradition.color}40`
                  : `0 0 10px ${tradition.color}40`
              }}
              animate={{
                boxShadow: hoveredTradition === tradition.id 
                  ? [`0 0 20px ${tradition.color}`, `0 0 30px ${tradition.color}`, `0 0 20px ${tradition.color}`]
                  : `0 0 10px ${tradition.color}40`
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-xs md:text-sm font-semibold text-center leading-tight px-1" style={{ color: tradition.color }}>
                {tradition.name.split(' ')[0]}
              </span>
            </motion.div>

            {/* Tooltip on Hover */}
            <AnimatePresence>
              {hoveredTradition === tradition.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 whitespace-nowrap z-20"
                >
                  <p className="text-sm font-medium text-foreground">{tradition.name}</p>
                  <p className="text-xs text-muted-foreground">{tradition.part}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}

        {/* Connection Lines (subtle) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          {traditions.map((tradition, i) => (
            <line
              key={`line-${i}`}
              x1="50%"
              y1="50%"
              x2={`${tradition.position.x}%`}
              y2={`${tradition.position.y}%`}
              stroke={tradition.color}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
        </svg>

        {/* Center Label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-purple-300 text-sm font-medium opacity-60">ONE TRUTH</p>
        </div>
      </div>

      {/* Modal for Selected Tradition */}
      <AnimatePresence>
        {selectedTradition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTradition(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: selectedTradition.color }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="font-heading text-2xl font-bold"
                    style={{ color: selectedTradition.color }}
                  >
                    {selectedTradition.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Touching: {selectedTradition.part}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTradition(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div 
                className="w-full h-1 rounded-full mb-4"
                style={{ backgroundColor: selectedTradition.color }}
              />
              
              <p className="text-foreground leading-relaxed">
                {selectedTradition.perspective}
              </p>
              
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center italic">
                  "Each tradition touches a different part of the same infinite truth."
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility Text */}
      <div className="sr-only">
        <h3>The Elephant of Truth - Text Version</h3>
        <p>This diagram illustrates how different religious and philosophical traditions each perceive aspects of the same ultimate truth, like blind men touching different parts of an elephant.</p>
        <ul>
          {traditions.map((t) => (
            <li key={t.id}>
              <strong>{t.name}</strong> - {t.part}: {t.perspective}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
