export type MortgageLeadExportRecord = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  preferredContact: "email" | "phone";
  assessmentGoal: string | null;
  assessmentConcern: string | null;
  assessmentTimeline: string | null;
  contactConsent: boolean;
  smsConsent: boolean;
  privacyAcknowledged: boolean;
  createdAt: Date;
};

const columns: {
  label: string;
  value: (lead: MortgageLeadExportRecord) => string;
}[] = [
  { label: "First name", value: lead => lead.firstName },
  { label: "Last name", value: lead => lead.lastName },
  { label: "Email", value: lead => lead.email },
  { label: "Phone", value: lead => lead.phone || "" },
  { label: "Preferred response", value: lead => lead.preferredContact },
  { label: "Mortgage goal", value: lead => lead.assessmentGoal || "" },
  { label: "Primary concern", value: lead => lead.assessmentConcern || "" },
  { label: "Timeline", value: lead => lead.assessmentTimeline || "" },
  { label: "Contact consent", value: lead => String(lead.contactConsent) },
  { label: "SMS consent", value: lead => String(lead.smsConsent) },
  {
    label: "Privacy acknowledged",
    value: lead => String(lead.privacyAcknowledged),
  },
  {
    label: "Submitted at",
    value: lead => new Date(lead.createdAt).toISOString(),
  },
];

/**
 * Quote every cell, and neutralise values that spreadsheet apps would execute
 * as formulas (CSV injection), since lead fields come from a public form.
 */
const csvEscape = (raw: string) => {
  const value = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${value.replaceAll('"', '""')}"`;
};

export function mortgageLeadsToCsv(leads: MortgageLeadExportRecord[]) {
  return [
    columns.map(column => csvEscape(column.label)).join(","),
    ...leads.map(lead =>
      columns.map(column => csvEscape(column.value(lead))).join(",")
    ),
  ].join("\n");
}

export function mortgageLeadsToExcelHtml(leads: MortgageLeadExportRecord[]) {
  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  return `<!doctype html><html><head><meta charset="UTF-8"></head><body><table><thead><tr>${columns
    .map(column => `<th>${escapeHtml(column.label)}</th>`)
    .join("")}</tr></thead><tbody>${leads
    .map(
      lead =>
        `<tr>${columns.map(column => `<td>${escapeHtml(column.value(lead))}</td>`).join("")}</tr>`
    )
    .join("")}</tbody></table></body></html>`;
}
