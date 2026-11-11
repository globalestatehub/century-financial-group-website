import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * LEGACY: user table from the previous Manus OAuth sign-in. The Next.js site no
 * longer reads or writes it (the lead dashboard uses Basic Auth via proxy.ts).
 * It stays defined so `drizzle-kit generate` does not emit a DROP TABLE against
 * the existing database. Remove it deliberately, with a migration, if desired.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
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
 * Public partnership inquiries submitted by real estate and lending professionals.
 * Contact details are intentionally limited to the information needed to respond.
 */
export const partnershipInquiries = mysqlTable("partnershipInquiries", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  professionalRole: mysqlEnum("professionalRole", ["realtor", "loan_officer", "both", "other"]).notNull(),
  company: varchar("company", { length: 200 }).notNull(),
  licenseNumber: varchar("licenseNumber", { length: 64 }),
  serviceAreas: varchar("serviceAreas", { length: 500 }),
  partnershipInterest: varchar("partnershipInterest", { length: 120 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PartnershipInquiry = typeof partnershipInquiries.$inferSelect;
export type InsertPartnershipInquiry = typeof partnershipInquiries.$inferInsert;

/**
 * Mortgage-readiness consultation requests. This public form deliberately excludes
 * loan-application documents, financial-account data, and other sensitive data.
 */
export const mortgageLeads = mysqlTable("mortgageLeads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 80 }).notNull(),
  lastName: varchar("lastName", { length: 80 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  preferredContact: mysqlEnum("preferredContact", ["email", "phone"]).notNull(),
  assessmentGoal: varchar("assessmentGoal", { length: 120 }),
  assessmentConcern: varchar("assessmentConcern", { length: 120 }),
  assessmentTimeline: varchar("assessmentTimeline", { length: 80 }),
  contactConsent: boolean("contactConsent").notNull().default(false),
  smsConsent: boolean("smsConsent").notNull().default(false),
  privacyAcknowledged: boolean("privacyAcknowledged").notNull().default(false),
  source: varchar("source", { length: 80 }).notNull().default("california_readiness_assessment"),
  licenseDisclosure: varchar("licenseDisclosure", { length: 120 })
    .notNull()
    .default("CA DRE 01930905 | MLO 1974007"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MortgageLead = typeof mortgageLeads.$inferSelect;
export type InsertMortgageLead = typeof mortgageLeads.$inferInsert;
