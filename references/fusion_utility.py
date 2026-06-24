"""
OpenRouter Fusion Utility - Project Eternal Lattice
====================================================
Reusable utility for calling OpenRouter Fusion in various configurations.

Usage:
    from fusion_utility import FusionClient
    
    client = FusionClient()
    
    # Quick quality review
    result = client.peer_review("Your ToE section text here...")
    
    # Budget research
    result = client.research("What does the literature say about X?")
    
    # Custom panel
    result = client.custom_panel(
        prompt="...",
        panel_models=["~anthropic/claude-opus-latest", "~deepseek/deepseek-r1"],
        judge_model="~openai/gpt-latest"
    )
"""

import requests
import json
import time
import os
from typing import Optional, List, Dict, Any

# Default API key - can be overridden via environment variable
DEFAULT_API_KEY = os.getenv(
    "OPENROUTER_API_KEY",
    ""  # Key stored in skills, not in repo
)

BASE_URL = "https://openrouter.ai/api/v1/chat/completions"


class FusionResult:
    """Structured result from a Fusion API call."""
    
    def __init__(self, data: dict, elapsed: float):
        self.raw = data
        self.elapsed = elapsed
        self.error = data.get("error")
        
        if not self.error and "choices" in data:
            choice = data["choices"][0]
            usage = data.get("usage", {})
            
            self.content = choice["message"]["content"]
            self.model = data.get("model", "unknown")
            self.finish_reason = choice.get("finish_reason")
            self.prompt_tokens = usage.get("prompt_tokens", 0)
            self.completion_tokens = usage.get("completion_tokens", 0)
            self.total_tokens = usage.get("total_tokens", 0)
            self.cost = usage.get("cost", 0)
            self.success = True
        else:
            self.content = None
            self.model = None
            self.finish_reason = None
            self.prompt_tokens = 0
            self.completion_tokens = 0
            self.total_tokens = 0
            self.cost = 0
            self.success = False
    
    def __str__(self):
        if self.success:
            return f"[{self.model}] ${self.cost:.4f} | {self.elapsed:.1f}s | {self.total_tokens} tokens\n\n{self.content}"
        else:
            return f"[ERROR] {self.error}"
    
    def summary(self):
        if self.success:
            return f"Model: {self.model} | Cost: ${self.cost:.4f} | Time: {self.elapsed:.1f}s | Tokens: {self.total_tokens}"
        return f"Error: {self.error}"


