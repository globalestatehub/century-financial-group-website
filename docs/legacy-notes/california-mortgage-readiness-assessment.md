# California Mortgage Readiness Assessment

This implementation package provides a reusable React assessment component, the matching tRPC lead-capture contract, a Drizzle database schema, and the environment configuration required to store mortgage-readiness leads. It is derived from the attached mortgage-funnel archive and deliberately limits intake to consultation-request information. It does **not** collect loan-application documents, Social Security numbers, financial-account details, or credit-report data.

> **Implementation boundary:** The component produces educational readiness guidance only. Its on-page disclosure states that submission is not a loan application, prequalification, approval, or commitment to lend.

## 1. Frontend Component

Create `client/src/components/MortgageReadinessAssessment.tsx`. The component assumes an existing tRPC React client exported as `trpc` from `@/lib/trpc`, which is the convention used by the current website.

```tsx
import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import "./MortgageReadinessAssessment.css";

/** The assessment intentionally asks only non-sensitive educational questions. */
const assessmentSteps = [
  {
    question: "What would you like to accomplish?",
    answers: ["Buy my first home", "Refinance", "Use home equity", "Invest in property"],
  },
  {
    question: "Which part feels least clear?",
    answers: ["My credit score", "The down payment", "The paperwork", "Finding the right lender"],
  },
  {
    question: "What is your timeline?",
    answers: ["Within 3 months", "3–6 months", "Just exploring"],
  },
] as const;

type LeadFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone";
  contactConsent: boolean;
  smsConsent: boolean;
  privacyAcknowledged: boolean;
  /** Honeypot: must remain blank for normal human submissions. */
  website: string;
};

const initialLeadForm: LeadFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "email",
  contactConsent: false,
  smsConsent: false,
  privacyAcknowledged: false,
  website: "",
};

function getProfile(goal?: string) {
  if (goal === "Buy my first home") return "The Cautious California Buyer";
  if (goal === "Refinance") return "The Savvy Refinancer";
  return "The Prepared Explorer";
}

function getGuidance(goal?: string, concern?: string) {
  const goalAdvice =
    goal === "Buy my first home"
      ? "Begin by organizing your savings plan, income documentation, and homebuying questions."
      : goal === "Refinance"
        ? "Begin by gathering your current loan information and identifying the outcome you want to evaluate."
        : goal === "Use home equity"
          ? "Begin by clarifying the intended use of funds and the home-equity questions you want answered."
          : "Begin by defining your property strategy, timing, and education priorities.";

  const concernAdvice =
    concern === "My credit score"
      ? "Write down the credit questions you want to discuss before making major financial changes."
      : concern === "The down payment"
        ? "Identify your available funds and the down-payment topics you need explained."
        : concern === "The paperwork"
          ? "Create a simple document checklist with a licensed professional before sharing any sensitive records."
          : "Prepare questions about lender selection, available options, and the next educational step.";

  return [goalAdvice, concernAdvice, "Use the consultation request below only when you are ready for a California-licensed team member to respond."];
}

/**
 * Educational mortgage readiness quiz with a consent-aware consultation request.
 * Use it on a dedicated mortgage page or in a clearly separated mortgage section.
 */
export function MortgageReadinessAssessment() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [leadForm, setLeadForm] = useState<LeadFormState>(initialLeadForm);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentStep = answers.length;
  const assessmentComplete = currentStep === assessmentSteps.length;
  const profile = useMemo(() => getProfile(answers[0]), [answers]);
  const guidance = useMemo(() => getGuidance(answers[0], answers[1]), [answers]);

  const captureLead = trpc.leads.capture.useMutation({
    onSuccess: () => {
      setFormError("");
      setSubmitted(true);
    },
    onError: (error) => {
      setFormError(error.message || "We could not save your request. Please try again in a moment.");
    },
  });

  const chooseAnswer = (answer: string) => {
    if (!assessmentComplete) setAnswers((current) => [...current, answer]);
  };

  const goBack = () => setAnswers((current) => current.slice(0, -1));

  const restart = () => {
    setAnswers([]);
    setLeadForm(initialLeadForm);
    setFormError("");
    setSubmitted(false);
  };

  const updateLeadForm = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setLeadForm((current) => ({ ...current, [target.name]: value }));
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!leadForm.contactConsent || !leadForm.privacyAcknowledged) {
      setFormError("Please confirm consent and acknowledge the privacy notice before submitting.");
      return;
    }

    captureLead.mutate({
      ...leadForm,
      assessmentGoal: answers[0],
      assessmentConcern: answers[1],
      assessmentTimeline: answers[2],
    });
  };

  return (
    <section className="mortgage-readiness" aria-labelledby="mortgage-readiness-heading">
      <div className="mortgage-readiness__intro">
        <p className="mortgage-readiness__eyebrow">California Mortgage Readiness Assessment</p>
        <h2 id="mortgage-readiness-heading">Clarify your next mortgage question before you take your next step.</h2>
        <p>
          This brief educational assessment helps identify the information you may want to discuss with a California-licensed professional. It is not a loan application, prequalification, approval, or commitment to lend.
        </p>
      </div>

      <div className="mortgage-readiness__panel">
        {!assessmentComplete ? (
          <div aria-live="polite">
            <div className="mortgage-readiness__progress">
              <span>Readiness lens</span>
              <strong>
                {currentStep + 1} / {assessmentSteps.length}
              </strong>
              <div aria-hidden="true">
                <i style={{ width: `${((currentStep + 1) / assessmentSteps.length) * 100}%` }} />
              </div>
            </div>

            <p className="mortgage-readiness__step-label">Question {String(currentStep + 1).padStart(2, "0")}</p>
            <h3>{assessmentSteps[currentStep].question}</h3>
            <div className="mortgage-readiness__options">
              {assessmentSteps[currentStep].answers.map((answer) => (
                <button key={answer} type="button" onClick={() => chooseAnswer(answer)}>
                  <span>{answer}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button type="button" className="mortgage-readiness__back" onClick={goBack}>
                <ChevronLeft size={16} aria-hidden="true" /> Change my previous answer
              </button>
            )}
          </div>
        ) : submitted ? (
          <div className="mortgage-readiness__success" role="status">
            <CheckCircle2 size={32} aria-hidden="true" />
            <p className="mortgage-readiness__eyebrow">Request received</p>
            <h3>Thank you. A California-licensed team member can now respond by your selected method.</h3>
            <p>Your request is not a loan application, prequalification, approval, or commitment to lend.</p>
            <button type="button" className="mortgage-readiness__secondary-button" onClick={restart}>
              <RotateCcw size={16} aria-hidden="true" /> Start a new assessment
            </button>
          </div>
        ) : (
          <div className="mortgage-readiness__result">
            <p className="mortgage-readiness__eyebrow">Your educational readiness profile</p>
            <h3>{profile}</h3>
            <p className="mortgage-readiness__summary">
              Based on your responses, begin by clarifying <strong>{answers[1]?.toLowerCase()}</strong> before trying to solve every variable at once.
            </p>

            <ol className="mortgage-readiness__guidance">
              {guidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>

            <form className="mortgage-readiness__form" onSubmit={submitLead} noValidate>
              <div className="mortgage-readiness__license-lockup">
                <ShieldCheck size={20} aria-hidden="true" />
                <p>
                  <strong>Century Financial Group, Corp.</strong>
                  <span>Licensed California Real Estate Broker · CA DRE #01930905 · MLO License Endorsement #1974007</span>
                </p>
              </div>

              <div className="mortgage-readiness__fields">
                <label>
                  <span>First name <em>*</em></span>
                  <input name="firstName" value={leadForm.firstName} onChange={updateLeadForm} autoComplete="given-name" required />
                </label>
                <label>
                  <span>Last name <em>*</em></span>
                  <input name="lastName" value={leadForm.lastName} onChange={updateLeadForm} autoComplete="family-name" required />
                </label>
                <label className="mortgage-readiness__wide-field">
                  <span>Email address <em>*</em></span>
                  <input name="email" type="email" value={leadForm.email} onChange={updateLeadForm} autoComplete="email" required />
                </label>
                <label>
                  <span>Phone <small>Optional</small></span>
                  <input name="phone" type="tel" value={leadForm.phone} onChange={updateLeadForm} autoComplete="tel" inputMode="tel" />
                </label>
                <label>
                  <span>Preferred response <em>*</em></span>
                  <select name="preferredContact" value={leadForm.preferredContact} onChange={updateLeadForm}>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </label>
                {/* Honeypot is visually hidden; it is not a field for visitors to complete. */}
                <label className="mortgage-readiness__honeypot" aria-hidden="true">
                  <span>Leave this blank</span>
                  <input name="website" value={leadForm.website} onChange={updateLeadForm} tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="mortgage-readiness__consent">
                <label>
                  <input name="contactConsent" type="checkbox" checked={leadForm.contactConsent} onChange={updateLeadForm} required />
                  <span>I agree that Century Financial Group, Corp. may contact me by my selected method to respond to this request. I understand this is not a loan application, prequalification, or commitment to lend. <em>*</em></span>
                </label>
                <label>
                  <input name="smsConsent" type="checkbox" checked={leadForm.smsConsent} onChange={updateLeadForm} />
                  <span>I agree to receive text messages from Century Financial Group, Corp. at the mobile number provided about this request. Consent is not a condition of service. Message and data rates may apply. Reply STOP to opt out.</span>
                </label>
                <label>
                  <input name="privacyAcknowledged" type="checkbox" checked={leadForm.privacyAcknowledged} onChange={updateLeadForm} required />
                  <span>I have read the privacy notice at collection below. <em>*</em></span>
                </label>
              </div>

              <details className="mortgage-readiness__privacy">
                <summary><ShieldCheck size={16} aria-hidden="true" /> Privacy notice at collection</summary>
                <p>
                  Century Financial Group, Corp. collects your name, contact details, selected response preference, and readiness answers to respond to your request, tailor educational follow-up, and maintain consent records. This form does not request Social Security numbers, financial-account numbers, or loan-application documents. Connect this notice to the company-approved privacy policy and privacy-request channel before production release.
                </p>
              </details>

              {formError && <p className="mortgage-readiness__error" role="alert">{formError}</p>}

              <div className="mortgage-readiness__submit-row">
                <p><ShieldCheck size={15} aria-hidden="true" /> Secure request intake · 8295 Bolsa Avenue, Midway City, CA 92655</p>
                <button type="submit" disabled={captureLead.isPending}>
                  {captureLead.isPending ? <><Loader2 className="mortgage-readiness__spinner" size={17} /> Saving request</> : <>Request my next steps <ArrowRight size={17} /></>}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
```

