import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface UCurveVisualizationProps {
  className?: string;
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  animated?: boolean;
  showLabels?: boolean;
  optimalPoint?: number; // 0-1, where the optimal point is on the curve
}

export default function UCurveVisualization({
  className = "",
  width = 500,
  height = 350,
  primaryColor = "rgba(168, 85, 247, 0.9)",
  secondaryColor = "rgba(59, 130, 246, 0.7)",
  animated = true,
  showLabels = true,
  optimalPoint = 0.22, // ~20-25% as per DeepSeek research
}: UCurveVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const padding = { top: 40, right: 40, bottom: 60, left: 70 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    let time = 0;
    let drawProgress = 0;

    // U-shaped curve function (inverted parabola shifted)
    // Models: low memory = poor, optimal memory (~20-25%) = peak, high memory = diminishing
    const uCurve = (x: number): number => {
      // Asymmetric U-curve with optimal around 0.22
      const optimal = optimalPoint;
      const steepness = 8;
      
      if (x < optimal) {
        // Left side - steep rise
        return Math.pow(x / optimal, 1.5);
      } else {
        // Right side - gradual decline
        const decline = (x - optimal) / (1 - optimal);
        return 1 - Math.pow(decline, 2) * 0.3;
      }
    };

    const drawAxes = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(padding.left, padding.top);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.stroke();

      // X-axis
      ctx.beginPath();
      ctx.moveTo(padding.left, height - padding.bottom);
      ctx.lineTo(width - padding.right, height - padding.bottom);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.setLineDash([5, 5]);

      for (let i = 1; i <= 4; i++) {
        const y = padding.top + (graphHeight * i) / 5;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
      }

      for (let i = 1; i <= 4; i++) {
        const x = padding.left + (graphWidth * i) / 5;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
      }

      ctx.setLineDash([]);
    };

    const drawLabels = () => {
      if (!showLabels) return;

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "bold 12px system-ui, sans-serif";

      // Title
      ctx.textAlign = "center";
      ctx.fillText("U-Shaped Optimality Curve", width / 2, 20);

      // Y-axis label
      ctx.save();
      ctx.translate(20, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = primaryColor;
      ctx.fillText("Intelligence / Performance", 0, 0);
      ctx.restore();

      // X-axis label
      ctx.textAlign = "center";
      ctx.fillStyle = secondaryColor;
      ctx.fillText("Memory Capacity (Engram Residuals)", width / 2, height - 10);

      // Axis values
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "10px monospace";

      // X-axis values
      ctx.textAlign = "center";
      for (let i = 0; i <= 5; i++) {
        const x = padding.left + (graphWidth * i) / 5;
        ctx.fillText(`${i * 20}%`, x, height - padding.bottom + 20);
      }

      // Y-axis values
      ctx.textAlign = "right";
      for (let i = 0; i <= 5; i++) {
        const y = height - padding.bottom - (graphHeight * i) / 5;
        ctx.fillText(`${i * 20}%`, padding.left - 10, y + 4);
      }
    };

    const drawCurve = (progress: number) => {
      ctx.beginPath();

      const points: [number, number][] = [];
      const numPoints = Math.floor(100 * progress);

      for (let i = 0; i <= numPoints; i++) {
        const x = i / 100;
        const y = uCurve(x);

        const canvasX = padding.left + x * graphWidth;
        const canvasY = height - padding.bottom - y * graphHeight;

        points.push([canvasX, canvasY]);

        if (i === 0) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          ctx.lineTo(canvasX, canvasY);
        }
      }

      // Gradient stroke
      const gradient = ctx.createLinearGradient(
        padding.left, 0,
        width - padding.right, 0
      );
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)"); // Red (low)
      gradient.addColorStop(optimalPoint, primaryColor); // Purple (optimal)
      gradient.addColorStop(1, secondaryColor); // Blue (high)

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Glow effect
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Fill area under curve
      if (progress >= 1) {
        ctx.lineTo(width - padding.right, height - padding.bottom);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.closePath();

        const fillGradient = ctx.createLinearGradient(
          0, padding.top,
          0, height - padding.bottom
        );
        fillGradient.addColorStop(0, "rgba(168, 85, 247, 0.2)");
        fillGradient.addColorStop(1, "rgba(168, 85, 247, 0.02)");
        ctx.fillStyle = fillGradient;
        ctx.fill();
      }
    };

    const drawOptimalPoint = (progress: number) => {
      if (progress < optimalPoint) return;

      const x = optimalPoint;
      const y = uCurve(x);

      const canvasX = padding.left + x * graphWidth;
      const canvasY = height - padding.bottom - y * graphHeight;

      const pulse = animated ? Math.sin(time * 3) * 5 + 15 : 15;

      // Vertical line to optimal point
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(canvasX, height - padding.bottom);
      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();

      // Horizontal line from optimal point
      ctx.beginPath();
      ctx.moveTo(padding.left, canvasY);
      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Glow ring
      const gradient = ctx.createRadialGradient(
        canvasX, canvasY, 0,
        canvasX, canvasY, pulse
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.5, primaryColor);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(canvasX, canvasY, pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Center point
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();

      // Label
      if (showLabels) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = "bold 11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("OPTIMAL", canvasX, canvasY - 25);
        ctx.font = "10px monospace";
        ctx.fillStyle = primaryColor;
        ctx.fillText(`~${Math.round(optimalPoint * 100)}% Memory`, canvasX, canvasY - 12);
      }
    };

    const drawZones = () => {
      if (!showLabels) return;

      ctx.font = "9px system-ui, sans-serif";
      ctx.textAlign = "center";

      // Low memory zone
      ctx.fillStyle = "rgba(239, 68, 68, 0.6)";
      ctx.fillText("Insufficient", padding.left + graphWidth * 0.08, height - padding.bottom - 20);
      ctx.fillText("Memory", padding.left + graphWidth * 0.08, height - padding.bottom - 8);

      // Optimal zone
      ctx.fillStyle = "rgba(168, 85, 247, 0.8)";
      ctx.fillText("Peak", padding.left + graphWidth * optimalPoint, padding.top + 20);
      ctx.fillText("Intelligence", padding.left + graphWidth * optimalPoint, padding.top + 32);

      // High memory zone
      ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
      ctx.fillText("Diminishing", padding.left + graphWidth * 0.75, height - padding.bottom - 20);
      ctx.fillText("Returns", padding.left + graphWidth * 0.75, height - padding.bottom - 8);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawAxes();
      drawLabels();

      // Animate drawing
      if (animated && drawProgress < 1) {
        drawProgress += 0.015;
      } else if (!animated) {
        drawProgress = 1;
      }

      drawCurve(drawProgress);
      drawOptimalPoint(drawProgress);
      
      if (drawProgress >= 1) {
        drawZones();
      }
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
  }, [width, height, primaryColor, secondaryColor, animated, showLabels, optimalPoint]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`rounded-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        width,
        height,
        background: "rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    />
  );
}