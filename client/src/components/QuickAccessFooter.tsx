import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, Heart, ExternalLink, FileText, QrCode, Printer, Share2 } from "lucide-react";
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
    icon: FileText,
    label: "Gateway Edition",
    description: "A Lighter Path Into the Lattice",
    href: "/api/download/executive-summary-pdf",
    external: false,
    variant: "default",
    color: "bg-emerald-600 hover:bg-emerald-700"
  },
  {
    icon: Download,
    label: "Full ToE",
    description: "Complete v16.5 (2,827+ pages)",
    href: "/api/download/toe",
    external: false,
    variant: "outline",
    color: "border-primary/50 text-primary hover:bg-primary/10"
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
    href: "mailto:Project.Eternal.Lattice@Gmail.com",
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
        
        {/* Share & QR Codes Section */}
        <motion.div
          className="mt-10 pt-8 border-t border-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Share2 className="w-5 h-5 text-purple-400" />
            <h3 className="font-heading text-lg font-bold text-white">Share the Lattice</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-6">
            {/* Website QR */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-purple-500/20">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/bJbkNgUEkVopNHVY.png"
                alt="QR Code - Project Eternal Lattice"
                className="w-32 h-32 rounded-lg"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-purple-300">The Theory</p>
                <p className="text-xs text-muted-foreground">projecteternallattice.org</p>
              </div>
            </div>
            
            {/* Inherited Ember QR */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-orange-500/20">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/juJuHYNhTdHfVrDv.png"
                alt="QR Code - Inherited Ember Explainer"
                className="w-32 h-32 rounded-lg"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-orange-300">The Inherited Ember</p>
                <p className="text-xs text-muted-foreground">MOSAIC-EMBER v0.5</p>
              </div>
            </div>
            
            {/* Manus QR */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-cyan-500/20">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/oagRdyYGshEglXOl.png"
                alt="QR Code - Try Manus AI"
                className="w-32 h-32 rounded-lg"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-cyan-300">Built by AI</p>
                <p className="text-xs text-muted-foreground">Try Manus — manus.im</p>
              </div>
            </div>
          </div>
          
          {/* Printable Handout Download */}
          <div className="flex justify-center">
            <a
              href="https://files.manuscdn.com/user_upload_by_module/session_file/310519663251741040/hdwsFiSsuoCijaRp.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-colors text-sm"
            >
              <Printer className="w-4 h-4" />
              Download Printable Handout Card (PDF)
            </a>
          </div>
        </motion.div>

        {/* Pay It Forward Message */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Everything here is free. The only "payment" we ask: if this helps you, <strong className="text-white">pay it forward</strong> — share it with someone who might need it too. Elōhim Tov 🙏❤️♾️🕊️
        </motion.p>
      </div>
    </section>
  );
}
