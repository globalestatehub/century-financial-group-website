/**
 * Pure builders for the n8n form-handler payload. Kept free of server-only
 * imports so they can be unit-tested. n8n expects a flat object of strings with
 * snake_case keys (it turns `preferred_contact` into "Preferred Contact").
 */
import {
  partnershipInterestOptions,
  professionalRoleOptions,
} from "@/lib/content/partnership";
import type {
  MortgageLeadInput,
  PartnershipInquiryInput,
} from "@/lib/validation";

export type N8nFormType = "contact" | "inquiry" | "booking";
export type N8nFields = Record<string, string>;

const yesNo = (value: boolean | undefined) => (value ? "Yes" : "No");
const labelFor = (
  options: readonly { value: string; label: string }[],
  value: string
) => options.find(option => option.value === value)?.label ?? value;

export function partnershipInquiryFields(
  input: PartnershipInquiryInput
): N8nFields {
  return {
    form_name: "Partnership Inquiry",
    name: input.fullName,
    email: input.email,
    phone: input.phone ?? "",
    professional_role: labelFor(
      professionalRoleOptions,
      input.professionalRole
    ),
    company: input.company,
    license_number: input.licenseNumber ?? "",
    service_areas: input.serviceAreas ?? "",
    partnership_interest: labelFor(
      partnershipInterestOptions,
      input.partnershipInterest
    ),
    message: input.message,
    sms_consent: yesNo(input.smsConsent),
    website: input.website ?? "",
  };
}

export function mortgageLeadFields(input: MortgageLeadInput): N8nFields {
  return {
    form_name: "Mortgage Readiness Request",
    name: `${input.firstName} ${input.lastName}`.trim(),
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    phone: input.phone ?? "",
    preferred_contact: input.preferredContact === "phone" ? "Phone" : "Email",
    mortgage_goal: input.assessmentGoal ?? "",
    primary_concern: input.assessmentConcern ?? "",
    timeline: input.assessmentTimeline ?? "",
    contact_consent: yesNo(input.contactConsent),
    sms_consent: yesNo(input.smsConsent),
    privacy_acknowledged: yesNo(input.privacyAcknowledged),
    website: input.website ?? "",
  };
}

/** Adds the server-controlled routing fields. Visitors can never set these. */
export function buildN8nPayload(
  site: { siteName: string; contactEmail: string },
  formType: N8nFormType,
  fields: N8nFields
) {
  return {
    ...fields,
    site_name: site.siteName,
    contact_email: site.contactEmail,
    form_type: formType,
  };
}

/** Maps an n8n status code to the message the visitor sees (never n8n's own text). */
export function visitorMessageForStatus(status: number) {
  if (status === 400) return "Please check your name and email and try again.";
  return "Something went wrong. Please try again later.";
}

/**
 * Hostnames a Turnstile token may come from. Uses TURNSTILE_HOSTNAMES when set,
 * otherwise the production site host and its www variant. Never adds localhost.
 */
export function expectedTurnstileHostnames(
  configured: string | undefined,
  siteUrl: string
) {
  const fromEnv = (configured ?? "")
    .split(",")
    .map(hostname => hostname.trim().toLowerCase())
    .filter(Boolean);
  if (fromEnv.length) return new Set(fromEnv);
  const host = new URL(siteUrl).hostname.toLowerCase();
  const bare = host.replace(/^www\./, "");
  return new Set([bare, `www.${bare}`]);
}
