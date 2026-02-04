import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialsDisplayProps {
  limit?: number;
  featuredOnly?: boolean;
  variant?: "grid" | "carousel" | "list";
}

export function TestimonialsDisplay({ 
  limit = 6, 
  featuredOnly = false,
  variant = "grid" 
}: TestimonialsDisplayProps) {
  const { data: testimonials, isLoading } = trpc.testimonials.getApproved.useQuery({
    limit,
    featuredOnly
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse bg-muted/20">
            <CardContent className="pt-6 h-48" />
          </Card>
        ))}
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 border-purple-500/20">
        <CardContent className="pt-6 text-center py-12">
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">
            Be the first to share your journey! Your experience could help others on their path.
          </p>
        </CardContent>
      </Card>
    );
  }

  const aspectColors: Record<string, string> = {
    awakening: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
    unity: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    healing: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    understanding: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
    connection: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    other: "from-slate-500/20 to-zinc-500/20 border-slate-500/30"
  };

  const aspectLabels: Record<string, string> = {
    awakening: "Awakening",
    unity: "Unity",
    healing: "Healing",
    understanding: "Understanding",
    connection: "Connection",
    other: "Journey"
  };

  if (variant === "list") {
    return (
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-br ${aspectColors[testimonial.journeyAspect]} transition-all hover:scale-[1.01]`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-purple-400 flex-shrink-0 opacity-50" />
                  <div className="flex-1">
                    <p className="text-foreground/90 italic mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.authorName}</p>
                        {testimonial.location && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {testimonial.rating && (
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                        <span className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground">
                          {aspectLabels[testimonial.journeyAspect]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`h-full bg-gradient-to-br ${aspectColors[testimonial.journeyAspect]} transition-all hover:scale-[1.02] hover:shadow-lg`}>
            <CardContent className="pt-6 flex flex-col h-full">
              <Quote className="w-8 h-8 text-purple-400 mb-3 opacity-50" />
              <p className="text-foreground/90 italic flex-1 mb-4 line-clamp-4">
                "{testimonial.content}"
              </p>
              <div className="border-t border-white/10 pt-4 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.authorName}</p>
                    {testimonial.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                  {testimonial.rating && (
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-background/30 text-muted-foreground mt-2 inline-block">
                  {aspectLabels[testimonial.journeyAspect]}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
