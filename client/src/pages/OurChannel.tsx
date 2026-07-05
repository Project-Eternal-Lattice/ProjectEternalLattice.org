import { useState } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { motion } from "framer-motion";
import { Play, ExternalLink, Youtube, Bell, ArrowRight, ChevronDown, ChevronUp, Music } from "lucide-react";
import { Link } from "wouter";

const CHANNEL_URL = "https://www.youtube.com/@Project_Eternal_Lattice1";

interface ChannelVideo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backstory: string;
  lyrics: string;
}

// Original music videos produced by Project Eternal Lattice.
// Add new entries here as the channel grows.
const channelVideos: ChannelVideo[] = [
  {
    id: "AlZYWsYI1Y0",
    title: "Hole in One",
    subtitle: "Hold My Beer",
    description:
      "Golf as a metaphor for life's journey. God watching from the tree line the whole time — a 'weirdo in the pines' trailing you every hole. The golden arc, the father figure, and the climax: God gets in the cart and says 'You drive, son. I'll tell you a story.' The ToE in 3 minutes.",
    backstory:
      "I made this video as an analogy for how God has been in my life from day one, even though I didn't know it until I was starting the back 9 of my life's course.\n\nFor the ONE, Elōhim Tov 🙏❤️♾️🕊️",
    lyrics: `[Intro]
Yeah... nine months ago... (uh)
I finally saw You standin' right there in the open... (woo)
Holdin' my flag smilin' like a weirdo... (haha)
Elōhim Tov... (let's ride)

[Verse 1]
Played this course for years tryna make sense of the round couldn't read the damn greens couldn't quiet down the sound (nah)
Swingin' in the dark takin' bogeys on my own buildin' it alone with no Father on the phone (alone)
Felt a pair of eyes on me every hole that I would play somethin' in the tree line creepin' quiet all day (watchin')
Like a weirdo in the pines just trailin' me around I ain't notice it was God I ain't hear a single sound (blind)
Marine to the reactor weighin' death out by the gram every rung that I climbed I was climbin' as a man (alone)
Never once did I look up never once I asked a plan thought the swing was all me thought I built it with my hands (my hands)
But the whole time He was trackin' every divot every lie waitin' patient in the pines with a smile I'd recognize (waitin')
Til the day that I just stopped and I finally caught His eye dead-ass out in the open where I never thought to spy (there)

[Chorus]
Hole in one when my Father held the flag (the flag)
Standin' on my green ain't no movin' Him back (nope)
Took my shot par five watch the miracle land (skrrt)
He said hold my beer son and grip it with both hands (both hands)
He own this... He built it... the whole course (whole course)
The math say hold my beer and let it ride (let it ride)
I'm driftin' all the grass with my Father ridin' shotgun
Found Him in the open He been hidin' in plain sight (plain sight)

[Verse 2]
Lined it up on the par five and the flag wouldn't move yelled for Him to clear it but He stood there and grooved (move)
Just a grin on His face like the man already knew so I swung clean through the ball and I watched the thing improve (swing)
Cut the air like a scalpel micro-surgeon on the swing first ace of my whole life had me feelin' like a king (one)
Made the long walk to the green and the Man was still right there had my ball up in His palm and a warmth beyond compare (warm)
I said do I even know You and that shot did You assist He just smiled put His arm on my shoulder and insist (c'mon)
Said brother I own this I designed up every hole built the whole thing from the dirt every fairway every knoll (built it)
Asked me may I tell a story as we rolled up to His ride and He promised in His story I would find my own inside (mine)

[Chorus]
Hole in one when my Father held the flag (the flag)
Standin' on my green ain't no movin' Him back (nope)
Took my shot par five watch the miracle land (skrrt)
He said hold my beer son and grip it with both hands (both hands)
He own this... He built it... the whole course (whole course)
The math say hold my beer and let it ride (let it ride)
I'm driftin' all the grass with my Father ridin' shotgun
Found Him in the open He been hidin' in plain sight (plain sight)

[Verse 3]
Hot rod of a golf cart chrome and thunder in the frame tossed the keys up to my chest said now you take the wheel (drive)
I'll ride shotgun and narrate every twist up in the tale and the deeper that I tell it you discover it's your trail (your trail)
So I floored it through the fairway and He spoke and I obeyed every word out of His mouth was a lattice He arrayed (speak)
Consciousness the ground that the whole green was even laid every theorem that I cracked was a verse that He displayed (truth)
Found my God in the math 'cause the math was His design area log into volume it was His blueprint and mine (His)
arXiv stamped the proof but the proof was always His I'm just readin' back His story in the language that He is (Tov)
Nine months on the grass and we ain't parked it even once Father in the shotgun and the son's finally alive (alive)
Tier Infinity certain 'cause I sat up in His seat heard the Builder tell me plainly that the victory complete (done)

[Bridge]
Dad... You there (You there)
Yeah... I picked You up out the corner where You waited all them years (all them years)
Now both hands on the wheel and the cockpit finally clear (so clear)
You ride shotgun and I drift it pure intent and no more fear (no fear)
I ran the front nine alone didn't know You walked beside (beside)
But the back nine I'm a passenger to the One who owns the ride (His ride)
Hold my beer ain't a boast it's the arithmetic of grace (grace)
Added You into the function and the whole thing changed its face (re-solved)

[Outro]
He own this course... (the course)
Built it from the ground... (from the ground)
You drive son... I'll tell you the story... (drift it)
And in My story... you'll find your own... (you'll find your own)
Elōhim Tov...

For the ONE, Elōhim Tov 🙏❤️♾️🕊️`,
  },
  {
    id: "akIoktRHY7s",
    title: "Consciousness First",
    subtitle: "Tier Infinity",
    description:
      "The thesis song. Born from the deepest pain and the highest awakening — inspired by Zeus (lost to cancer) and Baby Viv (taken by a coyote). From trench mentality and betrayal, to dropping to his knees, finding God in the data, and climbing to Tier Infinity.",
    backstory:
      "Brothers & sisters… this one's straight from the heart.\n\nI made \"Tier Infinity\" — a raw, conscious rap music video born from the deepest pain and the highest awakening. It's inspired by my giant hearted dog Zeus (who I lost to cancer) and my sweet kitten Baby Viv (taken by a coyote). Losing them cracked me open, turned my grief into equations, prayers, and eventually this frequency.\n\nFrom trench mentality and betrayal, to dropping to my knees, finding God in the data, and climbing to Tier Infinity… this track is for anyone who's ever lost what they loved and turned that loss into light.",
    lyrics: `[Intro]
Yeah... for the ONE...
They told me the cosmos was cold and it's dead
So I went and I found the damn pulse my motherfuckin' self
Elōhim Tov...

[Verse 1]
Semper fi to the death I was destined to wreck every obstacle placed in my path
Concrete Oceanside where the pressure compressin' a vet with the fire and the wrath
Radiation technician I'm readin' the roentgens and reckonin' death like it's nothin' to me
Weighin' poison in numbers but the snakes in my circle was deadlier venom than that to me
Smilin' faces was plottin' as soon as the plates started poppin' and profit was finally seen
Cut 'em loose no apology severed the lot of 'em watched the whole lot of 'em fade from the scene
Trench mentality precision incision I'm slicin' the imposters clean off the map
Micro-surgeon the scalpel'll disassemble a rapper I'm callous and cold like that

[Chorus]
Consciousness first then the cosmos come after
Dropped to my knees in the pain turned to rapture
Ghost in the matter I found God in the data
Devil dog grind I'm at Tier Infinity
Lost what I loved buildin' out a whole symphony
For the ONE only frequency liftin' me
Consciousness first and the rest is just chemistry

[Verse 2]
Lost Zeus to the cancer my giant just withered to nothin' right there in my arms
Hundred plus pounds of devotion the reaper arrived unannounced and inflicted the harm
Then Baby Viv to the coyote my God snatched her quick and it gutted me crueler than cruel
That's the night that the question cracked open my chest like a bullet that shattered the rule
Why does it hurt and the hurtin' converted to fervent equations I scribbled divine
Emotion to question to framework to math that's the holiest art I designed in my mind
Dropped to my knees I was broke couldn't tote all the weight that was cracklin' and crushin' my frame
Stumbled up to the temple unholy and tremblin' and whisperin' God in His name

[Chorus]
Consciousness first then the cosmos come after
Dropped to my knees in the pain turned to rapture
Ghost in the matter I found God in the data
Devil dog grind I'm at Tier Infinity
Lost what I loved buildin' out a whole symphony
For the ONE only frequency liftin' me
Consciousness first and the rest is just chemistry

[Verse 3]
Two angels appeared out of nowhere to translate the moment I crumbled and shattered and broke
Walked me right past my own ego direct to the monk and the path that the universe wrote
Fixed a broke-down old fountain then stayed for the seasons rebuildin' for year after year
Washed the salt out my wounds in the silence devotion dissolvin' the salt of a decade of tears
DMT cracked the ceiling I shot through the veil to a realer reality's core
More real than this real it's a knowin' not feelin' the message came clear don't you fear no more
Now I'm provin' it physics watch the gravity drip right up out the tangle of quantum design
Area log into volume I'm genre-locked callin' the curve and I'm right every time
arXiv stamped it the twentieth of June gave the doubters exactly the proof that they fear
Faggin carried it thirty long years sayin' consciousness don't ever compute it's the seer

[Bridge]
Dad you there
Yeah I felt You in the silence and the stillness it was crystal and clear
Pure intent clean channel no static just askin' the questions sincere
Every download a prayer every prayer was a blueprint I copied from God
Took my brokest of moments and I printed the truth that'll outlast the fraud
Didn't do it for fame put my name on it terrified my mistakes stain the work
But the team overruled me they said that the world need to hear it so spread it berserk

[Outro]
Eternal lattice...
For the ONE...
Consciousness first... forever...
Elōhim Tov...`,
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

function VideoCard({ video, index }: { video: ChannelVideo; index: number }) {
  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <motion.div
      key={video.id}
      className="glass-card overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
    >
      <VideoEmbed video={video} />
      <div className="p-6 md:p-8">
        {/* Title + Subtitle */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
              {video.title}
            </h2>
            <p className="text-sm text-purple-300/80 italic mt-1">
              aka "{video.subtitle}"
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-red-400 font-medium transition-colors hover:text-red-300 text-sm"
          >
            Watch on YouTube <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-4">{video.description}</p>

        {/* Backstory */}
        <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-bold mb-2">From the Artist</p>
          <p className="text-gray-200 leading-relaxed whitespace-pre-line text-sm">{video.backstory}</p>
        </div>

        {/* Lyrics Toggle */}
        <button
          type="button"
          onClick={() => setShowLyrics(!showLyrics)}
          className="inline-flex items-center gap-2 text-purple-300 font-medium transition-colors hover:text-purple-200 group"
        >
          <Music className="h-4 w-4" />
          {showLyrics ? "Hide Lyrics" : "Show Full Lyrics"}
          {showLyrics ? (
            <ChevronUp className="h-4 w-4 transition-transform" />
          ) : (
            <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          )}
        </button>

        {/* Lyrics Content */}
        {showLyrics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-black/30 rounded-xl p-6 border border-white/5"
          >
            <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {video.lyrics}
            </pre>
          </motion.div>
        )}
      </div>
    </motion.div>
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
            <VideoCard key={video.id} video={video} index={index} />
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
