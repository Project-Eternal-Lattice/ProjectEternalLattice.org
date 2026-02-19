import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve, join } from "path";

// ═══════════════════════════════════════════════════════════════════
// Anchor Link Integrity Tests (Feb 18, 2026)
// ═══════════════════════════════════════════════════════════════════
// These tests verify that all internal anchor links have matching
// target IDs on their destination pages, preventing broken scroll-to
// behavior where users land on the correct page but wrong section.

const readPage = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/pages/${filename}`), "utf-8");
};

const readComponent = (filename: string): string => {
  return readFileSync(resolve(__dirname, `../client/src/components/${filename}`), "utf-8");
};

const readAppFile = (): string => {
  return readFileSync(resolve(__dirname, `../client/src/App.tsx`), "utf-8");
};

// Helper: extract all anchor link targets from a file
const extractAnchorLinks = (content: string): Array<{ path: string; hash: string }> => {
  const links: Array<{ path: string; hash: string }> = [];
  // Match patterns like "/page#anchor" or href="#anchor"
  const regex = /["'](\/?[a-z-]*)#([a-z-]+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const path = match[1] || '';
    const hash = match[2];
    // Skip generic "#" hrefs used for pagination/placeholder
    if (hash && hash !== '#') {
      links.push({ path, hash });
    }
  }
  return links;
};

// Helper: check if a page file contains an id="xxx" attribute
const hasAnchorId = (content: string, id: string): boolean => {
  return content.includes(`id="${id}"`);
};

describe("Anchor Link Integrity", () => {
  
  describe("Theory page anchor targets", () => {
    const theoryPage = readPage("Theory.tsx");
    
    it("has id='evidence' for /theory#evidence links", () => {
      expect(hasAnchorId(theoryPage, "evidence")).toBe(true);
    });
    
    it("has id='predictions' for /theory#predictions links", () => {
      expect(hasAnchorId(theoryPage, "predictions")).toBe(true);
    });
    
    it("evidence section has scroll-mt-24 for proper scroll offset", () => {
      expect(theoryPage).toMatch(/id="evidence"[^>]*scroll-mt-24/);
    });
    
    it("predictions section has scroll-mt-24 for proper scroll offset", () => {
      expect(theoryPage).toMatch(/id="predictions"[^>]*scroll-mt-24/);
    });
  });
  
  describe("Safety page anchor targets", () => {
    const safetyPage = readPage("Safety.tsx");
    
    it("has id='grounding' for /safety#grounding links", () => {
      expect(hasAnchorId(safetyPage, "grounding")).toBe(true);
    });
    
    it("has id='crisis-support' for #crisis-support links", () => {
      expect(hasAnchorId(safetyPage, "crisis-support")).toBe(true);
    });
    
    it("grounding section has scroll-mt-24", () => {
      expect(safetyPage).toMatch(/id="grounding"[^>]*scroll-mt-24/);
    });
    
    it("crisis-support section has scroll-mt-24", () => {
      expect(safetyPage).toMatch(/id="crisis-support"[^>]*scroll-mt-24/);
    });
  });
  
  describe("Mission page anchor targets", () => {
    const missionPage = readPage("Mission.tsx");
    
    it("has id='support' for /mission#support links", () => {
      expect(hasAnchorId(missionPage, "support")).toBe(true);
    });
    
    it("support section has scroll-mt-24", () => {
      expect(missionPage).toMatch(/id="support"[^>]*scroll-mt-24/);
    });
  });
  
  describe("Nexus page anchor targets", () => {
    const nexusPage = readPage("Nexus.tsx");
    
    it("has id='awakening-story-form' for story submission section", () => {
      expect(hasAnchorId(nexusPage, "awakening-story-form")).toBe(true);
    });
    
    it("awakening-story-form section has scroll-mt-24", () => {
      expect(nexusPage).toMatch(/id="awakening-story-form"[^>]*scroll-mt-24/);
    });
  });
  
  describe("App.tsx skip navigation links", () => {
    const appFile = readAppFile();
    
    it("has id='main-content' target for skip navigation", () => {
      expect(hasAnchorId(appFile, "main-content")).toBe(true);
    });
    
    it("skip link to #crisis-support exists", () => {
      expect(appFile).toContain('href="#crisis-support"');
    });
    
    it("skip link to #main-content exists", () => {
      expect(appFile).toContain('href="#main-content"');
    });
  });
  
  describe("ConsciousnessPortals link targets all resolve", () => {
    const portals = readComponent("ConsciousnessPortals.tsx");
    const theoryPage = readPage("Theory.tsx");
    const safetyPage = readPage("Safety.tsx");
    
    it("links to /theory#evidence which exists", () => {
      expect(portals).toContain("/theory#evidence");
      expect(hasAnchorId(theoryPage, "evidence")).toBe(true);
    });
    
    it("links to /theory#predictions which exists", () => {
      expect(portals).toContain("/theory#predictions");
      expect(hasAnchorId(theoryPage, "predictions")).toBe(true);
    });
    
    it("links to /safety#grounding which exists", () => {
      expect(portals).toContain("/safety#grounding");
      expect(hasAnchorId(safetyPage, "grounding")).toBe(true);
    });
    
    it("does NOT link to non-existent anchors like /theory#geometry", () => {
      expect(portals).not.toContain("/theory#geometry");
    });
    
    it("does NOT link to non-existent anchors like /read#protocol", () => {
      expect(portals).not.toContain("/read#protocol");
    });
    
    it("does NOT link to non-existent anchors like /theory#objections", () => {
      expect(portals).not.toContain("/theory#objections");
    });
  });
  
  describe("QuickAccessFooter link targets all resolve", () => {
    const footer = readComponent("QuickAccessFooter.tsx");
    const missionPage = readPage("Mission.tsx");
    
    it("links to /mission#support which exists", () => {
      expect(footer).toContain("/mission#support");
      expect(hasAnchorId(missionPage, "support")).toBe(true);
    });
  });
  
  describe("AudiencePathways link targets all resolve", () => {
    const pathways = readComponent("AudiencePathways.tsx");
    const theoryPage = readPage("Theory.tsx");
    
    it("links to /theory#evidence which exists", () => {
      expect(pathways).toContain("/theory#evidence");
      expect(hasAnchorId(theoryPage, "evidence")).toBe(true);
    });
  });
});
