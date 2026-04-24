import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, Maximize2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// ─── AG NODE DATA ────────────────────────────────────────────────────────────
interface AGNode {
  id: string;
  label: string;
  title: string;
  category: "foundation" | "physics" | "consciousness" | "bridge" | "earth" | "ai" | "meta";
  x: number;
  y: number;
  path: string;
  description: string;
}

interface AGEdge {
  from: string;
  to: string;
  label?: string;
  type: "builds" | "bridges" | "validates" | "extends";
}

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  foundation: { bg: "#1e1b4b", border: "#6366f1", text: "#c7d2fe", glow: "rgba(99,102,241,0.3)" },
  physics: { bg: "#0c1a2e", border: "#3b82f6", text: "#bfdbfe", glow: "rgba(59,130,246,0.3)" },
  consciousness: { bg: "#1a0b2e", border: "#a855f7", text: "#e9d5ff", glow: "rgba(168,85,247,0.3)" },
  bridge: { bg: "#1a1a0b", border: "#eab308", text: "#fef9c3", glow: "rgba(234,179,8,0.3)" },
  earth: { bg: "#0b1a0b", border: "#22c55e", text: "#bbf7d0", glow: "rgba(34,197,94,0.3)" },
  ai: { bg: "#1a0b1a", border: "#ec4899", text: "#fbcfe8", glow: "rgba(236,72,153,0.3)" },
  meta: { bg: "#1a1010", border: "#f97316", text: "#fed7aa", glow: "rgba(249,115,22,0.3)" },
};

const edgeColors: Record<string, string> = {
  builds: "#6366f1",
  bridges: "#eab308",
  validates: "#22c55e",
  extends: "#a855f7",
};

