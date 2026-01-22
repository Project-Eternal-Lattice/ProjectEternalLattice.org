import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FlowerOfLifeProps {
  className?: string;
  size?: number;
  color?: string;
  glowColor?: string;
  animated?: boolean;
  layers?: number;
}

export default function FlowerOfLife({
  className = "",
  size = 400,
  color = "rgba(168, 85, 247, 0.6)",
  glowColor = "rgba(168, 85, 247, 0.3)",
  animated = true,
  layers = 3,
}: FlowerOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const baseRadius = size / 8;

    let time = 0;

    const drawCircle = (
      x: number,
      y: number,
      radius: number,
      alpha: number,
      pulseOffset: number = 0
    ) => {
      const pulse = animated ? Math.sin(time * 2 + pulseOffset) * 0.1 + 1 : 1;
      const currentRadius = radius * pulse;

      // Glow effect
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, currentRadius * 1.5
      );
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.arc(x, y, currentRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Main circle
      ctx.beginPath();
      ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawFlowerOfLife = () => {
      ctx.clearRect(0, 0, size, size);

      // Center circle
      drawCircle(centerX, centerY, baseRadius, 0.8, 0);

      // Generate circles in layers
      let circleIndex = 1;
      for (let layer = 1; layer <= layers; layer++) {
        const numCircles = layer === 1 ? 6 : layer * 6;
        const layerRadius = baseRadius * layer;

        for (let i = 0; i < numCircles; i++) {
          const angle = (i / numCircles) * Math.PI * 2 - Math.PI / 2;
          
          if (layer === 1) {
            // First layer - 6 circles around center
            const x = centerX + Math.cos(angle) * baseRadius;
            const y = centerY + Math.sin(angle) * baseRadius;
            const alpha = 0.7 - layer * 0.1;
            drawCircle(x, y, baseRadius, alpha, circleIndex * 0.5);
          } else {
            // Outer layers - more complex pattern
            const x = centerX + Math.cos(angle) * layerRadius;
            const y = centerY + Math.sin(angle) * layerRadius;
            const alpha = 0.6 - layer * 0.1;
            drawCircle(x, y, baseRadius, Math.max(alpha, 0.2), circleIndex * 0.3);
          }
          circleIndex++;
        }

        // Add intermediate circles for fuller pattern
        if (layer > 1) {
          for (let i = 0; i < numCircles; i++) {
            const angle = (i / numCircles) * Math.PI * 2 + Math.PI / numCircles - Math.PI / 2;
            const intermediateRadius = baseRadius * (layer - 0.5);
            const x = centerX + Math.cos(angle) * intermediateRadius;
            const y = centerY + Math.sin(angle) * intermediateRadius;
            const alpha = 0.5 - layer * 0.1;
            drawCircle(x, y, baseRadius, Math.max(alpha, 0.15), circleIndex * 0.3);
            circleIndex++;
          }
        }
      }

      // Draw vesica piscis highlights
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x1 = centerX;
        const y1 = centerY;
        const x2 = centerX + Math.cos(angle) * baseRadius;
        const y2 = centerY + Math.sin(angle) * baseRadius;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, glowColor.replace(/[\d.]+\)$/, "0.1)"));
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = baseRadius * 0.3;
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const animate = () => {
      time += 0.01;
      drawFlowerOfLife();
      if (animated) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      setIsVisible(true);
      if (animated) {
        animate();
      } else {
        drawFlowerOfLife();
      }
    }, 100);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, glowColor, animated, layers]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        rotate: isVisible ? 0 : -30
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}