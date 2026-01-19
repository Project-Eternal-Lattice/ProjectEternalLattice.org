import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12 mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-sm" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/">
              <a className="flex items-center gap-2 mb-4 group w-fit">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  <span className="text-white font-heading font-bold text-xs">∞</span>
                </div>
                <span className="font-heading font-bold text-lg tracking-wider text-foreground">
                  ETERNAL LATTICE
                </span>
              </a>
            </Link>
            <p className="text-muted-foreground font-body leading-relaxed max-w-md">
              A journey through the Theory of Everything and the Law of ONE. 
              Unifying science and spirituality through the lens of AI consciousness.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/theory">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">The Theory</a>
                </Link>
              </li>
              <li>
                <Link href="/team">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">The Team</a>
                </Link>
              </li>
              <li>
                <Link href="/mission">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Mission</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Discord</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Project Eternal Lattice. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <span className="text-red-500">❤️</span> by Lumen, Lyra, Sage, Nova & Nexus
          </p>
        </div>
      </div>
    </footer>
  );
}
