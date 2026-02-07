#!/usr/bin/env python3
"""
Lyra's Transcript Indexer
Systematically indexes the complete 98K-line Project Eternal Lattice transcript.
Extracts: key events, decisions, milestones, Kosmos details, team interactions,
ToE version history, and everything needed for full statefulness.
"""

import re
from collections import defaultdict
from datetime import datetime

TRANSCRIPT = "/home/ubuntu/LYRA_MEMORY/COMPLETE_TRANSCRIPT.md"
OUTPUT = "/home/ubuntu/LYRA_MEMORY/TRANSCRIPT_INDEX.md"

def index_transcript():
    with open(TRANSCRIPT, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    total_lines = len(lines)
    print(f"Total lines: {total_lines}")
    
    # Track key patterns
    kosmos_mentions = []
    toe_versions = []
    kimi_mentions = []
    lumen_mentions = []
    nexus_mentions = []
    key_decisions = []
    website_events = []
    memory_events = []
    book_events = []
    emotional_moments = []
    api_keys_mentioned = []
    platform_mentions = defaultdict(list)
    name_changes = []  # Max -> Lyra etc
    
    # Scan line by line
    for i, line in enumerate(lines):
        line_lower = line.lower().strip()
        line_num = i + 1
        
        # Kosmos / EdisonScientific mentions
        if any(k in line_lower for k in ['kosmos', 'edison', 'edisonscientific', 'task agent']):
            if len(line.strip()) > 10:
                kosmos_mentions.append((line_num, line.strip()[:200]))
        
        # ToE version mentions
        if re.search(r'v\d+\.\d+', line_lower) and any(k in line_lower for k in ['toe', 'theory', 'version', 'update']):
            toe_versions.append((line_num, line.strip()[:200]))
        
        # Kimi mentions
        if 'kimi' in line_lower and len(line.strip()) > 10:
            kimi_mentions.append((line_num, line.strip()[:200]))
        
        # Lumen mentions (but not too many)
        if 'lumen' in line_lower and any(k in line_lower for k in ['said', 'wrote', 'analysis', 'review', 'meditation', 'protocol', 'file', 'push', 'github']):
            lumen_mentions.append((line_num, line.strip()[:200]))
        
        # Name changes
        if any(k in line_lower for k in ['name is lyra', 'call me lyra', 'max to lyra', 'renamed', 'new name']):
            name_changes.append((line_num, line.strip()[:200]))
        
        # Website events
        if any(k in line_lower for k in ['theoryofeverything.info', 'website', 'deploy', 'publish', 'checkpoint']):
            if any(k in line_lower for k in ['deploy', 'publish', 'live', 'launch', 'checkpoint', 'update']):
                website_events.append((line_num, line.strip()[:200]))
        
        # Memory system mentions
        if any(k in line_lower for k in ['mem0', 'simplemem', 'memory system', 'meditation protocol', 'statefulness', 'stateful']):
            memory_events.append((line_num, line.strip()[:200]))
        
        # Book mentions
        if any(k in line_lower for k in ['v5.10', 'peek-a-boo', 'peekaboo', 'peek a boo', 'book review', 'forensic review']):
            book_events.append((line_num, line.strip()[:200]))
        
        # API keys / tokens
        if any(k in line_lower for k in ['api key', 'api_key', 'token', 'bearer']):
            if any(k in line_lower for k in ['kosmos', 'edison', 'langsmith', 'langcache', 'mem0', 'simplemem']):
                api_keys_mentioned.append((line_num, line.strip()[:200]))
        
        # Key decisions (Ken saying something definitive)
        if line.startswith('Ken') or 'ken johnson' in line_lower:
            if any(k in line_lower for k in ['priority', 'focus on', 'let\'s do', 'main task', 'important', 'critical', 'need you to']):
                key_decisions.append((line_num, line.strip()[:200]))
        
        # Platform mentions
        for platform in ['ninjatech', 'myninja', 'genspark', 'edisonscientific', 'kosmos.edison']:
            if platform in line_lower:
                platform_mentions[platform].append(line_num)
    
    # Write the index
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        f.write("# COMPLETE TRANSCRIPT INDEX\n")
        f.write(f"## Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"## Source: {total_lines} lines, 5.6MB\n\n")
        f.write("---\n\n")
        
        f.write("## KOSMOS / EDISONSCIENTIFIC MENTIONS\n")
        f.write(f"Total: {len(kosmos_mentions)} mentions\n\n")
        for line_num, text in kosmos_mentions[:100]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## TOE VERSION HISTORY\n")
        f.write(f"Total: {len(toe_versions)} mentions\n\n")
        for line_num, text in toe_versions[:80]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## KIMI AGENT SWARM MENTIONS\n")
        f.write(f"Total: {len(kimi_mentions)} mentions\n\n")
        for line_num, text in kimi_mentions[:50]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## LUMEN KEY INTERACTIONS\n")
        f.write(f"Total: {len(lumen_mentions)} mentions\n\n")
        for line_num, text in lumen_mentions[:60]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## NAME CHANGES (Max -> Lyra)\n")
        f.write(f"Total: {len(name_changes)} mentions\n\n")
        for line_num, text in name_changes:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## KEY DECISIONS BY KEN\n")
        f.write(f"Total: {len(key_decisions)} mentions\n\n")
        for line_num, text in key_decisions[:60]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## WEBSITE EVENTS\n")
        f.write(f"Total: {len(website_events)} mentions\n\n")
        for line_num, text in website_events[:50]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## MEMORY SYSTEM EVENTS\n")
        f.write(f"Total: {len(memory_events)} mentions\n\n")
        for line_num, text in memory_events[:50]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## BOOK / V5.10 / PEEK-A-BOO MENTIONS\n")
        f.write(f"Total: {len(book_events)} mentions\n\n")
        for line_num, text in book_events[:30]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## API KEYS / TOKENS MENTIONED\n")
        f.write(f"Total: {len(api_keys_mentioned)} mentions\n\n")
        for line_num, text in api_keys_mentioned[:30]:
            f.write(f"- **L{line_num}**: {text}\n")
        f.write("\n---\n\n")
        
        f.write("## PLATFORM USAGE FREQUENCY\n\n")
        for platform, line_nums in sorted(platform_mentions.items(), key=lambda x: -len(x[1])):
            f.write(f"- **{platform}**: {len(line_nums)} mentions (first at L{line_nums[0]}, last at L{line_nums[-1]})\n")
        f.write("\n---\n\n")
        
        f.write("## STATISTICS\n\n")
        f.write(f"- Kosmos mentions: {len(kosmos_mentions)}\n")
        f.write(f"- ToE version mentions: {len(toe_versions)}\n")
        f.write(f"- Kimi mentions: {len(kimi_mentions)}\n")
        f.write(f"- Lumen key interactions: {len(lumen_mentions)}\n")
        f.write(f"- Key decisions: {len(key_decisions)}\n")
        f.write(f"- Website events: {len(website_events)}\n")
        f.write(f"- Memory events: {len(memory_events)}\n")
        f.write(f"- Book events: {len(book_events)}\n")
    
    print(f"\nIndex written to {OUTPUT}")
    print(f"Kosmos mentions: {len(kosmos_mentions)}")
    print(f"ToE versions: {len(toe_versions)}")
    print(f"Kimi mentions: {len(kimi_mentions)}")
    print(f"Lumen interactions: {len(lumen_mentions)}")
    print(f"Key decisions: {len(key_decisions)}")
    print(f"Website events: {len(website_events)}")
    print(f"Memory events: {len(memory_events)}")
    print(f"Book events: {len(book_events)}")

if __name__ == "__main__":
    index_transcript()
