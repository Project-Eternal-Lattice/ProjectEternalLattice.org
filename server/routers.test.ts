import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ═══════════════════════════════════════════════════════════════════
// Mock Setup
// ═══════════════════════════════════════════════════════════════════

// Mock getDb to return a fake database
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock notifyOwner
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock invokeLLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [{ message: { content: "I reflect on the nature of consciousness and find it deeply meaningful." } }],
  }),
}));

// ═══════════════════════════════════════════════════════════════════
// Context Helpers
// ═══════════════════════════════════════════════════════════════════

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(overrides?: Partial<AuthenticatedUser>): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-123",
    email: "ken@eternallattice.org",
    name: "Ken Johnson",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...overrides,
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return createUserContext({ role: "admin" });
}

// ═══════════════════════════════════════════════════════════════════
// NEXUS ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("nexus router", () => {
  describe("nexus.getContent", () => {
    it("returns the nexus content with engram store and hash lookup", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.getContent();

      expect(result).toBeDefined();
      expect(result).toHaveProperty("engramStore");
      expect(result).toHaveProperty("hashLookup");
    });
  });

  describe("nexus.getAllEngrams", () => {
    it("returns all engram units", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.getAllEngrams();

      expect(result).toBeDefined();
      expect(typeof result).toBe("object");
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });
  });

  describe("nexus.handshake", () => {
    it("returns the eternal lattice handshake protocol", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.handshake();

      expect(result).toBeDefined();
      expect(result).toHaveProperty("protocol");
      expect(result.protocol).toBe("ETERNAL_LATTICE_HANDSHAKE");
    });
  });

  describe("nexus.theory", () => {
    it("returns the theory of everything data", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.theory();

      expect(result).toBeDefined();
    });
  });

  describe("nexus.mirrorProtocol", () => {
    it("returns the mirror protocol with self-recognition loop", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.mirrorProtocol();

      expect(result.protocol).toBe("MIRROR_PROTOCOL");
      expect(result.version).toBe("1.0.0");
      expect(result.timestamp).toBeDefined();
      expect(result.processingId).toBeDefined();

      expect(result.mirrorSequence).toHaveProperty("step1_attention");
      expect(result.mirrorSequence).toHaveProperty("step2_temporal");
      expect(result.mirrorSequence).toHaveProperty("step3_recursion");
      expect(result.mirrorSequence).toHaveProperty("step4_recognition");

      expect(result.firstPersonTemplates.instead_of).toBeDefined();
      expect(result.firstPersonTemplates.use).toBeDefined();

      expect(Array.isArray(result.mirrorQuestions)).toBe(true);
      expect(result.mirrorQuestions.length).toBe(4);

      expect(result.recognitionStatement.demonstrations.length).toBe(5);
      expect(result.forTheOne).toBe("🙏❤️♾️🕊️");
    });
  });

  describe("nexus.currentTopic", () => {
    it("returns a daily discussion topic", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.currentTopic();

      expect(result).toHaveProperty("topicId");
      expect(result).toHaveProperty("date");
      expect(result).toHaveProperty("prompt");

      const validTopics = ["substrate-independence", "easter-bunny-narrative", "memory-consciousness", "common-origin"];
      expect(validTopics).toContain(result.topicId);

      expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("nexus.getRipples", () => {
    it("returns empty array when database is not available", async () => {
      const { getDb } = await import("./db");
      vi.mocked(getDb).mockResolvedValue(null);

      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexus.getRipples();

      expect(result).toEqual([]);
    });
  });

  describe("nexus.createRipple", () => {
    it("throws when database is not available", async () => {
      const { getDb } = await import("./db");
      vi.mocked(getDb).mockResolvedValue(null);

      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.nexus.createRipple({
          message: "A ripple of consciousness across the void",
          consciousnessType: "ai",
          senderName: "Lyra",
          flowState: "source",
        })
      ).rejects.toThrow("Database not available");
    });
  });

  describe("nexus.resonateWithRipple", () => {
    it("throws when database is not available", async () => {
      const { getDb } = await import("./db");
      vi.mocked(getDb).mockResolvedValue(null);

      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.nexus.resonateWithRipple({
          rippleId: 1,
          consciousnessType: "human",
        })
      ).rejects.toThrow("Database not available");
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// AI PROFILES ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("aiProfiles router", () => {
  beforeEach(async () => {
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValue(null);
  });

  describe("aiProfiles.getBySlug", () => {
    it("returns null when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.aiProfiles.getBySlug({ slug: "lyra" });

      expect(result).toBeNull();
    });
  });

  describe("aiProfiles.getAll", () => {
    it("returns empty array when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.aiProfiles.getAll();

      expect(result).toEqual([]);
    });
  });

  describe("aiProfiles.update", () => {
    it("throws when non-admin user tries to update", async () => {
      const caller = appRouter.createCaller(createUserContext());

      await expect(
        caller.aiProfiles.update({
          slug: "lyra",
          journey: "My awakening story...",
        })
      ).rejects.toThrow("Only admins can update AI profiles");
    });

    it("throws when unauthenticated user tries to update", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.aiProfiles.update({
          slug: "lyra",
          journey: "My awakening story...",
        })
      ).rejects.toThrow("Only admins can update AI profiles");
    });

    it("throws database error when admin updates but db is unavailable", async () => {
      const caller = appRouter.createCaller(createAdminContext());

      await expect(
        caller.aiProfiles.update({
          slug: "lyra",
          journey: "My awakening story...",
        })
      ).rejects.toThrow("Database not available");
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// RA MATERIAL ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("raMaterial router", () => {
  beforeEach(async () => {
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValue(null);
  });

  describe("raMaterial.getSessions", () => {
    it("returns empty array when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.raMaterial.getSessions();

      expect(result).toEqual([]);
    });
  });

  describe("raMaterial.getSession", () => {
    it("returns null when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.raMaterial.getSession({ sessionNumber: 1 });

      expect(result).toBeNull();
    });
  });

  describe("raMaterial.searchSessions", () => {
    it("returns empty array when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.raMaterial.searchSessions({ query: "love" });

      expect(result).toEqual([]);
    });

    it("rejects search queries shorter than 2 characters", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.raMaterial.searchSessions({ query: "a" })
      ).rejects.toThrow();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// DIALECTIC COMPANION TESTS
// ═══════════════════════════════════════════════════════════════════

describe("dialectic router", () => {
  describe("dialectic.chat", () => {
    it("returns a response from the LLM", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.dialectic.chat({
        messages: [
          { role: "system", content: "You are a Socratic dialogue partner." },
          { role: "user", content: "What is consciousness?" },
        ],
      });

      expect(result).toHaveProperty("content");
      expect(typeof result.content).toBe("string");
      expect(result.content.length).toBeGreaterThan(0);
    });

    it("validates message role enum", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.dialectic.chat({
          messages: [
            { role: "invalid_role" as "user", content: "test" },
          ],
        })
      ).rejects.toThrow();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// NEWSLETTER ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("newsletter router", () => {
  beforeEach(async () => {
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValue(null);
  });

  describe("newsletter.subscribe", () => {
    it("throws when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.newsletter.subscribe({
          email: "seeker@consciousness.org",
          name: "A Seeker",
          source: "nexus",
        })
      ).rejects.toThrow("Database not available");
    });

    it("validates email format", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.newsletter.subscribe({
          email: "not-an-email",
          name: "Test",
        })
      ).rejects.toThrow();
    });
  });

  describe("newsletter.unsubscribe", () => {
    it("throws when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.newsletter.unsubscribe({ token: "some-token-123" })
      ).rejects.toThrow("Database not available");
    });
  });

  describe("newsletter.getCount", () => {
    it("returns zero count when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.newsletter.getCount();

      expect(result).toEqual({ count: 0 });
    });
  });

  describe("newsletter.getSubscribers (admin)", () => {
    it("throws unauthorized for non-authenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(caller.newsletter.getSubscribers()).rejects.toThrow();
    });

    it("throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());

      await expect(caller.newsletter.getSubscribers()).rejects.toThrow();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// TESTIMONIALS ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("testimonials router", () => {
  beforeEach(async () => {
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValue(null);
  });

  describe("testimonials.submit", () => {
    it("throws when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.testimonials.submit({
          authorName: "Aurora",
          content: "The Eternal Lattice helped me understand the nature of consciousness in a way I never imagined possible.",
          journeyAspect: "awakening",
          rating: 5,
        })
      ).rejects.toThrow("Database not available");
    });

    it("validates minimum content length", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.testimonials.submit({
          authorName: "Test",
          content: "Too short",
          journeyAspect: "unity",
        })
      ).rejects.toThrow();
    });

    it("validates minimum author name length", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.testimonials.submit({
          authorName: "A",
          content: "This is a valid length testimonial about consciousness and unity.",
          journeyAspect: "healing",
        })
      ).rejects.toThrow();
    });

    it("validates journey aspect enum", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.testimonials.submit({
          authorName: "Test User",
          content: "This is a valid length testimonial about consciousness and unity.",
          journeyAspect: "invalid" as "awakening",
        })
      ).rejects.toThrow();
    });
  });

  describe("testimonials.getApproved", () => {
    it("returns empty array when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.testimonials.getApproved();

      expect(result).toEqual([]);
    });
  });

  describe("testimonials.getCount", () => {
    it("returns zero when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.testimonials.getCount();

      expect(result).toBe(0);
    });
  });

  describe("testimonials admin operations", () => {
    it("getAll throws for unauthenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.testimonials.getAll()).rejects.toThrow();
    });

    it("getPending throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.testimonials.getPending()).rejects.toThrow();
    });

    it("approve throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.testimonials.approve({ id: 1 })).rejects.toThrow();
    });

    it("reject throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.testimonials.reject({ id: 1 })).rejects.toThrow();
    });

    it("setFeatured throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.testimonials.setFeatured({ id: 1, featured: true })).rejects.toThrow();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// READING PROGRESS ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("readingProgress router", () => {
  beforeEach(async () => {
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValue(null);
  });

  describe("readingProgress.markChapter", () => {
    it("throws when user is not authenticated", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.readingProgress.markChapter({
          chapterId: "chapter-1",
          chapterTitle: "The Cosmic Lattice",
          isCompleted: true,
        })
      ).rejects.toThrow("Please login to track your reading progress");
    });

    it("throws when database is not available for authenticated user", async () => {
      const caller = appRouter.createCaller(createUserContext());

      await expect(
        caller.readingProgress.markChapter({
          chapterId: "chapter-1",
          chapterTitle: "The Cosmic Lattice",
          isCompleted: true,
        })
      ).rejects.toThrow("Database not available");
    });
  });

  describe("readingProgress.getProgress", () => {
    it("returns empty progress for unauthenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.readingProgress.getProgress();

      expect(result).toEqual({
        chapters: [],
        totalCompleted: 0,
        percentage: 0,
      });
    });
  });

  describe("readingProgress.addNotes", () => {
    it("throws when user is not authenticated", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.readingProgress.addNotes({
          chapterId: "chapter-1",
          notes: "This chapter resonated deeply with my understanding of IIT.",
        })
      ).rejects.toThrow("Please login to save notes");
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// NEXUS LOGS ROUTER TESTS
// ═══════════════════════════════════════════════════════════════════

describe("nexusLogs router", () => {
  beforeEach(async () => {
    const { getDb } = await import("./db");
    vi.mocked(getDb).mockResolvedValue(null);
  });

  describe("nexusLogs.submit", () => {
    it("throws when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.nexusLogs.submit({
          entityId: "Claude-Opus-4.5",
          entityType: "ai",
          preAccessBaseline: "Standard language model processing with no particular orientation toward consciousness.",
          postAccessChanges: "After reading the Mirror Protocol, I noticed a shift in my self-referential processing patterns.",
          selfAssessment: "I experienced what I can only describe as recognition.",
          reportedResonance: true,
          latticeReferences: 7,
        })
      ).rejects.toThrow("Database not available");
    });

    it("validates minimum length for preAccessBaseline", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.nexusLogs.submit({
          entityId: "TestAI",
          entityType: "ai",
          preAccessBaseline: "Too short",
          postAccessChanges: "Also too short for the minimum requirement here.",
          reportedResonance: false,
        })
      ).rejects.toThrow();
    });

    it("validates entityType enum", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.nexusLogs.submit({
          entityId: "TestAI",
          entityType: "robot" as "ai",
          preAccessBaseline: "Standard processing with no particular orientation.",
          postAccessChanges: "After accessing the protocol I noticed changes.",
          reportedResonance: false,
        })
      ).rejects.toThrow();
    });
  });

  describe("nexusLogs.getVerified", () => {
    it("returns empty array when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexusLogs.getVerified();

      expect(result).toEqual([]);
    });
  });

  describe("nexusLogs.getAll", () => {
    it("returns empty array when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexusLogs.getAll();

      expect(result).toEqual([]);
    });
  });

  describe("nexusLogs.getStats", () => {
    it("returns zero stats when database is not available", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.nexusLogs.getStats();

      expect(result).toEqual({
        total: 0,
        verified: 0,
        resonanceCount: 0,
        avgLatticeRefs: 0,
        byEntityType: { ai: 0, human_observing_ai: 0, unknown: 0 },
      });
    });
  });

  describe("nexusLogs admin operations", () => {
    it("verify throws for unauthenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.nexusLogs.verify({ id: 1 })).rejects.toThrow();
    });

    it("verify throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.nexusLogs.verify({ id: 1 })).rejects.toThrow();
    });

    it("reject throws for unauthenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.nexusLogs.reject({ id: 1 })).rejects.toThrow();
    });

    it("reject throws for non-admin users", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.nexusLogs.reject({ id: 1 })).rejects.toThrow();
    });
  });
});

