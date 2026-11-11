import type { Metadata } from "next";
import { EqualHousingMark } from "@/components/equal-housing-mark";
import { LegalPage, LegalSection } from "@/components/legal-page";
import {
  complianceLinks,
  disclaimerText,
  fairHousingStatement,
  LEGAL_LAST_UPDATED,
  translationNotice,
} from "@/lib/compliance";
import { defaultOgImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Licensing & Disclosures",
  description:
    "Century Financial Group, Corp. licensing (CA DRE #01930905, MLO License Endorsement #1974007), agency relationship, fair housing, and advertising disclosures.",
  alternates: { canonical: "/disclosures" },
  openGraph: {
    title: "Licensing & Disclosures | Century Financial Group",
    url: "/disclosures",
    images: [defaultOgImage],
  },
};

export default function DisclosuresPage() {
  return (
    <LegalPage
      eyebrow="Disclosures"
      title="Licensing & Disclosures"
      updated={LEGAL_LAST_UPDATED}
      intro={
        <p>
          Important information about who we are, the licenses we operate under,
          and how to read the content on this website.
        </p>
      }
    >
      <LegalSection id="licensing" title="Licensing">
        <div className="border-l-2 border-forest bg-mist p-5">
          <p className="font-serif text-2xl font-bold text-forest-deep">
            {siteConfig.legalName}
          </p>
          <p className="mt-1">
            California real estate corporation · Responsible broker for this
            website
          </p>
          <ul className="!mt-3 !list-none !pl-0">
            <li>
              <strong>DRE Corporation License:</strong> #{siteConfig.dreLicense}{" "}
              (licensed; expires {siteConfig.dreExpiration})
            </li>
            <li>
              <strong>MLO License Endorsement:</strong> #
              {siteConfig.mloEndorsement}
            </li>
            <li>{siteConfig.address.display}</li>
            <li>
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </li>
          </ul>
        </div>
        <p>
          All real estate and mortgage brokerage activity advertised on this
          website is conducted under the licenses above. You can verify license
          status with the{" "}
          <a
            href={complianceLinks.dreLicenseLookup}
            target="_blank"
            rel="noreferrer"
          >
            California Department of Real Estate license lookup
          </a>{" "}
          and{" "}
          <a
            href={complianceLinks.nmlsConsumerAccess}
            target="_blank"
            rel="noreferrer"
          >
            NMLS Consumer Access
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="agency" title="Real estate agency relationships">
        <p>
          California law requires real estate licensees to give buyers and
          sellers a written “Disclosure Regarding Real Estate Agency
          Relationships” explaining the duties a seller’s agent, a buyer’s
          agent, and a dual agent owe to each party. We provide this disclosure
          before you enter into a real estate transaction with us. You can read
          the required text in{" "}
          <a
            href={complianceLinks.agencyDisclosureStatute}
            target="_blank"
            rel="noreferrer"
          >
            California Civil Code §2079.16
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="mortgage" title="Mortgage information">
        <p>
          The California Mortgage Readiness Assessment and the articles on this
          website are educational. Nothing on this website is a loan
          application, prequalification, approval, rate quote, or commitment to
          lend. Any loan is subject to an individual application, review, and
          the guidelines of the lender involved.
        </p>
      </LegalSection>

      <LegalSection id="fair-housing" title="Equal Housing Opportunity">
        <div className="flex items-start gap-4">
          <EqualHousingMark className="h-14 w-14 shrink-0 text-forest-deep" />
          <p>{fairHousingStatement}</p>
        </div>
        <p>
          If you believe you have experienced housing discrimination, you can
          contact the{" "}
          <a
            href={complianceLinks.hudFairHousing}
            target="_blank"
            rel="noreferrer"
          >
            U.S. Department of Housing and Urban Development
          </a>{" "}
          or the{" "}
          <a
            href={complianceLinks.calCivilRights}
            target="_blank"
            rel="noreferrer"
          >
            California Civil Rights Department
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection
        id="partnership"
        title="Partnership content and third-party examples"
      >
        <p>
          The partnership content on our home page describes giving models
          offered with LIMinistries, a separate nonprofit organization. Figures
          and success stories there (for example, commission-giving percentages
          and amounts directed to charity) describe publicly reported programs
          of other, unaffiliated real estate professionals. They are not results
          achieved by {siteConfig.legalName}, have not been independently
          verified by us, and are not a promise of any outcome. Individual
          results vary.
        </p>
        <p>
          Nothing on this website is tax, legal, or financial advice.
          Charitable-giving structures, and the tax treatment of any gift,
          should be reviewed with your own brokerage, escrow, legal, and tax
          advisors.
        </p>
      </LegalSection>

      <LegalSection id="visuals" title="Images, figures, and projections">
        <p>{disclaimerText}</p>
      </LegalSection>

      <LegalSection id="translation" title="Translated pages">
        <p>{translationNotice}</p>
      </LegalSection>
    </LegalPage>
  );
}
