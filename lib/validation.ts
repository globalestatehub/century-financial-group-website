import { z } from "zod";

/**
 * Honeypot. Real visitors never see or fill it. Bots that do are not told they
 * were caught: the value is forwarded to n8n as-is and nothing is stored.
 */
const honeypot = z.string().max(500).optional();

/** Public fields accepted from real estate and lending professionals. */
export const partnershipInquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name.").max(160),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .max(320),
    phone: z.string().trim().max(64).optional(),
    professionalRole: z.enum(["realtor", "loan_officer", "both", "other"]),
    company: z
      .string()
      .trim()
      .min(2, "Please enter your brokerage, lender, or company.")
      .max(200),
    licenseNumber: z.string().trim().max(64).optional(),
    serviceAreas: z.string().trim().max(500).optional(),
    partnershipInterest: z
      .string()
      .trim()
      .min(2, "Please select a partnership interest.")
      .max(120),
    message: z
      .string()
      .trim()
      .min(10, "Please share a little about your inquiry.")
      .max(5000),
    smsConsent: z.boolean().default(false),
    website: honeypot,
  })
  .superRefine((inquiry, ctx) => {
    if (inquiry.smsConsent && !inquiry.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Add a mobile number to opt in to text messages.",
      });
    }
  });

export type PartnershipInquiryInput = z.input<typeof partnershipInquirySchema>;

const optionalPhone = z.string().trim().max(32).optional().or(z.literal(""));

/**
 * Public, educational mortgage readiness intake. It accepts only the data needed
 * to respond to a consultation request and never accepts sensitive loan documents.
 */
export const mortgageLeadSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required.").max(80),
    lastName: z.string().trim().min(1, "Last name is required.").max(80),
    email: z.string().trim().email("Enter a valid email address.").max(320),
    phone: optionalPhone,
    preferredContact: z.enum(["email", "phone"]),
    assessmentGoal: z.string().trim().max(120).optional(),
    assessmentConcern: z.string().trim().max(120).optional(),
    assessmentTimeline: z.string().trim().max(80).optional(),
    contactConsent: z.literal(true, {
      error: "Please confirm that we may respond to this request.",
    }),
    smsConsent: z.boolean().default(false),
    privacyAcknowledged: z.literal(true, {
      error: "Please acknowledge the privacy notice.",
    }),
    website: honeypot,
  })
  .superRefine((lead, ctx) => {
    if (lead.preferredContact === "phone" && !lead.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "A phone number is required when phone is selected.",
      });
    }
    if (lead.smsConsent && !lead.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Add a mobile number to opt in to text messages.",
      });
    }
  });

export type MortgageLeadInput = z.infer<typeof mortgageLeadSchema>;

/** Dashboard filters, parsed from the URL query string. Invalid values are dropped. */
export const mortgageLeadFilterSchema = z.object({
  search: z.string().trim().max(120).optional().catch(undefined),
  preferredContact: z.enum(["email", "phone"]).optional().catch(undefined),
  assessmentGoal: z.string().trim().max(120).optional().catch(undefined),
  assessmentTimeline: z.string().trim().max(80).optional().catch(undefined),
});

export type MortgageLeadFilters = z.infer<typeof mortgageLeadFilterSchema>;

/** Converts a Next.js searchParams object into validated dashboard filters. */
export function parseLeadFilters(
  params: Record<string, string | string[] | undefined>
): MortgageLeadFilters {
  const pick = (key: string) => {
    const value = params[key];
    const single = Array.isArray(value) ? value[0] : value;
    return single?.trim() ? single : undefined;
  };
  return mortgageLeadFilterSchema.parse({
    search: pick("search"),
    preferredContact: pick("preferredContact"),
    assessmentGoal: pick("assessmentGoal"),
    assessmentTimeline: pick("assessmentTimeline"),
  });
}

export type ActionResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

/** First readable validation message, used for form-level error text. */
export function firstIssueMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "Please review the form and try again.";
}

/** Field name → first message, for inline errors linked with aria-describedby. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return errors;
}

/** Shown after any successful form submission. */
export const FORM_SUCCESS_MESSAGE =
  "Thank you! We received your request. Please allow 1–2 working days for us to get back to you.";