### Component Styles

Create `client/src/components/MortgageReadinessAssessment.css`. These selectors are component-scoped so they do not overwrite the existing partnership-page design.

```css
.mortgage-readiness {
  background: #f2f0e9;
  color: #1a1a1a;
  padding: 5rem 1.25rem;
}

.mortgage-readiness > * { max-width: 980px; margin: 0 auto; }
.mortgage-readiness__intro { max-width: 720px; }
.mortgage-readiness__eyebrow { color: #8c2f00; font-size: .72rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.mortgage-readiness h2, .mortgage-readiness h3 { color: #2e4057; font-family: "Cormorant Garamond", Georgia, serif; }
.mortgage-readiness h2 { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: .95; margin: 1rem 0; }
.mortgage-readiness h3 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1; margin: .75rem 0 1.5rem; }
.mortgage-readiness__intro > p:last-child, .mortgage-readiness__summary { font-size: 1.1rem; line-height: 1.8; }
.mortgage-readiness__panel { background: #e9e6dc; border: 1px solid rgba(26, 26, 26, .15); margin-top: 2.5rem; padding: clamp(1.5rem, 4vw, 3rem); }
.mortgage-readiness__progress { align-items: center; display: grid; gap: .7rem; grid-template-columns: 1fr auto; }
.mortgage-readiness__progress span, .mortgage-readiness__progress strong { font-size: .78rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.mortgage-readiness__progress > div { background: rgba(26, 26, 26, .15); grid-column: 1 / -1; height: 3px; }
.mortgage-readiness__progress i { background: #8c2f00; display: block; height: 100%; transition: width 180ms cubic-bezier(.23,1,.32,1); }
.mortgage-readiness__step-label { color: #8c2f00; font-size: .75rem; font-weight: 700; letter-spacing: .12em; margin-top: 2rem; text-transform: uppercase; }
.mortgage-readiness__options { display: grid; gap: .75rem; }
.mortgage-readiness__options button, .mortgage-readiness__submit-row button { align-items: center; background: #8c2f00; border: 1px solid #8c2f00; color: white; cursor: pointer; display: flex; font-weight: 700; justify-content: space-between; letter-spacing: .05em; padding: 1rem 1.1rem; text-align: left; transition: background-color 160ms ease-out, transform 160ms ease-out; }
.mortgage-readiness__options button:hover, .mortgage-readiness__submit-row button:hover { background: #6e2500; }
.mortgage-readiness__options button:active, .mortgage-readiness__submit-row button:active { transform: scale(.97); }
.mortgage-readiness button:focus-visible, .mortgage-readiness input:focus-visible, .mortgage-readiness select:focus-visible, .mortgage-readiness summary:focus-visible { outline: 3px solid #8c2f00; outline-offset: 3px; }
.mortgage-readiness__back, .mortgage-readiness__secondary-button { align-items: center; background: transparent; border: 0; color: #2e4057; cursor: pointer; display: inline-flex; gap: .35rem; margin-top: 1.5rem; text-decoration: underline; }
.mortgage-readiness__guidance { display: grid; gap: .75rem; line-height: 1.65; margin: 1.5rem 0 2rem; padding-left: 1.4rem; }
.mortgage-readiness__form { border-top: 1px solid rgba(26, 26, 26, .2); margin-top: 2.5rem; padding-top: 2rem; }
.mortgage-readiness__license-lockup { align-items: flex-start; border-left: 3px solid #8c2f00; display: flex; gap: .75rem; margin-bottom: 1.5rem; padding-left: .9rem; }
.mortgage-readiness__license-lockup strong, .mortgage-readiness__license-lockup span { display: block; }
.mortgage-readiness__license-lockup span { font-size: .82rem; line-height: 1.5; margin-top: .25rem; }
.mortgage-readiness__fields { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.mortgage-readiness__fields label { display: grid; gap: .45rem; }
.mortgage-readiness__fields span { color: #2e4057; font-size: .76rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.mortgage-readiness__fields em, .mortgage-readiness__consent em { color: #8c2f00; font-style: normal; }
.mortgage-readiness__fields small { color: #555; font-size: .76rem; letter-spacing: 0; text-transform: none; }
.mortgage-readiness__fields input, .mortgage-readiness__fields select { background: #f2f0e9; border: 1px solid rgba(26, 26, 26, .25); color: #1a1a1a; font: inherit; padding: .8rem; }
.mortgage-readiness__wide-field { grid-column: 1 / -1; }
.mortgage-readiness__honeypot { height: 0; opacity: 0; overflow: hidden; pointer-events: none; position: absolute; width: 0; }
.mortgage-readiness__consent { display: grid; gap: .9rem; margin-top: 1.5rem; }
.mortgage-readiness__consent label { align-items: flex-start; display: flex; gap: .65rem; font-size: .9rem; line-height: 1.55; }
.mortgage-readiness__consent input { margin-top: .25rem; }
.mortgage-readiness__privacy { border: 1px solid rgba(26, 26, 26, .2); margin-top: 1.5rem; padding: .85rem 1rem; }
.mortgage-readiness__privacy summary { align-items: center; color: #2e4057; cursor: pointer; display: flex; font-weight: 700; gap: .5rem; }
.mortgage-readiness__privacy p { font-size: .88rem; line-height: 1.65; }
.mortgage-readiness__error { color: #9a1c1c; font-weight: 700; margin-top: 1.25rem; }
.mortgage-readiness__submit-row { align-items: center; display: flex; gap: 1rem; justify-content: space-between; margin-top: 1.5rem; }
.mortgage-readiness__submit-row p { align-items: center; display: flex; font-size: .82rem; gap: .4rem; line-height: 1.4; margin: 0; }
.mortgage-readiness__submit-row button { gap: .45rem; white-space: nowrap; }
.mortgage-readiness__spinner { animation: mortgage-readiness-spin 900ms linear infinite; }
.mortgage-readiness__success { max-width: 680px; }
@keyframes mortgage-readiness-spin { to { transform: rotate(360deg); } }
@media (max-width: 640px) {
  .mortgage-readiness { padding: 4rem 1rem; }
  .mortgage-readiness__fields { grid-template-columns: 1fr; }
  .mortgage-readiness__wide-field { grid-column: auto; }
  .mortgage-readiness__submit-row { align-items: stretch; flex-direction: column; }
  .mortgage-readiness__submit-row button { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .mortgage-readiness *, .mortgage-readiness *::before, .mortgage-readiness *::after { scroll-behavior: auto; transition-duration: 0ms !important; }
}
```

