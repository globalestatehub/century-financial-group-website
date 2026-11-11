"use client";

import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "cfg-disclaimer-acknowledged-v1";
export const OPEN_DISCLAIMER_EVENT = "cfg:open-disclaimer";

export const disclaimerText =
  "Some photos or visual materials may be AI-enhanced to help you visualise possibilities. These are illustrative only and not intended to deceive. All figures, timelines, and projections are illustrative and unverified; market and regulatory factors may change outcomes. Please verify key facts independently — including any size or record discrepancies — and consult licensed professionals before making any decisions.";

function hasAcknowledged() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberAcknowledgement() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Storage unavailable (private mode, blocked site data): show again next visit.
  }
}

/**
 * Site-wide disclaimer. Opens on a visitor's first visit, and again whenever a
 * "Disclaimer" link dispatches the open event.
 */
export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Defer one tick so the dialog animates in after hydration.
    const timer = window.setTimeout(() => {
      if (!hasAcknowledged()) setOpen(true);
    }, 0);
    const openFromLink = () => setOpen(true);
    window.addEventListener(OPEN_DISCLAIMER_EVENT, openFromLink);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_DISCLAIMER_EVENT, openFromLink);
    };
  }, []);

  const acknowledge = () => {
    rememberAcknowledgement();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) rememberAcknowledgement();
        setOpen(next);
      }}
    >
      <DialogContent className="gap-0 border-t-4 border-gold bg-white p-0 shadow-[0_24px_70px_rgba(14,80,48,0.22)] ring-0 sm:max-w-lg">
        <div className="p-6 sm:p-8">
          <DialogHeader className="gap-0">
            <p className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.2em] text-forest uppercase">
              <Info className="size-4" aria-hidden="true" />
              Please read
            </p>
            <DialogTitle className="mt-3 font-serif text-4xl leading-none font-bold text-forest-deep">
              Disclaimer
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-5 text-base leading-7 text-moss">
            {disclaimerText}
          </DialogDescription>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-line bg-mist px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs leading-5 text-[#5b6a60]">
            You can reopen this notice from the site footer.
          </p>
          <button
            type="button"
            onClick={acknowledge}
            className="inline-flex shrink-0 items-center justify-center bg-forest px-5 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-forest-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            I understand
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Footer link that reopens the disclaimer. */
export function DisclaimerLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_DISCLAIMER_EVENT))}
      className={className}
    >
      Disclaimer
    </button>
  );
}
