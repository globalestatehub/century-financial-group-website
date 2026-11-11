# Century Mortgage Funnel: Archive-Specific Integration Plan

## Executive Summary

The supplied archive contains a complete **California Mortgage Readiness Assessment** lead-capture feature, not a standalone service that should be deployed beside the current website. It is compatible with the existing React, TypeScript, Express, tRPC, Drizzle, and MySQL/TiDB project. The recommended approach is to **transplant the contained assessment and compliant mortgage-lead intake capability into the current site**, preserving the existing LIMinistries partnership page, Century Financial Group identity block, inquiry form, FAQ, and database records.

> **Do not copy the archive wholesale.** Its `Home.tsx`, application shell, server bootstrap, dependency lockfile, and initial migration duplicate structures that already exist in the website and could replace current functionality or produce database conflicts.

## Capabilities Identified in the Archive

| Capability | Archive components | Recommended treatment in this website |
|---|---|---|
| Mortgage readiness assessment | `client/src/pages/Home.tsx` | Add as a dedicated section or route; retain its three sequential questions, progress indicator, result profile, guidance, and restart control. |
| Public mortgage consultation intake | `server/leads.ts`, `server/routers.ts`, `server/db.ts` | Add as a separate public `leads.capture` tRPC mutation alongside the existing `partnershipInquiry.submit` mutation. |
| Lead storage | `drizzle/schema.ts`, `drizzle/0000_wild_serpent_society.sql` | Add only the `mortgageLeads` table and create a **new** migration against the current schema. Do not apply the archive migration directly. |
| Consent and privacy controls | Lead form markup and `leadCaptureSchema` | Preserve the required contact consent, privacy acknowledgement, optional SMS consent, intake-purpose notice, and honeypot field. |
| Input validation and tests | `server/leads.test.ts` | Reuse the validation tests and extend them for the live route and form behavior. |

The archive’s active assessment asks three non-sensitive questions: the visitor’s mortgage goal, the area of uncertainty, and their timing. It then shows a simple educational readiness profile and offers a request for a California-licensed response. The intake flow is explicitly designed not to collect Social Security numbers, financial-account numbers, loan documents, or other loan-application data.

## Required Codebase Changes

### 1. Add the Mortgage Lead Data Model

Extend `drizzle/schema.ts` with the archive’s `mortgageLeads` table. Keep the existing `users` and `partnershipInquiries` tables unchanged. The table should retain the archive’s fields for first and last name, email, optional phone, preferred response method, assessment answers, contact consent, SMS consent, privacy acknowledgement, source, licensing disclosure, and creation timestamp.

The current site already has a database connection and Drizzle configuration, so no new database provider or credentials are required. The archive’s migration must not be copied because it also creates the `users` table, which already exists in the live project. Instead, generate a new migration from the current schema and inspect it before it is applied.

```bash
pnpm drizzle-kit generate
```

After reviewing the generated SQL, apply only that newly generated migration through the project’s database migration workflow. The expected non-destructive result is one new `mortgageLeads` table.

### 2. Add the Server-Side Intake Contract

Create `server/leads.ts` from the archive’s implementation and add `createMortgageLead()` to `server/db.ts`. Register a public `leads.capture` mutation in `server/routers.ts`.

The server must retain these validation rules:

| Rule | Required behavior |
|---|---|
| Contact consent | Must be affirmatively `true`; reject a submission without it. |
| Privacy acknowledgement | Must be affirmatively `true`; reject a submission without it. |
| Phone response | Require a phone number when `preferredContact` is `phone`. |
| SMS request | Require a phone number when optional SMS consent is selected. |
| Honeypot | Accept only an empty `website` field; silently reject or discard populated submissions. |
| Sensitive data | Do not add fields for SSNs, bank information, credit-report documents, or loan application documents. |

The existing partnership inquiry endpoint and mortgage-lead endpoint should remain distinct. A partnership request relates to LIMinistries collaboration; a mortgage readiness lead relates to a potential California mortgage consultation. Keeping these records separate improves routing and data minimization.

### 3. Add the Mortgage Readiness Experience to the Front End

Do not replace the existing partnership page’s `Home.tsx`. Extract the archive’s assessment into either a dedicated component such as `client/src/components/MortgageReadinessAssessment.tsx` or a dedicated route such as `/mortgage-readiness`, then add a clear CTA from the existing Century Financial Group identity section.

The component should reproduce only the archive’s functional flow:

