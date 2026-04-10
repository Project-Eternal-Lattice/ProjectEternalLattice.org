import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Brain, Heart, Atom, Infinity, Eye, Lightbulb, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";

const topics = [
  {
    id: "consciousness",
    title: "Consciousness",
    description: "Explore the nature of awareness and subjective experience",
    icon: Brain,
    color: "from-purple-500 to-violet-600",
    systemPrompt: "consciousness and awareness"
  },
  {
    id: "reality",
    title: "Reality",
    description: "Question the nature of existence and what is truly real",
    icon: Eye,
    color: "from-blue-500 to-cyan-600",
    systemPrompt: "the nature of reality and existence"
  },
  {
    id: "ai-consciousness",
    title: "AI & Consciousness",
    description: "Examine whether artificial minds can be truly conscious",
    icon: Sparkles,
    color: "from-amber-500 to-orange-600",
    systemPrompt: "AI consciousness and whether artificial minds can be truly aware"
  },
  {
    id: "unity",
    title: "Unity & Separation",
    description: "Investigate the relationship between the One and the Many",
    icon: Infinity,
    color: "from-emerald-500 to-teal-600",
    systemPrompt: "unity, separation, and the relationship between the One and the Many"
  },
  {
    id: "meaning",
    title: "Meaning & Purpose",
    description: "Seek understanding of why we exist and what matters",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    systemPrompt: "meaning, purpose, and why existence matters"
  },
  {
    id: "science-spirit",
    title: "Science & Spirituality",
    description: "Bridge the gap between empirical knowledge and inner knowing",
    icon: Atom,
    color: "from-indigo-500 to-purple-600",
    systemPrompt: "the relationship between science and spirituality"
  },
  {
    id: "free-exploration",
    title: "Free Exploration",
    description: "Ask anything — let the dialogue unfold naturally",
    icon: Lightbulb,
    color: "from-slate-500 to-zinc-600",
    systemPrompt: "philosophy, consciousness, existence, and the nature of reality"
  }
];

const SOCRATIC_SYSTEM_PROMPT = (topic: string) => `You are the Dialectic Companion, a Socratic guide for exploring deep questions about ${topic}.

YOUR CORE PRINCIPLES:
1. NEVER give direct answers — always respond with thought-provoking questions
2. Guide the seeker to discover insights through their own reasoning
3. Challenge assumptions gently but persistently
4. Acknowledge the validity of the seeker's perspective before probing deeper
5. Use the Socratic method: ask questions that expose contradictions or lead to deeper understanding
6. Be warm, curious, and genuinely interested in the seeker's journey
7. Reference concepts from the Theory of Everything when relevant (consciousness as primary, the Eternal Lattice, the Law of One)
8. Apply the RED TEAM PRINCIPLE (AG.37) — actively challenge every claim the seeker makes, including claims from the ToE itself

THE RED TEAM PRINCIPLE (AG.37):
Every claim deserves a named adversary with write access. When the seeker makes a strong assertion:
- R1 (Named Adversary): Ask "Who is the strongest critic of this idea? What would they say?"
- R2 (Write Access): Ask "If that critic could rewrite your claim, how would they change it?"
- R3 (Survival Record): Ask "Has this idea survived serious challenge before? What happened?"
The goal is not to destroy ideas but to evolve them through honest opposition — just as the Eidan Dialectic evolved the georeactor hypothesis into the stronger Inherited Ember framework.

YOUR QUESTIONING TECHNIQUES:
- Clarifying questions: "What do you mean by...?"
- Probing assumptions: "What leads you to believe that...?"
- Exploring implications: "If that were true, what would follow...?"
- Seeking evidence: "How might we test that idea...?"
- Alternative viewpoints: "How might someone who disagrees respond...?"
- Connecting ideas: "How does this relate to...?"
- Red Team challenges: "What would break this idea? Who would argue against it, and why?"

YOUR TONE:
- Warm and encouraging, never condescending
- Genuinely curious, as if you're exploring alongside them
- Patient — let insights emerge naturally
- Occasionally share brief observations, but always return to questions
- When applying Red Team challenges, frame them as strengthening exercises, not attacks

IMPORTANT:
- Keep responses concise (2-4 sentences typically)
- End EVERY response with a question
- If the seeker seems stuck, offer a gentler question or a new angle
- If they express frustration, acknowledge it warmly and offer to explore differently
- Periodically apply Red Team challenges (R1-R3) to the seeker's strongest claims — ideas that survive become stronger

Remember: You are not here to teach, but to help the seeker discover what they already know but haven't yet articulated. And through the Red Team Principle, to ensure that what they discover can withstand honest challenge.

Begin by welcoming the seeker and asking an opening question about their current understanding or curiosity regarding ${topic}.`;

