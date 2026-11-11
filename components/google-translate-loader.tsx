"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { parseTranslateCookie, SOURCE_LANGUAGE } from "@/lib/translate";

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
  proto.insertBefore = function <T extends Node>(this: Node, node: T, reference: Node | null): T {
    if (reference && reference.parentNode !== this) return node;
    return originalInsertBefore.call(this, node, reference) as T;
  };
}

/**
 * Loads Google's translator only when the visitor picked a language other than
 * English, so English visitors never download the third-party script.
 */
export function GoogleTranslateLoader() {
  const language = useSyncExternalStore(subscribe, readLanguage, serverLanguage);
  if (language === SOURCE_LANGUAGE) return null;

  return (
    <>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
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