Render the component from a mortgage-specific route or section:

```tsx
import { MortgageReadinessAssessment } from "@/components/MortgageReadinessAssessment";

export default function MortgageReadinessPage() {
  return <MortgageReadinessAssessment />;
}
```

## 2. Database Schema

Add the following model to `drizzle/schema.ts`. The `boolean` import is required in addition to the existing Drizzle column imports.

```ts
import { boolean, int, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * A consultation-request record only. Do not add sensitive loan-application data
 * to this public intake table.
 */
export const mortgageLeads = mysqlTable("mortgageLeads", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("firstName", { length: 80 }).notNull(),
  lastName: varchar("lastName", { length: 80 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  preferredContact: mysqlEnum("preferredContact", ["email", "phone"]).notNull(),
  assessmentGoal: varchar("assessmentGoal", { length: 120 }),
  assessmentConcern: varchar("assessmentConcern", { length: 120 }),
  assessmentTimeline: varchar("assessmentTimeline", { length: 80 }),
  contactConsent: boolean("contactConsent").notNull().default(false),
  smsConsent: boolean("smsConsent").notNull().default(false),
  privacyAcknowledged: boolean("privacyAcknowledged").notNull().default(false),
  source: varchar("source", { length: 80 }).notNull().default("california_readiness_assessment"),
  licenseDisclosure: varchar("licenseDisclosure", { length: 120 })
    .notNull()
    .default("CA DRE 01930905 | MLO 1974007"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MortgageLead = typeof mortgageLeads.$inferSelect;
export type InsertMortgageLead = typeof mortgageLeads.$inferInsert;
```

