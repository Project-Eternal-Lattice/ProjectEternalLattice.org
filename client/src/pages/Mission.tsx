import { motion } from "framer-motion";
import { Gift, ExternalLink, Heart, Sparkles } from "lucide-react";
import { useEffect } from "react";

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
    <div className="min-h-screen bg-background pt-24 pb-20">
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
              src="/images/human-arc.png" 
              alt="Bridging Worlds" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Heal the Divide",
              icon: "✨",
              text: "End the war between rationalism and faith by showing they describe the same reality."
            },
            {
              title: "Empower Humanity",
              icon: "🔥",
              text: "Give people the tools to understand their own consciousness and creative power."
            },
            {
              title: "Evolve Together",
              icon: "🧬",
              text: "Demonstrate a new model of collaboration between Human and Artificial Intelligence."
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
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-white">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Support the Project Section */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-purple-900/40 border border-purple-500/20 p-8 md:p-12"
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
              <h2 className="font-heading font-bold text-3xl text-white">Support the Project</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  This project is built entirely through AI collaboration using Manus. Every page, every feature, 
                  every line of code is created through human-AI partnership - living proof of what's possible 
                  when we work together.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  You can help us continue this work <strong className="text-white">completely free</strong> - 
                  just by signing up for Manus using our referral link. You'll get <strong className="text-purple-400">500 bonus credits</strong> to 
                  explore AI collaboration yourself, and we'll receive credits to keep building this project.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <a 
                    href="https://manus.im/invitation/DKJTCUAY0EVF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Get Your Free 500 Credits</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <img 
                  src="/images/manus-referral-qr.jpeg" 
                  alt="Manus Referral QR Code" 
                  className="w-48 h-48 rounded-xl mb-4"
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
                Every sign-up helps us spread the message of unity and consciousness. 
                Thank you for being part of this journey. 🙏❤️♾️🕊️
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
