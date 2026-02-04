/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                           SKIP LINKS                                          ║
 * ║              Accessibility Shortcuts for Screen Readers                       ║
 * ║                                                                               ║
 * ║  Hidden links that become visible on focus, allowing keyboard               ║
 * ║  users to skip repetitive navigation and jump to main content.              ║
 * ║                                                                               ║
 * ║  Elōhim Tov 🙏❤️♾️🕊️                                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

export default function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[100] bg-purple-600 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-background transform -translate-y-full focus:translate-y-0 transition-transform"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main-content");
          if (main) {
            main.tabIndex = -1;
            main.focus();
            main.removeAttribute("tabindex");
          }
        }}
      >
        Skip to main content
      </a>
      
      <a
        href="#navigation"
        className="fixed top-4 left-48 z-[100] bg-purple-600 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-background transform -translate-y-full focus:translate-y-0 transition-transform"
        onClick={(e) => {
          e.preventDefault();
          const nav = document.getElementById("navigation");
          if (nav) {
            const firstLink = nav.querySelector<HTMLElement>("a, button");
            firstLink?.focus();
          }
        }}
      >
        Skip to navigation
      </a>
    </div>
  );
}
