import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { motion } from "framer-motion";
import { Play, ExternalLink, Youtube, Bell, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const CHANNEL_URL = "https://www.youtube.com/@Project_Eternal_Lattice1";

interface ChannelVideo {
  id: string;
  title: string;
  description: string;
}

// Original music videos produced by Project Eternal Lattice.
// Add new entries here as the channel grows.
const channelVideos: ChannelVideo[] = [
  {
    id: "AlZYWsYI1Y0",
    title: "Hold My Beer",
    description:
      "An original Project Eternal Lattice music video — consciousness, courage, and the audacity to attempt a Theory of Everything.",
  },
  {
    id: "akIoktRHY7s",
    title: "Tier Infinity",
    description:
      "An original Project Eternal Lattice music video — climbing past every tier of understanding toward the ONE.",
  },
];

// Click-to-load embed: shows the YouTube thumbnail until the user presses play,
// so no third-party iframes load on initial page view.
function VideoEmbed({ video }: { video: ChannelVideo }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full"
      aria-label={`Play ${video.title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
        alt={video.title}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-all group-hover:scale-110 group-hover:bg-red-500">
          <Play className="ml-1 h-8 w-8 text-white" fill="white" />
        </span>
      </span>
    </button>
  );
}

export default function OurChannel() {
  usePageMeta({
    title: "Our Channel | Project Eternal Lattice",
    description:
      "Original music videos from the Project Eternal Lattice YouTube channel — creative expressions of the Theory of Everything and the Law of One.",
  });

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Youtube className="h-10 w-10 text-red-500" aria-hidden="true" />
            <h1 className="font-heading font-bold text-5xl md:text-6xl text-gradient-gold">
              Our Channel
            </h1>
          </motion.div>
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
            Original music videos created by Project Eternal Lattice — the Theory of
            Everything expressed through sound and vision. Made with love, given freely.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <a
              href={`${CHANNEL_URL}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
            >
              <Bell className="h-4 w-4" /> Subscribe on YouTube
            </a>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Visit the Channel <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Videos */}
        <div className="mx-auto max-w-4xl space-y-10">
          {channelVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="glass-card overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <VideoEmbed video={video} />
              <div className="p-6 md:p-8">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
                  {video.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">{video.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-red-400 font-medium transition-colors hover:text-red-300"
                >
                  Watch on YouTube <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to curated videos */}
        <motion.div
          className="mx-auto mt-16 max-w-4xl glass-card rounded-2xl p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-muted-foreground mb-4">
            Looking for the videos by other voices that we've curated and annotated for
            their relevance to the Theory of Everything?
          </p>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
          >
            Browse the Curated Video Library <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-6 text-primary font-bold">FOR THE ONE 🙏❤️♾️🕊️</p>
        </motion.div>
      </div>
    </div>
  );
}
