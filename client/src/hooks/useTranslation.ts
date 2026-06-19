import { useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Hook that automatically observes and translates visible text content on the page.
 * Uses MutationObserver to detect new content and translates it in batches.
 * 
 * Usage: Just call useAutoTranslate() in any page component.
 */
export function useAutoTranslate() {
  const { language, t, translateBatch } = useLanguage();
  const observerRef = useRef<MutationObserver | null>(null);
  const processedRef = useRef<WeakSet<Node>>(new WeakSet());
  const originalTextsRef = useRef<Map<Node, string>>(new Map());
  const batchRef = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Collect text nodes from an element
  const getTextNodes = useCallback((element: Element): Node[] => {
    const nodes: Node[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const text = node.textContent?.trim();
          if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
          // Skip script, style, code elements
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'code', 'pre', 'kbd', 'noscript'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip elements with data-no-translate attribute
          if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node: Node | null;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }
    return nodes;
  }, []);

  // Process text nodes for translation
  const processNodes = useCallback((nodes: Node[]) => {
    if (language === "en") return;

    const textsToTranslate: string[] = [];

    for (const node of nodes) {
      if (processedRef.current.has(node)) continue;
      
      const text = node.textContent?.trim();
      if (!text || text.length < 2) continue;

      // Store original text
      if (!originalTextsRef.current.has(node)) {
        originalTextsRef.current.set(node, node.textContent || "");
      }

      // Try to get cached translation
      const translated = t(text);
      if (translated !== text) {
        // We have a cached translation - apply it
        node.textContent = translated;
        processedRef.current.add(node);
      } else {
        // Queue for batch translation
        textsToTranslate.push(text);
      }
    }

    if (textsToTranslate.length > 0) {
      batchRef.current.push(...textsToTranslate);
      
      // Debounce the batch request
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const batch = Array.from(new Set(batchRef.current)).slice(0, 50);
        batchRef.current = [];
        if (batch.length > 0) {
          translateBatch(batch);
        }
      }, 500);
    }
  }, [language, t, translateBatch]);

  // Restore original texts when switching back to English
  const restoreOriginals = useCallback(() => {
    originalTextsRef.current.forEach((originalText, node) => {
      if (node.textContent !== originalText) {
        node.textContent = originalText;
      }
    });
    processedRef.current = new WeakSet();
  }, []);

  // Re-apply translations when cache updates
  useEffect(() => {
    if (language === "en") {
      restoreOriginals();
      return;
    }

    // Translate visible content
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      const nodes = getTextNodes(mainContent);
      processNodes(nodes);
    }
  }, [language, processNodes, getTextNodes, restoreOriginals]);

  // Set up MutationObserver for dynamic content
  useEffect(() => {
    if (language === "en") {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    // Initial translation pass
    const nodes = getTextNodes(mainContent);
    processNodes(nodes);

    // Observe for new content
    observerRef.current = new MutationObserver((mutations) => {
      const newNodes: Node[] = [];
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((added) => {
            if (added.nodeType === Node.ELEMENT_NODE) {
              newNodes.push(...getTextNodes(added as Element));
            } else if (added.nodeType === Node.TEXT_NODE) {
              const text = added.textContent?.trim();
              if (text && text.length >= 2) {
                newNodes.push(added);
              }
            }
          });
        }
      }
      if (newNodes.length > 0) {
        processNodes(newNodes);
      }
    });

    observerRef.current.observe(mainContent, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [language, getTextNodes, processNodes]);

  // Handle RTL for Arabic
  useEffect(() => {
    if (language === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
    return () => {
      document.documentElement.dir = "ltr";
    };
  }, [language]);
}
