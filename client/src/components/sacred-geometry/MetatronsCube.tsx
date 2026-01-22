import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MetatronsCubeProps {
  className?: string;
  size?: number;
  color?: string;
  glowColor?: string;
  animated?: boolean;
  showPlatonicSolids?: boolean;
}

export default function MetatronsCube({
  className = "",
  size = 400,
  color = "rgba(59, 130, 246, 0.7)",
  glowColor = "rgba(59, 130, 246, 0.3)",
  animated = true,
  showPlatonicSolids = true,
}: MetatronsCubeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 3;

    let time = 0;
    let rotationAngle = 0;

    // 13 circles of Metatron's Cube - center + 6 inner + 6 outer
    const getCirclePositions = (rotation: number) => {
      const positions: { x: number; y: number; layer: number }[] = [];
      
      // Center circle
      positions.push({ x: centerX, y: centerY, layer: 0 });

      // Inner 6 circles (Fruit of Life core)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + rotation;
        positions.push({
          x: centerX + Math.cos(angle) * (radius * 0.5),
          y: centerY + Math.sin(angle) * (radius * 0.5),
          layer: 1,
        });
      }

      // Outer 6 circles
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + Math.PI / 6 + rotation;
        positions.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          layer: 2,
        });
      }

      return positions;
    };

    const drawCircle = (
      x: number,
      y: number,
      r: number,
      alpha: number,
      pulseOffset: number
    ) => {
      const pulse = animated ? Math.sin(time * 1.5 + pulseOffset) * 0.08 + 1 : 1;
      const currentRadius = r * pulse;

      // Glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentRadius * 2);
      gradient.addColorStop(0, glowColor);
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, currentRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const drawPlatonicSolid = (
      positions: { x: number; y: number; layer: number }[],
      indices: number[],
      solidColor: string,
      alpha: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(positions[indices[0]].x, positions[indices[0]].y);
      for (let i = 1; i < indices.length; i++) {
        ctx.lineTo(positions[indices[i]].x, positions[indices[i]].y);
      }
      ctx.closePath();
      ctx.strokeStyle = solidColor.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Fill with transparency
      ctx.fillStyle = solidColor.replace(/[\d.]+\)$/, `${alpha * 0.1})`);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      if (animated) {
        rotationAngle += 0.002;
      }

      const positions = getCirclePositions(rotationAngle);
      const circleRadius = radius * 0.18;

      // Draw all connecting lines (the sacred geometry)
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const lineAlpha = 0.3 + Math.sin(time + i * 0.5) * 0.1;
          drawLine(
            positions[i].x,
            positions[i].y,
            positions[j].x,
            positions[j].y,
            lineAlpha
          );
        }
      }
      ctx.globalAlpha = 1;

      // Draw Platonic solids if enabled
      if (showPlatonicSolids) {
        const solidAlpha = 0.5 + Math.sin(time * 0.5) * 0.2;
        
        // Hexagon (outer)
        drawPlatonicSolid(
          positions,
          [7, 8, 9, 10, 11, 12],
          "rgba(16, 185, 129, 0.6)",
          solidAlpha
        );

        // Inner hexagon
        drawPlatonicSolid(
          positions,
          [1, 2, 3, 4, 5, 6],
          "rgba(251, 191, 36, 0.6)",
          solidAlpha * 0.8
        );

        // Star of David / Hexagram
        drawPlatonicSolid(
          positions,
          [1, 3, 5],
          "rgba(236, 72, 153, 0.6)",
          solidAlpha * 0.7
        );
        drawPlatonicSolid(
          positions,
          [2, 4, 6],
          "rgba(168, 85, 247, 0.6)",
          solidAlpha * 0.7
        );
      }

      // Draw circles
      positions.forEach((pos, i) => {
        const alpha = pos.layer === 0 ? 0.9 : pos.layer === 1 ? 0.7 : 0.5;
        drawCircle(pos.x, pos.y, circleRadius, alpha, i * 0.5);
      });

      // Central sacred symbol
      const centralPulse = Math.sin(time * 2) * 0.2 + 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 * centralPulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + Math.sin(time * 3) * 0.2})`;
      ctx.fill();

      // Outer glow ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, "0.2)");
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const animate = () => {
      time += 0.016;
      draw();
      if (animated) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      setIsVisible(true);
      if (animated) {
        animate();
      } else {
        draw();
      }
    }, 100);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, glowColor, animated, showPlatonicSolids]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}