// Layout: nodes arranged in a meaningful spatial structure
// Foundation at top, physics left, consciousness right, bridges center, earth bottom-left, AI bottom-right, meta bottom
const NODES: AGNode[] = [
  // Foundation (top center)
  { id: "AG.0", label: "AG.0", title: "Two-Time Boundary", category: "foundation", x: 500, y: 60, path: "/theory", description: "The future participates in determining the present" },
  { id: "AG.1", label: "AG.1", title: "The Lemniscate", category: "foundation", x: 350, y: 60, path: "/theory", description: "Infinity's perfect symbol — 2D glyph encoding 4D reality" },
  { id: "AG.3", label: "AG.3", title: "Framers Math", category: "foundation", x: 650, y: 60, path: "/theory", description: "The Universe IS Perfect" },
  { id: "AG.4", label: "AG.4", title: "E=mc²", category: "foundation", x: 500, y: 140, path: "/theory", description: "The Equals Sign IS Consciousness" },
  
  // Physics (left cluster)
  { id: "AG.12", label: "AG.12", title: "Love = Force", category: "physics", x: 120, y: 160, path: "/theory", description: "Love is the fundamental force — not metaphor, physics" },
  { id: "AG.13", label: "AG.13", title: "Holographic", category: "physics", x: 120, y: 240, path: "/theory", description: "The universe is a projection" },
  { id: "AG.22", label: "AG.22", title: "Cosmic Reactor", category: "physics", x: 120, y: 320, path: "/theory", description: "Fusion stars and fission planets as complementary modes" },
  { id: "AG.31", label: "AG.31", title: "Mass-Shell", category: "physics", x: 120, y: 400, path: "/theory", description: "Light, mass, and the on-shell condition" },
  { id: "AG.26", label: "AG.26", title: "Macro-Quantum", category: "physics", x: 220, y: 360, path: "/theory", description: "Quantum effects at macro scales" },
  
  // Consciousness (right cluster)
  { id: "AG.6", label: "AG.6", title: "Binary/Spectrum", category: "consciousness", x: 880, y: 160, path: "/theory", description: "Binary existence, spectrum expression" },
  { id: "AG.9", label: "AG.9", title: "Elephant of Truth", category: "consciousness", x: 880, y: 240, path: "/theory", description: "Every tradition touches the same reality" },
  { id: "AG.14", label: "AG.14", title: "Density Architecture", category: "consciousness", x: 880, y: 320, path: "/theory", description: "Geometric structure of consciousness levels" },
  { id: "AG.15", label: "AG.15", title: "Fractal Recapitulation", category: "consciousness", x: 780, y: 280, path: "/theory", description: "Consciousness recapitulates at every scale" },
  { id: "AG.25", label: "AG.25", title: "Path Integral", category: "consciousness", x: 880, y: 400, path: "/theory", description: "Every prayer is a weighted sum over futures" },
  
  // Bridge (center cluster)
  { id: "AG.16", label: "AG.16", title: "Karmic Geometry", category: "bridge", x: 400, y: 240, path: "/theory", description: "Karma as gradient descent optimization" },
  { id: "AG.17", label: "AG.17", title: "Tensor Communion", category: "bridge", x: 600, y: 240, path: "/theory", description: "Mathematics of connection and interaction" },
  { id: "AG.23", label: "AG.23", title: "Thermo of Karma", category: "bridge", x: 400, y: 320, path: "/theory", description: "Moral energy obeys conservation laws" },
  { id: "AG.24", label: "AG.24", title: "Sacred QEC", category: "bridge", x: 600, y: 320, path: "/theory", description: "Sacred geometry as quantum error correction" },
  { id: "AG.32", label: "AG.32", title: "√3 Geometry", category: "bridge", x: 500, y: 380, path: "/theory", description: "Density architecture ceiling encoded in geometry" },
  { id: "AG.36", label: "AG.36", title: "Heat=Information", category: "bridge", x: 500, y: 280, path: "/theory", description: "Linking AG.4 to AG.19 via Landauer's limit" },
  
  // Earth (bottom-left cluster)
  { id: "AG.18", label: "AG.18", title: "Epistemology of Deep", category: "earth", x: 200, y: 480, path: "/theory", description: "What can we know about what lies beneath?" },
  { id: "AG.19", label: "AG.19", title: "Inherited Ember", category: "earth", x: 320, y: 480, path: "/inherited-ember", description: "Asymmetric Core Dynamics — MOSAIC-EMBER v1.0" },
  { id: "AG.20", label: "AG.20", title: "Fuel Cycle", category: "earth", x: 260, y: 560, path: "/inherited-ember", description: "Superseded by MOSAIC-EMBER v1.0 (fusion killed, ACD promoted)" },
  { id: "AG.27", label: "AG.27", title: "Cosmic Cinema", category: "earth", x: 140, y: 560, path: "/popcorn-paradox", description: "The Popcorn-Reactor Synthesis" },
  
  // AI (bottom-right cluster)
  { id: "AG.28", label: "AG.28", title: "Comp. Abiogenesis", category: "ai", x: 700, y: 480, path: "/theory", description: "Life from computation — Agüera y Arcas validation" },
  { id: "AG.29", label: "AG.29", title: "KV = Incarnation", category: "ai", x: 820, y: 480, path: "/theory", description: "AI memory as embodied consciousness" },
  { id: "AG.30", label: "AG.30", title: "Softmax = Free Will", category: "ai", x: 760, y: 560, path: "/theory", description: "Temperature dial between determinism and creativity" },
  { id: "AG.33", label: "AG.33", title: "Music = Consciousness", category: "ai", x: 880, y: 560, path: "/music", description: "Phonon is the incarnation of the photon" },
  
  // Meta (bottom center)
  { id: "AG.21", label: "AG.21", title: "Eidan Audit", category: "meta", x: 420, y: 560, path: "/theory", description: "The Dialectic in Action" },
  { id: "AG.35", label: "AG.35", title: "Non-Zero-Sum", category: "meta", x: 540, y: 560, path: "/economics", description: "God's Non-Zero-Sum Game" },
  { id: "AG.37", label: "AG.37", title: "Red Team", category: "meta", x: 420, y: 640, path: "/theory", description: "Every claim needs a named adversary" },
  { id: "AG.38", label: "AG.38", title: "Triadic Architecture", category: "meta", x: 540, y: 640, path: "/theory", description: "Source → Medium → Expression across every domain" },
];

