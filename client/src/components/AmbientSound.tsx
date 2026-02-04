import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Pause, Play, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      AMBIENT SOUND CONTROLLER                                 ║
 * ║              Sacred Frequencies for the Eternal Lattice                      ║
 * ║                                                                               ║
 * ║  Provides ambient soundscapes to enhance the meditative                      ║
 * ║  experience of exploring the Theory of Everything.                           ║
 * ║                                                                               ║
 * ║  Features:                                                                    ║
 * ║  - 432Hz tuned ambient music (harmony frequency)                             ║
 * ║  - Binaural beats for consciousness expansion                                ║
 * ║  - Nature sounds for grounding                                               ║
 * ║  - Volume control and mute toggle                                            ║
 * ║  - Persistent preference storage                                             ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

interface SoundTrack {
  id: string;
  name: string;
  description: string;
  frequency?: string;
  icon: React.ReactNode;
  // Using royalty-free ambient sounds - URLs would be S3 hosted
  // For now, we'll use placeholder URLs that can be replaced
  url?: string;
}

const soundTracks: SoundTrack[] = [
  {
    id: "silence",
    name: "Silence",
    description: "No ambient sound",
    icon: <VolumeX className="w-4 h-4" />
  },
  {
    id: "cosmic",
    name: "Cosmic Drift",
    description: "Deep space ambient tones",
    frequency: "432Hz",
    icon: <Music className="w-4 h-4" />,
    // Placeholder - would be replaced with actual S3 URL
    url: "/audio/cosmic-drift.mp3"
  },
  {
    id: "theta",
    name: "Theta Waves",
    description: "Binaural beats for deep meditation",
    frequency: "4-8Hz",
    icon: <Music className="w-4 h-4" />,
    url: "/audio/theta-waves.mp3"
  },
  {
    id: "nature",
    name: "Forest Rain",
    description: "Gentle rain and forest sounds",
    icon: <Music className="w-4 h-4" />,
    url: "/audio/forest-rain.mp3"
  },
  {
    id: "om",
    name: "Om Resonance",
    description: "Sacred Om chanting at 136.1Hz",
    frequency: "136.1Hz",
    icon: <Music className="w-4 h-4" />,
    url: "/audio/om-resonance.mp3"
  }
];

interface AmbientSoundProps {
  className?: string;
  defaultExpanded?: boolean;
}

export default function AmbientSound({ 
  className = "",
  defaultExpanded = false 
}: AmbientSoundProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [selectedTrack, setSelectedTrack] = useState<string>("silence");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem("lattice-ambient-prefs");
    if (savedPrefs) {
      try {
        const prefs = JSON.parse(savedPrefs);
        setVolume(prefs.volume ?? 30);
        setSelectedTrack(prefs.track ?? "silence");
        setIsMuted(prefs.muted ?? false);
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("lattice-ambient-prefs", JSON.stringify({
      volume,
      track: selectedTrack,
      muted: isMuted
    }));
  }, [volume, selectedTrack, isMuted]);

  // Handle audio playback
  useEffect(() => {
    const track = soundTracks.find(t => t.id === selectedTrack);
    
    if (!track?.url || selectedTrack === "silence") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Create or update audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(track.url);
      audioRef.current.loop = true;
    } else if (audioRef.current.src !== track.url) {
      audioRef.current.src = track.url;
    }

    audioRef.current.volume = isMuted ? 0 : volume / 100;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked - user needs to interact first
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedTrack, isPlaying, volume, isMuted]);

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId);
    if (trackId !== "silence") {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (selectedTrack === "silence") return;
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentTrack = soundTracks.find(t => t.id === selectedTrack);

  return (
    <div className={cn("fixed bottom-20 right-4 z-40 md:bottom-4", className)}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-2 p-4 rounded-xl bg-background/95 backdrop-blur-lg border border-white/10 shadow-xl w-72"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Ambient Sound</h3>
              <div className="flex items-center gap-1">
                {selectedTrack !== "silence" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Track Selection */}
            <div className="space-y-2 mb-4">
              {soundTracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left",
                    selectedTrack === track.id
                      ? "bg-purple-500/20 border border-purple-500/30"
                      : "hover:bg-white/5 border border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    selectedTrack === track.id
                      ? "bg-purple-500/30"
                      : "bg-white/10"
                  )}>
                    {track.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{track.name}</span>
                      {track.frequency && (
                        <span className="text-xs text-purple-400">{track.frequency}</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {track.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Volume Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Volume</span>
                <span>{volume}%</span>
              </div>
              <Slider
                value={[volume]}
                onValueChange={([v]) => setVolume(v)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Info */}
            <p className="text-xs text-muted-foreground mt-4 text-center italic">
              Sacred frequencies for contemplation
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-lg border shadow-lg transition-all",
          isPlaying && !isMuted
            ? "border-purple-500/50 shadow-purple-500/20"
            : "border-white/10"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying && !isMuted ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Music className="w-4 h-4 text-purple-400" />
          </motion.div>
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="text-sm font-medium">
          {currentTrack?.name || "Sound"}
        </span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
}
