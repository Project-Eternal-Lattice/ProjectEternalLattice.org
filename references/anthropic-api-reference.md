# Anthropic API Reference (Consolidated)

## Key Model IDs (June 2026)

| Model | ID | Notes |
|-------|-----|-------|
| Claude Fable 5 | `claude-fable-5` | Best for hardest knowledge work (currently DOWN) |
| Claude Mythos 5 | `claude-mythos-5` | Cybersecurity and biology research |
| Claude Opus 4.8 | `claude-opus-4-8` | Frontier intelligence, long-running agents |
| Claude Opus 4.7 | `claude-opus-4-7` | Frontier intelligence, agents |
| Claude Opus 4.6 | `claude-opus-4-6` | Most intelligent for agents/coding |
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | Best speed/intelligence combo |
| Claude Haiku 4.5 | `claude-haiku-4-5` | Fastest, near-frontier |

## Extended Thinking

- **Fable 5 & Mythos 5:** Adaptive thinking ALWAYS on, cannot disable. No manual budget_tokens.
- **Opus 4.8 & 4.7:** Use `thinking: {"type": "adaptive"}`. Manual budget_tokens NOT supported (400 error).
- **Opus 4.6 & Sonnet 4.6:** Adaptive recommended. Manual `type: "enabled"` deprecated but functional.
- **Effort parameter:** Controls thinking depth with adaptive thinking.
- **Summarized thinking:** Default on Claude 4 models. On Fable 5/Mythos 5/Opus 4.8/4.7, display defaults to "omitted" — set `display: "summarized"` explicitly.

## Messages API Key Parameters

- `max_tokens: int` — Max tokens to generate
- `messages: List[MessageParam]` — Alternating user/assistant turns
- `model: str` — Model ID
- `system: str` — System prompt (top-level, not in messages)
- `thinking: object` — Extended thinking config
- `tools: list` — Tool definitions

## Web Search Tool

```python
tools=[{"type": "web_search_20260209", "name": "web_search"}]  # With dynamic filtering
tools=[{"type": "web_search_20250305", "name": "web_search", "max_uses": 5}]  # Basic
```

Options: `max_uses`, `allowed_domains`, `blocked_domains`, `user_location`

## Code Execution Tool

```python
tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
```

- Free when used with web_search or web_fetch
- Supports Bash commands and file operations
- `code_execution_20260120` adds REPL state persistence

## Managed Agents API

- Beta header: `managed-agents-2026-04-01`
- Create agents, sessions, environments
- Tools: bash, edit, read, write, glob, grep, web_fetch, web_search
- Memory stores: read_write or read_only
- Multi-agent: coordinator topology with session threads
- Vaults: stored credentials
- Speed modes: standard, fast

## Vision

- Max 100 images per API request (200k context), 600 for other models
- Max 8000x8000 px per image, 10MB per image
- Supported: JPEG, PNG, GIF, WebP
- High-res on Opus 4.7+: up to 2576px long edge, 4784 visual tokens

## For Our Peer Review Script

Use simple Messages API:
```python
import anthropic
client = anthropic.Anthropic(api_key="...")
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=4096,
    messages=[{"role": "user", "content": "..."}]
)
# Response: response.content[0].text
```