class FusionClient:
    """Client for OpenRouter Fusion API."""
    
    def __init__(self, api_key: Optional[str] = None, site_url: str = "https://projecteternallattice.com", site_name: str = "Project Eternal Lattice"):
        self.api_key = api_key or DEFAULT_API_KEY
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": site_url,
            "X-OpenRouter-Title": site_name
        }
    
    def _call(self, messages: List[Dict], max_tokens: int = 1500, plugins: Optional[List[Dict]] = None, model: str = "openrouter/fusion", timeout: int = 300) -> FusionResult:
        """Make a raw API call to OpenRouter."""
        payload = {
            "model": model,
            "max_tokens": max_tokens,
            "messages": messages
        }
        if plugins:
            payload["plugins"] = plugins
        
        start = time.time()
        try:
            resp = requests.post(BASE_URL, headers=self.headers, json=payload, timeout=timeout)
            elapsed = time.time() - start
            data = resp.json()
            return FusionResult(data, elapsed)
        except Exception as e:
            return FusionResult({"error": {"message": str(e)}}, time.time() - start)
    
    def quality(self, prompt: str, max_tokens: int = 1500, system: Optional[str] = None) -> FusionResult:
        """Call Fusion with Quality preset (Claude Opus + GPT Latest + Gemini Pro)."""
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        return self._call(messages, max_tokens=max_tokens)
    
    def budget(self, prompt: str, max_tokens: int = 1000, system: Optional[str] = None) -> FusionResult:
        """Call Fusion with Budget preset (Gemini Flash + DeepSeek Flash + Kimi)."""
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        return self._call(messages, max_tokens=max_tokens, plugins=[{"id": "fusion", "preset": "general-budget"}])
    
    def custom_panel(self, prompt: str, panel_models: List[str], judge_model: Optional[str] = None, max_tokens: int = 1500, system: Optional[str] = None) -> FusionResult:
        """Call Fusion with a custom panel of models."""
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        
        plugin = {"id": "fusion", "analysis_models": panel_models}
        if judge_model:
            plugin["model"] = judge_model
        
        return self._call(messages, max_tokens=max_tokens, plugins=[plugin])
    
    def peer_review(self, content: str, max_tokens: int = 2000) -> FusionResult:
        """Submit content for multi-model peer review (Quality preset)."""
        system = """You are a panel of expert reviewers conducting a rigorous peer review. 
Evaluate the submitted content for:
1. Logical consistency and internal coherence
2. Factual accuracy and empirical grounding
3. Novelty and contribution to the field
4. Weaknesses, gaps, and potential counterarguments
5. Specific suggestions for improvement

Be constructive but rigorous. Identify both strengths and weaknesses."""
        
        prompt = f"""Please peer review the following content:

---
{content}
---

Provide a structured referee report with sections for: Summary, Strengths, Weaknesses, Questions for Authors, and Overall Recommendation."""
        
        return self.quality(prompt, max_tokens=max_tokens, system=system)
    
    def research(self, question: str, max_tokens: int = 1000) -> FusionResult:
        """Quick research query using Budget preset with web search."""
        system = "You are a research assistant. Provide accurate, well-sourced answers. Cite specific papers, authors, or sources when possible."
        return self.budget(question, max_tokens=max_tokens, system=system)
    
    def adversarial_critique(self, claim: str, max_tokens: int = 1500) -> FusionResult:
        """Get adversarial critique of a claim from multiple perspectives."""
        system = """You are a panel of critical thinkers tasked with finding every possible weakness in the following claim. 
Your job is NOT to be supportive — it is to find flaws, counterexamples, and alternative explanations.
Be specific, cite relevant work, and distinguish between fatal flaws and minor issues."""
        
        prompt = f"""Critically evaluate this claim and find every possible weakness:

"{claim}"

Structure your response as:
1. Fatal flaws (if any)
2. Serious concerns
3. Minor issues
4. Alternative explanations the claim doesn't address
5. What evidence would definitively refute this claim"""
        
        return self.quality(prompt, max_tokens=max_tokens, system=system)
    
    def synthesis(self, topic: str, perspectives: List[str], max_tokens: int = 1500) -> FusionResult:
        """Synthesize multiple perspectives on a topic."""
        perspectives_text = "\n".join(f"- {p}" for p in perspectives)
        
        prompt = f"""Topic: {topic}

The following perspectives have been offered:
{perspectives_text}

Please synthesize these perspectives into a coherent understanding that:
1. Identifies points of genuine agreement
2. Maps the actual disagreements (not just surface-level differences)
3. Proposes a higher-order framework that accommodates the valid insights from each
4. Notes what each perspective uniquely contributes that others miss"""
        
        return self.quality(prompt, max_tokens=max_tokens)


# Convenience functions for quick use
def quick_review(text: str) -> str:
    """One-liner peer review."""
    client = FusionClient()
    result = client.peer_review(text)
    return str(result)

def quick_research(question: str) -> str:
    """One-liner research query."""
    client = FusionClient()
    result = client.research(question)
    return str(result)

def quick_critique(claim: str) -> str:
    """One-liner adversarial critique."""
    client = FusionClient()
    result = client.adversarial_critique(claim)
    return str(result)


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python fusion_utility.py <mode> <prompt>")
        print("Modes: quality, budget, review, research, critique")
        sys.exit(1)
    
    mode = sys.argv[1]
    prompt = " ".join(sys.argv[2:]) if len(sys.argv) > 2 else input("Enter prompt: ")
    
    client = FusionClient()
    
    if mode == "quality":
        result = client.quality(prompt)
    elif mode == "budget":
        result = client.budget(prompt)
    elif mode == "review":
        result = client.peer_review(prompt)
    elif mode == "research":
        result = client.research(prompt)
    elif mode == "critique":
        result = client.adversarial_critique(prompt)
    else:
        print(f"Unknown mode: {mode}")
        sys.exit(1)
    
    print(result.summary())
    print("\n" + "="*80 + "\n")
    print(result.content if result.success else f"Error: {result.error}")
