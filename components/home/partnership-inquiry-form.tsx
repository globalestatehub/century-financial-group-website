"use client";

import { Loader2, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { submitPartnershipInquiry } from "@/app/actions";
import { partnershipInterestOptions, professionalRoleOptions } from "@/lib/content/partnership";
import type { PartnershipInquiryInput } from "@/lib/validation";
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
};

type FieldChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

/** Professional partnership inquiry, submitted through a Server Action. */
export function PartnershipInquiryForm() {
  const [inquiry, setInquiry] = useState<InquiryFormState>(emptyInquiry);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: FieldChange) => {
    const { name, value } = event.target;
    setInquiry((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await submitPartnershipInquiry(inquiry);
      if (result.ok) {
        setInquiry(emptyInquiry);
        toast.success("Thank you—your partnership inquiry has been received.");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-x-6 gap-y-7 sm:grid-cols-2" noValidate>
      <FormField label="Full name" name="fullName" value={inquiry.fullName} onChange={handleChange} required autoComplete="name" />
      <FormField label="Professional email" name="email" type="email" value={inquiry.email} onChange={handleChange} required autoComplete="email" />
      <FormField label="Professional role" name="professionalRole" value={inquiry.professionalRole} onChange={handleChange} options={professionalRoleOptions} />
      <FormField label="Brokerage, lender, or company" name="company" value={inquiry.company} onChange={handleChange} required autoComplete="organization" />
      <FormField label="Phone number" name="phone" type="tel" value={inquiry.phone} onChange={handleChange} autoComplete="tel" />
      <FormField label="License number" name="licenseNumber" value={inquiry.licenseNumber} onChange={handleChange} />
      <FormField label="Service areas" name="serviceAreas" value={inquiry.serviceAreas} onChange={handleChange} placeholder="City, region, or states served" />
      <FormField label="Partnership interest" name="partnershipInterest" value={inquiry.partnershipInterest} onChange={handleChange} options={partnershipInterestOptions} />
      <FormField
        label="How would you like to partner?"
        name="message"
        value={inquiry.message}
        onChange={handleChange}
        required
        textarea
        className="sm:col-span-2"
        placeholder="Share your goals, team size, or questions for LIMinistries."
      />
      {error && (
        <p className="font-semibold text-red-700 sm:col-span-2" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-col items-start justify-between gap-5 border-t border-ink/15 pt-7 sm:col-span-2 sm:flex-row sm:items-center">
        <p className="max-w-[500px] text-sm leading-6 text-[#5A5A5A]">
          By submitting, you are requesting a partnership conversation with LIMinistries. Your inquiry
          will be used only to respond to this request.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex shrink-0 items-center gap-3 bg-rust px-6 py-4 text-sm font-bold tracking-[0.13em] text-white uppercase transition-all duration-200 hover:bg-rust-dark active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending inquiry…" : "Submit inquiry"}
          {isPending ? (
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
  type = "text",
  required,
  placeholder,
  autoComplete,
  textarea,
  options,
  className,
}: FormFieldProps) {
  const id = `inquiry-${name}`;
  const fieldClass =
    "mt-2 w-full border-b border-ink/30 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-[#767676] focus:border-rust";

  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.68rem] font-bold tracking-[0.16em] text-slate-ink uppercase">
        {label}
        {required && (
          <span className="ml-1 text-rust" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {options ? (
        <select id={id} name={name} value={value} onChange={onChange} className={fieldClass}>
          {options.map((option) => (
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
          aria-required={required}
          placeholder={placeholder}
          rows={4}
          className={cn(fieldClass, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={fieldClass}
        />
      )}
    </div>
  );
}
