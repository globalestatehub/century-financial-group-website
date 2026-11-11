import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { LEGAL_LAST_UPDATED } from "@/lib/compliance";
import { defaultOgImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Century Financial Group's commitment to an accessible website, and how to get help or report a barrier.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    title: "Accessibility Statement | Century Financial Group",
    url: "/accessibility",
    images: [defaultOgImage],
  },
};

const contactEmail = "info@centuryfinancialgroup.net";

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      updated={LEGAL_LAST_UPDATED}
      intro={
        <p>
          {siteConfig.legalName} wants everyone, including people with
          disabilities, to be able to use this website. We aim to meet the Web
          Content Accessibility Guidelines (WCAG) 2.1, Level AA.
        </p>
      }
    >
      <LegalSection id="measures" title="What we do">
        <ul>
          <li>
            A “Skip to main content” link and a consistent heading structure on
            every page.
          </li>
          <li>Text alternatives for meaningful images.</li>
          <li>
            Visible labels on every form field, with error messages announced to
            screen readers.
          </li>
          <li>Full keyboard operation, with visible focus indicators.</li>
          <li>
            Color contrast checked against WCAG AA, and layouts that reflow on
            small screens and when zoomed.
          </li>
          <li>Reduced motion when your device asks for it.</li>
          <li>Testing of our main pages with automated accessibility tools.</li>
        </ul>
      </LegalSection>

      <LegalSection id="limitations" title="Known limitations">
        <p>
          Some features come from third parties and are outside our direct
          control: the Google Translate page translator, the ElevenLabs voice
          assistant, and the Cloudflare Turnstile security check on our forms.
          If any of these gets in your way, please contact us and we will help
          by another method.
        </p>
      </LegalSection>

      <LegalSection id="feedback" title="Get help or report a barrier">
        <p>
          If you have trouble using any part of this website, or need
          information in a different format, contact us and we will respond as
          soon as we can, usually within 1–2 working days.
        </p>
        <p>
          Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> · Call{" "}
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
