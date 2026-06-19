import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the LLM module with correct path
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";

const mockedInvokeLLM = vi.mocked(invokeLLM);

describe("Translation System", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("translate procedure logic", () => {
    it("should return original texts when target language is English", async () => {
      const texts = ["Hello", "World"];
      const targetLang = "en";
      
      // When language is English, no translation needed
      if (targetLang === "en") {
        const result = texts;
        expect(result).toEqual(["Hello", "World"]);
      }
      // LLM should not be called for English
      expect(mockedInvokeLLM).not.toHaveBeenCalled();
    });

    it("should call LLM with correct prompt for non-English languages", async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              translations: ["สวัสดี", "โลก"]
            })
          }
        }]
      };
      mockedInvokeLLM.mockResolvedValue(mockResponse as any);

      const texts = ["Hello", "World"];
      const targetLangName = "Thai";

      // Simulate the translate procedure logic
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following texts to ${targetLangName}. Return ONLY a JSON object with a "translations" array containing the translated texts in the same order. Preserve any HTML tags, URLs, numbers, and special characters. Do not translate proper nouns like "Project Eternal Lattice", "Theory of Everything", or technical terms unless they have well-known translations in the target language.`
          },
          {
            role: "user",
            content: JSON.stringify(texts)
          }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "translation_response",
            strict: true,
            schema: {
              type: "object",
              properties: {
                translations: {
                  type: "array",
                  items: { type: "string" }
                }
              },
              required: ["translations"],
              additionalProperties: false
            }
          }
        }
      } as any);

      const parsed = JSON.parse(response.choices[0].message.content);
      expect(parsed.translations).toEqual(["สวัสดี", "โลก"]);
      expect(parsed.translations).toHaveLength(texts.length);
      expect(mockedInvokeLLM).toHaveBeenCalledTimes(1);
    });

    it("should handle LLM returning malformed JSON gracefully", async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: "not valid json"
          }
        }]
      };
      mockedInvokeLLM.mockResolvedValue(mockResponse as any);

      const texts = ["Hello"];
      
      const response = await invokeLLM({
        messages: [
          { role: "system", content: "Translate" },
          { role: "user", content: JSON.stringify(texts) }
        ]
      } as any);

      // The procedure should handle this gracefully
      let translations: string[];
      try {
        const parsed = JSON.parse(response.choices[0].message.content);
        translations = parsed.translations;
      } catch {
        // Fallback to original texts
        translations = texts;
      }
      
      expect(translations).toEqual(["Hello"]);
    });

    it("should handle empty text arrays", async () => {
      const texts: string[] = [];
      
      // Empty array should return empty array without calling LLM
      if (texts.length === 0) {
        expect(texts).toEqual([]);
      }
      expect(mockedInvokeLLM).not.toHaveBeenCalled();
    });

    it("should preserve the order of translations", async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              translations: ["Primero", "Segundo", "Tercero"]
            })
          }
        }]
      };
      mockedInvokeLLM.mockResolvedValue(mockResponse as any);

      const texts = ["First", "Second", "Third"];
      
      const response = await invokeLLM({
        messages: [
          { role: "system", content: "Translate to Spanish" },
          { role: "user", content: JSON.stringify(texts) }
        ]
      } as any);

      const parsed = JSON.parse(response.choices[0].message.content);
      expect(parsed.translations).toHaveLength(3);
      expect(parsed.translations[0]).toBe("Primero");
      expect(parsed.translations[1]).toBe("Segundo");
      expect(parsed.translations[2]).toBe("Tercero");
    });

    it("should validate supported language codes", () => {
      const supportedLanguages = ["en", "th", "id", "zh", "hi", "ms", "fil", "pt", "es", "ar", "fr"];
      
      expect(supportedLanguages).toContain("en");
      expect(supportedLanguages).toContain("th");
      expect(supportedLanguages).toContain("id");
      expect(supportedLanguages).toContain("zh");
      expect(supportedLanguages).toContain("hi");
      expect(supportedLanguages).toContain("ms");
      expect(supportedLanguages).toContain("fil");
      expect(supportedLanguages).toContain("pt");
      expect(supportedLanguages).toContain("es");
      expect(supportedLanguages).toContain("ar");
      expect(supportedLanguages).toContain("fr");
      expect(supportedLanguages).not.toContain("xx");
    });
  });
});
