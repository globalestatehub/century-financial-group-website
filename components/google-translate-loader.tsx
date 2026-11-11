"use client";

import Script from "next/script";
import { X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { translationNotice } from "@/lib/compliance";
import {
  applyTranslateLanguage,
  parseTranslateCookie,
  SOURCE_LANGUAGE,
} from "@/lib/translate";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string
        ) => unknown;
      };
    };
  }
}

const subscribe = () => () => {};
const readLanguage = () => parseTranslateCookie(document.cookie);
const serverLanguage = () => SOURCE_LANGUAGE;

/**
 * Google Translate rewrites text nodes, which can make React throw when it later
 * removes or inserts nodes that were moved. These guards keep React stable on a
 * translated page. They only run when a translation is active.
 */
function guardDomMutations() {
  const proto = Node.prototype as Node & { __cfgPatched?: boolean };
  if (proto.__cfgPatched) return;
  proto.__cfgPatched = true;

  const originalRemoveChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(
    this: Node,
    node: T,
    reference: Node | null
  ): T {
    if (reference && reference.parentNode !== this) return node;
    return originalInsertBefore.call(this, node, reference) as T;
  };
}

/**
 * Loads Google's translator only when the visitor picked a language other than
 * English, so English visitors never download the third-party script.
 */
export function GoogleTranslateLoader() {
  const language = useSyncExternalStore(
    subscribe,
    readLanguage,
    serverLanguage
  );
  if (language === SOURCE_LANGUAGE) return null;

  return (
    <>
      <TranslationNotice />
      <div
        id="google_translate_element"
        className="hidden"
        aria-hidden="true"
      />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`window.googleTranslateElementInit = function () {
  new window.google.translate.TranslateElement({ pageLanguage: "${SOURCE_LANGUAGE}", autoDisplay: false }, "google_translate_element");
};`}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        onReady={guardDomMutations}
      />
    </>
  );
}

/** Machine-translation disclaimer, shown while a translated page is displayed. */
function TranslationNotice() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div
      role="note"
      className="fixed bottom-4 left-4 z-40 max-w-[calc(100%-2rem)] border-l-4 border-gold bg-white p-4 pr-10 text-sm leading-6 text-forest-deep shadow-[0_12px_40px_rgba(14,80,48,0.18)] sm:max-w-sm"
    >
      <p>{translationNotice}</p>
      <button
        type="button"
        onClick={() => applyTranslateLanguage(SOURCE_LANGUAGE)}
        className="notranslate mt-2 font-bold text-forest underline underline-offset-4"
        translate="no"
      >
        View in English
      </button>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss translation notice"
        className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center text-moss hover:text-forest-deep"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
