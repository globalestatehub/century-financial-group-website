import { describe, expect, it } from "vitest";
import { mortgageLeadsToCsv, mortgageLeadsToExcelHtml, type MortgageLeadExportRecord } from "@/lib/lead-export";
import {
  mortgageLeadSchema,
  parseLeadFilters,
  partnershipInquirySchema,
} from "@/lib/validation";

const validInquiry = {
  fullName: "Jordan Agent",
  email: "jordan@example.com",
  professionalRole: "realtor",
  company: "Example Realty",
  partnershipInterest: "pilot_partnership",
  message: "We would like to start a pilot partnership.",
};

const validLead = {
  firstName: "Sam",
  lastName: "Buyer",
  email: "sam@example.com",
  phone: "",
  preferredContact: "email",
  contactConsent: true,
  smsConsent: false,
  privacyAcknowledged: true,
  website: "",
};

describe("partnership inquiry validation", () => {
  it("accepts a complete inquiry", () => {
    expect(partnershipInquirySchema.safeParse(validInquiry).success).toBe(true);
  });

  it("rejects a bad email, unknown role, and short message", () => {
    expect(partnershipInquirySchema.safeParse({ ...validInquiry, email: "nope" }).success).toBe(false);
    expect(partnershipInquirySchema.safeParse({ ...validInquiry, professionalRole: "x" }).success).toBe(false);
    expect(partnershipInquirySchema.safeParse({ ...validInquiry, message: "hi" }).success).toBe(false);
  });
});

describe("mortgage lead validation", () => {
  it("accepts a consented email lead", () => {
    expect(mortgageLeadSchema.safeParse(validLead).success).toBe(true);
  });

  it("requires contact consent and the privacy acknowledgement", () => {
    expect(mortgageLeadSchema.safeParse({ ...validLead, contactConsent: false }).success).toBe(false);
    expect(mortgageLeadSchema.safeParse({ ...validLead, privacyAcknowledged: false }).success).toBe(false);
  });

  it("requires a phone number for phone contact or SMS opt-in", () => {
    expect(mortgageLeadSchema.safeParse({ ...validLead, preferredContact: "phone" }).success).toBe(false);
    expect(mortgageLeadSchema.safeParse({ ...validLead, smsConsent: true }).success).toBe(false);
    expect(
      mortgageLeadSchema.safeParse({ ...validLead, preferredContact: "phone", phone: "714-555-0100" }).success
    ).toBe(true);
  });

  it("rejects submissions that fill the honeypot", () => {
    expect(mortgageLeadSchema.safeParse({ ...validLead, website: "spam.example" }).success).toBe(false);
  });
});

describe("dashboard filters", () => {
  it("keeps valid filters and drops invalid ones", () => {
    expect(parseLeadFilters({ preferredContact: "phone", search: " sam " })).toEqual({
      preferredContact: "phone",
      search: "sam",
      assessmentGoal: undefined,
      assessmentTimeline: undefined,
    });
    expect(parseLeadFilters({ preferredContact: "fax", search: "" }).preferredContact).toBeUndefined();
  });
});

describe("lead export", () => {
  const lead: MortgageLeadExportRecord = {
    firstName: 'Sam "The" Buyer',
    lastName: "=HYPERLINK(\"x\")",
    email: "sam@example.com",
    phone: null,
    preferredContact: "email",
    assessmentGoal: "Refinance",
    assessmentConcern: null,
    assessmentTimeline: "Just exploring",
    contactConsent: true,
    smsConsent: false,
    privacyAcknowledged: true,
    createdAt: new Date("2026-09-16T12:00:00Z"),
  };

  it("quotes CSV cells and neutralises spreadsheet formulas", () => {
    const [header, row] = mortgageLeadsToCsv([lead]).split("\n");
    expect(header.startsWith('"First name","Last name"')).toBe(true);
    expect(row).toContain('"Sam ""The"" Buyer"');
    expect(row).toContain(`"'=HYPERLINK(""x"")"`);
    expect(row).toContain('"2026-09-16T12:00:00.000Z"');
  });

  it("escapes HTML in the Excel export", () => {
    const html = mortgageLeadsToExcelHtml([{ ...lead, firstName: "<b>Sam</b>" }]);
    expect(html).toContain("&lt;b&gt;Sam&lt;/b&gt;");
    expect(html).not.toContain("<b>Sam</b>");
  });
});