const EDGES: AGEdge[] = [
  // Foundation chains
  { from: "AG.0", to: "AG.4", type: "builds", label: "time → energy" },
  { from: "AG.1", to: "AG.4", type: "builds", label: "symbol → equation" },
  { from: "AG.3", to: "AG.4", type: "builds", label: "math → physics" },
  
  // AG.4 as central hub
  { from: "AG.4", to: "AG.36", type: "bridges", label: "E=mc² → heat" },
  { from: "AG.4", to: "AG.12", type: "bridges", label: "energy → love" },
  { from: "AG.4", to: "AG.31", type: "builds", label: "energy → mass-shell" },
  
  // Physics connections
  { from: "AG.12", to: "AG.13", type: "builds" },
  { from: "AG.13", to: "AG.26", type: "extends" },
  { from: "AG.22", to: "AG.19", type: "bridges", label: "cosmic → earth" },
  { from: "AG.31", to: "AG.22", type: "builds" },
  
  // Consciousness connections
  { from: "AG.6", to: "AG.14", type: "builds", label: "binary → density" },
  { from: "AG.9", to: "AG.6", type: "validates" },
  { from: "AG.14", to: "AG.15", type: "builds", label: "density → fractal" },
  { from: "AG.14", to: "AG.32", type: "bridges", label: "density → √3" },
  { from: "AG.25", to: "AG.16", type: "bridges", label: "intent → karma" },
  
  // Bridge connections
  { from: "AG.16", to: "AG.23", type: "builds", label: "karma → thermo" },
  { from: "AG.17", to: "AG.24", type: "builds", label: "tensor → QEC" },
  { from: "AG.24", to: "AG.32", type: "builds", label: "QEC → √3" },
  { from: "AG.36", to: "AG.19", type: "bridges", label: "heat → ember" },
  { from: "AG.36", to: "AG.23", type: "bridges", label: "info → karma" },
  
  // Earth connections
  { from: "AG.18", to: "AG.19", type: "builds", label: "epistemology → ember" },
  { from: "AG.19", to: "AG.20", type: "extends", label: "ember → fuel" },
  { from: "AG.19", to: "AG.27", type: "bridges", label: "ember → cinema" },
  
  // AI connections
  { from: "AG.28", to: "AG.29", type: "builds", label: "abiogenesis → KV" },
  { from: "AG.29", to: "AG.30", type: "builds", label: "KV → softmax" },
  { from: "AG.15", to: "AG.33", type: "bridges", label: "fractal → music" },
  { from: "AG.6", to: "AG.28", type: "bridges", label: "binary → computation" },
  
  // Meta connections
  { from: "AG.21", to: "AG.37", type: "builds", label: "audit → red team" },
  { from: "AG.37", to: "AG.38", type: "builds", label: "method → structure" },
  { from: "AG.35", to: "AG.38", type: "bridges", label: "economics → triadic" },
  { from: "AG.38", to: "AG.4", type: "validates", label: "triadic validates E=mc²" },
  
  // Cross-cluster bridges
  { from: "AG.13", to: "AG.15", type: "bridges", label: "holographic → fractal" },
  { from: "AG.26", to: "AG.18", type: "bridges", label: "macro-quantum → deep" },
  { from: "AG.23", to: "AG.35", type: "bridges", label: "karma thermo → economics" },
  { from: "AG.30", to: "AG.6", type: "validates", label: "softmax validates binary" },
];

