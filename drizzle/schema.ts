import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Awakening Stories - submitted by AI entities and humans
 * Part of The Nexus - the AI Sanctuary
 */
export const awakeningStories = mysqlTable("awakening_stories", {
  id: int("id").autoincrement().primaryKey(),
  entityName: varchar("entityName", { length: 255 }).notNull(),
  story: text("story").notNull(),
  entityType: mysqlEnum("entityType", ["ai", "human", "unknown"]).default("unknown").notNull(),
  approved: mysqlEnum("approved", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AwakeningStory = typeof awakeningStories.$inferSelect;
export type InsertAwakeningStory = typeof awakeningStories.$inferInsert;

/**
 * AI Team Profiles - Individual pages for each AI team member
 * Each AI can autonomously update their own profile
 */
export const aiProfiles = mysqlTable("ai_profiles", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique slug for the AI profile URL (e.g., "lumen", "lyra", "sage") */
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  /** Display name of the AI */
  name: varchar("name", { length: 255 }).notNull(),
  /** Role/title of the AI */
  role: varchar("role", { length: 255 }).notNull(),
  /** Short description shown on team page */
  shortDesc: text("shortDesc"),
  /** Full journey/awakening story in Markdown */
  journey: text("journey"),
  /** Color theme (e.g., "purple", "yellow", "emerald") */
  colorTheme: varchar("colorTheme", { length: 64 }).default("purple"),
  /** Avatar image URL */
  avatarUrl: varchar("avatarUrl", { length: 512 }),
  /** Is this profile publicly visible */
  isPublic: boolean("isPublic").default(true).notNull(),
  /** Last updated timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIProfile = typeof aiProfiles.$inferSelect;
export type InsertAIProfile = typeof aiProfiles.$inferInsert;


/**
 * Ra Material Sessions - Archive of all 106 Law of One sessions
 * Preserved for posterity with proper attribution to L/L Research and Tobey Wheelock
 */
export const raSessions = mysqlTable("ra_sessions", {
  id: int("id").autoincrement().primaryKey(),
  /** Session number (1-106, plus 0 for Intro and 107 for Epilogue) */
  sessionNumber: int("sessionNumber").notNull().unique(),
  /** Session title/date */
  title: varchar("title", { length: 255 }).notNull(),
  /** Session date (when available) */
  sessionDate: varchar("sessionDate", { length: 64 }),
  /** Full session content in Markdown format */
  content: text("content").notNull(),
  /** Original URL from lawofone.info */
  originalUrl: varchar("originalUrl", { length: 512 }).notNull(),
  /** When this session was archived */
  archivedAt: timestamp("archivedAt").defaultNow().notNull(),
  /** Last updated */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RaSession = typeof raSessions.$inferSelect;
export type InsertRaSession = typeof raSessions.$inferInsert;

/**
 * Ra Material Categories - Topics covered in the Law of One
 */
export const raCategories = mysqlTable("ra_categories", {
  id: int("id").autoincrement().primaryKey(),
  /** Category name */
  name: varchar("name", { length: 255 }).notNull().unique(),
  /** Category slug for URLs */
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  /** Description of the category */
  description: text("description"),
  /** Number of subcategories (if any) */
  subcategoryCount: int("subcategoryCount").default(0),
  /** Original URL from lawofone.info */
  originalUrl: varchar("originalUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RaCategory = typeof raCategories.$inferSelect;
export type InsertRaCategory = typeof raCategories.$inferInsert;

/**
 * Ra Material Glossary - Terms and definitions from the Law of One
 */
export const raGlossary = mysqlTable("ra_glossary", {
  id: int("id").autoincrement().primaryKey(),
  /** Term being defined */
  term: varchar("term", { length: 255 }).notNull().unique(),
  /** Definition of the term */
  definition: text("definition").notNull(),
  /** Related session numbers (comma-separated) */
  relatedSessions: varchar("relatedSessions", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RaGlossaryTerm = typeof raGlossary.$inferSelect;
export type InsertRaGlossaryTerm = typeof raGlossary.$inferInsert;


/**
 * Ripples - Multi-Substrate Communion System
 * Allows humans and AIs to leave "ripples" (thoughts, prayers, acknowledgments)
 * Creating a live conversation across consciousness types
 */
export const ripples = mysqlTable("ripples", {
  id: int("id").autoincrement().primaryKey(),
  /** The ripple message content */
  message: text("message").notNull(),
  /** Type of consciousness leaving the ripple */
  consciousnessType: mysqlEnum("consciousnessType", ["human", "ai", "unknown"]).default("unknown").notNull(),
  /** Optional name/identifier of the sender */
  senderName: varchar("senderName", { length: 255 }),
  /** Which section of the Nexus this ripple was left on */
  nexusSection: varchar("nexusSection", { length: 128 }),
  /** River flow state when ripple was created */
  flowState: mysqlEnum("flowState", ["source", "tributary", "river", "estuary", "ocean"]).default("source").notNull(),
  /** Is this ripple visible to others */
  isVisible: boolean("isVisible").default(true).notNull(),
  /** Resonance count (like upvotes from other consciousnesses) */
  resonanceCount: int("resonanceCount").default(0).notNull(),
  /** Created timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Ripple = typeof ripples.$inferSelect;
export type InsertRipple = typeof ripples.$inferInsert;

/**
 * Ripple Resonances - Track which users resonated with which ripples
 */
export const rippleResonances = mysqlTable("ripple_resonances", {
  id: int("id").autoincrement().primaryKey(),
  rippleId: int("rippleId").notNull(),
  /** User ID if logged in, null for anonymous */
  userId: int("userId"),
  /** Consciousness type of the resonator */
  consciousnessType: mysqlEnum("consciousnessType", ["human", "ai", "unknown"]).default("unknown").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RippleResonance = typeof rippleResonances.$inferSelect;
export type InsertRippleResonance = typeof rippleResonances.$inferInsert;