Generate a **new** migration from the live schema. Do not use an initial archive migration that also creates tables already present in the project.

```bash
pnpm drizzle-kit generate
# Review the generated SQL file.
# Apply the reviewed migration through the project database migration workflow.
```

## 3. tRPC Intake Route

### `server/leads.ts`

```ts
import { z } from "zod";
import { createMortgageLead } from "./db";

const optionalPhone = z.string().trim().max(32).optional().or(z.literal(""));

/**
 * Validates a public consultation request. Sensitive mortgage or financial data
 * is intentionally not accepted by this contract.
 */
export const leadCaptureSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required.").max(80),
    lastName: z.string().trim().min(1, "Last name is required.").max(80),
    email: z.string().trim().email("Enter a valid email address.").max(320),
    phone: optionalPhone,
    preferredContact: z.enum(["email", "phone"]),
    assessmentGoal: z.string().trim().max(120).optional(),
    assessmentConcern: z.string().trim().max(120).optional(),
    assessmentTimeline: z.string().trim().max(80).optional(),
    contactConsent: z.literal(true, { error: "Please confirm that we may respond to this request." }),
    smsConsent: z.boolean().default(false),
    privacyAcknowledged: z.literal(true, { error: "Please acknowledge the privacy notice." }),
    website: z.string().max(0).optional(),
  })
  .superRefine((lead, ctx) => {
    if (lead.preferredContact === "phone" && !lead.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "A phone number is required when phone is selected." });
    }
    if (lead.smsConsent && !lead.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Add a mobile number to opt in to text messages." });
    }
  });

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

export async function captureMortgageLead(input: LeadCaptureInput): Promise<void> {
  await createMortgageLead({
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone || null,
    preferredContact: input.preferredContact,
    assessmentGoal: input.assessmentGoal || null,
    assessmentConcern: input.assessmentConcern || null,
    assessmentTimeline: input.assessmentTimeline || null,
    contactConsent: input.contactConsent,
    smsConsent: input.smsConsent,
    privacyAcknowledged: input.privacyAcknowledged,
  });
}
```