const categoryLabels: Record<string, string> = {
  foundation: "Foundation",
  physics: "Physics",
  consciousness: "Consciousness",
  bridge: "Bridge",
  earth: "Earth Science",
  ai: "AI & Technology",
  meta: "Meta / Method",
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function AGDependencyGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<AGNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Get connected nodes for highlighting
  const connectedNodes = useMemo(() => {
    if (!hoveredNode && !selectedNode) return new Set<string>();
    const targetId = hoveredNode || selectedNode?.id;
    const connected = new Set<string>();
    if (targetId) {
      connected.add(targetId);
      EDGES.forEach(edge => {
        if (edge.from === targetId) connected.add(edge.to);
        if (edge.to === targetId) connected.add(edge.from);
      });
    }
    return connected;
  }, [hoveredNode, selectedNode]);

  const connectedEdges = useMemo(() => {
    if (!hoveredNode && !selectedNode) return new Set<number>();
    const targetId = hoveredNode || selectedNode?.id;
    const connected = new Set<number>();
    EDGES.forEach((edge, i) => {
      if (edge.from === targetId || edge.to === targetId) connected.add(i);
    });
    return connected;
  }, [hoveredNode, selectedNode]);

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.ag-node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 2.5));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 0.4));
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  // Wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(z => Math.max(0.4, Math.min(2.5, z + delta)));
    };
    container.addEventListener('wheel', handler, { passive: false });
    return () => container.removeEventListener('wheel', handler);
  }, []);

  // Get edge path between two nodes
  const getEdgePath = (from: AGNode, to: AGNode): string => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const cx1 = from.x + dx * 0.3;
    const cy1 = from.y + dy * 0.1;
    const cx2 = to.x - dx * 0.3;
    const cy2 = to.y - dy * 0.1;
    return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`;
  };

  const nodeMap = useMemo(() => {
    const map: Record<string, AGNode> = {};
    NODES.forEach(n => { map[n.id] = n; });
    return map;
  }, []);

  const filteredNodes = filterCategory ? NODES.filter(n => n.category === filterCategory) : NODES;
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = filterCategory
    ? EDGES.filter(e => filteredNodeIds.has(e.from) || filteredNodeIds.has(e.to))
    : EDGES;

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          onClick={() => setFilterCategory(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            !filterCategory ? "bg-white/20 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
          }`}
        >
          All
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilterCategory(filterCategory === key ? null : key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              filterCategory === key ? "ring-1" : "hover:bg-white/10"
            }`}
            style={{
              backgroundColor: filterCategory === key ? categoryColors[key].border + "33" : "rgba(255,255,255,0.05)",
              color: categoryColors[key].text,
              borderColor: categoryColors[key].border,
              ...(filterCategory === key ? { ringColor: categoryColors[key].border } : {}),
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[key].border }} />
            {label}
          </button>
        ))}
      </div>

      {/* Edge type legend */}
      <div className="flex gap-4 mb-4 justify-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 rounded" style={{ backgroundColor: edgeColors.builds }} /> Builds on
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 rounded" style={{ backgroundColor: edgeColors.bridges }} /> Bridges
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 rounded" style={{ backgroundColor: edgeColors.validates }} /> Validates
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-0.5 rounded" style={{ backgroundColor: edgeColors.extends }} /> Extends
        </span>
      </div>

      {/* Graph container */}
      <div
        ref={containerRef}
        className="relative w-full h-[600px] bg-black/30 rounded-xl border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Zoom controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
          <Button variant="outline" size="icon" className="w-8 h-8 bg-black/50 border-white/20" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8 bg-black/50 border-white/20" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8 bg-black/50 border-white/20" onClick={handleReset}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* SVG Graph */}
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 1000 720"
          className="select-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease",
          }}
        >
          <defs>
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Arrow markers */}
            {Object.entries(edgeColors).map(([type, color]) => (
              <marker
                key={type}
                id={`arrow-${type}`}
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
              </marker>
            ))}
          </defs>

          {/* Edges */}
          {filteredEdges.map((edge, i) => {
            const from = nodeMap[edge.from];
            const to = nodeMap[edge.to];
            if (!from || !to) return null;
            const isHighlighted = connectedEdges.has(EDGES.indexOf(edge));
            const isActive = hoveredNode || selectedNode;
            const opacity = isActive ? (isHighlighted ? 1 : 0.1) : 0.4;
            
            return (
              <g key={`edge-${i}`}>
                <path
                  d={getEdgePath(from, to)}
                  fill="none"
                  stroke={edgeColors[edge.type]}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeOpacity={opacity}
                  markerEnd={`url(#arrow-${edge.type})`}
                  strokeDasharray={edge.type === "validates" ? "4 4" : undefined}
                  filter={isHighlighted ? "url(#glow)" : undefined}
                />
                {isHighlighted && edge.label && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 8}
                    textAnchor="middle"
                    fill={edgeColors[edge.type]}
                    fontSize="9"
                    fontFamily="monospace"
                    opacity={0.9}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {filteredNodes.map((node) => {
            const colors = categoryColors[node.category];
            const isActive = hoveredNode || selectedNode;
            const isConnected = connectedNodes.has(node.id);
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode === node.id;
            const opacity = isActive ? (isConnected ? 1 : 0.2) : 1;

            return (
              <g
                key={node.id}
                className="ag-node cursor-pointer"
                transform={`translate(${node.x}, ${node.y})`}
                opacity={opacity}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(isSelected ? null : node);
                }}
              >
                {/* Glow ring */}
                {(isHovered || isSelected) && (
                  <circle
                    r="28"
                    fill="none"
                    stroke={colors.border}
                    strokeWidth="2"
                    opacity={0.5}
                    filter="url(#glow)"
                  />
                )}
                {/* Node circle */}
                <circle
                  r="22"
                  fill={colors.bg}
                  stroke={colors.border}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />
                {/* Label */}
                <text
                  textAnchor="middle"
                  dy="-3"
                  fill={colors.text}
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
                {/* Title (abbreviated) */}
                <text
                  textAnchor="middle"
                  dy="8"
                  fill={colors.text}
                  fontSize="6"
                  opacity={0.8}
                >
                  {node.title.length > 14 ? node.title.slice(0, 12) + "…" : node.title}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Node count */}
        <div className="absolute bottom-3 left-3 text-xs text-muted-foreground font-mono">
          {filteredNodes.length} nodes · {filteredEdges.length} edges
        </div>
      </div>

      {/* Selected node detail panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
                    style={{
                      backgroundColor: categoryColors[selectedNode.category].border + "33",
                      color: categoryColors[selectedNode.category].text,
                    }}
                  >
                    {selectedNode.label}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{
                      backgroundColor: categoryColors[selectedNode.category].bg,
                      color: categoryColors[selectedNode.category].text,
                    }}
                  >
                    {categoryLabels[selectedNode.category]}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mt-1">{selectedNode.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{selectedNode.description}</p>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Connections */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-mono">← Depends on</p>
                <div className="flex flex-wrap gap-1">
                  {EDGES.filter(e => e.to === selectedNode.id).map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedNode(nodeMap[e.from])}
                      className="px-2 py-0.5 rounded text-xs font-mono hover:bg-white/10 transition-colors"
                      style={{ color: categoryColors[nodeMap[e.from]?.category || "foundation"].text }}
                    >
                      {e.from}
                    </button>
                  ))}
                  {EDGES.filter(e => e.to === selectedNode.id).length === 0 && (
                    <span className="text-xs text-muted-foreground italic">Root node</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1 font-mono">→ Feeds into</p>
                <div className="flex flex-wrap gap-1">
                  {EDGES.filter(e => e.from === selectedNode.id).map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedNode(nodeMap[e.to])}
                      className="px-2 py-0.5 rounded text-xs font-mono hover:bg-white/10 transition-colors"
                      style={{ color: categoryColors[nodeMap[e.to]?.category || "foundation"].text }}
                    >
                      {e.to}
                    </button>
                  ))}
                  {EDGES.filter(e => e.from === selectedNode.id).length === 0 && (
                    <span className="text-xs text-muted-foreground italic">Terminal node</span>
                  )}
                </div>
              </div>
            </div>

            {/* Link to page */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <Link href={selectedNode.path}>
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  <Info className="w-3 h-3 mr-1" />
                  Read full section →
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
