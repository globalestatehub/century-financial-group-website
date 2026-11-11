"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import type { z } from "zod";
import type { TurnstileHandle } from "@/components/forms/turnstile-widget";
import {
  type ActionResult,
  fieldErrors as toFieldErrors,
} from "@/lib/validation";

type Status =
  { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

/**
 * Shared submit flow for every site form: client-side validation with the same
 * zod schema the server uses, Turnstile token handling, double-submit
 * protection, and a widget reset after every attempt.
 */
export function useProtectedSubmit<TInput>({
  schema,
  action,
  onSuccess,
}: {
  schema: z.ZodType;
  action: (input: TInput, turnstileToken: string) => Promise<ActionResult>;
  onSuccess?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const inFlight = useRef(false);

  const submit = useCallback(
    (input: TInput) => {
      if (inFlight.current) return;
      setStatus({ kind: "idle" });

      const parsed = schema.safeParse(input);
      if (!parsed.success) {
        setErrors(toFieldErrors(parsed.error));
        setStatus({
          kind: "error",
          message: "Please correct the highlighted fields and try again.",
        });
        return;
      }
      setErrors({});
      if (!token) {
        setStatus({
          kind: "error",
          message: "Please complete the security check before submitting.",
        });
        return;
      }

      inFlight.current = true;
      startTransition(async () => {
        try {
          const result = await action(input, token);
          if (result.ok) {
            setStatus({ kind: "success" });
            onSuccess?.();
          } else {
            setErrors(result.fieldErrors ?? {});
            setStatus({ kind: "error", message: result.message });
          }
        } catch {
          setStatus({
            kind: "error",
            message: "Something went wrong. Please try again later.",
          });
        } finally {
          inFlight.current = false;
          turnstileRef.current?.reset();
        }
      });
    },
    [action, onSuccess, schema, token]
  );

  const clearFieldError = useCallback((name: string) => {
    setErrors(current => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  /** Callback ref for <TurnstileWidget>, so callers never touch a ref object. */
  const bindTurnstile = useCallback((handle: TurnstileHandle | null) => {
    turnstileRef.current = handle;
  }, []);

  const reset = useCallback(() => {
    setStatus({ kind: "idle" });
    setErrors({});
  }, []);

  return {
    submit,
    reset,
    isPending,
    status,
    errors,
    clearFieldError,
    setToken,
    bindTurnstile,
    hasToken: Boolean(token),
  };
}
