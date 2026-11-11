import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChartLine,
  CircleDollarSign,
  FileText,
  Globe2,
  HandHeart,
  Handshake,
  HeartHandshake,
  type LucideIcon,
  Play,
  ScrollText,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Video,
} from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { PartnershipFaq } from "@/components/home/partnership-faq";
import { PartnershipInquiryForm } from "@/components/home/partnership-inquiry-form";
import { PartnershipFooter } from "@/components/site-footers";
import {
  nextSteps,
  type PartnershipModel,
  partnershipModels,
  successStories,
} from "@/lib/content/partnership";
import { defaultOgImage, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Mortgage Excellence & Partnership for Purpose` },
  description:
    "Welcome to Century Financial Group. Begin with a clear California mortgage-readiness conversation, then explore a purpose-led LIMinistries partnership for real estate and lending professionals.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Welcome to Century Financial Group",
    description:
      "A clear mortgage-readiness conversation and a purpose-led partnership that helps each closing carry a measure of restoration.",
    url: "/",
    images: [defaultOgImage],
  },
};

const connectionReasons: [string, string, LucideIcon][] = [
  [
    "Market validation",
    "Commission-donation models such as Give Realty and AARE’s Generous Giving Program demonstrate commercial viability alongside charitable impact.",
    ChartLine,
  ],
  [
    "Client demand",
    "Values-driven buyers and sellers increasingly want their transactions to reflect faith and charitable priorities.",
    HandHeart,
  ],
  [
    "Competitive advantage",
    "Focused cause branding such as Homes for Healers, Second-Chance Housing, and Caregivers & Seniors makes an agent easier to remember and refer.",
    Sparkles,
  ],
  [
    "Emotional connection",
    "A post-closing report that explains what a gift funded can deepen relationships far beyond the initial transaction.",
    ScrollText,
  ],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: siteConfig.legalName,
  url: siteConfig.url,
  telephone: "+1-714-627-5815",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  areaServed: "California",
  description: siteConfig.description,
};

const sectionHeading =
  "font-serif text-5xl leading-[0.95] font-semibold tracking-[-0.035em] sm:text-6xl";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-parchment text-ink selection:bg-forest selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main id="main-content">
        {/* Hero: mortgage welcome and direct conversion row. */}
        <section className="relative isolate overflow-hidden border-b border-line bg-white">
          <Image
            src="/images/hero-partnership.webp"
            alt="A real estate professional and family at a home transaction"
            fill
            preload
            sizes="100vw"
            className="-z-10 hidden object-cover object-[68%_center] sm:block"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_39%,rgba(255,255,255,0.80)_50%,rgba(255,255,255,0.10)_74%)]" />
          <div className="relative mx-auto grid min-h-[600px] max-w-[1440px] items-center px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:px-12 lg:py-24">
            <div className="max-w-[690px] lg:col-span-7">
              <p className="text-[0.68rem] font-bold tracking-[0.20em] text-forest uppercase">
                Dedicated to Mortgage Excellence
              </p>
              <h1 className="mt-6 font-serif text-[3.5rem] leading-[0.91] font-semibold tracking-[-0.045em] text-forest-deep sm:text-[5.25rem] lg:text-[6.15rem]">
                Welcome to Century <span className="text-forest italic">Financial Group.</span>
              </h1>
              <p className="mt-7 max-w-[550px] text-lg leading-8 text-[#333333] sm:text-xl">
                Begin with a clear mortgage-readiness conversation, then explore a purpose-led
                partnership that helps each closing carry a measure of restoration.
              </p>
              <p className="mt-4 text-sm leading-6 text-moss">{siteConfig.licenseLine}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/mortgage-readiness#assessment"
                  className="inline-flex items-center gap-3 bg-forest px-6 py-4 text-sm font-bold tracking-[0.13em] text-white uppercase transition-all duration-200 hover:bg-forest-dark active:scale-[0.97]"
                >
                  Request A Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={siteConfig.applyOnlineHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-b border-forest-deep px-1 py-3 text-sm font-bold tracking-[0.12em] text-forest-deep uppercase transition-colors hover:border-forest hover:text-forest"
                >
                  Apply Online <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Proof points. */}
        <section
          aria-label="Why this opportunity matters"
          className="border-b border-ink/10 bg-ink text-parchment"
        >
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-16">
            <div className="lg:col-span-4">
              <p className="text-[0.68rem] font-bold tracking-[0.2em] text-rust-light uppercase">
                Why this opportunity matters
              </p>
              <p className="mt-4 font-serif text-4xl leading-none font-semibold sm:text-5xl">
                Your success can change lives globally.
              </p>
            </div>
            <dl className="grid gap-7 sm:grid-cols-3 lg:col-span-8">
              {[
                ["15–25%", "A proven commission-giving range used by models such as Give Realty."],
                ["$1M+", "Directed to charitable causes by Give Realty through standard transactions."],
                [
                  "50%",
                  "The commission-giving model used by Christian West Howard and other values-led examples.",
                ],
              ].map(([figure, detail]) => (
                <div key={figure} className="flex flex-col border-l border-white/20 pl-5">
                  <dt className="order-2 mt-2 text-sm leading-6 text-white/75">{detail}</dt>
                  <dd className="order-1 font-serif text-4xl font-semibold text-rust-light">{figure}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Mission. */}
        <section id="mission" className="scroll-mt-16 border-b border-ink/10 bg-parchment">
          <div className="mx-auto grid max-w-[1440px] items-stretch lg:grid-cols-12">
            <div className="relative min-h-[440px] lg:col-span-5">
              <Image
                src="/images/digital-reach.webp"
                alt="A ministry media team planning digital discipleship content"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-5 py-16 sm:px-8 lg:col-span-7 lg:px-16 lg:py-20">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className={`mt-5 max-w-[680px] ${sectionHeading} leading-[0.96]`}>
                Faith, media &amp; global restoration.
              </h2>
              <blockquote className="mt-9 border-l-2 border-rust pl-6 font-serif text-2xl leading-9 text-slate-ink italic sm:text-3xl sm:leading-10">
                “To glorify God by redeeming the oppressed through the Gospel, providing holistic
                restoration—spiritually, emotionally, physically, and socially.”
              </blockquote>
              <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
                <MissionPoint icon={Globe2} title="Our scale">
                  Over 50 domains hosting 50+ YouTube channels each, plus Instagram, TikTok, Facebook,
                  and email discipleship funnels.
                </MissionPoint>
                <MissionPoint icon={UsersRound} title="Our reach">
                  Global digital discipleship serving families under pressure, trauma survivors,
                  caregivers, and seekers of faith-grounded wellness.
                </MissionPoint>
                <MissionPoint icon={BadgeCheck} title="Our credibility">
                  A 501(c)(3) public charity, established for transparent, mission-aligned stewardship
                  and tax-deductible giving.
                </MissionPoint>
                <MissionPoint icon={HeartHandshake} title="Our programs">
                  Daily prayer rooms, trauma-informed devotionals, and online counseling-supported
                  prayer sessions.
                </MissionPoint>
              </div>
            </div>
          </div>
        </section>

        {/* Why the connection works. */}
        <section className="border-b border-ink/10 bg-parchment-deep px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Why the connection works</Eyebrow>
              <h2 className={`mt-5 ${sectionHeading}`}>
                Generosity can be a business distinction—and a Kingdom practice.
              </h2>
              <p className="mt-7 max-w-[500px] text-lg leading-8 text-[#414141]">
                Cause-based models make a transaction more than a financial milestone. They give
                clients a clear way to connect a move, refinance, or investment decision with
                mission-aligned impact.
              </p>
            </div>
            <div className="divide-y divide-ink/15 self-end border-y border-ink/15 lg:col-span-7">
              {connectionReasons.map(([title, detail, Icon], index) => (
                <article
                  key={title}
                  className={`grid grid-cols-[54px_1fr] gap-5 py-7 sm:grid-cols-[72px_1fr] sm:gap-7 sm:py-8 ${
                    index % 2 === 1 ? "lg:ml-14" : ""
                  }`}
                >
                  <span
                    className="font-serif text-4xl leading-none font-semibold text-rust sm:text-5xl"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <Icon className="h-5 w-5 text-rust" aria-hidden="true" />
                    <h3 className="mt-4 font-serif text-3xl leading-none font-bold text-slate-ink">
                      {title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#3D3D3D]">{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership models. */}
        <section
          id="models"
          className="scroll-mt-16 border-b border-ink/10 bg-parchment px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 border-b border-ink/15 pb-11 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>Partnership models</Eyebrow>
              </div>
              <h2 className={`${sectionHeading} lg:col-span-8`}>
                Five proven pathways you can implement today.
              </h2>
            </div>
            <div className="grid divide-y divide-ink/15 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              <div className="divide-y divide-ink/15 lg:pr-12">
                {partnershipModels.slice(0, 3).map((model) => (
                  <ModelRow key={model.number} model={model} />
                ))}
              </div>
              <div className="divide-y divide-ink/15 lg:pl-12">
                {partnershipModels.slice(3).map((model) => (
                  <ModelRow key={model.number} model={model} />
                ))}
                <p className="py-9 text-sm leading-7 text-[#555]">
                  Each model can begin as a small, disciplined pilot and grow through transparent
                  reporting, shared learning, and prayerful oversight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact. */}
        <section id="impact" className="scroll-mt-16 border-b border-ink/10 bg-slate-ink text-parchment">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
            <div className="order-2 px-5 py-16 sm:px-8 lg:order-1 lg:col-span-7 lg:px-16 lg:py-24">
              <Eyebrow className="text-rust-light">Where generosity goes</Eyebrow>
              <h2 className={`mt-5 max-w-[700px] ${sectionHeading} text-white`}>
                Tangible Kingdom outcomes, visible stewardship.
              </h2>
              <p className="mt-6 max-w-[680px] text-lg leading-8 text-white/75">
                Every contribution is designed to strengthen prayer, mental wellness, digital
                discipleship, and restoration in ways that can be tracked and reported.
              </p>
              <div className="mt-12 grid gap-x-9 gap-y-10 sm:grid-cols-2">
                <ImpactItem
                  icon={HandHeart}
                  title="100 prayer sessions"
                  text="Counseling-supported prayer for overwhelmed parents and trauma survivors."
                />
                <ImpactItem
                  icon={Globe2}
                  title="Global devotionals"
                  text="Daily content in multiple languages for families under pressure worldwide."
                />
                <ImpactItem
                  icon={Video}
                  title="Virtual prayer rooms"
                  text="Live, real-time intercession for anxiety, grief, and crisis situations."
                />
                <ImpactItem
                  icon={BookOpen}
                  title="Trauma-informed care"
                  text="Small-group curricula equipping local churches to serve vulnerable populations."
                />
              </div>
              <ul className="mt-14 grid gap-4 border-t border-white/20 pt-7 sm:grid-cols-3">
                {(
                  [
                    [FileText, "Branded impact reports"],
                    [CircleDollarSign, "Quarterly reviews"],
                    [ShieldCheck, "501(c)(3) accountability"],
                  ] as [LucideIcon, string][]
                ).map(([Icon, label]) => (
                  <li key={label} className="flex items-center gap-3 text-sm font-semibold text-white/80">
                    <Icon className="h-4 w-4 text-rust-light" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 min-h-[360px] lg:order-2 lg:col-span-5">
              <Image
                src="/images/prayer-support.webp"
                alt="A small community group gathered in supportive prayer"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Support. */}
        <section className="border-b border-ink/10 bg-parchment px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[760px]">
              <Eyebrow>How we support you</Eyebrow>
              <h2 className={`mt-5 ${sectionHeading}`}>
                Equipping you to succeed while serving the Kingdom.
              </h2>
            </div>
            <div className="mt-14 grid divide-y divide-ink/15 border-y border-ink/15 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              <SupportColumn
                icon={BriefcaseBusiness}
                title="Marketing & branding"
                points={[
                  "Co-branded campaigns featuring your team and our ministry.",
                  "Social media templates, listing presentation slides, and video testimonies.",
                  "A ‘Your Move Funds Ministry’ calculator for client presentations.",
                ]}
              />
              <SupportColumn
                icon={Play}
                title="Training & discipleship"
                points={[
                  "Short online cohorts for serving clients under stress.",
                  "Training on praying ethically with clients.",
                  "Monthly agent prayer calls and access to our content library.",
                ]}
              />
              <SupportColumn
                icon={Handshake}
                title="Spiritual covering"
                points={[
                  "Regular intercession for your business, clients, and family.",
                  "Marketplace evangelism and faith-integration support.",
                  "A community of like-minded Kingdom real estate professionals.",
                ]}
              />
            </div>
            <div className="mt-10 grid gap-6 border-l-2 border-rust bg-parchment-deep p-7 sm:grid-cols-[190px_1fr_1fr] sm:gap-10 sm:p-9">
              <h3 className="font-serif text-3xl leading-none font-bold text-slate-ink">
                A stronger client experience.
              </h3>
              <p className="leading-7 text-[#454545]">
                <strong className="block text-ink">Support during stress</strong>
                Clients receive access to prayer rooms and mental-wellness resources during demanding
                transaction periods.
              </p>
              <p className="leading-7 text-[#454545]">
                <strong className="block text-ink">Care after closing</strong>
                Follow-up can include devotional content, supportive online communities, and referrals
                to local faith communities after a move.
              </p>
            </div>
          </div>
        </section>

        {/* Financial & tax considerations. */}
        <section className="border-b border-ink/10 bg-parchment-deep px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Financial &amp; tax considerations</Eyebrow>
              <h2 className={`mt-5 ${sectionHeading}`}>
                The financial case is clear—and must be stewarded well.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 sm:gap-x-12 lg:col-span-8">
              <InfoPanel
                icon={BriefcaseBusiness}
                title="For agents & brokerages"
                text="Giving to LIMinistries may be treated as a charitable contribution to a 501(c)(3), while cause-based branding can create a distinct, purpose-driven story."
              />
              <InfoPanel
                icon={HandHeart}
                title="For clients in 50% models"
                text="When a client makes the donation from a saved commission amount, the gift can be made in the client’s name, as in the examples presented."
              />
              <InfoPanel
                icon={ShieldCheck}
                title="Compliance & risk"
                text="Clear written agreements, direct charitable gifts, and transparent statements of donation percentage protect all parties and preserve integrity."
              />
              <InfoPanel
                icon={Sparkles}
                title="The business case"
                text="The source examples frame generosity as a driver of trust, values alignment, referrals, and a more durable professional calling."
              />
            </div>
          </div>
          <p className="mx-auto mt-9 max-w-[1440px] border-t border-ink/15 pt-5 text-sm leading-6 text-[#575757]">
            Partnership structures should be reviewed with appropriate brokerage, escrow, legal, and tax
            advisors. LIMinistries does not provide individualized tax or legal advice.
          </p>
        </section>

        {/* Success stories. */}
        <section className="border-b border-ink/10 bg-parchment px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow>Real-world success stories</Eyebrow>
              </div>
              <h2 className={`${sectionHeading} lg:col-span-8`}>
                Christian agents across America are already proving the model.
              </h2>
            </div>
            <div className="mt-14 grid border-t border-l border-ink/15 sm:grid-cols-2">
              {successStories.map((story) => (
                <article key={story.name} className="border-r border-b border-ink/15 p-7 sm:p-9">
                  <p className="text-[0.68rem] font-bold tracking-[0.18em] text-rust uppercase">
                    {story.location}
                  </p>
                  <h3 className="mt-4 font-serif text-3xl leading-none font-bold text-slate-ink">
                    {story.name}
                  </h3>
                  <p className="mt-5 max-w-[540px] leading-7 text-[#3D3D3D]">{story.proof}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-10 ml-auto max-w-[760px] border-l-2 border-rust pl-6 font-serif text-3xl leading-9 font-semibold text-slate-ink italic">
              “These agents don’t see generosity as a cost—they see it as their competitive advantage and
              spiritual calling.”
            </blockquote>
          </div>
        </section>

        {/* Pathway. */}
        <section
          id="pathway"
          className="scroll-mt-16 bg-ink px-5 py-16 text-parchment sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 border-b border-white/20 pb-14 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow className="text-rust-light">Start here</Eyebrow>
              </div>
              <div className="lg:col-span-8">
                <h2 className={`${sectionHeading} text-white`}>Three simple ways to begin.</h2>
                <p className="mt-6 max-w-[650px] text-lg leading-8 text-white/70">
                  A partnership can begin with one agent, grow into an office-wide program, or become a
                  formal brokerage integration.
                </p>
              </div>
            </div>
            <div className="grid divide-y divide-white/20 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              <PathOption
                number="01"
                title="Pilot Partnership"
                text="Commit 10–15% of commissions from the next five transactions. Receive full marketing materials, impact tracking, and client communication templates."
              />
              <PathOption
                number="02"
                title="Team or Office Program"
                text="Launch a Century Cares initiative where agents opt in and LIMinistries is highlighted within a shared giving framework."
              />
              <PathOption
                number="03"
                title="Brokerage-Wide Integration"
                text="Make LIMinistries an official charity partner and offer a transparent giving option at closing, with a brokerage matching possibility."
              />
            </div>
            <div className="mt-16 border-t border-white/20 pt-9">
              <h3 className="text-[0.68rem] font-bold tracking-[0.2em] text-rust-light uppercase">
                What happens next
              </h3>
              <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {nextSteps.map((item) => (
                  <li key={item.step} className="border-l border-rust-light pl-5">
                    <span className="font-serif text-4xl font-semibold text-rust-light" aria-hidden="true">
                      {item.step}
                    </span>
                    <h4 className="mt-3 font-serif text-2xl font-bold text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-white/65">{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Credentials and professional inquiry. */}
        <section
          id="inquiry"
          className="scroll-mt-16 border-y border-ink/10 bg-parchment-deep px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4" aria-label="Century Financial Group credentials">
              <Eyebrow>Century Financial Group</Eyebrow>
              <div className="mt-8 max-w-[330px] border-y border-ink/15 py-7">
                <p className="notranslate font-serif text-3xl leading-7 font-bold text-slate-ink" translate="no">
                  {siteConfig.legalName}
                </p>
                <p className="mt-2 text-sm font-semibold tracking-[0.13em] text-rust uppercase">
                  California real estate corporation
                </p>
              </div>
              <address className="mt-8 border-l-2 border-rust pl-5 text-sm leading-7 text-[#454545] not-italic">
                <p>
                  <strong className="text-ink">DRE Corporation License:</strong> {siteConfig.dreLicense}
                </p>
                <p>
                  <strong className="text-ink">Status:</strong> Licensed
                </p>
                <p>
                  <strong className="text-ink">Expiration:</strong> {siteConfig.dreExpiration}
                </p>
                <p>
                  <strong className="text-ink">MLO License Endorsement:</strong>{" "}
                  {siteConfig.mloEndorsement}
                </p>
                <p className="mt-4">{siteConfig.address.display}</p>
                <p>
                  <strong className="text-ink">Phone:</strong>{" "}
                  <a href={siteConfig.phoneHref} className="font-semibold text-forest hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
              </address>
              <Link
                href="/mortgage-readiness"
                className="mt-8 inline-flex items-center gap-2 border border-forest bg-white px-4 py-3 text-xs font-bold tracking-[0.13em] text-forest uppercase transition-colors hover:bg-mint"
              >
                California mortgage readiness <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-8 max-w-[420px] font-serif text-3xl leading-9 font-semibold text-slate-ink italic">
                Let’s explore a partnership that serves your clients with care and helps carry
                restoration beyond the closing table.
              </p>
            </aside>

            <div className="lg:col-span-8 lg:border-l lg:border-ink/15 lg:pl-14">
              <Eyebrow>Professional inquiry</Eyebrow>
              <h2 className={`mt-5 ${sectionHeading}`}>Tell us how you would like to partner.</h2>
              <p className="mt-5 max-w-[680px] text-lg leading-8 text-[#454545]">
                This form is designed for realtors, loan officers, and real estate professionals
                interested in bringing a LIMinistries partnership into their practice, team, or
                brokerage.
              </p>
              <PartnershipInquiryForm />
            </div>
          </div>
        </section>

        {/* FAQ. */}
        <section
          id="faq"
          className="scroll-mt-16 border-b border-ink/10 bg-parchment px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Partnership FAQ</Eyebrow>
              <h2 id="faq-heading" className={`mt-5 max-w-[475px] ${sectionHeading} text-ink`}>
                Questions before you begin?
              </h2>
              <p className="mt-6 max-w-[430px] text-lg leading-8 text-[#454545]">
                Answers for realtors and loan officers considering a values-led partnership with
                LIMinistries.
              </p>
              <p className="mt-8 border-l-2 border-rust pl-5 text-sm leading-7 text-[#5A5A5A]">
                Each answer addresses the partnership process. Individual legal, tax, lending, escrow,
                and brokerage questions should be reviewed with the appropriate advisors.
              </p>
            </div>
            <div className="lg:col-span-8 lg:border-l lg:border-ink/15 lg:pl-14">
              <PartnershipFaq />
            </div>
          </div>
        </section>

        {/* Closing invitation. */}
        <section className="relative isolate overflow-hidden bg-parchment">
          <Image
            src="/images/legacy-giving.webp"
            alt="A real estate key passed over an envelope, symbolizing generosity after a transaction"
            fill
            sizes="100vw"
            className="-z-10 object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#F2F0E9_0%,#F2F0E9_42%,rgba(242,240,233,0.87)_53%,rgba(242,240,233,0.1)_75%)]" />
          <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-24">
            <div className="max-w-[740px] lg:col-span-7">
              <Eyebrow>An invitation to partnership</Eyebrow>
              <h2 className="mt-5 font-serif text-[3.7rem] leading-[0.91] font-semibold tracking-[-0.045em] sm:text-[5.7rem]">
                Let’s build something <span className="text-rust italic">eternal</span> together.
              </h2>
              <p className="mt-8 max-w-[625px] border-l-2 border-rust pl-6 font-serif text-2xl leading-9 text-slate-ink italic">
                Will Century Financial Group be remembered only for successful deals, or for being a
                conduit of hope, healing, and restoration to families around the world?
              </p>
              <div className="mt-10 border border-rust bg-parchment/90 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
                <div>
                  <p className="text-[0.68rem] font-bold tracking-[0.18em] text-rust uppercase">Next step</p>
                  <p className="mt-2 max-w-[440px] font-serif text-2xl leading-7 font-semibold text-ink">
                    Schedule a discovery call and receive the Kingdom Real Estate Toolkit.
                  </p>
                </div>
                <a
                  href="#inquiry"
                  className="mt-5 inline-flex shrink-0 items-center gap-2 bg-rust px-5 py-3 text-xs font-bold tracking-[0.13em] text-white uppercase transition-all duration-200 hover:bg-rust-dark active:scale-[0.97] sm:mt-0"
                >
                  Submit an inquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PartnershipFooter />
    </div>
  );
}

function MissionPoint({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Icon className="h-5 w-5 text-rust" aria-hidden="true" />
      <h3 className="mt-3 font-serif text-2xl font-bold">{title}</h3>
      <p className="mt-2 leading-7 text-[#4A4A4A]">{children}</p>
    </div>
  );
}

function ModelRow({ model }: { model: PartnershipModel }) {
  return (
    <article className="grid grid-cols-[58px_1fr] gap-4 py-9 sm:grid-cols-[74px_1fr] sm:gap-6">
      <span className="font-serif text-4xl leading-none font-semibold text-rust sm:text-5xl" aria-hidden="true">
        {model.number}
      </span>
      <div>
        <h3 className="font-serif text-3xl leading-none font-bold text-slate-ink">{model.title}</h3>
        <p className="mt-3 leading-7 text-[#3E3E3E]">{model.description}</p>
        <p className="mt-3 text-sm leading-6 text-[#666] italic">{model.note}</p>
      </div>
    </article>
  );
}

function ImpactItem({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="border-l border-white/25 pl-5">
      <Icon className="h-5 w-5 text-rust-light" aria-hidden="true" />
      <h3 className="mt-5 font-serif text-3xl leading-none font-bold text-white">{title}</h3>
      <p className="mt-3 leading-7 text-white/70">{text}</p>
    </div>
  );
}

function SupportColumn({ icon: Icon, title, points }: { icon: LucideIcon; title: string; points: string[] }) {
  return (
    <article className="px-0 py-9 sm:px-8 lg:px-10">
      <Icon className="h-5 w-5 text-rust" aria-hidden="true" />
      <h3 className="mt-6 font-serif text-3xl leading-none font-bold text-slate-ink">{title}</h3>
      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex gap-3 leading-7 text-[#414141]">
            <Check className="mt-1 h-4 w-4 shrink-0 text-rust" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function InfoPanel({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="grid grid-cols-[26px_1fr] gap-4 border-b border-ink/15 py-8">
      <Icon className="mt-1 h-5 w-5 text-rust" aria-hidden="true" />
      <div>
        <h3 className="font-serif text-3xl leading-none font-bold text-slate-ink">{title}</h3>
        <p className="mt-3 leading-7 text-[#424242]">{text}</p>
      </div>
    </article>
  );
}

function PathOption({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="px-0 py-10 sm:px-9 lg:px-10">
      <span className="font-serif text-5xl font-semibold text-rust-light" aria-hidden="true">
        {number}
      </span>
      <h3 className="mt-4 font-serif text-3xl leading-none font-bold text-white">{title}</h3>
      <p className="mt-4 leading-7 text-white/70">{text}</p>
    </article>
  );
}