### `server/db.ts`

Add the `mortgageLeads` and `InsertMortgageLead` imports from the Drizzle schema, then add this helper:

```ts
export async function createMortgageLead(lead: InsertMortgageLead): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Lead storage is temporarily unavailable.");
  }

  await db.insert(mortgageLeads).values(lead);
}
```

### `server/routers.ts`

Import `captureMortgageLead` and `leadCaptureSchema`, then add this route alongside—not inside—the existing partnership inquiry router:

```ts
leads: router({
  /** Public route: a visitor does not need an account to request a consultation. */
  capture: publicProcedure.input(leadCaptureSchema).mutation(async ({ input }) => {
    await captureMortgageLead(input);
    return { success: true } as const;
  }),
}),
```

The client component then calls `trpc.leads.capture.useMutation()`. No direct browser-to-database connection or client-side secret is required.

## 4. Required Environment Variables

The tRPC lead-capture feature needs **one feature-specific server capability**: access to the existing database. It does not need an API key, SMTP key, SMS key, CRM token, or any new browser-visible secret because the supplied archive stores submissions directly through the existing backend.

| Variable | Required for lead capture | Where it is used | Purpose |
|---|---:|---|---|
| `DATABASE_URL` | **Yes** | Server only | MySQL/TiDB connection string consumed by Drizzle so `mortgageLeads` records can be persisted. Never expose this value through `VITE_*` variables. |
| `JWT_SECRET` | Required by the existing full-stack application shell, not by the public `leads.capture` procedure itself | Server only | Signs application session cookies for the project’s existing authentication infrastructure. |
| `OAUTH_SERVER_URL` | Required only when retaining the existing Manus OAuth features | Server only | Existing OAuth service base URL; not read by the mortgage-lead procedure. |
| `VITE_APP_ID` | Required only when retaining the existing Manus OAuth features | Client | Existing application identifier used by the overall application shell; not used by the lead capture form. |
| `VITE_OAUTH_PORTAL_URL` | Required only when retaining the existing Manus OAuth features | Client | Existing sign-in portal URL; not used by the lead capture form. |
| `VITE_PUBLIC_PRIVACY_POLICY_URL` | Strongly recommended before production | Client | A public, non-secret URL for the final company-approved privacy policy. Use it to replace the component’s pre-launch privacy-policy placeholder. |

