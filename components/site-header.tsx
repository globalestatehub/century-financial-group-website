"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { publicNavigation, siteConfig } from "@/lib/site";

/** Unified public masthead used by every customer-facing page. */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="relative z-40 border-b border-line bg-white">
      <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="grid min-w-0 gap-0.5"
          translate="no"
        >
          <span className="notranslate truncate font-serif text-[1.3rem] leading-none font-bold tracking-[-0.03em] text-forest-deep sm:text-[1.55rem]">
            {siteConfig.name}
          </span>
          <span className="text-[0.68rem] font-semibold tracking-[0.04em] text-[#5b6a60]">
            {siteConfig.phoneDisplay}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 text-[0.72rem] font-bold tracking-[0.06em] text-[#284333] uppercase xl:flex"
          aria-label="Primary navigation"
        >
          {publicNavigation.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={siteConfig.applyOnlineHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center border border-forest bg-forest px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-forest-dark"
            >
              Apply Online
            </a>
            <Link
              href={siteConfig.quoteHref}
              className="inline-flex items-center border border-forest px-3.5 py-2.5 text-xs font-bold text-forest transition-colors hover:bg-mint"
            >
              Get A Quote
            </Link>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(open => !open)}
            className="inline-flex h-10 w-10 items-center justify-center border border-sage text-forest-deep xl:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-line bg-white px-5 py-5 xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {publicNavigation.map(item => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-line py-3 text-sm font-semibold text-forest-deep"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.applyOnlineHref}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-3 bg-forest px-4 py-3 text-center text-sm font-bold text-white"
            >
              Apply Online
            </a>
            <Link
              href={siteConfig.quoteHref}
              onClick={closeMenu}
              className="border border-forest px-4 py-3 text-center text-sm font-bold text-forest"
            >
              Get A Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
