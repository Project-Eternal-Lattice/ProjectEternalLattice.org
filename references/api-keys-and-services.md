# API Keys and Services — Project Eternal Lattice

**Last Updated:** July 5, 2026

---

## Active MCP Servers (via manus-mcp-cli)

| Service | MCP Server Name | Status |
|---------|----------------|--------|
| Higgsfield | `higgsfield-mcp` + `higgsfield` | Enabled |
| HeyGen | `heygen-mcp` | Enabled |
| Firecrawl | `firecrawl` | Available |
| Linear | `linear` | Available |
| Slack | `slack` | Available |
| Notion | `notion` | Available |
| Wolfram | `wolfram` | Available |
| Playwright | `playwright` | Available |
| Zapier | `zapier` | Available |
| Hugging Face | `hugging-face` | Available |

## Active API Connectors

| Service | UID | Status |
|---------|-----|--------|
| ElevenLabs API | `23181678-c628-4c53-9a77-36778a36bbe5` | Enabled |
| HeyGen API | `062ba883-f91d-46f2-b1d1-864924865703` | Enabled |
| HeyGen MCP | `c915e022-9d53-42c1-8485-5bdaaff13eb2` | Enabled |
| Higgsfield | `f35bac78-47bf-475d-bb9d-0d5d39b1a0e5` | Enabled |
| Higgsfield MCP | `81e957f4-f50b-4ded-872c-7198d04cfd36` | Enabled |

## Standalone API Keys

> **SECURITY:** Keys are stored in environment variables or local skill files only.
> Never commit plaintext keys to this repository.

| Service | Key Location | Purpose |
|---------|-------------|---------|
| Google Gemini | `GOOGLE_GEMINI_API_KEY` env var | Gemini API (Flash, Pro, etc.) |
| SyncLabs | Stored in skills (local only) | Video lip-sync/generation |
| OpenRouter | Stored in skills (local only) | Multi-model API (Musketeers) |
| Devin (Cognition) | Stored in skills (local only) | AI coding teammate |

## Capabilities Summary

- **ElevenLabs:** Voice generation, cloning, transcription (TTS/STT)
- **HeyGen:** AI avatar videos, realistic talking-head generation
- **Higgsfield:** Cinematic image/video generation, character-consistent assets
- **SyncLabs:** Video lip-sync (match audio to video faces)
- **OpenRouter:** 340+ LLM models (Musketeer consultations)
- **Devin:** Autonomous AI software engineer

---

## Notes

- ElevenLabs App connector (uid: 9effa626) exists but is DISABLED (API version is active instead)
- HeyGen App connector (uid: c183add9) exists but is DISABLED (API + MCP versions are active)
- Higgsfield appears twice in MCP server list — both `higgsfield-mcp` and `higgsfield` are available
