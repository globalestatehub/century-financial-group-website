import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { LEGAL_LAST_UPDATED } from "@/lib/compliance";
import { defaultOgImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Century Financial Group, Corp. collects, uses, and protects personal information, and your California privacy rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Century Financial Group",
    url: "/privacy",
    images: [defaultOgImage],
  },
};

const contactEmail = "info@centuryfinancialgroup.net";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      updated={LEGAL_LAST_UPDATED}
      intro={
        <p>
          This policy explains how {siteConfig.legalName} (“Century Financial
          Group,” “we,” “us”) collects, uses, shares, and protects personal
          information through this website, and the rights California residents
          have under the California Online Privacy Protection Act (CalOPPA) and
          the California Consumer Privacy Act as amended by the CPRA (CCPA),
          where applicable.{" "}
          <strong>We do not sell your personal information.</strong>
        </p>
      }
    >
      <LegalSection id="collect" title="Information we collect">
        <p>
          We collect only what you choose to give us, plus limited technical
          data needed to run the site securely.
        </p>
        <ul>
          <li>
            <strong>Mortgage Readiness requests:</strong> first and last name,
            email address, phone number (optional), preferred contact method,
            your assessment answers (goal, main concern, timeline), and your
            consent choices (contact, text messages, privacy acknowledgement).
          </li>
          <li>
            <strong>Partnership inquiries:</strong> full name, professional
            email, phone number (optional), professional role, company, license
            number (optional), service areas, partnership interest, your
            message, and your text-message consent choice.
          </li>
          <li>
            <strong>Security data:</strong> to block automated spam, Cloudflare
            Turnstile checks your browser when you submit a form and processes
            technical signals such as your IP address and browser
            characteristics.
          </li>
          <li>
            <strong>Preferences stored on your device:</strong> a cookie
            remembering the language you pick in the page translator, and a
            browser-storage entry remembering that you have read our disclaimer.
          </li>
          <li>
            <strong>Server logs:</strong> our hosting provider records standard
            request data (such as IP address, browser type, pages requested, and
            time) for security and reliability.
          </li>
        </ul>
        <p>
          Our forms do not ask for Social Security numbers, financial-account
          numbers, or loan-application documents. Please do not send them
          through this website.
        </p>
      </LegalSection>

      <LegalSection id="use" title="How we use information">
        <ul>
          <li>
            To respond to your request or inquiry by the method you selected.
          </li>
          <li>To provide educational follow-up related to your request.</li>
          <li>To keep records of the consents you gave and when.</li>
          <li>
            To protect the website and our forms from spam, fraud, and abuse.
          </li>
          <li>To meet legal, regulatory, and licensing obligations.</li>
        </ul>
        <p>
          We send text messages only if you opted in, and only about your
          request. Reply STOP to any message to opt out. Consent to texts is
          never a condition of service. We do not share mobile numbers or
          text-message consent with third parties for their own marketing.
        </p>
      </LegalSection>

      <LegalSection id="share" title="How we share information">
        <p>
          We do not sell personal information and do not share it for
          cross-context behavioral advertising. We disclose it only to:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong> that operate the site for us
            under contract, including website hosting, our database provider,
            our form-processing and email service (n8n), and Cloudflare (bot
            protection).
          </li>
          <li>
            <strong>LIMinistries,</strong> for partnership inquiries only,
            because the partnership form asks to start a conversation with
            LIMinistries.
          </li>
          <li>
            <strong>Optional third-party features you choose to use:</strong> if
            you pick a language in the page translator, page content is
            processed by Google Translate; if you start a conversation with the
            voice assistant, it is processed by ElevenLabs. Their own privacy
            policies apply.
          </li>
          <li>
            <strong>Legal and safety reasons,</strong> such as complying with
            law, regulators, or valid legal process.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="retention" title="How long we keep information">
        <p>
          We keep request and inquiry records for as long as needed to respond,
          follow up, maintain consent records, and meet our legal and licensing
          record-keeping obligations, and then delete or de-identify them.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="Your California privacy rights">
        <p>If the CCPA applies to your information, you have the right to:</p>
        <ul>
          <li>
            Know what personal information we collected about you and how we use
            and disclose it.
          </li>
          <li>
            Request deletion of your personal information, subject to legal
            exceptions.
          </li>
          <li>Correct inaccurate personal information.</li>
          <li>
            Opt out of the sale or sharing of personal information. We do not
            sell or share it, so there is nothing to opt out of.
          </li>
          <li>Not be discriminated against for exercising these rights.</li>
        </ul>
        <p>
          To make a request, email{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or call{" "}
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>. We will
          verify your request by matching the details you give with our records.
          You may use an authorized agent; we may ask for proof of their
          authority. We do not knowingly collect sensitive personal information
          for the purpose of inferring characteristics about you.
        </p>
      </LegalSection>

      <LegalSection id="loan-applicants" title="If you apply for a loan">
        <p>
          This website does not take loan applications. If you later apply for a
          mortgage loan through a licensed professional, the information you
          provide for that application is covered by the separate financial
          privacy notice you will receive at that time under the
          Gramm-Leach-Bliley Act and California law.
        </p>
      </LegalSection>

      <LegalSection id="dnt" title="Do Not Track and tracking">
        <p>
          We do not use advertising cookies or track you across other websites.
          Because we do not engage in that kind of tracking, we do not change
          our practices in response to browser “Do Not Track” signals. We treat
          a Global Privacy Control signal as a request to opt out of sale or
          sharing, which we already do not do.
        </p>
      </LegalSection>

      <LegalSection id="children" title="Children">
        <p>
          This website is not directed to children under 16, and we do not
          knowingly collect their information.
        </p>
      </LegalSection>

      <LegalSection id="security" title="Security">
        <p>
          We use encrypted connections (HTTPS), access controls on lead records,
          and bot protection on our forms. No method of transmission or storage
          is completely secure, so we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes to this policy">
        <p>
          We may update this policy. The “Last updated” date above shows when it
          last changed. Material changes will be posted on this page.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Contact us">
        <p>
          {siteConfig.legalName}
          <br />
          {siteConfig.address.display}
          <br />
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a> ·{" "}
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
