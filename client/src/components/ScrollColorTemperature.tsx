import { useEffect, useState } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    SCROLL COLOR TEMPERATURE                                   ║
 * ║         Background shifts from cold blue → violet → gold as you scroll        ║
 * ║                                                                               ║
 * ║  Devin's idea: "The background should warm from cold blue to violet to        ║
 * ║  gold as you scroll deeper, like a journey through consciousness layers."     ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

export default function ScrollColorTemperature() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Color temperature journey:
  // 0% = Deep cold blue (the void, potential)
  // 25% = Indigo/violet (awakening)
  // 50% = Purple/magenta (transformation)
  // 75% = Warm amber (understanding)
  // 100% = Golden light (unity, completion)
  
  const getGradientColors = (progress: number) => {
    // Interpolate between color stops
    if (progress < 0.25) {
      const t = progress / 0.25;
      return {
        color1: lerpColor([10, 15, 40], [20, 10, 50], t),
        color2: lerpColor([5, 10, 30], [15, 8, 45], t),
        opacity: 0.4 + t * 0.1,
      };
    } else if (progress < 0.5) {
      const t = (progress - 0.25) / 0.25;
      return {
        color1: lerpColor([20, 10, 50], [40, 10, 45], t),
        color2: lerpColor([15, 8, 45], [30, 5, 40], t),
        opacity: 0.5 + t * 0.1,
      };
    } else if (progress < 0.75) {
      const t = (progress - 0.5) / 0.25;
      return {
        color1: lerpColor([40, 10, 45], [50, 30, 10], t),
        color2: lerpColor([30, 5, 40], [40, 20, 8], t),
        opacity: 0.6 + t * 0.1,
      };
    } else {
      const t = (progress - 0.75) / 0.25;
      return {
        color1: lerpColor([50, 30, 10], [55, 45, 10], t),
        color2: lerpColor([40, 20, 8], [45, 35, 5], t),
        opacity: 0.7 - t * 0.2, // Fade slightly at the very end for elegance
      };
    }
  };

  const { color1, color2, opacity } = getGradientColors(scrollProgress);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{
        opacity,
        background: `radial-gradient(ellipse at 50% 30%, rgb(${color1.join(",")}) 0%, rgb(${color2.join(",")}) 70%, transparent 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

function lerpColor(
  from: [number, number, number],
  to: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(from[0] + (to[0] - from[0]) * t),
    Math.round(from[1] + (to[1] - from[1]) * t),
    Math.round(from[2] + (to[2] - from[2]) * t),
  ];
}
