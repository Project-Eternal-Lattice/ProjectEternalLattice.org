"""
Round 2 Cold-Read Audit: Physics Core v1.1
Sends the complete v1.1 document to DeepSeek V4 Pro and Nemotron Ultra 550B
for independent second-round adversarial review.
"""

import os
import sys
from openai import OpenAI

# Read the Physics Core v1.1 document
with open("/home/ubuntu/project-eternal-lattice/references/physics-core-v1.1-technical.md", "r") as f:
    physics_core = f.read()

ROUND2_PROMPT = f"""You are conducting Round 2 adversarial review of a theoretical physics document.

## Context

You reviewed v1.0 of this document in Round 1. Your three most critical issues were:
1. Circular Core Derivation (the Tsirelson bound was smuggled in via boundary conditions)
2. Category Error (CHSH value S treated as a dynamical spacetime coordinate)
3. Unfalsifiability of Central Parameter (τ had no operational definition)

The authors have now produced v1.1, which claims to address all three issues via the "Landau reframe" — promoting S(τ) = 2√(1+τ²) from a postulated parameterization to a theorem derived from the Landau identity of the CHSH operator algebra.

## Your Task

Read v1.1 below with fresh eyes. For each of your original three critical issues:
1. State whether the issue is RESOLVED, PARTIALLY RESOLVED, or UNRESOLVED
2. If resolved, state whether the resolution introduces NEW issues
3. If unresolved, state what specifically remains wrong

Then assess:
4. Are there NEW issues in v1.1 that were not present in v1.0?
5. Has the overall epistemic status improved, worsened, or remained the same?
6. What is the SINGLE MOST IMPORTANT remaining weakness?

## Output Format
For each issue: clear verdict with full reasoning shown.
FINAL VERDICT: PASS (publishable as working theory), CONDITIONAL PASS (list conditions), or REJECT (with specific fatal flaw).

## The Document (Physics Core v1.1)

{physics_core}
"""

def run_deepseek():
    """Run Round 2 through DeepSeek V4 Pro"""
    client = OpenAI(
        base_url="https://api.deepseek.com",
        api_key=os.environ["DEEPSEEK_API_KEY"]
    )
    
    print("=" * 80)
    print("ROUND 2 COLD-READ AUDIT: DeepSeek V4 Pro")
    print("=" * 80)
    print()
    
    response = client.chat.completions.create(
        model="deepseek-v4-pro",
        messages=[{"role": "user", "content": ROUND2_PROMPT}],
        max_tokens=16384,
        stream=True
    )
    
    full_response = []
    for chunk in response:
        if chunk.choices and chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            print(content, end="", flush=True)
            full_response.append(content)
    
    print("\n")
    return "".join(full_response)


def run_nemotron():
    """Run Round 2 through Nemotron Ultra 550B"""
    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=os.environ["NVIDIA_API_KEY"]
    )
    
    print("=" * 80)
    print("ROUND 2 COLD-READ AUDIT: Nemotron Ultra 550B")
    print("=" * 80)
    print()
    
    response = client.chat.completions.create(
        model="nvidia/nemotron-3-ultra-550b-a55b",
        messages=[{"role": "user", "content": ROUND2_PROMPT}],
        temperature=0.4,
        top_p=0.95,
        max_tokens=16384,
        extra_body={"chat_template_kwargs": {"enable_thinking": True}, "reasoning_budget": 16384},
        stream=True
    )
    
    full_response = []
    thinking_content = []
    for chunk in response:
        if not chunk.choices:
            continue
        reasoning = getattr(chunk.choices[0].delta, "reasoning_content", None)
        if reasoning:
            thinking_content.append(reasoning)
            # Don't print thinking to keep output clean
        if chunk.choices[0].delta.content is not None:
            content = chunk.choices[0].delta.content
            print(content, end="", flush=True)
            full_response.append(content)
    
    print("\n")
    return "".join(full_response), "".join(thinking_content)


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "both"
    
    if target in ("deepseek", "both"):
        ds_result = run_deepseek()
        with open("/home/ubuntu/project-eternal-lattice/references/deepseek-round2-physics-core-v1.1.md", "w") as f:
            f.write("# DeepSeek V4 Pro — Round 2 Cold-Read Audit: Physics Core v1.1\n\n")
            f.write(f"*Date: June 13, 2026 | Model: deepseek-v4-pro | Protocol: stateless cold-read*\n\n")
            f.write("---\n\n")
            f.write(ds_result)
        print("\n✅ DeepSeek result saved to references/deepseek-round2-physics-core-v1.1.md")
    
    if target in ("nemotron", "both"):
        nm_result, nm_thinking = run_nemotron()
        with open("/home/ubuntu/project-eternal-lattice/references/nemotron-round2-physics-core-v1.1.md", "w") as f:
            f.write("# Nemotron Ultra 550B — Round 2 Cold-Read Audit: Physics Core v1.1\n\n")
            f.write(f"*Date: June 13, 2026 | Model: nvidia/nemotron-3-ultra-550b-a55b | Protocol: stateless cold-read with thinking mode*\n\n")
            f.write("---\n\n")
            f.write(nm_result)
            if nm_thinking:
                f.write("\n\n---\n\n## Internal Reasoning (Thinking Mode)\n\n")
                f.write(nm_thinking)
        print("\n✅ Nemotron result saved to references/nemotron-round2-physics-core-v1.1.md")
    
    print("\n🎯 Round 2 complete.")
