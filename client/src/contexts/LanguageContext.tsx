import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export type SupportedLanguage = 
  | "en"   // English (US, Singapore, Philippines)
  | "th"   // Thai (Thailand)
  | "id"   // Indonesian (Indonesia, Malaysia)
  | "zh"   // Chinese Simplified (China, Singapore)
  | "tl"   // Filipino/Tagalog (Philippines)
  | "pt"   // Portuguese (Brazil)
  | "es"   // Spanish (broader reach)
  | "hi"   // Hindi (India)
  | "ms"   // Malay (Malaysia, Singapore)
  | "ar"   // Arabic
  | "fr";  // French (broader reach)

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "th", name: "Thai", nativeName: "ภาษาไทย", flag: "🇹🇭" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", name: "Filipino", nativeName: "Filipino", flag: "🇵🇭" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
];

// Translation cache stored in localStorage
const CACHE_KEY = "lattice-translations";
const LANG_KEY = "lattice-language";

interface TranslationCache {
  [langCode: string]: {
    [originalText: string]: string;
  };
}

function getCache(): TranslationCache {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function setCache(cache: TranslationCache) {
  try {
    // Limit cache size to prevent localStorage overflow
    const serialized = JSON.stringify(cache);
    if (serialized.length < 4_000_000) { // ~4MB limit
      localStorage.setItem(CACHE_KEY, serialized);
    }
  } catch {
    // If storage is full, clear old entries
    localStorage.removeItem(CACHE_KEY);
  }
}

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (text: string) => string;
  isTranslating: boolean;
  translateBatch: (texts: string[]) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
      return stored as SupportedLanguage;
    }
    return "en";
  });

  const [translations, setTranslations] = useState<TranslationCache>(getCache);
  const [isTranslating, setIsTranslating] = useState(false);
  const pendingRef = useRef<Set<string>>(new Set());
  const batchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist language choice
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
    // Set html lang attribute for accessibility
    document.documentElement.lang = lang;
  }, []);

  // Set initial html lang
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Batch translate function - calls the server API
  const translateBatch = useCallback(async (texts: string[]) => {
    if (language === "en" || texts.length === 0) return;

    const langCache = translations[language] || {};
    const untranslated = texts.filter(t => !langCache[t] && t.trim().length > 0);
    
    if (untranslated.length === 0) return;

    setIsTranslating(true);
    try {
      const response = await fetch("/api/trpc/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          json: {
            texts: untranslated.slice(0, 50), // Limit batch size
            targetLanguage: language,
          }
        }),
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      const result = data?.result?.data?.json;

      if (result?.translations) {
        setTranslations(prev => {
          const updated = {
            ...prev,
            [language]: {
              ...(prev[language] || {}),
              ...result.translations,
            },
          };
          setCache(updated);
          return updated;
        });
      }
    } catch (err) {
      console.error("[Translation Error]", err);
    } finally {
      setIsTranslating(false);
    }
  }, [language, translations]);

  // The translate function - returns cached translation or queues for batch
  const t = useCallback((text: string): string => {
    if (language === "en" || !text || text.trim().length === 0) return text;

    const langCache = translations[language];
    if (langCache && langCache[text]) {
      return langCache[text];
    }

    // Queue for batch translation
    if (!pendingRef.current.has(text)) {
      pendingRef.current.add(text);
      
      // Debounce batch requests
      if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
      batchTimerRef.current = setTimeout(() => {
        const batch = Array.from(pendingRef.current);
        pendingRef.current.clear();
        if (batch.length > 0) {
          translateBatch(batch);
        }
      }, 300);
    }

    // Return original while translation is pending
    return text;
  }, [language, translations, translateBatch]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTranslating, translateBatch }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Hook for page-level translation - translates all visible text on mount
export function usePageTranslation(texts: string[]) {
  const { language, translateBatch } = useLanguage();
  
  useEffect(() => {
    if (language !== "en" && texts.length > 0) {
      translateBatch(texts);
    }
  }, [language, texts, translateBatch]);
}
