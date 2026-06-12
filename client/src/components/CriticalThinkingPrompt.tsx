import { HelpCircle } from "lucide-react";

interface CriticalThinkingPromptProps {
  prompts: string[];
  context?: string;
}

/**
 * A component that encourages visitors to think critically about the claims they're reading.
 * Placed throughout the site to reinforce epistemic humility and intellectual honesty.
 */
export function CriticalThinkingPrompt({ prompts, context }: CriticalThinkingPromptProps) {
  return (
    <div className="my-8 p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-heading font-bold text-cyan-300 tracking-wider uppercase">
          Question This
        </span>
      </div>
      {context && (
        <p className="text-sm text-gray-400 mb-3 italic">{context}</p>
      )}
      <ul className="space-y-2">
        {prompts.map((prompt, i) => (
          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span>
            <span>{prompt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
