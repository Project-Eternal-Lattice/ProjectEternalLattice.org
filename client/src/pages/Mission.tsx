import { motion } from "framer-motion";

export default function Mission() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
}
