import { describe, expect, it } from "vitest";
import {
  blogCategories,
  blogPosts,
  countPostsInArchive,
  countPostsInCategory,
  filterBlogPosts,
  getBlogPost,
} from "@/lib/content/blog";
import { getReadinessGuidance, getReadinessProfile } from "@/lib/content/mortgage-readiness";
import { partnershipFaqs } from "@/lib/content/partnership";
import { publicNavigation, siteConfig } from "@/lib/site";
import { parseTranslateCookie } from "@/lib/translate";

describe("site details", () => {
  it("keeps the canonical phone number and dial link in sync", () => {
    expect(siteConfig.phoneDisplay).toBe("+1 (714) 627-5815");
    expect(siteConfig.phoneHref).toBe("tel:+17146275815");
  });

  it("routes Blog to the internal archive and keeps the CenturyFG menu order", () => {
    expect(publicNavigation.map((item) => item.label)).toEqual([
      "Purchase",
      "Refinance",
      "Loan Options",
      "About Us",
      "Contact Us",
      "Blog",
    ]);
    expect(publicNavigation.find((item) => item.label === "Blog")?.href).toBe("/blog");
  });
});

describe("blog content", () => {
  it("has unique slugs that resolve to their post", () => {
    const slugs = blogPosts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(getBlogPost(slug)?.slug).toBe(slug);
    expect(getBlogPost("missing")).toBeUndefined();
  });

  it("derives category and archive counts from the posts", () => {
    for (const category of blogCategories) expect(countPostsInCategory(category.slug)).toBe(1);
    expect(countPostsInArchive("2026-09")).toBe(3);
  });

  it("filters by category and archive", () => {
    expect(filterBlogPosts({})).toHaveLength(3);
    expect(filterBlogPosts({ category: "refinance-planning" })).toHaveLength(1);
    expect(filterBlogPosts({ archive: "2026-09" })).toHaveLength(3);
    expect(filterBlogPosts({ category: "nope" })).toHaveLength(0);
  });
});

describe("partnership FAQ", () => {
  it("has eight answered questions", () => {
    expect(partnershipFaqs).toHaveLength(8);
    for (const item of partnershipFaqs) expect(item.answer.length).toBeGreaterThan(40);
  });
});

describe("mortgage readiness guidance", () => {
  it("maps goals to profiles", () => {
    expect(getReadinessProfile("Buy my first home")).toBe("The Cautious California Buyer");
    expect(getReadinessProfile("Refinance")).toBe("The Savvy Refinancer");
    expect(getReadinessProfile("Invest in property")).toBe("The Prepared Explorer");
  });

  it("always returns three steps ending with the licensed follow-up", () => {
    const steps = getReadinessGuidance("Refinance", "The paperwork");
    expect(steps).toHaveLength(3);
    expect(steps[2]).toMatch(/California-licensed/);
  });
});

describe("page translator cookie", () => {
  it("reads the target language from googtrans", () => {
    expect(parseTranslateCookie("")).toBe("en");
    expect(parseTranslateCookie("a=1; googtrans=/en/vi; b=2")).toBe("vi");
    expect(parseTranslateCookie("googtrans=%2Fen%2Fzh-CN")).toBe("zh-CN");
    expect(parseTranslateCookie("googtrans=/en/xx")).toBe("en");
  });
});
