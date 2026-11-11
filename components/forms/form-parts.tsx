import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FORM_SUCCESS_MESSAGE } from "@/lib/validation";
import { cn } from "@/lib/utils";

/** Hidden honeypot field required by the n8n form handler. */
export function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className="absolute -left-[9999px] h-px w-px overflow-hidden"
      aria-hidden="true"
    >
      <label>
        Website
        <input
          type="text"
          name="website"
          value={value}
          onChange={onChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}

/** Inline field error, referenced from the field's aria-describedby. */
export function FieldError({
  id,
  message,
  className,
}: {
  id: string;
  message?: string;
  className?: string;
}) {
  if (!message) return null;
  return (
    <p
      id={id}
      className={cn("mt-2 text-sm font-semibold text-red-700", className)}
    >
      {message}
    </p>
  );
}

/** Success panel shown after a submission is accepted. */
export function FormSuccess({
  tone = "forest",
  children,
}: {
  tone?: "forest" | "rust";
  children?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex gap-3 border-l-2 p-5",
        tone === "rust" ? "border-rust bg-parchment" : "border-forest bg-mist"
      )}
    >
      <CheckCircle2
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0",
          tone === "rust" ? "text-rust" : "text-forest"
        )}
        aria-hidden="true"
      />
      <div className="text-base leading-7 text-ink">
        <p className="font-semibold">{FORM_SUCCESS_MESSAGE}</p>
        {children}
      </div>
    </div>
  );
}

/** Privacy link used inside form consent copy. */
export function PrivacyLink({ className }: { className?: string }) {
  return (
    <Link
      href="/privacy"
      className={cn("font-semibold underline underline-offset-2", className)}
    >
      Privacy Policy
    </Link>
  );
}
