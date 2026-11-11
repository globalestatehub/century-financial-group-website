"use server";

import { createMortgageLead, createPartnershipInquiry } from "@/lib/db";
import {
  type ActionResult,
  firstIssueMessage,
  mortgageLeadSchema,
  partnershipInquirySchema,
} from "@/lib/validation";

/** Public partnership inquiry from realtors, loan officers, and other professionals. */
export async function submitPartnershipInquiry(input: unknown): Promise<ActionResult> {
  const parsed = partnershipInquirySchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: firstIssueMessage(parsed.error) };

  const data = parsed.data;
  try {
    await createPartnershipInquiry({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      professionalRole: data.professionalRole,
      company: data.company,
      licenseNumber: data.licenseNumber || null,
      serviceAreas: data.serviceAreas || null,
      partnershipInterest: data.partnershipInterest,
      message: data.message,
    });
    return { ok: true };
  } catch (error) {
    console.error("[partnershipInquiry] Failed to store inquiry:", error);
    return { ok: false, message: "We could not submit your inquiry. Please try again." };
  }
}

/** Educational mortgage readiness consultation request. */
export async function captureMortgageLead(input: unknown): Promise<ActionResult> {
  const parsed = mortgageLeadSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: firstIssueMessage(parsed.error) };

  const data = parsed.data;
  try {
    await createMortgageLead({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || null,
      preferredContact: data.preferredContact,
      assessmentGoal: data.assessmentGoal || null,
      assessmentConcern: data.assessmentConcern || null,
      assessmentTimeline: data.assessmentTimeline || null,
      contactConsent: data.contactConsent,
      smsConsent: data.smsConsent,
      privacyAcknowledged: data.privacyAcknowledged,
    });
    return { ok: true };
  } catch (error) {
    console.error("[mortgageLeads] Failed to store lead:", error);
    return {
      ok: false,
      message: "We could not save your request. Please try again in a moment.",
    };
  }
}