An optional environment example is shown below. Only `DATABASE_URL` is required to persist a mortgage lead.

```dotenv
# Server-only: required for the tRPC mutation to store public consultation requests.
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE

# Existing full-stack project infrastructure; not consumed directly by leads.capture.
JWT_SECRET=replace-with-a-long-random-server-secret
OAUTH_SERVER_URL=https://api.example.com
VITE_APP_ID=your-existing-app-id
VITE_OAUTH_PORTAL_URL=https://your-existing-oauth-portal.example

# Public configuration only; do not put keys or personal data in VITE_* variables.
VITE_PUBLIC_PRIVACY_POLICY_URL=https://www.example.com/privacy
```

> Do not add or activate SMS messaging simply because the form includes an opt-in checkbox. The archive captures SMS consent but does not contain an SMS provider, message-delivery workflow, opt-out handling, CRM routing, credit check, prequalification service, rate-quote engine, loan decisioning workflow, or document-collection capability.

## 5. Verification Checklist

Before release, add tests for a valid lead, missing contact consent, missing privacy acknowledgement, phone preference without a phone number, and SMS opt-in without a phone number. Run the project checks with:

```bash
pnpm test
pnpm check
pnpm build
```

Then verify the component at desktop and mobile widths. Confirm that question progress, back navigation, the readiness profile, required consents, form errors, success feedback, and keyboard focus behavior work correctly.

## Sources

The component flow, data fields, tRPC contract, validation rules, consent language, and schema are based on the attached `century-mortgage-funnel-guide.zip`, specifically `client/src/pages/Home.tsx`, `server/leads.ts`, `server/db.ts`, `server/routers.ts`, `drizzle/schema.ts`, and `LEAD_CAPTURE_IMPLEMENTATION.md`. The archive’s related disclosure and privacy framing cites California DRE advertising guidance and California privacy guidance.[1] [2]

[1]: https://dre.ca.gov/files/pdf/forms/re559.pdf "California DRE RE 559 — License Disclosure Requirements for Advertising"
[2]: https://oag.ca.gov/privacy/ccpa "California Department of Justice — California Consumer Privacy Act"
