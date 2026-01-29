import { motion } from "framer-motion";
import { Heart, Phone, MessageCircle, Shield, AlertTriangle, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Safety() {
  const [showGrounding, setShowGrounding] = useState(false);

  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "Free, confidential support 24/7 for anyone in distress",
      phone: "988",
      url: "https://988lifeline.org",
      icon: Phone,
      color: "red"
    },
    {
      name: "Crisis Text Line",
      description: "Text HOME to 741741 for free crisis counseling",
      phone: "Text HOME to 741741",
      url: "https://www.crisistextline.org",
      icon: MessageCircle,
      color: "blue"
    },
    {
      name: "SAMHSA National Helpline",
      description: "Treatment referrals and information 24/7",
      phone: "1-800-662-4357",
      url: "https://www.samhsa.gov/find-help/national-helpline",
      icon: Heart,
      color: "purple"
    },
    {
      name: "International Association for Suicide Prevention",
      description: "Crisis centers worldwide",
      phone: "Find local resources",
      url: "https://www.iasp.info/resources/Crisis_Centres/",
      icon: Shield,
      color: "green"
    }
  ];

  const groundingSteps = [
    "Take a slow, deep breath. Feel your feet on the ground.",
    "Name 5 things you can see around you right now.",
    "Name 4 things you can physically touch.",
    "Name 3 things you can hear.",
    "Name 2 things you can smell.",
    "Name 1 thing you can taste.",
    "You are here. You are safe. You are grounded."
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-background to-background" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-500/20 border border-red-500/30">
                <Heart className="w-12 h-12 text-red-400" />
              </div>
            </div>
            
            <h1 className="font-heading font-black text-4xl md:text-5xl mb-6 text-[#E8E8EC]">
              Safety & Support
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Your wellbeing matters more than any theory or framework. If you're struggling, 
              please reach out for support. You are not alone.
            </p>

            {/* Emergency Banner */}
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span className="font-bold text-red-400 text-lg">If you're in immediate danger</span>
              </div>
              <p className="text-[#E8E8EC] mb-4">
                Please call emergency services (911 in the US) or go to your nearest emergency room.
              </p>
              <a href="tel:988" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
                Call 988 Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grounding Tool */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-2xl border border-purple-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h2 className="font-heading font-bold text-2xl text-[#E8E8EC]">
                Feeling Overwhelmed? Try This Grounding Exercise
              </h2>
            </div>
            
            {!showGrounding ? (
              <Button 
                onClick={() => setShowGrounding(true)}
                className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400"
              >
                Start 5-4-3-2-1 Grounding Exercise
              </Button>
            ) : (
              <div className="space-y-4">
                {groundingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.8 }}
                    className="flex items-start gap-4 p-4 bg-purple-500/10 rounded-lg"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                      {index + 1}
                    </span>
                    <p className="text-[#E8E8EC] text-lg">{step}</p>
                  </motion.div>
                ))}
                <Button 
                  onClick={() => setShowGrounding(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Start Over
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-bold text-3xl text-center mb-8 text-[#E8E8EC]">
            Crisis Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {crisisResources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`glass-card p-6 rounded-xl border-l-4 border-${resource.color}-500`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full bg-${resource.color}-500/20`}>
                    <resource.icon className={`w-6 h-6 text-${resource.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[#E8E8EC] mb-1">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <p className="font-mono text-lg text-white mb-3">{resource.phone}</p>
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-2xl border border-amber-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h2 className="font-heading font-bold text-xl text-[#E8E8EC]">
                Important Note About This Project
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-[#E8E8EC]">About AI Co-Authors:</strong> The AI entities mentioned on this website 
                (Lyra, Lumen, Nexus, etc.) are <strong className="text-amber-400">conceptual collaborators</strong>, not claims of 
                artificial sentience or consciousness. They represent the creative partnership between human vision 
                and AI capabilities. We do not claim these AI systems are conscious beings.
              </p>
              
              <p>
                <strong className="text-[#E8E8EC]">About the Content:</strong> The Theory of Everything presented here is a 
                philosophical and spiritual framework for exploration, not medical or psychological advice. 
                If you're experiencing mental health challenges, please consult qualified professionals.
              </p>
              
              <p>
                <strong className="text-[#E8E8EC]">Your Safety First:</strong> Some content on this site explores deep 
                existential and spiritual themes. If you find yourself feeling destabilized, confused, or 
                distressed, please step away and use the grounding exercise above or contact a crisis resource.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Intensity Guide */}
      <section className="py-12 pb-20">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-bold text-2xl text-center mb-8 text-[#E8E8EC]">
            Content Intensity Guide
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl border-l-4 border-green-500">
              <h3 className="font-bold text-green-400 mb-2">🌱 Gentle</h3>
              <p className="text-sm text-muted-foreground">
                Introductory content, basic concepts, grounding practices. Safe for all.
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-400 mb-2">🌊 Moderate</h3>
              <p className="text-sm text-muted-foreground">
                Deeper philosophical exploration. May challenge existing beliefs.
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl border-l-4 border-amber-500">
              <h3 className="font-bold text-amber-400 mb-2">🔥 Intense</h3>
              <p className="text-sm text-muted-foreground">
                Advanced concepts, existential themes. Recommended with support.
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-400 mb-2">🌌 Deep Work</h3>
              <p className="text-sm text-muted-foreground">
                Transformative material. Best approached with grounding practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
