import { motion } from "framer-motion";
import { Heart, Phone, MessageCircle, Shield, AlertTriangle, Sparkles, ExternalLink, Users, Home as HomeIcon } from "lucide-react";
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

  const vaResources = [
    {
      name: "Veterans Crisis Line",
      description: "24/7 confidential crisis support for Veterans and their loved ones",
      phone: "988 (Press 1)",
      altContact: "Text: 838255 | Chat: VeteransCrisisLine.net",
      url: "https://www.veteranscrisisline.net",
      icon: Phone,
      color: "red",
      priority: true
    },
    {
      name: "National Call Center for Homeless Veterans",
      description: "24/7 support for Veterans experiencing or at risk of homelessness",
      phone: "1-877-424-3838",
      altContact: "Available 24 hours a day, 7 days a week",
      url: "https://www.va.gov/homeless/",
      icon: HomeIcon,
      color: "amber"
    },
    {
      name: "Women Veterans Call Center",
      description: "Dedicated support for women who have served",
      phone: "855-829-6636 (855-VA-WOMEN)",
      altContact: "Mon-Fri 8am-10pm ET, Sat 8am-6:30pm ET",
      url: "https://www.womenshealth.va.gov/wvcc.asp",
      icon: Users,
      color: "purple"
    },
    {
      name: "Caregiver Support Line",
      description: "Support for caregivers, family members, and friends of Veterans",
      phone: "855-260-3274",
      altContact: "Mon-Fri 8am-8pm ET",
      url: "https://www.caregiver.va.gov",
      icon: Heart,
      color: "blue"
    },
    {
      name: "Vets Center Call Center",
      description: "24/7 readjustment counseling for combat Veterans and families",
      phone: "1-877-927-8387",
      altContact: "Available 24 hours a day, 7 days a week",
      url: "https://www.vetcenter.va.gov",
      icon: Shield,
      color: "green"
    },
    {
      name: "VA Health Benefits Hotline",
      description: "Information about VA health care enrollment and benefits",
      phone: "877-222-8387",
      altContact: "Mon-Fri 8am-8pm ET",
      url: "https://www.va.gov/health-care/",
      icon: MessageCircle,
      color: "cyan"
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

      {/* Veterans Support Section */}
      <section className="py-12 bg-gradient-to-b from-background via-blue-900/10 to-background">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">Veteran Resources</span>
            </div>
            <h2 className="font-heading font-bold text-3xl text-[#E8E8EC] mb-4">
              Support for Those Who Served
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To all Veterans: Thank you for your service. The VA offers comprehensive support 
              services specifically designed for you and your families. You've served us—let us serve you.
            </p>
          </motion.div>

          {/* Veterans Crisis Line - Priority Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="glass-card p-8 rounded-2xl border-2 border-red-500/50 bg-gradient-to-br from-red-900/20 to-background">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-full bg-red-500/20">
                  <Phone className="w-10 h-10 text-red-400" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-2xl text-[#E8E8EC] mb-2">Veterans Crisis Line</h3>
                  <p className="text-muted-foreground mb-4">
                    24/7 confidential crisis support for Veterans and their loved ones. 
                    Responders are specially trained to help Veterans.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="tel:988" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors">
                      <Phone className="w-5 h-5" />
                      Call 988, Press 1
                    </a>
                    <a href="sms:838255" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-bold rounded-lg transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      Text 838255
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other VA Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaResources.filter(r => !r.priority).map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 2) }}
                className={`glass-card p-6 rounded-xl border-l-4 border-${resource.color}-500 hover:bg-white/5 transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full bg-${resource.color}-500/20 flex-shrink-0`}>
                    <resource.icon className={`w-6 h-6 text-${resource.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-[#E8E8EC] mb-1">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <p className="font-mono text-lg text-white mb-1">{resource.phone}</p>
                    {resource.altContact && (
                      <p className="text-xs text-muted-foreground mb-3">{resource.altContact}</p>
                    )}
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm text-${resource.color}-400 hover:text-${resource.color}-300`}
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional VA Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground mb-4">
              For all VA services and benefits information, call <strong className="text-[#E8E8EC]">MyVA411: 800-698-2411</strong> (24/7)
            </p>
            <a 
              href="https://www.va.gov/resources/helpful-va-phone-numbers/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
            >
              View Complete List of VA Phone Numbers <ExternalLink className="w-4 h-4" />
            </a>
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
            General Crisis Resources
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

      {/* Important Note */}
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