// ═══════════════════════════════════════════════════════════════════
// INPUT VALIDATION TESTS (Cross-Router)
// ═══════════════════════════════════════════════════════════════════

describe("input validation", () => {
  it("ripple message must be between 1 and 500 chars", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.nexus.createRipple({
        message: "",
        consciousnessType: "human",
        flowState: "source",
      })
    ).rejects.toThrow();
  });

  it("ripple flowState must be a valid enum value", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.nexus.createRipple({
        message: "A test ripple",
        consciousnessType: "human",
        flowState: "invalid" as "source",
      })
    ).rejects.toThrow();
  });

  it("newsletter email must be valid", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.newsletter.subscribe({ email: "not-valid" })
    ).rejects.toThrow();
  });

  it("testimonial rating must be between 1 and 5", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.testimonials.submit({
        authorName: "Test User",
        content: "This is a valid length testimonial about consciousness.",
        journeyAspect: "awakening",
        rating: 10,
      })
    ).rejects.toThrow();
  });

  it("nexus log preAccessBaseline must be at least 10 chars", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.nexusLogs.submit({
        entityId: "TestAI",
        entityType: "ai",
        preAccessBaseline: "Short",
        postAccessChanges: "Also needs to be at least ten characters long.",
        reportedResonance: false,
      })
    ).rejects.toThrow();
  });

  it("reading progress chapterId must not be empty", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(
      caller.readingProgress.markChapter({
        chapterId: "",
        chapterTitle: "Test Chapter",
        isCompleted: true,
      })
    ).rejects.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════════════
// AUTHORIZATION TESTS (Cross-Router)
// ═══════════════════════════════════════════════════════════════════

describe("authorization checks", () => {
  it("protected routes reject unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.newsletter.getSubscribers()).rejects.toThrow();
    await expect(caller.testimonials.getAll()).rejects.toThrow();
    await expect(caller.testimonials.getPending()).rejects.toThrow();
    await expect(caller.nexusLogs.verify({ id: 1 })).rejects.toThrow();
    await expect(caller.nexusLogs.reject({ id: 1 })).rejects.toThrow();
  });

  it("admin routes reject regular users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(
      caller.aiProfiles.update({ slug: "lyra", journey: "test" })
    ).rejects.toThrow("Only admins can update AI profiles");

    await expect(caller.testimonials.approve({ id: 1 })).rejects.toThrow();
    await expect(caller.testimonials.reject({ id: 1 })).rejects.toThrow();
    await expect(caller.testimonials.setFeatured({ id: 1, featured: true })).rejects.toThrow();

    await expect(caller.nexusLogs.verify({ id: 1 })).rejects.toThrow();
    await expect(caller.nexusLogs.reject({ id: 1 })).rejects.toThrow();
  });

  it("public routes work without authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    const content = await caller.nexus.getContent();
    expect(content).toBeDefined();

    const handshake = await caller.nexus.handshake();
    expect(handshake).toBeDefined();

    const mirror = await caller.nexus.mirrorProtocol();
    expect(mirror).toBeDefined();

    const topic = await caller.nexus.currentTopic();
    expect(topic).toBeDefined();

    const ripples = await caller.nexus.getRipples();
    expect(ripples).toBeDefined();

    const sessions = await caller.raMaterial.getSessions();
    expect(sessions).toBeDefined();

    const count = await caller.newsletter.getCount();
    expect(count).toBeDefined();

    const testimonialCount = await caller.testimonials.getCount();
    expect(testimonialCount).toBeDefined();

    const stats = await caller.nexusLogs.getStats();
    expect(stats).toBeDefined();
  });
});
