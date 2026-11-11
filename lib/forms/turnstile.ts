/** Turnstile widget actions. The server rejects tokens whose action does not match. */
export const TURNSTILE_ACTIONS = {
  partnershipInquiry: "partnership_inquiry",
  mortgageReadiness: "mortgage_readiness",
} as const;

/** Public site key (safe to expose). The secret lives only in TURNSTILE_SECRET_KEY. */
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFHWb2rHJ_yYHvH9";
