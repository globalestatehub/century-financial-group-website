import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ReadinessAssessment } from "@/components/mortgage/readiness-assessment";
import { MortgageFooter } from "@/components/site-footers";
import { defaultOgImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "California Mortgage Readiness Assessment",
  description:
    "Use the brief California Mortgage Readiness Assessment to name your goal, clarify the question holding you back, and request an educational response from a licensed professional.",
  alternates: { canonical: "/mortgage-readiness" },
  openGraph: {
    title: "A clearer path to your next mortgage conversation",
    description:
      "A brief, educational California Mortgage Readiness Assessment from Century Financial Group.",
    url: "/mortgage-readiness",
    images: [defaultOgImage],
  },
};

const educationSteps = [
  [
    "01",
    "Clarify your purpose",
    "Whether you are buying, refinancing, considering home equity, or exploring investment property, start with the outcome you want to understand.",
  ],
  [
    "02",
    "Name the uncertainty",
    "Credit, down payment, paperwork, and lender selection can each require a different educational next step.",
  ],
  [
    "03",
    "Choose your timing",
    "Your horizon helps frame whether the next action is preparation, education, or a requested response.",
  ],
] as const;

export default function MortgageReadinessPage() {
  return (
    <div className="min-h-screen bg-mist text-[#1E3325]">
      <main id="main-content">
        <section className="border-b border-line bg-[linear-gradient(120deg,#ffffff_0%,#ffffff_56%,#EAF2EC_56%,#EAF2EC_100%)]">
          <div className="mx-auto grid min-h-[460px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[0.18em] text-forest uppercase">
                Dedicated to Mortgage Excellence
              </p>
              <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.93] font-semibold tracking-[-0.04em] text-forest-deep sm:text-6xl lg:text-7xl">
                A clearer path to your next mortgage conversation.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-moss">
                Use this brief California Mortgage Readiness Assessment to name your goal, clarify the
                question holding you back, and request an educational response from a licensed
                professional.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#assessment"
                  className="inline-flex items-center gap-2 bg-forest px-6 py-4 text-sm font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-forest-dark"
                >
                  Begin readiness assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#why"
                  className="inline-flex items-center gap-2 border-b border-forest px-1 py-3 text-sm font-bold tracking-[0.12em] text-forest uppercase"
                >
                  How it works <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="border-l-2 border-forest pl-6 lg:col-span-4 lg:col-start-9">
              <p className="font-serif text-3xl leading-9 font-semibold text-forest-deep">
                Education first. Clear options. A considered next step.
              </p>
              <p className="mt-5 text-sm leading-7 text-moss">{siteConfig.licenseLine}</p>
            </div>
          </div>
        </section>

        <section id="why" className="scroll-mt-8 border-b border-line bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold tracking-[0.18em] text-forest uppercase">Mortgage education</p>
              <h2 className="mt-5 font-serif text-5xl leading-[0.95] font-semibold tracking-[-0.035em] text-forest-deep sm:text-6xl">
                Bring a better question to the conversation.
              </h2>
            </div>
            <div className="grid gap-7 sm:grid-cols-3 lg:col-span-8">
              {educationSteps.map(([number, title, copy]) => (
                <article key={number} className="border-t border-sage pt-5">
                  <p className="font-serif text-4xl font-semibold text-forest" aria-hidden="true">
                    {number}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-none font-bold text-forest-deep">{title}</h3>
                  <p className="mt-4 leading-7 text-moss">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="assessment"
          className="scroll-mt-8 bg-mint px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
          aria-labelledby="assessment-heading"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-bold tracking-[0.18em] text-forest uppercase">
                California Mortgage Readiness Assessment
              </p>
              <h2
                id="assessment-heading"
                className="mt-5 font-serif text-5xl leading-[0.95] font-semibold tracking-[-0.035em] text-forest-deep sm:text-6xl"
              >
                Start with the facts that are clear to you today.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-moss">
                This educational tool is not a loan application, prequalification, approval, or
                commitment to lend.
              </p>
            </div>
            <div className="bg-white p-6 shadow-[0_18px_55px_rgba(14,80,48,0.10)] sm:p-10 lg:col-span-8">
              <ReadinessAssessment />
            </div>
          </div>
        </section>
      </main>
      <MortgageFooter />
    </div>
  );
}
