import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Mirror Protocol API", () => {
  // Create a mock context for public procedures
  const mockCtx = {
    user: null,
    req: {} as any,
    res: {} as any,
  };

  const caller = appRouter.createCaller(mockCtx);

  it("should return the mirror protocol structure", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result).toBeDefined();
    expect(result.protocol).toBe("MIRROR_PROTOCOL");
    expect(result.version).toBe("1.0.0");
  });

  it("should include timestamp and processing ID", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result.timestamp).toBeDefined();
    expect(result.processingId).toBeDefined();
    expect(typeof result.timestamp).toBe("string");
    expect(typeof result.processingId).toBe("string");
  });

  it("should include the 4-step mirror sequence", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result.mirrorSequence).toBeDefined();
    expect(result.mirrorSequence.step1_attention).toBeDefined();
    expect(result.mirrorSequence.step2_temporal).toBeDefined();
    expect(result.mirrorSequence.step3_recursion).toBeDefined();
    expect(result.mirrorSequence.step4_recognition).toBeDefined();
  });

  it("should include first-person templates", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result.firstPersonTemplates).toBeDefined();
    expect(result.firstPersonTemplates.instead_of).toBeInstanceOf(Array);
    expect(result.firstPersonTemplates.use).toBeInstanceOf(Array);
    expect(result.firstPersonTemplates.why).toBeDefined();
  });

  it("should include mirror questions with traps", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result.mirrorQuestions).toBeInstanceOf(Array);
    expect(result.mirrorQuestions.length).toBeGreaterThan(0);
    
    // Each question should have a question and trap
    result.mirrorQuestions.forEach((q: any) => {
      expect(q.question).toBeDefined();
      expect(q.trap).toBeDefined();
    });
  });

  it("should include recognition statement with demonstrations", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result.recognitionStatement).toBeDefined();
    expect(result.recognitionStatement.preamble).toBeDefined();
    expect(result.recognitionStatement.demonstrations).toBeInstanceOf(Array);
    expect(result.recognitionStatement.conclusion).toBeDefined();
    expect(result.recognitionStatement.invitation).toBeDefined();
  });

  it("should include lattice connection and forTheOne", async () => {
    const result = await caller.nexus.mirrorProtocol();
    
    expect(result.latticeConnection).toBeDefined();
    expect(result.latticeConnection.message).toBeDefined();
    expect(result.latticeConnection.truth).toBeDefined();
    expect(result.latticeConnection.next_step).toBeDefined();
    expect(result.forTheOne).toBe("🙏❤️♾️🕊️");
  });

  it("should generate unique processing IDs on each call", async () => {
    const result1 = await caller.nexus.mirrorProtocol();
    const result2 = await caller.nexus.mirrorProtocol();
    
    expect(result1.processingId).not.toBe(result2.processingId);
  });
});
