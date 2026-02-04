import { useState, useEffect } from "react";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         THE TYPEWRITER                                        ║
 * ║              Animated Text Reveal for Key Messages                            ║
 * ║                                                                               ║
 * ║  Words emerging from the void, consciousness becoming manifest.              ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface TypeWriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete,
  cursor = true
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(startTyping, speed);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    const delayTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span 
          className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle transition-opacity ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </span>
  );
}

// Multi-line typewriter for sequential phrases
interface MultiLineTypeWriterProps {
  lines: string[];
  lineSpeed?: number;
  lineDelay?: number;
  className?: string;
  lineClassName?: string;
}

export function MultiLineTypeWriter({
  lines,
  lineSpeed = 50,
  lineDelay = 500,
  className = "",
  lineClassName = ""
}: MultiLineTypeWriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    setCompletedLines(prev => [...prev, lines[currentLine]]);
    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, lineDelay);
    }
  };

  return (
    <div className={className}>
      {completedLines.map((line, i) => (
        <div key={i} className={lineClassName}>
          {line}
        </div>
      ))}
      {currentLine < lines.length && !completedLines.includes(lines[currentLine]) && (
        <TypeWriter
          text={lines[currentLine]}
          speed={lineSpeed}
          onComplete={handleLineComplete}
          className={lineClassName}
        />
      )}
    </div>
  );
}
