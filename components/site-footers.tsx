import Link from "next/link";
import { DisclaimerLink } from "@/components/disclaimer-modal";
import { siteConfig } from "@/lib/site";

/** Home (partnership) footer: ink band with the LIMinistries wordmark. */
export function PartnershipFooter() {
  return (
    <footer className="bg-ink px-5 py-8 text-parchment sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="notranslate font-serif text-[1.45rem] font-bold tracking-[-0.03em] text-parchment"
          translate="no"
        >
          LIMinistries
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
          <a className="hover:text-rust-light" href="https://liministries.org">
            liministries.org
          </a>
          <a className="hover:text-rust-light" href="mailto:partners@liministries.org">
            partners@liministries.org
          </a>
          <DisclaimerLink className="hover:text-rust-light" />
        </div>
      </div>
    </footer>
  );
}

/** Mortgage readiness footer: four-column forest band. */
export function MortgageFooter() {
  return (
    <footer className="bg-forest-deep px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="notranslate font-serif text-2xl font-bold" translate="no">
            {siteConfig.name}
          </p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            {siteConfig.legalName}
            <br />
            {siteConfig.licenseLine}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-mint-light uppercase">Mortgage</p>
          <a className="mt-4 block text-sm text-white/75 hover:text-white" href="#assessment">
            Mortgage Readiness
          </a>
          <a className="mt-3 block text-sm text-white/75 hover:text-white" href="#why">
            Loan Options
          </a>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-mint-light uppercase">Resources</p>
          <a className="mt-4 block text-sm text-white/75 hover:text-white" href="#assessment">
            Request a Consultation
          </a>
          <Link className="mt-3 block text-sm text-white/75 hover:text-white" href="/">
            Partnership for Purpose
          </Link>
          <Link className="mt-3 block text-sm text-white/75 hover:text-white" href="/blog">
            Blog
          </Link>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-mint-light uppercase">Disclosures</p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            This educational assessment is not a loan application, prequalification, approval, or
            commitment to lend.
          </p>
          <DisclaimerLink className="mt-3 block text-sm text-white/75 underline-offset-4 hover:text-white hover:underline" />
        </div>
      </div>
    </footer>
  );
}

/** Blog footer: single forest row with license line. */
export function BlogFooter() {
  return (
    <footer className="bg-forest-deep px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p className="text-sm text-white/75">
          {siteConfig.legalName} · {siteConfig.licenseLine} ·{" "}
          <a href={siteConfig.phoneHref} className="text-mint-light hover:text-white hover:underline">
            {siteConfig.phoneDisplay}
          </a>
        </p>
        <div className="flex gap-6">
          <DisclaimerLink className="text-sm font-bold text-mint-light transition-colors hover:text-white" />
          <Link
            href="/mortgage-readiness#assessment"
            className="text-sm font-bold text-mint-light transition-colors hover:text-white"
          >
            Mortgage Readiness
          </Link>
        </div>
      </div>
    </footer>
  );
}
