"use server";

import { createMortgageLead, createPartnershipInquiry, getDb } from "@/lib/db";
import {
  mortgageLeadFields,
  partnershipInquiryFields,
  visitorMessageForStatus,
} from "@/lib/forms/payload";
import { forwardToN8n, verifyTurnstile } from "@/lib/forms/server";
import { TURNSTILE_ACTIONS } from "@/lib/forms/turnstile";
import {
  type ActionResult,
  fieldErrors,
  firstIssueMessage,
  mortgageLeadSchema,
  partnershipInquirySchema,
} from "@/lib/validation";

const VERIFICATION_FAILED =
  "We couldn't verify your submission. Please complete the security check and try again.";
const UNAVAILABLE = "Something went wrong. Please try again later.";

/**
 * Shared delivery for every form:
 *  1. Save to the database when DATABASE_URL is configured (feeds the lead dashboard).
 *  2. Forward to the n8n form handler, which sends all notification emails.
 * The visitor sees success when at least one destination accepted the submission.
 * Honeypot hits are forwarded to n8n as-is (per the n8n contract) but never stored.
 */
async function deliver(
  saveToDatabase: () => Promise<void>,
  forward: () => ReturnType<typeof forwardToN8n>,
  isHoneypotHit: boolean
): Promise<ActionResult> {
  let saved = false;
  if (!isHoneypotHit && getDb()) {
    try {
      await saveToDatabase();
      saved = true;
    } catch (error) {
      console.error("[forms] Database save failed:", error);
    }
  }

  const forwarded = await forward();
  if (forwarded.status === "sent" || saved) return { ok: true };
  if (isHoneypotHit) return { ok: true };
  if (forwarded.status === "failed")
    return {
      ok: false,
      message: visitorMessageForStatus(forwarded.httpStatus),
    };
  return { ok: false, message: UNAVAILABLE };
}

/** Public partnership inquiry from realtors, loan officers, and other professionals. */
export async function submitPartnershipInquiry(
  input: unknown,
  turnstileToken: unknown
): Promise<ActionResult> {
  if (
    !(await verifyTurnstile(
      turnstileToken,
      TURNSTILE_ACTIONS.partnershipInquiry
    ))
  ) {
    return { ok: false, message: VERIFICATION_FAILED };
  }

  const parsed = partnershipInquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: firstIssueMessage(parsed.error),
      fieldErrors: fieldErrors(parsed.error),
    };
  }
  const data = parsed.data;

  return deliver(
    () =>
      createPartnershipInquiry({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || null,
        professionalRole: data.professionalRole,
        company: data.company,
        licenseNumber: data.licenseNumber || null,
        serviceAreas: data.serviceAreas || null,
        partnershipInterest: data.partnershipInterest,
        message: data.message,
      }),
    () => forwardToN8n("inquiry", partnershipInquiryFields(data)),
    Boolean(data.website)
  );
}

/** Educational mortgage readiness consultation request. */
export async function captureMortgageLead(
  input: unknown,
  turnstileToken: unknown
): Promise<ActionResult> {
  if (
    !(await verifyTurnstile(
      turnstileToken,
      TURNSTILE_ACTIONS.mortgageReadiness
    ))
  ) {
    return { ok: false, message: VERIFICATION_FAILED };
  }

  const parsed = mortgageLeadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: firstIssueMessage(parsed.error),
      fieldErrors: fieldErrors(parsed.error),
    };
  }
  const data = parsed.data;

  return deliver(
    () =>
      createMortgageLead({
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
      }),
    () => forwardToN8n("inquiry", mortgageLeadFields(data)),
    Boolean(data.website)
  );
}
