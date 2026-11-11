"use client";

import { Loader2, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { submitPartnershipInquiry } from "@/app/actions";
import {
  FieldError,
  FormSuccess,
  HoneypotField,
  PrivacyLink,
} from "@/components/forms/form-parts";
import { TurnstileWidget } from "@/components/forms/turnstile-widget";
import { useProtectedSubmit } from "@/components/forms/use-protected-submit";
import {
  partnershipInterestOptions,
  professionalRoleOptions,
} from "@/lib/content/partnership";
import { TURNSTILE_ACTIONS } from "@/lib/forms/turnstile";
import { siteConfig } from "@/lib/site";
import {
  type PartnershipInquiryInput,
  partnershipInquirySchema,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type InquiryFormState = Required<PartnershipInquiryInput>;

const emptyInquiry: InquiryFormState = {
  fullName: "",
  email: "",
  phone: "",
  professionalRole: "realtor",
  company: "",
  licenseNumber: "",
  serviceAreas: "",
  partnershipInterest: "pilot_partnership",
  message: "",
  smsConsent: false,
  website: "",
};

type FieldChange = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

/** Professional partnership inquiry: validated, Turnstile-protected, sent via a Server Action. */
export function PartnershipInquiryForm() {
  const [inquiry, setInquiry] = useState<InquiryFormState>(emptyInquiry);
  const form = useProtectedSubmit<InquiryFormState>({
    schema: partnershipInquirySchema,
    action: submitPartnershipInquiry,
    onSuccess: () => setInquiry(emptyInquiry),
  });

  const handleChange = (event: FieldChange) => {
    const target = event.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;
    setInquiry(current => ({ ...current, [target.name]: value }));
    form.clearFieldError(target.name);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.submit(inquiry);
  };

  const fieldProps = (name: keyof InquiryFormState) => ({
    name,
    value: inquiry[name] as string,
    onChange: handleChange,
    error: form.errors[name],
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2"
      noValidate
    >
      <FormField
        label="Full name"
        {...fieldProps("fullName")}
        required
        autoComplete="name"
      />
      <FormField
        label="Professional email"
        {...fieldProps("email")}
        type="email"
        required
        autoComplete="email"
      />
      <FormField
        label="Professional role"
        {...fieldProps("professionalRole")}
        options={professionalRoleOptions}
      />
      <FormField
        label="Brokerage, lender, or company"
        {...fieldProps("company")}
        required
        autoComplete="organization"
      />
      <FormField
        label="Phone number"
        {...fieldProps("phone")}
        type="tel"
        autoComplete="tel"
      />
      <FormField label="License number" {...fieldProps("licenseNumber")} />
      <FormField
        label="Service areas"
        {...fieldProps("serviceAreas")}
        placeholder="City, region, or states served"
      />
      <FormField
        label="Partnership interest"
        {...fieldProps("partnershipInterest")}
        options={partnershipInterestOptions}
      />
      <FormField
        label="How would you like to partner?"
        {...fieldProps("message")}
        required
        textarea
        className="sm:col-span-2"
        placeholder="Share your goals, team size, or questions for LIMinistries."
      />
      <HoneypotField value={inquiry.website} onChange={handleChange} />

      <div className="grid gap-4 text-sm leading-6 text-[#454545] sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="inquiry-smsConsent"
            name="smsConsent"
            type="checkbox"
            checked={inquiry.smsConsent}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-rust"
          />
          <label htmlFor="inquiry-smsConsent">
            Optional: I agree to receive text messages about this inquiry at the
            phone number provided. Consent is not a condition of partnership.
            Message and data rates may apply. Reply STOP to opt out.
          </label>
        </div>
        <p>
          By submitting, you agree that {siteConfig.legalName} and LIMinistries
          may contact you by email or phone to respond to this inquiry. We do
          not sell your information. See our{" "}
          <PrivacyLink className="text-rust" />.
        </p>
      </div>

      <div className="sm:col-span-2">
        <TurnstileWidget
          action={TURNSTILE_ACTIONS.partnershipInquiry}
          onToken={form.setToken}
          handleRef={form.bindTurnstile}
        />
      </div>

      <div className="sm:col-span-2" aria-live="polite">
        {form.status.kind === "success" && <FormSuccess tone="rust" />}
        {form.status.kind === "error" && (
          <p className="font-semibold text-red-700" role="alert">
            {form.status.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start justify-between gap-5 border-t border-ink/15 pt-7 sm:col-span-2 sm:flex-row sm:items-center">
        <p className="max-w-[500px] text-sm leading-6 text-[#5A5A5A]">
          By submitting, you are requesting a partnership conversation with
          LIMinistries. Your inquiry will be used only to respond to this
          request.
        </p>
        <button
          type="submit"
          disabled={form.isPending}
          aria-disabled={form.isPending}
          className="inline-flex shrink-0 items-center gap-3 bg-rust px-6 py-4 text-sm font-bold tracking-[0.13em] text-white uppercase transition-all duration-200 hover:bg-rust-dark active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {form.isPending ? "Sending inquiry…" : "Submit inquiry"}
          {form.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  name: keyof InquiryFormState;
  value: string;
  onChange: (event: FieldChange) => void;
  error?: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  textarea?: boolean;
  options?: readonly { value: string; label: string }[];
  className?: string;
};

/** Underlined, labelled field in the Covenant Ledger style. */
function FormField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
  autoComplete,
  textarea,
  options,
  className,
}: FormFieldProps) {
  const id = `inquiry-${name}`;
  const errorId = `${id}-error`;
  const fieldClass = cn(
    "mt-2 w-full border-b bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-[#767676] focus:border-rust",
    error ? "border-red-700" : "border-ink/30"
  );
  const a11y = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required || undefined,
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[0.68rem] font-bold tracking-[0.16em] text-slate-ink uppercase"
      >
        {label}
        {required && (
          <span className="ml-1 text-rust" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {options ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={fieldClass}
          {...a11y}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={cn(fieldClass, "resize-y")}
          {...a11y}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={fieldClass}
          {...a11y}
        />
      )}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
