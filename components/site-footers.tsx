import Link from "next/link";
import { DisclaimerLink } from "@/components/disclaimer-modal";
import { EqualHousingMark } from "@/components/equal-housing-mark";
import { complianceLinks, translationNotice } from "@/lib/compliance";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Licensee identification, fair-housing notice, and legal links. Rendered at the
 * bottom of every footer so it appears on every public page, including the blog.
 */
function ComplianceStrip({ linkHover }: { linkHover: string }) {
  const link = cn("underline-offset-4 hover:underline", linkHover);
  return (
    <div className="mx-auto mt-8 max-w-[1440px] border-t border-white/15 pt-6 text-xs leading-5 text-white/65">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <EqualHousingMark className="h-9 w-9 shrink-0 text-white/80" />
          <p className="max-w-[640px]">
            <strong
              className="notranslate font-semibold text-white"
              translate="no"
            >
              {siteConfig.legalName}
            </strong>{" "}
            · Responsible broker · CA DRE Corporation License #
            {siteConfig.dreLicense} · MLO License Endorsement #
            {siteConfig.mloEndorsement} · Designated Officer{" "}
            <span className="notranslate" translate="no">
              {siteConfig.designatedOfficer.name}
            </span>
            , DRE #{siteConfig.designatedOfficer.dreLicense} ·{" "}
            {siteConfig.address.display}.{" "}
            <span className="font-semibold text-white/80">
              Equal Housing Opportunity.
            </span>{" "}
            {translationNotice}
          </p>
        </div>
        <nav
          aria-label="Legal"
          className="flex shrink-0 flex-wrap gap-x-5 gap-y-2"
        >
          <Link href="/privacy" className={link}>
            Privacy Policy
          </Link>
          <Link href="/disclosures" className={link}>
            Licensing &amp; Disclosures
          </Link>
          <Link href="/disclosures#fair-housing" className={link}>
            Fair Housing
          </Link>
          <Link href="/accessibility" className={link}>
            Accessibility
          </Link>
          <DisclaimerLink className={link} />
          <a
            href={complianceLinks.dreLicenseLookup}
            target="_blank"
            rel="noreferrer"
            className={link}
          >
            Verify DRE license
          </a>
        </nav>
      </div>
    </div>
  );
}

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
          <a className="hover:text-rust-light" href={siteConfig.emailHref}>
            {siteConfig.email}
          </a>
        </div>
      </div>
      <ComplianceStrip linkHover="hover:text-rust-light" />
    </footer>
  );
}

/** Mortgage readiness footer: four-column forest band. */
export function MortgageFooter() {
  return (
    <footer className="bg-forest-deep px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p
            className="notranslate font-serif text-2xl font-bold"
            translate="no"
          >
            {siteConfig.name}
          </p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            {siteConfig.legalName}
            <br />
            {siteConfig.licenseLine}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-mint-light uppercase">
            Mortgage
          </p>
          <a
            className="mt-4 block text-sm text-white/75 hover:text-white"
            href="#assessment"
          >
            Mortgage Readiness
          </a>
          <a
            className="mt-3 block text-sm text-white/75 hover:text-white"
            href="#why"
          >
            Loan Options
          </a>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-mint-light uppercase">
            Resources
          </p>
          <a
            className="mt-4 block text-sm text-white/75 hover:text-white"
            href="#assessment"
          >
            Request a Consultation
          </a>
          <Link
            className="mt-3 block text-sm text-white/75 hover:text-white"
            href="/"
          >
            Partnership for Purpose
          </Link>
          <Link
            className="mt-3 block text-sm text-white/75 hover:text-white"
            href="/blog"
          >
            Blog
          </Link>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.15em] text-mint-light uppercase">
            Disclosures
          </p>
          <p className="mt-4 text-sm leading-6 text-white/75">
            This educational assessment is not a loan application,
            prequalification, approval, or commitment to lend.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <ComplianceStrip linkHover="hover:text-white" />
      </div>
    </footer>
  );
}

/** Blog and legal-page footer: single forest row with license line. */
export function BlogFooter() {
  return (
    <footer className="bg-forest-deep px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p className="text-sm text-white/75">
          {siteConfig.legalName} · {siteConfig.licenseLine} ·{" "}
          <a
            href={siteConfig.phoneHref}
            className="text-mint-light underline underline-offset-2 hover:text-white"
          >
            {siteConfig.phoneDisplay}
          </a>
        </p>
        <Link
          href="/mortgage-readiness#assessment"
          className="text-sm font-bold text-mint-light transition-colors hover:text-white"
        >
          Mortgage Readiness
        </Link>
      </div>
      <div className="mx-auto max-w-[1280px]">
        <ComplianceStrip linkHover="hover:text-white" />
      </div>
    </footer>
  );
}
