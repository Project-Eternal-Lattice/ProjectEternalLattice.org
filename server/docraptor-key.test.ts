import { describe, it, expect } from "vitest";

describe("DocRaptor API Key", () => {
  it("should be set in environment", () => {
    const key = process.env.DOCRAPTOR_API_KEY;
    expect(key).toBeDefined();
    expect(key!.length).toBeGreaterThan(5);
  });

  it("should authenticate with DocRaptor API", async () => {
    const key = process.env.DOCRAPTOR_API_KEY;
    // Use test mode to validate the key without consuming credits
    const response = await fetch("https://docraptor.com/docs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_credentials: key,
        doc: {
          document_content: "<html><body><h1>Test</h1></body></html>",
          type: "pdf",
          name: "test.pdf",
          test: true,
        },
      }),
    });
    // 200 = success (returns PDF bytes), anything else = auth failure
    expect(response.status).toBe(200);
  });
});
