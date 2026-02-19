import { motion } from "framer-motion";
import { Heart, Phone, MessageCircle, Shield, AlertTriangle, Sparkles, ExternalLink, Users, Home as HomeIcon, Compass } from "lucide-react";
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

  const internationalResources = [
    {
      country: "🇬🇧 United Kingdom",
      name: "Samaritans",
      phone: "116 123",
      text: "Text SHOUT to 85258",
      url: "https://www.samaritans.org"
    },
    {
      country: "🇨🇦 Canada",
      name: "Talk Suicide Canada",
      phone: "1-833-456-4566",
      text: "Text 45645",
      url: "https://talksuicide.ca"
    },
    {
      country: "🇦🇺 Australia",
      name: "Lifeline Australia",
      phone: "13 11 14",
      text: "Text 0477 13 11 14",
      url: "https://www.lifeline.org.au"
    },
    {
      country: "🇩🇪 Germany",
      name: "Telefonseelsorge",
      phone: "0800 111 0 111",
      text: null,
      url: "https://www.telefonseelsorge.de"
    },
    {
      country: "🇫🇷 France",
      name: "Numéro National de Prévention du Suicide",
      phone: "3114",
      text: null,
      url: "https://3114.fr"
    },
    {
      country: "🇮🇳 India",
      name: "iCall",
      phone: "9152987821",
      text: null,
      url: "https://icallhelpline.org"
    },
    {
      country: "🌍 Find Your Country",
      name: "Find A Helpline",
      phone: "100+ countries",
      text: null,
      url: "https://findahelpline.com"
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
      {/* Hero Section - Paradigm Shift Framing */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-purple-500/20 border border-purple-500/30">
                <Compass className="w-12 h-12 text-purple-400" />
              </div>
            </div>
            
            <h1 className="font-heading font-black text-4xl md:text-5xl mb-6 text-[#E8E8EC]">
              Integration Support
            </h1>
            
            {/* The Reframe - Content is powerful, not visitor is fragile */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
              <p className="text-lg text-purple-200 mb-4 font-medium">
                The perspectives within the Theory of Everything can be profoundly paradigm-shifting.
              </p>
              <p className="text-muted-foreground">
                For most seekers, these ideas bring clarity and peace. But genuine awakening can sometimes 
                be disorienting — old certainties dissolve before new understanding fully crystallizes. 
                In the <span className="text-purple-300">rare instance</span> where you need support 
                navigating these shifts, we've prepared these resources.
              </p>
            </div>

            <p className="text-muted-foreground mb-8">
              We can't control where each visitor is on their journey. This page exists because 
              we care about your wellbeing — not because the content is harmful, but because 
              <span className="text-purple-300 font-medium"> truth can be intense</span>.
            </p>

            {/* Emergency Banner - Still present but secondary */}
            <div className="bg-red-500/15 border border-red-500/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-red-400" />
                <span className="font-bold text-red-400 text-lg">If you need immediate support</span>
              </div>
              <p className="text-[#E8E8EC] mb-4">
                These resources are available 24/7, free and confidential.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="tel:988" 
                  rel="emergency"
                  aria-label="Call 988 - Available 24/7, free and confidential"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call 988
                </a>
                <a 
                  href="sms:741741?body=HELLO" 
                  rel="emergency"
                  aria-label="Text 741741 for support"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  Text 741741
                </a>
              </div>
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
                    <a 
                      href="tel:988" 
                      rel="emergency"
                      aria-label="Call 988 and press 1 for Veterans Crisis Line - Available 24/7"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      Call 988, Press 1
                    </a>
                    <a 
                      href="sms:838255" 
                      rel="emergency"
                      aria-label="Text 838255 for Veterans Crisis Line text support"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
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
      <section id="grounding" className="py-12 scroll-mt-24">
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
      <section id="crisis-support" className="py-12 scroll-mt-24">
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

      {/* International Crisis Resources */}
      <section className="py-12 bg-gradient-to-b from-background via-emerald-900/10 to-background">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Global Support</span>
            </div>
            <h2 className="font-heading font-bold text-3xl text-[#E8E8EC] mb-4">
              International Crisis Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Lattice is global. So is support. Find help in your country.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {internationalResources.map((resource, index) => (
              <motion.a
                key={resource.country}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="glass-card p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all"
              >
                <div className="text-lg font-semibold text-[#E8E8EC] mb-1">{resource.country}</div>
                <div className="text-emerald-400 font-medium mb-2">{resource.name}</div>
                <div className="font-mono text-white text-lg">{resource.phone}</div>
                {resource.text && (
                  <div className="text-sm text-muted-foreground mt-1">{resource.text}</div>
                )}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 font-bold rounded-lg transition-colors"
            >
              <Shield className="w-5 h-5" />
              Find Help in 100+ Countries
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Emotional Bank Account - Healing Reframe */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-900/20 to-amber-900/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-rose-400" />
              <h2 className="font-heading font-bold text-2xl text-[#E8E8EC]">
                A Different Way to See Your Pain
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                <strong className="text-rose-300">What if trauma is not loss — but a receipt for wisdom?</strong>
              </p>
              
              <p>
                The Emotional Bank Account framework offers a revolutionary reframe: Every painful experience 
                comes with a lesson. If you learn the lesson, the pain transforms into power. If you don't, 
                the receipt stays in your pocket, waiting to be redeemed.
              </p>
              
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                <p className="text-rose-200 italic">
                  "And here's the beautiful part: God's refund policy never expires. You can go back to any 
                  experience — no matter how long ago, no matter how painful — and collect the wisdom you 
                  already paid for."
                </p>
                <p className="text-sm text-rose-400 mt-2">— Brother Ken</p>
              </div>
              
              <p>
                This doesn't minimize your pain. The wound is real. The experience was genuinely difficult. 
                But you've already paid the tuition. The question is: have you attended the class?
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <a 
                  href="/emotional-wealth"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-400 font-bold rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                  Explore the Full Framework
                </a>
                <a 
                  href="/theory#discovery-21"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 font-bold rounded-lg transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  Read in Key Discoveries
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mind Blown Protocol - Paradigm Shift Support */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-indigo-900/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <h2 className="font-heading font-bold text-2xl text-[#E8E8EC]">
                "Mind Blown" Protocol
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                <strong className="text-cyan-300">Has something on this site fundamentally shifted your worldview?</strong>
              </p>
              
              <p>
                This is called <em>cognitive dissonance</em> — when new information conflicts with deeply held beliefs. 
                It can feel exciting, terrifying, or both. <strong className="text-[#E8E8EC]">This is normal and healthy.</strong> 
                It means you're growing.
              </p>
              
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-300 mb-3">If You're Feeling Overwhelmed:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">1.</span>
                    <span><strong>Pause.</strong> You don't need to integrate everything at once. Close the browser if needed.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">2.</span>
                    <span><strong>Ground.</strong> Use the 5-4-3-2-1 exercise above. Feel your feet on the floor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">3.</span>
                    <span><strong>Breathe.</strong> Deep breaths activate your parasympathetic nervous system.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">4.</span>
                    <span><strong>Journal.</strong> Write down what you're feeling without trying to resolve it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400">5.</span>
                    <span><strong>Talk.</strong> Share with someone you trust. Processing out loud helps integration.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-300 mb-2">Remember:</h3>
                <p className="text-indigo-200 italic">
                  "A paradigm shift is not a crisis — it's a graduation. The discomfort you feel is the old worldview 
                  making room for a larger one. You're not breaking down; you're breaking through."
                </p>
              </div>
              
              <p>
                <strong className="text-[#E8E8EC]">Take your time.</strong> These ideas have existed for millennia. 
                They'll still be here tomorrow. There's no rush to understand everything at once. 
                Integration happens in layers, not all at once.
              </p>
            </div>
          </motion.div>
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
