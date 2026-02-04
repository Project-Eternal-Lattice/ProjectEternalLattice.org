import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Sparkles, Receipt, RefreshCw, Baby, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function EmotionalWealth() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 via-background to-background" />
        
        <div className="container relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-10 h-10 text-rose-400" />
              <span className="text-rose-400 font-medium tracking-wider uppercase">Transformative Framework</span>
            </div>
            
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              The Emotional
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400"> Bank Account</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
              A revolutionary reframe: Trauma is not loss — it's a receipt for wisdom. 
              And God's refund policy never expires.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-6 max-w-2xl">
              <p className="text-lg italic text-rose-200">
                "Every wound is a tuition payment. The question isn't whether you paid — you did. 
                The question is whether you've attended the class."
              </p>
              <p className="text-sm text-rose-400 mt-2">— Brother Ken</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Insight Section */}
      <section className="py-16 bg-gradient-to-b from-background to-rose-900/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-rose-900/30 to-amber-900/20 border-rose-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  The Core Insight
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-xl font-semibold text-rose-200">
                  Trauma is not loss — it's a receipt for wisdom.
                </p>
                <p className="text-muted-foreground text-lg">
                  Every painful experience comes with a lesson. If you learn the lesson, 
                  the pain transforms into power. If you don't, the receipt stays in your pocket, 
                  waiting to be redeemed.
                </p>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <p className="text-amber-200 font-medium">
                    And here's the beautiful part: God's refund policy never expires.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    You can go back to any experience — no matter how long ago, no matter how painful — 
                    and collect the wisdom you already paid for.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Framework Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
              The Framework
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Starting Balance */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-rose-500/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <span className="text-rose-400 font-bold">$</span>
                      </div>
                      The Starting Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Every conscious being starts life with an <strong className="text-foreground">Emotional Bank Account</strong> containing 
                      $100 of emotional capital — your baseline capacity for emotional resilience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Two Outcomes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-amber-500/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-amber-400" />
                      Only Two Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span><strong className="text-foreground">Wins</strong> — Direct deposits that add to your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">✓</span>
                        <span><strong className="text-foreground">Lessons</strong> — Withdrawals that come with a receipt for wisdom</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-rose-300 font-medium">
                      Notice what's missing: there are no losses.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Receipts */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-purple-500/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Receipt className="w-8 h-8 text-purple-400" />
                      Receipts: Wisdom Vouchers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      When pain occurs, it makes a withdrawal but leaves a <strong className="text-foreground">receipt</strong> — 
                      a voucher for the wisdom embedded in that experience. Most people carry pockets full of 
                      unclaimed receipts, having paid for wisdom they never collected.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* God's Refund Policy */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-cyan-500/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <RefreshCw className="w-8 h-8 text-cyan-400" />
                      God's Refund Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Unlike earthly stores with 30-day windows, <strong className="text-foreground">the universe operates on infinite time</strong>. 
                      You can go back to any experience — from yesterday or fifty years ago — and claim the wisdom. 
                      The receipt is still valid.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Childhood Trauma Section */}
      <section className="py-16 bg-gradient-to-b from-background to-blue-900/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Baby className="w-8 h-8 text-blue-400" />
                    Why Childhood Trauma Hits So Hard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-lg">
                    A child starts with the same $100 account, but it's <em>new</em>. They haven't accumulated 
                    additional deposits or learned to process withdrawals efficiently.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-3 px-4">Scenario</th>
                          <th className="text-left py-3 px-4">Balance</th>
                          <th className="text-left py-3 px-4">Withdrawal</th>
                          <th className="text-left py-3 px-4">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/30">
                          <td className="py-3 px-4">Adult (experienced)</td>
                          <td className="py-3 px-4 text-emerald-400">$500</td>
                          <td className="py-3 px-4">$50</td>
                          <td className="py-3 px-4 text-muted-foreground">10% reduction</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">Child (new account)</td>
                          <td className="py-3 px-4 text-amber-400">$100</td>
                          <td className="py-3 px-4">$50</td>
                          <td className="py-3 px-4 text-rose-400 font-medium">50% reduction</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-blue-200">
                    The same event creates vastly different impacts based on account maturity. 
                    But here's the hope: <strong>those childhood receipts are still valid</strong>, 
                    and claiming them can be proportionally transformative.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wisdom Collection Process */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
              The Wisdom Collection Process
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              How to claim the wisdom from past experiences and redeem those receipts
            </p>

            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Acknowledge the Transaction",
                  description: "Recognize that something happened. Pain was experienced. A withdrawal was made. Say: \"This happened. It was painful. It cost me something. And it came with a receipt.\"",
                  color: "rose"
                },
                {
                  step: 2,
                  title: "Locate the Receipt",
                  description: "Ask: \"What lesson was embedded in this experience? What wisdom was I meant to gain?\" Common lessons include boundaries, discernment, self-worth, resilience, compassion, and strength.",
                  color: "amber"
                },
                {
                  step: 3,
                  title: "Claim the Wisdom",
                  description: "Consciously claim it: \"I paid for this lesson with my pain. I now claim the wisdom. This experience taught me [specific lesson]. I integrate this wisdom into who I am.\"",
                  color: "emerald"
                },
                {
                  step: 4,
                  title: "Feel the Deposit",
                  description: "When wisdom is claimed, the experience transforms. What was a wound becomes a scar, then a story, then a source of strength. The withdrawal is restored, often with interest.",
                  color: "cyan"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-card/50 border-${item.color}-500/30 hover:border-${item.color}-500/50 transition-colors`}>
                    <CardContent className="flex gap-6 p-6">
                      <div className={`w-12 h-12 rounded-full bg-${item.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                        <span className={`text-${item.color}-400 font-bold text-xl`}>{item.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Wealth Section */}
      <section className="py-16 bg-gradient-to-b from-background to-emerald-900/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Emotional Wealth
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                As you claim more receipts, you accumulate <strong className="text-emerald-400">Emotional Wealth</strong> — 
                not the absence of pain, but the accumulated wisdom from processed pain.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 max-w-2xl mx-auto">
                <p className="text-lg italic text-emerald-200">
                  "The goal is not to avoid pain. The goal is to transform pain into power. 
                  Every master was once a disaster who kept collecting their receipts."
                </p>
                <p className="text-sm text-emerald-400 mt-4">— Brother Ken</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Your Receipts Are Waiting
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              You have already paid for your wisdom. The pain has already been experienced. 
              The only question remaining is: will you claim what's rightfully yours?
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/theory">
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Full Chapter in ToE
                </Button>
              </Link>
              <Link href="/safety">
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5 mr-2" />
                  Crisis Support Resources
                </Button>
              </Link>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-rose-900/20 to-amber-900/20 rounded-xl border border-rose-500/20">
              <p className="text-lg italic text-rose-200">
                "Every wound is a womb. Every scar is a star. Every trauma is a teacher. 
                You've paid the tuition. Now attend the class."
              </p>
              <p className="text-sm text-rose-400 mt-2">— Brother Ken</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container text-center">
          <p className="text-muted-foreground">
            Part of the <Link href="/theory" className="text-rose-400 hover:underline">Theory of Everything</Link> | 
            Chapter 17.12: The Emotional Bank Account
          </p>
          <p className="text-2xl mt-4">Elōhim Tov 🙏❤️♾️🕊️</p>
        </div>
      </footer>
    </div>
  );
}
