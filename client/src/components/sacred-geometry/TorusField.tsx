import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TorusFieldProps {
  className?: string;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  animated?: boolean;
  particleCount?: number;
}

export default function TorusField({
  className = "",
  size = 400,
  primaryColor = "rgba(168, 85, 247, 0.8)",
  secondaryColor = "rgba(236, 72, 153, 0.6)",
  animated = true,
  particleCount = 200,
}: TorusFieldProps) {
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

    interface Particle {
      theta: number; // Angle around the torus tube
      phi: number; // Angle around the torus ring
      speed: number;
      size: number;
      color: string;
    }

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? primaryColor : secondaryColor,
      });
    }

    // Torus parameters
    const R = size * 0.28; // Major radius (distance from center to tube center)
    const r = size * 0.12; // Minor radius (tube radius)

    // Project 3D torus point to 2D with perspective
    const projectPoint = (
      theta: number,
      phi: number,
      rotationX: number,
      rotationY: number
    ): { x: number; y: number; z: number; visible: boolean } => {
      // 3D coordinates on torus surface
      let x = (R + r * Math.cos(theta)) * Math.cos(phi);
      let y = (R + r * Math.cos(theta)) * Math.sin(phi);
      let z = r * Math.sin(theta);

      // Rotate around X axis
      const cosRX = Math.cos(rotationX);
      const sinRX = Math.sin(rotationX);
      const y1 = y * cosRX - z * sinRX;
      const z1 = y * sinRX + z * cosRX;
      y = y1;
      z = z1;

      // Rotate around Y axis
      const cosRY = Math.cos(rotationY);
      const sinRY = Math.sin(rotationY);
      const x1 = x * cosRY + z * sinRY;
      const z2 = -x * sinRY + z * cosRY;
      x = x1;
      z = z2;

      // Perspective projection
      const perspective = 600;
      const scale = perspective / (perspective + z);

      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        z: z,
        visible: z > -r * 2, // Only show front-facing particles
      };
    };

    const drawTorusWireframe = (rotationX: number, rotationY: number) => {
      // Draw torus rings
      const ringCount = 16;
      const segmentCount = 32;

      // Longitudinal lines (around the tube)
      for (let i = 0; i < ringCount; i++) {
        const phi = (i / ringCount) * Math.PI * 2;
        ctx.beginPath();
        let firstPoint = true;

        for (let j = 0; j <= segmentCount; j++) {
          const theta = (j / segmentCount) * Math.PI * 2;
          const point = projectPoint(theta, phi, rotationX, rotationY);

          if (point.visible) {
            if (firstPoint) {
              ctx.moveTo(point.x, point.y);
              firstPoint = false;
            } else {
              ctx.lineTo(point.x, point.y);
            }
          } else {
            firstPoint = true;
          }
        }

        const alpha = 0.1 + Math.sin(time + i * 0.5) * 0.05;
        ctx.strokeStyle = primaryColor.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Latitudinal lines (around the ring)
      for (let j = 0; j < segmentCount / 2; j++) {
        const theta = (j / (segmentCount / 2)) * Math.PI * 2;
        ctx.beginPath();
        let firstPoint = true;

        for (let i = 0; i <= ringCount; i++) {
          const phi = (i / ringCount) * Math.PI * 2;
          const point = projectPoint(theta, phi, rotationX, rotationY);

          if (point.visible) {
            if (firstPoint) {
              ctx.moveTo(point.x, point.y);
              firstPoint = false;
            } else {
              ctx.lineTo(point.x, point.y);
            }
          } else {
            firstPoint = true;
          }
        }

        const alpha = 0.08 + Math.sin(time * 0.5 + j * 0.3) * 0.04;
        ctx.strokeStyle = secondaryColor.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const drawEnergyFlow = (rotationX: number, rotationY: number) => {
      // Draw flowing particles representing energy/consciousness flow
      particles.forEach((particle, i) => {
        // Update particle position
        if (animated) {
          particle.phi += particle.speed * 0.02;
          particle.theta += particle.speed * 0.01 * Math.sin(time + i);
        }

        const point = projectPoint(
          particle.theta,
          particle.phi,
          rotationX,
          rotationY
        );

        if (point.visible) {
          const depthAlpha = (point.z + r * 2) / (r * 4);
          const alpha = 0.3 + depthAlpha * 0.5;
          const particleSize = particle.size * (0.5 + depthAlpha * 0.5);

          // Particle glow
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, particleSize * 3
          );
          gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${alpha})`));
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(point.x, point.y, particleSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Particle core
          ctx.beginPath();
          ctx.arc(point.x, point.y, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${alpha + 0.2})`);
          ctx.fill();
        }
      });
    };

    const drawCentralCore = () => {
      // Draw the central axis / singularity
      const pulse = animated ? Math.sin(time * 2) * 0.2 + 1 : 1;
      const coreSize = 8 * pulse;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, coreSize * 5
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.3, primaryColor.replace(/[\d.]+\)$/, "0.4)"));
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Background
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, size / 2
      );
      bgGradient.addColorStop(0, "rgba(168, 85, 247, 0.05)");
      bgGradient.addColorStop(1, "transparent");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);

      // Rotation angles
      const rotationX = animated ? Math.sin(time * 0.3) * 0.3 + 0.5 : 0.5;
      const rotationY = animated ? time * 0.2 : 0;

      drawTorusWireframe(rotationX, rotationY);
      drawEnergyFlow(rotationX, rotationY);
      drawCentralCore();

      // Label
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Toroidal Energy Field", centerX, size - 15);
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
  }, [size, primaryColor, secondaryColor, animated, particleCount]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}