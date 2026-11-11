import "server-only";

import { headers } from "next/headers";
import { siteConfig } from "@/lib/site";
import {
  buildN8nPayload,
  expectedTurnstileHostnames,
  type N8nFields,
  type N8nFormType,
} from "@/lib/forms/payload";

const N8N_FORMS_URL = "https://liministries.app.n8n.cloud/webhook/site-forms";
const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Cloudflare's published dummy secrets (always pass / always fail / token spent).
 * Their siteverify responses carry no `action`, so the action check is relaxed
 * for these only. They never validate real tokens, so production is unaffected.
 */
const TURNSTILE_TEST_SECRETS = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA",
]);

/** Server-side routing values. Env vars override; visitors can never change them. */
function formSite() {
  return {
    siteName: process.env.SITE_NAME || "Century Financial Group Net",
    contactEmail: process.env.SITE_CONTACT_EMAIL || siteConfig.email,
  };
}

export type ForwardResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed"; httpStatus: number };

/** Forwards a submission to the central n8n form handler (n8n sends all emails). */
export async function forwardToN8n(
  formType: N8nFormType,
  fields: N8nFields
): Promise<ForwardResult> {
  const key = process.env.SITE_FORMS_KEY;
  if (!key) {
    console.warn(
      "[forms] SITE_FORMS_KEY is not set; submission not forwarded to n8n."
    );
    return { status: "not_configured" };
  }

  try {
    const response = await fetch(N8N_FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Form-Key": key },
      body: JSON.stringify(buildN8nPayload(formSite(), formType, fields)),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (response.ok) return { status: "sent" };
    if (response.status === 403) {
      console.error(
        "[forms] n8n rejected the form key (403). Check SITE_FORMS_KEY."
      );
    } else {
      console.error(`[forms] n8n responded ${response.status}.`);
    }
    return { status: "failed", httpStatus: response.status };
  } catch (error) {
    console.error(
      "[forms] Could not reach n8n:",
      error instanceof Error ? error.message : error
    );
    return { status: "failed", httpStatus: 500 };
  }
}

/**
 * Canonical Turnstile siteverify. Requires success, the expected action, and an
 * approved frontend hostname. Fails closed when the secret is missing.
 */
export async function verifyTurnstile(
  token: unknown,
  expectedAction: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error(
      "[turnstile] TURNSTILE_SECRET_KEY is not set; rejecting submission."
    );
    return false;
  }
  if (typeof token !== "string" || token.length === 0 || token.length > 2048)
    return false;

  const expectedHostnames = expectedTurnstileHostnames(
    process.env.TURNSTILE_HOSTNAMES,
    siteConfig.url
  );
  const requestHeaders = await headers();
  const remoteip =
    requestHeaders.get("cf-connecting-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
      body: new URLSearchParams({
        secret,
        response: token,
        ...(remoteip ? { remoteip } : {}),
      }),
    });
    if (!response.ok) throw new Error(`siteverify ${response.status}`);
    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    const ok =
      result.success === true &&
      (result.action === expectedAction ||
        (TURNSTILE_TEST_SECRETS.has(secret) && !result.action)) &&
      expectedHostnames.has((result.hostname ?? "").toLowerCase());
    if (!ok) {
      console.warn("[turnstile] Verification rejected", {
        success: result.success,
        action: result.action,
        hostname: result.hostname,
      });
    }
    return ok;
  } catch (error) {
    console.error(
      "[turnstile] siteverify failed:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}