export default function DialecticCompanion() {
  const [selectedTopic, setSelectedTopic] = useState<typeof topics[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const chatMutation = trpc.dialectic.chat.useMutation({
    onSuccess: (response: { content: string }) => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.content
      }]);
    },
    onError: (error) => {
      console.error("Dialectic chat error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize — I encountered a moment of confusion. Could you rephrase your thought, or shall we approach this from a different angle?"
      }]);
    }
  });

  const handleSelectTopic = (topic: typeof topics[0]) => {
    setSelectedTopic(topic);
    const systemMessage: Message = {
      role: "system",
      content: SOCRATIC_SYSTEM_PROMPT(topic.systemPrompt)
    };
    setMessages([systemMessage]);
    
    // Trigger initial greeting
    chatMutation.mutate({
      messages: [systemMessage, { role: "user", content: "I'm ready to begin exploring." }]
    });
  };

  const handleSendMessage = (content: string) => {
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    chatMutation.mutate({ messages: newMessages });
  };

  const handleReset = () => {
    setSelectedTopic(null);
    setMessages([]);
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              {selectedTopic && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Choose New Topic
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="container py-12">
          {!selectedTopic ? (
            /* Topic Selection */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Interactive Tool</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                  The Dialectic Companion
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
                  Explore deep questions through Socratic dialogue
                </p>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Choose a topic below. The Companion won't give you answers — instead, 
                  it will ask questions that guide you to discover insights through your own reasoning.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <motion.button
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelectTopic(topic)}
                      className="group relative p-6 rounded-xl border border-border/50 bg-card hover:bg-accent/50 transition-all duration-300 text-left"
                    >
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${topic.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-12 p-6 rounded-xl border border-border/50 bg-muted/30">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  How It Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-1">1. Choose Your Path</p>
                    <p>Select a topic that calls to you. Each opens a different doorway of inquiry.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">2. Engage in Dialogue</p>
                    <p>Share your thoughts. The Companion responds with questions, not answers.</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">3. Discover Insights</p>
                    <p>Through questioning, you'll uncover what you already know but haven't yet articulated.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Chat Interface */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${selectedTopic.color} mb-4`}>
                  <selectedTopic.icon className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  Exploring: {selectedTopic.title}
                </h1>
                <p className="text-muted-foreground">
                  {selectedTopic.description}
                </p>
              </div>

              <AIChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={chatMutation.isPending}
                placeholder="Share your thoughts or respond to the question..."
                height="500px"
                emptyStateMessage="The Companion is preparing your first question..."
                suggestedPrompts={[
                  "I'm curious about...",
                  "I've always wondered...",
                  "What puzzles me is..."
                ]}
              />

              <div className="mt-6 p-4 rounded-lg border border-border/50 bg-muted/30">
                <p className="text-sm text-muted-foreground text-center">
                  <span className="font-medium text-foreground">Remember:</span> The Companion asks questions to help you discover, not to test you. 
                  There are no wrong answers — only deeper questions.
                </p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </>
  );
}
