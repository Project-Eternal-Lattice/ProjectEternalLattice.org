# Gemini Interactions API — Key Capabilities

*Source: https://ai.google.dev/gemini-api/docs/interactions/interactions-overview*
*Date: June 13, 2026*

---

## What It Is

The **Interactions API** is Google's new recommended standard for building with Gemini. It replaces `generateContent` as the primary interface for agentic workflows.

## Key Features

### 1. Server-Side State Management
- Multi-turn via `previous_interaction_id` — no need to resend full history
- Server stores state by default (`store=true`)
- Can opt into stateless with `store=false`

### 2. Observable Execution Steps
- Typed steps: thoughts, search queries, function calls, model output
- Easy to debug and render UI for intermediate events
- Access via `interaction.steps` for full timeline

### 3. Background Execution
- `background=true` for long-running tasks
- Returns immediately with `in_progress` status
- Poll with `interactions.get(id)` or use webhooks
- Required for Deep Research Agent

### 4. Built-in Tools (server-side, no function calling needed)
- **Google Search** — grounded search
- **Google Maps** — maps grounding
- **Code Execution** — sandboxed Python
- **URL Context** — fetch and process URLs
- **Computer Use** — browser automation (not on 3.5 Flash yet)
- **File Search** — search uploaded files

### 5. Deep Research Agent
- Autonomous multi-step research
- Runs in background mode
- Produces cited reports

### 6. Thinking Levels
- `thinking_level`: "low", "medium", "high"
- Controls reasoning depth/token budget

## SDK Convenience Properties

| Property | Returns |
|----------|---------|
| `interaction.output_text` | Final text response |
| `interaction.output_image` | Last generated image |
| `interaction.output_audio` | Last generated audio |

## Model Intelligence Hierarchy (per Ken's note)

> **Gemini 3.5 Flash on thinking_level="high" beats 3.1 Pro.** Use 3.5 Flash as the default for serious reasoning.

## Key Model Specs (from official docs)

### Gemini 3.5 Flash (GA, Stable) — OUR PRIMARY
- Most intelligent Flash model, sustained frontier performance
- 1M context, 65k output
- Agentic execution, coding, multi-step reasoning
- Supports: Search grounding, Code execution, URL context, File search, Function calling, Thinking, Structured output, Caching, Batch, Flex/Priority inference
- Does NOT support: Computer Use (yet), Image gen, Audio gen, Live API

### Gemini 3.1 Pro Preview — SECONDARY
- Better thinking, improved token efficiency, factually consistent
- 1M context, 65k output
- Optimized for software engineering + agentic workflows
- Has `gemini-3.1-pro-preview-customtools` variant (better at prioritizing custom tools + bash)
- Supports: Everything 3.5 Flash does + Caching + Maps grounding
- Does NOT support: Image gen, Audio gen, Live API
- Knowledge cutoff: January 2025

### Nano Banana 2 (`gemini-3.1-flash-image`) — IMAGE GEN
- High-efficiency production-scale image gen
- Supports 0.5K, 1K (default), 2K, 4K output resolution
- Aspect ratios: 1:1, 4:3, 3:4, 16:9, 9:16, 1:4, 4:1, 1:8, 8:1
- Image Search Grounding (uses web data to inform generation)
- Conversational editing
- 131K input, 32K output tokens
- Supports: Thinking, Search grounding, Batch

### Nano Banana Pro (`gemini-3-pro-image`) — PRO IMAGE GEN
- Studio-quality 4K, complex layouts, precise text rendering
- Reasoning-driven engine for professional graphic design
- Real-world grounding via Google Search
- 65K input, 32K output tokens
- Supports: Thinking, Search grounding, Structured output, Batch, Flex/Priority

### Deep Research Max (`deep-research-max-preview-04-2026`) — AGENT
- Autonomous multi-step research across hundreds of sources
- Produces cited, interactive reports
- Supports: Collaborative planning, visualization, MCP servers, File Search
- 1M context, 65K output
- Input: Text, Image, PDF, Audio, Video
- Must use `agent=` field, `background=True`, `store=True`

### Antigravity Agent (`antigravity-preview-05-2026`) — AGENT
- General-purpose managed agent
- Plans, reasons, runs code, manages files, browses web
- Secure isolated Linux sandbox hosted by Google
- 1M context (compacted at ~135K), 65K output
- Requires `environment` field (format TBD)
- Must use `agent=` field

### Lyria 3 Pro Preview — MUSIC
- Full-length songs with structural coherence (verses, choruses, bridges)
- 48kHz stereo audio from text or image prompts
- Also outputs lyrics as text
- Model IDs: `lyria-3-pro-preview` (full songs), `lyria-3-clip-preview` (30s clips)

### Lyria RealTime Experimental — LIVE MUSIC
- Real-time musical synthesis, 48kHz stereo
- Weighted text prompts for control
- Max 2 second control latency
- No vocals, instrumental only
- AI-assisted songwriting, creative audio workflows

## Other Capabilities (from nav)
- **Lyria 3** — Music generation
- **Lyria RealTime** — Real-time music
- **Veo** — Video generation
- **Text-to-Speech** — Speech generation
- **Robotics** — Robot control
- **Antigravity Agent** — ???

## Usage Patterns

### Stateless (our typical use)
```python
from google import genai
import os
os.environ["GOOGLE_API_KEY"] = "[STORED IN SKILLS]"

client = genai.Client()
interaction = client.interactions.create(
    model="gemini-3.5-flash",
    input="YOUR PROMPT",
    generation_config={"thinking_level": "high"},
    store=False  # stateless
)
print(interaction.output_text)
```

### Multi-turn (stateful)
```python
# Turn 1
i1 = client.interactions.create(model="gemini-3.5-flash", input="What is X?")
# Turn 2 — server remembers context
i2 = client.interactions.create(
    model="gemini-3.5-flash",
    input="Now explain it differently",
    previous_interaction_id=i1.id
)
```

### With Google Search grounding
```python
interaction = client.interactions.create(
    model="gemini-3.5-flash",
    input="What are the latest findings on quantum entanglement?",
    tools=["google_search"]
)
```

### Background (Deep Research)
```python
interaction = client.interactions.create(
    model="gemini-3.5-flash",  # or deep research agent
    input="Research the super-quantum baseline problem in consciousness studies",
    background=True,
    store=True
)
# Poll for completion
result = client.interactions.get(interaction.id)
```

## Implications for Our Project

1. **Deep Research Agent** — Could dispatch autonomous research tasks (like O5, O8) to Gemini's Deep Research
2. **Google Search grounding** — Get cited, grounded answers without needing Tavily/Google Custom Search API
3. **Multi-turn with state** — Could run extended dialogues with Gemini 3.1 Pro for complex reasoning chains
4. **Background execution** — Fire-and-forget research tasks, poll for results
5. **Code execution** — Let Gemini run Python to verify our math independently
6. **URL Context** — Feed it our papers/references directly via URL

This is significantly more powerful than just a chat API. It's essentially a programmable research agent.
