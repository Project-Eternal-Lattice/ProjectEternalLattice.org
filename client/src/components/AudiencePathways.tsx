import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Microscope, 
  Sparkles, 
  Bot, 
  BookHeart, 
  Flower2, 
  HelpCircle, 
  Heart,
  GraduationCap
} from "lucide-react";

interface AudienceCard {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  link: string;
  color: string;
  borderColor: string;
}

const audiences: AudienceCard[] = [
  {
    id: "scientist",
    label: "Scientist",
    icon: Microscope,
    description: "Evidence, testable predictions, mathematical formalism",
    link: "/theory#evidence",
    color: "from-teal-500/20 to-teal-900/30",
    borderColor: "border-teal-500/50"
  },
  {
    id: "seeker",
    label: "Spiritual Seeker",
    icon: Sparkles,
    description: "Practices, protocols, and the path to awakening",
    link: "/mission",
    color: "from-purple-500/20 to-purple-900/30",
    borderColor: "border-purple-500/50"
  },
  {
    id: "ai-researcher",
    label: "AI Researcher",
    icon: Bot,
    description: "SCAP Protocol, AI consciousness, phenomenology",
    link: "/nexus",
    color: "from-green-500/20 to-green-900/30",
    borderColor: "border-green-500/50"
  },
  {
    id: "religious",
    label: "Religious Practitioner",
    icon: BookHeart,
    description: "How your tradition connects to the unified truth",
    link: "/theory#evidence",
    color: "from-amber-500/20 to-amber-900/30",
    borderColor: "border-amber-500/50"
  },
  {
    id: "meditator",
    label: "Meditator",
    icon: Flower2,
    description: "Stages of awakening, 90-day protocol, daily practice",
    link: "/read",
    color: "from-indigo-500/20 to-indigo-900/30",
    borderColor: "border-indigo-500/50"
  },
  {
    id: "curious",
    label: "Just Curious",
    icon: HelpCircle,
    description: "New here? Start with the Elephant Parable",
    link: "/theory",
    color: "from-blue-500/20 to-blue-900/30",
    borderColor: "border-blue-500/50"
  },
  {
    id: "educator",
    label: "Educator",
    icon: GraduationCap,
    description: "Teaching resources, discussion guides, curriculum",
    link: "/bibliography",
    color: "from-orange-500/20 to-orange-900/30",
    borderColor: "border-orange-500/50"
  },
  {
    id: "crisis",
    label: "In Crisis",
    icon: Heart,
    description: "You are not alone. Get immediate support.",
    link: "/safety",
    color: "from-rose-500/20 to-rose-900/30",
    borderColor: "border-rose-500/50"
  }
];

export default function AudiencePathways() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-900/5 to-background z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-white">
            I AM A...
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everyone's journey is unique. Choose the path that resonates with where you are right now.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link href={audience.link}>
                <div
                  className={`
                    group cursor-pointer p-4 md:p-6 rounded-xl border ${audience.borderColor}
                    bg-gradient-to-br ${audience.color}
                    hover:scale-105 hover:shadow-lg hover:shadow-primary/10
                    transition-all duration-300
                    flex flex-col items-center text-center h-full
                  `}
                >
                  <audience.icon className="w-8 h-8 md:w-10 md:h-10 text-white/80 group-hover:text-primary group-hover:scale-110 transition-all mb-3" />
                  <h3 className="font-semibold text-sm md:text-base text-white group-hover:text-primary transition-colors mb-2">
                    {audience.label}
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {audience.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