1. Ask the user’s mortgage goal: first purchase, refinance, home equity, or investment property.
2. Ask the user’s primary uncertainty: credit, down payment, paperwork, or lender selection.
3. Ask the visitor’s timing: within three months, three to six months, or exploration.
4. Display an educational readiness profile and a next-step summary.
5. Present the public consultation form only after the assessment result.

Use the existing Century Financial Group logo and disclosure styling already present on the site. Do not duplicate the logo asset or create alternate branding. The form lockup should retain the archive’s Century Financial Group, Corp. name, California DRE #01930905, MLO License Endorsement #1974007, and the clear statement that the form is **not a loan application, prequalification, approval, or commitment to lend**.

### 4. Preserve the Archive’s Collection Notice and Consent Controls

Place the required contact-consent checkbox and privacy acknowledgement directly above the submit button. The privacy notice should explain that the information is collected to respond to the request, tailor educational follow-up, and maintain consent records. It should also state that the form does not seek sensitive loan-application information.

The archive includes a placeholder instruction for a company-approved privacy-policy URL and privacy-request channel. Before launch, replace that placeholder with Century Financial Group’s approved policy link and request channel. No new secret is needed for the feature itself.

The optional SMS checkbox must remain disabled or omitted until there is an approved message-handling workflow that records the opt-in and can honor STOP/opt-out requests. The archive does not contain an SMS delivery or CRM integration; it only captures and stores the consent preference.

### 5. Migrate Styles Carefully

The archive’s `client/src/index.css` contains full-page mortgage-funnel styles. Copying it would overwrite the current Covenant Ledger design. Move only the scoped assessment selectors into the current stylesheet or, preferably, give the assessment component its own scoped CSS module. Reuse the current color and typography tokens where they do not weaken the archive’s required clarity, consent visibility, or form error states.

## Dependencies and Configuration

No new application dependency is required. The archive and the current project use the same essential stack: React, TypeScript, tRPC, Zod, Drizzle, MySQL/TiDB, Lucide icons, and the existing notification/toast components.

| Item | Status | Action required |
|---|---|---|
| Database connection | Already available | Reuse the existing `DATABASE_URL`; do not add a new credential. |
| Client/server framework | Already compatible | Reuse existing tRPC client and router patterns. |
| Century logo and DRE data | Already integrated | Reuse existing hosted logo asset and displayed credentials. |
| Privacy policy URL | Required before production launch | Replace the archive placeholder with the company-approved URL and privacy request channel. |
| SMS provider or CRM routing | Not included in archive | Do not enable SMS consent or claim automated follow-up until an approved process is supplied. |

## Verification and Release Sequence

First, add `server/leads.test.ts` from the archive and extend it to test a valid public submission, missing consent, missing privacy acknowledgement, missing phone for phone contact, and missing phone for SMS consent. Add client-level tests for question progression, profile selection, reset behavior, and form error rendering.

Second, run the full quality gate:

```bash
pnpm test
pnpm check
pnpm build
```

Third, conduct a responsive review at desktop and mobile widths. Confirm that each readiness question progresses once, the result appears only after all three answers, the consultation form is reachable, error messages are visible, and the consent controls retain readable labels and focus states.

Finally, save a project checkpoint. The site can then be published through the project interface. The archive does not require a custom runtime, background service, container, scheduled job, or external deployment platform.

## Explicit Non-Integrations

The following archive elements should not be embedded because they are duplicate application infrastructure rather than mortgage-funnel capability: `server/index.ts`, `server/_core/*`, `client/src/App.tsx`, `client/src/main.tsx`, `package.json`, `pnpm-lock.yaml`, existing generic UI components, and the archive’s initial `0000_wild_serpent_society.sql` migration.

The archive also does not provide CRM delivery, email sending, SMS sending, credit checks, prequalification, loan decisioning, document collection, rate quotes, or loan-application processing. The integrated feature should not promise any of these capabilities.

## Sources

This plan is based on the attached `century-mortgage-funnel-guide.zip`, particularly `LEAD_CAPTURE_IMPLEMENTATION.md`, `client/src/pages/Home.tsx`, `server/leads.ts`, `server/routers.ts`, `server/db.ts`, `drizzle/schema.ts`, `drizzle/0000_wild_serpent_society.sql`, and `server/leads.test.ts`. The archive itself references the California Department of Real Estate’s advertising guidance and California privacy guidance for the disclosure and collection-notice framing.[1] [2]

[1]: https://dre.ca.gov/files/pdf/forms/re559.pdf "California DRE RE 559 — License Disclosure Requirements for Advertising"
[2]: https://oag.ca.gov/privacy/ccpa "California Department of Justice — California Consumer Privacy Act"
