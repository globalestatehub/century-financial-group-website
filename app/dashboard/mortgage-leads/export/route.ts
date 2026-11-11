import type { NextRequest } from "next/server";
import { listMortgageLeads } from "@/lib/db";
import {
  mortgageLeadsToCsv,
  mortgageLeadsToExcelHtml,
} from "@/lib/lead-export";
import { parseLeadFilters } from "@/lib/validation";

/** Downloads the filtered lead list. Protected by Basic Auth in proxy.ts. */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters = parseLeadFilters(Object.fromEntries(searchParams));
  const format = searchParams.get("format") === "xls" ? "xls" : "csv";

  let leads;
  try {
    leads = await listMortgageLeads(filters, 5000);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Lead records could not be loaded.";
    return new Response(message, { status: 503 });
  }

  const body =
    format === "xls"
      ? mortgageLeadsToExcelHtml(leads)
      : mortgageLeadsToCsv(leads);
  return new Response(body, {
    headers: {
      "Content-Type":
        format === "xls"
          ? "application/vnd.ms-excel"
          : "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mortgage-readiness-leads.${format}"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
