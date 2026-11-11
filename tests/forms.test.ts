import { describe, expect, it } from "vitest";
import {
  buildN8nPayload,
  expectedTurnstileHostnames,
  mortgageLeadFields,
  partnershipInquiryFields,
  visitorMessageForStatus,
} from "@/lib/forms/payload";
import { mortgageLeadSchema, partnershipInquirySchema } from "@/lib/validation";

const site = {
  siteName: "Century Financial Group Net",
  contactEmail: "info@centuryfinancialgroup.net",
};

describe("n8n payload", () => {
  it("builds a flat, string-only partnership inquiry with readable labels", () => {
    const input = partnershipInquirySchema.parse({
      fullName: "Jordan Agent",
      email: "jordan@example.com",
      professionalRole: "loan_officer",
      company: "Example Lending",
      partnershipInterest: "brokerage_integration",
      message: "We would like to talk about a brokerage program.",
      website: "",
    });
    const payload = buildN8nPayload(
      site,
      "inquiry",
      partnershipInquiryFields(input)
    );

    expect(payload).toMatchObject({
      site_name: "Century Financial Group Net",
      contact_email: "info@centuryfinancialgroup.net",
      form_type: "inquiry",
      form_name: "Partnership Inquiry",
      name: "Jordan Agent",
      email: "jordan@example.com",
      professional_role: "Loan officer / MLO",
      partnership_interest: "Brokerage-wide integration",
      sms_consent: "No",
      website: "",
    });
    for (const value of Object.values(payload))
      expect(typeof value).toBe("string");
  });

  it("combines first and last name for mortgage leads and records consent", () => {
    const input = mortgageLeadSchema.parse({
      firstName: "Sam",
      lastName: "Buyer",
      email: "sam@example.com",
      phone: "714-555-0100",
      preferredContact: "phone",
      assessmentGoal: "Refinance",
      contactConsent: true,
      smsConsent: true,
      privacyAcknowledged: true,
    });
    const fields = mortgageLeadFields(input);
    expect(fields.name).toBe("Sam Buyer");
    expect(fields.preferred_contact).toBe("Phone");
    expect(fields.sms_consent).toBe("Yes");
    expect(fields.mortgage_goal).toBe("Refinance");
  });

  it("never lets visitor fields override the server routing values", () => {
    const payload = buildN8nPayload(site, "inquiry", {
      contact_email: "attacker@example.com",
      site_name: "Spoofed",
      form_type: "booking",
    });
    expect(payload.contact_email).toBe("info@centuryfinancialgroup.net");
    expect(payload.site_name).toBe("Century Financial Group Net");
    expect(payload.form_type).toBe("inquiry");
  });

  it("maps n8n errors to safe visitor messages", () => {
    expect(visitorMessageForStatus(400)).toBe(
      "Please check your name and email and try again."
    );
    expect(visitorMessageForStatus(403)).toBe(
      "Something went wrong. Please try again later."
    );
    expect(visitorMessageForStatus(500)).toBe(
      "Something went wrong. Please try again later."
    );
  });
});

describe("Turnstile hostname allowlist", () => {
  it("defaults to the production host and its www variant, never localhost", () => {
    const hosts = expectedTurnstileHostnames(
      undefined,
      "https://centuryfinancialgroup.net"
    );
    expect([...hosts]).toEqual([
      "centuryfinancialgroup.net",
      "www.centuryfinancialgroup.net",
    ]);
    expect(hosts.has("localhost")).toBe(false);
  });

  it("uses the configured list when provided", () => {
    const hosts = expectedTurnstileHostnames(
      " localhost , Preview.example.com ",
      "https://centuryfinancialgroup.net"
    );
    expect([...hosts]).toEqual(["localhost", "preview.example.com"]);
  });
});
