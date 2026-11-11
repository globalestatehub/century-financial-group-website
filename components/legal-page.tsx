import Link from "next/link";
import { BlogFooter } from "@/components/site-footers";

/** Shared shell for Privacy, Disclosures, and Accessibility (blog-article styling). */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#2e3430]">
      <main id="main-content">
        <nav
          aria-label="Breadcrumb"
          className="border-b border-[#e6eae6] bg-[#f6f8f6] px-5 py-5 sm:px-8 lg:px-12"
        >
          <ol className="mx-auto flex max-w-[980px] flex-wrap items-center gap-1 text-sm text-[#6b746d]">
            <li>
              <Link href="/" className="transition-colors hover:text-forest">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <article className="mx-auto max-w-[980px] px-5 py-14 sm:px-8 lg:py-20">
          <p className="text-xs font-bold tracking-[0.15em] text-forest uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[.98] font-bold text-forest-ink sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-sm text-[#6b746d]">Last updated: {updated}</p>
          <div className="mt-8 max-w-3xl text-lg leading-8 text-[#4f5d53]">
            {intro}
          </div>
          <div className="mt-12 max-w-3xl space-y-12 text-base leading-7 text-[#4f5d53] [&_a]:font-semibold [&_a]:text-forest [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-2 [&_strong]:text-forest-deep [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
      <BlogFooter />
    </div>
  );
}

/** A titled section inside a legal page. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="scroll-mt-8"
    >
      <h2
        id={id ? `${id}-heading` : undefined}
        className="font-serif text-3xl leading-tight font-bold text-forest-deep"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
