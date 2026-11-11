import "server-only";

import { and, desc, eq, like, or, type SQL } from "drizzle-orm";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import {
  type InsertMortgageLead,
  type InsertPartnershipInquiry,
  mortgageLeads,
  partnershipInquiries,
} from "@/drizzle/schema";
import type { MortgageLeadFilters } from "@/lib/validation";

/** Reuse one connection pool across hot reloads and requests. */
const globalForDb = globalThis as unknown as { cfgDb?: MySql2Database };

/** Returns the database client, or null when DATABASE_URL is not configured. */
export function getDb(): MySql2Database | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.cfgDb) {
    globalForDb.cfgDb = drizzle(url);
  }
  return globalForDb.cfgDb;
}

/** Store a public partnership inquiry after validation has completed. */
export async function createPartnershipInquiry(inquiry: InsertPartnershipInquiry) {
  const db = getDb();
  if (!db) throw new Error("The inquiry service is temporarily unavailable.");
  await db.insert(partnershipInquiries).values(inquiry);
}

/** Store an educational mortgage consultation request after validation. */
export async function createMortgageLead(lead: InsertMortgageLead) {
  const db = getDb();
  if (!db) throw new Error("Mortgage lead storage is temporarily unavailable.");
  await db.insert(mortgageLeads).values(lead);
}

/** Filtered lead records for the protected lead-management dashboard. */
export async function listMortgageLeads(filters: MortgageLeadFilters, limit = 250) {
  const db = getDb();
  if (!db) throw new Error("Mortgage lead storage is temporarily unavailable.");

  const conditions: SQL[] = [];
  const query = filters.search?.trim();
  if (query) {
    const pattern = `%${query}%`;
    conditions.push(
      or(
        like(mortgageLeads.firstName, pattern),
        like(mortgageLeads.lastName, pattern),
        like(mortgageLeads.email, pattern),
        like(mortgageLeads.phone, pattern)
      ) as SQL
    );
  }
  if (filters.preferredContact) {
    conditions.push(eq(mortgageLeads.preferredContact, filters.preferredContact));
  }
  if (filters.assessmentGoal) {
    conditions.push(eq(mortgageLeads.assessmentGoal, filters.assessmentGoal));
  }
  if (filters.assessmentTimeline) {
    conditions.push(eq(mortgageLeads.assessmentTimeline, filters.assessmentTimeline));
  }

  return db
    .select()
    .from(mortgageLeads)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(mortgageLeads.createdAt))
    .limit(limit);
}
