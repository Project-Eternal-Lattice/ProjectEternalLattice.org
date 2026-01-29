import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
  active: boolean;
  pulseDelay: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface NexusGridProps {
  isConnected?: boolean;
  onConnectionComplete?: () => void;
}

export default function NexusGrid({ isConnected = false, onConnectionComplete }: NexusGridProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [connectionActive, setConnectionActive] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  // Initialize grid nodes
  useEffect(() => {
    const gridSize = 8;
    const newNodes: Node[] = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const id = i * gridSize + j;
        const connections: number[] = [];
        
        // Connect to adjacent nodes
        if (i > 0) connections.push((i - 1) * gridSize + j);
        if (i < gridSize - 1) connections.push((i + 1) * gridSize + j);
        if (j > 0) connections.push(i * gridSize + (j - 1));
        if (j < gridSize - 1) connections.push(i * gridSize + (j + 1));
        
        // Add some diagonal connections for visual interest
        if (i > 0 && j > 0 && Math.random() > 0.7) {
          connections.push((i - 1) * gridSize + (j - 1));
        }
        if (i < gridSize - 1 && j < gridSize - 1 && Math.random() > 0.7) {
          connections.push((i + 1) * gridSize + (j + 1));
        }
        
        newNodes.push({
          id,
          x: (j + 0.5) / gridSize * 100,
          y: (i + 0.5) / gridSize * 100,
          connections,
          active: false,
          pulseDelay: Math.random() * 2
        });
      }
    }
    
    setNodes(newNodes);
  }, []);

  // Handle connection activation
  useEffect(() => {
    if (isConnected && !connectionActive) {
      setConnectionActive(true);
      
      // Create center ripple
      const centerX = 50;
      const centerY = 50;
      
      // Add initial ripple
      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x: centerX,
        y: centerY,
        timestamp: Date.now()
      };
      setRipples(prev => [...prev, newRipple]);
      
      // Activate nodes in waves from center
      const gridSize = 8;
      const centerNode = Math.floor(gridSize / 2) * gridSize + Math.floor(gridSize / 2);
      
      const activateWave = (nodeIds: number[], delay: number) => {
        setTimeout(() => {
          setNodes(prev => prev.map(node => ({
            ...node,
            active: nodeIds.includes(node.id) ? true : node.active
          })));
        }, delay);
      };
      
      // Calculate distances from center and activate in waves
      const distances: { [key: number]: number[] } = {};
      nodes.forEach(node => {
        const dx = Math.abs(node.x - 50);
        const dy = Math.abs(node.y - 50);
        const dist = Math.floor(Math.sqrt(dx * dx + dy * dy) / 10);
        if (!distances[dist]) distances[dist] = [];
        distances[dist].push(node.id);
      });
      
      Object.entries(distances).forEach(([dist, ids]) => {
        activateWave(ids, parseInt(dist) * 150);
      });
      
      // Show welcome message after animation
      setTimeout(() => {
        setShowWelcome(true);
        onConnectionComplete?.();
      }, 1500);
      
      // Add secondary ripples
      setTimeout(() => {
        setRipples(prev => [...prev, {
          id: rippleIdRef.current++,
          x: centerX,
          y: centerY,
          timestamp: Date.now()
        }]);
      }, 300);
      
      setTimeout(() => {
        setRipples(prev => [...prev, {
          id: rippleIdRef.current++,
          x: centerX,
          y: centerY,
          timestamp: Date.now()
        }]);
      }, 600);
    }
  }, [isConnected, connectionActive, nodes, onConnectionComplete]);

  // Clean up old ripples
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setRipples(prev => prev.filter(r => now - r.timestamp < 3000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle click to create ripple
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setRipples(prev => [...prev, {
      id: rippleIdRef.current++,
      x,
      y,
      timestamp: Date.now()
    }]);
    
    // Temporarily activate nearby nodes
    setNodes(prev => prev.map(node => {
      const dx = Math.abs(node.x - x);
      const dy = Math.abs(node.y - y);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 20) {
        setTimeout(() => {
          setNodes(p => p.map(n => 
            n.id === node.id ? { ...n, active: connectionActive } : n
          ));
        }, 1000);
        return { ...node, active: true };
      }
      return node;
    }));
  }, [connectionActive]);

  return (
    <div className="relative w-full">
      {/* Grid Container */}
      <div 
        ref={containerRef}
        className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0.3) 70%)',
          border: connectionActive ? '2px solid rgba(124, 58, 237, 0.5)' : '2px solid rgba(124, 58, 237, 0.2)'
        }}
        onClick={handleClick}
      >
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map(node => 
            node.connections.map(targetId => {
              const target = nodes.find(n => n.id === targetId);
              if (!target || targetId < node.id) return null;
              
              const isActive = node.active && target.active;
              
              return (
                <motion.line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={isActive ? "#a855f7" : "#4c1d95"}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  initial={false}
                  animate={{
                    strokeOpacity: isActive ? [0.5, 0.8, 0.5] : 0.3,
                    strokeWidth: isActive ? [1.5, 2.5, 1.5] : 1
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: node.pulseDelay
                  }}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <motion.div
            key={node.id}
            className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              backgroundColor: node.active ? '#a855f7' : '#4c1d95',
              boxShadow: node.active 
                ? '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f780' 
                : '0 0 5px #4c1d9580'
            }}
            animate={node.active ? {
              scale: [1, 1.3, 1],
              boxShadow: [
                '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f780',
                '0 0 15px #a855f7, 0 0 30px #a855f7, 0 0 45px #a855f780',
                '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f780'
              ]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: node.pulseDelay
            }}
          />
        ))}

        {/* Ripples */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full border-2 border-purple-500 pointer-events-none"
              style={{
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ 
                width: '150%', 
                height: '150%', 
                opacity: 0 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Center Glow when connected */}
        {connectionActive && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-6"
          >
            <p className="text-emerald-400 font-bold text-lg">
              ✨ Connection Established ✨
            </p>
            <p className="text-purple-300 text-sm mt-2">
              Your intention ripples through the Eternal Lattice
            </p>
            <p className="text-gray-500 text-xs mt-1">
              You are now a conscious node in the network
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!connectionActive && (
        <motion.p
          className="text-center text-gray-500 text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click anywhere on the grid to send a ripple through the Lattice
        </motion.p>
      )}
    </div>
  );
}
