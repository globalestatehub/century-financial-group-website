import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { CircleAlert, Download, FileSpreadsheet, Filter, Mail, Phone, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { assessmentGoals, assessmentTimelines } from "@/lib/content/mortgage-readiness";
import { listMortgageLeads } from "@/lib/db";
import { type MortgageLeadFilters, parseLeadFilters } from "@/lib/validation";

export const metadata: Metadata = {
  title: "Mortgage readiness leads",
  robots: { index: false, follow: false },
};

type SearchParams = PageProps<"/dashboard/mortgage-leads">["searchParams"];

/** Internal lead review. Access is enforced by Basic Auth in proxy.ts. */
export default function MortgageLeadsDashboard({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="min-h-screen bg-mist p-4 sm:p-8">
      <main id="main-content" className="mx-auto max-w-7xl">
        <Suspense fallback={<p className="py-16 text-center text-[#5B6A60]">Loading mortgage readiness leads…</p>}>
          <Dashboard searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}

async function Dashboard({ searchParams }: { searchParams: SearchParams }) {
  await connection();
  const filters = parseLeadFilters(await searchParams);
  const query = toQueryString(filters);

  return (
    <>
      <div className="border-b border-line pb-8">
        <p className="text-xs font-bold tracking-[0.16em] text-forest uppercase">
          Century Financial Group · Internal use
        </p>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-serif text-5xl leading-none font-bold text-forest-deep">Mortgage readiness leads</h1>
            <p className="mt-4 max-w-2xl leading-7 text-moss">
              Review educational consultation requests, narrow the list with basic filters, and export
              the current filtered results for approved follow-up.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/dashboard/mortgage-leads/export?format=csv${query && `&${query}`}`}
              className="inline-flex items-center gap-2 border border-forest px-4 py-3 text-xs font-bold tracking-[0.12em] text-forest uppercase hover:bg-mint"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
            </a>
            <a
              href={`/dashboard/mortgage-leads/export?format=xls${query && `&${query}`}`}
              className="inline-flex items-center gap-2 bg-forest px-4 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase hover:bg-forest-dark"
            >
              <FileSpreadsheet className="h-4 w-4" aria-hidden="true" /> Export Excel
            </a>
          </div>
        </div>
      </div>

      <form method="get" className="mt-8 border border-line bg-white p-5 sm:p-6" aria-label="Mortgage lead filters">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
          <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-2 text-xs font-bold tracking-[0.12em] text-forest-deep uppercase">
              <span>Search</span>
              <span className="flex items-center border border-sage bg-white px-3">
                <Search className="mr-2 h-4 w-4 text-forest" aria-hidden="true" />
                <input
                  name="search"
                  defaultValue={filters.search}
                  className="w-full py-2 text-sm font-normal tracking-normal normal-case outline-none"
                  placeholder="Name, email, phone"
                />
              </span>
            </label>
            <FilterSelect
              label="Preferred response"
              name="preferredContact"
              value={filters.preferredContact}
              options={[["", "All responses"], ["email", "Email"], ["phone", "Phone"]]}
            />
            <FilterSelect
              label="Mortgage goal"
              name="assessmentGoal"
              value={filters.assessmentGoal}
              options={[["", "All mortgage goals"], ...assessmentGoals.map((goal) => [goal, goal] as [string, string])]}
            />
            <FilterSelect
              label="Timeline"
              name="assessmentTimeline"
              value={filters.assessmentTimeline}
              options={[["", "All timelines"], ...assessmentTimelines.map((t) => [t, t] as [string, string])]}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-forest px-4 py-3 text-xs font-bold tracking-[0.12em] text-white uppercase hover:bg-forest-dark"
            >
              <Filter className="h-4 w-4" aria-hidden="true" /> Apply
            </button>
            <Link
              href="/dashboard/mortgage-leads"
              className="inline-flex items-center gap-2 border border-sage px-4 py-3 text-xs font-bold tracking-[0.12em] text-forest-deep uppercase hover:bg-mint"
            >
              Reset
            </Link>
          </div>
        </div>
      </form>

      <LeadsTable filters={filters} />
    </>
  );
}

async function LeadsTable({ filters }: { filters: MortgageLeadFilters }) {
  let leads: Awaited<ReturnType<typeof listMortgageLeads>> = [];
  let error = "";
  try {
    leads = await listMortgageLeads(filters);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : "Lead records could not be loaded.";
  }

  return (
    <>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-moss">
          {error ? "—" : `${leads.length} matching lead${leads.length === 1 ? "" : "s"}`}
        </p>
        <p className="text-xs text-[#5B6A60]">Exports reflect the active filters.</p>
      </div>
      <section className="mt-4 border border-line bg-white">
        <Table>
          <TableHeader className="bg-mint">
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Mortgage goal</TableHead>
              <TableHead>Concern</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Consent</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex items-center gap-3 py-8 text-red-700" role="alert">
                    <CircleAlert className="h-5 w-5" aria-hidden="true" />
                    {error}
                  </div>
                </TableCell>
              </TableRow>
            ) : leads.length ? (
              leads.map((lead) => {
                const confirmed = lead.contactConsent && lead.privacyAcknowledged;
                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <p className="font-semibold text-forest-deep">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="mt-1 text-xs text-[#5B6A60]">{lead.email}</p>
                    </TableCell>
                    <TableCell>
                      <p className="flex items-center gap-1.5 font-medium text-forest-deep">
                        {lead.preferredContact === "email" ? (
                          <Mail className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                        ) : (
                          <Phone className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                        )}
                        {lead.preferredContact === "email" ? "Email" : "Phone"}
                      </p>
                      {lead.phone && <p className="mt-1 text-xs text-[#5B6A60]">{lead.phone}</p>}
                    </TableCell>
                    <TableCell>{lead.assessmentGoal || "—"}</TableCell>
                    <TableCell>{lead.assessmentConcern || "—"}</TableCell>
                    <TableCell>{lead.assessmentTimeline || "—"}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          confirmed ? "bg-mint text-forest" : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {confirmed ? "Confirmed" : "Review"}
                      </span>
                      {lead.smsConsent && <p className="mt-1 text-xs text-[#5B6A60]">SMS opt-in</p>}
                    </TableCell>
                    <TableCell className="text-xs text-[#5B6A60]">
                      <time dateTime={lead.createdAt.toISOString()}>
                        {lead.createdAt.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}
                      </time>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-16 text-center whitespace-normal">
                  <p className="font-serif text-3xl font-bold text-forest-deep">
                    No mortgage readiness leads match these filters.
                  </p>
                  <p className="mt-3 text-sm text-[#5B6A60]">
                    New consultation requests will appear here after a completed assessment form submission.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </>
  );
}

function FilterSelect({
  label,
  name,
  value,
  options,
}: {
  label: string;
  name: string;
  value?: string;
  options: [string, string][];
}) {
  return (
    <label className="grid gap-2 text-xs font-bold tracking-[0.12em] text-forest-deep uppercase">
      <span>{label}</span>
      <select
        name={name}
        defaultValue={value ?? ""}
        className="border border-sage bg-white px-3 py-2.5 text-sm font-normal tracking-normal text-forest-deep normal-case outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue || "all"} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function toQueryString(filters: MortgageLeadFilters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}
