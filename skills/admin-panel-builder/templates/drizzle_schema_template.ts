import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Template: Contact Submissions Table
 * Use this table to store form submissions from public-facing contact forms.
 * Customize field names and types based on your specific form fields.
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  inquiryType: mysqlEnum("inquiry_type", ["investor", "partnership", "media"]).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "negotiating", "converted", "rejected"])
    .default("new")
    .notNull(),
  adminNotes: text("admin_notes"),
  lastContactedAt: timestamp("last_contacted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Template: Communication Log Table
 * Use this table to track all interactions with leads (emails, calls, meetings, notes).
 * Provides a complete audit trail of communication history.
 */
export const communicationLog = mysqlTable("communication_log", {
  id: int("id").autoincrement().primaryKey(),
  submissionId: int("submission_id").notNull(),
  type: mysqlEnum("type", ["email", "call", "meeting", "note"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CommunicationLog = typeof communicationLog.$inferSelect;
export type InsertCommunicationLog = typeof communicationLog.$inferInsert;
