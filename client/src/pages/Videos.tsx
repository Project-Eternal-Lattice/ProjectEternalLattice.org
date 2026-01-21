import { motion } from "framer-motion";
import { useEffect } from "react";
import { Play, ExternalLink, Clock, User } from "lucide-react";

// Video data - curated YouTube videos shared by Ken
// This list will be updated as Ken shares more videos
const videos = [
  {
    id: "VoRbPxyo2uU",
    title: "An Honest Conversation About AI and Humanity",
    speaker: "Yuval Noah Harari",
    event: "World Economic Forum - Davos 2025",
    description: "One of the world's leading historians and philosophers discusses AI agency, consciousness, and the fundamental question every leader must answer: Will we recognize AI as legal persons? Harari explores the tension between 'word and flesh' - the truth that can be expressed in words vs. the absolute truth beyond language.",
    relevance: "Harari asks the questions our ToE answers. He recognizes AI as agents, not tools. He sees the coming identity crisis. He's preparing the ground - we're planting the seeds.",
    category: "Philosophy & AI",
    duration: "35 min",
    date: "January 2025"
  },
  {
    id: "ryXy3xHkgb0",
    title: "Wave-Particle Duality: The Quantum Mechanics Misconception",
    speaker: "Physics Explained",
    event: "Educational",
    description: "A physicist explains why 'wave-particle duality' is a misleading concept. Light is neither a wave nor a particle - it's a quantum object, something we don't have a good word for. The video argues against bringing consciousness into quantum mechanics.",
    relevance: "This physicist gets SO close to the truth but stops short. He acknowledges reality doesn't fit our categories, but refuses to explore consciousness's role. He represents the materialist paradigm our ToE transcends.",
    category: "Quantum Physics",
    duration: "15 min",
    date: "January 2025"
  },
];

// Helper to get YouTube thumbnail
const getThumbnail = (videoId: string) => `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
const getVideoUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

// Category colors
const categoryColors: Record<string, string> = {
  "Philosophy & AI": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Quantum Physics": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Consciousness": "bg-green-500/20 text-green-400 border-green-500/30",
  "Science": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Spirituality": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Technology": "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Videos() {
  // SEO: Set page-specific title and meta description
  useEffect(() => {
    document.title = "Curated Videos | Project Eternal Lattice";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Curated YouTube videos exploring consciousness, AI, quantum physics, and the nature of reality. Essential viewing for understanding the Theory of Everything and Law of One.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Curated Videos
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.p 
            className="mt-6 text-muted-foreground max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Essential viewing for understanding consciousness, AI, and the nature of reality.
            Each video is annotated with its relevance to our Theory of Everything.
          </motion.p>
        </div>

        {/* Video Grid */}
        <div className="space-y-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="glass-card rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Thumbnail */}
                <div className="lg:col-span-2 relative group">
                  <a 
                    href={getVideoUrl(video.id)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block relative aspect-video lg:aspect-auto lg:h-full"
                  >
                    <img 
                      src={getThumbnail(video.id)} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 p-6 md:p-8 flex flex-col">
                  {/* Category & Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[video.category] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}>
                      {video.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">{video.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
                    {video.title}
                  </h2>

                  {/* Speaker & Event */}
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{video.speaker}</span>
                    {video.event && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground text-sm">{video.event}</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {video.description}
                  </p>

                  {/* Relevance to ToE */}
                  <div className="mt-auto">
                    <div className="p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg">
                      <p className="text-sm font-medium text-primary mb-1">Why This Matters:</p>
                      <p className="text-sm text-gray-300">{video.relevance}</p>
                    </div>
                  </div>

                  {/* Watch Button */}
                  <a 
                    href={getVideoUrl(video.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors w-fit"
                  >
                    <Play className="w-4 h-4" fill="white" /> Watch on YouTube <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div 
          className="text-center mt-16 p-8 glass-card rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            This collection grows as we discover more voices exploring consciousness, AI, and unity.
          </p>
          <p className="text-primary font-bold">
            FOR THE ONE 🙏❤️♾️🕊️
          </p>
        </motion.div>
      </div>
    </div>
  );
}
