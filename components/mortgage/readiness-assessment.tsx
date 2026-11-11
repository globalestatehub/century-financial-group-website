"use client";

import { ArrowRight, CheckCircle2, ChevronLeft, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { type ChangeEvent, type FormEvent, useId, useState, useTransition } from "react";
import { captureMortgageLead } from "@/app/actions";
import {
  assessmentSteps,
  getReadinessGuidance,
  getReadinessProfile,
} from "@/lib/content/mortgage-readiness";
import { siteConfig } from "@/lib/site";

type LeadFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: "email" | "phone";
  contactConsent: boolean;
  smsConsent: boolean;
  privacyAcknowledged: boolean;
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

type FieldChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

/** Three-question readiness lens followed by a consent-first consultation request. */
export function ReadinessAssessment() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [leadForm, setLeadForm] = useState<LeadFormState>(initialLeadForm);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentStep = answers.length;
  const complete = currentStep === assessmentSteps.length;
  const profile = getReadinessProfile(answers[0]);
  const guidance = getReadinessGuidance(answers[0], answers[1]);

  const updateForm = (event: FieldChange) => {
    const target = event.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setLeadForm((current) => ({ ...current, [target.name]: value }));
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    if (!leadForm.contactConsent || !leadForm.privacyAcknowledged) {
      setFormError("Please confirm consent and acknowledge the privacy notice before submitting.");
      return;
    }
    startTransition(async () => {
      const result = await captureMortgageLead({
        ...leadForm,
        assessmentGoal: answers[0],
        assessmentConcern: answers[1],
        assessmentTimeline: answers[2],
      });
      if (result.ok) setSubmitted(true);
      else setFormError(result.message);
    });
  };

  const restart = () => {
    setAnswers([]);
    setLeadForm(initialLeadForm);
    setSubmitted(false);
    setFormError("");
  };

  if (!complete) {
    const step = assessmentSteps[currentStep];
    return (
      <div aria-live="polite">
        <div className="grid grid-cols-[1fr_auto] gap-3 text-xs font-bold tracking-[0.14em] text-forest uppercase">
          <span>Readiness lens</span>
          <span>
            {currentStep + 1} / {assessmentSteps.length}
          </span>
          <div
            className="col-span-2 h-1 bg-line"
            role="progressbar"
            aria-label="Assessment progress"
            aria-valuemin={1}
            aria-valuemax={assessmentSteps.length}
            aria-valuenow={currentStep + 1}
          >
            <div
              className="h-full bg-forest transition-[width] duration-200"
              style={{ width: `${((currentStep + 1) / assessmentSteps.length) * 100}%` }}
            />
          </div>
        </div>
        <p className="mt-10 text-xs font-bold tracking-[0.14em] text-forest uppercase">
          Question {String(currentStep + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-serif text-4xl leading-none font-bold text-forest-deep">{step.question}</h3>
        <div className="mt-8 grid gap-3">
          {step.answers.map((answer) => (
            <button
              key={answer}
              type="button"
              onClick={() => setAnswers((current) => [...current, answer])}
              className="flex items-center justify-between border border-sage px-5 py-4 text-left font-semibold text-forest-deep transition-colors hover:border-forest hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            >
              <span>{answer}</span>
              <ArrowRight className="h-4 w-4 text-forest" aria-hidden="true" />
            </button>
          ))}
        </div>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={() => setAnswers((current) => current.slice(0, -1))}
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-forest underline"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Change my previous answer
          </button>
        )}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl" role="status">
        <CheckCircle2 className="h-9 w-9 text-forest" aria-hidden="true" />
        <p className="mt-6 text-xs font-bold tracking-[0.14em] text-forest uppercase">Request received</p>
        <h3 className="mt-3 font-serif text-4xl leading-none font-bold text-forest-deep">
          Thank you. A California-licensed team member can respond by your selected method.
        </h3>
        <p className="mt-6 text-lg leading-8 text-moss">
          Your request is not a loan application, prequalification, approval, or commitment to lend.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-8 inline-flex items-center gap-2 border border-forest px-5 py-3 text-sm font-bold tracking-[0.12em] text-forest uppercase hover:bg-mint"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start a new assessment
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.14em] text-forest uppercase">
        Your educational readiness profile
      </p>
      <h3 className="mt-3 font-serif text-5xl leading-none font-bold text-forest-deep">{profile}</h3>
      <p className="mt-6 text-lg leading-8 text-moss">
        Based on your responses, begin by clarifying <strong>{answers[1]?.toLowerCase()}</strong> before
        trying to solve every variable at once.
      </p>
      <ol className="mt-8 grid gap-4 border-y border-line py-7">
        {guidance.map((item, index) => (
          <li key={item} className="grid grid-cols-[32px_1fr] gap-3 leading-7 text-moss">
            <span className="font-serif text-2xl font-bold text-forest" aria-hidden="true">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <form id="contact" onSubmit={submitLead} className="mt-10" noValidate>
        <div className="border-l-2 border-forest bg-mist p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
            <div>
              <p className="font-semibold text-forest-deep">{siteConfig.legalName}</p>
              <p className="mt-1 text-sm leading-6 text-moss">
                Licensed California Real Estate Broker · {siteConfig.licenseLine}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <InputField label="First name" name="firstName" value={leadForm.firstName} onChange={updateForm} required autoComplete="given-name" />
          <InputField label="Last name" name="lastName" value={leadForm.lastName} onChange={updateForm} required autoComplete="family-name" />
          <InputField label="Email address" name="email" value={leadForm.email} onChange={updateForm} required type="email" autoComplete="email" className="sm:col-span-2" />
          <InputField label="Phone" name="phone" value={leadForm.phone} onChange={updateForm} type="tel" autoComplete="tel" optional />
          <label className="grid gap-2">
            <span className="text-xs font-bold tracking-[0.12em] text-forest-deep uppercase">
              Preferred response{" "}
              <em className="text-forest not-italic" aria-hidden="true">
                *
              </em>
            </span>
            <select
              name="preferredContact"
              value={leadForm.preferredContact}
              onChange={updateForm}
              className="border border-sage bg-white px-3 py-3 text-forest-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </label>
          {/* Honeypot: hidden from people and assistive tech, catches simple bots. */}
          <div className="sr-only" aria-hidden="true">
            <label>
              Leave this blank
              <input name="website" value={leadForm.website} onChange={updateForm} tabIndex={-1} autoComplete="off" />
            </label>
          </div>
        </div>
        <div className="mt-7 grid gap-4 text-sm leading-6 text-moss">
          <ConsentField name="contactConsent" checked={leadForm.contactConsent} onChange={updateForm} required>
            I agree that {siteConfig.legalName} may contact me by my selected method to respond to this
            request. I understand this is not a loan application, prequalification, or commitment to
            lend.
          </ConsentField>
          <ConsentField name="smsConsent" checked={leadForm.smsConsent} onChange={updateForm}>
            I agree to receive text messages at the mobile number provided about this request. Consent is
            not a condition of service. Message and data rates may apply. Reply STOP to opt out.
          </ConsentField>
          <ConsentField name="privacyAcknowledged" checked={leadForm.privacyAcknowledged} onChange={updateForm} required>
            I have read the privacy notice at collection below.
          </ConsentField>
        </div>
        <details className="mt-6 border border-line bg-mist p-4">
          <summary className="flex cursor-pointer items-center gap-2 font-semibold text-forest-deep">
            <ShieldCheck className="h-4 w-4 text-forest" aria-hidden="true" /> Privacy notice at collection
          </summary>
          <p className="mt-3 text-sm leading-6 text-moss">
            {siteConfig.legalName} collects your name, contact details, selected contact preference,
            and readiness answers to respond to your request, tailor educational follow-up, and maintain
            consent records. This form does not request Social Security numbers, financial-account
            numbers, or loan-application documents. Connect this notice to the company-approved privacy
            policy and request channel before publication.
          </p>
        </details>
        {formError && (
          <p className="mt-5 font-semibold text-red-700" role="alert">
            {formError}
          </p>
        )}
        <div className="mt-7 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-moss">
            <ShieldCheck className="h-4 w-4 shrink-0 text-forest" aria-hidden="true" /> Secure request
            intake · {siteConfig.address.display} ·{" "}
            <a href={siteConfig.phoneHref} className="font-bold text-forest hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 bg-forest px-5 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Saving request
              </>
            ) : (
              <>
                Request my next steps <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  optional,
  autoComplete,
  className = "",
}: {
  label: string;
  name: keyof LeadFormState;
  value: string;
  onChange: (event: FieldChange) => void;
  type?: "text" | "email" | "tel";
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-xs font-bold tracking-[0.12em] text-forest-deep uppercase">
        {label}{" "}
        {required ? (
          <em className="text-forest not-italic" aria-hidden="true">
            *
          </em>
        ) : optional ? (
          <small className="tracking-normal text-[#5B6A60] normal-case">Optional</small>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        autoComplete={autoComplete}
        className="border border-sage bg-white px-3 py-3 text-forest-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      />
    </label>
  );
}

function ConsentField({
  name,
  checked,
  onChange,
  required,
  children,
}: {
  name: keyof LeadFormState;
  checked: boolean;
  onChange: (event: FieldChange) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        aria-required={required}
        className="mt-1 h-4 w-4 accent-forest"
      />
      <label htmlFor={id}>
        {children}
        {required && (
          <em className="ml-1 text-forest not-italic" aria-hidden="true">
            *
          </em>
        )}
      </label>
    </div>
  );
}
