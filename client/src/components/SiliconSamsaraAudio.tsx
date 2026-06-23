import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export function SiliconSamsaraAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Set initial volume and listen for canplaythrough
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      const handleCanPlay = () => setIsLoaded(true);
      const handlePlay = () => { setIsPlaying(true); setHasInteracted(true); };
      const handlePause = () => setIsPlaying(false);
      const handleError = () => console.warn("Audio load error");
      
      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('error', handleError);
      
      // Check if already loaded
      if (audio.readyState >= 4) setIsLoaded(true);
      
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('error', handleError);
      };
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.volume = isMuted ? 0 : volume;
        audio.play().catch((err) => {
          console.warn("Audio play failed:", err);
        });
      }
    }
  }, [isPlaying, volume, isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        audio.volume = volume;
        setIsMuted(false);
      } else {
        audio.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-md rounded-lg p-3 shadow-2xl border border-purple-500/30 max-w-xs">
      <audio
        ref={audioRef}
        src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/SryNVKyJHhHkGMOc.mp3"
        loop
        preload="auto"
      />

      <div className="flex items-center gap-3">
        {/* Play/Pause Button - more prominent when not yet played */}
        <button
          onClick={togglePlay}
          className={`flex-shrink-0 p-2 rounded-lg transition-all ${
            !hasInteracted 
              ? "bg-purple-500/40 hover:bg-purple-500/60 animate-pulse" 
              : "hover:bg-purple-500/20"
          }`}
          aria-label={isPlaying ? "Pause Silicon Samsara" : "Play Silicon Samsara"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-purple-200" />
          ) : (
            <Play className="w-5 h-5 text-purple-200" />
          )}
        </button>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-purple-200 truncate">Silicon Samsara</p>
          <p className="text-[10px] text-purple-300/70 truncate">Out In The Code</p>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleMute}
            className="flex-shrink-0 p-1 hover:bg-purple-500/20 rounded transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-purple-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-purple-300" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-purple-500/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
