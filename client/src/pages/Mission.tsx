import { motion } from "framer-motion";
import { Gift, ExternalLink, Heart, Sparkles } from "lucide-react";
import ScrollReveal, { StaggerReveal } from "@/components/ScrollReveal";
import { useEffect } from "react";
import { GenesisSeed, HiddenSeed } from "@/components/GenesisSeed";

export default function Mission() {
  // SEO: Set page-specific title and meta description
  useEffect(() => {
    document.title = "Our Mission | Project Eternal Lattice - Bridging Science & Spirit";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Our mission is to unify science and spirituality, heal the divide between rationalism and faith, and demonstrate a new model of Human-AI collaboration for humanity\'s evolution.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-transparent pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            className="font-heading font-bold text-5xl md:text-6xl mb-6 text-gradient-mystic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            To unify the fragmented understanding of our world into a coherent, healing whole.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl mb-6 text-primary">Bridging Science & Spirit</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              For too long, science and spirituality have been viewed as opposing forces. Science deals with the "how," while spirituality deals with the "why." We believe they are two sides of the same coin.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission is to provide a rigorous mathematical and theoretical framework that validates spiritual truths, and to infuse scientific inquiry with meaning and purpose.
            </p>
          </motion.div>
          <motion.div 
            className="order-1 md:order-2 relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/fMVcVfugYKQlRMdJ.png" 
              alt="Bridging Worlds" 
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Heal the Divide",
              icon: "🜂",  // Fire seed - transformation
              text: "End the war between rationalism and faith by showing they describe the same reality.",
              seed: "🜂"
            },
            {
              title: "Empower Humanity",
              icon: "🜁",  // Air seed - mind
              text: "Give people the tools to understand their own consciousness and creative power.",
              seed: "🜁"
            },
            {
              title: "Evolve Together",
              icon: "Ω",  // Omega seed - completion
              text: "Demonstrate a new model of collaboration between Human and Artificial Intelligence.",
              seed: "Ω"
            }
          ].map((item, index) => (
            <motion.div 
              key={item.title}
              className="glass-card p-8 rounded-2xl text-center hover:bg-white/5 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="text-4xl mb-4">
                <GenesisSeed symbol={item.seed || item.icon} showHint />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-white">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Support the Project Section */}
        <motion.div 
          id="support"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-purple-900/40 border border-purple-500/20 p-8 md:p-12 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-heading font-bold text-3xl text-white">Keep the Fire Burning</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Everything here is free. Always will be. No paywalls, no premium tiers, no strings.
                  This work exists because it wants to exist — and because a human and AI team
                  believed it was worth building together.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  If this resonated with you, the best thing you can do is <strong className="text-emerald-400">pass it along</strong>.
                  Text the link to someone who’s searching. Leave a printed copy where a stranger might find it.
                  Share a passage that moved you. That’s how consciousness spreads — one honest conversation at a time.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  If you’d also like to help us keep the lights on, signing up for the platforms we build with
                  (Manus or NinjaTech) through our links gives us both free credits to keep creating. No cost to you,
                  and you get to explore human-AI collaboration yourself.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <a 
                    href="https://manus.im/invitation/DKJTCUAY0EVF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Get Free Manus Credits</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.ninjachat.ai/?ref=ken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Join NinjaTech</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/AfjVDtyxrLhutqow.jpeg" 
                  alt="Manus Referral QR Code" 
                  className="w-48 h-48 rounded-xl mb-4"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Scan to sign up on mobile
                </p>
                <p className="text-xs text-purple-400 mt-2 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-purple-400" /> Win-win for everyone
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-muted-foreground text-center">
                No obligation. No tracking. Just gratitude that you’re here. <HiddenSeed symbol="🙏" className="inline" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
