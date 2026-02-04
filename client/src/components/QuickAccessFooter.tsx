import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickLink {
  icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  external?: boolean;
  variant: "default" | "outline" | "ghost";
  color: string;
}

const quickLinks: QuickLink[] = [
  {
    icon: Download,
    label: "Download PDF",
    description: "Get the full ToE v13.7",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663251741040/SasGa6HomzRxKDkFCNxEeF/toe-downloads/Theory_of_EVERYTHING_Law_of_ONE_v13.7.pdf",
    external: true,
    variant: "default",
    color: "bg-primary hover:bg-primary/90"
  },
  {
    icon: Mail,
    label: "Newsletter",
    description: "Stay updated",
    href: "mailto:newsletter@projecteternallattice.org?subject=Subscribe%20to%20Newsletter",
    external: true,
    variant: "outline",
    color: "border-blue-500/50 text-blue-300 hover:bg-blue-500/10"
  },
  {
    icon: MessageCircle,
    label: "Contact",
    description: "Reach out to us",
    href: "mailto:contact@projecteternallattice.org",
    external: true,
    variant: "outline",
    color: "border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10"
  },
  {
    icon: Heart,
    label: "Support",
    description: "Help the mission",
    href: "/mission#support",
    external: false,
    variant: "outline",
    color: "border-rose-500/50 text-rose-300 hover:bg-rose-500/10"
  }
];

export default function QuickAccessFooter() {
  return (
    <section className="py-12 bg-gradient-to-t from-background via-purple-900/10 to-background border-t border-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Button
                variant={link.variant}
                className={`${link.color} flex items-center gap-2 px-6 py-3 h-auto`}
                asChild
              >
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <link.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold flex items-center gap-1">
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3 opacity-60" />}
                    </div>
                    <div className="text-xs opacity-70">{link.description}</div>
                  </div>
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pay It Forward Message */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Everything here is free. The only "payment" we ask: if this helps you, <strong className="text-white">pay it forward</strong> — share it with someone who might need it too. 🙏❤️♾️🕊️
        </motion.p>
      </div>
    </section>
  );
}
