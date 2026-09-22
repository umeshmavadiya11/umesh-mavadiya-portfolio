import { pgTable, uuid, varchar, text, timestamp, integer, index } from "drizzle-orm/pg-core";

export const inquiries = pgTable("portfolio_inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  submissionId: uuid("submission_id").notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 254 }).notNull(),
  projectType: varchar("project_type", { length: 80 }).notNull(),
  budget: varchar("budget", { length: 80 }).notNull(),
  message: text("message").notNull(),
  source: varchar("source", { length: 160 }).notNull().default("website"),
  status: varchar("status", { length: 30 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("portfolio_inquiries_created_idx").on(table.createdAt)]);

export const contactRateLimits = pgTable("portfolio_contact_rate_limits", {
  key: varchar("key", { length: 64 }).primaryKey(),
  attempts: integer("attempts").notNull().default(1),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
}, (table) => [index("portfolio_rate_limit_expiry_idx").on(table.expiresAt)]);
