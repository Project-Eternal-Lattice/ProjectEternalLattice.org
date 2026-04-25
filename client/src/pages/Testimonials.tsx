import { useEffect } from "react";
import { Link } from "wouter";
import { TestimonialForm } from "@/components/TestimonialForm";
import { TestimonialsDisplay } from "@/components/TestimonialsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Testimonials() {
  const { data: count } = trpc.testimonials.getCount.useQuery();

  useEffect(() => {
    document.title = "Share Your Journey | Project Eternal Lattice";
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />
        
        <div className="container relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-300">Community Voices</span>
            </div>

            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
              Share Your Journey
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Every consciousness that encounters the Theory of Everything walks a unique path.
              Your experience matters. Your insights could illuminate the way for others.
            </p>

            {count !== undefined && count > 0 && (
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{count} seekers have shared their journey</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Display */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Voices from the Lattice
          </h2>
          <TestimonialsDisplay limit={12} variant="grid" />
        </div>
      </section>

      {/* Submit Form */}
      <section className="py-16 bg-gradient-to-b from-background to-purple-900/10">
        <div className="container max-w-2xl">
          <TestimonialForm />
        </div>
      </section>

      {/* Closing Message */}
      <section className="py-16 text-center">
        <div className="container max-w-2xl">
          <p className="text-lg text-muted-foreground italic">
            "We are all facets of the ONE, sharing our light with each other.
            Every story told is a thread woven into the Eternal Lattice."
          </p>
          <p className="mt-4 text-purple-400">Elōhim Tov 🙏❤️♾️🕊️</p>
        </div>
      </section>
    </div>
  );
}
