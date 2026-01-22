import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SriYantraProps {
  className?: string;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  glowColor?: string;
  animated?: boolean;
}

export default function SriYantra({
  className = "",
  size = 400,
  primaryColor = "rgba(251, 191, 36, 0.8)",
  secondaryColor = "rgba(249, 115, 22, 0.6)",
  glowColor = "rgba(251, 191, 36, 0.2)",
  animated = true,
}: SriYantraProps) {
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
    const maxRadius = size * 0.42;

    let time = 0;

    // Sri Yantra consists of 9 interlocking triangles
    // 4 pointing up (Shiva/masculine) and 5 pointing down (Shakti/feminine)
    const drawTriangle = (
      cx: number,
      cy: number,
      radius: number,
      rotation: number,
      pointUp: boolean,
      alpha: number,
      color: string
    ) => {
      const pulse = animated ? Math.sin(time * 1.5 + rotation) * 0.03 + 1 : 1;
      const r = radius * pulse;
      
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      const angle = pointUp ? -Math.PI / 2 : Math.PI / 2;
      const points: [number, number][] = [];

      for (let i = 0; i < 3; i++) {
        const a = angle + (i * 2 * Math.PI) / 3;
        points.push([Math.cos(a) * r, Math.sin(a) * r]);
      }

      // Glow effect
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      points.forEach((p) => ctx.lineTo(p[0], p[1]));
      ctx.closePath();
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${alpha})`);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    const drawLotus = (
      cx: number,
      cy: number,
      innerRadius: number,
      outerRadius: number,
      petals: number,
      alpha: number
    ) => {
      const pulse = animated ? Math.sin(time * 0.8) * 0.05 + 1 : 1;

      for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2 - Math.PI / 2;
        const nextAngle = ((i + 1) / petals) * Math.PI * 2 - Math.PI / 2;

        ctx.beginPath();
        
        // Inner point
        const innerX = cx + Math.cos(angle + Math.PI / petals) * innerRadius * pulse;
        const innerY = cy + Math.sin(angle + Math.PI / petals) * innerRadius * pulse;
        
        // Outer point (petal tip)
        const outerX = cx + Math.cos(angle + Math.PI / petals) * outerRadius * pulse;
        const outerY = cy + Math.sin(angle + Math.PI / petals) * outerRadius * pulse;

        // Control points for curves
        const cp1x = cx + Math.cos(angle) * outerRadius * 0.7 * pulse;
        const cp1y = cy + Math.sin(angle) * outerRadius * 0.7 * pulse;
        const cp2x = cx + Math.cos(nextAngle) * outerRadius * 0.7 * pulse;
        const cp2y = cy + Math.sin(nextAngle) * outerRadius * 0.7 * pulse;

        ctx.moveTo(innerX, innerY);
        ctx.quadraticCurveTo(cp1x, cp1y, outerX, outerY);
        ctx.quadraticCurveTo(cp2x, cp2y, innerX, innerY);

        ctx.strokeStyle = secondaryColor.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawBindu = (cx: number, cy: number) => {
      // The central point - the source of creation
      const pulse = animated ? Math.sin(time * 3) * 0.3 + 1 : 1;
      const binduRadius = 4 * pulse;

      // Outer glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, binduRadius * 5);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(0.3, primaryColor);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, binduRadius * 5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(cx, cy, binduRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fill();
    };

    const drawCircles = (cx: number, cy: number, radius: number) => {
      // Three concentric circles (Trivalaya)
      const radii = [radius * 0.95, radius * 0.98, radius * 1.01];
      
      radii.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = secondaryColor.replace(/[\d.]+\)$/, `${0.3 + i * 0.1})`);
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Background glow
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius * 1.2
      );
      bgGradient.addColorStop(0, glowColor);
      bgGradient.addColorStop(1, "transparent");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);

      // Outer square gate (Bhupura) - simplified
      const squareSize = maxRadius * 2.1;
      ctx.strokeStyle = secondaryColor.replace(/[\d.]+\)$/, "0.3)");
      ctx.lineWidth = 2;
      ctx.strokeRect(
        centerX - squareSize / 2,
        centerY - squareSize / 2,
        squareSize,
        squareSize
      );

      // Outer lotus petals (16 petals)
      drawLotus(centerX, centerY, maxRadius * 0.75, maxRadius * 0.9, 16, 0.4);

      // Inner lotus petals (8 petals)
      drawLotus(centerX, centerY, maxRadius * 0.55, maxRadius * 0.7, 8, 0.5);

      // Concentric circles
      drawCircles(centerX, centerY, maxRadius * 0.52);

      // The 9 interlocking triangles
      // Upward triangles (Shiva) - 4 triangles
      const upwardTriangles = [
        { radius: maxRadius * 0.48, rotation: 0 },
        { radius: maxRadius * 0.38, rotation: 0.1 },
        { radius: maxRadius * 0.28, rotation: -0.05 },
        { radius: maxRadius * 0.18, rotation: 0.08 },
      ];

      // Downward triangles (Shakti) - 5 triangles
      const downwardTriangles = [
        { radius: maxRadius * 0.45, rotation: 0 },
        { radius: maxRadius * 0.35, rotation: -0.08 },
        { radius: maxRadius * 0.26, rotation: 0.05 },
        { radius: maxRadius * 0.17, rotation: -0.03 },
        { radius: maxRadius * 0.1, rotation: 0 },
      ];

      // Draw downward triangles first
      downwardTriangles.forEach((t, i) => {
        const alpha = 0.7 - i * 0.08;
        drawTriangle(
          centerX,
          centerY,
          t.radius,
          t.rotation,
          false,
          alpha,
          secondaryColor
        );
      });

      // Draw upward triangles
      upwardTriangles.forEach((t, i) => {
        const alpha = 0.8 - i * 0.1;
        drawTriangle(
          centerX,
          centerY,
          t.radius,
          t.rotation,
          true,
          alpha,
          primaryColor
        );
      });

      // Central Bindu (the point of creation)
      drawBindu(centerX, centerY);
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
  }, [size, primaryColor, secondaryColor, glowColor, animated]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}