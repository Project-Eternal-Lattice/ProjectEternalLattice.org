import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GoldenSpiralProps {
  className?: string;
  size?: number;
  color?: string;
  glowColor?: string;
  animated?: boolean;
  showFibonacci?: boolean;
  rotations?: number;
}

// Golden ratio (Phi)
const PHI = (1 + Math.sqrt(5)) / 2;

export default function GoldenSpiral({
  className = "",
  size = 400,
  color = "rgba(16, 185, 129, 0.8)",
  glowColor = "rgba(16, 185, 129, 0.3)",
  animated = true,
  showFibonacci = true,
  rotations = 6,
}: GoldenSpiralProps) {
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

    let time = 0;
    let drawProgress = 0;

    // Fibonacci sequence for the rectangles
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

    const drawGoldenRectangles = (progress: number) => {
      const scale = size / 400;
      let x = centerX - 80 * scale;
      let y = centerY - 50 * scale;
      let currentSize = 10 * scale;

      // Direction: 0=right, 1=down, 2=left, 3=up
      let direction = 0;

      const numRects = Math.min(Math.floor(progress * 10), 10);

      for (let i = 0; i < numRects; i++) {
        const fib = fibonacci[i];
        const rectSize = fib * currentSize / fibonacci[0];
        const alpha = 0.3 - i * 0.02;

        // Draw rectangle
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, `${Math.max(alpha, 0.1)})`);
        ctx.lineWidth = 1;

        let rectX = x;
        let rectY = y;

        switch (direction) {
          case 0: // Moving right
            rectX = x;
            rectY = y - rectSize + currentSize;
            break;
          case 1: // Moving down
            rectX = x;
            rectY = y;
            break;
          case 2: // Moving left
            rectX = x - rectSize + currentSize;
            rectY = y;
            break;
          case 3: // Moving up
            rectX = x - rectSize + currentSize;
            rectY = y - rectSize + currentSize;
            break;
        }

        if (showFibonacci) {
          ctx.strokeRect(rectX, rectY, rectSize, rectSize);

          // Draw Fibonacci number
          ctx.fillStyle = color.replace(/[\d.]+\)$/, `${Math.max(alpha + 0.2, 0.2)})`);
          ctx.font = `${Math.max(8, rectSize / 4)}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            fib.toString(),
            rectX + rectSize / 2,
            rectY + rectSize / 2
          );
        }

        // Update position for next rectangle
        switch (direction) {
          case 0:
            x += currentSize;
            y -= rectSize - currentSize;
            break;
          case 1:
            y += currentSize;
            break;
          case 2:
            x -= rectSize - currentSize;
            break;
          case 3:
            y -= rectSize - currentSize;
            x -= rectSize - currentSize;
            break;
        }

        currentSize = rectSize;
        direction = (direction + 1) % 4;
      }
    };

    const drawSpiral = (progress: number) => {
      const scale = size / 400;
      const startRadius = 5 * scale;
      const maxAngle = rotations * Math.PI * 2 * progress;

      ctx.beginPath();

      // Golden spiral equation: r = a * e^(b * theta)
      // where b = ln(phi) / (pi/2)
      const b = Math.log(PHI) / (Math.PI / 2);
      const a = startRadius;

      let firstPoint = true;

      for (let theta = 0; theta <= maxAngle; theta += 0.02) {
        const r = a * Math.exp(b * theta);
        const x = centerX + r * Math.cos(theta - Math.PI);
        const y = centerY + r * Math.sin(theta - Math.PI);

        if (r > size / 2) break;

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }

      // Glow effect
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw animated particle along spiral
      if (animated) {
        const particleTheta = (time * 2) % maxAngle;
        const particleR = a * Math.exp(b * particleTheta);
        const particleX = centerX + particleR * Math.cos(particleTheta - Math.PI);
        const particleY = centerY + particleR * Math.sin(particleTheta - Math.PI);

        if (particleR < size / 2) {
          const gradient = ctx.createRadialGradient(
            particleX, particleY, 0,
            particleX, particleY, 15
          );
          gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
          gradient.addColorStop(0.5, color);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(particleX, particleY, 15, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(particleX, particleY, 4, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    };

    const drawPhiSymbol = () => {
      // Draw golden ratio value
      ctx.fillStyle = color.replace(/[\d.]+\)$/, "0.6)");
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`φ = ${PHI.toFixed(6)}...`, centerX, size - 20);

      // Draw infinity symbol near center
      const pulse = animated ? Math.sin(time * 2) * 0.1 + 1 : 1;
      ctx.font = `${24 * pulse}px serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(time * 3) * 0.2})`;
      ctx.fillText("∞", centerX, centerY);
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Background radial gradient
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, size / 2
      );
      bgGradient.addColorStop(0, glowColor.replace(/[\d.]+\)$/, "0.1)"));
      bgGradient.addColorStop(1, "transparent");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);

      // Animate drawing progress
      if (animated && drawProgress < 1) {
        drawProgress += 0.01;
      } else if (!animated) {
        drawProgress = 1;
      }

      drawGoldenRectangles(drawProgress);
      drawSpiral(drawProgress);
      drawPhiSymbol();
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
        drawProgress = 1;
        draw();
      }
    }, 100);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, glowColor, animated, showFibonacci, rotations]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      initial={{ opacity: 0, rotate: -90 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        rotate: isVisible ? 0 : -90,
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}