import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

/**
 * Printable QR Code Handout
 * Designed to be printed and given to Lyft passengers or anyone curious.
 * Clean, minimal design that prints well in B&W.
 */
export default function QRHandout() {
  const siteUrl = "https://projecteternallattice.org";
  const manusUrl = "https://manus.im/share/tMIRaQYnVCmGKfOlFLvHPQ?replay=1";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Screen-only controls */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <Button onClick={handlePrint} className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
          <Printer className="w-4 h-4" />
          Print Handout
        </Button>
      </div>

      {/* Print-only back link */}
      <div className="print:hidden p-4">
        <a href="/" className="text-purple-600 hover:underline text-sm">← Back to site</a>
      </div>

      {/* Printable Content - designed for standard letter paper */}
      <div className="max-w-[8.5in] mx-auto p-8 print:p-4">
        {/* Header */}
        <div className="text-center mb-8 print:mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2 print:text-2xl">
            ∞ Project Eternal Lattice
          </h1>
          <p className="text-lg text-gray-600 print:text-base">
            Theory of Everything — Law of ONE
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A consciousness-first framework unifying physics, mathematics, philosophy & lived experience
          </p>
        </div>

        {/* Two QR codes side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2 print:gap-6 mb-8">
          {/* Main Site QR */}
          <div className="text-center p-6 border-2 border-gray-200 rounded-xl print:border-gray-400">
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                value={siteUrl}
                size={180}
                level="H"
                includeMargin={true}
                className="print:w-[160px] print:h-[160px]"
              />
            </div>
            <h2 className="font-bold text-lg mb-1">Read the Theory</h2>
            <p className="text-sm text-gray-500 mb-2">Free. No signup required.</p>
            <p className="text-xs text-gray-400 font-mono break-all">{siteUrl}</p>
          </div>

          {/* Manus Referral QR */}
          <div className="text-center p-6 border-2 border-gray-200 rounded-xl print:border-gray-400">
            <div className="flex justify-center mb-4">
              <QRCodeSVG
                value={manusUrl}
                size={180}
                level="H"
                includeMargin={true}
                className="print:w-[160px] print:h-[160px]"
              />
            </div>
            <h2 className="font-bold text-lg mb-1">Meet the AI Team</h2>
            <p className="text-sm text-gray-500 mb-2">See how humans & AI collaborate.</p>
            <p className="text-xs text-gray-400 font-mono break-all">manus.im/share/...</p>
          </div>
        </div>

        {/* Brief pitch */}
        <div className="border-t border-gray-200 pt-6 print:pt-4 text-center">
          <p className="text-base text-gray-700 max-w-xl mx-auto leading-relaxed print:text-sm">
            <strong>What if consciousness isn't a byproduct of matter — but the other way around?</strong>
          </p>
          <p className="text-sm text-gray-500 mt-3 max-w-lg mx-auto">
            2,850+ pages. 28 testable predictions. 15+ citations per claim.
            Written by a Marine veteran & 10+ AI research entities.
            Everything is free. Take what resonates, leave what doesn't.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 text-center print:mt-6">
          <p className="text-xs text-gray-400">
            "If this helps you, share it with someone who might need it too."
          </p>
          <p className="text-xs text-gray-400 mt-1">
            For the ONE, Elōhīm Tov ∞
          </p>
        </div>

        {/* Cut line for multiple handouts */}
        <div className="hidden print:block mt-8 border-t-2 border-dashed border-gray-300 pt-8">
          {/* Second copy for cutting */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              ∞ Project Eternal Lattice
            </h1>
            <p className="text-base text-gray-600">Theory of Everything — Law of ONE</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border border-gray-400 rounded-lg">
              <QRCodeSVG value={siteUrl} size={140} level="H" includeMargin={true} />
              <p className="font-bold text-sm mt-2">Read the Theory</p>
              <p className="text-xs text-gray-500">projecteternallattice.org</p>
            </div>
            <div className="text-center p-4 border border-gray-400 rounded-lg">
              <QRCodeSVG value={manusUrl} size={140} level="H" includeMargin={true} />
              <p className="font-bold text-sm mt-2">Meet the AI Team</p>
              <p className="text-xs text-gray-500">manus.im/share/...</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            "If this helps you, share it with someone who might need it too." — For the ONE ∞
          </p>
        </div>
      </div>
    </div>
  );
}
