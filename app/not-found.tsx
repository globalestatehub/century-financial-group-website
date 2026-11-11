import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { BlogFooter } from "@/components/site-footers";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#2e3430]">
      <SiteHeader />
      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-5 py-24 sm:px-8">
        <p className="text-xs font-bold tracking-[0.16em] text-forest uppercase">404</p>
        <h1 className="mt-5 font-serif text-5xl font-bold text-forest-ink sm:text-6xl">Page not found.</h1>
        <p className="mt-6 text-lg leading-8 text-moss">
          Sorry, the page you are looking for doesn&apos;t exist. It may have been moved or deleted.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-forest px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Go home
          </Link>
          <Link
            href="/mortgage-readiness#assessment"
            className="inline-flex items-center gap-2 border border-forest px-5 py-3 text-sm font-bold text-forest transition-colors hover:bg-mint"
          >
            Mortgage readiness <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
