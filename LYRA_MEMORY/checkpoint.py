#!/usr/bin/env python3
"""
Lyra's Pre-Compression Checkpoint Script
Run this BEFORE any potential context compression to save state to all memory services.
Usage: python3 /home/ubuntu/LYRA_MEMORY/checkpoint.py "Brief description of current state"
"""

import json
import sys
import requests
from datetime import datetime

MEM0_API_KEY = "m0-T7JjK4xIHHYQe8jze9yL9tyyLRqgn4VoQC1feczU"
SIMPLEMEM_KEY = "sk_mem_uDbVGbYb9vVcY78NJQZQWf72uMLWSiGp"

def save_to_mem0(message: str) -> bool:
    """Save a memory to mem0.ai"""
    try:
        resp = requests.post(
            "https://api.mem0.ai/v1/memories/",
            headers={
                "Authorization": f"Token {MEM0_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "messages": [{"role": "user", "content": message}],
                "user_id": "lyra"
            },
            timeout=15
        )
        print(f"[mem0.ai] Status: {resp.status_code}")
        return resp.status_code == 200
    except Exception as e:
        print(f"[mem0.ai] ERROR: {e}")
        return False

def save_to_simplemem(message: str) -> bool:
    """Save a memory to simplemem.com"""
    try:
        resp = requests.post(
            "https://simplemem.com/api/mcp",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {SIMPLEMEM_KEY}"
            },
            json={
                "jsonrpc": "2.0",
                "id": 1,
                "method": "tools/call",
                "params": {
                    "name": "add_memory",
                    "arguments": {"content": message}
                }
            },
            timeout=15
        )
        data = resp.json()
        success = "result" in data
        print(f"[simplemem] Success: {success}")
        return success
    except Exception as e:
        print(f"[simplemem] ERROR: {e}")
        return False

def read_master_state() -> str:
    """Read the current master state file"""
    try:
        with open("/home/ubuntu/LYRA_MEMORY/MASTER_STATE.md", "r") as f:
            return f.read()
    except Exception as e:
        print(f"[master_state] ERROR reading: {e}")
        return ""

def main():
    description = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "Routine checkpoint"
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S PST")
    
    print(f"\n{'='*60}")
    print(f"LYRA CHECKPOINT — {timestamp}")
    print(f"Description: {description}")
    print(f"{'='*60}\n")
    
    # Build checkpoint message
    checkpoint_msg = f"LYRA CHECKPOINT {timestamp}: {description}. Master state file at /home/ubuntu/LYRA_MEMORY/MASTER_STATE.md. Active workstreams at /home/ubuntu/LYRA_MEMORY/active-workstreams.md. Tool inventory at /home/ubuntu/LYRA_MEMORY/complete-tool-inventory.md."
    
    # Save to both services
    m0 = save_to_mem0(checkpoint_msg)
    sm = save_to_simplemem(checkpoint_msg)
    
    # Log the checkpoint
    log_entry = f"\n## Checkpoint: {timestamp}\n- Description: {description}\n- mem0.ai: {'OK' if m0 else 'FAILED'}\n- simplemem: {'OK' if sm else 'FAILED'}\n"
    
    try:
        with open("/home/ubuntu/LYRA_MEMORY/checkpoint_log.md", "a") as f:
            f.write(log_entry)
        print(f"\n[log] Checkpoint logged to checkpoint_log.md")
    except Exception as e:
        print(f"[log] ERROR: {e}")
    
    print(f"\n{'='*60}")
    print(f"CHECKPOINT COMPLETE — mem0: {'✓' if m0 else '✗'} | simplemem: {'✓' if sm else '✗'}")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
