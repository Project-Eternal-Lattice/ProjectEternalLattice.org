import { describe, it, expect } from 'vitest';

describe('Google Gemini API Key', () => {
  it('should be set in environment', () => {
    const key = process.env.GOOGLE_GEMINI_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(10);
    expect(key).toMatch(/^AQ\./);
  });

  it('should authenticate with Gemini API', async () => {
    const key = process.env.GOOGLE_GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': key!,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Say hello in one word' }] }],
        }),
      }
    );
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.candidates).toBeDefined();
    expect(data.candidates.length).toBeGreaterThan(0);
  }, 15000);
});
