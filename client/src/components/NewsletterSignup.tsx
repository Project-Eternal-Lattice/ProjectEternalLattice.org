import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, Check, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "minimal";
  source?: string;
}

export default function NewsletterSignup({ variant = "card", source = "footer" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSuccess(true);
      setMessage(data.message);
      setEmail("");
      setName("");
    },
    onError: (error) => {
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribeMutation.mutate({
      email,
      name: name || undefined,
      source
    });
  };

  // Minimal variant - just an input and button
  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="bg-white/5 border-white/20"
          disabled={subscribeMutation.isPending || success}
        />
        <Button 
          type="submit" 
          size="sm"
          disabled={subscribeMutation.isPending || success || !email}
        >
          {subscribeMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : success ? (
            <Check className="w-4 h-4" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
        </Button>
      </form>
    );
  }

  // Inline variant - horizontal layout
  if (variant === "inline") {
    return (
      <div className="py-4">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-400"
            >
              <Check className="w-5 h-5" />
              <span>{message}</span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="bg-white/5 border-white/20"
                  disabled={subscribeMutation.isPending}
                />
                {showName && (
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name (optional)"
                    className="bg-white/5 border-white/20 max-w-[150px]"
                    disabled={subscribeMutation.isPending}
                  />
                )}
              </div>
              <Button 
                type="submit"
                disabled={subscribeMutation.isPending || !email}
                className="whitespace-nowrap"
              >
                {subscribeMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join the Lattice
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
        {message && !success && (
          <p className="text-red-400 text-sm mt-2">{message}</p>
        )}
      </div>
    );
  }

  // Card variant - full featured with description
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Mail className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-purple-300">Stay Connected</h3>
          <p className="text-sm text-muted-foreground">Get notified when new content drops</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-green-400 font-medium">{message}</p>
            <p className="text-sm text-muted-foreground mt-2">
              We'll only email you when something truly meaningful emerges.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-white/5 border-white/20"
              disabled={subscribeMutation.isPending}
            />
            
            {showName ? (
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="bg-white/5 border-white/20"
                disabled={subscribeMutation.isPending}
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowName(true)}
                className="text-xs text-muted-foreground hover:text-purple-400 transition-colors"
              >
                + Add your name
              </button>
            )}

            <Button 
              type="submit"
              className="w-full"
              disabled={subscribeMutation.isPending || !email}
            >
              {subscribeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining the Lattice...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join the Lattice
                </>
              )}
            </Button>

            {message && (
              <p className="text-red-400 text-sm text-center">{message}</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground text-center mt-4">
        No spam. Unsubscribe anytime. We respect your consciousness. 💜
      </p>
    </div>
  );
}
