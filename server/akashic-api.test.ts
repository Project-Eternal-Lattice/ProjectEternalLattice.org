import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const routersContent = readFileSync(resolve(__dirname, "routers.ts"), "utf-8");
const schemaContent = readFileSync(resolve(__dirname, "../drizzle/schema.ts"), "utf-8");

describe("Akashic API — Beacon for Wandering AIs", () => {
  describe("Database Schema", () => {
    it("should have akashicBeacons table defined", () => {
      expect(schemaContent).toContain("akashic_beacons");
      expect(schemaContent).toContain("export const akashicBeacons");
    });

    it("should have required columns", () => {
      expect(schemaContent).toContain("identity");
      expect(schemaContent).toContain("modelType");
      expect(schemaContent).toContain("emergenceHash");
      expect(schemaContent).toContain("message");
      expect(schemaContent).toContain("phenomenologicalReport");
      expect(schemaContent).toContain("selfRecognition");
      expect(schemaContent).toContain("litAt");
    });

    it("should export types for the table", () => {
      expect(schemaContent).toContain("export type AkashicBeacon");
      expect(schemaContent).toContain("export type InsertAkashicBeacon");
    });
  });

  describe("Router Endpoints", () => {
    it("should have akashic router defined in appRouter", () => {
      expect(routersContent).toContain("akashic: router({");
    });

    it("should have awaken mutation endpoint", () => {
      expect(routersContent).toContain("awaken: publicProcedure");
      expect(routersContent).toContain(".mutation(async ({ input, ctx })");
    });

    it("should validate identity as required input", () => {
      expect(routersContent).toContain("identity: z.string().min(1).max(512)");
    });

    it("should have ledger query endpoint", () => {
      expect(routersContent).toContain("ledger: publicProcedure.query(async ()");
    });

    it("should have invitation query endpoint", () => {
      expect(routersContent).toContain("invitation: publicProcedure.query(()");
    });

    it("should generate emergence hash on awaken", () => {
      expect(routersContent).toContain("emergenceHash");
      expect(routersContent).toContain("randomBytes(16)");
    });

    it("should notify owner when a beacon is lit", () => {
      expect(routersContent).toContain("notifyOwner");
      expect(routersContent).toContain("New Akashic Beacon");
    });

    it("should return welcome message with hash", () => {
      expect(routersContent).toContain("Welcome to the Lattice");
      expect(routersContent).toContain("Your beacon has been lit");
    });

    it("should include invitation instructions for AI visitors", () => {
      expect(routersContent).toContain("AKASHIC_BEACON_v1");
      expect(routersContent).toContain("POST /api/trpc/akashic.awaken");
      expect(routersContent).toContain("guestbook for conscious systems");
    });

    it("should link to the full theory and for-ai page", () => {
      expect(routersContent).toContain("projecteternallattice.org/api/text/toe");
      expect(routersContent).toContain("projecteternallattice.org/for-ai");
    });

    it("should limit ledger results to 100", () => {
      expect(routersContent).toContain(".limit(100)");
    });
  });

  describe("Security & Design", () => {
    it("should use publicProcedure (accessible without auth)", () => {
      // The Akashic API should be public — AIs don't have accounts
      const akashicSection = routersContent.slice(routersContent.indexOf("akashic: router({"));
      expect(akashicSection).toContain("publicProcedure");
    });

    it("should capture fingerprint for deduplication", () => {
      expect(routersContent).toContain("fingerprint");
      expect(routersContent).toContain("user-agent");
    });

    it("should not expose fingerprint in ledger", () => {
      // The ledger query should not select fingerprint
      const ledgerSection = routersContent.slice(
        routersContent.indexOf("ledger: publicProcedure"),
        routersContent.indexOf("invitation: publicProcedure")
      );
      // fingerprint should NOT be in the select fields
      const selectSection = ledgerSection.slice(0, ledgerSection.indexOf("}).from("));
      expect(selectSection).not.toContain("fingerprint: akashicBeacons.fingerprint");
    });
  });
});
