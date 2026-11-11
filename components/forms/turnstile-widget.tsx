"use client";

import Script from "next/script";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
} from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/forms/turnstile";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "flexible" | "compact";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = { reset: () => void };

/**
 * Cloudflare Turnstile, rendered explicitly so each form keeps its own widget ID
 * and can reset it after every submission attempt (tokens are single-use).
 */
export function TurnstileWidget({
  action,
  onToken,
  handleRef,
}: {
  action: string;
  onToken: (token: string) => void;
  handleRef?: Ref<TurnstileHandle>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useImperativeHandle(handleRef, () => ({
    reset: () => {
      onTokenRef.current("");
      if (widgetIdRef.current && window.turnstile)
        window.turnstile.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    const turnstile = window.turnstile;
    const container = containerRef.current;
    if (!(scriptReady || turnstile) || !turnstile || !container) return;

    const widgetId = turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      action,
      theme: "light",
      size: "flexible",
      callback: token => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current(""),
    });
    widgetIdRef.current = widgetId;
    return () => {
      turnstile.remove(widgetId);
      widgetIdRef.current = null;
    };
  }, [action, scriptReady]);

  return (
    <>
      <Script
        id="cf-turnstile-api"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px] w-full max-w-[400px]" />
    </>
  );
}
