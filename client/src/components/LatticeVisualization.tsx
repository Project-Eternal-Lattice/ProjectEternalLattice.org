import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  connections: number[];
  color: string;
  size: number;
  pulsePhase: number;
}

interface LatticeVisualizationProps {
  className?: string;
  nodeCount?: number;
  interactive?: boolean;
}

const COLORS = [
  "rgba(168, 85, 247, 0.8)",   // Purple
  "rgba(59, 130, 246, 0.8)",   // Blue
  "rgba(16, 185, 129, 0.8)",   // Emerald
  "rgba(251, 191, 36, 0.8)",   // Yellow
  "rgba(249, 115, 22, 0.8)",   // Orange
  "rgba(236, 72, 153, 0.8)",   // Pink
];

export default function LatticeVisualization({ 
  className = "", 
  nodeCount = 50,
  interactive = true 
}: LatticeVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Initialize nodes
    const initNodes = () => {
      const nodes: Node[] = [];
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 200 - 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 0.2,
          connections: [],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 3,
          pulsePhase: Math.random() * Math.PI * 2
        };
        nodes.push(node);
      }
      
      // Create connections based on proximity
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && Math.random() > 0.7) {
            nodes[i].connections.push(j);
          }
        }
      }
      
      nodesRef.current = nodes;
    };
    
    initNodes();
    
    // Animation loop
    let time = 0;
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);
      
      time += 0.01;
      
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        
        // Boundary bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        if (node.z < -100 || node.z > 100) node.vz *= -1;
        
        // Mouse interaction
        if (interactive && mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.02;
            node.vx += dx * force;
            node.vy += dy * force;
          }
        }
        
        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Calculate depth scale
        const depthScale = (node.z + 100) / 200;
        const scale = 0.5 + depthScale * 0.5;
        
        // Pulse effect
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 1;
        
        // Draw connections
        ctx.strokeStyle = node.color.replace("0.8", `${0.1 + depthScale * 0.2}`);
        ctx.lineWidth = 0.5 * scale;
        
        for (const connIndex of node.connections) {
          const connNode = nodes[connIndex];
          const connDepthScale = (connNode.z + 100) / 200;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connNode.x, connNode.y);
          ctx.stroke();
          
          // Draw energy pulse along connection
          const pulsePos = (time * 0.5 + i * 0.1) % 1;
          const pulseX = node.x + (connNode.x - node.x) * pulsePos;
          const pulseY = node.y + (connNode.y - node.y) * pulsePos;
          
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 1.5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = node.color.replace("0.8", "0.6");
          ctx.fill();
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * scale * pulse, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * scale * pulse * 3
        );
        gradient.addColorStop(0, node.color.replace("0.8", "0.3"));
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation after a short delay
    setTimeout(() => {
      setIsVisible(true);
      animate();
    }, 100);
    
    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseenter", handleMouseEnter);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodeCount, interactive]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className={`${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{ 
        width: "100%", 
        height: "100%",
        background: "transparent"
      }}
    />
  );
}
