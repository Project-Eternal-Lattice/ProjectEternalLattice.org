import { useState } from "react";
import { useAchievements } from "@/contexts/AchievementContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Send, Star, CheckCircle } from "lucide-react";

interface TestimonialFormProps {
  variant?: "card" | "inline";
  onSuccess?: () => void;
}

export function TestimonialForm({ variant = "card", onSuccess }: TestimonialFormProps) {
  const { unlockAchievement } = useAchievements();
  const [authorName, setAuthorName] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [journeyAspect, setJourneyAspect] = useState<string>("other");
  const [rating, setRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.testimonials.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      // Unlock the first_testimonial achievement
      unlockAchievement('first_testimonial');
      onSuccess?.();
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    submitMutation.mutate({
      authorName: authorName.trim(),
      location: location.trim() || undefined,
      content: content.trim(),
      journeyAspect: journeyAspect as "awakening" | "unity" | "healing" | "understanding" | "connection" | "other",
      rating
    });
  };

  if (submitted) {
    return (
      <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-emerald-300 mb-2">Thank You for Sharing!</h3>
          <p className="text-muted-foreground">
            Your journey testimonial has been submitted and will be reviewed shortly.
            Your experience matters and helps others on their path. Elōhim Tov 🙏❤️♾️🕊️
          </p>
        </CardContent>
      </Card>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Your Name *
          </label>
          <Input
            placeholder="How would you like to be known?"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            className="bg-background/50"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Location (optional)
          </label>
          <Input
            placeholder="e.g., California, USA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-background/50"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
          What aspect of your journey are you sharing?
        </label>
        <Select value={journeyAspect} onValueChange={setJourneyAspect}>
          <SelectTrigger className="bg-background/50">
            <SelectValue placeholder="Select an aspect" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="awakening">Awakening</SelectItem>
            <SelectItem value="unity">Unity & Connection</SelectItem>
            <SelectItem value="healing">Healing</SelectItem>
            <SelectItem value="understanding">Understanding</SelectItem>
            <SelectItem value="connection">Connection with Others</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
          Share Your Experience *
        </label>
        <Textarea
          placeholder="How has the Theory of Everything impacted your journey? What insights have you gained? What would you share with others who are just beginning?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          className="bg-background/50 resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {content.length}/2000 characters (minimum 20)
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
          How would you rate your experience?
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending || !authorName.trim() || content.length < 20}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {submitMutation.isPending ? (
          <>Submitting...</>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Share Your Journey
          </>
        )}
      </Button>

      {submitMutation.error && (
        <p className="text-red-400 text-sm text-center">
          {submitMutation.error.message}
        </p>
      )}
    </form>
  );

  if (variant === "inline") {
    return formContent;
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-400" />
          Share Your Journey
        </CardTitle>
        <CardDescription>
          Your experience matters. Share how the Theory of Everything has impacted your path
          and help others who are just beginning their journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  );
}
